using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Configuration;
using Umbraco.Core.Logging;
using Newtonsoft.Json;

namespace CustomerPortalCMS.Services
{

    public static class GeneroService
    {
        private static HttpClient client = new HttpClient();

        private static void SetupHttpClient()
        {
            if (client.BaseAddress == null)
            {
                client.BaseAddress = new Uri(ConfigurationManager.AppSettings.Get("internalApiUrl"));
                client.DefaultRequestHeaders.Accept.Clear();
            }
        }

        public static async Task<byte[]> GetInvoicePDF(string invoiceNumber, string type)
        {
            try
            {
                SetupHttpClient();

                string requestPath = ConfigurationManager.AppSettings.Get("internalApiPath") + $"/api/Genero/GetInvoicePDF?invoiceNumber={invoiceNumber}&type={type}";
                requestPath = requestPath.Replace("//", "/");
                HttpResponseMessage response = await client.GetAsync(requestPath);
                response.EnsureSuccessStatusCode();
                var readTask = response.Content.ReadAsByteArrayAsync();
                return readTask.Result;
            }
            catch (System.Exception ex)
            {
                LogHelper.Error<HttpClient>($"Unexpected exception in GetInvoicePDF method for Invoice {invoiceNumber} Type {type}.", ex);
            }
            return null;
        }

        public static async Task<byte[]> GetSalesOrderPDF(string salesOrderNumber, string customerNumber)
        {
            try
            {
                SetupHttpClient();

                string requestPath = ConfigurationManager.AppSettings.Get("internalApiPath") + $"api/Genero/GetSalesOrderPdf?salesOrderNumber={salesOrderNumber}&customerNumber={customerNumber}";
                requestPath = requestPath.Replace("//", "/");
                HttpResponseMessage response = await client.GetAsync(requestPath);
                response.EnsureSuccessStatusCode();
                var readTask = response.Content.ReadAsByteArrayAsync();
                return readTask.Result;
            }
            catch (System.Exception ex)
            {
                LogHelper.Error<HttpClient>($"Unexpected exception in GetSalesOrderPDF method for Order {salesOrderNumber} Customer {customerNumber}.", ex);
            }
            return null;
        }

        public static async Task<string> GetRepricingResponse(string customerNumber, string invoiceId, string invoiceType, string dateEstimate, string shipToId, string jobId)
        {
            try
            {
                SetupHttpClient();
                string requestPath = ConfigurationManager.AppSettings.Get("internalApiPath") + $"api/Genero/GetRepricingResponse?customerNumber={customerNumber}&invoiceId={invoiceId}&invoiceType={invoiceType}&datePrice={dateEstimate}&shipToId={shipToId}&jobId={jobId}";
                requestPath = requestPath.Replace("//", "/");
                HttpResponseMessage response = await client.GetAsync(requestPath);
                var readTask = response.Content.ReadAsStringAsync();
                return readTask.Result;
            }
            catch (System.Exception ex)
            {
                LogHelper.Error<HttpClient>($"Unexpected exception in GetRepricingResponse method for {invoiceId}~{invoiceType} Date: {dateEstimate}, Ship Id: {shipToId}, Job Id: {jobId}", ex);
            }
            return null;
        }

        public static async Task<string> GetInvoiceData(Models.API.InvoiceFilter filter)
        {
            try
            {
                SetupHttpClient();
                string requestPath = ConfigurationManager.AppSettings.Get("internalApiPath") + $"api/Genero/GetInvoiceData";
                requestPath = requestPath.Replace("//", "/");

                var result = JsonConvert.SerializeObject(filter);
                byte[] messageBytes = System.Text.Encoding.UTF8.GetBytes(result);
                var content = new ByteArrayContent(messageBytes);
                content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/json");

                HttpResponseMessage response = await client.PostAsync(requestPath, content);
                var readTask = response.Content.ReadAsStringAsync();
                return readTask.Result;
            }
            catch (System.Exception ex)
            {
                LogHelper.Error<HttpClient>($"Unexpected exception in GetInvoiceData method", ex);
                //HttpResponseMessage errorResponse = Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
                //return errorResponse;
                return null;
            }
        }
    }
}