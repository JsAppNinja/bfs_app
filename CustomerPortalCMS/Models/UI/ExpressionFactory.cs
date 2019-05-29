using System;
using System.Linq.Expressions;
using System.Reflection;

namespace CustomerPortalCMS.Models.UI
{
    internal static class ExpressionFactory
    {
        public static ConstantExpression ZeroExpression
        {
            get { return Expression.Constant((object) 0); }
        }

        public static ConstantExpression EmptyStringExpression
        {
            get { return Expression.Constant((object) string.Empty); }
        }

        public static Expression DefaltValueExpression(Type type)
        {
            return (Expression) Expression.Constant(type.DefaultValue(), type);
        }

        public static Expression MakeMemberAccess(Expression instance, string memberName)
        {
            foreach (IMemberAccessToken token in MemberAccessTokenizer.GetTokens(memberName))
                instance = token.CreateMemberAccessExpression(instance);
            return instance;
        }

        public static Expression MakeMemberAccess(Expression instance, string memberName, bool liftMemberAccessToNull)
        {
            Expression memberAccess = ExpressionFactory.MakeMemberAccess(instance, memberName);
            if (liftMemberAccessToNull)
                return ExpressionFactory.LiftMemberAccessToNull(memberAccess);
            return memberAccess;
        }

        public static Expression LiftMemberAccessToNull(Expression memberAccess)
        {
            Expression defaultValue = ExpressionFactory.DefaltValueExpression(memberAccess.Type);
            return ExpressionFactory.LiftMemberAccessToNullRecursive(memberAccess, memberAccess, defaultValue);
        }

        public static Expression LiftMethodCallToNull(Expression instance, MethodInfo method,
            params Expression[] arguments)
        {
            return ExpressionFactory.LiftMemberAccessToNull(
                (Expression) Expression.Call(
                    ExpressionFactory.ExtractMemberAccessExpressionFromLiftedExpression(instance), method, arguments));
        }

        private static Expression LiftMemberAccessToNullRecursive(Expression memberAccess,
            Expression conditionalExpression, Expression defaultValue)
        {
            Expression expressionFromExpression = ExpressionFactory.GetInstanceExpressionFromExpression(memberAccess);
            if (expressionFromExpression == null)
                return conditionalExpression;
            conditionalExpression =
                ExpressionFactory.CreateIfNullExpression(expressionFromExpression, conditionalExpression, defaultValue);
            return ExpressionFactory.LiftMemberAccessToNullRecursive(expressionFromExpression, conditionalExpression,
                defaultValue);
        }

        private static Expression GetInstanceExpressionFromExpression(Expression memberAccess)
        {
            MemberExpression memberExpression = memberAccess as MemberExpression;
            if (memberExpression != null)
                return memberExpression.Expression;
            MethodCallExpression methodCallExpression = memberAccess as MethodCallExpression;
            if (methodCallExpression != null)
                return methodCallExpression.Object;
            return (Expression) null;
        }

        private static Expression CreateIfNullExpression(Expression instance, Expression memberAccess,
            Expression defaultValue)
        {
            if (ExpressionFactory.ShouldGenerateCondition(instance.Type))
                return ExpressionFactory.CreateConditionExpression(instance, memberAccess, defaultValue);
            return memberAccess;
        }

        private static bool ShouldGenerateCondition(Type type)
        {
            if (type.IsValueType)
                return type.IsNullableType();
            return true;
        }

        private static Expression CreateConditionExpression(Expression instance, Expression memberAccess,
            Expression defaultValue)
        {
            Expression right = ExpressionFactory.DefaltValueExpression(instance.Type);
            return (Expression) Expression.Condition((Expression) Expression.NotEqual(instance, right), memberAccess,
                defaultValue);
        }

        private static Expression ExtractMemberAccessExpressionFromLiftedExpression(Expression liftedToNullExpression)
        {
            ConditionalExpression conditionalExpression;
            for (;
                liftedToNullExpression.NodeType == ExpressionType.Conditional;
                liftedToNullExpression = conditionalExpression.Test.NodeType != ExpressionType.NotEqual
                    ? conditionalExpression.IfFalse
                    : conditionalExpression.IfTrue)
                conditionalExpression = (ConditionalExpression) liftedToNullExpression;
            return liftedToNullExpression;
        }

        /// <exception cref="T:System.ArgumentException">Provided expression should have string type</exception>
        internal static Expression LiftStringExpressionToEmpty(Expression stringExpression)
        {
            if (stringExpression.Type != typeof(string))
                throw new ArgumentException("Provided expression should have string type", "stringExpression");
            if (ExpressionFactory.IsNotNullConstantExpression(stringExpression))
                return stringExpression;
            return (Expression) Expression.Coalesce(stringExpression,
                (Expression) ExpressionFactory.EmptyStringExpression);
        }

        internal static bool IsNotNullConstantExpression(Expression expression)
        {
            if (expression.NodeType == ExpressionType.Constant)
                return ((ConstantExpression) expression).Value != null;
            return false;
        }
    }
}