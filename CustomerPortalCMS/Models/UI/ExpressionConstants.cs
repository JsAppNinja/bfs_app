using System.Linq.Expressions;

namespace CustomerPortalCMS.Models.UI
{
    internal class ExpressionConstants
    {
        internal static Expression TrueLiteral
        {
            get { return (Expression) Expression.Constant((object) true); }
        }

        internal static Expression FalseLiteral
        {
            get { return (Expression) Expression.Constant((object) false); }
        }

        internal static Expression NullLiteral
        {
            get { return (Expression) Expression.Constant((object) null); }
        }
    }
}
