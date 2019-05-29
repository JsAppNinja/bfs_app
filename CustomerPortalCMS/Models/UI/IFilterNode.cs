namespace CustomerPortalCMS.Models.UI
{
    public interface IFilterNode
    {
        void Accept(IFilterNodeVisitor visitor);
    }
}
