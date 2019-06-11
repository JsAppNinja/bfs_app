using System;
using System.Collections.Generic;

namespace CustomerPortalCMS.Models
{
    public class NavigationMenu
    {
        public int RootId { get; set; }

        public string RootName { get; set; }

        public string RootUrl { get; set; }

        public bool IsExternal { get; set; }

        public bool HideFromNavigation { get; set; }

        public List<NavigationMenu> Childrens { get; set; }
    }

    public class CarouselControl
    {
        public Guid key { get; set; }

        public string name { get; set; }

        public string ncContentTypeAlias { get; set; }

        public string imageTitle { get; set; }

        public string imageUrl { get; set; }
    }

    public class CommunityModel
    {
        public Guid key { get; set; }

        public string name { get; set; }

        public string ncContentTypeAlias { get; set; }

        public string communityName { get; set; }

        public string communityAbout { get; set; }

        public string communityImage { get; set; }

        public string communityLink { get; set; }
    }

    public class DocumentModel
    {
        public Guid key { get; set; }

        public string name { get; set; }

        public string ncContentTypeAlias { get; set; }

        public string file { get; set; }

        public string documentName { get; set; }

        public string releaseDate { get; set; }

        public string hidden { get; set; }
    }

    public class VideoListItemModel
    {
        public Guid key { get; set; }

        public string name { get; set; }

        public string ncContentTypeAlias { get; set; }

        public string videoLinkLabel { get; set; }

        public string videoLinkThumbnail { get; set; }

        public string videoLinkURL { get; set; }

        public string hidden { get; set; }
    }

    public class ManufacturingTypeModel
    {
        public int Id { get; set; }

        public string TypeName { get; set; }

        public string TypeImage { get; set; }

        public bool Active { get; set; }
    }

    public class InstalledServicesType
    {
        public int Id { get; set; }

        public bool Active { get; set; }

        public string TypeName { get; set; }

        public string TypeImage { get; set; }

        public bool? ShowInLocationSearchFilters { get; set; }

        public bool? ShowOnLocationDetailsPages { get; set; }

        public bool? ShowOnInstallServicesPage { get; set; }
    }

    public class DistributionType
    {
        public int Id { get; set; }

        public bool Active { get; set; }

        public string TypeName { get; set; }

        public string TypeImage { get; set; }

        public string LocationListItemPropertyAlias { get; set; }

        public bool? ShowOnDistributionPage { get; set; }

        public bool? ShowOnLocationDetailsPages { get; set; }

        public bool? ShowInLocationSearchFilters { get; set; }
    }

    public class SiteMapContent
    {
        public string Name { get; set; }

        public string Url { get; set; }

        public List<SiteMapContent> Childrens { get; set; }
    }

    public class SupplierModel
    {
        public int Id { get; set; }

        public string SupplierName { get; set; }

        public string SupplierLogo { get; set; }

        public string ImportId { get; set; }

        public string DistributionListName { get; set; }
    }

    public class LocationDistributionModel
    {
        public int Id { get; set; }

        public string SupplierName { get; set; }

        public string SupplierLogo { get; set; }

        public string ImportId { get; set; }

        public string DistributionListName { get; set; }
    }

    public enum StoreIconType
    {
        Circle = 842,
        Triangle = 843,
        Star = 844
    }

    public class ServicesModel
    {
        public int Id { get; set; }

        public string Name { get; set; }
    }
}