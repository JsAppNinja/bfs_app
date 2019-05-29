using System;
using System.Collections.Generic;
using System.Text;

namespace CustomerPortalCMS.Models.UI
{
    public class FilterLexer
    {
        private static readonly string[] ComparisonOperators = new string[6]
        {
            "eq",
            "neq",
            "lt",
            "lte",
            "gt",
            "gte"
        };

        private static readonly string[] LogicalOperators = new string[3]
        {
            "and",
            "or",
            "not"
        };

        private static readonly string[] Booleans = new string[2]
        {
            "true",
            "false"
        };

        private static readonly string[] Functions = new string[5]
        {
            "contains",
            "endswith",
            "startswith",
            "notsubstringof",
            "doesnotcontain"
        };

        private const char Separator = '~';
        private int currentCharacterIndex;
        private readonly string input;

        public FilterLexer(string input)
        {
            input = input ?? string.Empty;
            this.input = input.Trim('~');
        }

        public IList<FilterToken> Tokenize()
        {
            List<FilterToken> filterTokenList = new List<FilterToken>();
            while (this.currentCharacterIndex < this.input.Length)
            {
                string result;
                if (this.TryParseIdentifier(out result))
                    filterTokenList.Add(this.Identifier(result));
                else if (this.TryParseNumber(out result))
                    filterTokenList.Add(FilterLexer.Number(result));
                else if (this.TryParseString(out result))
                    filterTokenList.Add(FilterLexer.String(result));
                else if (this.TryParseCharacter(out result, '('))
                    filterTokenList.Add(FilterLexer.LeftParenthesis(result));
                else if (this.TryParseCharacter(out result, ')'))
                {
                    filterTokenList.Add(FilterLexer.RightParenthesis(result));
                }
                else
                {
                    if (!this.TryParseCharacter(out result, ','))
                        throw new FilterParserException("Expected token");
                    filterTokenList.Add(FilterLexer.Comma(result));
                }
            }
            return (IList<FilterToken>) filterTokenList;
        }

        private static bool IsComparisonOperator(string value)
        {
            return Array.IndexOf<string>(FilterLexer.ComparisonOperators, value) > -1;
        }

        private static bool IsLogicalOperator(string value)
        {
            return Array.IndexOf<string>(FilterLexer.LogicalOperators, value) > -1;
        }

        private static bool IsBoolean(string value)
        {
            return Array.IndexOf<string>(FilterLexer.Booleans, value) > -1;
        }

        private static bool IsFunction(string value)
        {
            return Array.IndexOf<string>(FilterLexer.Functions, value) > -1;
        }

        private static FilterToken Comma(string result)
        {
            return new FilterToken()
            {
                TokenType = FilterTokenType.Comma,
                Value = result
            };
        }

        private static FilterToken Boolean(string result)
        {
            return new FilterToken()
            {
                TokenType = FilterTokenType.Boolean,
                Value = result
            };
        }

        private static FilterToken RightParenthesis(string result)
        {
            return new FilterToken()
            {
                TokenType = FilterTokenType.RightParenthesis,
                Value = result
            };
        }

        private static FilterToken LeftParenthesis(string result)
        {
            return new FilterToken()
            {
                TokenType = FilterTokenType.LeftParenthesis,
                Value = result
            };
        }

        private static FilterToken String(string result)
        {
            return new FilterToken()
            {
                TokenType = FilterTokenType.String,
                Value = result
            };
        }

        private static FilterToken Number(string result)
        {
            return new FilterToken()
            {
                TokenType = FilterTokenType.Number,
                Value = result
            };
        }

        private FilterToken Date(string result)
        {
            this.TryParseString(out result);
            return new FilterToken()
            {
                TokenType = FilterTokenType.DateTime,
                Value = result
            };
        }

        private static FilterToken ComparisonOperator(string result)
        {
            return new FilterToken()
            {
                TokenType = FilterTokenType.ComparisonOperator,
                Value = result
            };
        }

        private static FilterToken LogicalOperator(string result)
        {
            if (result == "or")
                return new FilterToken()
                {
                    TokenType = FilterTokenType.Or,
                    Value = result
                };
            if (result == "and")
                return new FilterToken()
                {
                    TokenType = FilterTokenType.And,
                    Value = result
                };
            return new FilterToken()
            {
                TokenType = FilterTokenType.Not,
                Value = result
            };
        }

