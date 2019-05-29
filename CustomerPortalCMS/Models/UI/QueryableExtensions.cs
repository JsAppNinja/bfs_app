using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Web.Mvc;

namespace CustomerPortalCMS.Models.UI
{
    /// <summary>
    /// Provides extension methods to process DataSourceRequest.
    /// </summary>
    public static class QueryableExtensions
    {
        private static DataSourceResult ToDataSourceResult(this DataTableWrapper enumerable, DataSourceRequest request)
        {
            List<IFilterDescriptor> filterDescriptorList = new List<IFilterDescriptor>();
            if (request.Filters != null)
                filterDescriptorList.AddRange((IEnumerable<IFilterDescriptor>) request.Filters);
            if (filterDescriptorList.Any<IFilterDescriptor>())
            {
                DataTable dataTable = enumerable.Table;
                filterDescriptorList.SelectMemberDescriptors()
                    .Each<FilterDescriptor>((Action<FilterDescriptor>) (f => f.MemberType =
                        QueryableExtensions.GetFieldByTypeFromDataColumn(dataTable, f.Member)));
            }
            List<GroupDescriptor> groupDescriptorList = new List<GroupDescriptor>();
            if (request.Groups != null)
                groupDescriptorList.AddRange((IEnumerable<GroupDescriptor>) request.Groups);
            if (groupDescriptorList.Any<GroupDescriptor>())
            {
                DataTable dataTable = enumerable.Table;
                groupDescriptorList.Each<GroupDescriptor>((Action<GroupDescriptor>) (g => g.MemberType =
                    QueryableExtensions.GetFieldByTypeFromDataColumn(dataTable, g.Member)));
            }
            DataSourceResult dataSourceResult = enumerable.AsEnumerable<DataRowView>().ToDataSourceResult(request);
            dataSourceResult.Data = dataSourceResult.Data.SerializeToDictionary(enumerable.Table);
            return dataSourceResult;
        }

        private static Type GetFieldByTypeFromDataColumn(DataTable dataTable, string memberName)
        {
            if (!dataTable.Columns.Contains(memberName))
                return (Type) null;
            return dataTable.Columns[memberName].DataType;
        }

        public static DataSourceResult ToDataSourceResult(this DataTable dataTable, DataSourceRequest request)
        {
            return QueryableExtensions.ToDataSourceResult(dataTable.WrapAsEnumerable(), request);
        }

        public static DataSourceResult ToDataSourceResult(this IEnumerable enumerable, DataSourceRequest request)
        {
            return QueryableExtensions.ToDataSourceResult(enumerable.AsQueryable(), request);
        }

        public static DataSourceResult ToDataSourceResult(this IEnumerable enumerable, DataSourceRequest request,
            ModelStateDictionary modelState)
        {
            return QueryableExtensions.ToDataSourceResult(enumerable.AsQueryable(), request, modelState);
        }

        public static DataSourceResult ToDataSourceResult(this IQueryable enumerable, DataSourceRequest request)
        {
            return QueryableExtensions.ToDataSourceResult(enumerable, request, (ModelStateDictionary) null);
        }

        public static DataSourceResult ToDataSourceResult<TModel, TResult>(this IEnumerable<TModel> enumerable,
            DataSourceRequest request, Func<TModel, TResult> selector)
        {
            return enumerable.AsQueryable<TModel>()
                .CreateDataSourceResult<TModel, TResult>(request, (ModelStateDictionary) null, selector);
        }

        public static DataSourceResult ToDataSourceResult<TModel, TResult>(this IEnumerable<TModel> enumerable,
            DataSourceRequest request, ModelStateDictionary modelState, Func<TModel, TResult> selector)
        {
            return enumerable.AsQueryable<TModel>()
                .CreateDataSourceResult<TModel, TResult>(request, modelState, selector);
        }

        public static DataSourceResult ToDataSourceResult<TModel, TResult>(this IQueryable<TModel> enumerable,
            DataSourceRequest request, Func<TModel, TResult> selector)
        {
            return enumerable.CreateDataSourceResult<TModel, TResult>(request, (ModelStateDictionary) null, selector);
        }

        public static DataSourceResult ToDataSourceResult<TModel, TResult>(this IQueryable<TModel> enumerable,
            DataSourceRequest request, ModelStateDictionary modelState, Func<TModel, TResult> selector)
        {
            return enumerable.CreateDataSourceResult<TModel, TResult>(request, modelState, selector);
        }

