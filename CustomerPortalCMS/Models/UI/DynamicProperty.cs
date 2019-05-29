using System;

namespace CustomerPortalCMS.Models.UI
{
    public class DynamicProperty
    {
        private string name;
        private Type type;

        /// <exclude />
        /// <excludeToc />
        public string Name
        {
            get { return this.name; }
        }

        /// <exclude />
        /// <excludeToc />
        public Type Type
        {
            get { return this.type; }
        }

        /// <exclude />
        /// <excludeToc />
        public DynamicProperty(string name, Type type)
        {
            if (name == null)
                throw new ArgumentNullException("name");
            if (type == (Type) null)
                throw new ArgumentNullException("type");
            this.name = name;
            this.type = type;
        }
    }
}
