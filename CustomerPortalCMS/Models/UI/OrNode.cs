namespace CustomerPortalCMS.Models.UI
{
    public class OrNode : IFilterNode, ILogicalNode
    {
        public IFilterNode First { get; set; }

        public IFilterNode Second { get; set; }

        public FilterCompositionLogicalOperator LogicalOperator
        {
            get { return FilterCompositionLogicalOperator.Or; }
        }

        public void Accept(IFilterNodeVisitor visitor)
        {
            visitor.StartVisit((ILogicalNode) this);
            this.First.Accept(visitor);
            this.Second.Accept(visitor);
            visitor.EndVisit();
        }
    }
}
