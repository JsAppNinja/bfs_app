using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using Umbraco.Core.Logging;
using CustomerPortalCMS.Models;

namespace CustomerPortalCMS.Services
{
    public static class LDAPService
    {
        private static HttpClient client = new HttpClient();

        private static void SetupHttpClient()
        {
            if (client.BaseAddress == null)
            {
                client.BaseAddress = new Uri(ConfigurationManager.AppSettings.Get("internalApiUrl"));
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            }
        }

        public static Dictionary<string, string> CheckPassword(AuthModel authModel)
        {
            try
            {
                SetupHttpClient();

                HttpResponseMessage response = client.PostAsJsonAsync($"{ConfigurationManager.AppSettings.Get("internalApiPath")}{ConfigurationManager.AppSettings.Get("LDAPAuthApiUrl")}CheckPassword", authModel).Result;
                response.EnsureSuccessStatusCode();

                // Deserialize the updated product from the response body.
                var jsonString = response.Content.ReadAsStringAsync().Result;
                var properties = JsonConvert.DeserializeObject<Dictionary<string, string>>(jsonString);
                return properties;
            }
            catch (System.Exception ex)
            {
                LogHelper.Error<CustomerPortalCMS.Controllers.LoginController>("Unexpected error in CheckPassword.", ex);
            }

            return null;
        }

        public static Dictionary<string, string> GetProperties(AuthModel authModel)
        {
            try
            {
                SetupHttpClient();

                HttpResponseMessage response = client.PostAsJsonAsync($"{ConfigurationManager.AppSettings.Get("internalApiPath")}{ConfigurationManager.AppSettings.Get("LDAPAuthApiUrl")}GetProperties", authModel).Result;
                response.EnsureSuccessStatusCode();

                // Deserialize the updated product from the response body.
                var jsonString = response.Content.ReadAsStringAsync().Result;
                var properties = JsonConvert.DeserializeObject<Dictionary<string, string>>(jsonString);
                return properties;
            }
            catch (System.Exception ex)
            {
                LogHelper.Error<CustomerPortalCMS.Controllers.LoginController>("Unexpected error in GetProperties.", ex);
            }

            return null;

        }
    }
}