        public static DataSourceResult ToDataSourceResult(this IQueryable queryable, DataSourceRequest request,
            ModelStateDictionary modelState)
        {
            return queryable.CreateDataSourceResult<object, object>(request, modelState, (Func<object, object>) null);
        }

        private static DataSourceResult CreateDataSourceResult<TModel, TResult>(this IQueryable queryable,
            DataSourceRequest request, ModelStateDictionary modelState, Func<TModel, TResult> selector)
        {
            DataSourceResult dataSourceResult = new DataSourceResult();
            IQueryable source1 = queryable;
            List<IFilterDescriptor> source2 = new List<IFilterDescriptor>();
            if (request.Filters != null)
                source2.AddRange((IEnumerable<IFilterDescriptor>) request.Filters);
            if (source2.Any<IFilterDescriptor>())
                source1 = source1.Where((IEnumerable<IFilterDescriptor>) source2);
            List<SortDescriptor> sort = new List<SortDescriptor>();
            if (request.Sorts != null)
                sort.AddRange((IEnumerable<SortDescriptor>) request.Sorts);
            List<SortDescriptor> temporarySortDescriptors = new List<SortDescriptor>();
            IList<GroupDescriptor> groupDescriptorList = (IList<GroupDescriptor>) new List<GroupDescriptor>();
            if (request.Groups != null)
                groupDescriptorList.AddRange<GroupDescriptor>((IEnumerable<GroupDescriptor>) request.Groups);
            List<AggregateDescriptor> aggregates = new List<AggregateDescriptor>();
            if (request.Aggregates != null)
                aggregates.AddRange((IEnumerable<AggregateDescriptor>) request.Aggregates);
            if (aggregates.Any<AggregateDescriptor>())
            {
                IQueryable source3 = source1.AsQueryable();
                IQueryable source4 = source3;
                if (source2.Any<IFilterDescriptor>())
                    source4 = source3.Where((IEnumerable<IFilterDescriptor>) source2);
                dataSourceResult.AggregateResults = (IEnumerable<AggregateResult>) source4.Aggregate(
                    aggregates.SelectMany<AggregateDescriptor, AggregateFunction>(
                        (Func<AggregateDescriptor, IEnumerable<AggregateFunction>>)
                        (a => (IEnumerable<AggregateFunction>) a.Aggregates)));
                if (groupDescriptorList.Any<GroupDescriptor>() && aggregates.Any<AggregateDescriptor>())
                    groupDescriptorList.Each<GroupDescriptor>(
                        (Action<GroupDescriptor>) (g => g.AggregateFunctions.AddRange<AggregateFunction>(
                            aggregates.SelectMany<AggregateDescriptor, AggregateFunction>(
                                (Func<AggregateDescriptor, IEnumerable<AggregateFunction>>)
                                (a => (IEnumerable<AggregateFunction>) a.Aggregates)))));
            }
            dataSourceResult.Total = source1.Count();
            if (!sort.Any<SortDescriptor>() && queryable.Provider.IsEntityFrameworkProvider())
            {
                SortDescriptor sortDescriptor = new SortDescriptor()
                {
                    Member = queryable.ElementType.FirstSortableProperty()
                };
                sort.Add(sortDescriptor);
                temporarySortDescriptors.Add(sortDescriptor);
            }
            if (groupDescriptorList.Any<GroupDescriptor>())
                groupDescriptorList.Reverse<GroupDescriptor>()
                    .Each<GroupDescriptor>((Action<GroupDescriptor>) (groupDescriptor =>
                    {
                        SortDescriptor sortDescriptor = new SortDescriptor()
                        {
                            Member = groupDescriptor.Member,
                            SortDirection = groupDescriptor.SortDirection
                        };
                        sort.Insert(0, sortDescriptor);
                        temporarySortDescriptors.Add(sortDescriptor);
                    }));
            if (sort.Any<SortDescriptor>())
                source1 = source1.Sort((IEnumerable<SortDescriptor>) sort);
            IQueryable notPagedData = source1;
            IQueryable source5 = source1.Page(request.Page - 1, request.PageSize);
            if (groupDescriptorList.Any<GroupDescriptor>())
                source5 = source5.GroupBy(notPagedData, (IEnumerable<GroupDescriptor>) groupDescriptorList);
            dataSourceResult.Data = source5.Execute<TModel, TResult>(selector);
            if (modelState != null && !modelState.IsValid)
                dataSourceResult.Errors = modelState.SerializeErrors();
            temporarySortDescriptors.Each<SortDescriptor>(
                (Action<SortDescriptor>) (sortDescriptor => sort.Remove(sortDescriptor)));
            return dataSourceResult;
        }

