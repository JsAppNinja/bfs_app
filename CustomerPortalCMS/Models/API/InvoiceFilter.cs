using System;
using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace CustomerPortalCMS.Models.API
{

    public partial class InvoiceFilter
    {
        [JsonProperty("Filter")]
        public Filter Filter { get; set; }

        [JsonProperty("Pager")]
        public Pager Pager { get; set; }
    }

    public partial class Filter
    {
        [JsonProperty("ShipAcctId")]
        public string ShipAcctId { get; set; }

        [JsonProperty("OpenOnly")]
        public bool OpenOnly { get; set; }

        [JsonProperty("InvoiceDateStart")]
        public string InvoiceDateStart { get; set; }

        [JsonProperty("InvoiceDateEnd")]
        public string InvoiceDateEnd { get; set; }

        [JsonProperty("InvoiceMatch")]
        public string InvoiceMatch { get; set; }

        [JsonProperty("JobId")]
        public string JobId { get; set; }

        [JsonProperty("ShowFinanceCharges")]
        public bool? ShowFinanceCharges { get; set; }
    }

    public partial class Pager
    {
        [JsonProperty("Skip")]
        public long Skip { get; set; }

        [JsonProperty("Take")]
        public long Take { get; set; }

        [JsonProperty("Count")]
        public bool Count { get; set; }
    }

    public partial class InvoiceFilter
    {
        public static InvoiceFilter FromJson(string json) => JsonConvert.DeserializeObject<InvoiceFilter>(json, InvoiceFilterConverter.Settings);
    }

    public static class Serialize
    {
        public static string ToJson(this InvoiceFilter self) => JsonConvert.SerializeObject(self, InvoiceFilterConverter.Settings);
    }

    internal static class InvoiceFilterConverter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            NullValueHandling = NullValueHandling.Ignore,
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters = {
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }
}