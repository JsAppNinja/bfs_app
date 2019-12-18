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
	/// <summary>Leadership Page</summary>
	[PublishedContentModel("leadershipPage")]
	public partial class LeadershipPage : PublishedContentModel, IContentControl, ITopNavigationControl
	{
#pragma warning disable 0109 // new is redundant
		public new const string ModelTypeAlias = "leadershipPage";
		public new const PublishedItemType ModelItemType = PublishedItemType.Content;
#pragma warning restore 0109

		public LeadershipPage(IPublishedContent content)
			: base(content)
		{ }

#pragma warning disable 0109 // new is redundant
		public new static PublishedContentType GetModelContentType()
		{
			return PublishedContentType.Get(ModelItemType, ModelTypeAlias);
		}
#pragma warning restore 0109

		public static PublishedPropertyType GetModelPropertyType<TValue>(Expression<Func<LeadershipPage, TValue>> selector)
		{
			return PublishedContentModelUtility.GetModelPropertyType(GetModelContentType(), selector);
		}

		///<summary>
		/// Content
		///</summary>
		[ImplementPropertyType("content")]
		public IHtmlString Content
		{
			get { return CustomerPortalCMS.GeneratedModels.ContentControl.GetContent(this); }
		}

		///<summary>
		/// Title: Enter the Page Title - overrides page Name
		///</summary>
		[ImplementPropertyType("title")]
		public string Title
		{
			get { return CustomerPortalCMS.GeneratedModels.ContentControl.GetTitle(this); }
		}

		///<summary>
		/// Hide from navigation: When checked, page will be hidden from navigation but still accessible by URL.
		///</summary>
		[ImplementPropertyType("hideFromNavigation")]
		public bool HideFromNavigation
		{
			get { return CustomerPortalCMS.GeneratedModels.TopNavigationControl.GetHideFromNavigation(this); }
		}
	}
}