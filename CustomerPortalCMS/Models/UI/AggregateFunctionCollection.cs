using System;
using System.Collections.ObjectModel;
using System.Linq;

namespace CustomerPortalCMS.Models.UI
{
    public class AggregateFunctionCollection : Collection<AggregateFunction>
    {
        /// <summary>
        /// Gets the <see cref="T:AggregateFunction" /> with the specified function name.
        /// </summary>
        /// <value>
        /// First <see cref="T:AggregateFunction" /> with the specified function name
        /// if any, otherwise null.
        /// </value>
        public AggregateFunction this[string functionName]
        {
            get
            {
                return this.FirstOrDefault<AggregateFunction>(
                    (Func<AggregateFunction, bool>) (f => f.FunctionName == functionName));
            }
        }
    }
}