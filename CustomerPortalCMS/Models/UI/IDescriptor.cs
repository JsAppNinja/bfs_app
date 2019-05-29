namespace CustomerPortalCMS.Models.UI
{
    public interface IDescriptor
    {
        void Deserialize(string source);

        string Serialize();
    }
}
