using System;

namespace CustomerPortalCMS.Models
{
    /// <summary>
    /// Thin member model used for search capabilites - contains no tie ins to MemberModel and must be loaded manually
    /// </summary>
    public class SearchMemberModel
    {
        public int memberId { get; set; }
        public string employeeID { get; set; }
        public string customerNumber { get; set; }
        public string customerName { get; set; }
        public string memberLastName { get; set; }
        public string memberFirstName { get; set; }
        public string memberEmail { get; set; }
        public bool IsEmailActivated { get; set; }
        public bool IsCustomerAdmin { get; set; }
        public DateTime dateTOSAccepted { get; set; }
        public string lastLockoutDate { get; set; }
        public bool lockedOut { get; set; }
        public string lastLogin { get; set; }
        public string failedPasswordAttempts { get; set; }
        public string passwordChangeDate { get; set; }
        public string employeeMarketName { get; set; }

        public SearchMemberModel(int id) { }

        public SearchMemberModel() { }

       
    }
}