using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace CustomerPortalCMS.Models.UI
{
    internal abstract class AggregateFunctionExpressionBuilderBase : ExpressionBuilderBase
    {
        private readonly AggregateFunction function;
        private readonly Expression enumerableExpression;

        protected AggregateFunction Function
        {
            get { return this.function; }
        }

        protected Expression EnumerableExpression
        {
            get { return this.enumerableExpression; }
        }

        /// <exception cref="T:System.ArgumentException">
        /// Provided <paramref name="enumerableExpression" />'s <see cref="P:System.Linq.Expressions.Expression.Type" /> is not <see cref="T:System.Collections.Generic.IEnumerable`1" />
        /// </exception>
        protected AggregateFunctionExpressionBuilderBase(Expression enumerableExpression,
            AggregateFunction function)
            : base(AggregateFunctionExpressionBuilderBase.ExtractItemTypeFromEnumerableType(enumerableExpression.Type))
        {
            this.enumerableExpression = enumerableExpression;
            this.function = function;
        }

        public abstract Expression CreateAggregateExpression();

        /// <exception cref="T:System.ArgumentException">Provided type is not <see cref="T:System.Collections.Generic.IEnumerable`1" /></exception>
        private static Type ExtractItemTypeFromEnumerableType(Type type)
        {
            Type genericType = type.FindGenericType(typeof(IEnumerable<>));
            if (genericType == (Type) null)
                throw new ArgumentException("Provided type is not IEnumerable<>", "type");
            return ((IEnumerable<Type>) genericType.GetGenericArguments()).First<Type>();
        }
    }
}
