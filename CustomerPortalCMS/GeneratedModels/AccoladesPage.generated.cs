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
	/// <summary>Accolades Page</summary>
	[PublishedContentModel("accoladesPage")]
	public partial class AccoladesPage : PublishedContentModel, IContentControl, ITopNavigationControl
	{
#pragma warning disable 0109 // new is redundant
		public new const string ModelTypeAlias = "accoladesPage";
		public new const PublishedItemType ModelItemType = PublishedItemType.Content;
#pragma warning restore 0109

		public AccoladesPage(IPublishedContent content)
			: base(content)
		{ }

#pragma warning disable 0109 // new is redundant
		public new static PublishedContentType GetModelContentType()
		{
			return PublishedContentType.Get(ModelItemType, ModelTypeAlias);
		}
#pragma warning restore 0109

		public static PublishedPropertyType GetModelPropertyType<TValue>(Expression<Func<AccoladesPage, TValue>> selector)
		{
			return PublishedContentModelUtility.GetModelPropertyType(GetModelContentType(), selector);
		}

		///<summary>
		/// Awards Data
		///</summary>
		[ImplementPropertyType("awardsData")]
		public IEnumerable<IPublishedContent> AwardsData
		{
			get { return this.GetPropertyValue<IEnumerable<IPublishedContent>>("awardsData"); }
		}

		///<summary>
		/// Awards Image 1: (Not Used - For Deletion)
		///</summary>
		[ImplementPropertyType("awardsImage1")]
		public Umbraco.Web.Models.ImageCropDataSet AwardsImage1
		{
			get { return this.GetPropertyValue<Umbraco.Web.Models.ImageCropDataSet>("awardsImage1"); }
		}

		///<summary>
		/// Awards Image 2: (Not Used - For Deletion)
		///</summary>
		[ImplementPropertyType("awardsImage2")]
		public Umbraco.Web.Models.ImageCropDataSet AwardsImage2
		{
			get { return this.GetPropertyValue<Umbraco.Web.Models.ImageCropDataSet>("awardsImage2"); }
		}

		///<summary>
		/// Awards Images
		///</summary>
		[ImplementPropertyType("awardsImages")]
		public IEnumerable<IPublishedContent> AwardsImages
		{
			get { return this.GetPropertyValue<IEnumerable<IPublishedContent>>("awardsImages"); }
		}

		///<summary>
		/// Awards Section Title
		///</summary>
		[ImplementPropertyType("awardsSectionTitle")]
		public string AwardsSectionTitle
		{
			get { return this.GetPropertyValue<string>("awardsSectionTitle"); }
		}

		///<summary>
		/// Map Image
		///</summary>
		[ImplementPropertyType("mapImage")]
		public Umbraco.Web.Models.ImageCropDataSet MapImage
		{
			get { return this.GetPropertyValue<Umbraco.Web.Models.ImageCropDataSet>("mapImage"); }
		}

		///<summary>
		/// Map Section Title
		///</summary>
		[ImplementPropertyType("mapSectionTitle")]
		public string MapSectionTitle
		{
			get { return this.GetPropertyValue<string>("mapSectionTitle"); }
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