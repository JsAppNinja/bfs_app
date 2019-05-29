using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace CustomerPortalCMS.Models.UI
{
    /// <summary>Represents grouping criteria.</summary>
    public class GroupDescriptor : SortDescriptor
    {
        private object displayContent;
        private AggregateFunctionCollection aggregateFunctions;

        /// <summary>
        /// Gets or sets the type of the member that is used for grouping.
        /// Set this property if the member type cannot be resolved automatically.
        /// Such cases are: items with ICustomTypeDescriptor, XmlNode or DataRow.
        /// </summary>
        /// <value>The type of the member used for grouping.</value>
        public Type MemberType { get; set; }

        /// <summary>Gets or sets the content which will be used from UI.</summary>
        /// <filterValue>The content that will be used from UI.</filterValue>
        public object DisplayContent
        {
            get
            {
                if (this.displayContent == null)
                    return (object) this.Member;
                return this.displayContent;
            }
            set { this.displayContent = value; }
        }

        /// <summary>
        /// Gets or sets the aggregate functions used when grouping is executed.
        /// </summary>
        /// <value>The aggregate functions that will be used in grouping.</value>
        public AggregateFunctionCollection AggregateFunctions
        {
            get { return this.aggregateFunctions = this.aggregateFunctions ?? new AggregateFunctionCollection(); }
        }

        /// <summary>
        /// Changes the <see cref="T:SortDescriptor" /> to the next logical value.
        /// </summary>
        public void CycleSortDirection()
        {
            this.SortDirection = GroupDescriptor.GetNextSortDirection(new ListSortDirection?(this.SortDirection));
        }

        private static ListSortDirection GetNextSortDirection(ListSortDirection? sortDirection)
        {

            return sortDirection.HasValue && sortDirection.GetValueOrDefault() == ListSortDirection.Ascending
                ? ListSortDirection.Descending
                : ListSortDirection.Ascending;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            base.Serialize(json);
            if (!this.AggregateFunctions.Any<AggregateFunction>())
                return;
            json["aggregates"] = (object) ((IEnumerable<JsonObject>) this.AggregateFunctions).ToJson();
        }
    }
}