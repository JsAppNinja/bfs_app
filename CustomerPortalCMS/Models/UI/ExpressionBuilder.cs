using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace CustomerPortalCMS.Models.UI
{
    public static class ExpressionBuilder
    {
        public static Expression<Func<TModel, TValue>> Expression<TModel, TValue>(string memberName)
        {
            return (Expression<Func<TModel, TValue>>) ExpressionBuilder.Lambda<TModel>(memberName);
        }

        public static LambdaExpression Lambda<T>(string memberName)
        {
            return ExpressionBuilder.Lambda<T>(memberName, false);
        }

        public static LambdaExpression Lambda<T>(Type memberType, string memberName, bool checkForNull)
        {
            return ExpressionBuilderFactory.MemberAccess(typeof(T), memberType, memberName, checkForNull)
                .CreateLambdaExpression();
        }

        public static LambdaExpression Lambda<T>(string memberName, bool checkForNull)
        {
            return ExpressionBuilderFactory.MemberAccess(typeof(T), memberName, checkForNull).CreateLambdaExpression();
        }

        public static Expression<Func<T, bool>> Expression<T>(IList<IFilterDescriptor> filterDescriptors)
        {
            return ExpressionBuilder.Expression<T>(filterDescriptors, true);
        }

        public static Expression<Func<T, bool>> Expression<T>(IList<IFilterDescriptor> filterDescriptors,
            bool checkForNull)
        {
            FilterDescriptorCollectionExpressionBuilder expressionBuilder =
                new FilterDescriptorCollectionExpressionBuilder(ParameterExpression.Parameter(typeof(T), "item"),
                    (IEnumerable<IFilterDescriptor>) filterDescriptors);
            expressionBuilder.Options.LiftMemberAccessToNull = checkForNull;
            return (Expression<Func<T, bool>>) expressionBuilder.CreateFilterExpression();
        }
    }
}
