using System;
using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace CustomerPortalCMS.Models.API
{

    public partial class InvoiceResults
    {
        [JsonProperty("Counts", NullValueHandling = NullValueHandling.Ignore)]
        public Counts Counts { get; set; }

        [JsonProperty("Result", NullValueHandling = NullValueHandling.Ignore)]
        public Invoice[] Result { get; set; }

        [JsonProperty("Messages", NullValueHandling = NullValueHandling.Ignore)]
        public string[] Messages { get; set; }
    }

    public partial class Counts
    {
        [JsonProperty("Take", NullValueHandling = NullValueHandling.Ignore)]
        public long? Take { get; set; }

        [JsonProperty("Returned", NullValueHandling = NullValueHandling.Ignore)]
        public long? Returned { get; set; }

        [JsonProperty("Count", NullValueHandling = NullValueHandling.Ignore)]
        public long? Count { get; set; }
    }

    public partial class Invoice
    {
        [JsonProperty("InvoiceId", NullValueHandling = NullValueHandling.Ignore)]
        public string InvoiceId { get; set; }

        [JsonProperty("InvoiceType", NullValueHandling = NullValueHandling.Ignore)]
        public string InvoiceType { get; set; }

        [JsonProperty("InvoiceKey", NullValueHandling = NullValueHandling.Ignore)]
        public string InvoiceKey { get; set; }

        [JsonProperty("InvoiceTypeDesc", NullValueHandling = NullValueHandling.Ignore)]
        public string InvoiceTypeDesc { get; set; }

        [JsonProperty("DocType", NullValueHandling = NullValueHandling.Ignore)]
        public string DocType { get; set; }

        [JsonProperty("DocTypeDesc", NullValueHandling = NullValueHandling.Ignore)]
        public string DocTypeDesc { get; set; }

        [JsonProperty("Category", NullValueHandling = NullValueHandling.Ignore)]
        public string Category { get; set; }

        [JsonProperty("TransactionDate", NullValueHandling = NullValueHandling.Ignore)]
        public DateTime? TransactionDate { get; set; }

        [JsonProperty("InvoiceDate", NullValueHandling = NullValueHandling.Ignore)]
        public DateTime? InvoiceDate { get; set; }

        [JsonProperty("DiscountDate", NullValueHandling = NullValueHandling.Ignore)]
        public DateTime? DiscountDate { get; set; }

        [JsonProperty("DueDate", NullValueHandling = NullValueHandling.Ignore)]
        public DateTime? DueDate { get; set; }

        [JsonProperty("ShipAccountId", NullValueHandling = NullValueHandling.Ignore)]
        public string ShipAccountId { get; set; }

        [JsonProperty("ShipName", NullValueHandling = NullValueHandling.Ignore)]
        public string ShipName { get; set; }

        [JsonProperty("ShipAddress", NullValueHandling = NullValueHandling.Ignore)]
        public Address ShipAddress { get; set; }

        [JsonProperty("BillAccountId", NullValueHandling = NullValueHandling.Ignore)]
        public string BillAccountId { get; set; }

        [JsonProperty("BillName", NullValueHandling = NullValueHandling.Ignore)]
        public string BillName { get; set; }

        [JsonProperty("BillAddress", NullValueHandling = NullValueHandling.Ignore)]
        public Address BillAddress { get; set; }

        [JsonProperty("InvoiceAmount", NullValueHandling = NullValueHandling.Ignore)]
        public decimal? InvoiceAmount { get; set; }

        [JsonProperty("InvoiceAmountToday", NullValueHandling = NullValueHandling.Ignore)]
        public decimal? InvoiceAmountToday { get; set; }

        [JsonProperty("Tax", NullValueHandling = NullValueHandling.Ignore)]
        public decimal? Tax { get; set; }

        [JsonProperty("AmountDue", NullValueHandling = NullValueHandling.Ignore)]
        public decimal? AmountDue { get; set; }

        [JsonProperty("AmountDueToday", NullValueHandling = NullValueHandling.Ignore)]
        public decimal? AmountDueToday { get; set; }

        [JsonProperty("Discount", NullValueHandling = NullValueHandling.Ignore)]
        public decimal? Discount { get; set; }

        [JsonProperty("SalesOrderId", NullValueHandling = NullValueHandling.Ignore)]
        public string SalesOrderId { get; set; }

        [JsonProperty("SalesPerson", NullValueHandling = NullValueHandling.Ignore)]
        public string SalesPerson { get; set; }

        [JsonProperty("TaxCode", NullValueHandling = NullValueHandling.Ignore)]
        public string TaxCode { get; set; }

        [JsonProperty("TaxCodeDesc", NullValueHandling = NullValueHandling.Ignore)]
        public string TaxCodeDesc { get; set; }

        [JsonProperty("JobId", NullValueHandling = NullValueHandling.Ignore)]
        public string JobId { get; set; }

        [JsonProperty("JobName", NullValueHandling = NullValueHandling.Ignore)]
        public string JobName { get; set; }

        [JsonProperty("EnteredBy", NullValueHandling = NullValueHandling.Ignore)]
        public string EnteredBy { get; set; }

        [JsonProperty("EnteredDate", NullValueHandling = NullValueHandling.Ignore)]
        public DateTime? EnteredDate { get; set; }

        [JsonProperty("EnteredTime", NullValueHandling = NullValueHandling.Ignore)]
        public DateTime? EnteredTime { get; set; }

        [JsonProperty("TermsCode", NullValueHandling = NullValueHandling.Ignore)]
        public string TermsCode { get; set; }

        [JsonProperty("TermsCodeDesc", NullValueHandling = NullValueHandling.Ignore)]
        public string TermsCodeDesc { get; set; }

        [JsonProperty("ShipFrom", NullValueHandling = NullValueHandling.Ignore)]
        public string ShipFrom { get; set; }

        [JsonProperty("ShipFromName", NullValueHandling = NullValueHandling.Ignore)]
        public string ShipFromName { get; set; }

        [JsonProperty("ShipFromAddress", NullValueHandling = NullValueHandling.Ignore)]
        public Address ShipFromAddress { get; set; }

        [JsonProperty("Aging", NullValueHandling = NullValueHandling.Ignore)]
        public long? Aging { get; set; }

        [JsonProperty("AgingGroup", NullValueHandling = NullValueHandling.Ignore)]
        public string AgingGroup { get; set; }

        [JsonProperty("StatusCode", NullValueHandling = NullValueHandling.Ignore)]
        public string StatusCode { get; set; }

        [JsonProperty("CustomerOrderId", NullValueHandling = NullValueHandling.Ignore)]
        public string CustomerOrderId { get; set; }
    }

    public partial class Address
    {
        [JsonProperty("AddressLine1", NullValueHandling = NullValueHandling.Ignore)]
        public string AddressLine1 { get; set; }

        [JsonProperty("AddressLine2", NullValueHandling = NullValueHandling.Ignore)]
        public string AddressLine2 { get; set; }

        [JsonProperty("City", NullValueHandling = NullValueHandling.Ignore)]
        public string City { get; set; }

        [JsonProperty("State", NullValueHandling = NullValueHandling.Ignore)]
        public string State { get; set; }

        [JsonProperty("Zip", NullValueHandling = NullValueHandling.Ignore)]
        public string Zip { get; set; }
    }

    public enum AgingGroup { Current, The30Days, The60Days, The90Days };

    internal static class InvoiceResultsConverter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters = {
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }
}
