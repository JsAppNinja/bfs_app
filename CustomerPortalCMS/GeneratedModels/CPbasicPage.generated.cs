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
	/// <summary>CP Basic Page</summary>
	[PublishedContentModel("cPBasicPage")]
	public partial class CPbasicPage : PublishedContentModel, ILandingPageControls, IPageInfoControls, ITopNavigationControls
	{
#pragma warning disable 0109 // new is redundant
		public new const string ModelTypeAlias = "cPBasicPage";
		public new const PublishedItemType ModelItemType = PublishedItemType.Content;
#pragma warning restore 0109

		public CPbasicPage(IPublishedContent content)
			: base(content)
		{ }

#pragma warning disable 0109 // new is redundant
		public new static PublishedContentType GetModelContentType()
		{
			return PublishedContentType.Get(ModelItemType, ModelTypeAlias);
		}
#pragma warning restore 0109

		public static PublishedPropertyType GetModelPropertyType<TValue>(Expression<Func<CPbasicPage, TValue>> selector)
		{
			return PublishedContentModelUtility.GetModelPropertyType(GetModelContentType(), selector);
		}

		///<summary>
		/// Greeting: One line greeting
		///</summary>
		[ImplementPropertyType("greeting")]
		public string Greeting
		{
			get { return CustomerPortalCMS.GeneratedModels.LandingPageControls.GetGreeting(this); }
		}

		///<summary>
		/// pageContent
		///</summary>
		[ImplementPropertyType("pageContent")]
		public IHtmlString PageContent
		{
			get { return CustomerPortalCMS.GeneratedModels.LandingPageControls.GetPageContent(this); }
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
