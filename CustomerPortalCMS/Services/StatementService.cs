using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Configuration;
using Umbraco.Core.Logging;


namespace CustomerPortalCMS.Services
{
    public static class StatementService
    {
        private static HttpClient client = new HttpClient();
        public static async Task<byte[]> GetStatementPDF(string statementId)
        {
            try
            {
                if (client.BaseAddress == null)
                {
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings.Get("internalApiUrl"));
                    client.DefaultRequestHeaders.Accept.Clear();
                }

                string requestPath = ConfigurationManager.AppSettings.Get("internalApiPath") + $"api/Statement/Get?statementId=state-{statementId}.PDF";
                requestPath = requestPath.Replace("//", "/");
                HttpResponseMessage response = await client.GetAsync(requestPath);
                response.EnsureSuccessStatusCode();
                var readTask = response.Content.ReadAsByteArrayAsync();
                return readTask.Result;
            }
            catch (System.Exception ex)
            {
                LogHelper.Error<HttpClient>($"Unexpected exception in StatementService.GetStatementPDF method for statement {statementId} ", ex);
            }

            return null;
        }
    }
}