        private static FilterToken Function(string result)
        {
            return new FilterToken()
            {
                TokenType = FilterTokenType.Function,
                Value = result
            };
        }

        private static FilterToken Property(string result)
        {
            return new FilterToken()
            {
                TokenType = FilterTokenType.Property,
                Value = result
            };
        }

        private FilterToken Identifier(string result)
        {
            if (result == "datetime")
                return this.Date(result);
            if (FilterLexer.IsComparisonOperator(result))
                return FilterLexer.ComparisonOperator(result);
            if (FilterLexer.IsLogicalOperator(result))
                return FilterLexer.LogicalOperator(result);
            if (FilterLexer.IsBoolean(result))
                return FilterLexer.Boolean(result);
            if (FilterLexer.IsFunction(result))
                return FilterLexer.Function(result);
            return FilterLexer.Property(result);
        }

        private void SkipSeparators()
        {
            char ch = this.Peek();
            while ((int) ch == 126)
                ch = this.Next();
        }

        private bool TryParseCharacter(out string character, char whatCharacter)
        {
            this.SkipSeparators();
            char ch = this.Peek();
            if ((int) ch != (int) whatCharacter)
            {
                character = (string) null;
                return false;
            }
            int num = (int) this.Next();
            character = ch.ToString();
            return true;
        }

        private bool TryParseString(out string @string)
        {
            this.SkipSeparators();
            if ((int) this.Peek() != 39)
            {
                @string = (string) null;
                return false;
            }
            this.Next();
            StringBuilder result = new StringBuilder();
            @string = this.Read((Func<char, bool>) (character =>
            {
                if ((int) character == (int) ushort.MaxValue)
                    throw new FilterParserException("Unterminated string");
                if ((int) character != 39 || (int) this.Peek(1) != 39)
                    return (int) character != 39;
                int num = (int) this.Next();
                return true;
            }), result);
            int num1 = (int) this.Next();
            return true;
        }

        private bool TryParseNumber(out string number)
        {
            this.SkipSeparators();
            char c = this.Peek();
            StringBuilder result = new StringBuilder();
            int decimalSymbols = 0;
            if ((int) c == 45 || (int) c == 43)
            {
                result.Append(c);
                c = this.Next();
            }
            if ((int) c == 46)
            {
                ++decimalSymbols;
                result.Append(c);
                c = this.Next();
            }
            if (!char.IsDigit(c))
            {
                number = (string) null;
                return false;
            }
            number = this.Read((Func<char, bool>) (character =>
            {
                if ((int) character != 46)
                    return char.IsDigit(character);
                if (decimalSymbols >= 1)
                    throw new FilterParserException("A number cannot have more than one decimal symbol");
                ++decimalSymbols;
                return true;
            }), result);
            return true;
        }

        private bool TryParseIdentifier(out string identifier)
        {
            this.SkipSeparators();
            char character1 = this.Peek();
            StringBuilder result = new StringBuilder();
            if (!FilterLexer.IsIdentifierStart(character1))
            {
                identifier = (string) null;
                return false;
            }
            result.Append(character1);
            int num = (int) this.Next();
            identifier = this.Read((Func<char, bool>) (character =>
            {
                if (!FilterLexer.IsIdentifierPart(character))
                    return (int) character == 46;
                return true;
            }), result);
            return true;
        }

        private static bool IsIdentifierPart(char character)
        {
            if (!char.IsLetter(character) && !char.IsDigit(character) && (int) character != 95)
                return (int) character == 36;
            return true;
        }

        private static bool IsIdentifierStart(char character)
        {
            if (!char.IsLetter(character) && (int) character != 95 && (int) character != 36)
                return (int) character == 64;
            return true;
        }

        private string Read(Func<char, bool> predicate, StringBuilder result)
        {
            for (char ch = this.Peek(); predicate(ch); ch = this.Next())
                result.Append(ch);
            return result.ToString();
        }

        private char Peek()
        {
            return this.Peek(0);
        }

        private char Peek(int chars)
        {
            if (this.currentCharacterIndex + chars < this.input.Length)
                return this.input[this.currentCharacterIndex + chars];
            return char.MaxValue;
        }

        private char Next()
        {
            ++this.currentCharacterIndex;
            return this.Peek();
        }
    }
}
