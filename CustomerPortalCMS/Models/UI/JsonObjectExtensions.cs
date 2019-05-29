using System;
using System.Collections.Generic;
using System.Linq;

namespace CustomerPortalCMS.Models.UI
{
    public static class JsonObjectExtensions
    {
        public static IEnumerable<IDictionary<string, object>> ToJson(this IEnumerable<JsonObject> items)
        {
            return items.Select<JsonObject, IDictionary<string, object>>(
                (Func<JsonObject, IDictionary<string, object>>) (i => i.ToJson()));
        }
    }
}
