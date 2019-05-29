using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace CustomerPortalCMS.Models.UI
{
    public static class ModelStateExtensions
    {
        public static object ToDataSourceResult(this ModelStateDictionary modelState)
        {
            if (!modelState.IsValid)
                return (object) new
                {
                    Errors = modelState.SerializeErrors()
                };
            return new object();
        }

        public static object SerializeErrors(this ModelStateDictionary modelState)
        {
            return (object) ((IEnumerable<KeyValuePair<string, ModelState>>) modelState)
                .Where<KeyValuePair<string, ModelState>>(
                    (Func<KeyValuePair<string, ModelState>, bool>) (entry => ((IEnumerable<ModelError>) entry.Value
                        .Errors).Any<ModelError>()))
                .ToDictionary<KeyValuePair<string, ModelState>, string, Dictionary<string, object>>(
                    (Func<KeyValuePair<string, ModelState>, string>) (entry => entry.Key),
                    (Func<KeyValuePair<string, ModelState>, Dictionary<string, object>>) (entry => ModelStateExtensions
                        .SerializeModelState(entry.Value)));
        }

        private static Dictionary<string, object> SerializeModelState(ModelState modelState)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            dictionary["errors"] = (object) ((IEnumerable<ModelError>) modelState.Errors)
                .Select<ModelError, string>(
                    (Func<ModelError, string>) (error => ModelStateExtensions.GetErrorMessage(error, modelState)))
                .ToArray<string>();
            return dictionary;
        }

        private static string GetErrorMessage(ModelError error, ModelState modelState)
        {
            if (error.ErrorMessage.HasValue() || modelState.Value == null)
                return error.ErrorMessage;
            return Exceptions.ValueNotValidForProperty.FormatWith((object) modelState.Value.AttemptedValue);
        }
    }
}
