namespace CustomerPortalCMS.Models.UI
{
    public class DateTimeNode : IFilterNode, IValueNode
    {
        public object Value { get; set; }

        public void Accept(IFilterNodeVisitor visitor)
        {
            visitor.Visit((IValueNode) this);
        }
    }
}