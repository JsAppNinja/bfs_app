using System;
using System.Globalization;
using System.Reflection;

namespace CustomerPortalCMS.Models.UI
{
    internal static class UnboxT<T>
    {
        internal static readonly Converter<object, T> Unbox = UnboxT<T>.Create(typeof(T));

        private static Converter<object, T> Create(Type type)
        {
            if (!type.IsValueType)
                return new Converter<object, T>(UnboxT<T>.ReferenceField);
            if (!type.IsGenericType || type.IsGenericTypeDefinition ||
                !(typeof(Nullable<>) == type.GetGenericTypeDefinition()))
                return new Converter<object, T>(UnboxT<T>.ValueField);
            return (Converter<object, T>) Delegate.CreateDelegate(typeof(Converter<object, T>),
                typeof(UnboxT<T>).GetMethod("NullableField", BindingFlags.Static | BindingFlags.NonPublic)
                    .MakeGenericMethod(type.GetGenericArguments()[0]));
        }

        private static TElem? NullableField<TElem>(object value) where TElem : struct
        {
            if (DBNull.Value == value)
                return new TElem?();
            return (TElem?) value;
        }

        private static T ReferenceField(object value)
        {
            if (DBNull.Value != value)
                return (T) value;
            return default(T);
        }

        /// <exception cref="T:System.InvalidCastException"><c>InvalidCastException</c>.</exception>
        private static T ValueField(object value)
        {
            if (DBNull.Value == value)
                throw new InvalidCastException(string.Format((IFormatProvider) CultureInfo.CurrentCulture,
                    "Type: {0} cannot be casted to Nullable type", new object[1]
                    {
                        (object) typeof(T)
                    }));
            return (T) value;
        }
    }
}
