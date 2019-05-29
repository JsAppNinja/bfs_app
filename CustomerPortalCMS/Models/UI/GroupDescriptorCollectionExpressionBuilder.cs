using System.Collections.Generic;
using System.Linq;

namespace CustomerPortalCMS.Models.UI
{
    internal class GroupDescriptorCollectionExpressionBuilder : ExpressionBuilderBase
    {
        private readonly IQueryable queryable;
        private readonly IEnumerable<GroupDescriptor> groupDescriptors;
        private readonly IQueryable notPagedData;

        public GroupDescriptorCollectionExpressionBuilder(IQueryable queryable,
            IEnumerable<GroupDescriptor> groupDescriptors, IQueryable notPagedData)
            : base(queryable.ElementType)
        {
            this.queryable = queryable;
            this.groupDescriptors = groupDescriptors;
            this.notPagedData = notPagedData;
        }

        public IQueryable CreateQuery()
        {
            GroupDescriptorExpressionBuilder childBuilder = (GroupDescriptorExpressionBuilder) null;
            foreach (GroupDescriptor groupDescriptor in this.groupDescriptors
                .Reverse<GroupDescriptor>())
            {
                GroupDescriptorExpressionBuilder expressionBuilder =
                    new GroupDescriptorExpressionBuilder(this.queryable, groupDescriptor, childBuilder,
                        this.notPagedData);
                expressionBuilder.Options.LiftMemberAccessToNull = this.queryable.Provider.IsLinqToObjectsProvider();
                childBuilder = expressionBuilder;
            }
            if (childBuilder != null)
                return childBuilder.CreateQuery();
            return this.queryable;
        }
    }
}
