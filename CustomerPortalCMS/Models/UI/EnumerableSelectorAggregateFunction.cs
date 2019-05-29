using System.Linq.Expressions;


namespace CustomerPortalCMS.Models.UI
{
    public abstract class EnumerableSelectorAggregateFunction : EnumerableAggregateFunctionBase
    {
        /// <summary>
        /// Creates the aggregate expression using <see cref="T:Implementation.Expressions.EnumerableSelectorAggregateFunctionExpressionBuilder" />.
        /// </summary>
        /// <param name="enumerableExpression">The grouping expression.</param>
        /// <param name="liftMemberAccessToNull"></param>
        /// <returns></returns>
        public override Expression CreateAggregateExpression(Expression enumerableExpression,
            bool liftMemberAccessToNull)
        {
            EnumerableSelectorAggregateFunctionExpressionBuilder expressionBuilder =
                new EnumerableSelectorAggregateFunctionExpressionBuilder(enumerableExpression, this);
            expressionBuilder.Options.LiftMemberAccessToNull = liftMemberAccessToNull;
            return expressionBuilder.CreateAggregateExpression();
        }
    }
}