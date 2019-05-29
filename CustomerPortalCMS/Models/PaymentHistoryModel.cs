using CustomerPortalData;
using System.ComponentModel.DataAnnotations;

namespace CustomerPortalCMS.Models
{

    public class PaymentHistoryModel
    {
        [Display(Name = "Payment Amount")]
        [Required]
        [DisplayFormat(DataFormatString = "{0:F2}", ApplyFormatInEditMode = true)]
        public decimal paymentAmount { get; set; }

        public User paymentUser { get; set; }

        public bool IsAccountPayment { get; set; }

        public string InvoiceFormData { get; set; }

        public PaymentHistoryModel()
        {

        }
    }
}