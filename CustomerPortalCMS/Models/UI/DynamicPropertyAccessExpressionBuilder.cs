using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.CSharp.RuntimeBinder;

namespace CustomerPortalCMS.Models.UI
{
    internal class DynamicPropertyAccessExpressionBuilder : MemberAccessExpressionBuilderBase
    {
        public DynamicPropertyAccessExpressionBuilder(Type itemType, string memberName)
            : base(itemType, memberName)
        {
        }

        public override Expression CreateMemberAccessExpression()
        {
            if (string.IsNullOrEmpty(this.MemberName))
                return (Expression) this.ParameterExpression;
            Expression instance = (Expression) this.ParameterExpression;
            foreach (IMemberAccessToken token in MemberAccessTokenizer.GetTokens(this.MemberName))
            {
                if (token is PropertyToken)
                {
                    string propertyName = ((PropertyToken) token).PropertyName;
                    instance = this.CreatePropertyAccessExpression(instance, propertyName);
                }
                else if (token is IndexerToken)
                    instance = this.CreateIndexerAccessExpression(instance, (IndexerToken) token);
            }
            return instance;
        }

        private Expression CreateIndexerAccessExpression(Expression instance, IndexerToken indexerToken)
        {
            return (Expression) Expression.Dynamic(Binder.GetIndex(CSharpBinderFlags.None,
                typeof(DynamicPropertyAccessExpressionBuilder),
                (IEnumerable<CSharpArgumentInfo>) new CSharpArgumentInfo[2]
                {
                    CSharpArgumentInfo.Create(CSharpArgumentInfoFlags.None, (string) null),
                    CSharpArgumentInfo.Create(
                        CSharpArgumentInfoFlags.UseCompileTimeType | CSharpArgumentInfoFlags.Constant, (string) null)
                }), typeof(object), new Expression[2]
            {
                instance,
                (Expression) indexerToken.Arguments
                    .Select<object, ConstantExpression>(new Func<object, ConstantExpression>(Expression.Constant))
                    .First<ConstantExpression>()
            });
        }

        private Expression CreatePropertyAccessExpression(Expression instance, string propertyName)
        {
            return (Expression) Expression.Dynamic(Binder.GetMember(CSharpBinderFlags.None, propertyName,
                typeof(DynamicPropertyAccessExpressionBuilder),
                (IEnumerable<CSharpArgumentInfo>) new CSharpArgumentInfo[1]
                {
                    CSharpArgumentInfo.Create(CSharpArgumentInfoFlags.None, (string) null)
                }), typeof(object), new Expression[1] {instance});
        }
    }
}
