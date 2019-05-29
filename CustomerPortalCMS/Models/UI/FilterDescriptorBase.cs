using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace CustomerPortalCMS.Models.UI
{
    /// <summary>
    /// Base class for all <see cref="T:IFilterDescriptor" /> used for
    /// handling the logic for property changed notifications.
    /// </summary>
    public class FilterDescriptorBase : JsonObject, IFilterDescriptor
    {
        private ExpressionBuilderOptions options;

        internal ExpressionBuilderOptions ExpressionBuilderOptions
        {
            get
            {
                if (this.options == null)
                    this.options = new ExpressionBuilderOptions();
                return this.options;
            }
        }

        /// <summary>
        /// Creates a filter expression by delegating its creation to
        /// <see cref="M:FilterDescriptorBase.CreateFilterExpression(System.Linq.Expressions.ParameterExpression)" />, if
        /// <paramref name="instance" /> is <see cref="T:System.Linq.Expressions.ParameterExpression" />, otherwise throws <see cref="T:System.ArgumentException" />
        /// </summary>
        /// <param name="instance">The instance expression, which will be used for filtering.</param>
        /// <returns>A predicate filter expression.</returns>
        /// <exception cref="T:System.ArgumentException">Parameter should be of type <see cref="T:System.Linq.Expressions.ParameterExpression" /></exception>
        public virtual Expression CreateFilterExpression(Expression instance)
        {
            ParameterExpression parameterExpression = instance as ParameterExpression;
            if (parameterExpression == null)
                throw new ArgumentException("Parameter should be of type ParameterExpression", "instance");
            return this.CreateFilterExpression(parameterExpression);
        }

        /// <summary>
        /// Creates a predicate filter expression used for collection filtering.
        /// </summary>
        /// <param name="parameterExpression">The parameter expression, which will be used for filtering.</param>
        /// <returns>A predicate filter expression.</returns>
        protected virtual Expression CreateFilterExpression(ParameterExpression parameterExpression)
        {
            return (Expression)parameterExpression;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
        }
    }
}