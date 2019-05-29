using System;
using System.Linq.Expressions;

namespace CustomerPortalCMS.Models.UI
{
    internal class EnumerableAggregateFunctionExpressionBuilder : AggregateFunctionExpressionBuilderBase
    {
        protected new EnumerableAggregateFunction Function
        {
            get { return (EnumerableAggregateFunction)base.Function; }
        }

        /// <exception cref="T:System.ArgumentException">
        /// Provided <paramref name="enumerableExpression" />'s <see cref="P:System.Linq.Expressions.Expression.Type" /> is not <see cref="T:System.Collections.Generic.IEnumerable`1" />
        /// </exception>
        public EnumerableAggregateFunctionExpressionBuilder(Expression enumerableExpression,
            EnumerableAggregateFunction function)
            : base(enumerableExpression, (AggregateFunction) function)
        {
        }

        public override Expression CreateAggregateExpression()
        {
            return (Expression) Expression.Call(this.Function.ExtensionMethodsType, this.Function.AggregateMethodName,
                new Type[1]
                {
                    this.ItemType
                }, new Expression[1] {this.EnumerableExpression});
        }
    }
}
