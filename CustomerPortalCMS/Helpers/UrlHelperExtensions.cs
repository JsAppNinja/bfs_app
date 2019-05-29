using System.Reflection;
using System.Web.Mvc;

namespace CustomerPortalCMS.Helpers
{
    public static class UrlHelperExtensions
    {
        public static string ContentVersioned(this UrlHelper self, string contentPath)
        {
            string versionedContentPath = contentPath + "?v=" + Assembly.GetAssembly(typeof(UrlHelperExtensions)).GetName().Version.ToString();
            return self.Content(versionedContentPath);
        }
    }
}