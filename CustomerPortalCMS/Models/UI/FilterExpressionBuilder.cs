using System.Linq.Expressions;

namespace CustomerPortalCMS.Models.UI
{
  internal abstract class FilterExpressionBuilder : ExpressionBuilderBase
  {
    protected FilterExpressionBuilder(ParameterExpression parameterExpression)
      : base(parameterExpression.Type)
    {
      this.ParameterExpression = parameterExpression;
    }

    public abstract Expression CreateBodyExpression();

    /// <exception cref="T:System.ArgumentException"><c>ArgumentException</c>.</exception>
    public LambdaExpression CreateFilterExpression()
    {
      return Expression.Lambda(this.CreateBodyExpression(), new ParameterExpression[1]
      {
        this.ParameterExpression
      });
    }
  }
}
