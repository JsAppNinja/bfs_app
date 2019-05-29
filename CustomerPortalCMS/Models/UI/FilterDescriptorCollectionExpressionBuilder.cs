using System.Collections.Generic;
using System.Linq.Expressions;

namespace CustomerPortalCMS.Models.UI
{
    internal class FilterDescriptorCollectionExpressionBuilder : FilterExpressionBuilder
    {
        private readonly IEnumerable<IFilterDescriptor> filterDescriptors;
        private readonly FilterCompositionLogicalOperator logicalOperator;

        public FilterDescriptorCollectionExpressionBuilder(ParameterExpression parameterExpression,
            IEnumerable<IFilterDescriptor> filterDescriptors)
            : this(parameterExpression, filterDescriptors, FilterCompositionLogicalOperator.And)
        {
        }

        public FilterDescriptorCollectionExpressionBuilder(ParameterExpression parameterExpression,
            IEnumerable<IFilterDescriptor> filterDescriptors, FilterCompositionLogicalOperator logicalOperator)
            : base(parameterExpression)
        {
            this.filterDescriptors = filterDescriptors;
            this.logicalOperator = logicalOperator;
        }

        public override Expression CreateBodyExpression()
        {
            Expression left = (Expression) null;
            foreach (IFilterDescriptor filterDescriptor in this.filterDescriptors)
            {
                this.InitilializeExpressionBuilderOptions(filterDescriptor);
                Expression filterExpression =
                    filterDescriptor.CreateFilterExpression((Expression) this.ParameterExpression);
                left = left != null
                    ? FilterDescriptorCollectionExpressionBuilder.ComposeExpressions(left, filterExpression,
                        this.logicalOperator)
                    : filterExpression;
            }
            return left ?? ExpressionConstants.TrueLiteral;
        }

        private static Expression ComposeExpressions(Expression left, Expression right,
            FilterCompositionLogicalOperator logicalOperator)
        {
            switch (logicalOperator)
            {
                case FilterCompositionLogicalOperator.Or:
                    return (Expression) Expression.OrElse(left, right);
                default:
                    return (Expression) Expression.AndAlso(left, right);
            }
        }

        private void InitilializeExpressionBuilderOptions(IFilterDescriptor filterDescriptor)
        {
            FilterDescriptorBase filterDescriptorBase = filterDescriptor as FilterDescriptorBase;
            if (filterDescriptorBase == null)
                return;
            filterDescriptorBase.ExpressionBuilderOptions.CopyFrom(this.Options);
        }
    }
}