using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace CustomerPortalCMS.Models.UI
{
    internal static class DataTableWrapperExtensions
    {
        internal static DataTableWrapper WrapAsEnumerable(this DataTable dataTable)
        {
            return new DataTableWrapper(dataTable);
        }

        internal static IEnumerable SerializeToDictionary(this IEnumerable enumerable, DataTable ownerDataTable)
        {
            if (enumerable is IEnumerable<AggregateFunctionsGroup> || enumerable is IEnumerable<IGroup>)
                return (IEnumerable) enumerable.OfType<IGroup>()
                    .Select<IGroup, Dictionary<string, object>>(
                        (Func<IGroup, Dictionary<string, object>>) (group => DataTableWrapperExtensions
                            .SerializeGroupItem(ownerDataTable, group)));
            return (IEnumerable) enumerable.OfType<DataRowView>()
                .Select<DataRowView, Dictionary<string, object>>((Func<DataRowView, Dictionary<string, object>>) (row =>
                {
                    Dictionary<string, object> owner = new Dictionary<string, object>();
                    DataTableWrapperExtensions.SerializeRow(ownerDataTable, row, owner);
                    return owner;
                }));
        }

        private static Dictionary<string, object> SerializeGroupItem(DataTable ownerDataTable, IGroup group)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>()
            {
                {
                    "Key",
                    group.Key
                },
                {
                    "HasSubgroups",
                    (object) group.HasSubgroups
                },
                {
                    "Member",
                    (object) group.Member
                },
                {
                    "Items",
                    (object) group.Items.SerializeToDictionary(ownerDataTable)
                },
                {
                    "Subgroups",
                    (object) group.Subgroups.SerializeToDictionary(ownerDataTable)
                }
            };
            AggregateFunctionsGroup aggregateFunctionsGroup = group as AggregateFunctionsGroup;
            if (aggregateFunctionsGroup != null)
            {
                dictionary.Add("AggregateFunctionsProjection", aggregateFunctionsGroup.AggregateFunctionsProjection);
                dictionary.Add("Aggregates", (object) aggregateFunctionsGroup.Aggregates);
            }
            return dictionary;
        }

        public static Dictionary<string, object> SerializeRow(this DataRowView row)
        {
            DataTable table = row.DataView.Table;
            Dictionary<string, object> owner = new Dictionary<string, object>();
            DataTableWrapperExtensions.SerializeRow(table, row, owner);
            return owner;
        }

        public static Dictionary<string, object> SerializeRow(this DataRow row)
        {
            return row.Table.Columns.Cast<DataColumn>()
                .ToDictionary<DataColumn, string, object>((Func<DataColumn, string>) (column => column.ColumnName),
                    (Func<DataColumn, object>) (column => row.Field<object>(column.ColumnName)));
        }

        private static void SerializeRow(DataTable dataTable, DataRowView row, Dictionary<string, object> owner)
        {
            foreach (DataColumn column in (InternalDataCollectionBase) dataTable.Columns)
                owner.Add(column.ColumnName, row.Row.Field<object>(column.ColumnName));
        }
    }
}