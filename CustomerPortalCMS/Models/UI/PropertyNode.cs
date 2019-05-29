namespace CustomerPortalCMS.Models.UI
{
    public class PropertyNode : IFilterNode
    {
        public string Name { get; set; }

        public void Accept(IFilterNodeVisitor visitor)
        {
            visitor.Visit(this);
        }
    }
}