        private static IQueryable CallQueryableMethod(this IQueryable source, string methodName,
            LambdaExpression selector)
        {
            return source.Provider.CreateQuery((Expression) Expression.Call(typeof(Queryable), methodName, new Type[2]
            {
                source.ElementType,
                selector.Body.Type
            }, new Expression[2]
            {
                source.Expression,
                (Expression) Expression.Quote((Expression) selector)
            }));
        }

        /// <summary>
        /// Sorts the elements of a sequence using the specified sort descriptors.
        /// </summary>
        /// <param name="source">A sequence of values to sort.</param>
        /// <param name="sortDescriptors">The sort descriptors used for sorting.</param>
        /// <returns>
        /// An <see cref="T:System.Linq.IQueryable" /> whose elements are sorted according to a <paramref name="sortDescriptors" />.
        /// </returns>
        public static IQueryable Sort(this IQueryable source, IEnumerable<SortDescriptor> sortDescriptors)
        {
            return new SortDescriptorCollectionExpressionBuilder(source, sortDescriptors).Sort();
        }

        /// <summary>
        /// Pages through the elements of a sequence until the specified
        /// <paramref name="pageIndex" /> using <paramref name="pageSize" />.
        /// </summary>
        /// <param name="source">A sequence of values to page.</param>
        /// <param name="pageIndex">Index of the page.</param>
        /// <param name="pageSize">Size of the page.</param>
        /// <returns>
        /// An <see cref="T:System.Linq.IQueryable" /> whose elements are at the specified <paramref name="pageIndex" />.
        /// </returns>
        public static IQueryable Page(this IQueryable source, int pageIndex, int pageSize)
        {
            IQueryable source1 = source.Skip(pageIndex * pageSize);
            if (pageSize > 0)
                source1 = source1.Take(pageSize);
            return source1;
        }

        /// <summary>Projects each element of a sequence into a new form.</summary>
        /// <returns>
        /// An <see cref="T:System.Linq.IQueryable" /> whose elements are the result of invoking a
        /// projection selector on each element of <paramref name="source" />.
        /// </returns>
        /// <param name="source"> A sequence of values to project. </param>
        /// <param name="selector"> A projection function to apply to each element. </param>
        public static IQueryable Select(this IQueryable source, LambdaExpression selector)
        {
            return source.CallQueryableMethod("Select", selector);
        }

        /// <summary>
        /// Groups the elements of a sequence according to a specified key selector function.
        /// </summary>
        /// <param name="source"> An <see cref="T:System.Linq.IQueryable" /> whose elements to group.</param>
        /// <param name="keySelector"> A function to extract the key for each element.</param>
        /// <returns>
        /// An <see cref="T:System.Linq.IQueryable" /> with <see cref="T:System.Linq.IGrouping`2" /> items,
        /// whose elements contains a sequence of objects and a key.
        /// </returns>
        public static IQueryable GroupBy(this IQueryable source, LambdaExpression keySelector)
        {
            return source.CallQueryableMethod("GroupBy", keySelector);
        }

        /// <summary>
        /// Sorts the elements of a sequence in ascending order according to a key.
        /// </summary>
        /// <returns>
        /// An <see cref="T:System.Linq.IQueryable" /> whose elements are sorted according to a key.
        /// </returns>
        /// <param name="source">A sequence of values to order.</param>
        /// <param name="keySelector">
        /// A function to extract a key from an element.
        /// </param>
        public static IQueryable OrderBy(this IQueryable source, LambdaExpression keySelector)
        {
            return source.CallQueryableMethod("OrderBy", keySelector);
        }

        /// <summary>
        /// Sorts the elements of a sequence in descending order according to a key.
        /// </summary>
        /// <returns>
        /// An <see cref="T:System.Linq.IQueryable" /> whose elements are sorted in descending order according to a key.
        /// </returns>
        /// <param name="source">A sequence of values to order.</param>
        /// <param name="keySelector">
        /// A function to extract a key from an element.
        /// </param>
        public static IQueryable OrderByDescending(this IQueryable source, LambdaExpression keySelector)
        {
            return source.CallQueryableMethod("OrderByDescending", keySelector);
        }

