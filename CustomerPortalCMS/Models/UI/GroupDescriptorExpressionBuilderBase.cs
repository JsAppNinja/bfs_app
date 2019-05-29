using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;

namespace CustomerPortalCMS.Models.UI
{
    internal abstract class GroupDescriptorExpressionBuilderBase : ExpressionBuilderBase
    {
        private IQueryable queryable;

        public virtual IQueryable Queryable
        {
            get { return this.queryable; }
            protected set { this.queryable = value; }
        }

        protected virtual ListSortDirection? SortDirection
        {
            get { return new ListSortDirection?(); }
        }

        protected GroupDescriptorExpressionBuilderBase(IQueryable queryable)
            : base(queryable.ElementType)
        {
            this.queryable = queryable;
        }

        public IQueryable CreateQuery()
        {
            return this.queryable.GroupBy(this.CreateGroupByExpression())
                .OrderBy(this.CreateOrderByExpression(), this.SortDirection)
                .Select(this.CreateSelectExpression());
        }

        protected abstract LambdaExpression CreateGroupByExpression();

        protected abstract LambdaExpression CreateOrderByExpression();

        protected abstract LambdaExpression CreateSelectExpression();
    }
}
