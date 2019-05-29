using CustomerPortalData;
using System;
using System.ComponentModel.DataAnnotations;

namespace CustomerPortalCMS.Models
{

    public class PaymentReceiptModel
    {

        public Transaction Transaction { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}")]
        public DateTime TransDate { get; set; }
        public string TransID { get; set; }
    }
}