        /// <summary>
        /// Calls <see cref="M:QueryableExtensions.OrderBy(System.Linq.IQueryable,System.Linq.Expressions.LambdaExpression)" />
        /// or <see cref="M:QueryableExtensions.OrderByDescending(System.Linq.IQueryable,System.Linq.Expressions.LambdaExpression)" /> depending on the <paramref name="sortDirection" />.
        /// </summary>
        /// <param name="source">The source.</param>
        /// <param name="keySelector">The key selector.</param>
        /// <param name="sortDirection">The sort direction.</param>
        /// <returns>
        /// An <see cref="T:System.Linq.IQueryable" /> whose elements are sorted according to a key.
        /// </returns>
        public static IQueryable OrderBy(this IQueryable source, LambdaExpression keySelector,
            ListSortDirection? sortDirection)
        {
            if (!sortDirection.HasValue)
                return source;
            if (sortDirection.Value == ListSortDirection.Ascending)
                return source.OrderBy(keySelector);
            return source.OrderByDescending(keySelector);
        }

        /// <summary>
        /// Groups the elements of a sequence according to a specified <paramref name="groupDescriptors" />.
        /// </summary>
        /// <param name="source"> An <see cref="T:System.Linq.IQueryable" /> whose elements to group. </param>
        /// <param name="groupDescriptors">The group descriptors used for grouping.</param>
        /// <returns>
        /// An <see cref="T:System.Linq.IQueryable" /> with <see cref="T:IGroup" /> items,
        /// whose elements contains a sequence of objects and a key.
        /// </returns>
        public static IQueryable GroupBy(this IQueryable source, IEnumerable<GroupDescriptor> groupDescriptors)
        {
            return source.GroupBy(source, groupDescriptors);
        }

        public static IQueryable GroupBy(this IQueryable source, IQueryable notPagedData,
            IEnumerable<GroupDescriptor> groupDescriptors)
        {
            GroupDescriptorCollectionExpressionBuilder expressionBuilder =
                new GroupDescriptorCollectionExpressionBuilder(source, groupDescriptors, notPagedData);
            expressionBuilder.Options.LiftMemberAccessToNull = source.Provider.IsLinqToObjectsProvider();
            return expressionBuilder.CreateQuery();
        }

        /// <summary>
        /// Calculates the results of given aggregates functions on a sequence of elements.
        /// </summary>
        /// <param name="source"> An <see cref="T:System.Linq.IQueryable" /> whose elements will
        /// be used for aggregate calculation.</param>
        /// <param name="aggregateFunctions">The aggregate functions.</param>
        /// <returns>Collection of <see cref="T:AggregateResult" />s calculated for each function.</returns>
        public static AggregateResultCollection Aggregate(this IQueryable source,
            IEnumerable<AggregateFunction> aggregateFunctions)
        {
            List<AggregateFunction> list = aggregateFunctions.ToList<AggregateFunction>();
            if (list.Count > 0)
            {
                QueryableAggregatesExpressionBuilder expressionBuilder =
                    new QueryableAggregatesExpressionBuilder(source, (IEnumerable<AggregateFunction>) list);
                expressionBuilder.Options.LiftMemberAccessToNull = source.Provider.IsLinqToObjectsProvider();
                IEnumerator enumerator = expressionBuilder.CreateQuery().GetEnumerator();
                try
                {
                    if (enumerator.MoveNext())
                        return ((AggregateFunctionsGroup) enumerator.Current).GetAggregateResults(
                            (IEnumerable<AggregateFunction>) list);
                }
                finally
                {
                    IDisposable disposable = enumerator as IDisposable;
                    if (disposable != null)
                        disposable.Dispose();
                }
            }
            return new AggregateResultCollection();
        }

        /// <summary>Filters a sequence of values based on a predicate.</summary>
        /// <returns>
        /// An <see cref="T:System.Linq.IQueryable" /> that contains elements from the input sequence
        /// that satisfy the condition specified by <paramref name="predicate" />.
        /// </returns>
        /// <param name="source"> An <see cref="T:System.Linq.IQueryable" /> to filter.</param>
        /// <param name="predicate"> A function to test each element for a condition.</param>
        public static IQueryable Where(this IQueryable source, Expression predicate)
        {
            return source.Provider.CreateQuery((Expression) Expression.Call(typeof(Queryable), "Where", new Type[1]
            {
                source.ElementType
            }, new Expression[2]
            {
                source.Expression,
                (Expression) Expression.Quote(predicate)
            }));
        }

