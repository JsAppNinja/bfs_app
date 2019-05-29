using System;
using System.Collections.Generic;
using System.Linq;

namespace CustomerPortalCMS.Models.UI
{
    internal static class FilterDescriptorExtensions
    {
        internal static bool IsActive(this FilterDescriptor filter)
        {
            object obj = filter.Value;
            if (obj == null)
                return false;
            string str = obj as string;
            if (str != null)
                return !string.IsNullOrEmpty(str);
            return true;
        }

        internal static IEnumerable<FilterDescriptor> SelectMemberDescriptors(
            this IEnumerable<IFilterDescriptor> descriptors)
        {
            return descriptors
                .SelectRecursive<IFilterDescriptor>(
                    (Func<IFilterDescriptor, IEnumerable<IFilterDescriptor>>) (f => FilterDescriptorExtensions
                        .GetChildDescriptors(f)))
                .OfType<FilterDescriptor>();
        }

        private static IEnumerable<IFilterDescriptor> GetChildDescriptors(IFilterDescriptor f)
        {
            if (f is CompositeFilterDescriptor)
                return (IEnumerable<IFilterDescriptor>) ((CompositeFilterDescriptor) f).FilterDescriptors;
            return (IEnumerable<IFilterDescriptor>) null;
        }

        internal static void SetMemberTypeFrom(this FilterDescriptor descriptor, object item)
        {
            if (!descriptor.Member.HasValue())
                return;
            descriptor.MemberType = BindingHelper.ExtractMemberTypeFromObject(item, descriptor.Member);
        }

        internal static IEnumerable<IFilterDescriptor> SetMemberTypeFrom(
            this IEnumerable<IFilterDescriptor> descriptors, object item)
        {
            if (item != null)
                descriptors.SelectMemberDescriptors()
                    .Each<FilterDescriptor>((Action<FilterDescriptor>) (f => f.SetMemberTypeFrom(item)));
            return descriptors;
        }
    }
}
