using System.Linq.Expressions;
using System.Web.Mvc;

namespace CustomerPortalCMS.Models.UI
{
    public static class ExpressionExtensions
    {
        public static string MemberWithoutInstance(this LambdaExpression expression)
        {
            return ExpressionHelper.GetExpressionText(expression);
        }

        public static bool IsBindable(this LambdaExpression expression)
        {
            switch (expression.Body.NodeType)
            {
                case ExpressionType.MemberAccess:
                case ExpressionType.Parameter:
                    return true;
                default:
                    return false;
            }
        }

        public static MemberExpression ToMemberExpression(this LambdaExpression expression)
        {
            MemberExpression memberExpression = expression.Body as MemberExpression;
            if (memberExpression == null)
            {
                UnaryExpression body = expression.Body as UnaryExpression;
                if (body != null)
                    memberExpression = body.Operand as MemberExpression;
            }
            return memberExpression;
        }
    }
}
