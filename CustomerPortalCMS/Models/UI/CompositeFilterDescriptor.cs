using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace CustomerPortalCMS.Models.UI
{
    /// <summary>
    /// Represents a filtering descriptor which serves as a container for one or more child filtering descriptors.
    /// </summary>
    public class CompositeFilterDescriptor : FilterDescriptorBase
    {
        private FilterDescriptorCollection filterDescriptors;

        /// <summary>
        /// Gets or sets the logical operator used for composing of <see cref="P:CustomerPortalCMS.Models.UI.CompositeFilterDescriptor.FilterDescriptors" />.
        /// </summary>
        /// <value>The logical operator used for composition.</value>
        public FilterCompositionLogicalOperator LogicalOperator { get; set; }

        /// <summary>
        /// Gets or sets the filter descriptors that will be used for composition.
        /// </summary>
        /// <value>The filter descriptors used for composition.</value>
        public FilterDescriptorCollection FilterDescriptors
        {
            get
            {
                if (this.filterDescriptors == null)
                    this.SetFilterDescriptors(new FilterDescriptorCollection());
                return this.filterDescriptors;
            }
            set
            {
                if (this.filterDescriptors == value)
                    return;
                this.SetFilterDescriptors(value);
            }
        }

        /// <summary>
        /// Creates a predicate filter expression combining <see cref="P:CustomerPortalCMS.Models.UI.CompositeFilterDescriptor.FilterDescriptors" />
        /// expressions with <see cref="P:CustomerPortalCMS.Models.UI.CompositeFilterDescriptor.LogicalOperator" />.
        /// </summary>
        /// <param name="parameterExpression">The parameter expression, which will be used for filtering.</param>
        /// <returns>A predicate filter expression.</returns>
        protected override Expression CreateFilterExpression(ParameterExpression parameterExpression)
        {
            FilterDescriptorCollectionExpressionBuilder expressionBuilder =
                new FilterDescriptorCollectionExpressionBuilder(parameterExpression,
                    (IEnumerable<IFilterDescriptor>) this.FilterDescriptors, this.LogicalOperator);
            expressionBuilder.Options.CopyFrom(this.ExpressionBuilderOptions);
            return expressionBuilder.CreateBodyExpression();
        }

        private void SetFilterDescriptors(FilterDescriptorCollection value)
        {
            FilterDescriptorCollection filterDescriptors = this.filterDescriptors;
            this.filterDescriptors = value;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            base.Serialize(json);
            json["logic"] = (object) this.LogicalOperator.ToString().ToLowerInvariant();
            if (!this.FilterDescriptors.Any<IFilterDescriptor>())
                return;
            json["filters"] = (object) this.FilterDescriptors.OfType<JsonObject>().ToJson();
        }
    }
}
