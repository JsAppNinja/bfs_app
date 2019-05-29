using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using CustomerPortalCMS.Models;
using Umbraco.Web;
using Umbraco.Web.WebApi;

namespace CustomerPortalCMS.Controllers.Api
{
    public class MenusController : UmbracoApiController
    {
        [HttpGet]
        public List<NavigationMenu> GetMenus()
        {
            var root = Umbraco.TypedContentAtRoot().FirstOrDefault(x => x.ContentType.Alias.Equals("home"));

            var menuItems = new List<NavigationMenu>();
            menuItems.Add(new NavigationMenu()
            {
                RootId = root.Id,
                RootName = root.Name,
                RootUrl = root.Url
            });

            var selection = root.Children.Where(x => x.IsVisible()).ToArray();
            if (selection.Length > 0)
            {
                foreach (var item in selection)
                {
                    var dropClass = item.Children.Where(x => x.IsVisible()).Count() > 0 ? "dropdown" : "";
                    var linkClass = item.Children.Where(x => x.IsVisible()).Count() > 0 ? "fh5co-sub-ddown dropdown-toggle" : "";
                    var linkURL = item.DocumentTypeAlias == "externalLink" ? item.GetPropertyValue("externalUrl") : item.Url;

                    var menu = new NavigationMenu()
                    {
                        RootId = item.Id,
                        RootName = item.Name,
                        RootUrl = linkURL?.ToString(),
                    };

                    if (item.Children.Where(x => x.IsVisible()).Count() > 0)
                    {
                        var childitems = item.Children.Where(x => x.IsVisible());
                        menu.Childrens = childitems.Count() > 0 ? new List<NavigationMenu>() : null;

                        foreach (var child in childitems)
                        {
                            var childURL = child.DocumentTypeAlias == "externalLink" ? child.GetPropertyValue("externalUrl") : child.Url;
                            
                            menu.Childrens.Add(new NavigationMenu()
                            {
                                RootId = child.Id,
                                RootName = child.Name,
                                RootUrl = childURL?.ToString()
                            });
                        }
                    }

                    menuItems.Add(menu);
                }
            }

            return menuItems;
        }
    }

    public class NavigationMenu
    {
        public int RootId { get; set; }

        public string RootName { get; set; }

        public string RootUrl { get; set; }

        public List<NavigationMenu> Childrens { get; set; }
    }
}