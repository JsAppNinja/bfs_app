using AutoMapper;
using CustomerPortalCMS.Models;
using InstallUmbraco.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Mvc;
using Umbraco.Core;
using Umbraco.Core.Models;
using Umbraco.RestApi.Models;
using Umbraco.Web;
using Umbraco.Web.Models;
using Umbraco.Web.WebApi;
using CustomerPortalCMS.Controllers.Api;
using CustomerPortalCMS.App_Start;
using Umbraco.Core.Logging;

namespace CustomerPortalCMS.Controllers
{
    public class ContentController : UmbracoApiController
    {
        /// <summary>
        /// for getting menus and footer data. 12766 is the Footer content Node ID.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowCors]
        public HttpResponseMessage GetMenus()
        {
            var root = Umbraco.TypedContentAtRoot().FirstOrDefault(x => x.ContentType.Alias.Equals("bldrhome"));

            var menuItems = new List<Models.NavigationMenu>();

            var selection = root.Children.Where(x => x.IsVisible()).ToArray();
            if (selection.Length > 0)
            {
                foreach (var item in selection)
                {
                    var dropClass = item.Children.Where(x => x.IsVisible()).Count() > 0 ? "dropdown" : "";
                    var linkClass = item.Children.Where(x => x.IsVisible()).Count() > 0 ? "fh5co-sub-ddown dropdown-toggle" : "";
                    var linkURL = item.DocumentTypeAlias == "externalLink" ? item.GetPropertyValue("externalUrl") : item.Url;
                    var isExternal = item.DocumentTypeAlias == "externalLink" ? true : false;

                    bool isHidden = false;
                    var navigation = item.Properties.FirstOrDefault(c => c.PropertyTypeAlias == "hideFromNavigation");
                    if (navigation != null)
                    {
                        bool.TryParse(navigation.Value.ToString(), out isHidden);
                    }

                    if (!isHidden)
                    {
                        var menu = new Models.NavigationMenu()
                        {
                            RootId = item.Id,
                            RootName = item.Name,
                            RootUrl = linkURL?.ToString(),
                            IsExternal = isExternal,
                            HideFromNavigation = isHidden
                        };

                        GetChildrens(item, menu);

                        menuItems.Add(menu);
                    }
                }
            }

            var content = Services.ContentService.GetById(12766);
            var result = Mapper.Map<ContentRepresentation>(content);

            if (result?.Properties != null)
            {
                var baseUrl = ConfigurationManager.AppSettings["SiteBaseUrl"]?.TrimEnd('/');

                foreach (var prop in result?.Properties.ToList())
                {
                    try
                    {
                        if (prop.Key.ToString() == "footerLogo")
                        {
                            var cropped = JsonConvert.DeserializeObject<ImageCropDataSet>(prop.Value.ToString());
                            if (cropped != null)
                            {
                                var cropUrl = cropped.GetCropUrl("cropped");
                                result.Properties[prop.Key] = string.Concat(cropped.Src, cropUrl);
                            }
                        }
                        if (prop.Key.ToString() == "mainLogo")
                        {
                            var cropped = JsonConvert.DeserializeObject<ImageCropDataSet>(prop.Value.ToString());
                            if (cropped != null)
                            {
                                var cropUrl = cropped.GetCropUrl("cropped");
                                result.Properties[prop.Key] = string.Concat(cropped.Src, cropUrl);
                            }
                        }
                        else if (prop.Key.ToString() == "footerContent")
                        {
                            result.Properties[prop.Key] = ReplaceMediaLinks(result.Properties[prop.Key]?.ToString(), baseUrl);
                        }
                    }
                    catch (Exception ex) { }
                }
            }

            var model = new
            {
                Menu = menuItems,
                Footer = result
            };

            return model == null ? Request.CreateResponse(HttpStatusCode.NotFound) : Request.CreateResponse(HttpStatusCode.OK, model);
        }

