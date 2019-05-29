using System.CodeDom.Compiler;
using System.ComponentModel;
using System.Diagnostics;
using System.Globalization;
using System.Resources;
using System.Runtime.CompilerServices;

namespace CustomerPortalCMS.Models.UI
{
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    [DebuggerNonUserCode]
    [CompilerGenerated]
    [GeneratedCode("System.Resources.Tools.StronglyTypedResourceBuilder", "4.0.0.0")]
    internal class Exceptions
    {
        private static ResourceManager resourceMan;
        private static CultureInfo resourceCulture;

        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Advanced)]
        internal static ResourceManager ResourceManager
        {
            get
            {
                if (object.ReferenceEquals((object) Exceptions.resourceMan, (object) null))
                    Exceptions.resourceMan =
                        new ResourceManager("CustomerPortalCMS.Models.UI.Exceptions", typeof(Exceptions).Assembly);
                return Exceptions.resourceMan;
            }
        }

        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Advanced)]
        internal static CultureInfo Culture
        {
            get { return Exceptions.resourceCulture; }
            set { Exceptions.resourceCulture = value; }
        }

        /// <summary>
        ///   Looks up a localized string similar to AllowCopy requires any Selectable mode to be enabled.
        /// </summary>
        internal static string AllowCopyRequiresSelectable
        {
            get
            {
                return Exceptions.ResourceManager.GetString("AllowCopyRequiresSelectable", Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to "{0}" array cannot be empty..
        /// </summary>
        internal static string ArrayCannotBeEmpty
        {
            get { return Exceptions.ResourceManager.GetString("ArrayCannotBeEmpty", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to You must use InCell edit mode for batch updates..
        /// </summary>
        internal static string BatchUpdatesRequireInCellMode
        {
            get
            {
                return Exceptions.ResourceManager.GetString("BatchUpdatesRequireInCellMode",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to The Update data binding setting is required for batch updates. Please specify the Update action or url in the DataBinding configuration..
        /// </summary>
        internal static string BatchUpdatesRequireUpdate
        {
            get
            {
                return Exceptions.ResourceManager.GetString("BatchUpdatesRequireUpdate", Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to "{0}" cannot be negative..
        /// </summary>
        internal static string CannotBeNegative
        {
            get { return Exceptions.ResourceManager.GetString("CannotBeNegative", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to "{0}" cannot be negative or zero..
        /// </summary>
        internal static string CannotBeNegativeOrZero
        {
            get { return Exceptions.ResourceManager.GetString("CannotBeNegativeOrZero", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to "{0}" cannot be null..
        /// </summary>
        internal static string CannotBeNull
        {
            get { return Exceptions.ResourceManager.GetString("CannotBeNull", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to "{0}" cannot be null or empty..
        /// </summary>
        internal static string CannotBeNullOrEmpty
        {
            get { return Exceptions.ResourceManager.GetString("CannotBeNullOrEmpty", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Cannot find a public property of primitive type to sort by..
        /// </summary>
        internal static string CannotFindPropertyToSortBy
        {
            get
            {
                return Exceptions.ResourceManager.GetString("CannotFindPropertyToSortBy", Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Cannot have more one column in order when sort mode is set to single column..
        /// </summary>
        internal static string CannotHaveMoreOneColumnInOrderWhenSortModeIsSetToSingleColumn
        {
            get
            {
                return Exceptions.ResourceManager.GetString(
                    "CannotHaveMoreOneColumnInOrderWhenSortModeIsSetToSingleColumn", Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Cannot route to class named 'Controller'..
        /// </summary>
        internal static string CannotRouteToClassNamedController
        {
            get
            {
                return Exceptions.ResourceManager.GetString("CannotRouteToClassNamedController",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Cannot set AutoBind if widget is populated during initialization.
        /// </summary>
        internal static string CannotSetAutoBindIfBoundDuringInitialization
        {
            get
            {
                return Exceptions.ResourceManager.GetString("CannotSetAutoBindIfBoundDuringInitialization",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Cannot use Ajax and WebService binding at the same time..
        /// </summary>
        internal static string CannotUseAjaxAndWebServiceAtTheSameTime
        {
            get
            {
                return Exceptions.ResourceManager.GetString("CannotUseAjaxAndWebServiceAtTheSameTime",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Cannot use both Detail template and locked columns.
        /// </summary>
        internal static string CannotUseDetailTemplateAndLockedColumns
        {
            get
            {
                return Exceptions.ResourceManager.GetString("CannotUseDetailTemplateAndLockedColumns",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Locked columns are not supported in server binding mode.
        /// </summary>
        internal static string CannotUseLockedColumnsAndServerBinding
        {
            get
            {
                return Exceptions.ResourceManager.GetString("CannotUseLockedColumnsAndServerBinding",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Cannot use PushState with server navigation..
        /// </summary>
        internal static string CannotUsePushStateWithServerNavigation
        {
            get
            {
                return Exceptions.ResourceManager.GetString("CannotUsePushStateWithServerNavigation",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Cannot use both Row template and locked columns.
        /// </summary>
        internal static string CannotUseRowTemplateAndLockedColumns
        {
            get
            {
                return Exceptions.ResourceManager.GetString("CannotUseRowTemplateAndLockedColumns",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Cannot use only server templates in Ajax or WebService binding mode. Please specify a client template as well..
        /// </summary>
        internal static string CannotUseTemplatesInAjaxOrWebService
        {
            get
            {
                return Exceptions.ResourceManager.GetString("CannotUseTemplatesInAjaxOrWebService",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Cannot use Virtual Scroll with Server binding..
        /// </summary>
        internal static string CannotUseVirtualScrollWithServerBinding
        {
            get
            {
                return Exceptions.ResourceManager.GetString("CannotUseVirtualScrollWithServerBinding",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to "{0}" collection cannot be empty..
        /// </summary>
        internal static string CollectionCannotBeEmpty
        {
            get { return Exceptions.ResourceManager.GetString("CollectionCannotBeEmpty", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///    Looks up a localized string similar to Multiple types were found that match the controller named '{0}'. This can happen if the route that services this request does not specify namespaces to search for a controller that matches the request. If this is the case, register this route by calling an overload of the 'MapRoute' method that takes a 'namespaces' parameter.
        /// 
        /// The request for '{0}' has found the following matching controllers:{1}.
        ///  </summary>
        internal static string ControllerNameAmbiguousWithoutRouteUrl
        {
            get
            {
                return Exceptions.ResourceManager.GetString("ControllerNameAmbiguousWithoutRouteUrl",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///    Looks up a localized string similar to Multiple types were found that match the controller named '{0}'. This can happen if the route that services this request ('{1}') does not specify namespaces to search for a controller that matches the request. If this is the case, register this route by calling an overload of the 'MapRoute' method that takes a 'namespaces' parameter.
        /// 
        /// The request for '{0}' has found the following matching controllers:{2}.
        ///  </summary>
        internal static string ControllerNameAmbiguousWithRouteUrl
        {
            get
            {
                return Exceptions.ResourceManager.GetString("ControllerNameAmbiguousWithRouteUrl",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Controller name must end with 'Controller'..
        /// </summary>
        internal static string ControllerNameMustEndWithController
        {
            get
            {
                return Exceptions.ResourceManager.GetString("ControllerNameMustEndWithController",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Custom command routes is available only for server binding..
        /// </summary>
        internal static string CustomCommandRoutesWithAjaxBinding
        {
            get
            {
                return Exceptions.ResourceManager.GetString("CustomCommandRoutesWithAjaxBinding",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to There is no DataSource Model Id property specified..
        /// </summary>
        internal static string DataKeysEmpty
        {
            get { return Exceptions.ResourceManager.GetString("DataKeysEmpty", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to DataTable InLine editing and custom EditorTemplate per column is not supported.
        /// </summary>
        internal static string DataTableInLineEditingWithCustomEditorTemplates
        {
            get
            {
                return Exceptions.ResourceManager.GetString("DataTableInLineEditingWithCustomEditorTemplates",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to You must specify TemplateName when PopUp edit mode is enabled with DataTable binding.
        /// </summary>
        internal static string DataTablePopUpTemplate
        {
            get { return Exceptions.ResourceManager.GetString("DataTablePopUpTemplate", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to The Delete data binding setting is required by the delete command. Please specify the Delete action or url in the DataBinding configuration..
        /// </summary>
        internal static string DeleteCommandRequiresDelete
        {
            get
            {
                return Exceptions.ResourceManager.GetString("DeleteCommandRequiresDelete", Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to The Update data binding setting is required by the edit command. Please specify the Update action or url in the DataBinding configuration..
        /// </summary>
        internal static string EditCommandRequiresUpdate
        {
            get
            {
                return Exceptions.ResourceManager.GetString("EditCommandRequiresUpdate", Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Excel export is not supported in server binding mode..
        /// </summary>
        internal static string ExcelExportNotSupportedInServerBinding
        {
            get
            {
                return Exceptions.ResourceManager.GetString("ExcelExportNotSupportedInServerBinding",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to {0} should not be bigger then {1}..
        /// </summary>
        internal static string FirstPropertyShouldNotBeBiggerThenSecondProperty
        {
            get
            {
                return Exceptions.ResourceManager.GetString("FirstPropertyShouldNotBeBiggerThenSecondProperty",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Group with specified name already exists..
        /// </summary>
        internal static string GroupWithSpecifiedNameAlreadyExists
        {
            get
            {
                return Exceptions.ResourceManager.GetString("GroupWithSpecifiedNameAlreadyExists",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Group with specified name "{0}" already exists. Please specify a different name..
        /// </summary>
        internal static string GroupWithSpecifiedNameAlreadyExistsPleaseSpecifyADifferentName
        {
            get
            {
                return Exceptions.ResourceManager.GetString(
                    "GroupWithSpecifiedNameAlreadyExistsPleaseSpecifyADifferentName", Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Group with "{0}" does not exist in {1} SharedWebAssets..
        /// </summary>
        internal static string GroupWithSpecifiedNameDoesNotExistInAssetTypeOfSharedWebAssets
        {
            get
            {
                return Exceptions.ResourceManager.GetString(
                    "GroupWithSpecifiedNameDoesNotExistInAssetTypeOfSharedWebAssets", Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Group with specified name "{0}" does not exist. Please make sure you have specified a correct name..
        /// </summary>
        internal static string GroupWithSpecifiedNameDoesNotExistPleaseMakeSureYouHaveSpecifiedACorrectName
        {
            get
            {
                return Exceptions.ResourceManager.GetString(
                    "GroupWithSpecifiedNameDoesNotExistPleaseMakeSureYouHaveSpecifiedACorrectName",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to InCell editing mode is not supported in server binding mode.
        /// </summary>
        internal static string InCellModeNotSupportedInServerBinding
        {
            get
            {
                return Exceptions.ResourceManager.GetString("InCellModeNotSupportedInServerBinding",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to InCell editing mode is not supported when ClientRowTemplate is used.
        /// </summary>
        internal static string InCellModeNotSupportedWithRowTemplate
        {
            get
            {
                return Exceptions.ResourceManager.GetString("InCellModeNotSupportedWithRowTemplate",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Provided index is out of range..
        /// </summary>
        internal static string IndexOutOfRange
        {
            get { return Exceptions.ResourceManager.GetString("IndexOutOfRange", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to The Insert data binding setting is required by the insert command. Please specify the Insert action or url in the DataBinding configuration..
        /// </summary>
        internal static string InsertCommandRequiresInsert
        {
            get
            {
                return Exceptions.ResourceManager.GetString("InsertCommandRequiresInsert", Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Item with specified source already exists..
        /// </summary>
        internal static string ItemWithSpecifiedSourceAlreadyExists
        {
            get
            {
                return Exceptions.ResourceManager.GetString("ItemWithSpecifiedSourceAlreadyExists",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Local group with name "{0}" already exists..
        /// </summary>
        internal static string LocalGroupWithSpecifiedNameAlreadyExists
        {
            get
            {
                return Exceptions.ResourceManager.GetString("LocalGroupWithSpecifiedNameAlreadyExists",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to The key with the following name "{0}" was not found. Please update all localization files..
        /// </summary>
        internal static string LocalizationKeyNotFound
        {
            get { return Exceptions.ResourceManager.GetString("LocalizationKeyNotFound", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Bound columns require a field or property access expression..
        /// </summary>
        internal static string MemberExpressionRequired
        {
            get { return Exceptions.ResourceManager.GetString("MemberExpressionRequired", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to {0} should be less than {1}..
        /// </summary>
        internal static string MinPropertyMustBeLessThenMaxProperty
        {
            get
            {
                return Exceptions.ResourceManager.GetString("MinPropertyMustBeLessThenMaxProperty",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Name cannot be blank..
        /// </summary>
        internal static string NameCannotBeBlank
        {
            get { return Exceptions.ResourceManager.GetString("NameCannotBeBlank", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Name cannot contain spaces..
        /// </summary>
        internal static string NameCannotContainSpaces
        {
            get { return Exceptions.ResourceManager.GetString("NameCannotContainSpaces", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to "None" is only used for internal purpose..
        /// </summary>
        internal static string NoneIsOnlyUsedForInternalPurpose
        {
            get
            {
                return Exceptions.ResourceManager.GetString("NoneIsOnlyUsedForInternalPurpose",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Only one ScriptRegistrar is allowed in a single request..
        /// </summary>
        internal static string OnlyOneScriptRegistrarIsAllowedInASingleRequest
        {
            get
            {
                return Exceptions.ResourceManager.GetString("OnlyOneScriptRegistrarIsAllowedInASingleRequest",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Only one StyleSheetRegistrar is allowed in a single request..
        /// </summary>
        internal static string OnlyOneStyleSheetRegistrarIsAllowedInASingleRequest
        {
            get
            {
                return Exceptions.ResourceManager.GetString("OnlyOneStyleSheetRegistrarIsAllowedInASingleRequest",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Only property and field expressions are supported.
        /// </summary>
        internal static string OnlyPropertyAndFieldExpressionsAreSupported
        {
            get
            {
                return Exceptions.ResourceManager.GetString("OnlyPropertyAndFieldExpressionsAreSupported",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>Looks up a localized string similar to of {0}.</summary>
        internal static string Pager_Of
        {
            get { return Exceptions.ResourceManager.GetString("Pager_Of", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Paging must be enabled to use PageOnScroll..
        /// </summary>
        internal static string PagingMustBeEnabledToUsePageOnScroll
        {
            get
            {
                return Exceptions.ResourceManager.GetString("PagingMustBeEnabledToUsePageOnScroll",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to The {0} must be bigger then 0..
        /// </summary>
        internal static string PropertyMustBeBiggerThenZero
        {
            get
            {
                return Exceptions.ResourceManager.GetString("PropertyMustBeBiggerThenZero", Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to {0} must be positive number..
        /// </summary>
        internal static string PropertyMustBePositiveNumber
        {
            get
            {
                return Exceptions.ResourceManager.GetString("PropertyMustBePositiveNumber", Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to {0} should be bigger than {1} and less then {2}.
        /// </summary>
        internal static string PropertyShouldBeInRange
        {
            get { return Exceptions.ResourceManager.GetString("PropertyShouldBeInRange", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to The "{0}" class is no longer supported. To enable RTL support you must include telerik.rtl.css and apply the "t-rtl" class to a parent HTML element or the &lt;body&gt;..
        /// </summary>
        internal static string Rtl
        {
            get { return Exceptions.ResourceManager.GetString("Rtl", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Scrolling must be enabled to use PageOnScroll..
        /// </summary>
        internal static string ScrollingMustBeEnabledToUsePageOnScroll
        {
            get
            {
                return Exceptions.ResourceManager.GetString("ScrollingMustBeEnabledToUsePageOnScroll",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to You must have SiteMap defined with key "{0}" in ViewData dictionary..
        /// </summary>
        internal static string SiteMapShouldBeDefinedInViewData
        {
            get
            {
                return Exceptions.ResourceManager.GetString("SiteMapShouldBeDefinedInViewData",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Source must be a virtual path which should starts with "~/".
        /// </summary>
        internal static string SourceMustBeAVirtualPathWhichShouldStartsWithTileAndSlash
        {
            get
            {
                return Exceptions.ResourceManager.GetString("SourceMustBeAVirtualPathWhichShouldStartsWithTileAndSlash",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Specified file does not exist: "{0}"..
        /// </summary>
        internal static string SpecifiedFileDoesNotExist
        {
            get
            {
                return Exceptions.ResourceManager.GetString("SpecifiedFileDoesNotExist", Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Passed string cannot be parsed to DateTime object..
        /// </summary>
        internal static string StringNotCorrectDate
        {
            get { return Exceptions.ResourceManager.GetString("StringNotCorrectDate", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to Passed string cannot be parsed to TimeSpan object..
        /// </summary>
        internal static string StringNotCorrectTimeSpan
        {
            get { return Exceptions.ResourceManager.GetString("StringNotCorrectTimeSpan", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to There should be at least one button.
        /// </summary>
        internal static string ThereShouldBeAtLeastOnePagerButton
        {
            get
            {
                return Exceptions.ResourceManager.GetString("ThereShouldBeAtLeastOnePagerButton",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to The specified method is not an action method..
        /// </summary>
        internal static string TheSpecifiedMethodIsNotAnActionMethod
        {
            get
            {
                return Exceptions.ResourceManager.GetString("TheSpecifiedMethodIsNotAnActionMethod",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to Time should be bigger than MinTime and less than MaxTime..
        /// </summary>
        internal static string TimeOutOfRange
        {
            get { return Exceptions.ResourceManager.GetString("TimeOutOfRange", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to You should set Tooltip container. Tooltip.For(container).
        /// </summary>
        internal static string TooltipContainerShouldBeSet
        {
            get
            {
                return Exceptions.ResourceManager.GetString("TooltipContainerShouldBeSet", Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to You cannot set Url and ContentUrl at the same time..
        /// </summary>
        internal static string UrlAndContentUrlCannotBeSet
        {
            get
            {
                return Exceptions.ResourceManager.GetString("UrlAndContentUrlCannotBeSet", Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to The value '{0}' is invalid..
        /// </summary>
        internal static string ValueNotValidForProperty
        {
            get { return Exceptions.ResourceManager.GetString("ValueNotValidForProperty", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to The Url of the WebService must be set.
        /// </summary>
        internal static string WebServiceUrlRequired
        {
            get { return Exceptions.ResourceManager.GetString("WebServiceUrlRequired", Exceptions.resourceCulture); }
        }

        /// <summary>
        ///   Looks up a localized string similar to You cannot add more than once column when sort mode is set to single column..
        /// </summary>
        internal static string YouCannotAddMoreThanOnceColumnWhenSortModeIsSetToSingle
        {
            get
            {
                return Exceptions.ResourceManager.GetString("YouCannotAddMoreThanOnceColumnWhenSortModeIsSetToSingle",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to You cannot use non generic BindTo overload without EnableCustomBinding set to true.
        /// </summary>
        internal static string YouCannotCallBindToWithoutCustomBinding
        {
            get
            {
                return Exceptions.ResourceManager.GetString("YouCannotCallBindToWithoutCustomBinding",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to You cannot call render more than once..
        /// </summary>
        internal static string YouCannotCallRenderMoreThanOnce
        {
            get
            {
                return Exceptions.ResourceManager.GetString("YouCannotCallRenderMoreThanOnce",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to You cannot call Start more than once..
        /// </summary>
        internal static string YouCannotCallStartMoreThanOnce
        {
            get
            {
                return Exceptions.ResourceManager.GetString("YouCannotCallStartMoreThanOnce",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to You cannot configure a shared web asset group..
        /// </summary>
        internal static string YouCannotConfigureASharedWebAssetGroup
        {
            get
            {
                return Exceptions.ResourceManager.GetString("YouCannotConfigureASharedWebAssetGroup",
                    Exceptions.resourceCulture);
            }
        }

        /// <summary>
        ///   Looks up a localized string similar to You must have to call Start prior calling this method..
        /// </summary>
        internal static string YouMustHaveToCallStartPriorCallingThisMethod
        {
            get
            {
                return Exceptions.ResourceManager.GetString("YouMustHaveToCallStartPriorCallingThisMethod",
                    Exceptions.resourceCulture);
            }
        }

        internal Exceptions()
        {
        }
    }
}
