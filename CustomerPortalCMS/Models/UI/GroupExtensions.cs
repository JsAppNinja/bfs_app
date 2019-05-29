using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace CustomerPortalCMS.Models.UI
{
    internal static class GroupExtensions
    {
        public static int LeafIndexOf(this IGroup group, object item)
        {
            if (!group.HasSubgroups)
                return group.Items.IndexOf(item);
            return group.Subgroups.LeafIndexOf(item);
        }

        public static int LeafIndexOf(this IEnumerable<IGroup> groups, object item)
        {
            int num1 = 0;
            foreach (IGroup group in groups)
            {
                int num2 = group.LeafIndexOf(item);
                if (num2 >= 0)
                    return num1 + num2;
                num1 += group.ItemCount;
            }
            return -1;
        }

        public static IEnumerable Leaves(this IEnumerable<IGroup> groups)
        {
            foreach (IGroup group in groups)
            {
                foreach (object leaf in group.Leaves())
                    yield return leaf;
            }
        }

        public static IEnumerable Leaves(this IGroup group)
        {
            if (!group.HasSubgroups)
                return group.Items;
            return group.Subgroups.Leaves();
        }

        public static int LeavesCount(this IEnumerable<IGroup> groups)
        {
            return groups.Sum<IGroup>((Func<IGroup, int>) (g =>
            {
                if (!g.HasSubgroups)
                    return g.ItemCount;
                return g.Subgroups.LeavesCount();
            }));
        }

        internal static int GroupUniqueKey(this IEnumerable<IGroup> groups, IGroup group)
        {
            return GroupExtensions.GetGroupSequenceUniqueKey((IEnumerable<IGroup>) groups.GetParentsAndSelf(group));
        }

        /// <summary>
        /// Calculates unique int for given group in a group sequence,
        /// taking into account groups order, each group key and groups' count.
        /// </summary>
        private static int GetGroupSequenceUniqueKey(IEnumerable<IGroup> groups)
        {
            int num = 0;
            bool flag = true;
            foreach (IGroup group in groups)
            {
                int groupKeyHashCode = GroupExtensions.GetGroupKeyHashCode(group);
                if (flag)
                {
                    flag = false;
                    num = groupKeyHashCode * 397;
                }
                else
                    num ^= groupKeyHashCode;
            }
            return num ^ groups.Count<IGroup>();
        }

        private static int GetGroupKeyHashCode(IGroup group)
        {
            if (group.Key != null)
                return group.Key.GetHashCode();
            return 0;
        }

        internal static IList<IGroup> GetParentsAndSelf(this IEnumerable<IGroup> groups, IGroup targetGroup)
        {
            foreach (IGroup group in groups)
            {
                IList<IGroup> andSelfRecursive = GroupExtensions.GetParentsAndSelfRecursive(
                    (IList<IGroup>) new List<IGroup>()
                    {
                        group
                    }, targetGroup);
                if (andSelfRecursive.Count > 0)
                    return andSelfRecursive;
            }
            return (IList<IGroup>) new List<IGroup>();
        }

        private static IList<IGroup> GetParentsAndSelfRecursive(IList<IGroup> parents, IGroup targetGroup)
        {
            IGroup group = parents.Last<IGroup>();
            if (group == targetGroup)
                return parents;
            if (group.HasSubgroups)
            {
                foreach (IGroup subgroup in group.Subgroups)
                {
                    parents.Add(subgroup);
                    IList<IGroup> andSelfRecursive = GroupExtensions.GetParentsAndSelfRecursive(parents, targetGroup);
                    if (andSelfRecursive.Count > 0)
                        return andSelfRecursive;
                    parents.Remove(subgroup);
                }
            }
            return (IList<IGroup>) new List<IGroup>();
        }
    }
}