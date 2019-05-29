using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Ajax.Utilities;

namespace CustomerPortalCMS.Models
{      
    public class KendoGridFilterCollection
    {
        public List<KendoGridFilter> Filters { get; private set; } = new List<KendoGridFilter>();
        public StringBuilder QueryString { get; set; } = new StringBuilder();

        public KendoGridFilterCollection(string filter)
        {
            // prepend all active users
            // should probably make this a checkbox option defaulted on
            // QueryString.Append("active = true ");

            if (!filter.IsNullOrWhiteSpace() && filter.Contains("~"))
            {
                string[] parsed = filter.Split('~').Where(o => !o.Contains("and")).ToArray();
                bool isCompound = false, closeParen = false;
                int i = 0, arg = 0;
                while (i < parsed.Length)
                {
                    if (!closeParen && QueryString.Length > 0)
                        QueryString.Append(" AND ");

                    if (parsed[i].StartsWith("("))
                    {
                        isCompound = true;
                        parsed[i] = parsed[i].Remove(0, 1);
                        QueryString.Append(" ( ");
                    }
                    if (!isCompound && !closeParen && i + 3 < parsed.Length)
                    {
                        if (parsed[i + 3] == "or")
                        {
                            isCompound = true;
                            QueryString.Append(" ( ");
                        }
                    }

                    QueryString.Append(parsed[i]);
                    switch (parsed[i+1])
                    {
                        case "eq":
                            QueryString.AppendFormat(" = @{0} ", arg++);
                            break;
                        case "startswith":
                            QueryString.AppendFormat(".StartsWith(@{0}) ", arg++);
                            break;
                        case "contains":
                            QueryString.AppendFormat(".Contains(@{0}) ", arg++);
                            break;
                        case "endswith":
                            QueryString.AppendFormat(".EndsWith(@{0}) ", arg++);
                            break;
                    }
                    if (!isCompound && closeParen)
                    {
                        QueryString.Append(" ) ");
                        closeParen = false;
                        parsed[i + 2] = parsed[i + 2].Replace(")", string.Empty);
                    }

                    var item = new KendoGridFilter();
                    Filters.Add(item);
                    item.Field = parsed[i];
                    item.Operator = parsed[i + 1];
                    item.Value = parsed[i + 2].Replace("\'", string.Empty);
                    if (isCompound)
                    {
                        QueryString.AppendFormat(" {0} ", parsed[i + 3].ToUpper());
                        item.Compound = true;
                        i += 4;
                        isCompound = false;
                        closeParen = !closeParen;
                    }
                    else
                        i += 3;
                }
            }
        }
    }

    public class KendoGridFilter
    {
        public string Field { get; set; }
        public string Operator { get; set; }
        public string Value { get; set; }
        public bool Compound { get; set; }
        public bool IsAnd { get; set; }
    }

    public enum KendoFilterOperations
    {
        Equals,
        NotEquals,
        Greater,
        GreaterOrEquals,
        LessThan,
        LessThanOrEquals,
        StartsWith,
        EndsWith,
        Contains,
        NotContains,
    }

}