        /// <summary>
        /// Filters a sequence of values based on a collection of <see cref="T:IFilterDescriptor" />.
        /// </summary>
        /// <param name="source">The source.</param>
        /// <param name="filterDescriptors">The filter descriptors.</param>
        /// <returns>
        /// An <see cref="T:System.Linq.IQueryable" /> that contains elements from the input sequence
        /// that satisfy the conditions specified by each filter descriptor in <paramref name="filterDescriptors" />.
        /// </returns>
        public static IQueryable Where(this IQueryable source, IEnumerable<IFilterDescriptor> filterDescriptors)
        {
            if (!filterDescriptors.Any<IFilterDescriptor>())
                return source;
            FilterDescriptorCollectionExpressionBuilder expressionBuilder =
                new FilterDescriptorCollectionExpressionBuilder(Expression.Parameter(source.ElementType, "item"),
                    filterDescriptors);
            expressionBuilder.Options.LiftMemberAccessToNull = source.Provider.IsLinqToObjectsProvider();
            LambdaExpression filterExpression = expressionBuilder.CreateFilterExpression();
            return source.Where((Expression) filterExpression);
        }

        /// <summary>
        /// Returns a specified number of contiguous elements from the start of a sequence.
        /// </summary>
        /// <returns>
        /// An <see cref="T:System.Linq.IQueryable" /> that contains the specified number
        /// of elements from the start of <paramref name="source" />.
        /// </returns>
        /// <param name="source"> The sequence to return elements from.</param>
        /// <param name="count"> The number of elements to return. </param>
        /// <exception cref="T:System.ArgumentNullException"><paramref name="source" /> is null. </exception>
        public static IQueryable Take(this IQueryable source, int count)
        {
            if (source == null)
                throw new ArgumentNullException("source");
            return source.Provider.CreateQuery((Expression) Expression.Call(typeof(Queryable), "Take", new Type[1]
            {
                source.ElementType
            }, new Expression[2]
            {
                source.Expression,
                (Expression) Expression.Constant((object) count)
            }));
        }

        /// <summary>
        /// Bypasses a specified number of elements in a sequence
        /// and then returns the remaining elements.
        /// </summary>
        /// <returns>
        /// An <see cref="T:System.Linq.IQueryable" /> that contains elements that occur
        /// after the specified index in the input sequence.
        /// </returns>
        /// <param name="source">
        /// An <see cref="T:System.Linq.IQueryable" /> to return elements from.
        /// </param>
        /// <param name="count">
        /// The number of elements to skip before returning the remaining elements.
        /// </param>
        /// <exception cref="T:System.ArgumentNullException"> <paramref name="source" /> is null.</exception>
        public static IQueryable Skip(this IQueryable source, int count)
        {
            if (source == null)
                throw new ArgumentNullException("source");
            return source.Provider.CreateQuery((Expression) Expression.Call(typeof(Queryable), "Skip", new Type[1]
            {
                source.ElementType
            }, new Expression[2]
            {
                source.Expression,
                (Expression) Expression.Constant((object) count)
            }));
        }

        /// <summary> Returns the number of elements in a sequence.</summary>
        /// <returns> The number of elements in the input sequence.</returns>
        /// <param name="source">
        /// The <see cref="T:System.Linq.IQueryable" /> that contains the elements to be counted.
        /// </param>
        /// <exception cref="T:System.ArgumentNullException"> <paramref name="source" /> is null.</exception>
        public static int Count(this IQueryable source)
        {
            if (source == null)
                throw new ArgumentNullException("source");
            return source.Provider.Execute<int>((Expression) Expression.Call(typeof(Queryable), "Count", new Type[1]
            {
                source.ElementType
            }, new Expression[1] {source.Expression}));
        }

        /// <summary> Returns the element at a specified index in a sequence.</summary>
        /// <returns> The element at the specified position in <paramref name="source" />.</returns>
        /// <param name="source"> An <see cref="T:System.Linq.IQueryable" /> to return an element from.</param>
        /// <param name="index"> The zero-based index of the element to retrieve.</param>
        /// <exception cref="T:System.ArgumentNullException"> <paramref name="source" /> is null.</exception>
        /// <exception cref="T:System.ArgumentOutOfRangeException"> <paramref name="index" /> is less than zero.</exception>
        public static object ElementAt(this IQueryable source, int index)
        {
            if (source == null)
                throw new ArgumentNullException("source");
            if (index < 0)
                throw new ArgumentOutOfRangeException("index");
            return source.Provider.Execute((Expression) Expression.Call(typeof(Queryable), "ElementAt", new Type[1]
            {
                source.ElementType
            }, new Expression[2]
            {
                source.Expression,
                (Expression) Expression.Constant((object) index)
            }));
        }

