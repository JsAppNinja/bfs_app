using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Umbraco.Core.Models;
using Umbraco.Web.WebApi;

namespace CustomerPortalCMS.Controllers.Api
{
    public class ToolsApiController : UmbracoAuthorizedApiController
    {

        [HttpGet]
        public int UnpublishedNodes()
        {
            var cs = Services.ContentService;
            const int bldrLocationsId = 1264;
            var items = cs.GetById(bldrLocationsId).Children();

            return items.Count(x => !x.Published);
        }

        [HttpGet]
        public string Migrate()
        {
            var cs = Services.ContentService;
            var cts = Services.ContentTypeService;

            const int bldrLocationsId = 1264;
            const string locationListItemAlias = "locationListItem";
            var bldrLocations = cs.GetById(bldrLocationsId);

            var distributions = string.Join(",", Umbraco.TypedContent(1919).Children.Select(x => x.Id));

            var locationListItems = bldrLocations.Children().Where(x => x.ContentType.Alias == locationListItemAlias);

            var locationListItemsDocType = cts.GetContentType(locationListItemAlias);

            var propertyGroup = locationListItemsDocType.PropertyGroups.FirstOrDefault(x => x.Name == "Distribution Old");

            List<int> primaryList = new List<int>();
            
            foreach (var locationListItem in locationListItems)
            {
                List<int> values = new List<int>();

                foreach (var property in propertyGroup.PropertyTypes)
                {
                    if (locationListItem.GetValue(property.Alias) != null)
                    {
                        var selectedItems = locationListItem.GetValue<string>(property.Alias).Split(new [] { "," }, StringSplitOptions.RemoveEmptyEntries);

                        foreach(var selectedItem in selectedItems)
                        {
                            var content = cs.GetById(new Guid(selectedItem.Replace("umb://document/", "")));
                            values.Add(content.Id);
                        }
                    }
                }

                
                locationListItem.SetValue("suppliers", $"{{\"suppliers\":[{string.Join(",", values)}],\"distributions\":[{distributions}]}}");
                if (locationListItem.Published)
                {
                    cs.SaveAndPublishWithStatus(locationListItem);
                }
                else
                {
                    cs.Save(locationListItem);
                }
            }

            return "done";
        }
    }
}