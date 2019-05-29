namespace CustomerPortalCMS.Models
{
    public class AuthModel
    {
        public string userName { get; set; }
        public string emailAddress { get; set; }
        public string password { get; set; }

        public AuthModel(string userName, string emailAddress, string password)
        {
            this.userName = userName;
            this.emailAddress = emailAddress;
            this.password = password;
        }
    }
}