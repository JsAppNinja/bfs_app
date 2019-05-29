using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CustomerPortalCMS.Models
{
    public class NavigationListItem
    {
        public string Text { get; set; }
        public NavigationLink Link { get; set; }
        //public string ExternalURL { get; set; }
        public List<NavigationListItem> Items { get; set; }
        public bool HasChildren { get { return Items != null && Items.Any() && Items.Count > 0; } }

        public NavigationListItem()
        { }

        public NavigationListItem(NavigationLink link)
        {
            Link = link;
        }

        public NavigationListItem(string text)
        {
            Text = text;
        }

        //public NavigationListItem(string exturl)
        //{
        //    externalURL = exturl;
        //}
    }
}