using System.Collections.Generic;

namespace CustomerPortalCMS.Models.UI
{
    public static class GridUrlParameters
    {
        public static string Aggregates { get; set; }

        public static string Filter { get; set; }

        public static string Page { get; set; }

        public static string PageSize { get; set; }

        public static string Sort { get; set; }

        public static string Group { get; set; }

        public static string Mode { get; set; }

        static GridUrlParameters()
        {
            GridUrlParameters.Sort = "sort";
            GridUrlParameters.Group = "group";
            GridUrlParameters.Page = "page";
            GridUrlParameters.PageSize = "pageSize";
            GridUrlParameters.Filter = "filter";
            GridUrlParameters.Mode = "mode";
            GridUrlParameters.Aggregates = "aggregate";
        }

        public static IDictionary<string, string> ToDictionary(string prefix)
        {
            IDictionary<string, string> dictionary = (IDictionary<string, string>) new Dictionary<string, string>();
            dictionary[GridUrlParameters.Group] = prefix + GridUrlParameters.Group;
            dictionary[GridUrlParameters.Sort] = prefix + GridUrlParameters.Sort;
            dictionary[GridUrlParameters.Page] = prefix + GridUrlParameters.Page;
            dictionary[GridUrlParameters.PageSize] = prefix + GridUrlParameters.PageSize;
            dictionary[GridUrlParameters.Filter] = prefix + GridUrlParameters.Filter;
            dictionary[GridUrlParameters.Mode] = prefix + GridUrlParameters.Mode;
            return dictionary;
        }
    }
}
