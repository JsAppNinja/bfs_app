using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace CustomerPortalCMS.Models.UI
{
    /// <summary>Represents declarative sorting.</summary>
    public class SortDescriptor : JsonObject, IDescriptor
    {
        /// <summary>
        /// Gets or sets the member name which will be used for sorting.
        /// </summary>
        /// <filterValue>The member that will be used for sorting.</filterValue>
        public string Member { get; set; }

        /// <summary>
        /// Gets or sets the sort direction for this sort descriptor. If the value is null
        /// no sorting will be applied.
        /// </summary>
        /// <value>The sort direction. The default value is null.</value>
        public ListSortDirection SortDirection { get; set; }

        public SortDescriptor()
            : this((string) null, ListSortDirection.Ascending)
        {
        }

        public SortDescriptor(string member, ListSortDirection order)
        {
            this.Member = member;
            this.SortDirection = order;
        }

        public void Deserialize(string source)
        {
            string[] strArray = source.Split('-');
            if (strArray.Length > 1)
                this.Member = strArray[0];
            this.SortDirection = ((IEnumerable<string>) strArray).Last<string>() == "desc"
                ? ListSortDirection.Descending
                : ListSortDirection.Ascending;
        }

        public string Serialize()
        {
            return "{0}-{1}".FormatWith((object) this.Member,
                this.SortDirection == ListSortDirection.Ascending ? (object) "asc" : (object) "desc");
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            json["field"] = (object) this.Member;
            json["dir"] = this.SortDirection == ListSortDirection.Ascending ? (object) "asc" : (object) "desc";
        }
    }
}