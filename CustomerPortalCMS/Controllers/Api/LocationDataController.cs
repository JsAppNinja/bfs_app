using CustomerPortalCMS.App_Start;
using CustomerPortalCMS.Models.API;
using CustomerPortalCMS.Models.Servicetype;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Http;
using System.Web.Http.Cors;
using Umbraco.Core.Logging;
using Umbraco.Core.Models;
using Umbraco.Web;
using CustomerPortalCMS.GeneratedModels;
using Umbraco.Web.WebApi;

namespace CustomerPortalCMS.Controllers.Api
{
    public class LocationDataController : UmbracoApiController
    {
        List<LocationServiceModel> _locations;
        List<ServiceModel> _distributions;
        List<ServiceModel> _installedServices;
        IPublishedContent dataFolder;
        IPublishedContent locationList;
        IEnumerable<IPublishedContent> locations;

        public LocationDataController()
        {
            try
            {
                dataFolder = Umbraco.TypedContentAtRoot().First(c => c.DocumentTypeAlias == "dataRepositoryParentFolder");
                locationList = dataFolder.Children.First(c => c.DocumentTypeAlias == "locationsParentFolder");
                locations = locationList.Children.Where(l => l.GetPropertyValue<bool>("active") == true);  // don't bother searching locations that are not active

                _locations = locations.Select(l =>
                {
                    LocationListItem c = l as LocationListItem;
                    return new LocationServiceModel
                    {
                        Id = c.Id,
                        Name = c.LocationName,
                        Url = c.Url.TrimEnd('/'),
                        Latitude = c.Latitude,
                        Longitude = c.Longitude,
                        Address1 = c.Address1,
                        Address2 = c.Address2,
                        City = c.City,
                        State = c.State,
                        ZipCode = c.ZipCode,
                        PhoneNo = c.MainPhone,
                        HoursMF = c.HoursMF?.Replace("Monday", "Mon")?
                                    .Replace("Tuesday", "Tue")?
                                    .Replace("Wednesday", "Wed")?
                                    .Replace("Thursday", "Thu")?
                                    .Replace("Friday", "Fri")?
                                    .Replace("Saturday", "Sat")?
                                    .Replace("Sunday", "Sun")?
                                    .Replace("pm", "pm,")?
                                    .Replace("Sat Closed Sun Closed", "Sat-Sun Closed")?
                                    .Replace("Sat-Closed Sun-Closed", "Sat-Sun Closed")?
                                    .TrimEnd(','),
                        Email = c.Email,
                        Alias = c.Url.Split('/')[2],
                        LargeImage = c.LargeImage != null ? c.LargeImage.Url : null, 
                        StoreColor = c.StoreColor !=null ? c.StoreColor.ToString() : null,
//                        StoreIconType = c.StoreIconType
                    };
                }).ToList();

                var distributionList = dataFolder.Children.First(c => c.DocumentTypeAlias == "distributionParentFolder");
                var distributions = distributionList.Children;
                _distributions = distributions.Select(c =>
                {
                    return new ServiceModel
                    {
                        Id = c.Id,
                        Name = c.GetPropertyValue("typeName").ToString(),
                        Alias = c.GetPropertyValue("locationListItemPropertyAlias").ToString(),
                        Active = (bool)c.GetPropertyValue("active"),
                        ShowInLocationSearchFilters = (bool)c.GetPropertyValue("showInLocationSearchFilters"),
                        ShowOnLocationDetailsPages = (bool)c.GetPropertyValue("showOnLocationDetailsPages"),
                        ShowOnDistributionPage = (bool)c.GetPropertyValue("showOnDistributionPage")
                    };
                }).ToList();

                var installedServicesList = dataFolder.Children.First(c => c.DocumentTypeAlias == "installedServicesParentFolder");
                var installedServices = installedServicesList.Children;
                _installedServices = installedServices.Select(c =>
                {
                    return new ServiceModel
                    {
                        Id = c.Id,
                        Name = c.GetPropertyValue("typeName").ToString(),
                        Active = (bool)c.GetPropertyValue("active"),
                        //Alias = c.GetPropertyValue("locationListItemPropertyAlias").ToString()
                        ShowInLocationSearchFilters = (bool)c.GetPropertyValue("showInLocationSearchFilters"),
                        ShowOnLocationDetailsPages = (bool)c.GetPropertyValue("showOnLocationDetailsPages"),
                        ShowOnInstallServicesPage = (bool)c.GetPropertyValue("showOnInstallServicesPage")
                    };
                }).ToList();
            }
            catch (Exception ex) { }
        }

