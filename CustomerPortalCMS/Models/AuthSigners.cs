using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CustomerPortalCMS.Models
{
    public class AuthorizedSigner
    {
        public int AuthId { get; set; }

        [Display(Name = "Customer Number")]
        //[Required]
        public string CustomerNumber { get; set; }

        [Display(Name = "Authorized Signer")]
        //[Required]
        public string AuthSignerName { get; set; }

    }

    public class AuthSigners 
    {
        public List<AuthorizedSigner> Signers { get; set; }
    }

}