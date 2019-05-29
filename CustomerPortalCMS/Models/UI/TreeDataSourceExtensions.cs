using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace CustomerPortalCMS.Models.UI
{
    /// <summary>
    /// Provides extension methods to process TreeDataSourceRequest.
    /// </summary>
    public static class TreeDataSourceExtensions
    {
        private static MethodInfo anyMethod =
            ((IEnumerable<MethodInfo>) typeof(Queryable).GetMethods()).First<MethodInfo>(
                (Func<MethodInfo, bool>) (method =>
                {
                    if (method.Name == "Any")
                        return method.GetParameters().Length == 1;
                    return false;
                }));

        internal static IEnumerable<AggregateResult> AggregateForLevel<TModel, T1, T2>(this IEnumerable data,
            IQueryable allData, List<AggregateDescriptor> aggregates, Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector)
        {
            ParameterExpression parameterExpression = Expression.Parameter(typeof(TModel), "item");
            return TreeDataSourceExtensions.AggregateForLevel<TModel, T1, T2>(QueryableExtensions.Where(allData,
                (Expression) Expression.Lambda(
                    TreeDataSourceExtensions.CreateOrExpression<TModel, T1>(data, idSelector,
                        (Expression) parameterExpression), new ParameterExpression[1]
                    {
                        parameterExpression
                    })), allData, aggregates, idSelector, parentIDSelector);
        }

        internal static Expression CreateOrExpression<TModel, T1>(IEnumerable data,
            Expression<Func<TModel, T1>> idSelector, Expression e)
        {
            Func<TModel, T1> func = idSelector.Compile();
            Expression right = (Expression) null;
            Expression left = ExpressionFactory.MakeMemberAccess(e, idSelector.MemberWithoutInstance());
            foreach (TModel model in data)
                right = right == null
                    ? (Expression) Expression.Equal(left, (Expression) Expression.Constant((object) func(model)))
                    : (Expression) Expression.Or(
                        (Expression) Expression.Equal(left, (Expression) Expression.Constant((object) func(model))),
                        right);
            return right;
        }

        internal static IEnumerable<AggregateResult> AggregateForLevel<TModel, T1, T2>(this IQueryable data,
            IQueryable allData, List<AggregateDescriptor> aggregates, Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector)
        {
            data = data.ChildrenRecursive<TModel, T1, T2>(allData, idSelector, parentIDSelector);
            return (IEnumerable<AggregateResult>) data.Aggregate(
                aggregates.SelectMany<AggregateDescriptor, AggregateFunction>(
                    (Func<AggregateDescriptor, IEnumerable<AggregateFunction>>) (a => (IEnumerable<AggregateFunction>) a
                        .Aggregates)));
        }

        internal static IQueryable ChildrenRecursive<TModel, T1, T2>(this IQueryable roots, IQueryable allData,
            Expression<Func<TModel, T1>> idSelector, Expression<Func<TModel, T2>> parentIDSelector)
        {
            IQueryable roots1 = roots.Children<TModel, T1, T2>(allData, idSelector, parentIDSelector);
            if ((bool) TreeDataSourceExtensions.AnyMethod(typeof(TModel))
                .Invoke((object) null, (object[]) new IQueryable[1]
                {
                    roots1
                }))
                return QueryableExtensions.Union(roots,
                    roots1.ChildrenRecursive<TModel, T1, T2>(allData, idSelector, parentIDSelector));
            return roots;
        }

        internal static IQueryable Children<TModel, T1, T2>(this IQueryable roots, IQueryable allData,
            Expression<Func<TModel, T1>> idSelector, Expression<Func<TModel, T2>> parentIDSelector)
        {
            Type elementType = allData.ElementType;
            ParameterExpression parameterExpression1 = Expression.Parameter(elementType, "allItem");
            ParameterExpression parameterExpression2 = Expression.Parameter(elementType, "rootItem");
            Expression right = ExpressionFactory.MakeMemberAccess((Expression) parameterExpression1,
                parentIDSelector.MemberWithoutInstance());
            LambdaExpression lambdaExpression1 = Expression.Lambda(
                (Expression) Expression.Equal(
                    (Expression) Expression.Convert(
                        ExpressionFactory.MakeMemberAccess((Expression) parameterExpression2,
                            idSelector.MemberWithoutInstance()), right.Type), right), new ParameterExpression[1]
                {
                    parameterExpression1
                });
            LambdaExpression lambdaExpression2 = Expression.Lambda(typeof(Func<TModel, IEnumerable<TModel>>),
                (Expression) Expression.Call(typeof(Queryable), "Where", new Type[1]
                {
                    elementType
                }, new Expression[2]
                {
                    allData.Expression,
                    (Expression) Expression.Quote((Expression) lambdaExpression1)
                }), new ParameterExpression[1] {parameterExpression2});
            MethodCallExpression methodCallExpression = Expression.Call(typeof(Queryable), "SelectMany", new Type[2]
            {
                elementType,
                elementType
            }, new Expression[2]
            {
                roots.Expression,
                (Expression) Expression.Quote((Expression) lambdaExpression2)
            });
            return allData.Provider.CreateQuery((Expression) methodCallExpression);
        }

        private static MethodInfo AnyMethod(Type type)
        {
            return TreeDataSourceExtensions.anyMethod.MakeGenericMethod(type);
        }

        internal static IQueryable ParentsRecursive<TModel>(this IQueryable matches, IQueryable allData,
            LambdaExpression idSelector, LambdaExpression parentIDSelector)
        {
            IQueryable queryable = matches.Parents(allData, idSelector, parentIDSelector);
            if ((bool) TreeDataSourceExtensions.AnyMethod(matches.ElementType)
                .Invoke((object) null, (object[]) new IQueryable[1]
                {
                    queryable
                }))
                queryable = QueryableExtensions.Union(queryable,
                    queryable.ParentsRecursive<TModel>(allData, idSelector, parentIDSelector));
            return QueryableExtensions.Union(matches, queryable);
        }

        internal static IQueryable Parents(this IQueryable matches, IQueryable allData, LambdaExpression idSelector,
            LambdaExpression parentIDSelector)
        {
            Type elementType = allData.ElementType;
            ParameterExpression parameterExpression1 = Expression.Parameter(elementType, "allItem");
            ParameterExpression parameterExpression2 = Expression.Parameter(elementType, "matchedItem");
            Expression left = ExpressionFactory.MakeMemberAccess((Expression) parameterExpression2,
                parentIDSelector.MemberWithoutInstance());
            UnaryExpression unaryExpression =
                Expression.Convert(
                    ExpressionFactory.MakeMemberAccess((Expression) parameterExpression1,
                        idSelector.MemberWithoutInstance()), left.Type);
            LambdaExpression lambdaExpression1 = Expression.Lambda(
                (Expression) Expression.Equal(left, (Expression) unaryExpression), new ParameterExpression[1]
                {
                    parameterExpression2
                });
            LambdaExpression lambdaExpression2 = Expression.Lambda((Expression) Expression.Call(typeof(Queryable),
                "Any", new Type[1]
                {
                    elementType
                }, new Expression[2]
                {
                    matches.Expression,
                    (Expression) Expression.Quote((Expression) lambdaExpression1)
                }), new ParameterExpression[1] {parameterExpression1});
            MethodCallExpression methodCallExpression = Expression.Call(typeof(Queryable), "Where", new Type[1]
            {
                elementType
            }, new Expression[2]
            {
                allData.Expression,
                (Expression) Expression.Quote((Expression) lambdaExpression2)
            });
            return allData.Provider.CreateQuery((Expression) methodCallExpression);
        }
    }
}
