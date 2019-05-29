using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Dynamic;
using System.Linq;
using System.Reflection;

namespace CustomerPortalCMS.Models.UI
{
    internal static class TypeExtensions
    {
        internal static readonly Type[] PredefinedTypes = new Type[20]
        {
            typeof(object),
            typeof(bool),
            typeof(char),
            typeof(string),
            typeof(sbyte),
            typeof(byte),
            typeof(short),
            typeof(ushort),
            typeof(int),
            typeof(uint),
            typeof(long),
            typeof(ulong),
            typeof(float),
            typeof(double),
            typeof(Decimal),
            typeof(DateTime),
            typeof(TimeSpan),
            typeof(Guid),
            typeof(Math),
            typeof(Convert)
        };

        internal static bool IsPredefinedType(this Type type)
        {
            foreach (Type predefinedType in TypeExtensions.PredefinedTypes)
            {
                if (predefinedType == type)
                    return true;
            }
            return type.IsEnum;
        }

        internal static string FirstSortableProperty(this Type type)
        {
            PropertyInfo propertyInfo = ((IEnumerable<PropertyInfo>) type.GetProperties()).Where<PropertyInfo>(
                    (Func<PropertyInfo, bool>) (property =>
                    {
                        if (property.PropertyType.IsPredefinedType())
                            return !property.PropertyType.IsEnum;
                        return false;
                    }))
                .FirstOrDefault<PropertyInfo>();
            if (propertyInfo == (PropertyInfo) null)
                throw new NotSupportedException(Exceptions.CannotFindPropertyToSortBy);
            return propertyInfo.Name;
        }

        internal static bool IsNullableType(this Type type)
        {
            if (type.IsGenericType)
                return type.GetGenericTypeDefinition() == typeof(Nullable<>);
            return false;
        }

        internal static Type GetNonNullableType(this Type type)
        {
            if (!type.IsNullableType())
                return type;
            return type.GetGenericArguments()[0];
        }

        internal static string GetTypeName(this Type type)
        {
            Type nonNullableType = type.GetNonNullableType();
            string name = nonNullableType.Name;
            if (type != nonNullableType)
                name += (string) (object) '?';
            return name;
        }

        internal static bool IsNumericType(this Type type)
        {
            return type.GetNumericTypeKind() != 0;
        }

        internal static bool IsSignedIntegralType(this Type type)
        {
            return type.GetNumericTypeKind() == 2;
        }

        internal static bool IsUnsignedIntegralType(this Type type)
        {
            return type.GetNumericTypeKind() == 3;
        }

        internal static int GetNumericTypeKind(this Type type)
        {
            if (type == (Type) null)
                return 0;
            type = type.GetNonNullableType();
            if (type.IsEnum)
                return 0;
            switch (Type.GetTypeCode(type))
            {
                case TypeCode.Char:
                case TypeCode.Single:
                case TypeCode.Double:
                case TypeCode.Decimal:
                    return 1;
                case TypeCode.SByte:
                case TypeCode.Int16:
                case TypeCode.Int32:
                case TypeCode.Int64:
                    return 2;
                case TypeCode.Byte:
                case TypeCode.UInt16:
                case TypeCode.UInt32:
                case TypeCode.UInt64:
                    return 3;
                default:
                    return 0;
            }
        }

        internal static PropertyInfo GetIndexerPropertyInfo(this Type type, params Type[] indexerArguments)
        {
            return ((IEnumerable<PropertyInfo>) type.GetProperties())
                .Where<PropertyInfo>((Func<PropertyInfo, bool>) (p => TypeExtensions.AreArgumentsApplicable(
                    (IEnumerable<Type>) indexerArguments, (IEnumerable<ParameterInfo>) p.GetIndexParameters())))
                .FirstOrDefault<PropertyInfo>();
        }

