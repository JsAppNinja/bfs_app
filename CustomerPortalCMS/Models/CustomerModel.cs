#region usings
using System;
using System.Linq;
using System.Data;
using System.Collections.Generic;
using Umbraco.Web;
using Umbraco.Core;
using Umbraco.Core.Models;
using Umbraco.Core.Logging;
using Umbraco.Web.PublishedContentModels;
using CustomerPortalCMS.Services;
using CustomerPortalCMS.Helpers;
using CustomerPortalData;
#endregion

namespace CustomerPortalCMS.Models
{
    /// <summary>
    /// Wrapper class for umbraco published content CustomerDataItem
    /// </summary>
    public class CustomerModel
    {
        
        #region Constructor
        /// <summary>
        /// Constructs a new reference to the CustomerModel wrapper class.
        /// </summary>
        /// <param name="accountNumber">The account number of the CustomerDataItem, which is the node name for the content.</param>
        public CustomerModel(string accountNumber)
        {

            if (string.IsNullOrEmpty(accountNumber))
                return;

            IPublishedContent customerDataFolder = GetCustomerDataFolder();
            if (customerDataFolder.Children.Count(c => c.Name.Equals(accountNumber)) == 1)
            {
                _customer = new CustomerDataItem(customerDataFolder.Children.Where(c => c.Name.Equals(accountNumber)).First());
                TimeSpan span = DateTime.Now - _customer.UpdateDate;
                if (span.TotalHours >= 24)
                {
                    // let's update the basic customer data from online to ensure it is fresh
                    UpdateData();
                }
            }

            if (_customer == null)
            {
                // use slower method to ensure data doesn't exist and just hasn't been published to the cache yet...  annoying threading issue
                customerDataFolder = GetCustomerDataFolderIContext().ToPublishedContent();
                if (customerDataFolder.Children().Where(c => c.Name.Equals(accountNumber)).Count() == 1)
                {
                    _customer = new CustomerDataItem(customerDataFolder.Children.Where(c => c.Name.Equals(accountNumber)).First());
                    return;
                }
                else
                {
                    // customer data does not exist in our database, lets try to create it!
                    using (DataTable dt = GetOnlineData(accountNumber))
                    {
                        if (dt != null && dt.Rows.Count == 1)
                        {
                            //arnum	arnum2	arnum3	arname	arlname	arfname	arsort	aradd1	aradd2	arcity	arstate	arzip	phone1	phone2	arfax	creditloc	locname	market	marketname	email
                            CreateCustomerModelDataItem(
                                dt.Rows[0]["arnum2"].ToString(),
                                dt.Rows[0]["arname"].ToString(),
                                dt.Rows[0]["aradd1"].ToString(),
                                dt.Rows[0]["aradd2"].ToString(),
                                dt.Rows[0]["arcity"].ToString(),
                                dt.Rows[0]["arstate"].ToString(),
                                dt.Rows[0]["arzip"].ToString(),
                                dt.Rows[0]["creditloc"].ToString(),
                                dt.Rows[0]["market"].ToString(),
                                dt.Rows[0]["phone1"].ToString(),
                                dt.Rows[0]["salesemail"].ToString()                             
                                );

                            // since we had to create this customer, ensure its credit location and market data items exist
                            _creditLocation = new CreditLocationModel(_customer.CustomerCreditLocation);
                            if (!_creditLocation.Exists)
                                _creditLocation.Create(_customer.CustomerCreditLocation, dt.Rows[0]["locname"].ToString());

                            MarketModel market = new MarketModel(_customer.CustomerMarket);
                            if (!market.Exists)
                                market.Create(_customer.CustomerMarket, dt.Rows[0]["marketname"].ToString());
                        }
                    }
                }
            }
            else
            {
                _creditLocation = new CreditLocationModel(_customer.CustomerCreditLocation);
                _market = new MarketModel(_customer.CustomerMarket);
                if (!_creditLocation.Exists || !_market.Exists)
                    UpdateData();
            }
        }
        #endregion

        #region Public properties
        /// <summary>
        /// Does the CustomerDataItem exist in Umbraco
        /// </summary>
        ///
        public bool Exists
        {
            get
            {
                if (_customer != null)
                    return true;
                else
                    return false;
            }
        }

