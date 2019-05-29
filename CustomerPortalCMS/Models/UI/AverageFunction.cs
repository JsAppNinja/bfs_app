namespace CustomerPortalCMS.Models.UI
{
    public class AverageFunction : EnumerableSelectorAggregateFunction
    {
        /// <summary>Gets the the Average method name.</summary>
        /// <value><c>Average</c>.</value>
        public override string AggregateMethodName
        {
            get { return "Average"; }
        }
    }
}