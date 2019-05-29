using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using Umbraco.Core;
using Umbraco.Core.Models;
using Umbraco.Core.Logging;
using CustomerPortalData;

namespace CustomerPortalCMS.Models
{
    /// <summary>
    /// Wrapper model for Umbraco.Web.PublishedContentModels.Member
    /// </summary>
    public class MemberModel : Umbraco.Web.PublishedContentModels.Member
    {
        public MemberModel(IPublishedContent content) : base(content) { }

        public MemberModel(IMember content) : base((IPublishedContent)content) { }

        private CustomerModel _customer = null;

        private User _paymentUser = null;

        public new string CustomerName
        {
            get
            {
                if (string.IsNullOrEmpty(this.CustomerNumber))
                    return string.Empty;

                if (_customer == null)
                    _customer = new CustomerModel(this.CustomerNumber);

                if (_customer != null && _customer.Data != null)
                    return _customer.Data.CustomerName;
                else
                    return string.Empty;
            }
        }

        public string Email
        {
            get
            {
                return this.GetProperty("Email").Value.ToString();
            }
        }

        public User PaymentUser
        {
            get
            {
                if (_paymentUser == null && !string.IsNullOrEmpty(this.Email))
                    _paymentUser = CustomerPortalData.Controllers.PaymentUser.GetPaymentUser(this.Email);

                if (_paymentUser == null)
                {
                    _paymentUser = new User
                    {
                        Email = this.Email,
                        CustomerId = _customer.PaymentGatewayCustomerId
                    };
                    CustomerPortalData.Controllers.PaymentUser.UpdatePaymentUser(_paymentUser);
                }

                return _paymentUser;
            }
        }

        public MarketModel Market
        {
            get
            {
                MarketModel market = null;
                try
                {
                    if (!string.IsNullOrEmpty(EmployeeID))
                    {
                        // this is an employee user
                        string locationCode = CpEmployeeLocation;
                        if (string.IsNullOrEmpty(locationCode))
                        {
                            // query AD to get the user's location
                            Dictionary<string, string> properties = Services.LDAPService.GetProperties(new AuthModel(null, Email, null));
                            IMember member = ApplicationContext.Current.Services.MemberService.GetByUsername(Email);
                            if (properties.Keys.Contains("extensionattribute4"))
                            {
                                locationCode = properties["extensionattribute4"];
                                if (!string.IsNullOrEmpty(locationCode))
                                {
                                    member.SetValue("cpEmployeeLocation", locationCode);
                                    ApplicationContext.Current.Services.MemberService.Save(member);
                                }
                            }
                        }

                        if (!string.IsNullOrEmpty(locationCode))
                        {
                            using (DataTable dt = Services.OnlineQueryService2.IdExecuteDataTable("3ca1b13e04184912b6b4260a18657cc6", new string[] { locationCode }))
                            {
                                if (dt != null && dt.Rows.Count != 0)
                                {
                                    market = new MarketModel(dt.Rows[0]["market"].ToString());
                                    if (market.Data == null)
                                        market.Create(dt.Rows[0]["market"].ToString(), dt.Rows[0]["des"].ToString());
                                }
                            }
                        }
                        else
                            market = new MarketModel("N/A"); // return a "market not available" data item
                    }
                    else
                    {
                        // this is a customer user
                        market = new MarketModel(_customer.Data.CustomerMarket);
                    }
                    return market;
                }
                catch (Exception ex)
                {
                    LogHelper.Error<MemberModel>($"An unexpected error occurred in Market(get) for user #{Id}", ex);
                    return null;
                }
            }
        }

        /// <summary>
        /// Checks to see if the given customer account number is in this employee's market (used for logging purposes)
        /// </summary>
        /// <param name="customerNumber">The customer account number to check.</param>
        /// <returns>True if customer is in the employee's market, false if not.</returns>
        public bool IsCustomerInMarket(string customerNumber)
        {
            try
            {
                if (string.IsNullOrEmpty(EmployeeID))
                    return false;
                using (DataTable dt = Services.OnlineQueryService2.IdExecuteDataTable("ec99d6442ebd478c8a4457181beb7e7d", new string[] { customerNumber, EmployeeID }))
                {
                    if (dt == null || dt.Rows.Count == 0)
                        return false;
                    else
                        return true;
                }
            }
            catch (System.Exception ex)
            {
                LogHelper.Error<MemberModel>("An unexpected error occurred in IsCustomerInMarket.", ex);
                return false;
            }
        }
    }
}