        /// <summary>
        /// Can the customer select "credit card" as a payment type?
        /// </summary>
        public bool CpCustomerAllowCardPayments
        {
            get
            {
                // default to false
                if (_customer == null || !_customer.HasValue("CpCustomerAllowCardPayments"))
                    return false;
                else
                    return _customer.CpCustomerAllowCardPayments;
            }
        }

        /// <summary>
        /// Reference to the CustomerDataItem typed published content
        /// </summary>
        public CustomerDataItem Data => _customer;

        /// <summary>
        /// Helper accessor for CreditLocationModel full name associated with this customer
        /// </summary>
        public string CreditLocationFullName
        {
            get
            {
                try
                {
                    if (_customer == null)
                        return string.Empty;

                    if (_creditLocation == null)
                        _creditLocation = new CreditLocationModel(_customer.CustomerCreditLocation);

                    if (!_creditLocation.Exists)
                        UpdateData();
                    return _creditLocation.Data.CreditLocationFullName;
                }
                catch (Exception ex)
                {
                    LogHelper.Error<CustomerModel>($"An unexpected error occurred in CreditLocationFullName(get) for {_customer.CustomerNumber}", ex);
                    return string.Empty;
                }
            }
        }

        /// <summary>
        /// Helper accessor for MarketModel full name associated with this customer
        /// </summary>
        public string MarketFullName
        {
            get
            {
                if (_customer == null)
                    return string.Empty;

                if (_market == null)
                    _market = new MarketModel(_customer.CustomerMarket);

                if (!_market.Exists)
                    UpdateData();
                return _market.Data.MarketFullName;

            }
        }

        /// <summary>
        /// Returns the customer's payment gateway record Id.
        /// </summary>
        public int PaymentGatewayCustomerId
        {
            get
            {
                if (_paymentGatewayCustomerId == 0)
                    _paymentGatewayCustomerId = CustomerPortalData.Controllers.Customer.GetCustomerRecordId(_customer.CustomerNumber);
                return _paymentGatewayCustomerId;
            }
        }

        /// <summary>
        /// Returns the next payment gateway reference number for this customer
        /// </summary>
        public string PaymentGatewayReferenceNumber
        {
            get
            {
                return CustomerPortalData.Controllers.Customer.GetPaymentReferenceNumber(_customer.CustomerNumber);
            }
        }

        /// <summary>
        /// Are user self-registrations allowed for customers in this market?
        /// </summary>
        public bool MarketRegistrationAllowed
        {
            get
            {
                if (_market == null)
                    _market = new MarketModel(_customer.CustomerMarket);

                if (!_market.Data.HasValue("customerPortalMarketRegistrationEnabled"))
                    return true;

                return _market.Data.CustomerPortalMarketRegistrationEnabled;
            }
        }

        /// <summary>
        /// Are user self-registrations allowed for this credit location's customers?
        /// </summary>
        public bool CreditLocationRegistrationAllowed
        {
            get
            {
                if (_creditLocation == null)
                    _creditLocation = new CreditLocationModel(_customer.CustomerCreditLocation);

                if (!_creditLocation.Data.HasValue("customerPortalLocationRegistrationEnabled"))
                    return true;

                return _creditLocation.Data.CustomerPortalLocationRegistrationEnabled;
            }
        }
        #endregion

        #region Private Properties
        /// <summary>
        /// internal reference to CustomerDataItem
        /// </summary>
        private CustomerDataItem _customer = null;

        /// <summary>
        /// Internal reference to the credit location model
        /// </summary>
        private CreditLocationModel _creditLocation = null;

        /// <summary>
        /// Internal reference to the market model
        /// </summary>
        private MarketModel _market = null;

        /// <summary>
        /// The customer's payment gateway record id
        /// </summary>
        private int _paymentGatewayCustomerId = 0;
        #endregion

        #region Public Methods
        /// <summary>
        /// Pass in a dictionary of properties and values to update, and it will do so.
        /// </summary>
        /// <param name="dataProperties">Dictionary of properties and their values.</param>
        public void UpdateData(Dictionary<string, object> dataProperties)
        {
            // throw an excepton if the CustomerModel object is not properly referring a content item
            if (_customer == null)
                throw new Exception("CustomerDataItem does not exist.");

            // return if the 
            if (dataProperties == null || dataProperties.Count == 0)
                return;

            IContent content = ApplicationContext.Current.Services.ContentService.GetById(_customer.Id);
            foreach (string key in dataProperties.Keys)
                content.SetValue(key, dataProperties[key]);

            var result = ApplicationContext.Current.Services.ContentService.SaveAndPublishWithStatus(content);
            // to-do, do something with the result

            // refetch the reference to the update content
            var customerDataFolder = GetCustomerDataFolder();
            _customer = (CustomerDataItem)customerDataFolder.Children.Where(c => c.Id.Equals(_customer.Id)).First();

        }

