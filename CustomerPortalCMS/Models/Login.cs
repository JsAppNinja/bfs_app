using System.ComponentModel.DataAnnotations;

namespace CustomerPortalCMS.Models
{
    public class Login
    {
        [Display(Name = "Username")]
        [Required(ErrorMessage = "Your Username (email address) is required.")]
        public string Username { get; set; }

        [Display(Name = "Password")]
        [Required(ErrorMessage = "Your password is required.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}