        [AllowCors]
        [HttpGet]
        public List<LocationServiceModel> GetAll()
        {
            return _locations;
        }

        [AllowCors]
        [HttpPost]
        public List<LocationServiceModel> GetAllfilteredLocations(FilterLocationServiceModel filter)
        {
            var list = new List<LocationServiceModel>();
            var urlProvider = UmbracoContext.Current.UrlProvider;
            var geoFilteredList = _locations;

            if (filter.Longitude != 0)
            {
                geoFilteredList = GetLocationsWithinRadius(filter).OrderBy(o => o.Distance).ToList();
            }

            List<LocationServiceModel> returnList = null;

            if (filter.InstalledServiceList != null && filter.InstalledServiceList.Any())
            {
                returnList = FilterLocationsByInstalledServices(filter.InstalledServiceList.Select(x => x.Name).ToList(), geoFilteredList);
            }

            if (filter.DistributionList != null && filter.DistributionList.Any())
            {
                var matchingDistributionLocations = FilterLocationsByDistribution(filter.DistributionList.Select(x => x.Alias).ToList(), geoFilteredList);
                if (returnList == null) //we did not filter by location ... so only the distribution filter applies
                    returnList = matchingDistributionLocations;
                else
                    returnList.AddRange(matchingDistributionLocations);
            }

            if (returnList == null) //we did not filter by service OR distribution, so only the geo filter (if any) applies
                returnList = geoFilteredList;

            return returnList;
        }

        [AllowCors]
        [HttpPost]
        public List<LocationServiceModel> GetAllLocations(FilterLocationServiceModel filter)
        {
            var list = new List<LocationServiceModel>();
            var urlProvider = UmbracoContext.Current.UrlProvider;
            var geoFilteredList = _locations;
            filter.InstalledServiceName = filter.InstalledServiceName?.Trim();

            if (!string.IsNullOrEmpty(filter.InstalledServiceName))
            {
                var installedServices = filter.InstalledServiceName.Split(',');
                filter.InstalledServiceList = installedServices?.Select(s => new DistribOrInstallItem { Name = s });
            }

            if (!string.IsNullOrEmpty(filter.State) || !string.IsNullOrEmpty(filter.City))
            {
                if (!string.IsNullOrEmpty(filter.State))
                    geoFilteredList = geoFilteredList.Where(c => c.State.ToLower() == filter.State.ToLower()).ToList();

                if (!string.IsNullOrEmpty(filter.City))
                    geoFilteredList = geoFilteredList.Where(c => c.City.ToLower() == filter.City.ToLower()).ToList();
            }
            else if (!string.IsNullOrEmpty(filter.Address))
            {
                geoFilteredList = FilterLocationsByAddress(filter.Address, geoFilteredList, filter).OrderBy(o => o.Distance).ToList();
            }
            else if (filter.Longitude != 0)
            {
                geoFilteredList = GetLocationsWithinRadius(filter).OrderBy(o => o.Distance).ToList();
            }

            //List<LocationServiceModel> returnList = null;

            if (filter.InstalledServiceList != null && filter.InstalledServiceList.Any())
            {
                /*returnList*/ geoFilteredList = FilterLocationsByInstalledServices(filter.InstalledServiceList.Select(x => x.Name).ToList(), geoFilteredList);
            }

            if (filter.DistributionList != null && filter.DistributionList.Any())
            {
               /* var matchingDistributionLocations*/ geoFilteredList = FilterLocationsByDistribution(filter.DistributionList.Select(x => x.Alias).ToList(), geoFilteredList);
                //if (returnList == null) //we did not filter by location ... so only the distribution filter applies
                //    returnList = matchingDistributionLocations;
                //else
                //    returnList.AddRange(matchingDistributionLocations);
            }

            //if (returnList == null) //we did not filter by service OR distribution, so only the geo filter (if any) applies
            //    returnList = geoFilteredList;

            return geoFilteredList;
        }

