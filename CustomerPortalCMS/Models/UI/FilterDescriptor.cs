using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace CustomerPortalCMS.Models.UI
{
  /// <summary>Represents declarative filtering.</summary>
  public class FilterDescriptor : FilterDescriptorBase
  {
    public object ConvertedValue
    {
      get
      {
        return this.Value;
      }
    }

    /// <summary>
    /// Gets or sets the member name which will be used for filtering.
    /// </summary>
    /// <filterValue>The member that will be used for filtering.</filterValue>
    public string Member { get; set; }

    /// <summary>
    /// Gets or sets the type of the member that is used for filtering.
    /// Set this property if the member type cannot be resolved automatically.
    /// Such cases are: items with ICustomTypeDescriptor, XmlNode or DataRow.
    /// Changing this property did not raise
    /// </summary>
    /// <value>The type of the member used for filtering.</value>
    public Type MemberType { get; set; }

    /// <summary>Gets or sets the filter operator.</summary>
    /// <filterValue>The filter operator.</filterValue>
    public FilterOperator Operator { get; set; }

    /// <summary>Gets or sets the target filter value.</summary>
    /// <filterValue>The filter value.</filterValue>
    public object Value { get; set; }

    /// <summary>
    /// Initializes a new instance of the <see cref="T:FilterDescriptor" /> class.
    /// </summary>
    public FilterDescriptor()
      : this(string.Empty, FilterOperator.IsEqualTo, (object) null)
    {
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="T:FilterDescriptor" /> class.
    /// </summary>
    /// <param name="member">The member.</param>
    /// <param name="filterOperator">The filter operator.</param>
    /// <param name="filterValue">The filter value.</param>
    public FilterDescriptor(string member, FilterOperator filterOperator, object filterValue)
    {
      this.Member = member;
      this.Operator = filterOperator;
      this.Value = filterValue;
    }

    /// <summary>Creates a predicate filter expression.</summary>
    /// <param name="parameterExpression">The parameter expression, which will be used for filtering.</param>
    /// <returns>A predicate filter expression.</returns>
    protected override Expression CreateFilterExpression(ParameterExpression parameterExpression)
    {
      FilterDescriptorExpressionBuilder expressionBuilder = new FilterDescriptorExpressionBuilder(parameterExpression, this);
      expressionBuilder.Options.CopyFrom(this.ExpressionBuilderOptions);
      return expressionBuilder.CreateBodyExpression();
    }

    /// <summary>
    /// Determines whether the specified <paramref name="other" /> descriptor
    /// is equal to the current one.
    /// </summary>
    /// <param name="other">The other filter descriptor.</param>
    /// <returns>
    /// True if all members of the current descriptor are
    /// equal to the ones of <paramref name="other" />, otherwise false.
    /// </returns>
    public virtual bool Equals(FilterDescriptor other)
    {
      if (object.ReferenceEquals((object) null, (object) other))
        return false;
      if (object.ReferenceEquals((object) this, (object) other))
        return true;
      if (object.Equals((object) other.Operator, (object) this.Operator) && object.Equals((object) other.Member, (object) this.Member))
        return object.Equals(other.Value, this.Value);
      return false;
    }

    /// <summary>
    /// Determines whether the specified <paramref name="obj" />
    /// is equal to the current descriptor.
    /// </summary>
    public override bool Equals(object obj)
    {
      FilterDescriptor other = obj as FilterDescriptor;
      if (other == null)
        return false;
      return this.Equals(other);
    }

    /// <summary>Serves as a hash function for a particular type.</summary>
    /// <returns>A hash code for the current filter descriptor.</returns>
    public override int GetHashCode()
    {
      return (this.Operator.GetHashCode() * 397 ^ (this.Member != null ? this.Member.GetHashCode() : 0)) * 397 ^ (this.Value != null ? this.Value.GetHashCode() : 0);
    }

    protected override void Serialize(IDictionary<string, object> json)
    {
      base.Serialize(json);
      json["field"] = (object) this.Member;
      json["operator"] = (object) this.Operator.ToToken();
      if (this.Value != null && this.Value.GetType().GetNonNullableType().IsEnum)
      {
        Type underlyingType = Enum.GetUnderlyingType(this.Value.GetType().GetNonNullableType());
        json["value"] = Convert.ChangeType(this.Value, underlyingType);
      }
      else
        json["value"] = this.Value;
    }
  }
}
