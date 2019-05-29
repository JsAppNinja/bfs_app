using System;
using System.Diagnostics;
using System.Globalization;
using System.Xml;

namespace CustomerPortalCMS.Models.UI
{
    public static class XmlNodeExtensions
    {
        /// <exception cref="T:System.ArgumentException">
        /// Child element with name specified by <paramref name="childName" /> does not exists.
        /// </exception>
        public static string ChildElementInnerText(this XmlNode node, string childName)
        {
            XmlElement xmlElement = node[childName];
            if (xmlElement != null)
                return xmlElement.InnerText;
            Trace.WriteLine(string.Format((IFormatProvider) CultureInfo.CurrentCulture,
                "Child element with specified name: {0} cannot be found.", new object[1]
                {
                    (object) childName
                }));
            return (string) null;
        }
    }
}
