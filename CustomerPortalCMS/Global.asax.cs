using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web;
using Umbraco.Core;
using Umbraco.Web;
using Umbraco.Core.Logging;

namespace CustomerPortalCMS
{
    public class Global : UmbracoApplication
    {
        protected void Application_BeginRequest(Object sender, EventArgs e)
        {
            // Preflight request comes with HttpMethod OPTIONS
            // The following line solves the error message
            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");

                HttpContext.Current.Response.AddHeader("Cache-Control", "no-cache");
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST");
                // If any http headers are shown in preflight error in browser console add them below
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Pragma, Cache-Control, Authorization ");
                HttpContext.Current.Response.AddHeader("Access-Control-Max-Age", "1728000");
                HttpContext.Current.Response.End();
            }
        }

    }
}