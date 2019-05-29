using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CustomerPortalCMS.Models.API
{
    public class LocationsModel
    {
        public string State { get; set; }
        public List<LocationListServiceModel> locationList { get; set; }
    }
}