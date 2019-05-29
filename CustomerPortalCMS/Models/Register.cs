using System.ComponentModel.DataAnnotations;
using System.Configuration;

namespace CustomerPortalCMS.Models
{
    public class Register 
    {
        [Display(Name = "Email Address")]
        [Required]
        public string EmailAddress { get; set; }

        [Display(Name = "Confirm Email Address")]
        [Required]
        public string ConfirmationEmailAddress { get; set; }

        [Display(Name = "First Name")]
        [Required]
        public string FirstName { get; set; }

        [Display(Name = "Last Name")]
        [Required]
        public string LastName { get; set; }

        [Display(Name = "Password")]
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "Confirm Password")]
        [Required]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }

        [Display(Name = "Customer Number")]
        [Required]
        public string CustomerNumber { get; set; }

        [Display(Name = "Invoice Number")]
        [Required]
        public string InvoiceNumber { get; set; }

        [Display(Name = "Invoice Amount")]
        [Required]
        [DataType(DataType.Currency)]
        public string InvoiceAmount { get; set; }

        [Display(Name = "Customer Name")]
        public string CustomerName { get; set; }

        private static string _url = string.Empty;
        private string _validateEmailUrl = string.Empty;

        /// <summary>
        /// This is referenced in an email template.
        /// </summary>
        public string LoginUrl
        {
            set => _url = value;
            get
            {
                if (string.IsNullOrEmpty(_url))
                {
                    _url = ConfigurationManager.AppSettings.Get("webUrl");
                    if (_url.EndsWith("/"))
                        _url = _url.TrimEnd('/');
                    _url = _url + $"{ConfigurationManager.AppSettings.Get("DefaultPortalUrl")}/login".Replace("~", "").Replace("//", "/");
                }
                return _url;
            }
        }

        public string ValidateEmailUrl
        {
            set => _validateEmailUrl = value;
            get
            {
                if (string.IsNullOrEmpty(_validateEmailUrl))
                    return string.Empty;
                if (!_validateEmailUrl.StartsWith("http"))
                {
                    string baseUrl = ConfigurationManager.AppSettings.Get("webUrl");
                    if (baseUrl.EndsWith("/") && _validateEmailUrl.StartsWith("/"))
                        _validateEmailUrl = _validateEmailUrl.Substring(1);

                    _validateEmailUrl = baseUrl + _validateEmailUrl;
                }

                return _validateEmailUrl;
            }
        }
    }
}