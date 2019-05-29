namespace CustomerPortalCMS.Models.UI
{
    public class MaxFunction : EnumerableSelectorAggregateFunction
    {
        /// <summary>Gets the the Max method name.</summary>
        /// <value><c>Max</c>.</value>
        public override string AggregateMethodName
        {
            get { return "Max"; }
        }
    }
}