        private static bool AreArgumentsApplicable(IEnumerable<Type> arguments, IEnumerable<ParameterInfo> parameters)
        {
            List<Type> list1 = arguments.ToList<Type>();
            List<ParameterInfo> list2 = parameters.ToList<ParameterInfo>();
            if (list1.Count != list2.Count)
                return false;
            for (int index = 0; index < list1.Count; ++index)
            {
                if (list2[index].ParameterType != list1[index])
                    return false;
            }
            return true;
        }

        internal static bool IsEnumType(this Type type)
        {
            return type.GetNonNullableType().IsEnum;
        }

        internal static bool IsCompatibleWith(this Type source, Type target)
        {
            if (source == target)
                return true;
            if (!target.IsValueType)
                return target.IsAssignableFrom(source);
            Type nonNullableType1 = source.GetNonNullableType();
            Type nonNullableType2 = target.GetNonNullableType();
            if (nonNullableType1 != source && nonNullableType2 == target)
                return false;
            TypeCode typeCode1 = nonNullableType1.IsEnum ? TypeCode.Object : Type.GetTypeCode(nonNullableType1);
            TypeCode typeCode2 = nonNullableType2.IsEnum ? TypeCode.Object : Type.GetTypeCode(nonNullableType2);
            switch (typeCode1)
            {
                case TypeCode.SByte:
                    switch (typeCode2)
                    {
                        case TypeCode.SByte:
                        case TypeCode.Int16:
                        case TypeCode.Int32:
                        case TypeCode.Int64:
                        case TypeCode.Single:
                        case TypeCode.Double:
                        case TypeCode.Decimal:
                            return true;
                    }
                    break;
                case TypeCode.Byte:
                    switch (typeCode2)
                    {
                        case TypeCode.Byte:
                        case TypeCode.Int16:
                        case TypeCode.UInt16:
                        case TypeCode.Int32:
                        case TypeCode.UInt32:
                        case TypeCode.Int64:
                        case TypeCode.UInt64:
                        case TypeCode.Single:
                        case TypeCode.Double:
                        case TypeCode.Decimal:
                            return true;
                    }
                    break;
                case TypeCode.Int16:
                    switch (typeCode2)
                    {
                        case TypeCode.Int16:
                        case TypeCode.Int32:
                        case TypeCode.Int64:
                        case TypeCode.Single:
                        case TypeCode.Double:
                        case TypeCode.Decimal:
                            return true;
                    }
                    break;
                case TypeCode.UInt16:
                    switch (typeCode2)
                    {
                        case TypeCode.UInt16:
                        case TypeCode.Int32:
                        case TypeCode.UInt32:
                        case TypeCode.Int64:
                        case TypeCode.UInt64:
                        case TypeCode.Single:
                        case TypeCode.Double:
                        case TypeCode.Decimal:
                            return true;
                    }
                    break;
                case TypeCode.Int32:
                    switch (typeCode2)
                    {
                        case TypeCode.Int32:
                        case TypeCode.Int64:
                        case TypeCode.Single:
                        case TypeCode.Double:
                        case TypeCode.Decimal:
                            return true;
                    }
                    break;
                case TypeCode.UInt32:
                    switch (typeCode2)
                    {
                        case TypeCode.UInt32:
                        case TypeCode.Int64:
                        case TypeCode.UInt64:
                        case TypeCode.Single:
                        case TypeCode.Double:
                        case TypeCode.Decimal:
                            return true;
                    }
                    break;
                case TypeCode.Int64:
                    switch (typeCode2)
                    {
                        case TypeCode.Int64:
                        case TypeCode.Single:
                        case TypeCode.Double:
                        case TypeCode.Decimal:
                            return true;
                    }
                    break;
                case TypeCode.UInt64:
                    switch (typeCode2)
                    {
                        case TypeCode.UInt64:
                        case TypeCode.Single:
                        case TypeCode.Double:
                        case TypeCode.Decimal:
                            return true;
                    }
                    break;
                case TypeCode.Single:
                    switch (typeCode2)
                    {
                        case TypeCode.Single:
                        case TypeCode.Double:
                            return true;
                    }
                    break;

                default:
                    if (nonNullableType1 == nonNullableType2)
                        return true;
                    break;
            }
            return false;
        }

