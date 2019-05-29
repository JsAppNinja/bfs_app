namespace CustomerPortalCMS.Models
{
    public class PricingResponseModel
    {

        public int LineNumber { get; set; }

        public string ItemNumber { get; set; }

        public string ItemDescription { get; set; }

        public int ItemQuantity { get; set; }

        public string ItemUOM { get; set; }

        public decimal ItemOriginalPrice { get; set; }

        public decimal ItemOriginalTotal { get; set; }

        public decimal? ItemNewPrice { get; set; }

        public decimal? ItemNewTotal { get; set; }

    }
}