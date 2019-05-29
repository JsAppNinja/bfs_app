using System;

namespace CustomerPortalCMS.Models.UI
{
    internal static class BindingHelper
    {
        internal static Type ExtractMemberTypeFromObject(object item, string memberName)
        {
            if (!item.GetType().IsDynamicObject())
                return new PropertyAccessExpressionBuilder(item.GetType(), memberName).CreateMemberAccessExpression()
                    .Type;
            object obj = ((Func<object, object>) ExpressionBuilder.Lambda<object>(memberName, true).Compile())(item);
            if (obj != null)
                return obj.GetType();
            return (Type) null;
        }
    }
}
