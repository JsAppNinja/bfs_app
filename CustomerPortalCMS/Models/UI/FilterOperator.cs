namespace CustomerPortalCMS.Models.UI
{
    /// <summary>
    /// Operator used in <see cref="T:FilterDescriptor" />
    /// </summary>
    public enum FilterOperator
    {
        IsLessThan,
        IsLessThanOrEqualTo,
        IsEqualTo,
        IsNotEqualTo,
        IsGreaterThanOrEqualTo,
        IsGreaterThan,
        StartsWith,
        EndsWith,
        Contains,
        IsContainedIn,
        DoesNotContain,
    }
}
