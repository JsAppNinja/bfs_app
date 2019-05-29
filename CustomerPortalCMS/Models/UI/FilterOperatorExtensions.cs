using System;
using System.Linq.Expressions;
using System.Reflection;

namespace CustomerPortalCMS.Models.UI
{
  internal static class FilterOperatorExtensions
  {
    internal static readonly MethodInfo StringToLowerMethodInfo = typeof (string).GetMethod("ToLower", new Type[0]);
    internal static readonly MethodInfo StringStartsWithMethodInfo = typeof (string).GetMethod("StartsWith", new Type[1]
    {
      typeof (string)
    });
    internal static readonly MethodInfo StringEndsWithMethodInfo = typeof (string).GetMethod("EndsWith", new Type[1]
    {
      typeof (string)
    });
    internal static readonly MethodInfo StringCompareMethodInfo = typeof (string).GetMethod("Compare", new Type[2]
    {
      typeof (string),
      typeof (string)
    });
    internal static readonly MethodInfo StringContainsMethodInfo = typeof (string).GetMethod("Contains", new Type[1]
    {
      typeof (string)
    });

    /// <exception cref="T:System.InvalidOperationException"><c>InvalidOperationException</c>.</exception>
    internal static Expression CreateExpression(this FilterOperator filterOperator, Expression left, Expression right, bool liftMemberAccess)
    {
      switch (filterOperator)
      {
        case FilterOperator.IsLessThan:
          return FilterOperatorExtensions.GenerateLessThan(left, right, liftMemberAccess);
        case FilterOperator.IsLessThanOrEqualTo:
          return FilterOperatorExtensions.GenerateLessThanEqual(left, right, liftMemberAccess);
        case FilterOperator.IsEqualTo:
          return FilterOperatorExtensions.GenerateEqual(left, right, liftMemberAccess);
        case FilterOperator.IsNotEqualTo:
          return FilterOperatorExtensions.GenerateNotEqual(left, right, liftMemberAccess);
        case FilterOperator.IsGreaterThanOrEqualTo:
          return FilterOperatorExtensions.GenerateGreaterThanEqual(left, right, liftMemberAccess);
        case FilterOperator.IsGreaterThan:
          return FilterOperatorExtensions.GenerateGreaterThan(left, right, liftMemberAccess);
        case FilterOperator.StartsWith:
          return FilterOperatorExtensions.GenerateStartsWith(left, right, liftMemberAccess);
        case FilterOperator.EndsWith:
          return FilterOperatorExtensions.GenerateEndsWith(left, right, liftMemberAccess);
        case FilterOperator.Contains:
          return FilterOperatorExtensions.GenerateContains(left, right, liftMemberAccess);
        case FilterOperator.IsContainedIn:
          return FilterOperatorExtensions.GenerateIsContainedIn(left, right, liftMemberAccess);
        case FilterOperator.DoesNotContain:
          return FilterOperatorExtensions.GenerateNotContains(left, right, liftMemberAccess);
        default:
          throw new InvalidOperationException();
      }
    }

    private static Expression GenerateEqual(Expression left, Expression right, bool liftMemberAccess)
    {
      if (left.Type == typeof (string))
      {
        left = FilterOperatorExtensions.GenerateToLowerCall(left, liftMemberAccess);
        right = FilterOperatorExtensions.GenerateToLowerCall(right, liftMemberAccess);
      }
      return (Expression) Expression.Equal(left, right);
    }

    private static Expression GenerateNotEqual(Expression left, Expression right, bool liftMemberAccess)
    {
      if (left.Type == typeof (string))
      {
        left = FilterOperatorExtensions.GenerateToLowerCall(left, liftMemberAccess);
        right = FilterOperatorExtensions.GenerateToLowerCall(right, liftMemberAccess);
      }
      return (Expression) Expression.NotEqual(left, right);
    }

    private static Expression GenerateGreaterThan(Expression left, Expression right, bool liftMemberAccess)
    {
      if (left.Type == typeof (string))
        return (Expression) Expression.GreaterThan(FilterOperatorExtensions.GenerateCaseInsensitiveStringMethodCall(FilterOperatorExtensions.StringCompareMethodInfo, left, right, liftMemberAccess), (Expression) ExpressionFactory.ZeroExpression);
      return (Expression) Expression.GreaterThan(left, right);
    }

