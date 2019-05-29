using System.Collections;
using System.Collections.Generic;
using System.Data;

namespace CustomerPortalCMS.Models.UI
{
    internal class DataTableWrapper : IEnumerable<DataRowView>, IEnumerable
    {
        public DataTable Table { get; private set; }

        internal DataTableWrapper(DataTable dataTable)
        {
            this.Table = dataTable;
        }

        public IEnumerator<DataRowView> GetEnumerator()
        {
            if (this.Table != null)
            {
                foreach (DataRowView dataRowView in this.Table.AsDataView())
                    yield return dataRowView;
            }
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return (IEnumerator) this.GetEnumerator();
        }
    }
}
