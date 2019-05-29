using System;
using System.Collections.Generic;
using System.Linq;

namespace CustomerPortalCMS.Models.UI
{
    public class GridDescriptorSerializer
    {
        private const string ColumnDelimiter = "~";

        public static string Serialize<T>(IEnumerable<T> descriptors) where T : IDescriptor
        {
            if (!descriptors.Any<T>())
                return "~";
            return string.Join("~",
                descriptors.Select<T, string>((Func<T, string>) (d => d.Serialize())).ToArray<string>());
        }

        public static IList<T> Deserialize<T>(string from) where T : IDescriptor, new()
        {
            List<T> objList = new List<T>();
            if (!StringExtensions.HasValue(@from))
                return (IList<T>) objList;
            foreach (string source in from.Split("~".ToCharArray(), StringSplitOptions.RemoveEmptyEntries))
            {
                T obj = new T();
                obj.Deserialize(source);
                objList.Add(obj);
            }
            return (IList<T>) objList;
        }
    }
}
