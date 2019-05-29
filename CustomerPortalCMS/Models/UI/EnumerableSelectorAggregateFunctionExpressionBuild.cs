using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace CustomerPortalCMS.Models.UI
{
    internal class EnumerableSelectorAggregateFunctionExpressionBuilder : AggregateFunctionExpressionBuilderBase
    {
        protected new EnumerableSelectorAggregateFunction Function
        {
            get { return (EnumerableSelectorAggregateFunction)base.Function; }
        }

        /// <exception cref="T:System.ArgumentException">
        /// Provided <paramref name="enumerableExpression" />'s <see cref="P:System.Linq.Expressions.Expression.Type" /> is not <see cref="T:System.Collections.Generic.IEnumerable`1" />
        /// </exception>
        public EnumerableSelectorAggregateFunctionExpressionBuilder(Expression enumerableExpression,
            EnumerableSelectorAggregateFunction function)
            : base(enumerableExpression, (AggregateFunction) function)
        {
        }

        public override Expression CreateAggregateExpression()
        {
            return this.CreateMethodCallExpression(this.CreateMemberSelectorExpression());
        }

        private LambdaExpression CreateMemberSelectorExpression()
        {
            MemberAccessExpressionBuilderBase expressionBuilderBase =
                ExpressionBuilderFactory.MemberAccess(this.ItemType, (Type) null, this.Function.SourceField);
            expressionBuilderBase.Options.CopyFrom(this.Options);
            return Expression.Lambda(
                this.ConvertMemberAccessExpression(expressionBuilderBase.CreateMemberAccessExpression()),
                new ParameterExpression[1]
                {
                    expressionBuilderBase.ParameterExpression
                });
        }

        private Expression CreateMethodCallExpression(LambdaExpression memberSelectorExpression)
        {
            return (Expression) Expression.Call(this.Function.ExtensionMethodsType, this.Function.AggregateMethodName,
                this.GetMethodArgumentsTypes(memberSelectorExpression).ToArray<Type>(),
                new Expression[2] {this.EnumerableExpression, (Expression) memberSelectorExpression});
        }

        private IEnumerable<Type> GetMethodArgumentsTypes(LambdaExpression memberSelectorExpression)
        {
            yield return this.ItemType;
            if (!memberSelectorExpression.Body.Type.IsNumericType())
                yield return memberSelectorExpression.Body.Type;
        }

        private Expression ConvertMemberAccessExpression(Expression memberExpression)
        {
            if ((this.ItemType.IsDataRow() || this.ItemType.IsDynamicObject()) &&
                this.Function.MemberType != (Type) null)
                memberExpression = (Expression) Expression.Convert(memberExpression, this.Function.MemberType);
            if (EnumerableSelectorAggregateFunctionExpressionBuilder.ShouldConvertTypeToInteger(memberExpression.Type
                .GetNonNullableType()))
                memberExpression =
                    EnumerableSelectorAggregateFunctionExpressionBuilder
                        .ConvertMemberExpressionToInteger(memberExpression);
            return memberExpression;
        }

        private static Expression ConvertMemberExpressionToInteger(Expression expression)
        {
            Type type = expression.Type.IsNullableType() ? typeof(int?) : typeof(int);
            return (Expression) Expression.Convert(expression, type);
        }

        private static bool ShouldConvertTypeToInteger(Type type)
        {
            switch (Type.GetTypeCode(type))
            {
                case TypeCode.SByte:
                case TypeCode.Byte:
                case TypeCode.Int16:
                case TypeCode.UInt16:
                    return true;
                default:
                    return false;
            }
        }
    }
}