        internal static Type FindGenericType(this Type type, Type genericType)
        {
            for (; type != (Type) null && type != typeof(object); type = type.BaseType)
            {
                if (type.IsGenericType && type.GetGenericTypeDefinition() == genericType)
                    return type;
                if (genericType.IsInterface)
                {
                    foreach (Type type1 in type.GetInterfaces())
                    {
                        Type genericType1 = type1.FindGenericType(genericType);
                        if (genericType1 != (Type) null)
                            return genericType1;
                    }
                }
            }
            return (Type) null;
        }

        internal static string GetName(this Type type)
        {
            return type.FullName.Replace(type.Namespace + ".", "");
        }

        internal static object DefaultValue(this Type type)
        {
            if (type.IsValueType)
                return Activator.CreateInstance(type);
            return (object) null;
        }

        internal static MemberInfo FindPropertyOrField(this Type type, string memberName)
        {
            MemberInfo propertyOrField = type.FindPropertyOrField(memberName, false);
            if (propertyOrField == (MemberInfo) null)
                propertyOrField = type.FindPropertyOrField(memberName, true);
            return propertyOrField;
        }

        internal static MemberInfo FindPropertyOrField(this Type type, string memberName, bool staticAccess)
        {
            BindingFlags bindingAttr = (BindingFlags) (18 | (staticAccess ? 8 : 4));
            foreach (Type selfAndBaseType in type.SelfAndBaseTypes())
            {
                MemberInfo[] members = selfAndBaseType.FindMembers(MemberTypes.Field | MemberTypes.Property,
                    bindingAttr, Type.FilterNameIgnoreCase, (object) memberName);
                if (members.Length != 0)
                    return members[0];
            }
            return (MemberInfo) null;
        }

        internal static IEnumerable<Type> SelfAndBaseTypes(this Type type)
        {
            if (!type.IsInterface)
                return type.SelfAndBaseClasses();
            List<Type> types = new List<Type>();
            TypeExtensions.AddInterface(types, type);
            return (IEnumerable<Type>) types;
        }

        internal static IEnumerable<Type> SelfAndBaseClasses(this Type type)
        {
            for (; type != (Type) null; type = type.BaseType)
                yield return type;
        }

        private static void AddInterface(List<Type> types, Type type)
        {
            if (types.Contains(type))
                return;
            types.Add(type);
            foreach (Type type1 in type.GetInterfaces())
                TypeExtensions.AddInterface(types, type1);
        }

        internal static bool IsDataRow(this Type type)
        {
            if (!type.IsCompatibleWith(typeof(DataRow)))
                return type.IsCompatibleWith(typeof(DataRowView));
            return true;
        }

        internal static bool IsDynamicObject(this Type type)
        {
            if (!(type == typeof(object)))
                return type.IsCompatibleWith(typeof(IDynamicMetaObjectProvider));
            return true;
        }

        internal static bool IsDateTime(this Type type)
        {
            if (!(type == typeof(DateTime)))
                return type == typeof(DateTime?);
            return true;
        }

        internal static string ToJavaScriptType(this Type type)
        {
            if (type == (Type) null)
                return "Object";
            if (type == typeof(char) || type == typeof(char?))
                return "String";
            if (type.IsNumericType())
                return "Number";
            if (type == typeof(DateTime) || type == typeof(DateTime?))
                return "Date";
            if (type == typeof(string))
                return "String";
            if (type == typeof(bool) || type == typeof(bool?))
                return "Boolean";
            if (type.GetNonNullableType().IsEnum)
                return "Number";
            return type.GetNonNullableType() == typeof(Guid) ? "String" : "Object";
        }

        internal static bool IsPlainType(this Type type)
        {
            if (!type.IsDynamicObject() && !type.IsDataRow())
                return !type.IsCompatibleWith(typeof(ICustomTypeDescriptor));
            return false;
        }
    }
}