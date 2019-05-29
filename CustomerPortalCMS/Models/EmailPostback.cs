using System;
using System.Linq;
using System.Data;
using System.Collections.Generic;
using Newtonsoft.Json;
using Umbraco.Web;
using Umbraco.Core;
using Umbraco.Core.Models;
using Umbraco.Core.Logging;
using Umbraco.Web.PublishedContentModels;

namespace CustomerPortalCMS.Models
{
    public class EmailPostback
    {

        private CustomerPortalEmailPostback _postbackItem = null;
        private Dictionary<string, object> _metaData = null;
        private IContent _content = null;
        private string _errorMessage = null;
        private string _resultMessage = null;

        public EmailPostback()
        {
            string newName = Guid.NewGuid().ToString();
            _content = ApplicationContext.Current.Services.ContentService.CreateContent(newName, GetEmailPostbackFolder().Id, "customerPortalEmailPostback");
            _metaData = new Dictionary<string, object>();
        }

        public EmailPostback(string name)
        {
            var emailPostbackFolder = GetEmailPostbackFolder();
            if (emailPostbackFolder.Children.Count(c => c.Name.Equals(name)) != 1)
                throw new Exception($"Email Postback {name} not found.");

            _postbackItem = (CustomerPortalEmailPostback)emailPostbackFolder.Children.Where(c => c.Name.Equals(name)).First();
            _content = ApplicationContext.Current.Services.ContentService.GetById(_postbackItem.Id);

            // parse the json metadata
            string meta = _content.GetValue<string>("customerPortalEmailPostbackMetaData");
            if (!string.IsNullOrEmpty(meta))
                _metaData = JsonConvert.DeserializeObject<Dictionary<string, object>>(meta);
        }

        public string Name
        {
            get
            {
                if (_postbackItem == null)
                    return _content.Name;
                else
                    return _postbackItem.Name;
            }
        }

        public string Description
        {
            get
            {
                if (_postbackItem == null)
                    return _content.GetValue<string>("customerPortalEmailPostbackDescription");
                else
                    return _postbackItem.CustomerPortalEmailPostbackDescription;
            }
            set
            {
                if (_content != null)
                    _content.SetValue("customerPortalEmailPostbackDescription", value);
                else
                    throw new Exception("Property is read only.");
            }
        }

        public string Type
        {
            get
            {
                if (_postbackItem == null)
                    return _content.GetValue<string>("customerPortalEmailPostbackType");
                else
                    return _postbackItem.CustomerPortalEmailPostbackType;
            }
            set
            {
                if (_content != null)
                    _content.SetValue("customerPortalEmailPostbackType", value);
                else
                    throw new Exception("Property is read only.");
            }
        }

        public Dictionary<string, object> Meta => _metaData;
        public string ErrorMessage
        {
            get => _errorMessage;
            set => _errorMessage = value;
        }

        public string ResultMessage
        {
            get => _resultMessage;
            set => _resultMessage = value;
        }

        public bool Save()
        {
            // convert Meta to JSON
            string json = JsonConvert.SerializeObject(_metaData, Formatting.None);
            _content.SetValue("customerPortalEmailPostbackMetaData", json);

            if (!ApplicationContext.Current.Services.ContentService.Publish(_content))
            {
                LogHelper.Warn<EmailPostback>($"Unable to publish EmailPostback content type.");
                return false;
            }

            var dataFolder = GetEmailPostbackFolder(); // get a new reference to the data folder to get the updated cache items
            _postbackItem = (CustomerPortalEmailPostback)dataFolder.Children.Where(c => c.Name.Equals(this.Name)).FirstOrDefault();
            return true;
        }

        public void Delete()
        {
            if (_content != null)
            {
                ApplicationContext.Current.Services.ContentService.UnPublish(_content);
                ApplicationContext.Current.Services.ContentService.Delete(_content);
            }
        }

        /// <summary>
        /// Gets the Customer Data root data folder
        /// </summary>
        /// <returns></returns>
        private IPublishedContent GetEmailPostbackFolder()
        {

            var umbracoHelper = new UmbracoHelper(UmbracoContext.Current);
            var dataFolder = umbracoHelper.TypedContentAtRoot().Where(c => c.Name.Equals("CP Data Repository")).First();
            var emailPostbackFolder = dataFolder.Children.Where(c => c.Name.Equals("Email Postbacks")).First();

            return emailPostbackFolder;
        }
    }
}