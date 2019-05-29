using System.Text.RegularExpressions;
using System.Web.Security;

namespace CustomerPortalCMS.Helpers
{

    // Helper class to check a password's compliance with security policy.
    // Currently set to:
    // Minimum length of 8 characters.
    // Must have at least 1 upper case character, 1 lower case character, 1 number and 1 special character
    // courtesy of Srinivasan Raj from article @ https://www.codeproject.com/Tips/222203/Customizable-Password-Policy-Csharp
    public static class PasswordPolicy
    {
        private static int minLength = 10;
        private static int upperCaseLength = 1;
        private static int lowerCaseLength = 1;
        private static int nonAlphaLength = 1;
        private static int numericLength = 1;

        public static int MinLength { get { return minLength; } }
        public static int UpperCaseLength { get { return upperCaseLength; } }
        public static int LowerCaseLength { get { return lowerCaseLength; } }
        public static int NonAlphaLength { get { return nonAlphaLength; } }
        public static int NumericLength { get { return numericLength; } }

        /// <summary>
        /// Validates that the given password conforms to policy.
        /// </summary>
        /// <param name="Password"></param>
        /// <returns></returns>
        public static bool IsValid(string Password)
        {
            if (Password.Length < minLength)
                return false;
            if (UpperCaseCount(Password) < upperCaseLength)
                return false;
            if (LowerCaseCount(Password) < lowerCaseLength)
                return false;
            if (NumericCount(Password) < numericLength)
                return false;
            if (NonAlphaCount(Password) < nonAlphaLength)
                return false;
            return true;
        }

        /// <summary>
        /// Generates a password that complies with current password policy.
        /// </summary>
        /// <returns></returns>
        public static string GenerateCompliantPassword()
        {
            string password = string.Empty;
            // ok this is slightly dangerous, but wth
            do
            {
                password = Membership.GeneratePassword(minLength, nonAlphaLength);
            } while (!IsValid(password));

            return password;
        }

        /// <summary>
        /// Returns a simple string that explains the current password policy requirements.
        /// </summary>
        /// <returns></returns>
        public static string ExplainCurrentPolicy()
        {
            return $"Password must be at least {minLength} characters in length, and contain at least {upperCaseLength} upper cased character, at least {lowerCaseLength} lower cased character, at least {numericLength} number, and at least {nonAlphaLength} special character.";
        }

        private static int UpperCaseCount(string Password)
        {
            return Regex.Matches(Password, "[A-Z]").Count;
        }
        private static int LowerCaseCount(string Password)
        {
            return Regex.Matches(Password, "[a-z]").Count;
        }
        private static int NumericCount(string Password)
        {
            return Regex.Matches(Password, "[0-9]").Count;
        }
        private static int NonAlphaCount(string Password)
        {
            return Regex.Matches(Password, @"[^0-9a-zA-Z\._]").Count;
        }
    }
}