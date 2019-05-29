using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CustomerPortalCMS.Models.API
{
    public class LocationServiceModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string PhoneNo { get; set; }
        public string HoursMF { get; set; }
        public string LargeImage { get; set; }
        public string Email { get; set; }
        public string Alias { get; set; }
        public string StoreColor { get; set; }
        public string StoreIconType { get; set; }

        public double? Distance { get; set; }
    }
}