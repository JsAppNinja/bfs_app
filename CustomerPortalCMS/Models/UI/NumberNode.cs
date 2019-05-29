namespace CustomerPortalCMS.Models.UI
{
    public class NumberNode : IFilterNode, IValueNode
    {
        public object Value { get; set; }

        public void Accept(IFilterNodeVisitor visitor)
        {
            visitor.Visit((IValueNode) this);
        }
    }
}
