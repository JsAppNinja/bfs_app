using System.Collections.Generic;
using System.Linq;


namespace CustomerPortalCMS.Helpers
{
    public static class CompareLists
    {
        public static bool ListsContainAMatchingValue(IEnumerable<string> listA, IEnumerable<string> listB)
        {
            return listA.Any(x => listB.Contains(x));
        }
    }
}
