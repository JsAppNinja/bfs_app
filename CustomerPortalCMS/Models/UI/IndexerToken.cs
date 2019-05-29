using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace CustomerPortalCMS.Models.UI
{
    internal class IndexerToken : IMemberAccessToken
    {
        private readonly ReadOnlyCollection<object> arguments;

        public ReadOnlyCollection<object> Arguments
        {
            get { return this.arguments; }
        }

        public IndexerToken(IEnumerable<object> arguments)
        {
            this.arguments = arguments.ToReadOnlyCollection<object>();
        }

        public IndexerToken(params object[] arguments)
            : this((IEnumerable<object>) arguments)
        {
        }
    }
}
