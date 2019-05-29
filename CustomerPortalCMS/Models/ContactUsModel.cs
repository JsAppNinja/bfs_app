using System.ComponentModel.DataAnnotations;

namespace InstallUmbraco.Models
{
    public class ContactUsModel
    {
        [Required]
        public string ToAddress { get; set; }
        [Required]
        public string ZipCode { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Company { get; set; }
        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string ContactTime { get; set; }
        [Required]
        public string HearAboutUs { get; set; }
        [Required]
        public string Message { get; set; }

        public string LocationZipCode { get; set; }

        public string RecaptchaResponse { get; set; }
    }

    public class QuoteModel
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string ServiceName { get; set; }

        [Required]
        public string ZipCode { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        public string Message { get; set; }

        [Required]
        public int LocationId { get; set; }

        public string RecaptchaResponse { get; set; }
    }
}