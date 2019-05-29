using System.Collections.Generic;

namespace CustomerPortalCMS.Models.UI
{
    public class FilterNodeVisitor : IFilterNodeVisitor
    {
        private Stack<IFilterDescriptor> context;

        public IFilterDescriptor Result
        {
            get { return this.context.Pop(); }
        }

        private IFilterDescriptor CurrentDescriptor
        {
            get
            {
                if (this.context.Count > 0)
                    return this.context.Peek();
                return (IFilterDescriptor) null;
            }
        }

        public FilterNodeVisitor()
        {
            this.context = new Stack<IFilterDescriptor>();
        }

        public void StartVisit(IOperatorNode operatorNode)
        {
            FilterDescriptor filterDescriptor = new FilterDescriptor()
            {
                Operator = operatorNode.FilterOperator
            };
            CompositeFilterDescriptor currentDescriptor = this.CurrentDescriptor as CompositeFilterDescriptor;
            if (currentDescriptor != null)
                currentDescriptor.FilterDescriptors.Add((IFilterDescriptor) filterDescriptor);
            this.context.Push((IFilterDescriptor) filterDescriptor);
        }

        public void StartVisit(ILogicalNode logicalNode)
        {
            CompositeFilterDescriptor filterDescriptor = new CompositeFilterDescriptor()
            {
                LogicalOperator = logicalNode.LogicalOperator
            };
            CompositeFilterDescriptor currentDescriptor = this.CurrentDescriptor as CompositeFilterDescriptor;
            if (currentDescriptor != null)
                currentDescriptor.FilterDescriptors.Add((IFilterDescriptor) filterDescriptor);
            this.context.Push((IFilterDescriptor) filterDescriptor);
        }

        public void Visit(PropertyNode propertyNode)
        {
            ((FilterDescriptor) this.CurrentDescriptor).Member = propertyNode.Name;
        }

        public void EndVisit()
        {
            if (this.context.Count <= 1)
                return;
            this.context.Pop();
        }

        public void Visit(IValueNode valueNode)
        {
            ((FilterDescriptor) this.CurrentDescriptor).Value = valueNode.Value;
        }
    }
}
