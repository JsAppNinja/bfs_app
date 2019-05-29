using System;
using System.Linq.Expressions;
using System.Reflection;
using System.Xml;

namespace CustomerPortalCMS.Models.UI
{
    internal class XmlNodeChildElementAccessExpressionBuilder : MemberAccessExpressionBuilderBase
    {
        private static readonly MethodInfo ChildElementInnerTextMethod =
            typeof(XmlNodeExtensions).GetMethod("ChildElementInnerText", new Type[2]
            {
                typeof(XmlNode),
                typeof(string)
            });

        public XmlNodeChildElementAccessExpressionBuilder(string memberName)
            : base(typeof(XmlNode), memberName)
        {
        }

        public override Expression CreateMemberAccessExpression()
        {
            ConstantExpression constantExpression = Expression.Constant((object) this.MemberName);
            return (Expression) Expression.Call(XmlNodeChildElementAccessExpressionBuilder.ChildElementInnerTextMethod,
                (Expression) this.ParameterExpression, (Expression) constantExpression);
        }
    }
}
