using System.Collections.Generic;

namespace CustomerPortalCMS.Models
{

    public class PricingDetailsModel
    {
        public string ItemNumber { get; set; }
        public string ItemDescription { get; set; }
        public int ItemQuantity { get; set; }
        public string ItemUOM { get; set; }
        public decimal ItemOriginalPrice { get; set; }
        public decimal ItemOriginalTotal { get; set; }
        public decimal ItemNewPrice { get; set; }
        public decimal ItemNewTotal { get; set; }
    }

    public class PricingEmailModel
    {
        public string CustomerNumber { get; set; }
        public string CustomerName { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string InvoiceID { get; set; }
        public string InvoiceType { get; set; }
        public string EstimateDate { get; set; }
        public string JobID { get; set; }
        public string ShipToID { get; set; }
        public string OriginalTotal { get; set; }
        public string EstimateTotal { get; set; }
        public List<PricingDetailsModel> PriceableItems { get; set; }
        public List<PricingDetailsModel> UnpriceableItems { get; set; }
    }
}