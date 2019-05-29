using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Umbraco.Web.Mvc;
using Umbraco.Web;
using Umbraco.Core.Models;


namespace CustomerPortalCMS.Controllers
{
    public class HomeController : SurfaceController
    {
        private const string PARTIAL_VIEW_FOLDER = "~/Views/Partials/Home/";

        public ActionResult RenderHomeFeatured()
        {
            return PartialView(PARTIAL_VIEW_FOLDER + "_HomeFeatured.cshtml");
        }
        [HttpGet]
        public ActionResult RenderConstructionTypes()
        {
            return PartialView(PARTIAL_VIEW_FOLDER + "_ConstructionTypes.cshtml");
        }

        public ActionResult RenderEmployment()
        {
            return PartialView(PARTIAL_VIEW_FOLDER + "_Employment.cshtml");
        }

        public ActionResult RenderCarousel()
        {
            return PartialView(PARTIAL_VIEW_FOLDER + "_HomeCarousel.cshtml");
        }


    }
}