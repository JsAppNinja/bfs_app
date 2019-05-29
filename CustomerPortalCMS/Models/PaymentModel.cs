using CustomerPortalData;
using System.ComponentModel.DataAnnotations;

namespace CustomerPortalCMS.Models
{

    public class PaymentModel
    {
        [Display(Name = "Payment Amount")]
        [Required]
        [DisplayFormat(DataFormatString = "{0:F2}", ApplyFormatInEditMode = true)]
        public decimal paymentAmount { get; set; }

        public User paymentUser { get; set; }

        public bool IsAccountPayment { get; set; }

        public string InvoiceFormData { get; set; }

        public bool PaymentPending { get; set; }

        public string PaymentPendingMessage { get; set; }

        public string LastPaymentMessage { get; set; }

        public string PendingPaymentId { get; set; }

        public PaymentModel()
        {

        }
    }
}