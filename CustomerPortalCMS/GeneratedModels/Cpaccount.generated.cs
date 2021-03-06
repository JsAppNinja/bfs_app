//------------------------------------------------------------------------------
// <auto-generated>
//   This code was generated by a tool.
//
//    Umbraco.ModelsBuilder v3.0.10.102
//
//   Changes to this file will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Web;
using Umbraco.Core.Models;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Web;
using Umbraco.ModelsBuilder;
using Umbraco.ModelsBuilder.Umbraco;

namespace CustomerPortalCMS.GeneratedModels
{
	/// <summary>Account</summary>
	[PublishedContentModel("CPAccount")]
	public partial class Cpaccount : PublishedContentModel, IAccountPageControls, IPageInfoControls, ITopNavigationControls
	{
#pragma warning disable 0109 // new is redundant
		public new const string ModelTypeAlias = "CPAccount";
		public new const PublishedItemType ModelItemType = PublishedItemType.Content;
#pragma warning restore 0109

		public Cpaccount(IPublishedContent content)
			: base(content)
		{ }

#pragma warning disable 0109 // new is redundant
		public new static PublishedContentType GetModelContentType()
		{
			return PublishedContentType.Get(ModelItemType, ModelTypeAlias);
		}
#pragma warning restore 0109

		public static PublishedPropertyType GetModelPropertyType<TValue>(Expression<Func<Cpaccount, TValue>> selector)
		{
			return PublishedContentModelUtility.GetModelPropertyType(GetModelContentType(), selector);
		}

		///<summary>
		/// Account Description 1
		///</summary>
		[ImplementPropertyType("accountDescription1")]
		public string AccountDescription1
		{
			get { return CustomerPortalCMS.GeneratedModels.AccountPageControls.GetAccountDescription1(this); }
		}

		///<summary>
		/// Account Description 2
		///</summary>
		[ImplementPropertyType("accountDescription2")]
		public string AccountDescription2
		{
			get { return CustomerPortalCMS.GeneratedModels.AccountPageControls.GetAccountDescription2(this); }
		}

		///<summary>
		/// Account Description 3
		///</summary>
		[ImplementPropertyType("accountDescription3")]
		public string AccountDescription3
		{
			get { return CustomerPortalCMS.GeneratedModels.AccountPageControls.GetAccountDescription3(this); }
		}

		///<summary>
		/// Account Heading 1
		///</summary>
		[ImplementPropertyType("accountHeading1")]
		public string AccountHeading1
		{
			get { return CustomerPortalCMS.GeneratedModels.AccountPageControls.GetAccountHeading1(this); }
		}

		///<summary>
		/// Account Heading 2
		///</summary>
		[ImplementPropertyType("accountHeading2")]
		public string AccountHeading2
		{
			get { return CustomerPortalCMS.GeneratedModels.AccountPageControls.GetAccountHeading2(this); }
		}

		///<summary>
		/// Account Heading 3
		///</summary>
		[ImplementPropertyType("accountHeading3")]
		public string AccountHeading3
		{
			get { return CustomerPortalCMS.GeneratedModels.AccountPageControls.GetAccountHeading3(this); }
		}

		///<summary>
		/// Is Impersonation Allowed: Indicates whether this page allows for impersonation, or not.
		///</summary>
		[ImplementPropertyType("isImpersonationAllowed")]
		public bool IsImpersonationAllowed
		{
			get { return CustomerPortalCMS.GeneratedModels.PageInfoControls.GetIsImpersonationAllowed(this); }
		}

		///<summary>
		/// Page Title: Enter the page title to be used, if left blank the page will be used
		///</summary>
		[ImplementPropertyType("pageTitle")]
		public string PageTitle
		{
			get { return CustomerPortalCMS.GeneratedModels.PageInfoControls.GetPageTitle(this); }
		}

		///<summary>
		/// Hide If No Customer Selected?  (CP Sales Node Only!): (This is being replaced with Hide from navigation) Click this if you do not want this page to appear in the top nav
		///</summary>
		[ImplementPropertyType("excludeFromTopNavigation")]
		public bool ExcludeFromTopNavigation
		{
			get { return CustomerPortalCMS.GeneratedModels.TopNavigationControls.GetExcludeFromTopNavigation(this); }
		}

		///<summary>
		/// Hide from navigation: When checked, page will be hidden from navigation but still accessible by URL.
		///</summary>
		[ImplementPropertyType("umbracoNaviHide")]
		public bool UmbracoNaviHide
		{
			get { return CustomerPortalCMS.GeneratedModels.TopNavigationControls.GetUmbracoNaviHide(this); }
		}
	}
}
