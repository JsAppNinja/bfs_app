using System.Collections.Generic;

namespace CustomerPortalCMS.Models.UI
{
    public static class FilterDescriptorFactory
    {
        public static IList<IFilterDescriptor> Create(string input)
        {
            IList<IFilterDescriptor> filterDescriptorList = (IList<IFilterDescriptor>) new List<IFilterDescriptor>();
            IFilterNode filterNode = new FilterParser(input).Parse();
            if (filterNode == null)
                return filterDescriptorList;
            FilterNodeVisitor filterNodeVisitor = new FilterNodeVisitor();
            filterNode.Accept((IFilterNodeVisitor) filterNodeVisitor);
            filterDescriptorList.Add(filterNodeVisitor.Result);
            return filterDescriptorList;
        }
    }
}
