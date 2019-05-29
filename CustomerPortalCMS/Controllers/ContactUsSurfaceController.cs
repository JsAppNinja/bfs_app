using Umbraco.Web.Mvc;
using System.Web.Mvc;
using InstallUmbraco.Models;
using System.Configuration;
using System.Net.Mail;
using Umbraco.Web;
using System;

namespace InstallUmbraco.Controllers
{
    public class ContactUsSurfaceController : SurfaceController
    {
        public const string PARTIAL_VIEW_FOLDER = "~/Views/Partials/ContactUs/";
        public ActionResult RenderForm(char? reason)
        {
            ViewData["reason"] = reason;
            return PartialView(PARTIAL_VIEW_FOLDER + "_ContactUs.cshtml");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SubmitForm(ContactUsModel model)
        {
            if(ModelState.IsValid)
            {
                var CTN = SendEmail(model);
                TempData["ContactSuccess"] = CTN;
                return RedirectToCurrentUmbracoPage();
            }
            return CurrentUmbracoPage();
        }

        private string SendEmail(ContactUsModel model)
        {
            string EmailFrom = ConfigurationManager.AppSettings["emailFrom"];
            string EmailFromAlias = ConfigurationManager.AppSettings["emailFromAlias"];

            string EmailTo = CurrentPage.GetPropertyValue<string>("otherContact");
            string EmailAlias = CurrentPage.GetPropertyValue<string>("otherAlias");

            if (model.ToAddress == "sales")
            {
                EmailTo = CurrentPage.GetPropertyValue<string>("salesContact");
                EmailAlias = CurrentPage.GetPropertyValue<string>("salesAlias");

            }
            else if (model.ToAddress == "warranty")
            {
                EmailTo = CurrentPage.GetPropertyValue<string>("warrantyContact");
                EmailAlias = CurrentPage.GetPropertyValue<string>("warrantyAlias");
            }
            else if (model.ToAddress == "safety")
            {
                EmailTo = CurrentPage.GetPropertyValue<string>("safetyContact");
                EmailAlias = CurrentPage.GetPropertyValue<string>("safetyAlias");
            }
            else if (model.ToAddress == "careers")
            {
                EmailTo = CurrentPage.GetPropertyValue<string>("careersContact");
                EmailAlias = CurrentPage.GetPropertyValue<string>("careersAlias");
            }
            else if (model.ToAddress == "other")
            {
                EmailTo = CurrentPage.GetPropertyValue<string>("otherContact");
                EmailAlias = CurrentPage.GetPropertyValue<string>("otherAlias");
            }
            else
            {
                EmailTo = CurrentPage.GetPropertyValue<string>("otherContact");
                EmailAlias = CurrentPage.GetPropertyValue<string>("otherAlias");
            }

            // create a tracking number from utc time-stamp... this basically goes down to tenth of a second... is 8 digits as i write this, will eventually get to 10 unless someone complains
            string CTN = ((DateTime.Now.ToFileTimeUtc() - 131615555555555555L) / 100000).ToString();

            // Send Email to BFS
            MailMessage messageToBFS = new MailMessage
            {
                From = new MailAddress(EmailFrom, EmailFromAlias)
            };
            foreach (var address in EmailTo.Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries))
            {
                messageToBFS.To.Add(address);
            }
            messageToBFS.Subject = string.Format("Bldr.com - Contact Us Form (Re: {0})", EmailAlias);//, model.Name, model.Company, model.EmailAddress);
            messageToBFS.Body =
                            "Hello, " + "\n\n" +
                            "This is a message from the Bldr.com website, please follow up as soon as possible." + "\n\n" +
                            "Message Content:" + "\n" +
                            "-----------------------------------------" + "\n" +
                            "Name: " + model.Name + "\n" +
                            "Company: " + model.Company + "\n" +
                            "Zipcode: " + model.ZipCode + "\n" +
                            "Phone: " + model.Phone + "\n" +
                            "Email: " + model.EmailAddress+ "\n" +
                            "Contact Time: " + model.ContactTime + "\n" +
                            "Heard About Us: " + model.HearAboutUs + "\n" +
                            "Re: Location Zip: " + model.LocationZipCode + "\n" +
                            "Message: " + model.Message + "\n" +
                            "-----------------------------------------" + "\n\n" +
                            "Query Reference Number" + "\n" +
                            "-----------------------------------------" + "\n" +
                            CTN + "\n" +
                            "-----------------------------------------";

            // Send Email Receipt to User
            //MailAddress fromBFS = new MailAddress(EmailFrom, EmailFromAlias);
            //MailAddress toUser = new MailAddress(model.EmailAddress, model.Name);
            //MailMessage messageToUser = new MailMessage(fromBFS, toUser);
            //messageToUser.Subject = string.Format("Bldr.com - Contact Us (Message Receipt)");
            //messageToUser.Body =
            //                "Hello, " + model.Name + "\n\n" +
            //                "We have received your message and will follow up as soon as possible." + "\n\n" +
            //                "Receipt of Message:" + "\n" +
            //                "-----------------------------------------" + "\n" +
            //                "Name: " + model.Name + "\n" +
            //                "Company: " + model.Company + "\n" +
            //                "Zipcode: " + model.ZipCode + "\n" +
            //                "Phone: " + model.Phone + "\n" +
            //                "Contact Time: " + model.ContactTime + "\n" +
            //                "Heard About Us: " + model.HearAboutUs + "\n" +
            //                "Re:Location Zip: " + model.LocationZipCode + "\n" +
            //                "Message: " + model.Message + "\n" +
            //                "-----------------------------------------" + "\n\n" +
            //                "Contact Tracking Number" + "\n" +
            //                "-----------------------------------------" + "\n" +
            //                "CTN: " + CTN + "\n" +
            //                "-----------------------------------------";

            // ### Local Development SMTP Client
            //SmtpClient client = new SmtpClient("127.0.0.1", 25);
            //client.Send(message);

            // ### Production SMTP Client
            using (System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient())
            {
                // see mailSettings information in the Web.config (at root level) file.
                smtp.Send(messageToBFS);
                //smtp.Send(messageToUser);
            }
            return CTN;
        }
    }
}