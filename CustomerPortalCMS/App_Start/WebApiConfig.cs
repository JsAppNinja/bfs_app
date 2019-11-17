using System;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Filters;
using Umbraco.Core;

namespace CustomerPortalCMS.App_Start
{
    public class CustomApplicationEventHandler : ApplicationEventHandler
    {
        protected override void ApplicationStarting(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext)
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }

    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling
     = Newtonsoft.Json.ReferenceLoopHandling.Serialize;
            config.Formatters.JsonFormatter.SerializerSettings.PreserveReferencesHandling
                 = Newtonsoft.Json.PreserveReferencesHandling.Objects;
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
        }

        private static void EnableCrossSiteRequests(HttpConfiguration config)
        {
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);
        }

        private static void AddRoutes(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: "Default",
                routeTemplate: "rest/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }

    public class AllowCors : ActionFilterAttribute
    {
        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            if (actionExecutedContext == null)
            {
                throw new ArgumentNullException("actionExecutedContext");
            }
            else
            {
                actionExecutedContext?.Response?.Headers?.Remove("Access-Control-Allow-Origin");
                actionExecutedContext?.Response?.Headers?.Remove("Access-Control-Allow-Methods");
                actionExecutedContext?.Response?.Headers?.Remove("Access-Control-Allow-Headers");
                actionExecutedContext?.Response?.Headers?.Add("Access-Control-Allow-Origin", "*");
                actionExecutedContext?.Response?.Headers?.Add("Access-Control-Allow-Methods", "*");
                actionExecutedContext?.Response?.Headers?.Add("Access-Control-Allow-Headers", "*");
            }
            base.OnActionExecuted(actionExecutedContext);
        }
    }
}