using System;
using System.Net.Http;
using System.Data;
using System.Threading.Tasks;
using System.Configuration;
using System.IO;
using System.Runtime.Caching;
using Newtonsoft.Json;
using Umbraco.Core.Logging;


namespace CustomerPortalCMS.Services
{
    public static class OnlineQueryService2
    {
        private static HttpClient client = new HttpClient();

        public static DataTable IdExecuteDataTable(string queryId, string[] parms)
        {
            try
            {
                return (DataTable)GetItem(queryId, parms);
            }
            catch (System.Exception ex)
            {
                string parmsOut = string.Empty;
                int i = 0;
                foreach (string parm in parms)
                    parmsOut += $"&parms[{i++}]={parm}";

                LogHelper.Error<HttpClient>($"Unexpected exception in OnlineQueryService.IdExecuteDataTable method for query {queryId}, parameter string {parmsOut}", ex);
            }
            return null;
        }

        private static async Task<DataTable> IdExecuteDataTableAsync(string queryId, string[] parms)
        {
            string parmsOut = string.Empty;
            try
            {
                if (client.BaseAddress == null)
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings.Get("internalApiUrl"));
                    client.DefaultRequestHeaders.Accept.Clear();
                }

                int i = 0;
                foreach (string parm in parms)
                    parmsOut += $"&parms[{i++}]={parm}";

                string requestPath = ConfigurationManager.AppSettings.Get("internalApiPath") + $"api/Online/Get?queryId={queryId}{parmsOut}";
                requestPath = requestPath.Replace("//", "/");
                var resultText = await client.GetStringAsync(requestPath);
                resultText = JsonConvert.DeserializeObject<string>(resultText);
                DataTable dt = new DataTable();
                dt.ReadXml(new StringReader(resultText));
                return dt;
            }
            catch (System.Exception ex)
            {
                LogHelper.Error<HttpClient>($"Unexpected exception in OnlineQueryService.IdExecuteDataTableAsync method for query {queryId}, parameter string {parmsOut}", ex);
            }

            return null;
        }

        private static MemoryCache _cache = new MemoryCache("QueryServiceCache");
        private static int _cacheTime = -1; 
        private static object GetItem(string queryId, string[] parameters)
        {
            // build key from parameters
            string key = queryId;
            foreach (string param in parameters)
                if (!string.IsNullOrEmpty(param))
                    key += $"_{param}";

            object cachedValue = AddOrGetExisting(key, () => InitItem(queryId, parameters));
            if (cachedValue == null)
            {
                // remove null values from the cache
                _cache.Remove(key);
                // since a null is generally an error on the OnlineQueryService, we will try again...
                // this could bite us if the query is consistently timing out... but, so will removing nulls from the cache - such is life
                cachedValue = AddOrGetExisting(key, () => InitItem(queryId, parameters));
            }
            if (cachedValue == null)
                _cache.Remove(key);
            return cachedValue;
        }

        private static T AddOrGetExisting<T>(string key, Func<T> valueFactory)
        {
            if (_cacheTime == -1)
            {
                Int32.TryParse(ConfigurationManager.AppSettings.Get("queryServiceCacheTime"), out _cacheTime);
                if (_cacheTime == -1)
                    _cacheTime = 5;  // default to 5 minutes, if not set
            }

            if (_cacheTime == 0)
                _cache.Remove(key);

            var newValue = new Lazy<T>(valueFactory);
            var cachePolicy = new CacheItemPolicy { SlidingExpiration = TimeSpan.FromMinutes(_cacheTime) };
            var oldValue = _cache.AddOrGetExisting(key, newValue, cachePolicy) as Lazy<T>;
            try
            {
                return (oldValue ?? newValue).Value;
            }
            catch
            {
                // Handle cached lazy exception by evicting from cache. Thanks to Denis Borovnev for pointing this out!
                _cache.Remove(key);
                throw;
            }
        }

        private static object InitItem(string queryId, string[] parameters)
        {
            Task<DataTable> task = Task.Run<DataTable>(async () => await IdExecuteDataTableAsync(queryId, parameters));
            return task.Result;
        }
    }
}