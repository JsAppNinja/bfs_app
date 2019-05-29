namespace CustomerPortalCMS.Models.UI
{
    public class StringNode : IFilterNode, IValueNode
    {
        public object Value { get; set; }

        public void Accept(IFilterNodeVisitor visitor)
        {
            visitor.Visit((IValueNode) this);
        }
    }
}