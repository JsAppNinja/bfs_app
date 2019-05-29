using System;
using System.Linq;
using System.Data;
using Umbraco.Web;
using Umbraco.Core;
using Umbraco.Core.Models;
using Umbraco.Core.Logging;
using Umbraco.Web.PublishedContentModels;

namespace CustomerPortalCMS.Models
{
    /// <summary>
    /// Wrapper class for CreditLocationDataItem in Umbraco
    /// </summary>
    public class CreditLocationModel
    {

        /// <summary>
        /// internal reference to CreditLocationDataItem published content in Umbraco
        /// </summary>
        private CreditLocationDataItem _creditLocation = null;

        /// <summary>
        /// Constructor for CreditLocationModel
        /// </summary>
        /// <param name="name"></param>
        public CreditLocationModel(string name)
        {
            var creditLocationDataFolder = GetCreditLocationDataFolder();
            if (creditLocationDataFolder.Children.Count(c => c.Name.Equals(name)) >= 1)
            {
                _creditLocation = (CreditLocationDataItem)creditLocationDataFolder.Children.Where(c => c.Name.Equals(name)).First();
            }
        }

        /// <summary>
        /// Creates a new Credit Location Data item in umbraco
        /// </summary>
        /// <param name="name"></param>
        /// <param name="fullName"></param>
        public void Create(string name, string fullName)
        {
            if (_creditLocation == null)
            {
                var creditLocationDataFolder = GetCreditLocationDataFolder();
                IContent content = ApplicationContext.Current.Services.ContentService.CreateContent(name, creditLocationDataFolder.Id, "creditLocationDataItem");
                content.SetValue("creditLocationFullName", fullName);
                ApplicationContext.Current.Services.ContentService.Publish(content);

                // refetch a reference to the parent folder, to get updated cache items
                creditLocationDataFolder = GetCreditLocationDataFolder();
                _creditLocation = (CreditLocationDataItem)creditLocationDataFolder.Children.Where(c => c.Name.Equals(name)).First();
            }
        }

        /// <summary>
        /// Does the Credit Location data item exist in Umbraco
        /// </summary>
        public bool Exists
        {
            get
            {
                if (_creditLocation != null)
                    return true;
                else
                    return false;
            }
        }

        /// <summary>
        /// Accessor for CustomerLocationDataItem typed content
        /// </summary>
        public CreditLocationDataItem Data => _creditLocation;

        /// <summary>
        /// Gets a reference to the credit location parent folder
        /// </summary>
        /// <returns></returns>
        private IPublishedContent GetCreditLocationDataFolder()
        {
            var umbracoHelper = new UmbracoHelper(UmbracoContext.Current);
            var dataFolder = umbracoHelper.TypedContentAtRoot().Where(c => c.Name.Equals("CP Data Repository")).First();
            var creditLocationDataFolder = dataFolder.Children.Where(c => c.Name.Equals("Credit Location Data")).First();

            return creditLocationDataFolder;
        }

    }
}