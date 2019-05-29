using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace CustomerPortalCMS.Models.UI
{
  internal static class MemberAccessTokenExtensions
  {
    /// <exception cref="T:System.ArgumentException">
    /// Invalid name for property or field; or indexer with the specified arguments.
    /// </exception>
    public static Expression CreateMemberAccessExpression(this IMemberAccessToken token, Expression instance)
    {
      MemberInfo memberInfoForType = token.GetMemberInfoForType(instance.Type);
      if (memberInfoForType == (MemberInfo) null)
        throw new ArgumentException(MemberAccessTokenExtensions.FormatInvalidTokenErrorMessage(token, instance.Type));
      IndexerToken indexerToken = token as IndexerToken;
      if (indexerToken == null)
        return (Expression) Expression.MakeMemberAccess(instance, memberInfoForType);
      IEnumerable<Expression> indexerArguments = GetIndexerArguments(indexerToken);
      return (Expression) Expression.Call(instance, (MethodInfo) memberInfoForType, indexerArguments);
    }

    private static string FormatInvalidTokenErrorMessage(IMemberAccessToken token, Type type)
    {
      PropertyToken propertyToken = token as PropertyToken;
      string str1;
      string str2;
      if (propertyToken != null)
      {
        str1 = "property or field";
        str2 = propertyToken.PropertyName;
      }
      else
      {
        str1 = "indexer with arguments";
        str2 = string.Join(",", Enumerable.Where<object>(((IndexerToken) token).Arguments, (Func<object, bool>) (a => a != null)).Select<object, string>((Func<object, string>) (a => a.ToString())).ToArray<string>());
      }
      return string.Format((IFormatProvider) CultureInfo.CurrentCulture, "Invalid {0} - '{1}' for type: {2}", (object) str1, (object) str2, (object) type.GetTypeName());
    }

    private static IEnumerable<Expression> GetIndexerArguments(this IndexerToken indexerToken)
    {
      return Enumerable.Select<object, Expression>(indexerToken.Arguments, (Func<object, Expression>) (a => (Expression) Expression.Constant(a)));
    }

    /// <exception cref="T:System.InvalidOperationException"><c>InvalidOperationException</c>.</exception>
    private static MemberInfo GetMemberInfoForType(this IMemberAccessToken token, Type targetType)
    {
      PropertyToken token1 = token as PropertyToken;
      if (token1 != null)
        return MemberAccessTokenExtensions.GetMemberInfoFromPropertyToken(token1, targetType);
      IndexerToken token2 = token as IndexerToken;
      if (token2 != null)
        return MemberAccessTokenExtensions.GetMemberInfoFromIndexerToken(token2, targetType);
      throw new InvalidOperationException(token.GetType().GetTypeName() + " is not supported");
    }

    private static MemberInfo GetMemberInfoFromPropertyToken(PropertyToken token, Type targetType)
    {
      return targetType.FindPropertyOrField(token.PropertyName);
    }

    private static MemberInfo GetMemberInfoFromIndexerToken(IndexerToken token, Type targetType)
    {
      PropertyInfo indexerPropertyInfo = targetType.GetIndexerPropertyInfo(Enumerable.Select<object, Type>(token.Arguments, (Func<object, Type>) (a => a.GetType())).ToArray<Type>());
      if (indexerPropertyInfo != (PropertyInfo) null)
        return (MemberInfo) indexerPropertyInfo.GetGetMethod();
      return (MemberInfo) null;
    }
  }
}
