namespace CustomerPortalCMS.Models.UI
{
    public class SumFunction : EnumerableSelectorAggregateFunction
    {
        /// <summary>Gets the the Min method name.</summary>
        /// <value><c>Min</c>.</value>
        public override string AggregateMethodName
        {
            get { return "Sum"; }
        }
    }
}