        /// <summary>
        /// Returns an enumerable containing all Customer Data content
        /// Be careful, this could be time consuming...
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<CustomerDataItem> GetAllCustomers(UmbracoContext umbracoContext)
        {
            var customerDataFolder = GetCustomerDataFolder(umbracoContext);
            return customerDataFolder.Children<CustomerDataItem>();
        }

        public void UpdatePaymentGateway()
        {

            Customer rec = GetRec();

            CustomerPortalData.Controllers.Customer.UpdateCustomerRecord(rec);
            _paymentGatewayCustomerId = rec.CustomerId;
        }
        #endregion

        #region Private Methods

        private Customer GetRec()
        {
            // to-do: get some of this information from Online either through a query from Mat, or from Genero
            return new Customer
            {
                OnLineId = Int32.Parse(_customer.CustomerNumber),
                NotificationEmail = _customer.CustomerAdminUserEmail,
                EnableCardPayments = this.CpCustomerAllowCardPayments,
                CardFeePecentage = 0, //! Need to get from Genero/QueryPad (or make it a property in the CMS)
                eCheckPercentage = 0, //! Need to get from Genero/QueryPad (or make it a property in the CMS)
                CreditManagerEmail = "credit.manager@bldr.com", //! Need to get from Genero/QueryPad (or make it a property in the CMS)
                CreditManagerName = "Credit Manager", //! Need to get from Genero/QueryPad (or make it a property in the CMS)
                CustomerName = _customer.CustomerName,
                CreditLocationName = CreditLocationFullName,
                MarketName = MarketFullName
            };
        }

        /// <summary>
        /// Calls the online query (5c2727a05a144ab1b5ce2c696f0aefe6) to get the customer's basic data
        /// </summary>
        /// <param name="accountNumber">The account number (arname2) to retrieve.</param>
        /// <returns></returns>
        private DataTable GetOnlineData(string accountNumber)
        {
            // call the online query service
            var parms = new string[] { accountNumber };
            // to-do: put this query ID into an application setting.
            return OnlineQueryService2.IdExecuteDataTable("5c2727a05a144ab1b5ce2c696f0aefe6", parms);
        }

        /// <summary>
        /// Updates the content data, and re-publishes.
        /// </summary>
        private void UpdateData()
        {
            try
            {
                using (DataTable dt = GetOnlineData(_customer.CustomerNumber))
                {
                    if (dt != null && dt.Rows.Count == 1)
                    {
                        IContent content = ApplicationContext.Current.Services.ContentService.GetById(_customer.Id);
                        content.SetValue("customerName", dt.Rows[0]["arname"].ToString());
                        content.SetValue("customerAddress1", dt.Rows[0]["aradd1"].ToString());
                        content.SetValue("customerAddress2", dt.Rows[0]["aradd2"].ToString());
                        content.SetValue("customerCity", dt.Rows[0]["arcity"].ToString());
                        content.SetValue("customerState", dt.Rows[0]["arstate"].ToString());
                        content.SetValue("customerZipCode", dt.Rows[0]["arzip"].ToString());
                        content.SetValue("customerCreditLocation", dt.Rows[0]["creditloc"].ToString());
                        content.SetValue("customerMarket", dt.Rows[0]["market"].ToString());
                        content.SetValue("customerPhoneNumber", dt.Rows[0]["phone1"].ToString());
                        if (string.IsNullOrEmpty(this.Data.CustomerSalesNotificationAddress) || !this.Data.CustomerSalesNotificationAddress.Contains(","))
                            content.SetValue("customerSalesNotificationAddress", dt.Rows[0]["salesemail"]);

                        var result = ApplicationContext.Current.Services.ContentService.SaveAndPublishWithStatus(content);
                        // to-do, do something with the result

                        // get a refreshed copy of the customer data content item
                        var customerDataFolder = GetCustomerDataFolder();
                        _customer = (CustomerDataItem)customerDataFolder.Children.Where(c => c.Id.Equals(_customer.Id)).First();

                        // ensure its credit location and market data items exist
                        _creditLocation = new CreditLocationModel(_customer.CustomerCreditLocation);
                        if (!_creditLocation.Exists)
                            _creditLocation.Create(_customer.CustomerCreditLocation, dt.Rows[0]["locname"].ToString());

                        MarketModel market = new MarketModel(_customer.CustomerMarket);
                        if (!market.Exists)
                            market.Create(_customer.CustomerMarket, dt.Rows[0]["marketname"].ToString());
                    }
                }
            }
            catch (System.Exception ex)
            {
                LogHelper.Error<CustomerModel>($"An unexpected error has occurred in UpdateData for {_customer.CustomerNumber}.", ex);
            }
        }

