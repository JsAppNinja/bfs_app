using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace CustomerPortalCMS.Models.UI
{
    public static class EnumerableExtensions
    {
        public static void Each<T>(this IEnumerable<T> instance, Action<T, int> action)
        {
            int num = 0;
            foreach (T obj in instance)
                action(obj, num++);
        }

        /// <summary>Executes the provided delegate for each item.</summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="instance">The instance.</param>
        /// <param name="action">The action to be applied.</param>
        public static void Each<T>(this IEnumerable<T> instance, Action<T> action)
        {
            foreach (T obj in instance)
                action(obj);
        }

        internal static IEnumerable AsGenericEnumerable(this IEnumerable source)
        {
            Type type = typeof(object);
            if (source.GetType().FindGenericType(typeof(IEnumerable<>)) != (Type) null)
                return source;
            IEnumerator enumerator = source.GetEnumerator();
            while (enumerator.MoveNext())
            {
                if (enumerator.Current != null)
                {
                    type = enumerator.Current.GetType();
                    try
                    {
                        enumerator.Reset();
                        break;
                    }
                    catch
                    {
                        break;
                    }
                }
            }
            return (IEnumerable) Activator.CreateInstance(
                typeof(EnumerableExtensions.GenericEnumerable<>).MakeGenericType(type), new object[1]
                {
                    (object) source
                });
        }

        internal static int IndexOf(this IEnumerable source, object item)
        {
            int num = 0;
            foreach (object objA in source)
            {
                if (object.Equals(objA, item))
                    return num;
                ++num;
            }
            return -1;
        }

        /// <exception cref="T:System.ArgumentOutOfRangeException"><c>index</c> is out of range.</exception>
        internal static object ElementAt(this IEnumerable source, int index)
        {
            if (index < 0)
                throw new ArgumentOutOfRangeException("index");
            IList list = source as IList;
            if (list != null && list.Count > 0)
                return list[index];
            foreach (object obj in source)
            {
                if (index == 0)
                    return obj;
                --index;
            }
            return (object) null;
        }

        internal static IEnumerable<TSource> SelectRecursive<TSource>(this IEnumerable<TSource> source,
            Func<TSource, IEnumerable<TSource>> recursiveSelector)
        {
            Stack<IEnumerator<TSource>> stack = new Stack<IEnumerator<TSource>>();
            stack.Push(source.GetEnumerator());
            try
            {
                while (stack.Count > 0)
                {
                    if (stack.Peek().MoveNext())
                    {
                        TSource current = stack.Peek().Current;
                        yield return current;
                        IEnumerable<TSource> children = recursiveSelector(current);
                        if (children != null)
                            stack.Push(children.GetEnumerator());
                    }
                    else
                        stack.Pop().Dispose();
                }
            }
            finally
            {
                while (stack.Count > 0)
                    stack.Pop().Dispose();
            }
        }

        internal static IEnumerable<TResult> Consolidate<TFirst, TSecond, TResult>(this IEnumerable<TFirst> first,
            IEnumerable<TSecond> second, Func<TFirst, TSecond, TResult> resultSelector)
        {
            if (first == null)
                throw new ArgumentNullException("first");
            if (second == null)
                throw new ArgumentNullException("second");
            if (resultSelector == null)
                throw new ArgumentNullException("resultSelector");
            return EnumerableExtensions.ZipIterator<TFirst, TSecond, TResult>(first, second, resultSelector);
        }

        private static IEnumerable<TResult> ZipIterator<TFirst, TSecond, TResult>(IEnumerable<TFirst> first,
            IEnumerable<TSecond> second, Func<TFirst, TSecond, TResult> resultSelector)
        {
            using (IEnumerator<TFirst> enumerator1 = first.GetEnumerator())
            {
                using (IEnumerator<TSecond> enumerator2 = second.GetEnumerator())
                {
                    while (enumerator1.MoveNext() && enumerator2.MoveNext())
                        yield return resultSelector(enumerator1.Current, enumerator2.Current);
                }
            }
        }

        internal static ReadOnlyCollection<T> ToReadOnlyCollection<T>(this IEnumerable<T> sequence)
        {
            if (sequence == null)
                return EnumerableExtensions.DefaultReadOnlyCollection<T>.Empty;
            return sequence as ReadOnlyCollection<T> ?? new ReadOnlyCollection<T>((IList<T>) sequence.ToArray<T>());
        }

        private class GenericEnumerable<T> : IEnumerable<T>, IEnumerable
        {
            private readonly IEnumerable source;

            /// <summary>
            /// Initializes a new instance of the <see cref="T:CustomerPortalCMS.Models.UI.EnumerableExtensions.GenericEnumerable`1" /> class.
            /// </summary>
            /// <param name="source">The source.</param>
            public GenericEnumerable(IEnumerable source)
            {
                this.source = source;
            }

            IEnumerator IEnumerable.GetEnumerator()
            {
                return this.source.GetEnumerator();
            }

            IEnumerator<T> IEnumerable<T>.GetEnumerator()
            {
                foreach (T obj in this.source)
                    yield return obj;
            }
        }

        private static class DefaultReadOnlyCollection<T>
        {
            private static ReadOnlyCollection<T> defaultCollection;

            internal static ReadOnlyCollection<T> Empty
            {
                get
                {
                    if (EnumerableExtensions.DefaultReadOnlyCollection<T>.defaultCollection == null)
                        EnumerableExtensions.DefaultReadOnlyCollection<T>.defaultCollection =
                            new ReadOnlyCollection<T>((IList<T>) new T[0]);
                    return EnumerableExtensions.DefaultReadOnlyCollection<T>.defaultCollection;
                }
            }
        }
    }
}
