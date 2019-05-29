using System.ComponentModel.DataAnnotations;

namespace CustomerPortalCMS.Models
{
    public class CustomerContactDetailsModel 
    {
        [Display(Name = "Customer Name")]
        //[Required]
        public string CustomerName { get; set; }

        //[Display(Name = "Secondary First Name")]
        ////[Required]
        //public string SecondaryFirstName { get; set; }

        //[Display(Name = "Secondary Last Name")]
        ////[Required]
        //public string SecondaryLastName { get; set; }

        [Display(Name = "Address Line 1")]
        //[Required]
        public string AddressLine1 { get; set; }

        [Display(Name = "Address Line 2")]
        //[Required]
        public string AddressLine2 { get; set; }

        [Display(Name = "City")]
        //[Required]
        public string City { get; set; }

        [Display(Name = "State")]
        //[Required]
        public string State { get; set; }

        [Display(Name = "ZipCode")]
        //[Required]
        public string ZipCode { get; set; }

        [Display(Name = "Phone 1")]
        //[Required]
        public string Phone1 { get; set; }

        [Display(Name = "Phone 2")]
        //[Required]
        public string Phone2 { get; set; }

        [Display(Name = "Fax")]
        public string Fax { get; set; }

        [Display(Name = "AccountEmail")]
        public string AccountEmail { get; set; }

        [Display(Name = "InvoiceMethod")]
        public string InvoiceMethod { get; set; }

        [Display(Name = "StatementMethod")]
        public string StatementMethod { get; set; }
    }
    public class CustomerChangessModel
    {
        public string ChangesRequested { get; set; }
        public string CustomerNo { get; set; }
        public string CustomerName { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string AccountEmail { get; set; }

    }

}