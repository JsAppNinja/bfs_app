using System.Linq;

namespace CustomerPortalCMS.Models.UI
{
    internal static class QueryProviderExtensions
    {
        public static bool IsEntityFrameworkProvider(this IQueryProvider provider)
        {
            string fullName = provider.GetType().FullName;
            if (!(fullName == "System.Data.Objects.ELinq.ObjectQueryProvider") &&
                !(fullName == "System.Data.Entity.Core.Objects.ELinq.ObjectQueryProvider") &&
                !fullName.StartsWith("LinqKit.ExpandableQueryProvider"))
                return fullName.StartsWith("System.Data.Entity.Internal.Linq");
            return true;
        }

        public static bool IsLinqToObjectsProvider(this IQueryProvider provider)
        {
            return provider.GetType().FullName.Contains("EnumerableQuery");
        }
    }
}
