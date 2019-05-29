using System.Collections.Generic;

namespace CustomerPortalCMS.Models.UI
{
    public class FunctionNode : IFilterNode, IOperatorNode
    {
        public FilterOperator FilterOperator { get; set; }

        public IList<IFilterNode> Arguments { get; private set; }

        public FunctionNode()
        {
            this.Arguments = (IList<IFilterNode>) new List<IFilterNode>();
        }

        public void Accept(IFilterNodeVisitor visitor)
        {
            visitor.StartVisit((IOperatorNode) this);
            foreach (IFilterNode filterNode in (IEnumerable<IFilterNode>) this.Arguments)
                filterNode.Accept(visitor);
            visitor.EndVisit();
        }
    }
}
