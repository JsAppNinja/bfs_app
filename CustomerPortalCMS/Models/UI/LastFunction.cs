namespace CustomerPortalCMS.Models.UI
{
    public class LastFunction : EnumerableAggregateFunction
    {
        /// <summary>Gets the the Last method name.</summary>
        /// <value><c>Last</c>.</value>
        public override string AggregateMethodName
        {
            get { return "LastOrDefault"; }
        }
    }
}
