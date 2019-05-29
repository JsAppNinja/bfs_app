using System;
using System.Globalization;
using System.Linq.Expressions;

namespace CustomerPortalCMS.Models.UI
{
    internal class FilterDescriptorExpressionBuilder : FilterExpressionBuilder
    {
        private readonly FilterDescriptor descriptor;

        public FilterDescriptor FilterDescriptor
        {
            get { return this.descriptor; }
        }

        public FilterDescriptorExpressionBuilder(ParameterExpression parameterExpression, FilterDescriptor descriptor)
            : base(parameterExpression)
        {
            this.descriptor = descriptor;
        }

        /// <exception cref="T:System.ArgumentException"><c>ArgumentException</c>.</exception>
        public override Expression CreateBodyExpression()
        {
            Expression memberExpression = this.CreateMemberExpression();
            Type type = memberExpression.Type;
            Expression valueExpression =
                FilterDescriptorExpressionBuilder.CreateValueExpression(type, this.descriptor.Value,
                    CultureInfo.InvariantCulture);
            bool flag = true;
            if (FilterDescriptorExpressionBuilder.TypesAreDifferent(this.descriptor, memberExpression, valueExpression))
            {
                if (!FilterDescriptorExpressionBuilder.TryConvertExpressionTypes(ref memberExpression,
                    ref valueExpression))
                    flag = false;
            }
            else if (memberExpression.Type.IsEnumType() || valueExpression.Type.IsEnumType())
            {
                if (!FilterDescriptorExpressionBuilder.TryPromoteNullableEnums(ref memberExpression,
                    ref valueExpression))
                    flag = false;
            }
            else if (type.IsNullableType() && memberExpression.Type != valueExpression.Type &&
                     !FilterDescriptorExpressionBuilder.TryConvertNullableValue(memberExpression, ref valueExpression))
                flag = false;
            if (!flag)
                throw new ArgumentException(string.Format((IFormatProvider) CultureInfo.InvariantCulture,
                    "Operator '{0}' is incompatible with operand types '{1}' and '{2}'",
                    (object) this.descriptor.Operator, (object) memberExpression.Type.GetTypeName(),
                    (object) valueExpression.Type.GetTypeName()));
            return this.descriptor.Operator.CreateExpression(memberExpression, valueExpression,
                this.Options.LiftMemberAccessToNull);
        }

        public FilterDescription CreateFilterDescription()
        {
            return (FilterDescription) new PredicateFilterDescription(this.CreateFilterExpression().Compile());
        }

        protected virtual Expression CreateMemberExpression()
        {
            Type memberType = this.FilterDescriptor.MemberType;
            MemberAccessExpressionBuilderBase expressionBuilderBase =
                ExpressionBuilderFactory.MemberAccess(this.ParameterExpression.Type, memberType,
                    this.FilterDescriptor.Member);
            expressionBuilderBase.Options.CopyFrom(this.Options);
            expressionBuilderBase.ParameterExpression = this.ParameterExpression;
            Expression expression = expressionBuilderBase.CreateMemberAccessExpression();
            if (memberType != (Type) null && expression.Type.GetNonNullableType() != memberType.GetNonNullableType())
                expression = (Expression) Expression.Convert(expression, memberType);
            return expression;
        }

        private static Expression CreateConstantExpression(object value)
        {
            if (value == null)
                return ExpressionConstants.NullLiteral;
            return (Expression) Expression.Constant(value);
        }

        private static Expression CreateValueExpression(Type targetType, object value, CultureInfo culture)
        {
            if (targetType != typeof(string) && (!targetType.IsValueType || targetType.IsNullableType()) &&
                string.Compare(value as string, "null", StringComparison.OrdinalIgnoreCase) == 0)
                value = (object) null;
            if (value != null)
            {
                Type nonNullableType = targetType.GetNonNullableType();
                if (value.GetType() != nonNullableType)
                {
                    if (nonNullableType.IsEnum)
                        value = Enum.Parse(nonNullableType, value.ToString(), true);
                    else if (nonNullableType == typeof(Guid))
                        value = (object) new Guid(value.ToString());
                    else if (value is IConvertible)
                        value = Convert.ChangeType(value, nonNullableType, (IFormatProvider) culture);
                }
            }
            return FilterDescriptorExpressionBuilder.CreateConstantExpression(value);
        }

        private static Expression PromoteExpression(Expression expr, Type type, bool exact)
        {
            if (expr.Type == type)
                return expr;
            ConstantExpression constantExpression = expr as ConstantExpression;
            if (constantExpression != null && constantExpression == ExpressionConstants.NullLiteral &&
                (!type.IsValueType || type.IsNullableType()))
                return (Expression) Expression.Constant((object) null, type);
            if (!expr.Type.IsCompatibleWith(type))
                return (Expression) null;
            if (type.IsValueType || exact)
                return (Expression) Expression.Convert(expr, type);
            return expr;
        }

        private static bool TryConvertExpressionTypes(ref Expression memberExpression, ref Expression valueExpression)
        {
            if (memberExpression.Type != valueExpression.Type)
            {
                if (!memberExpression.Type.IsAssignableFrom(valueExpression.Type))
                {
                    if (!valueExpression.Type.IsAssignableFrom(memberExpression.Type))
                        return false;
                    memberExpression = (Expression) Expression.Convert(memberExpression, valueExpression.Type);
                }
                else
                    valueExpression = (Expression) Expression.Convert(valueExpression, memberExpression.Type);
            }
            return true;
        }

        private static bool TryConvertNullableValue(Expression memberExpression, ref Expression valueExpression)
        {
            ConstantExpression constantExpression = valueExpression as ConstantExpression;
            if (constantExpression != null)
            {
                try
                {
                    valueExpression = (Expression) Expression.Constant(constantExpression.Value, memberExpression.Type);
                }
                catch (ArgumentException)
                {
                    return false;
                }
            }
            return true;
        }

        private static bool TryPromoteNullableEnums(ref Expression memberExpression, ref Expression valueExpression)
        {
            if (memberExpression.Type != valueExpression.Type)
            {
                Expression expression1 =
                    FilterDescriptorExpressionBuilder.PromoteExpression(valueExpression, memberExpression.Type, true);
                if (expression1 == null)
                {
                    Expression expression2 =
                        FilterDescriptorExpressionBuilder.PromoteExpression(memberExpression, valueExpression.Type,
                            true);
                    if (expression2 == null)
                        return false;
                    memberExpression = expression2;
                }
                else
                    valueExpression = expression1;
            }
            return true;
        }

        private static bool TypesAreDifferent(FilterDescriptor descriptor, Expression memberExpression,
            Expression valueExpression)
        {
            if ((descriptor.Operator == FilterOperator.IsEqualTo ||
                 descriptor.Operator == FilterOperator.IsNotEqualTo) && !memberExpression.Type.IsValueType)
                return !valueExpression.Type.IsValueType;
            return false;
        }
    }
}