    private static Expression GenerateGreaterThanEqual(Expression left, Expression right, bool liftMemberAccess)
    {
      if (left.Type == typeof (string))
        return (Expression) Expression.GreaterThanOrEqual(FilterOperatorExtensions.GenerateCaseInsensitiveStringMethodCall(FilterOperatorExtensions.StringCompareMethodInfo, left, right, liftMemberAccess), (Expression) ExpressionFactory.ZeroExpression);
      return (Expression) Expression.GreaterThanOrEqual(left, right);
    }

    private static Expression GenerateLessThan(Expression left, Expression right, bool liftMemberAccess)
    {
      if (left.Type == typeof (string))
        return (Expression) Expression.LessThan(FilterOperatorExtensions.GenerateCaseInsensitiveStringMethodCall(FilterOperatorExtensions.StringCompareMethodInfo, left, right, liftMemberAccess), (Expression) ExpressionFactory.ZeroExpression);
      return (Expression) Expression.LessThan(left, right);
    }

    private static Expression GenerateLessThanEqual(Expression left, Expression right, bool liftMemberAccess)
    {
      if (left.Type == typeof (string))
        return (Expression) Expression.LessThanOrEqual(FilterOperatorExtensions.GenerateCaseInsensitiveStringMethodCall(FilterOperatorExtensions.StringCompareMethodInfo, left, right, liftMemberAccess), (Expression) ExpressionFactory.ZeroExpression);
      return (Expression) Expression.LessThanOrEqual(left, right);
    }

    private static Expression GenerateNotContains(Expression left, Expression right, bool liftMemberAccess)
    {
      return (Expression) Expression.Not(FilterOperatorExtensions.GenerateCaseInsensitiveStringMethodCall(FilterOperatorExtensions.StringContainsMethodInfo, left, right, liftMemberAccess));
    }

    private static Expression GenerateContains(Expression left, Expression right, bool liftMemberAccess)
    {
      return FilterOperatorExtensions.GenerateCaseInsensitiveStringMethodCall(FilterOperatorExtensions.StringContainsMethodInfo, left, right, liftMemberAccess);
    }

    private static Expression GenerateIsContainedIn(Expression left, Expression right, bool liftMemberAccess)
    {
      return FilterOperatorExtensions.GenerateCaseInsensitiveStringMethodCall(FilterOperatorExtensions.StringContainsMethodInfo, right, left, liftMemberAccess);
    }

    private static Expression GenerateStartsWith(Expression left, Expression right, bool liftMemberAccess)
    {
      return FilterOperatorExtensions.GenerateCaseInsensitiveStringMethodCall(FilterOperatorExtensions.StringStartsWithMethodInfo, left, right, liftMemberAccess);
    }

    private static Expression GenerateEndsWith(Expression left, Expression right, bool liftMemberAccess)
    {
      return FilterOperatorExtensions.GenerateCaseInsensitiveStringMethodCall(FilterOperatorExtensions.StringEndsWithMethodInfo, left, right, liftMemberAccess);
    }

    private static Expression GenerateCaseInsensitiveStringMethodCall(MethodInfo methodInfo, Expression left, Expression right, bool liftMemberAccess)
    {
      Expression toLowerCall1 = FilterOperatorExtensions.GenerateToLowerCall(left, liftMemberAccess);
      Expression toLowerCall2 = FilterOperatorExtensions.GenerateToLowerCall(right, liftMemberAccess);
      if (methodInfo.IsStatic)
        return (Expression) Expression.Call(methodInfo, new Expression[2]
        {
          toLowerCall1,
          toLowerCall2
        });
      return (Expression) Expression.Call(toLowerCall1, methodInfo, new Expression[1]
      {
        toLowerCall2
      });
    }

    private static Expression GenerateToLowerCall(Expression stringExpression, bool liftMemberAccess)
    {
      if (liftMemberAccess)
        stringExpression = ExpressionFactory.LiftStringExpressionToEmpty(stringExpression);
      return (Expression) Expression.Call(stringExpression, FilterOperatorExtensions.StringToLowerMethodInfo);
    }
  }
}