        /// <summary>
        /// Produces the set union of two sequences by using the default equality comparer.
        /// </summary>
        /// <returns>
        /// An <see cref="T:System.Linq.IQueryable" /> that contains the elements from both input sequences, excluding duplicates.
        /// </returns>
        /// <param name="source">
        /// An <see cref="T:System.Linq.IQueryable" /> whose distinct elements form the first set for the union.
        /// </param>
        /// <param name="second">
        /// An <see cref="T:System.Linq.IQueryable" /> whose distinct elements form the first set for the union.
        /// </param>
        /// <exception cref="T:System.ArgumentNullException"> <paramref name="source" /> is null.</exception>
        public static IQueryable Union(this IQueryable source, IQueryable second)
        {
            return source.Provider.CreateQuery((Expression) Expression.Call(typeof(Queryable), "Union", new Type[1]
            {
                source.ElementType
            }, new Expression[2]
            {
                source.Expression,
                second.Expression
            }));
        }

        private static IEnumerable Execute<TModel, TResult>(this IQueryable source, Func<TModel, TResult> selector)
        {
            if (source == null)
                throw new ArgumentNullException("source");
            if (source is DataTableWrapper)
                return (IEnumerable) source;
            Type elementType = source.ElementType;
            if (selector != null)
            {
                List<AggregateFunctionsGroup> aggregateFunctionsGroupList = new List<AggregateFunctionsGroup>();
                if (elementType == typeof(AggregateFunctionsGroup))
                {
                    foreach (AggregateFunctionsGroup aggregateFunctionsGroup in (IEnumerable) source)
                    {
                        aggregateFunctionsGroup.Items = aggregateFunctionsGroup.Items.AsQueryable()
                            .Execute<TModel, TResult>(selector);
                        aggregateFunctionsGroupList.Add(aggregateFunctionsGroup);
                    }
                    return (IEnumerable) aggregateFunctionsGroupList;
                }
                List<TResult> resultList = new List<TResult>();
                foreach (TModel model in (IEnumerable) source)
                    resultList.Add(selector(model));
                return (IEnumerable) resultList;
            }
            IList instance = (IList) Activator.CreateInstance(typeof(List<>).MakeGenericType(elementType));
            foreach (object obj in (IEnumerable) source)
                instance.Add(obj);
            return (IEnumerable) instance;
        }

        public static TreeDataSourceResult ToTreeDataSourceResult(this IEnumerable enumerable,
            DataSourceRequest request)
        {
            return enumerable.AsQueryable().ToTreeDataSourceResult(request, (ModelStateDictionary) null);
        }

        public static TreeDataSourceResult ToTreeDataSourceResult(this IEnumerable enumerable,
            DataSourceRequest request, ModelStateDictionary modelState)
        {
            return enumerable.AsQueryable()
                .CreateTreeDataSourceResult<object, object, object, object>(request,
                    (Expression<Func<object, object>>) null, (Expression<Func<object, object>>) null, modelState,
                    (Func<object, object>) null, (Expression<Func<object, bool>>) null);
        }

        public static TreeDataSourceResult ToTreeDataSourceResult<TModel, TResult>(this IQueryable<TModel> enumerable,
            DataSourceRequest request, Func<TModel, TResult> selector)
        {
            return enumerable.ToTreeDataSourceResult<TModel, object, object, TResult>(request,
                (Expression<Func<TModel, object>>) null, (Expression<Func<TModel, object>>) null, selector);
        }

        public static TreeDataSourceResult ToTreeDataSourceResult<TModel, TResult>(this IEnumerable<TModel> enumerable,
            DataSourceRequest request, Func<TModel, TResult> selector)
        {
            return enumerable.ToTreeDataSourceResult<TModel, object, object, TResult>(request,
                (Expression<Func<TModel, object>>) null, (Expression<Func<TModel, object>>) null, selector);
        }

        public static TreeDataSourceResult ToTreeDataSourceResult<TModel, T1, T2>(this IQueryable<TModel> enumerable,
            DataSourceRequest request, Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector)
        {
            return enumerable.CreateTreeDataSourceResult<TModel, T1, T2, TModel>(request, idSelector, parentIDSelector,
                (ModelStateDictionary) null, (Func<TModel, TModel>) null, (Expression<Func<TModel, bool>>) null);
        }

        public static TreeDataSourceResult ToTreeDataSourceResult<TModel, T1, T2>(this IQueryable<TModel> enumerable,
            DataSourceRequest request, Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector, Expression<Func<TModel, bool>> rootSelector)
        {
            return enumerable.CreateTreeDataSourceResult<TModel, T1, T2, TModel>(request, idSelector, parentIDSelector,
                (ModelStateDictionary) null, (Func<TModel, TModel>) null, rootSelector);
        }

