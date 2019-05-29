using System.Collections.Generic;

namespace CustomerPortalCMS.Models.UI
{
    public static class CollectionExtensions
    {
        public static void AddRange<T>(this ICollection<T> instance, IEnumerable<T> collection)
        {
            foreach (T obj in collection)
                instance.Add(obj);
        }
    }
}