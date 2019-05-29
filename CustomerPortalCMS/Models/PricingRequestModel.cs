namespace CustomerPortalCMS.Models
{
    public class PricingRequestModel
    {
        public string InvoiceId { get; set; }
        public string InvoiceType { get; set; }
        public string DateEstimate { get; set; }
        public string ShipToId { get; set; }
        public string JobId { get; set; }
        // the rest of these job properties are for display purposes only
        public string JobDescription { get; set; }
        public string JobAddress { get; set; }
        public string JobCity { get; set; }
        public string JobState { get; set; }
        public string JobZip { get; set; }
        public string JobLot { get; set; }
        public string JobBlock { get; set; }
        public string JobTaxCode { get; set; }
    }
}