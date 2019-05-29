using System;
using System.Web.Http.Controllers;
using System.Web.Http.ModelBinding;

namespace CustomerPortalCMS.Models.UI
{
    public class DataSourceRequestModelBinder : IModelBinder
    {
        public bool BindModel(HttpActionContext actionContext, ModelBindingContext bindingContext)
        {
            DataSourceRequest request = new DataSourceRequest();

            string sort, group, filter, aggregates;
            int currentPage;
            int pageSize;

            string body = actionContext.Request.Content.ReadAsStringAsync().Result;
            System.Collections.Specialized.NameValueCollection keyValues = null;
            if (!string.IsNullOrEmpty(body))
                keyValues = System.Web.HttpUtility.ParseQueryString(body);

            if (keyValues != null)
            {
                sort = keyValues[GridUrlParameters.Sort];
                if (!string.IsNullOrEmpty(sort))
                    request.Sorts = GridDescriptorSerializer.Deserialize<SortDescriptor>(sort);

                Int32.TryParse(keyValues[GridUrlParameters.Page], out currentPage);
                request.Page = currentPage;

                Int32.TryParse(keyValues[GridUrlParameters.PageSize], out pageSize);
                request.PageSize = pageSize;

                filter = keyValues[GridUrlParameters.Filter];
                if (!string.IsNullOrEmpty(filter))
                    request.Filters = FilterDescriptorFactory.Create(filter);

                group = keyValues[GridUrlParameters.Group];
                if (!string.IsNullOrEmpty(group))
                    request.Groups = GridDescriptorSerializer.Deserialize<GroupDescriptor>(group);

                aggregates = keyValues[GridUrlParameters.Aggregates];
                if (!string.IsNullOrEmpty(aggregates))
                    request.Aggregates = GridDescriptorSerializer.Deserialize<AggregateDescriptor>(aggregates);

            }

            bindingContext.Model = request;
            return true;
        }
    }
}
