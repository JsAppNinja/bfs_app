using System;
using System.ComponentModel;
using System.Globalization;

namespace CustomerPortalCMS.Models.UI
{
    /// <exclude />
    /// <excludeToc />
    internal static class CustomTypeDescriptorExtensions
    {
        /// <exception cref="T:System.ArgumentException"><c>ArgumentException</c>.</exception>
        public static T Property<T>(this ICustomTypeDescriptor typeDescriptor, string propertyName)
        {
            PropertyDescriptor property = TypeDescriptor.GetProperties((object) typeDescriptor)[propertyName];
            if (property == null)
                throw new ArgumentException(string.Format((IFormatProvider) CultureInfo.CurrentCulture,
                    "Property with specified name: {0} cannot be found on type: {1}", new object[2]
                    {
                        (object) propertyName,
                        (object) typeDescriptor.GetType()
                    }), "propertyName");
            return UnboxT<T>.Unbox(property.GetValue((object) typeDescriptor));
        }
    }
}
