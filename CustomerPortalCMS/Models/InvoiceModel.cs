namespace CustomerPortalCMS.Models
{
    // simple invoice model to represent data posted back from the invoice payment grid
    public class InvoiceModel
    {
        public string InvoiceId { get; set; }
        public string InvoiceType { get; set; }
        public decimal PaymentAmount { get; set; }
        public string PaymentComment { get; set; }
    }
}