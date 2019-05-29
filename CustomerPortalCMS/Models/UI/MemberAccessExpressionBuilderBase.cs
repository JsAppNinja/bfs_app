using System;
using System.Linq.Expressions;

namespace CustomerPortalCMS.Models.UI
{
  internal abstract class MemberAccessExpressionBuilderBase : ExpressionBuilderBase
  {
    private readonly string memberName;

    public string MemberName
    {
      get
      {
        return this.memberName;
      }
    }

    protected MemberAccessExpressionBuilderBase(Type itemType, string memberName)
      : base(itemType)
    {
      this.memberName = memberName;
    }

    public abstract Expression CreateMemberAccessExpression();

    internal LambdaExpression CreateLambdaExpression()
    {
      return Expression.Lambda(this.CreateMemberAccessExpression(), new ParameterExpression[1]
      {
        this.ParameterExpression
      });
    }
  }
}
