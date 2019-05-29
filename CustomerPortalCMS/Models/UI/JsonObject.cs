using System.Collections.Generic;

namespace CustomerPortalCMS.Models.UI
{
    public abstract class JsonObject
    {
        public IDictionary<string, object> ToJson()
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            this.Serialize((IDictionary<string, object>) dictionary);
            return (IDictionary<string, object>) dictionary;
        }

        protected abstract void Serialize(IDictionary<string, object> json);
    }
}