        [AllowCors]
        [HttpPost]
        public LocationServiceModel GetClosestStore(FilterLocationServiceModel filter)
        {
            LocationServiceModel location = null;

            if (filter.Longitude != 0)
            {
                location = GetLocationsWithinRadius(filter).OrderBy(o => o.Distance).FirstOrDefault();
            }

            return location;
        }

        [AllowCors]
        [HttpGet]
        public List<LocationServiceModel> GetFilteredLocations(string radius, double? lattitude, double? longitude, string distributionAlias, string installedServiceName)
        {
            distributionAlias = distributionAlias?.TrimEnd(',');
            installedServiceName = installedServiceName?.TrimEnd(',');

            var distributions = string.IsNullOrEmpty(distributionAlias) || distributionAlias == "\"\"" ? null : distributionAlias?.Split(',');
            var installed = string.IsNullOrEmpty(installedServiceName) || installedServiceName == "\"\"" ? null : installedServiceName?.Split(',');

            FilterLocationServiceModel filter = new FilterLocationServiceModel()
            {
                Radius = radius,
                Latitude = lattitude.GetValueOrDefault(0),
                Longitude = longitude.GetValueOrDefault(0)
            };
            var list = new List<LocationServiceModel>();
            var urlProvider = UmbracoContext.Current.UrlProvider;
            var geoFilteredList = _locations;

            if (filter.Longitude != 0)
            {
                geoFilteredList = GetFilteredLocationsWithinRadius(filter, geoFilteredList).OrderBy(o => o.Distance).ToList();
            }

            List<LocationServiceModel> returnList = null;

            if (installed != null && installed.Any())
            {
                returnList = FilterLocationsByInstalledServices(installed.ToList(), geoFilteredList);
            }

            if (distributions != null && distributions.Any())
            {
                var matchingDistributionLocations = FilterLocationsByDistribution(distributions.ToList(), geoFilteredList);
                if (returnList == null) //we did not filter by location ... so only the distribution filter applies
                    returnList = matchingDistributionLocations;
                else
                    returnList.AddRange(matchingDistributionLocations);
            }

            if (returnList == null) //we did not filter by service OR distribution, so only the geo filter (if any) applies
                returnList = geoFilteredList;

            return returnList;
        }

        private List<LocationServiceModel> GetLocationsWithinRadius(FilterLocationServiceModel filter)
        {
            var filteredLocations = new List<LocationServiceModel>();
            double lat1 = filter.Latitude;
            double lng1 = filter.Longitude;
            const int EarthRadius = 3960; //miles
            const double DegToRadCoEff = Math.PI / 180;
            int searchRadius = Convert.ToInt32(filter.Radius); //Not sure why its type was set to string
            if (filter == null) { return new List<LocationServiceModel>(); }
            var locations = GetAll();
            foreach (LocationServiceModel location in locations)
            {
                try
                {
                    if (!Double.TryParse(location.Latitude, out double lat2))
                    {
                        Logger.Warn<LocationDataController>($"Error parsing latitude in GetLocationsWithinRadius for {location.Name} ({location.Id})");
                        continue;
                    }
                    if (!Double.TryParse(location.Longitude, out double lng2))
                    {
                        Logger.Warn<LocationDataController>($"Error parsing longitude in GetLocationsWithinRadius for {location.Name} ({location.Id})");
                        continue;
                    }
                    var x1 = lat2 - lat1;
                    var dLat = x1 * DegToRadCoEff;
                    var x2 = lng2 - lng1;
                    var dLon = x2 * DegToRadCoEff;
                    var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                                    Math.Cos(lat1 * DegToRadCoEff) * Math.Cos(lat2 * DegToRadCoEff) *
                                    Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
                    var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
                    var distance = EarthRadius * c;
                    if (distance <= searchRadius)
                    {
                        location.Distance = distance;
                        filteredLocations.Add(location);
                    }
                }
                catch (System.Exception ex)
                {
                    Logger.Error<LocationDataController>($"Unexpected error in GetLocationsWithinRadius processing {location.Name} ({location.Id})", ex);
                }
            }
            return filteredLocations;
        }

