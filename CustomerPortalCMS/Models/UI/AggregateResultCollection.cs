using System;
using System.Collections.ObjectModel;
using System.Linq;

namespace CustomerPortalCMS.Models.UI
{
    public class AggregateResultCollection : Collection<AggregateResult>
    {
        /// <summary>
        /// Gets the first <see cref="T:AggregateResult" /> which
        /// <see cref="P:AggregateResult.FunctionName" /> is equal to <paramref name="functionName" />.
        /// </summary>
        /// <value>
        /// The <see cref="T:AggregateResult" /> for the specified function if any, otherwise null.
        /// </value>
        public AggregateResult this[string functionName]
        {
            get
            {
                return this.FirstOrDefault<AggregateResult>(
                    (Func<AggregateResult, bool>) (r => r.FunctionName == functionName));
            }
        }
    }
}
