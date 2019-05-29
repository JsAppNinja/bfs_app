using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CustomerPortalCMS.Models.API
{
    public class FilterLocationServiceModel
    {
        public FilterLocationServiceModel()
        {
            DistributionList = new List<DistribOrInstallItem>();
            InstalledServiceList = new List<DistribOrInstallItem>();
        }
        public string ZipCode { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Radius { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public IEnumerable<DistribOrInstallItem> DistributionList { get; set; }
        public IEnumerable<DistribOrInstallItem> InstalledServiceList { get; set; }

        public string Address { get; set; }

        public string InstalledServiceName { get; set; }

    }

    public class DistribOrInstallItem
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Alias { get; set; }

    }

}