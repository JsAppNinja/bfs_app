using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace CustomerPortalCMS.Models.UI
{
    internal class GroupDescriptorExpressionBuilder : GroupDescriptorExpressionBuilderBase
    {
        private readonly GroupDescriptor groupDescriptor;
        private readonly GroupDescriptorExpressionBuilder childBuilder;
        private readonly IQueryable notPagedData;
        private ParameterExpression groupingParameterExpression;
        private Expression aggregateParameterExpression;

        public GroupDescriptorExpressionBuilder ChildBuilder
        {
            get { return this.childBuilder; }
        }

        public GroupDescriptor GroupDescriptor
        {
            get { return this.groupDescriptor; }
        }

        public bool HasSubgroups
        {
            get { return this.childBuilder != null; }
        }

        protected override ListSortDirection? SortDirection
        {
            get { return new ListSortDirection?(this.groupDescriptor.SortDirection); }
        }

        private ParameterExpression GroupingParameterExpression
        {
            get
            {
                if (this.groupingParameterExpression == null)
                    this.groupingParameterExpression =
                        Expression.Parameter(
                            typeof(IGrouping<,>).MakeGenericType(this.CreateGroupByExpression().Body.Type,
                                this.ItemType), "group" + (object) this.GetHashCode());
                return this.groupingParameterExpression;
            }
        }

        private Expression AggregateParameterExpression
        {
            get
            {
                if (this.aggregateParameterExpression == null)
                {
                    LambdaExpression filterExpression = this.CreateChildItemsFilterExpression();
                    IQueryable items = this.notPagedData;
                    if (this.ParentBuilder != null)
                        this.ParentBuilder.CreateChildItemsFilterExpressionFromRecursive()
                            .Each<LambdaExpression>(
                                (Action<LambdaExpression>) (expression => items =
                                    items.Where((Expression) expression)));
                    items = items.Where((Expression) filterExpression);
                    this.aggregateParameterExpression = items.Expression;
                }
                return this.aggregateParameterExpression;
            }
        }

        public GroupDescriptorExpressionBuilder ParentBuilder { get; set; }

        public GroupDescriptorExpressionBuilder(IQueryable queryable, GroupDescriptor groupDescriptor)
            : this(queryable, groupDescriptor, (GroupDescriptorExpressionBuilder) null, queryable)
        {
            this.groupDescriptor = groupDescriptor;
        }

        public GroupDescriptorExpressionBuilder(IQueryable queryable, GroupDescriptor groupDescriptor,
            GroupDescriptorExpressionBuilder childBuilder, IQueryable notPagedData)
            : base(queryable)
        {
            this.groupDescriptor = groupDescriptor;
            this.childBuilder = childBuilder;
            this.notPagedData = notPagedData;
        }

        protected override LambdaExpression CreateGroupByExpression()
        {
            MemberAccessExpressionBuilderBase expressionBuilderBase = ExpressionBuilderFactory.MemberAccess(
                (IQueryable) this.Queryable, this.groupDescriptor.MemberType, this.groupDescriptor.Member);
            expressionBuilderBase.ParameterExpression = this.ParameterExpression;
            return expressionBuilderBase.CreateLambdaExpression();
        }

        protected override LambdaExpression CreateOrderByExpression()
        {
            return Expression.Lambda(
                (Expression) Expression.Property((Expression) this.GroupingParameterExpression, "Key"),
                new ParameterExpression[1]
                {
                    this.GroupingParameterExpression
                });
        }

        protected override LambdaExpression CreateSelectExpression()
        {
            if (this.HasSubgroups)
                this.childBuilder.ParentBuilder = this;
            return Expression.Lambda(this.CreateSelectBodyExpression(), new ParameterExpression[1]
            {
                this.GroupingParameterExpression
            });
        }

        private Expression CreateSelectBodyExpression()
        {
            return (Expression) Expression.MemberInit(Expression.New(typeof(AggregateFunctionsGroup)),
                this.CreateMemberBindings());
        }

        protected virtual IEnumerable<MemberBinding> CreateMemberBindings()
        {
            yield return this.CreateKeyMemberBinding();
            yield return this.CreateCountMemberBinding();
            yield return this.CreateHasSubgroupsMemberBinding();
            yield return this.CreateFieldNameMemberBinding();
            if (this.groupDescriptor.AggregateFunctions.Count > 0)
                yield return this.CreateAggregateFunctionsProjectionMemberBinding();
            yield return this.CreateItemsMemberBinding();
        }

        protected MemberBinding CreateItemsMemberBinding()
        {
            return (MemberBinding) Expression.Bind((MemberInfo) typeof(AggregateFunctionsGroup).GetProperty("Items"),
                this.CreateItemsExpression());
        }

        private Expression CreateItemsExpression()
        {
            if (this.HasSubgroups)
                return this.CreateItemsExpressionFromChildBuilder();
            return (Expression) this.GroupingParameterExpression;
        }

        private Expression CreateItemsExpressionFromChildBuilder()
        {
            this.childBuilder.Queryable = this.Queryable.Where((Expression) this.CreateChildItemsFilterExpression());
            return this.childBuilder.CreateQuery().Expression;
        }

        public IEnumerable<LambdaExpression> CreateChildItemsFilterExpressionFromRecursive()
        {
            List<LambdaExpression> lambdaExpressionList = new List<LambdaExpression>()
            {
                this.CreateChildItemsFilterExpression()
            };
            if (this.ParentBuilder != null)
                lambdaExpressionList.AddRange(this.ParentBuilder.CreateChildItemsFilterExpressionFromRecursive());
            return (IEnumerable<LambdaExpression>) lambdaExpressionList;
        }

        public LambdaExpression CreateChildItemsFilterExpression()
        {
            return Expression.Lambda(
                (Expression) Expression.Equal(this.CreateGroupByExpression().Body,
                    (Expression) Expression.Property((Expression) this.GroupingParameterExpression, "Key")),
                new ParameterExpression[1]
                {
                    this.ParameterExpression
                });
        }

        protected MemberBinding CreateKeyMemberBinding()
        {
            PropertyInfo property = typeof(AggregateFunctionsGroup).GetProperty("Key");
            Expression expression =
                (Expression) Expression.Property((Expression) this.GroupingParameterExpression, "Key");
            if (expression.Type.IsValueType && !this.Queryable.Provider.IsEntityFrameworkProvider())
                expression = (Expression) Expression.Convert(expression, typeof(object));
            return (MemberBinding) Expression.Bind((MemberInfo) property, expression);
        }

        protected MemberBinding CreateCountMemberBinding()
        {
            return (MemberBinding) Expression.Bind(
                (MemberInfo) typeof(AggregateFunctionsGroup).GetProperty("ItemCount"), (Expression) Expression.Call(
                    typeof(Enumerable), "Count", new Type[1]
                    {
                        this.ItemType
                    }, new Expression[1]
                    {
                        (Expression) this.GroupingParameterExpression
                    }));
        }

        protected MemberBinding CreateFieldNameMemberBinding()
        {
            return (MemberBinding) Expression.Bind((MemberInfo) typeof(AggregateFunctionsGroup).GetProperty("Member"),
                (Expression) Expression.Constant((object) (this.GroupDescriptor.Member ?? "")));
        }

        protected MemberBinding CreateHasSubgroupsMemberBinding()
        {
            return (MemberBinding) Expression.Bind(
                (MemberInfo) typeof(AggregateFunctionsGroup).GetProperty("HasSubgroups"),
                (Expression) Expression.Constant((object) this.HasSubgroups));
        }

        protected MemberBinding CreateAggregateFunctionsProjectionMemberBinding()
        {
            return (MemberBinding) Expression.Bind(
                (MemberInfo) typeof(AggregateFunctionsGroup).GetProperty("AggregateFunctionsProjection"),
                this.CreateProjectionInitExpression());
        }

        private Expression CreateProjectionInitExpression()
        {
            List<Expression> list = this.ProjectionPropertyValueExpressions().ToList<Expression>();
            NewExpression projectionNewExpression = this.CreateProjectionNewExpression((IEnumerable<Expression>) list);
            IEnumerable<MemberBinding> projectionMemberBindings =
                this.CreateProjectionMemberBindings(projectionNewExpression.Type, (IEnumerable<Expression>) list);
            return (Expression) Expression.MemberInit(projectionNewExpression, projectionMemberBindings);
        }

        private IEnumerable<Expression> ProjectionPropertyValueExpressions()
        {
            return this.groupDescriptor.AggregateFunctions.Select<AggregateFunction, Expression>(
                (Func<AggregateFunction, Expression>) (f => f.CreateAggregateExpression(
                    this.AggregateParameterExpression, this.Options.LiftMemberAccessToNull)));
        }

        private NewExpression CreateProjectionNewExpression(IEnumerable<Expression> propertyValuesExpressions)
        {
            IEnumerable<DynamicProperty> properties =
                this.groupDescriptor.AggregateFunctions.Consolidate<AggregateFunction, Expression, DynamicProperty>(
                    propertyValuesExpressions,
                    (Func<AggregateFunction, Expression, DynamicProperty>) ((f, e) => new DynamicProperty(
                        f.FunctionName, e.Type)));
            return Expression.New(ClassFactory.Instance.GetDynamicClass(properties));
        }

        private IEnumerable<MemberBinding> CreateProjectionMemberBindings(Type projectionType,
            IEnumerable<Expression> propertyValuesExpressions)
        {
            return this.groupDescriptor.AggregateFunctions.Consolidate<AggregateFunction, Expression, MemberAssignment>(
                    propertyValuesExpressions,
                    (Func<AggregateFunction, Expression, MemberAssignment>) ((f, e) => Expression.Bind(
                        (MemberInfo) projectionType.GetProperty(f.FunctionName), e)))
                .Cast<MemberBinding>();
        }
    }
}