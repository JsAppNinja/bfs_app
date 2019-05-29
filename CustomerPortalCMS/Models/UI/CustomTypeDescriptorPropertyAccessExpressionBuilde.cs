using System;
using System.ComponentModel;
using System.Globalization;
using System.Linq.Expressions;
using System.Reflection;

namespace CustomerPortalCMS.Models.UI
{
    internal class CustomTypeDescriptorPropertyAccessExpressionBuilder : MemberAccessExpressionBuilderBase
    {
        private static readonly MethodInfo PropertyMethod =
            typeof(CustomTypeDescriptorExtensions).GetMethod("Property");

        private readonly Type propertyType;

        public Type PropertyType
        {
            get { return this.propertyType; }
        }

        /// <exception cref="T:System.ArgumentException"><paramref name="elementType" /> did not implement <see cref="T:System.ComponentModel.ICustomTypeDescriptor" />.</exception>
        public CustomTypeDescriptorPropertyAccessExpressionBuilder(Type elementType, Type memberType, string memberName)
            : base(elementType, memberName)
        {
            if (!elementType.IsCompatibleWith(typeof(ICustomTypeDescriptor)))
                throw new ArgumentException(string.Format((IFormatProvider) CultureInfo.CurrentCulture,
                    "ElementType: {0} did not implement {1}", new object[2]
                    {
                        (object) elementType,
                        (object) typeof(ICustomTypeDescriptor)
                    }), "elementType");
            this.propertyType = this.GetPropertyType(memberType);
        }

        private Type GetPropertyType(Type memberType)
        {
            Type descriptorProvider = this.GetPropertyTypeFromTypeDescriptorProvider();
            if (descriptorProvider != (Type) null)
                memberType = descriptorProvider;
            if (!memberType.IsValueType || memberType.IsNullableType())
                return memberType;
            return typeof(Nullable<>).MakeGenericType(memberType);
        }

        private Type GetPropertyTypeFromTypeDescriptorProvider()
        {
            PropertyDescriptor property = TypeDescriptor.GetProperties(this.ItemType)[this.MemberName];
            if (property != null)
                return property.PropertyType;
            return (Type) null;
        }

        public override Expression CreateMemberAccessExpression()
        {
            ConstantExpression constantExpression = Expression.Constant((object) this.MemberName);
            return (Expression) Expression.Call(
                CustomTypeDescriptorPropertyAccessExpressionBuilder.PropertyMethod.MakeGenericMethod(this.propertyType),
                (Expression) this.ParameterExpression, (Expression) constantExpression);
        }
    }
}