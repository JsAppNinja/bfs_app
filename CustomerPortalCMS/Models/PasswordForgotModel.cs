using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CustomerPortalCMS.Models
{

    public class PasswordForgotModel
    {
        [Display(Name = "Email Address")]
        [Required]
        [EmailAddress]
        public string EmailUserName { get; set; }
    }
}