        public static TreeDataSourceResult ToTreeDataSourceResult<TModel, T1, T2, TResult>(
            this IQueryable<TModel> queryable, DataSourceRequest request, Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector, Expression<Func<TModel, bool>> rootSelector,
            Func<TModel, TResult> selector)
        {
            return queryable.CreateTreeDataSourceResult<TModel, T1, T2, TResult>(request, idSelector, parentIDSelector,
                (ModelStateDictionary) null, selector, rootSelector);
        }

        public static TreeDataSourceResult ToTreeDataSourceResult<TModel, T1, T2>(this IQueryable<TModel> queryable,
            DataSourceRequest request, Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector, ModelStateDictionary modelState)
        {
            return queryable.ToTreeDataSourceResult<TModel, T1, T2, TModel>(request, idSelector, parentIDSelector,
                modelState, (Func<TModel, TModel>) null);
        }

        public static TreeDataSourceResult ToTreeDataSourceResult<TModel, T1, T2>(this IQueryable<TModel> enumerable,
            DataSourceRequest request, Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector, Expression<Func<TModel, bool>> rootSelector,
            ModelStateDictionary modelState)
        {
            return enumerable.CreateTreeDataSourceResult<TModel, T1, T2, TModel>(request, idSelector, parentIDSelector,
                modelState, (Func<TModel, TModel>) null, rootSelector);
        }

        public static TreeDataSourceResult ToTreeDataSourceResult<TModel, T1, T2, TResult>(
            this IQueryable<TModel> queryable, DataSourceRequest request, Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector, Func<TModel, TResult> selector)
        {
            return queryable.CreateTreeDataSourceResult<TModel, T1, T2, TResult>(request, idSelector, parentIDSelector,
                (ModelStateDictionary) null, selector, (Expression<Func<TModel, bool>>) null);
        }

        public static TreeDataSourceResult ToTreeDataSourceResult<TModel, T1, T2, TResult>(
            this IQueryable<TModel> queryable, DataSourceRequest request, Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector, ModelStateDictionary modelState,
            Func<TModel, TResult> selector)
        {
            return queryable.CreateTreeDataSourceResult<TModel, T1, T2, TResult>(request, idSelector, parentIDSelector,
                modelState, selector, (Expression<Func<TModel, bool>>) null);
        }

        public static TreeDataSourceResult ToTreeDataSourceResult<TModel, T1, T2, TResult>(
            this IQueryable<TModel> queryable, DataSourceRequest request, Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector, Expression<Func<TModel, bool>> rootSelector,
            ModelStateDictionary modelState, Func<TModel, TResult> selector)
        {
            return queryable.CreateTreeDataSourceResult<TModel, T1, T2, TResult>(request, idSelector, parentIDSelector,
                modelState, selector, rootSelector);
        }

        public static TreeDataSourceResult ToTreeDataSourceResult<TModel, T1, T2>(this IEnumerable<TModel> enumerable,
            DataSourceRequest request, Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector)
        {
            return enumerable.AsQueryable<TModel>()
                .CreateTreeDataSourceResult<TModel, T1, T2, TModel>(request, idSelector, parentIDSelector,
                    (ModelStateDictionary) null, (Func<TModel, TModel>) null, (Expression<Func<TModel, bool>>) null);
        }

        public static TreeDataSourceResult ToTreeDataSourceResult<TModel, T1, T2>(this IEnumerable<TModel> enumerable,
            DataSourceRequest request, Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector, Expression<Func<TModel, bool>> rootSelector)
        {
            return enumerable.AsQueryable<TModel>()
                .CreateTreeDataSourceResult<TModel, T1, T2, TModel>(request, idSelector, parentIDSelector,
                    (ModelStateDictionary) null, (Func<TModel, TModel>) null, rootSelector);
        }

        public static TreeDataSourceResult ToTreeDataSourceResult<TModel, T1, T2, TResult>(
            this IEnumerable<TModel> queryable, DataSourceRequest request, Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector, Expression<Func<TModel, bool>> rootSelector,
            Func<TModel, TResult> selector)
        {
            return queryable.AsQueryable<TModel>()
                .CreateTreeDataSourceResult<TModel, T1, T2, TResult>(request, idSelector, parentIDSelector,
                    (ModelStateDictionary) null, selector, rootSelector);
        }

        public static TreeDataSourceResult ToTreeDataSourceResult<TModel, T1, T2>(this IEnumerable<TModel> queryable,
            DataSourceRequest request, Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector, ModelStateDictionary modelState)
        {
            return queryable.AsQueryable<TModel>()
                .ToTreeDataSourceResult<TModel, T1, T2, TModel>(request, idSelector, parentIDSelector, modelState,
                    (Func<TModel, TModel>) null);
        }

