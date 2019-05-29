using System.Linq;
using System.Data;
using Umbraco.Web;
using Umbraco.Core.Models;
using Umbraco.Core.Logging;
using Umbraco.Web.PublishedContentModels;

namespace CustomerPortalCMS.Models
{
    public class CPGlobalConfiguration
    {

        private IPublishedContent _configurationData = null;
        private bool _isOnline = true;
        public bool IsOnline => _isOnline;

        private string _outageMessage = string.Empty;
        public string OutageMessage => _outageMessage;

        private bool _isRegistrationDisabled = false;
        public bool IsRegistrationDisabled => _isRegistrationDisabled;

        public CustomerPortalGlobalConfig GlobalConfig = null;

        public CPGlobalConfiguration()
        {
            try
            {
                if (UmbracoContext.Current != null)
                {
                    var umbracoHelper = new UmbracoHelper(UmbracoContext.Current);
                    var dataFolder = umbracoHelper.TypedContentAtRoot().Where(c => c.Name.Equals("CP Data Repository")).First();
                    var configFolder = dataFolder.Children.Where(c => c.Name.Equals("Configuration Data Parent Folder")).First();
                    _configurationData = configFolder.Children.Where(c => c.Name.Equals("Global Configuration")).First();
                    GlobalConfig = new CustomerPortalGlobalConfig(_configurationData);

                    if (_configurationData.GetPropertyValue<string>("customerPortalCurrentStatus") != "Online")
                    {
                        _isOnline = false;
                        _outageMessage = _configurationData.GetPropertyValue<string>("customerPortalOutageMessage");
                    }

                    if (_configurationData.HasValue("customerPortalRegistrationDisabled") && _configurationData.GetPropertyValue<bool>("customerPortalRegistrationDisabled"))
                        _isRegistrationDisabled = true;
                }
            }
            catch (System.Exception ex)
            {
                LogHelper.Error<CPGlobalConfiguration>($"An unexpected error has occurred in constructor loading global configuration.", ex);
            }
        }
    }
}