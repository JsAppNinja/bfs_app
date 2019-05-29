using System.Collections;
using System.Collections.ObjectModel;

namespace CustomerPortalCMS.Models.UI
{
    public interface IGroup
    {
        /// <summary>Gets the key for this group.</summary>
        /// <value>The key for this group.</value>
        object Key { get; }

        /// <summary>Gets the items in this groups.</summary>
        /// <value>The items in this group.</value>
        IEnumerable Items { get; set; }

        /// <summary>
        /// Gets a value indicating whether this instance has sub groups.
        /// </summary>
        /// <value>
        /// 	<c>true</c> if this instance has sub groups; otherwise, <c>false</c>.
        /// </value>
        bool HasSubgroups { get; }

        string Member { get; set; }

        /// <summary>
        /// Gets the <see cref="P:CustomerPortalCMS.Models.UI.IGroup.Items" /> count.
        /// </summary>
        /// <value>The <see cref="P:CustomerPortalCMS.Models.UI.IGroup.Items" /> count.</value>
        int ItemCount { get; }

        /// <summary>
        /// Gets the subgroups, if <see cref="P:CustomerPortalCMS.Models.UI.IGroup.HasSubgroups" /> is true, otherwise empty collection.
        /// </summary>
        /// <value>The subgroups.</value>
        ReadOnlyCollection<IGroup> Subgroups { get; }
    }
}