        /// <summary>
        /// Creates the CustomerModelData item in Umbraco
        /// </summary>
        /// <param name="accountNumber"></param>
        /// <param name="accountName"></param>
        /// <param name="addressLine1"></param>
        /// <param name="addressLine2"></param>
        /// <param name="city"></param>
        /// <param name="state"></param>
        /// <param name="zipCode"></param>
        /// <param name="creditLocation"></param>
        /// <param name="market"></param>
        private void CreateCustomerModelDataItem(string accountNumber, string accountName, string addressLine1, string addressLine2, string city, string state, string zipCode, string creditLocation, string market, string phoneNumber, string salesEmailAddress)
        {

            if (_customer == null)
            {
                var customerDataFolder = GetCustomerDataFolder();
                IContent content = ApplicationContext.Current.Services.ContentService.CreateContent(accountNumber, customerDataFolder.Id, "customerDataItem");
                content.SetValue("customerNumber", accountNumber);
                content.SetValue("customerName", accountName);
                content.SetValue("customerAddress1", addressLine1);
                content.SetValue("customerAddress2", addressLine2);
                content.SetValue("customerCity", city);
                content.SetValue("customerState", state);
                content.SetValue("customerZipCode", zipCode);
                content.SetValue("customerCreditLocation", creditLocation);
                content.SetValue("customerMarket", market);
                content.SetValue("customerPhoneNumber", phoneNumber);
                content.SetValue("customerSalesNotificationAddress", salesEmailAddress);
                var publishStatus = ApplicationContext.Current.Services.ContentService.SaveAndPublishWithStatus(content);
                if (!publishStatus.Success)
                    throw new Exception($"Unexpected error publishing customDataItem content for {accountNumber}, {accountName}: {publishStatus.Exception.Message}.");

                customerDataFolder = GetCustomerDataFolder(); // get a new reference to the data folder to get the updated cache items
                _customer = (CustomerDataItem)customerDataFolder.Children.Where(c => c.Name.Equals(accountNumber)).First();

            }
        }

        /// <summary>
        /// Gets the Customer Data root data folder
        /// </summary>
        /// <returns></returns>
        private IPublishedContent GetCustomerDataFolder()
        {

            var umbracoHelper = new UmbracoHelper(UmbracoContext.Current);
            var dataFolder = umbracoHelper.TypedContentAtRoot().Where(c => c.Name.Equals("CP Data Repository")).First();
            var customerDataFolder = dataFolder.Children.Where(c => c.Name.Equals("Customer Data")).First();

            return customerDataFolder;
        }

        /// <summary>
        /// Gets the customer data root data folder, requires a passed in UmbracoContext reference
        /// To be used from hangfire job threads, for example.
        /// </summary>
        /// <param name="currentContext">The umbraco context to use.</param>
        /// <returns></returns>
        private static IPublishedContent GetCustomerDataFolder(UmbracoContext currentContext)
        {
            var umbracoHelper = new UmbracoHelper(currentContext);
            var dataFolder = umbracoHelper.TypedContentAtRoot().Where(c => c.Name.Equals("CP Data Repository")).First();
            var customerDataFolder = dataFolder.Children.Where(c => c.Name.Equals("Customer Data")).First();

            return customerDataFolder;
        }

        /// <summary>
        /// Gets the Customer data root folder as an IContext reference.
        /// Slower but used to ensure no duplicates are created when a new customer record is created.
        /// </summary>
        /// <returns></returns>
        private static IContent GetCustomerDataFolderIContext()
        {
            IContent content = ApplicationContext.Current.Services.ContentService.GetRootContent().Where(c => c.Name.Equals("CP Data Repository")).First();
            var dataFolder = content.Children().Where(c => c.Name.Equals("Customer Data")).First();
            return dataFolder;
        }
        #endregion

    }
}