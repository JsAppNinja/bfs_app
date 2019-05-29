using System;
using System.Linq;
using System.Data;
using Umbraco.Web;
using Umbraco.Core;
using Umbraco.Core.Models;
using Umbraco.Web.PublishedContentModels;

namespace CustomerPortalCMS.Models
{
    /// <summary>
    /// Wrapper for Market Data Item content in Umbraco
    /// </summary>
    public class MarketModel
    {

        /// <summary>
        /// internal reference to published content type MarketDataItem
        /// </summary>
        private MarketDataItem _market = null;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="name"></param>
        public MarketModel(string name)
        {
            var marketDataFolder = GetMarketDataFolder();
            if (marketDataFolder.Children.Count(c => c.Name.Equals(name, StringComparison.OrdinalIgnoreCase)) >= 1)
            {
                _market = (MarketDataItem)marketDataFolder.Children.Where(c => c.Name.Equals(name, StringComparison.OrdinalIgnoreCase)).First();
            }
        }

        /// <summary>
        /// Create the market data item if it doesn't exist
        /// </summary>
        /// <param name="name">Market Name</param>
        /// <param name="fullName">Market Full Name / Description</param>
        public void Create(string name, string fullName)
        {
            if (_market == null)
            {
                var marketDataFolder = GetMarketDataFolder();
                IContent content = ApplicationContext.Current.Services.ContentService.CreateContent(name, marketDataFolder.Id, "marketDataItem");
                content.SetValue("marketFullName", fullName);
                content.SetValue("cpDashboardIsInvoiceTabVisible", true);
                content.SetValue("cpDashboardIsSalesOrderTabVisible", true);
                content.SetValue("cpDashboardIsPickTicketsTabVisible", true);
                content.SetValue("cpDashboardIsStatementTabVisible", true);
                content.SetValue("cpDashboardIsQuotesTabVisible", false);
                ApplicationContext.Current.Services.ContentService.PublishWithStatus(content);

                // refetch a reference to the parent folder, to get updated cache items
                marketDataFolder = GetMarketDataFolder();
                _market = (MarketDataItem)marketDataFolder.Children.Where(c => c.Name.Equals(name)).First();
            }
        }

        /// <summary>
        /// Does the market item exist?
        /// </summary>
        public bool Exists
        {
            get
            {
                if (_market != null)
                    return true;
                else
                    return false;
            }
        }

        /// <summary>
        /// Typed published content data from Umbraco
        /// </summary>
        public MarketDataItem Data => _market;

        /// <summary>
        /// Gets the market root data folder
        /// </summary>
        /// <returns></returns>
        private IPublishedContent GetMarketDataFolder()
        {
            var umbracoHelper = new UmbracoHelper(UmbracoContext.Current);
            var dataFolder = umbracoHelper.TypedContentAtRoot().Where(c => c.Name.Equals("CP Data Repository")).First();
            var marketDataFolder = dataFolder.Children.Where(c => c.Name.Equals("Market Data")).First();

            return marketDataFolder;
        }

    }
}