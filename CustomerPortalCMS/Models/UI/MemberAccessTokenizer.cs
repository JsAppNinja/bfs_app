using System;
using System.Collections.Generic;
using System.Linq;

namespace CustomerPortalCMS.Models.UI
{
    internal static class MemberAccessTokenizer
    {
        public static IEnumerable<CustomerPortalCMS.Models.UI.IMemberAccessToken> GetTokens(string memberPath)
        {
            string[] members = memberPath.Split(new char[2]
            {
                '.',
                '['
            }, StringSplitOptions.RemoveEmptyEntries);
            foreach (string str in members)
            {
                IndexerToken indexerToken;
                if (MemberAccessTokenizer.TryParseIndexerToken(str, out indexerToken))
                    yield return (IMemberAccessToken) indexerToken;
                else
                    yield return (IMemberAccessToken) new PropertyToken(str);
            }
        }

        private static bool TryParseIndexerToken(string member, out IndexerToken token)
        {
            token = (IndexerToken) null;
            if (!MemberAccessTokenizer.IsValidIndexer(member))
                return false;
            List<object> objectList = new List<object>();
            objectList.AddRange(MemberAccessTokenizer.ExtractIndexerArguments(member)
                .Select<string, object>((Func<string, object>) (a => MemberAccessTokenizer.ConvertIndexerArgument(a))));
            token = new IndexerToken((IEnumerable<object>) objectList);
            return true;
        }

        private static bool IsValidIndexer(string member)
        {
            return member.EndsWith("]", StringComparison.Ordinal);
        }

        private static IEnumerable<string> ExtractIndexerArguments(string member)
        {
            string args = member.TrimEnd(']');
            string str1 = args;
            char[] chArray = new char[1] {','};
            foreach (string str2 in str1.Split(chArray))
                yield return str2;
        }

        private static object ConvertIndexerArgument(string argument)
        {
            int result;
            if (int.TryParse(argument, out result))
                return (object) result;
            if (argument.StartsWith("\"", StringComparison.Ordinal))
                return (object) argument.Trim('"');
            if (!argument.StartsWith("'", StringComparison.Ordinal))
                return (object) argument;
            string str = argument.Trim('\'');
            if (str.Length == 1)
                return (object) str[0];
            return (object) str;
        }
    }
}