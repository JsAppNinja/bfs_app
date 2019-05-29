namespace CustomerPortalCMS.Models.UI
{
    public class CountFunction : EnumerableAggregateFunction
    {
        /// <summary>Gets the the Count method name.</summary>
        /// <value><c>Count</c>.</value>
        public override string AggregateMethodName
        {
            get { return "Count"; }
        }
    }
}