        private List<LocationServiceModel> GetFilteredLocationsWithinRadius(FilterLocationServiceModel filter, List<LocationServiceModel> startingLocationsList)
        {
            var filteredLocations = new List<LocationServiceModel>();
            double lat1 = filter.Latitude;
            double lng1 = filter.Longitude;
            const int EarthRadius = 3960; //miles
            const double DegToRadCoEff = Math.PI / 180;
            int searchRadius = Convert.ToInt32(filter.Radius); //Not sure why its type was set to string
            if (filter == null) { return new List<LocationServiceModel>(); }
            var locations = startingLocationsList;
            foreach (LocationServiceModel location in locations)
            {
                try
                {
                    if (!Double.TryParse(location.Latitude, out double lat2))
                    {
                        Logger.Warn<LocationDataController>($"Error parsing latitude in GetLocationsWithinRadius for {location.Name} ({location.Id})");
                        continue;
                    }
                    if (!Double.TryParse(location.Longitude, out double lng2))
                    {
                        Logger.Warn<LocationDataController>($"Error parsing longitude in GetLocationsWithinRadius for {location.Name} ({location.Id})");
                        continue;
                    }
                    var x1 = lat2 - lat1;
                    var dLat = x1 * DegToRadCoEff;
                    var x2 = lng2 - lng1;
                    var dLon = x2 * DegToRadCoEff;
                    var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                                    Math.Cos(lat1 * DegToRadCoEff) * Math.Cos(lat2 * DegToRadCoEff) *
                                    Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
                    var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
                    var distance = EarthRadius * c;
                    if (distance <= searchRadius)
                    {
                        location.Distance = distance;
                        filteredLocations.Add(location);
                    }
                }
                catch (System.Exception ex)
                {
                    Logger.Error<LocationDataController>($"Unexpected error in GetLocationsWithinRadius processing {location.Name} ({location.Id})", ex);
                }
            }
            return filteredLocations;
        }

        private List<LocationServiceModel> FilterLocationsByDistribution(List<string> distributionlist, List<LocationServiceModel> startingLocationsList)
        {
            List<LocationServiceModel> filteredLocationsList = new List<LocationServiceModel>();
            foreach (var location in startingLocationsList)
            {
                var locationItem = Umbraco.TypedContent(location.Id);
                foreach (var data in distributionlist)
                {
                    try
                    {
                        if (locationItem.GetProperty(data).HasValue)
                        {
                            filteredLocationsList.Add(location);
                            break;
                        }
                    }
                    catch { }
                }
            }
            return filteredLocationsList;
        }

        private List<LocationServiceModel> FilterLocationsByInstalledServices(List<string> installedList, List<LocationServiceModel> startingLocationsList)
        {
            List<LocationServiceModel> filteredLocationsList = new List<LocationServiceModel>();
            foreach (var location in startingLocationsList)
            {
                var locationItem = Umbraco.TypedContent(location.Id);
                var services = locationItem.GetPropertyValue("InstalledServicesPicker") as List<IPublishedContent>;
                if (services != null && services.Any(s => installedList.Contains(s.Name.Replace("\"", ""))))
                    filteredLocationsList.Add(location);
            }
            return filteredLocationsList;
        }

