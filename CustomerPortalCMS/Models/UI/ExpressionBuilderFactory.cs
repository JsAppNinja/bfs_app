using System;
using System.ComponentModel;
using System.Data;
using System.Dynamic;
using System.Linq;
using System.Xml;

namespace CustomerPortalCMS.Models.UI
{
  internal static class ExpressionBuilderFactory
  {
    public static MemberAccessExpressionBuilderBase MemberAccess(Type elementType, Type memberType, string memberName)
    {
      Type type = memberType;
      if ((object) type == null)
        type = typeof (object);
      memberType = type;
      if (elementType.IsCompatibleWith(typeof (DataRow)))
        return (MemberAccessExpressionBuilderBase) new DataRowFieldAccessExpressionBuilder(memberType, memberName);
      if (elementType.IsCompatibleWith(typeof (ICustomTypeDescriptor)))
        return (MemberAccessExpressionBuilderBase) new CustomTypeDescriptorPropertyAccessExpressionBuilder(elementType, memberType, memberName);
      if (elementType.IsCompatibleWith(typeof (XmlNode)))
        return (MemberAccessExpressionBuilderBase) new XmlNodeChildElementAccessExpressionBuilder(memberName);
      if (elementType == typeof (object) || elementType.IsCompatibleWith(typeof (IDynamicMetaObjectProvider)))
        return (MemberAccessExpressionBuilderBase) new DynamicPropertyAccessExpressionBuilder(elementType, memberName);
      return (MemberAccessExpressionBuilderBase) new PropertyAccessExpressionBuilder(elementType, memberName);
    }

    public static MemberAccessExpressionBuilderBase MemberAccess(Type elementType, string memberName, bool liftMemberAccess)
    {
      MemberAccessExpressionBuilderBase expressionBuilderBase = ExpressionBuilderFactory.MemberAccess(elementType, (Type) null, memberName);
      expressionBuilderBase.Options.LiftMemberAccessToNull = liftMemberAccess;
      return expressionBuilderBase;
    }

    public static MemberAccessExpressionBuilderBase MemberAccess(Type elementType, Type memberType, string memberName, bool liftMemberAccess)
    {
      MemberAccessExpressionBuilderBase expressionBuilderBase = ExpressionBuilderFactory.MemberAccess(elementType, memberType, memberName);
      expressionBuilderBase.Options.LiftMemberAccessToNull = liftMemberAccess;
      return expressionBuilderBase;
    }

    public static MemberAccessExpressionBuilderBase MemberAccess(IQueryable source, Type memberType, string memberName)
    {
      MemberAccessExpressionBuilderBase expressionBuilderBase = ExpressionBuilderFactory.MemberAccess(source.ElementType, memberType, memberName);
      expressionBuilderBase.Options.LiftMemberAccessToNull = source.Provider.IsLinqToObjectsProvider();
      return expressionBuilderBase;
    }
  }
}
