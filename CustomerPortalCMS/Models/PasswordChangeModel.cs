using System;
using System.ComponentModel.DataAnnotations;

namespace CustomerPortalCMS.Models
{

    public class PasswordChangeModel
    {
        [Display(Name = "Password")]
        [Required]
        public string OldPassword { get; set; }

        [Display(Name = "New Password")]
        [Required]
        public string NewPassword { get; set; }

        [Display(Name = "Confirm Password")]
        [Required]
        public string ConfirmPassword { get; set; }
    }
}