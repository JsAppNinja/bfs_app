using System.Configuration;
using System.Net.Mail;
using System.Linq;
using Umbraco.Web;
using Umbraco.Core.Models;
using Umbraco.Core.Logging;

namespace CustomerPortalCMS.Helpers
{
    public static class EmailHelper
    {

        public static string GetEmailTemplates(string emailTemplateName, out string htmlTemplate, out string textTemplate, out string templateName)
        {
            try
            {
                var umbracoHelper = new UmbracoHelper(UmbracoContext.Current);
                var dataFolder = umbracoHelper.TypedContentAtRoot().Where(c => c.Name == "CP Data Repository").First();
                var configFolder = dataFolder.Children.Where(c => c.Name == "Configuration Data Parent Folder").First();
                var emailTemplate = configFolder.Children.Where(c => c.Name.Equals(emailTemplateName)).First();
                htmlTemplate = emailTemplate.GetProperty("emailHtmlTemplate").Value.ToString();
                textTemplate = emailTemplate.GetProperty("emailPlainTextTemplate").Value.ToString();
                var subject = emailTemplate.GetProperty("emailSubject").Value.ToString();
                // for the html template cleanup the newline stuff from the texteditor
                htmlTemplate = htmlTemplate.Replace("\r", "").Replace("\n", "");
                templateName = $"{emailTemplate.Name}_{emailTemplate.UpdateDate.ToString()}";

                return subject;
            }
            catch (System.Exception ex)
            {
                templateName = string.Empty;
                htmlTemplate = string.Empty;
                textTemplate = string.Empty;
                LogHelper.Error(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType, $"Unexpected error in GetEmailTemplates for {emailTemplateName}", ex);
            }
            return null;
        }

        /// <summary>
        /// Sends an email (honors emailOverride configuration flag)
        /// </summary>
        /// <param name="To">The recipient email address (can be a comma seperated list.</param>
        /// <param name="Subject">The Email Subject</param>
        /// <param name="Body">Body of the email.</param>
        /// <param name="IsHtml">Does the email body contain HTML markup?</param>
        public static void SendEmail(string To, string Subject, string Body, bool IsHtml) => SendEmail(To, null, null, Subject, Body, IsHtml);

        /// <summary>
        /// Sends an email (honors emailOverride configuration flag)
        /// </summary>
        /// <param name="To">The recipient email address (can be a comma seperated list.</param>
        /// <param name="CC">A recipient to CC on the email (can be a comma seperated list.</param>
        /// <param name="Subject">The Email Subject</param>
        /// <param name="Body">Body of the email.</param>
        /// <param name="IsHtml">Does the email body contain HTML markup?</param>
        public static void SendEmail(string To, string CC, string Subject, string Body, bool IsHtml) => SendEmail(To, CC, null, Subject, Body, IsHtml);

        /// <summary>
        /// Sends an email (honors emailOverride configuration flag)
        /// </summary>
        /// <param name="To">The recipient email address (can be a comma seperated list.</param>
        /// <param name="CC">A recipient to CC on the email (can be a comma seperated list.</param>
        /// <param name="BCC">A recipient to BCC on the email (can be a comma seperated list.</param>
        /// <param name="Subject">The Email Subject</param>
        /// <param name="Body">Body of the email.</param>
        /// <param name="IsHtml">Does the email body contain HTML markup?</param>
        public static void SendEmail(string To, string CC, string BCC, string Subject, string Body, bool IsHtml)
        {
            if (IsHtml)
                SendEmail(To, CC, BCC, Subject, Body, null);
            else
                SendEmail(To, CC, BCC, Subject, null, Body);
        }

        /// <summary>
        /// Sends an email (honors emailOverride configuration flag)
        /// Note that either htmlBody or textBody can be empty/null, but not both!
        /// </summary>
        /// <param name="To">The recipient email address (can be a comma seperated list.</param>
        /// <param name="CC">A recipient to CC on the email (can be a comma seperated list.</param>
        /// <param name="BCC">A recipient to BCC on the email (can be a comma seperated list.</param>
        /// <param name="Subject">The Email Subject</param>
        /// <param name="htmlBody">The HTML format for the email.</param>
        /// <param name="textBody">The Plain text formal for the email.</param>
        public static void SendEmail(string To, string CC, string BCC, string Subject, string htmlBody, string textBody)
        {
            using (var msg = new MailMessage())
            {
                msg.Subject = Subject;

                bool IsOverriden = false;
                string emailOverride = ConfigurationManager.AppSettings.Get("emailOverride");
                if (!string.IsNullOrEmpty(emailOverride))
                {
                    IsOverriden = true;
                    string[] addresses = emailOverride.Split(',');
                    foreach (string address in addresses)
                        msg.To.Add(address);

                    if (!string.IsNullOrEmpty(htmlBody))
                        htmlBody += $"<p>Originally To: {To}</p>";
                    if (!string.IsNullOrEmpty(textBody))
                        textBody += $@"\r\nOriginally To: {To}\r\n";
                }
                else
                {
                    string[] addresses = To.Split(',');
                    foreach (string address in addresses)
                        msg.To.Add(address);
                }

                // handle CCs
                if (!string.IsNullOrEmpty(CC))
                {
                    if (IsOverriden)
                    {
                        if (!string.IsNullOrEmpty(htmlBody))
                            htmlBody += $"<p>Originally To: {CC}</p>";
                        if (!string.IsNullOrEmpty(textBody))
                            textBody += $@"\r\nOriginally To: {CC}\r\n";
                    }
                    else
                    {
                        string[] addresses = CC.Split(',');
                        foreach (string address in addresses)
                            msg.CC.Add(address);
                    }
                }

                // handle Bccs
                if (!string.IsNullOrEmpty(BCC))
                {
                    if (IsOverriden)
                    {
                        if (!string.IsNullOrEmpty(htmlBody))
                            htmlBody += $"<p>Originally To: {BCC}</p>";
                        if (!string.IsNullOrEmpty(textBody))
                            textBody += $@"\r\nOriginally To: {BCC}\r\n";
                    }
                    else
                    {
                        string[] addresses = BCC.Split(',');
                        foreach (string address in addresses)
                            msg.Bcc.Add(address);
                    }
                }


                if (!string.IsNullOrEmpty(htmlBody))
                {
                    AlternateView htmlView = AlternateView.CreateAlternateViewFromString(htmlBody, null, "text/html");
                    msg.AlternateViews.Add(htmlView);
                }

                if (!string.IsNullOrEmpty(textBody))
                {
                    AlternateView textView = AlternateView.CreateAlternateViewFromString(textBody, null, "text/plain");
                    msg.AlternateViews.Add(textView);
                }


                using (SmtpClient smtp = new SmtpClient())
                {
                    // see mailSettings information in the Web.config (at root level) file.
                    // From email address is controlled by those settings.
                    smtp.Send(msg);
                }
            }
        }
    }
}