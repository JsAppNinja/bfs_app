using System;
using System.Collections.Generic;
using System.Linq;

namespace CustomerPortalCMS.Models.UI
{
    internal class Signature : IEquatable<Signature>
    {
        public DynamicProperty[] properties;
        public int hashCode;

        public Signature(IEnumerable<DynamicProperty> properties)
        {
            this.properties = properties.ToArray<DynamicProperty>();
            this.hashCode = 0;
            foreach (DynamicProperty property in properties)
                this.hashCode ^= property.Name.GetHashCode() ^ property.Type.GetHashCode();
        }

        public override int GetHashCode()
        {
            return this.hashCode;
        }

        public override bool Equals(object obj)
        {
            if (!(obj is Signature))
                return false;
            return this.Equals((Signature) obj);
        }

        public bool Equals(Signature other)
        {
            if (this.properties.Length != other.properties.Length)
                return false;
            for (int index = 0; index < this.properties.Length; ++index)
            {
                if (this.properties[index].Name != other.properties[index].Name ||
                    this.properties[index].Type != other.properties[index].Type)
                    return false;
            }
            return true;
        }
    }
}