        //Filter locations By Address and also fetch stores nearby within the radius
        private List<LocationServiceModel> FilterLocationsByAddress(string address, List<LocationServiceModel> startingLocationsList, FilterLocationServiceModel filter)
        {
            var allLocations = startingLocationsList.Where(c => c.Name.ToLower().Contains(address.Trim().ToLower())
               || c.Address1.ToLower().Contains(address.Trim().ToLower()) || c.City.ToLower().Contains(address.Trim().ToLower())
               || c.State.ToLower().Contains(address.Trim().ToLower()) || c.ZipCode.ToLower().Contains(address.Trim().ToLower())
               || c.State.ToLower().Contains(address.Trim().ToLower()) || Regex.Replace(string.Concat(c.Address1, " ", c.Address2, " ", c.State, " ", c.ZipCode).ToLower().Trim(), " {2,}", " ").Contains(Regex.Replace(address.Trim().ToLower(), " {2,}", " "))).AsQueryable();

            var locationData = allLocations?.FirstOrDefault();

            var filteredLocations = new List<LocationServiceModel>();

            if (locationData != null)
            {
                double lat1;
                double.TryParse(locationData.Latitude, out lat1);

                double lng1;
                double.TryParse(locationData.Longitude, out lng1);

                const int EarthRadius = 3960; //miles
                const double DegToRadCoEff = Math.PI / 180;
                int searchRadius = Convert.ToInt32(filter.Radius); //Not sure why its type was set to string
                if (filter == null) { return new List<LocationServiceModel>(); }
                var locations = GetAll();
                foreach (LocationServiceModel location in locations)
                {
                    try
                    {
                        if (allLocations.Any(d => d.Id == location.Id))
                        {
                            if (!Double.TryParse(location.Latitude, out double lat2))
                            {
                                Logger.Warn<LocationDataController>($"Error parsing latitude in GetLocationsWithinRadius for {location.Name} ({location.Id})");
                                continue;
                            }
                            if (!Double.TryParse(location.Longitude, out double lng2))
                            {
                                Logger.Warn<LocationDataController>($"Error parsing longitude in GetLocationsWithinRadius for {location.Name} ({location.Id})");
                                continue;
                            }
                            var x1 = lat2 - lat1;
                            var dLat = x1 * DegToRadCoEff;
                            var x2 = lng2 - lng1;
                            var dLon = x2 * DegToRadCoEff;
                            var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                                            Math.Cos(lat1 * DegToRadCoEff) * Math.Cos(lat2 * DegToRadCoEff) *
                                            Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
                            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
                            var distance = EarthRadius * c;

                            if (distance <= searchRadius)
                            {
                                location.Distance = distance;
                                filteredLocations.Add(location);
                            }
                        }
                    }
                    catch (System.Exception ex)
                    {
                        Logger.Error<LocationDataController>($"Unexpected error in GetLocationsWithinRadius processing {location.Name} ({location.Id})", ex);
                    }
                }
            }

            return filteredLocations;
        }

        [AllowCors]
        [HttpGet]
        public List<ServiceModel> GetDistributionList(string forPage)
        {
            if (forPage != null)
            {
                if (forPage == "MainLocationsPage")
                {
                    return _distributions.Where(x => x.Active).OrderBy(x => x.Name).ToList();
                }
            }
            return _distributions.OrderBy(x => x.Name).ToList();
        }

        [AllowCors]
        public List<ServiceModel> GetInstalledServiceList(string forPage)
        {
            if (forPage != null)
            {
                if (forPage == "MainLocationsPage")
                {
                    return _installedServices.Where(x => x.Active).OrderBy(x => x.Name).ToList();
                }
            }
            return _installedServices.OrderBy(x => x.Name).ToList();
        }
    }
}
