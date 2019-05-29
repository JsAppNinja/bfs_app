using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Web.Script.Serialization;

namespace CustomerPortalCMS.Models.UI
{
    [KnownType(typeof(AggregateFunctionsGroup))]
    public class AggregateFunctionsGroup : Group
    {
        /// <summary>
        /// Gets or sets the aggregate functions projection for this group.
        /// This projection is used to generate aggregate functions results for this group.
        /// </summary>
        /// <value>The aggregate functions projection.</value>
        [ScriptIgnore]
        public object AggregateFunctionsProjection { get; set; }

        public IDictionary<string, object> Aggregates
        {
            get
            {
                if (this.AggregateFunctionsProjection != null)
                    return (IDictionary<string, object>) AggregateFunctionsGroup
                        .ExtractPropertyValues(this.AggregateFunctionsProjection)
                        .GroupBy<KeyValuePair<string, object>, string>(
                            (Func<KeyValuePair<string, object>, string>) (entry =>
                            {
                                int num = entry.Key.IndexOf('_');
                                return entry.Key.Substring(num + 1, entry.Key.LastIndexOf('_') - num - 1);
                            }))
                        .ToDictionary<IGrouping<string, KeyValuePair<string, object>>, string, object>(
                            (Func<IGrouping<string, KeyValuePair<string, object>>, string>) (g => g.Key),
                            (Func<IGrouping<string, KeyValuePair<string, object>>, object>) (g => (object) g
                                .ToDictionary<KeyValuePair<string, object>, string, object>(
                                    (Func<KeyValuePair<string, object>, string>) (entry => ((IEnumerable<string>) entry
                                        .Key.Split('_')).First<string>()),
                                    (Func<KeyValuePair<string, object>, object>) (entry => entry.Value))));
                return (IDictionary<string, object>) new Dictionary<string, object>();
            }
        }

        /// <summary>
        /// Gets the aggregate results generated for the given aggregate functions.
        /// </summary>
        /// <value>The aggregate results for the provided aggregate functions.</value>
        /// <exception cref="T:System.ArgumentNullException"><c>functions</c> is null.</exception>
        public AggregateResultCollection GetAggregateResults(IEnumerable<AggregateFunction> functions)
        {
            if (functions == null)
                throw new ArgumentNullException("functions");
            AggregateResultCollection instance = new AggregateResultCollection();
            if (this.AggregateFunctionsProjection == null)
                return instance;
            IDictionary<string, object> propertyValues =
                AggregateFunctionsGroup.ExtractPropertyValues(this.AggregateFunctionsProjection);
            IEnumerable<AggregateResult> forPropertyValues =
                AggregateFunctionsGroup.CreateAggregateResultsForPropertyValues(functions, propertyValues);
            instance.AddRange<AggregateResult>(forPropertyValues);
            return instance;
        }

        private static IEnumerable<AggregateResult> CreateAggregateResultsForPropertyValues(
            IEnumerable<AggregateFunction> functions, IDictionary<string, object> propertyValues)
        {
            foreach (AggregateFunction function in functions)
            {
                string propertyName = function.FunctionName;
                if (propertyValues.ContainsKey(propertyName))
                {
                    object value = propertyValues[propertyName];
                    AggregateResult result = new AggregateResult(value, function);
                    yield return result;
                }
            }
        }

        private static IDictionary<string, object> ExtractPropertyValues(object obj)
        {
            return (IDictionary<string, object>) ((IEnumerable<PropertyInfo>) obj.GetType().GetProperties()).Select(
                    p => new
                    {
                        p = p,
                        value = p.GetValue(obj, (object[]) null)
                    })
                .Select(param0 => new
                {
                    Key = param0.p.Name,
                    Value = param0.value
                })
                .ToDictionary(pair => pair.Key, pair => pair.Value);
        }
    }
}
