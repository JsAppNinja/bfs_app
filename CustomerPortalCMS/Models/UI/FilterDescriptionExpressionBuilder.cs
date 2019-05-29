using System;
using System.Linq.Expressions;
using System.Reflection;

namespace CustomerPortalCMS.Models.UI
{
    internal class FilterDescriptionExpressionBuilder : FilterExpressionBuilder
    {
        private readonly FilterDescription filterDescription;

        public FilterDescription FilterDescription
        {
            get { return this.filterDescription; }
        }

        private Expression FilterDescriptionExpression
        {
            get { return (Expression) Expression.Constant((object) this.filterDescription); }
        }

        private MethodInfo SatisfiesFilterMethodInfo
        {
            get
            {
                return this.filterDescription.GetType()
                    .GetMethod("SatisfiesFilter", new Type[1]
                    {
                        typeof(object)
                    });
            }
        }

        public FilterDescriptionExpressionBuilder(ParameterExpression parameterExpression,
            FilterDescription filterDescription)
            : base(parameterExpression)
        {
            this.filterDescription = filterDescription;
        }

        public override Expression CreateBodyExpression()
        {
            if (this.filterDescription.IsActive)
                return this.CreateActiveFilterExpression();
            return ExpressionConstants.TrueLiteral;
        }

        protected virtual Expression CreateActiveFilterExpression()
        {
            return (Expression) this.CreateSatisfiesFilterExpression();
        }

        private MethodCallExpression CreateSatisfiesFilterExpression()
        {
            Expression expression = (Expression) this.ParameterExpression;
            if (expression.Type.IsValueType)
                expression = (Expression) Expression.Convert(expression, typeof(object));
            return Expression.Call(this.FilterDescriptionExpression, this.SatisfiesFilterMethodInfo, new Expression[1]
            {
                expression
            });
        }
    }
}