using System.ComponentModel.DataAnnotations;

namespace CustomerPortalCMS.Models
{
    public class MemberDetailsModel 
    {
        [Display(Name = "First Name")]
        [Required]
        public string FirstName { get; set; }
        
        [Display(Name = "Last Name")]
        [Required]
        public string LastName { get; set; }

        [Display(Name = "Email")]
        public string MemberEmail { get; set; }

    }
}