using System;
using System.Linq.Expressions;

namespace CustomerPortalCMS.Models.UI
{
    internal class PropertyAccessExpressionBuilder : MemberAccessExpressionBuilderBase
    {
        public PropertyAccessExpressionBuilder(Type itemType, string memberName)
            : base(itemType, memberName)
        {
        }

        public override Expression CreateMemberAccessExpression()
        {
            if (string.IsNullOrEmpty(this.MemberName))
                return (Expression) this.ParameterExpression;
            return ExpressionFactory.MakeMemberAccess((Expression) this.ParameterExpression, this.MemberName,
                this.Options.LiftMemberAccessToNull);
        }
    }
}