        /// <summary>
        /// pass content Id of any Content Node, and this method will return all the data except children.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [AllowCors]
        public HttpResponseMessage Get(int id)
        {
            var content = Services.ContentService.GetById(id);
            var result = Mapper.Map<ContentRepresentation>(content);

            if (result?.Properties != null)
            {
                ReplaceUDIandLinks(result);
            }

            return result == null ? Request.CreateResponse(HttpStatusCode.NotFound) : Request.CreateResponse(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// pass content Id of any Content Node, and this method will return all the children of the content Node Id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [AllowCors]
        [HttpGet]
        public HttpResponseMessage GetChildren(int id)
        {
            // this seems stupid since we usually end up in here by request via id from the other overload...
            var key = Services.EntityService.GetKeyForId(id, UmbracoObjectTypes.Document);
            if (key.Result == Guid.Empty)
                return Request.CreateResponse(HttpStatusCode.NotFound);


            var items = Services.ContentService.GetChildren(id);
            var mapped = Mapper.Map<IEnumerable<ContentRepresentation>>(items);

            if (mapped != null)
            {
                //looping and replacing umbraco UDI with website media urls
                foreach (var content in mapped.ToList())
                {
                    ReplaceUDIandLinks(content);
                }
            }

            return Request.CreateResponse(HttpStatusCode.OK, mapped);
        }

        /// <summary>
        /// custom method for the SiteMap page for Fetching through API.
        /// </summary>
        /// <returns></returns>
        [AllowCors]
        [HttpGet]
        public HttpResponseMessage GetSiteMapContent()
        {
            var root = Umbraco.TypedContentAtRoot().FirstOrDefault(x => x.ContentType.Alias.Equals("bldrhome")).Children.FirstOrDefault(c => c.DocumentTypeAlias == "bldrProductAndServices");
            var siteMapList = new List<SiteMapContent>();
            foreach (var child in root.Children.Where(x => x.DocumentTypeAlias == "basicVideosPage1"))
            {
                var childrepo = Umbraco.TypedContent(child.GetPropertyValue<int>("dataLocation"));
                string url = child.Url.TrimEnd('/').Split('/').Last();

                var siteMapModel = new SiteMapContent()
                {
                    Name = child.Name,
                    Url = url,
                    Childrens = new List<SiteMapContent>()
                };

                foreach (var item in childrepo.Children)
                {
                    siteMapModel.Childrens.Add(new SiteMapContent()
                    {
                        Name = item.Name,
                        Url = url
                    });
                }

                siteMapList.Add(siteMapModel);
            }

            return siteMapList == null ? Request.CreateResponse(HttpStatusCode.NotFound) : Request.CreateResponse(HttpStatusCode.OK, siteMapList);
        }

        /// <summary>
        /// Send Request To Quote Message from this api.
        /// </summary>
        /// <param name="quote"></param>
        /// <returns></returns>
        [HttpPost]
        [AllowCors]
        public HttpResponseMessage SendQuoteByLocation(QuoteModel quote)
        {
            try
            {
                bool IsCaptchaValid = (ReCaptchaClass.Validate(quote.RecaptchaResponse) == "true" ? true : false);

                if (IsCaptchaValid)
                {
                    var result = SendEmail(quote);
                    if (result == "-1")
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound, false);
                    }

                    return Request.CreateResponse(HttpStatusCode.OK, true);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid ReCapcha!");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, false);
            }
        }

        /// <summary>
        /// get Location Detail with the alias of the Location.
        /// </summary>
        /// <param name="locationAlias"></param>
        /// <returns></returns>
        [HttpGet]
        [AllowCors]
        public HttpResponseMessage GetLocationDetail(string locationAlias)
        {
            var locData = new LocationDataController().GetAll().FirstOrDefault(c => c.Alias.ToLower() == locationAlias.ToLower().Trim());

            if (locData != null)
            {
                var content = Services.ContentService.GetById(locData.Id);
                var result = Mapper.Map<ContentRepresentation>(content);

                if (result?.Properties != null)
                {
                    ReplaceUDIandLinks(result);
                }

                return result == null ? Request.CreateResponse(HttpStatusCode.NotFound) : Request.CreateResponse(HttpStatusCode.OK, result);
            }

            return Request.CreateResponse(HttpStatusCode.NotFound);
        }

        /// <summary>
        /// method for COntact us form with Recapcha validation.s
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [AllowCors]
        public HttpResponseMessage ContactUs(ContactUsModel model)
        {
            try
            {
                bool IsCaptchaValid = (ReCaptchaClass.Validate(model.RecaptchaResponse) == "true" ? true : false);

                if (IsCaptchaValid)
                {
                    if (ModelState.IsValid)
                    {
                        var CTN = SendEmail(model);

                        return Request.CreateResponse(HttpStatusCode.OK, CTN);
                    }

                    return Request.CreateResponse(HttpStatusCode.OK, "Please fill all the required fields!");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid ReCapcha!");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, false);
            }
        }

        /// <summary>
        /// Get Services for the Request To Quote DropDown.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowCors]
        public HttpResponseMessage GetServices()
        {
            var root = Umbraco.TypedContentAtRoot().FirstOrDefault(x => x.ContentType.Alias.Equals("bldrhome")).Children.FirstOrDefault(c => c.DocumentTypeAlias == "bldrProductAndServices");
            var services = new List<ServicesModel>();
            foreach (var child in root.Children.Where(x => x.DocumentTypeAlias == "basicVideosPage1"))
            {
                services.Add(new ServicesModel()
                {
                    Name = child.Name,
                    Id = child.Id
                });
            }

            return services == null ? Request.CreateResponse(HttpStatusCode.NotFound) : Request.CreateResponse(HttpStatusCode.OK, services);
        }


        /// <summary>
        /// Below are all the private methods for the above apis.
        /// </summary>
        /// <param name="item"></param>
        /// <param name="menu"></param>
        #region private methods

        // Get Menu Childrens from this api.
        private void GetChildrens(IPublishedContent item, Models.NavigationMenu menu)
        {
            if (item.Children.Where(x => x.IsVisible() && x.DocumentTypeAlias != "leadershipUsersList").Count() > 0)
            {
                var childitems = item.Children.Where(x => x.IsVisible());
                menu.Childrens = childitems.Count() > 0 ? new List<Models.NavigationMenu>() : null;

                foreach (var child in childitems)
                {
                    var childURL = child.DocumentTypeAlias == "externalLink" ? child.GetPropertyValue("externalUrl") : child.Url;
                    var isExternal = child.DocumentTypeAlias == "externalLink" ? true : false;

                    bool isHidden = false;
                    var navigation = child.Properties.FirstOrDefault(c => c.PropertyTypeAlias == "hideFromNavigation");
                    if (navigation != null)
                    {
                        bool.TryParse(navigation.Value.ToString(), out isHidden);
                    }

                    if (!isHidden)
                    {
                        var childMenu = new Models.NavigationMenu()
                        {
                            RootId = child.Id,
                            RootName = child.Name,
                            RootUrl = childURL?.ToString(),
                            IsExternal = isExternal,
                            HideFromNavigation = isHidden
                        };

                        GetChildrens(child, childMenu);

                        menu.Childrens.Add(childMenu);
                    }
                }

                if (menu.Childrens != null && menu.Childrens.Count() == 0)
                {
                    menu.Childrens = null;
                }
            }
        }

        private string SendEmail(QuoteModel model)
        {
            var locData = new LocationDataController().GetAll().FirstOrDefault(c => c.Id == model.LocationId);

            if (locData != null && !string.IsNullOrEmpty(locData.Email))
            {
                var storeEmail = locData.Email;

                string EmailFrom = ConfigurationManager.AppSettings["emailFrom"];
                string EmailFromAlias = ConfigurationManager.AppSettings["emailFromAlias"];

                // create a tracking number from utc time-stamp... this basically goes down to tenth of a second... is 8 digits as i write this, will eventually get to 10 unless someone complains
                string CTN = ((DateTime.Now.ToFileTimeUtc() - 131615555555555555L) / 100000).ToString();

                // Send Email to BFS
                MailMessage messageToBFS = new MailMessage
                {
                    From = new MailAddress(EmailFrom, EmailFromAlias)
                };

                messageToBFS.To.Add(storeEmail);

                messageToBFS.Subject = string.Format("Bldr.com - Quote Form (Re: {0})", model.Email);//, model.Name, model.Company, model.EmailAddress);
                messageToBFS.Body =
                                "Hello, " + "\n\n" +
                                "This is a message from the Bldr.com website, please follow up as soon as possible." + "\n\n" +
                                "Message Content:" + "\n" +
                                "-----------------------------------------" + "\n" +
                                "Name: " + model.FullName + "\n" +
                                "Zipcode: " + model.ZipCode + "\n" +
                                "Phone: " + model.Phone + "\n" +
                                "Email: " + model.Email + "\n" +
                                "Service: " + model.ServiceName + "\n" +
                                "Message: " + model.Message + "\n" +
                                "Location Id: " + model.LocationId + "\n" +
                                "Contact Time: " + DateTime.UtcNow + "\n" +
                                "-----------------------------------------" + "\n\n" +
                                "Quote Reference Number" + "\n" +
                                "-----------------------------------------" + "\n" +
                                CTN + "\n" +
                                "-----------------------------------------";

                // ### Production SMTP Client
                System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient()
                {
                    // see mailSettings information in the Web.config (at root level) file.
                    EnableSsl = true
                };

                try
                {
                    smtp.Send(messageToBFS);
                }
                catch(Exception ex)
                {
                    Logger.Error<ContentController>($"Unable to send Email. Message Detail : {messageToBFS.Body}", ex);
                    return "-1";
                }

                return CTN;
            }
            else
            {
                return "-1";
            }
        }

        private string SendEmail(ContactUsModel model)
        {
            string EmailFrom = ConfigurationManager.AppSettings["emailFrom"];
            string EmailFromAlias = ConfigurationManager.AppSettings["emailFromAlias"];

            var contactUsPage = Services.ContentService.GetById(12764);
            var result = Mapper.Map<ContentRepresentation>(contactUsPage);

            string EmailTo = string.Empty;
            string EmailAlias = string.Empty;

            if (result?.Properties != null)
            {
                if (model.ToAddress == "sales")
                {
                    EmailTo = result.Properties.FirstOrDefault(c => c.Key.ToString() == "salesContact").Value?.ToString();
                    EmailAlias = result.Properties.FirstOrDefault(c => c.Key.ToString() == "salesAlias").Value?.ToString();
                }
                else if (model.ToAddress == "warranty")
                {
                    EmailTo = result.Properties.FirstOrDefault(c => c.Key.ToString() == "warrantyContact").Value?.ToString();
                    EmailAlias = result.Properties.FirstOrDefault(c => c.Key.ToString() == "warrantyAlias").Value?.ToString();
                }
                else if (model.ToAddress == "safety")
                {
                    EmailTo = result.Properties.FirstOrDefault(c => c.Key.ToString() == "safetyContact").Value?.ToString();
                    EmailAlias = result.Properties.FirstOrDefault(c => c.Key.ToString() == "safetyAlias").Value?.ToString();
                }
                else if (model.ToAddress == "careers")
                {
                    EmailTo = result.Properties.FirstOrDefault(c => c.Key.ToString() == "careersContact").Value?.ToString();
                    EmailAlias = result.Properties.FirstOrDefault(c => c.Key.ToString() == "careersAlias").Value?.ToString();
                }
                else if (model.ToAddress == "other")
                {
                    EmailTo = result.Properties.FirstOrDefault(c => c.Key.ToString() == "otherContact").Value?.ToString();
                    EmailAlias = result.Properties.FirstOrDefault(c => c.Key.ToString() == "otherAlias").Value?.ToString();
                }
                else
                {
                    EmailTo = result.Properties.FirstOrDefault(c => c.Key.ToString() == "otherContact").Value?.ToString();
                    EmailAlias = result.Properties.FirstOrDefault(c => c.Key.ToString() == "otherAlias").Value?.ToString();
                }
            }

            // create a tracking number from utc time-stamp... this basically goes down to tenth of a second... is 8 digits as i write this, will eventually get to 10 unless someone complains
            string CTN = ((DateTime.Now.ToFileTimeUtc() - 131615555555555555L) / 100000).ToString();

            // Send Email to BFS
            MailMessage messageToBFS = new MailMessage
            {
                From = new MailAddress(EmailFrom, EmailFromAlias)
            };
            foreach (var address in EmailTo.Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries))
            {
                messageToBFS.To.Add(address);
            }

            var locationZipCode = string.IsNullOrEmpty(model.LocationZipCode) ? string.Empty : "Re: Location Zip: " + model.LocationZipCode + "\n";

            messageToBFS.Subject = string.Format("Bldr.com - Contact Us Form (Re: {0})", EmailAlias);//, model.Name, model.Company, model.EmailAddress);
            messageToBFS.Body =
                            "Hello, " + "\n\n" +
                            "This is a message from the Bldr.com website, please follow up as soon as possible." + "\n\n" +
                            "Message Content:" + "\n" +
                            "-----------------------------------------" + "\n" +
                            "Name: " + model.Name + "\n" +
                            "Company: " + model.Company + "\n" +
                            "Zipcode: " + model.ZipCode + "\n" +
                            "Phone: " + model.Phone + "\n" +
                            "Email: " + model.EmailAddress + "\n" +
                            "Contact Time: " + model.ContactTime + "\n" +
                            "Heard About Us: " + model.HearAboutUs + "\n" +
                            locationZipCode +
                            "Message: " + model.Message + "\n" +
                            "-----------------------------------------" + "\n\n" +
                            "Query Reference Number" + "\n" +
                            "-----------------------------------------" + "\n" +
                            CTN + "\n" +
                            "-----------------------------------------";

            // ### Production SMTP Client
            System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient()
            {
                // see mailSettings information in the Web.config (at root level) file.
                EnableSsl = true
            };

            try
            {
                smtp.Send(messageToBFS);
            }
            catch (Exception ex)
            {
                Logger.Error<ContentController>($"Unable to send Email. Message Detail : {messageToBFS.Body}", ex);
                return "-1";
            }

            return CTN;
        }

        /// <summary>
        /// this method will replace the Umbraco UMB tags with real Urls. And also get cropped image Urls and converting some Objects to models. Get , GetChildren Api is using this method.
        /// </summary>
        /// <param name="result"></param>
        private void ReplaceUDIandLinks(ContentRepresentation result)
        {
            var baseUrl = ConfigurationManager.AppSettings["SiteBaseUrl"]?.TrimEnd('/');
            //looping and replacing umbraco UDI with website media urls
            foreach (var item in result.Properties?.ToList())
            {
                try
                {
                    //here item.key is the Property name, its from all the pages in New Home Content Node. example servicesTab1Data is in Homepage.
                    if (item.Key.ToString() == "servicesTab1Data" || item.Key.ToString() == "servicesTab2Data" || item.Key.ToString() == "servicesTab3Data")
                    {
                        var carouselModel = JsonConvert.DeserializeObject<List<CarouselControl>>(item.Value.ToString());

                        foreach (var img in carouselModel)
                        {
                            try
                            {
                                Udi udi = null;
                                Udi.TryParse(img.imageUrl, out udi);
                                var media = Umbraco.TypedMedia(udi);

                                if (media != null)
                                    img.imageUrl = media.Url;
                            }
                            catch (Exception) { }
                        }

                        if (carouselModel != null)
                        {
                            var carosel = JsonConvert.SerializeObject(carouselModel);
                            result.Properties[item.Key] = carosel;
                        }
                    }
                    else if (item.Key.ToString() == "communityList")
                    {
                        var communityModel = JsonConvert.DeserializeObject<List<CommunityModel>>(item.Value.ToString());

                        foreach (var community in communityModel)
                        {
                            Udi udi = null;
                            Udi.TryParse(community.communityImage, out udi);
                            var media = Umbraco.TypedMedia(udi);

                            if (media != null)
                                community.communityImage = media.Url;
                        }

                        if (communityModel != null)
                        {
                            var community = JsonConvert.SerializeObject(communityModel);
                            result.Properties[item.Key] = community;
                        }
                    }
                    else if (item.Key.ToString() == "documents")
                    {
                        var documentyModel = JsonConvert.DeserializeObject<List<DocumentModel>>(item.Value.ToString());

                        foreach (var document in documentyModel)
                        {
                            Udi udi = null;
                            Udi.TryParse(document.file, out udi);
                            var media = Umbraco.TypedMedia(udi);

                            if (media != null)
                                document.file = media.Url;
                        }

                        if (documentyModel != null)
                        {
                            var document = JsonConvert.SerializeObject(documentyModel);
                            result.Properties[item.Key] = document;
                        }
                    }
                    else if (item.Key.ToString() == "videoListItems")
                    {
                        var videoListModel = JsonConvert.DeserializeObject<List<VideoListItemModel>>(item.Value.ToString());

                        foreach (var videoList in videoListModel)
                        {
                            Udi udi = null;
                            Udi.TryParse(videoList.videoLinkThumbnail, out udi);
                            var media = Umbraco.TypedMedia(udi);

                            if (media != null)
                                videoList.videoLinkThumbnail = media.Url;
                        }

                        if (videoListModel != null)
                        {
                            var videoList = JsonConvert.SerializeObject(videoListModel);
                            result.Properties[item.Key] = videoList;
                        }
                    }
                    else if (item.Key.ToString() == "videoListItem1")
                    {
                        var videoListModel = JsonConvert.DeserializeObject<List<VideoListItemModel>>(item.Value.ToString());

                        foreach (var videoList in videoListModel)
                        {
                            Udi udi = null;
                            Udi.TryParse(videoList.videoLinkThumbnail, out udi);
                            var media = Umbraco.TypedMedia(udi);

                            if (media != null)
                                videoList.videoLinkThumbnail = media.Url;
                        }

                        if (videoListModel != null)
                        {
                            var videoList = JsonConvert.SerializeObject(videoListModel);
                            result.Properties[item.Key] = videoList;
                        }
                    }
                    else if (item.Key.ToString() == "imageTextHorizontalPosition" || item.Key.ToString() == "imageTextVerticalPosition" || item.Key.ToString() == "imageTextGradientPosition")
                    {
                        try
                        {
                            int id;
                            if (int.TryParse(item.Value.ToString(), out id))
                            {
                                result.Properties[item.Key] = Umbraco.GetPreValueAsString(id);
                            }
                        }
                        catch (Exception) { }
                    }
                    else if (item.Value.ToString().Contains("umb://media/"))
                    {
                        var medias = item.Value.ToString().Split(',');
                        if (medias.Count() > 0)
                        {
                            var mediaList = string.Empty;
                            foreach (var mediaItem in medias)
                            {
                                Udi.TryParse(mediaItem.ToString(), out Udi udi);
                                var media = Umbraco.TypedMedia(udi);

                                if (media != null)
                                {
                                    mediaList += media.Url + ",";
                                }
                            }

                            mediaList = mediaList.TrimEnd(',');

                            if(!string.IsNullOrEmpty(mediaList))
                                result.Properties[item.Key] = mediaList;
                        }
                    }
                    else if (item.Value.ToString().Contains("umb://document/") && item.Key.ToString() == "dataLocation")
                    {
                        Udi udi = null;
                        Udi.TryParse(item.Value.ToString(), out udi);
                        var contentList = Umbraco.TypedContent(udi);

                        if (contentList != null)
                        {
                            Udi udiID = null;
                            if (contentList.DocumentTypeAlias == "manufacturingParentFolder")
                            {
                                var manufacturingTypes = contentList.Children.Select(s => new ManufacturingTypeModel
                                {
                                    Id = s.Id,
                                    Active = (bool)s.Properties.FirstOrDefault(c => c.PropertyTypeAlias == "active").Value,
                                    TypeImage = Udi.TryParse(s.Properties.FirstOrDefault(c => c.PropertyTypeAlias == "typeImage").DataValue.ToString(), out udiID) ? Umbraco.TypedMedia(udiID)?.Url : null,
                                    TypeName = s.Properties.FirstOrDefault(c => c.PropertyTypeAlias == "typeName").Value.ToString()
                                }).Where(c => !string.IsNullOrEmpty(c.TypeImage)).ToList();

                                result.Properties[item.Key] = JsonConvert.SerializeObject(manufacturingTypes);
                            }
                            else if (contentList.DocumentTypeAlias == "installedServicesParentFolder")
                            {
                                var installedServicesTypes = contentList.Children.Where(c => c.GetPropertyValue<bool>("active") == true).Select(s => new InstalledServicesType
                                {
                                    Id = s.Id,
                                    Active = (bool)s.Properties.FirstOrDefault(c => c.PropertyTypeAlias == "active").Value,
                                    TypeImage = Udi.TryParse(s.Properties.FirstOrDefault(c => c.PropertyTypeAlias == "typeImage").DataValue.ToString(), out udiID) ? Umbraco.TypedMedia(udiID)?.Url : null,
                                    TypeName = s.Properties.FirstOrDefault(c => c.PropertyTypeAlias == "typeName").Value.ToString()
                                }).Where(c => !string.IsNullOrEmpty(c.TypeImage)).ToList();

                                result.Properties[item.Key] = JsonConvert.SerializeObject(installedServicesTypes);
                            }
                            else if (contentList.DocumentTypeAlias == "distributionParentFolder")
                            {
                                var distributionTypes = contentList.Children.Where(c => c.GetPropertyValue<bool>("active") == true).Select(s => new DistributionType
                                {
                                    Id = s.Id,
                                    TypeName = s.Properties.FirstOrDefault(c => c.PropertyTypeAlias == "typeName").Value.ToString(),
                                    Active = (bool)s.Properties.FirstOrDefault(c => c.PropertyTypeAlias == "active").Value,
                                    TypeImage = Udi.TryParse(s.Properties.FirstOrDefault(c => c.PropertyTypeAlias == "typeImage").DataValue.ToString(), out udiID) ? Umbraco.TypedMedia(udiID)?.Url : null
                                }).Where(c => !string.IsNullOrEmpty(c.TypeImage)).ToList();

                                result.Properties[item.Key] = JsonConvert.SerializeObject(distributionTypes);
                            }
                            else if (contentList.DocumentTypeAlias == "basicPage1")
                            {
                                var distributionTypes = contentList.Children.Where(c => c.GetPropertyValue<bool>("active") == true).Select(s => new DistributionType
                                {
                                    Id = s.Id,
                                    Active = (bool)s.Properties.FirstOrDefault(c => c.PropertyTypeAlias == "active").Value,
                                    TypeImage = Udi.TryParse(s.Properties.FirstOrDefault(c => c.PropertyTypeAlias == "typeImage").DataValue.ToString(), out udiID) ? Umbraco.TypedMedia(udiID)?.Url : null,
                                    TypeName = s.Properties.FirstOrDefault(c => c.PropertyTypeAlias == "typeName").Value.ToString()
                                }).Where(c => !string.IsNullOrEmpty(c.TypeImage)).ToList();

                                result.Properties[item.Key] = JsonConvert.SerializeObject(distributionTypes);
                            }
                        }
                    }
                    else if (item.Value.ToString().Contains("umb://document/") && item.Key.ToString() == "installedServicesPicker")
                    {
                        var udis = item.Value.ToString().Split(',');
                        var installedServices = new List<InstalledServicesType>();

                        foreach (var uid in udis)
                        {
                            Udi udi = null;
                            Udi.TryParse(uid, out udi);
                            var contentList = Umbraco.TypedContent(udi);

                            if (contentList != null)
                            {
                                if (contentList.GetPropertyValue<bool>("active") == true)
                                {
                                    var installedServicesTypes = new InstalledServicesType()
                                    {
                                        Id = contentList.Id,
                                        TypeName = contentList.Properties.FirstOrDefault(c => c.PropertyTypeAlias == "typeName").Value.ToString(),
                                    };

                                    installedServices.Add(installedServicesTypes);
                                }
                            }
                        }

                        result.Properties[item.Key] = JsonConvert.SerializeObject(installedServices);
                    }
                    else if (item.Value.ToString().Contains("umb://document/") && item.Key.ToString() == "locationDistributions")
                    {
                        var udis = item.Value.ToString().Split(',');
                        var locationDistributions = new List<LocationDistributionModel>();

                        foreach (var uid in udis)
                        {
                            Udi udi = null;
                            Udi.TryParse(uid, out udi);
                            var contentList = Umbraco.TypedContent(udi);

                            if (contentList != null)
                            {
                                dynamic data = contentList;

                                if (data.DocumentTypeAlias == "distributionSupplier")
                                {
                                    var locationDistribution = new LocationDistributionModel
                                    {
                                        Id = data.Id,
                                        SupplierLogo = data.SupplierLogo != null ? data.SupplierLogo.Url : null,
                                        SupplierName = data.SupplierName,
                                        DistributionListName = data.Parent.TypeName
                                    };

                                    locationDistributions.Add(locationDistribution);
                                }
                                else if(data.DocumentTypeAlias == "distributionType")
                                {
                                    if (data.Children.Count > 0)
                                    {
                                        foreach (var supplier in data.Children)
                                        {
                                            var locationDistribution = new LocationDistributionModel
                                            {
                                                Id = supplier.Id,
                                                SupplierLogo = supplier.SupplierLogo != null ? supplier.SupplierLogo.Url : null,
                                                SupplierName = supplier.SupplierName,
                                                DistributionListName = supplier.Parent.TypeName
                                            };

                                            locationDistributions.Add(locationDistribution);
                                        }
                                    }
                                    else
                                    {
                                        var locationDistribution = new LocationDistributionModel
                                        {
                                            Id = data.Id,
                                            DistributionListName = data.TypeName
                                        };

                                        locationDistributions.Add(locationDistribution);
                                    }
                                }
                            }
                        }

                        var grouped = locationDistributions.GroupBy(g => g.DistributionListName).Select(s => new
                        {
                            DistributionName = s.Key,
                            DistributionSuppliers = s.GroupBy(g => g.Id).Select(si => si.FirstOrDefault()).ToList()
                        }).ToList();
                        result.Properties[item.Key] = JsonConvert.SerializeObject(grouped);
                    }
                    else if (item.Value.ToString().Contains("umb://document/"))
                    {
                        var udis = item.Value.ToString().Split(',');
                        var suppliers = new List<SupplierModel>();

                        foreach (var uid in udis)
                        {
                            Udi udi = null;
                            Udi.TryParse(uid, out udi);
                            var contentList = Umbraco.TypedContent(udi);

                            if (contentList != null)
                            {
                                dynamic data = contentList;

                                var supplier = new SupplierModel
                                {
                                    Id = data.Id,
                                    SupplierLogo = data.SupplierLogo != null ? data.SupplierLogo.Url : null,
                                    SupplierName = data.SupplierName,
                                    DistributionListName = data.Parent.TypeName
                                };

                                suppliers.Add(supplier);
                            }
                        }

                        result.Properties[item.Key] = JsonConvert.SerializeObject(suppliers);
                    }
                    else if(item.Key.ToString() == "hoursMF")
                    {
                        result.Properties[item.Key] = item.Value?.ToString()?.Replace("Monday", "Mon")?
                                    .Replace("Tuesday", "Tue")?
                                    .Replace("Wednesday", "Wed")?
                                    .Replace("Thursday", "Thu")?
                                    .Replace("Friday", "Fri")?
                                    .Replace("Saturday", "Sat")?
                                    .Replace("Sunday", "Sun")?
                                    .Replace("pm", "pm,")?
                                    .Replace("Sat Closed Sun Closed", "Sat-Sun Closed")?
                                    .Replace("Sat-Closed Sun-Closed", "Sat-Sun Closed")?
                                    .TrimEnd(',');
                    }
                    else if (item.Key.ToString() == "suppliers")
                    {
                        var distributionPickerModel = JsonConvert.DeserializeObject<DistributionPickerModel>(item.Value.ToString());
                        var locationDistributions = new List<LocationDistributionModel>();

                        foreach (var distributionId in distributionPickerModel.Distributions)
                        {
                            var contentList = Umbraco.TypedContent(distributionId);

                            if (contentList != null)
                            {
                                dynamic data = contentList;

                                if (data.DocumentTypeAlias == "distributionType" && data.Active == true)
                                {
                                    if (data.Children.Count > 0)
                                    {
                                        var added = 0;
                                        foreach (var supplier in data.Children)
                                        {
                                            if (distributionPickerModel.Suppliers.Contains(supplier.Id))
                                            {
                                                var locationDistribution = new LocationDistributionModel
                                                {
                                                    Id = supplier.Id,
                                                    SupplierLogo = supplier.SupplierLogo != null ? supplier.SupplierLogo.Url : null,
                                                    SupplierName = supplier.SupplierName,
                                                    DistributionListName = supplier.Parent.TypeName
                                                };

                                                locationDistributions.Add(locationDistribution);
                                                added++;
                                            }
                                        }

                                        if(added == 0)
                                        {
                                            var locationDistribution = new LocationDistributionModel
                                            {
                                                Id = data.Id,
                                                DistributionListName = data.TypeName,
                                                Root = true
                                            };

                                            locationDistributions.Add(locationDistribution);
                                        }
                                    }
                                    else
                                    {
                                        var locationDistribution = new LocationDistributionModel
                                        {
                                            Id = data.Id,
                                            DistributionListName = data.TypeName,
                                            Root = true
                                        };

                                        locationDistributions.Add(locationDistribution);
                                    }
                                }
                            }
                        }

                        var grouped = locationDistributions.GroupBy(g => g.DistributionListName).Select(s => new
                        {
                            DistributionName = s.Key,
                            DistributionSuppliers = s.Count() > 0 && s.All(a => a.Root != true) ? s.GroupBy(gi => gi.Id).Select(si => si.FirstOrDefault()).ToList() : null
                        }).ToList();
                        result.Properties[item.Key] = JsonConvert.SerializeObject(grouped);
                    }

                    result.Properties[item.Key] = GetCroppedUrl(result.Properties[item.Key]?.ToString());

                    result.Properties[item.Key] = ReplaceMediaLinks(result.Properties[item.Key]?.ToString(), baseUrl);
                }
                catch (Exception ex)
                {
                    result.Properties[item.Key] = ReplaceMediaLinks(result.Properties[item.Key]?.ToString(), baseUrl);
                }
            }
        }

        /// <summary>
        /// Replace the media LInks with full url in the RTF.
        /// </summary>
        /// <param name="contentToReplace"></param>
        /// <param name="baseUrl"></param>
        /// <returns></returns>
        private string ReplaceMediaLinks(string contentToReplace, string baseUrl)
        {
            try
            {
                if (!string.IsNullOrEmpty(contentToReplace))
                {
                    var stringToReplace = string.Concat("src=\"", baseUrl, "/media");
                    var string3ToReplace = string.Concat("src=\\\"", baseUrl, "/media");
                    return contentToReplace.ToString().Replace("src=\"/media", stringToReplace).Replace("src=\\\"/media", string3ToReplace);
                }
            }
            catch (Exception ex) { }

            return contentToReplace;
        }

        /// <summary>
        /// Get the crop url from the cropSet.
        /// </summary>
        /// <param name="cropDataSet"></param>
        /// <returns></returns>
        private string GetCroppedUrl(string cropDataSet)
        {
            try
            {
                if (!string.IsNullOrEmpty(cropDataSet))
                {
                    var cropped = JsonConvert.DeserializeObject<ImageCropDataSet>(cropDataSet);
                    if (cropped != null)
                    {
                        var cropUrl = cropped.GetCropUrl("cropped");
                        return string.Concat(cropped.Src, cropUrl);
                    }
                }
            }
            catch (Exception ex) { }

            return cropDataSet;
        }
        #endregion
    }
}