        public static TreeDataSourceResult ToTreeDataSourceResult<TModel, T1, T2>(this IEnumerable<TModel> enumerable,
            DataSourceRequest request, Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector, Expression<Func<TModel, bool>> rootSelector,
            ModelStateDictionary modelState)
        {
            return enumerable.AsQueryable<TModel>()
                .CreateTreeDataSourceResult<TModel, T1, T2, TModel>(request, idSelector, parentIDSelector, modelState,
                    (Func<TModel, TModel>) null, rootSelector);
        }

        public static TreeDataSourceResult ToTreeDataSourceResult<TModel, T1, T2, TResult>(
            this IEnumerable<TModel> queryable, DataSourceRequest request, Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector, Func<TModel, TResult> selector)
        {
            return queryable.AsQueryable<TModel>()
                .CreateTreeDataSourceResult<TModel, T1, T2, TResult>(request, idSelector, parentIDSelector,
                    (ModelStateDictionary) null, selector, (Expression<Func<TModel, bool>>) null);
        }

        public static TreeDataSourceResult ToTreeDataSourceResult<TModel, T1, T2, TResult>(
            this IEnumerable<TModel> queryable, DataSourceRequest request, Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector, ModelStateDictionary modelState,
            Func<TModel, TResult> selector)
        {
            return queryable.AsQueryable<TModel>()
                .CreateTreeDataSourceResult<TModel, T1, T2, TResult>(request, idSelector, parentIDSelector, modelState,
                    selector, (Expression<Func<TModel, bool>>) null);
        }

        public static TreeDataSourceResult ToTreeDataSourceResult<TModel, T1, T2, TResult>(
            this IEnumerable<TModel> queryable, DataSourceRequest request, Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector, Expression<Func<TModel, bool>> rootSelector,
            ModelStateDictionary modelState, Func<TModel, TResult> selector)
        {
            return queryable.AsQueryable<TModel>()
                .CreateTreeDataSourceResult<TModel, T1, T2, TResult>(request, idSelector, parentIDSelector, modelState,
                    selector, rootSelector);
        }

        private static TreeDataSourceResult CreateTreeDataSourceResult<TModel, T1, T2, TResult>(
            this IQueryable queryable, DataSourceRequest request, Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector, ModelStateDictionary modelState,
            Func<TModel, TResult> selector, Expression<Func<TModel, bool>> rootSelector)
        {
            TreeDataSourceResult dataSourceResult = new TreeDataSourceResult();
            IQueryable source1 = queryable;
            List<IFilterDescriptor> source2 = new List<IFilterDescriptor>();
            if (request.Filters != null)
                source2.AddRange((IEnumerable<IFilterDescriptor>) request.Filters);
            if (source2.Any<IFilterDescriptor>())
                source1 = source1.Where((IEnumerable<IFilterDescriptor>) source2)
                    .ParentsRecursive<TModel>(queryable, (LambdaExpression) idSelector,
                        (LambdaExpression) parentIDSelector);
            IQueryable allData = source1;
            if (rootSelector != null)
                source1 = source1.Where((Expression) rootSelector);
            List<SortDescriptor> source3 = new List<SortDescriptor>();
            if (request.Sorts != null)
                source3.AddRange((IEnumerable<SortDescriptor>) request.Sorts);
            List<AggregateDescriptor> aggregateDescriptorList = new List<AggregateDescriptor>();
            if (request.Aggregates != null)
                aggregateDescriptorList.AddRange((IEnumerable<AggregateDescriptor>) request.Aggregates);
            if (aggregateDescriptorList.Any<AggregateDescriptor>())
            {
                foreach (IGrouping<T2, TModel> data in (IEnumerable) source1.GroupBy(
                    (LambdaExpression) parentIDSelector))
                    dataSourceResult.AggregateResults.Add(Convert.ToString((object) data.Key),
                        data.AggregateForLevel<TModel, T1, T2>(allData, aggregateDescriptorList, idSelector,
                            parentIDSelector));
            }
            if (source3.Any<SortDescriptor>())
                source1 = source1.Sort((IEnumerable<SortDescriptor>) source3);
            dataSourceResult.Data = source1.Execute<TModel, TResult>(selector);
            if (modelState != null && !modelState.IsValid)
                dataSourceResult.Errors = modelState.SerializeErrors();
            return dataSourceResult;
        }
    }
}
