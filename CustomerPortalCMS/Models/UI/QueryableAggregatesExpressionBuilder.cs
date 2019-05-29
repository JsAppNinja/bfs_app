using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace CustomerPortalCMS.Models.UI
{
    internal class QueryableAggregatesExpressionBuilder : GroupDescriptorExpressionBuilder
    {
        public QueryableAggregatesExpressionBuilder(IQueryable queryable,
            IEnumerable<AggregateFunction> aggregateFunctions)
            : base(queryable, QueryableAggregatesExpressionBuilder.CreateDescriptor(aggregateFunctions))
        {
        }

        private static GroupDescriptor CreateDescriptor(IEnumerable<AggregateFunction> aggregateFunctions)
        {
            GroupDescriptor groupDescriptor = new GroupDescriptor();
            groupDescriptor.AggregateFunctions.AddRange<AggregateFunction>(aggregateFunctions);
            return groupDescriptor;
        }

        protected override LambdaExpression CreateGroupByExpression()
        {
            return Expression.Lambda((Expression) Expression.Constant((object) 1), new ParameterExpression[1]
            {
                this.ParameterExpression
            });
        }

        protected override IEnumerable<MemberBinding> CreateMemberBindings()
        {
            yield return this.CreateKeyMemberBinding();
            yield return this.CreateCountMemberBinding();
            yield return this.CreateHasSubgroupsMemberBinding();
            if (this.GroupDescriptor.AggregateFunctions.Count > 0)
                yield return this.CreateAggregateFunctionsProjectionMemberBinding();
            yield return this.CreateFieldNameMemberBinding();
        }
    }
}
