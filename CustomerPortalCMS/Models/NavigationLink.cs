using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CustomerPortalCMS.Models
{
    public class NavigationLink
    {
        public string Text { get; set; }
        public string Url { get; set; }
        public bool NewWindow { get; set; }
        public string Target { get { return NewWindow ? "_blank" : null; } }
        public string Title { get; set; }
        public string externalURL { get; set; }

        public NavigationLink()
        { }

        //public NavigationLink(string url, string text = null, string exturl = null)
        //{
        //    Text = text;
        //    Url = url;
        //    externalURL = exturl;
        //}

        public NavigationLink(string url, string text = null, string exturl = null, bool newWindow = false, string title = null)
        {
            Text = text;
            Url = url;
            NewWindow = newWindow;
            Title = title;
            externalURL = exturl;
        }
    }
}