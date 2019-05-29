using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CustomerPortalCMS.Models.Servicetype
{
    public class ServiceModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Alias { get; set; }
        public bool ShowInLocationSearchFilters { get; set; }
        public bool ShowOnLocationDetailsPages { get; set; }
        public bool ShowOnDistributionPage { get; set; }
        public bool ShowOnInstallServicesPage { get; set; }

        public bool Active { get; set; }

    }
}