using System.Web.Http.ModelBinding;

namespace CustomerPortalCMS.Models.UI
{
    public class DataSourceRequestAttribute : CustomModelBinderAttribute
    {
        public string Prefix { get; set; }

        public DataSourceRequestAttribute() : base()
        {
            //base.ctor();
        }

        public override IModelBinder GetBinder()
        {
            return (IModelBinder) new DataSourceRequestModelBinder()
            {
                // Prefix = this.Prefix
            };
        }
    }
}
