namespace CustomerPortalCMS.Models.UI
{
    public class ComparisonNode : IFilterNode, IOperatorNode
    {
        public FilterOperator FilterOperator { get; set; }

        public virtual IFilterNode First { get; set; }

        public virtual IFilterNode Second { get; set; }

        public void Accept(IFilterNodeVisitor visitor)
        {
            visitor.StartVisit((IOperatorNode) this);
            this.First.Accept(visitor);
            this.Second.Accept(visitor);
            visitor.EndVisit();
        }
    }
}
