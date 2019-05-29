using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;

namespace CustomerPortalCMS.Models.UI
{
    internal class SortDescriptorCollectionExpressionBuilder
    {
        private readonly IEnumerable<SortDescriptor> sortDescriptors;
        private readonly IQueryable queryable;

        public SortDescriptorCollectionExpressionBuilder(IQueryable queryable,
            IEnumerable<SortDescriptor> sortDescriptors)
        {
            this.queryable = queryable;
            this.sortDescriptors = sortDescriptors;
        }

        public IQueryable Sort()
        {
            IQueryable queryable = this.queryable;
            bool flag = true;
            foreach (SortDescriptor sortDescriptor in this.sortDescriptors)
            {
                LambdaExpression lambdaExpression = ExpressionBuilderFactory
                    .MemberAccess(this.queryable, typeof(object), sortDescriptor.Member)
                    .CreateLambdaExpression();
                string methodName;
                if (flag)
                {
                    methodName = sortDescriptor.SortDirection == ListSortDirection.Ascending
                        ? "OrderBy"
                        : "OrderByDescending";
                    flag = false;
                }
                else
                    methodName = sortDescriptor.SortDirection == ListSortDirection.Ascending
                        ? "ThenBy"
                        : "ThenByDescending";
                queryable = queryable.Provider.CreateQuery((Expression) Expression.Call(typeof(Queryable), methodName,
                    new Type[2]
                    {
                        queryable.ElementType,
                        lambdaExpression.Body.Type
                    }, new Expression[2]
                    {
                        queryable.Expression,
                        (Expression) Expression.Quote((Expression) lambdaExpression)
                    }));
            }
            return queryable;
        }
    }
}
