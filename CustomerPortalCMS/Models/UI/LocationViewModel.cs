using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CustomerPortalCMS.Models.UI
{
    public class LocationViewModel
    {
        public long Id { get; set; } // Id (Primary key)
        public long DistrictId { get; set; } // DistrictId
        public string Name { get; set; } // Name (length: 100)
        public string Address1 { get; set; } // Address1 (length: 50)
        public string Address2 { get; set; } // Address2 (length: 50)
        public string City { get; set; } // City (length: 50)
        public string State { get; set; } // State (length: 50)
        public string ZipCode { get; set; } // ZipCode (length: 10)
        public string Phone { get; set; } // Phone (length: 10)
        public string Fax { get; set; } // Fax (length: 10)
        public string Email { get; set; }
        public DateTime CreatedDate { get; set; }
        //public DateTime LastUpdatedBy { get; set; }
        // Email (length: 100)
        public string GeneralMgr { get; set; } // GeneralMgr (length: 100)
        public string SalesMgr { get; set; } // SalesMgr (length: 100)
        public string Hours { get; set; } // Hours (length: 255)
        public string Status { get; set; }
        //public System.Data.Entity.Spatial.DbGeometry Geo { get; set; } // Geo
        public string Wkt { get; set; } // WKT (length: 300)
        public string ImageName { get; set; } // ImageName (length: 300)
                                              //public string UrlName { get; set; } // URLName (length: 100)

    }

}