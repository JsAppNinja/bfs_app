using System.Collections;
using System.Collections.Generic;

namespace CustomerPortalCMS.Models.UI
{
    public class TreeDataSourceResult
    {
        public IEnumerable Data { get; set; }

        public IDictionary<string, IEnumerable<AggregateResult>> AggregateResults { get; set; }

        public object Errors { get; set; }

        public TreeDataSourceResult()
        {
            this.AggregateResults =
                (IDictionary<string, IEnumerable<AggregateResult>>)
                new Dictionary<string, IEnumerable<AggregateResult>>();
        }
    }
}
