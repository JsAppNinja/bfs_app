using System;
using System.Globalization;
using System.Linq;

namespace CustomerPortalCMS.Models.UI
{
    public abstract class EnumerableAggregateFunctionBase : AggregateFunction
    {
        /// <summary>
        /// Gets the type of the extension methods that holds the extension methods for
        /// aggregation. For example <see cref="T:System.Linq.Enumerable" /> or <see cref="T:System.Linq.Queryable" />.
        /// </summary>
        /// <value>
        /// The type of that holds the extension methods. The default value is <see cref="T:System.Linq.Enumerable" />.
        /// </value>
        protected internal virtual Type ExtensionMethodsType
        {
            get { return typeof(Enumerable); }
        }

        protected override string GenerateFunctionName()
        {
            string str = this.SourceField;
            if (str.HasValue())
                str = str.Replace(".", "-");
            return string.Format((IFormatProvider) CultureInfo.InvariantCulture, "{0}_{1}_{2}",
                (object) this.AggregateMethodName, (object) str, (object) this.GetHashCode());
        }
    }
}