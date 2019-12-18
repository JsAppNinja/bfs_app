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
	/// <summary>Careers Job Areas</summary>
	[PublishedContentModel("careersJobAreas")]
	public partial class CareersJobAreas : PublishedContentModel, IBannerControls, ICareerSecondaryNavigationControls, ICareersJobsCol12Controls, ICareersJobsCol6Controls, ISEocontrols, ITopNavigationControls
	{
#pragma warning disable 0109 // new is redundant
		public new const string ModelTypeAlias = "careersJobAreas";
		public new const PublishedItemType ModelItemType = PublishedItemType.Content;
#pragma warning restore 0109

		public CareersJobAreas(IPublishedContent content)
			: base(content)
		{ }

#pragma warning disable 0109 // new is redundant
		public new static PublishedContentType GetModelContentType()
		{
			return PublishedContentType.Get(ModelItemType, ModelTypeAlias);
		}
#pragma warning restore 0109

		public static PublishedPropertyType GetModelPropertyType<TValue>(Expression<Func<CareersJobAreas, TValue>> selector)
		{
			return PublishedContentModelUtility.GetModelPropertyType(GetModelContentType(), selector);
		}

		///<summary>
		/// Career 1 Second Image Video Link
		///</summary>
		[ImplementPropertyType("career1")]
		public Umbraco.Web.Models.RelatedLinks Career1
		{
			get { return this.GetPropertyValue<Umbraco.Web.Models.RelatedLinks>("career1"); }
		}

		///<summary>
		/// Career 1 Image Video Link
		///</summary>
		[ImplementPropertyType("career1ImageVideoLink")]
		public Umbraco.Web.Models.RelatedLinks Career1ImageVideoLink
		{
			get { return this.GetPropertyValue<Umbraco.Web.Models.RelatedLinks>("career1ImageVideoLink"); }
		}

		///<summary>
		/// Career 2 Image Video Link
		///</summary>
		[ImplementPropertyType("career2ImageVideoLink")]
		public Umbraco.Web.Models.RelatedLinks Career2ImageVideoLink
		{
			get { return this.GetPropertyValue<Umbraco.Web.Models.RelatedLinks>("career2ImageVideoLink"); }
		}

		///<summary>
		/// Career 2 Second Image Video Link
		///</summary>
		[ImplementPropertyType("career2SecondImageVideoLink")]
		public Umbraco.Web.Models.RelatedLinks Career2SecondImageVideoLink
		{
			get { return this.GetPropertyValue<Umbraco.Web.Models.RelatedLinks>("career2SecondImageVideoLink"); }
		}

		///<summary>
		/// Banner Caption: Enter a caption for this banner (optional)
		///</summary>
		[ImplementPropertyType("bannerCaption")]
		public string BannerCaption
		{
			get { return CustomerPortalCMS.GeneratedModels.BannerControls.GetBannerCaption(this); }
		}

		///<summary>
		/// Banner Image: Choose an image for this banner
		///</summary>
		[ImplementPropertyType("bannerImage")]
		public IPublishedContent BannerImage
		{
			get { return CustomerPortalCMS.GeneratedModels.BannerControls.GetBannerImage(this); }
		}

		///<summary>
		/// Logo Over Banner: If this is clicked a logo will appear over the banner.
		///</summary>
		[ImplementPropertyType("logoOverBanner")]
		public bool LogoOverBanner
		{
			get { return CustomerPortalCMS.GeneratedModels.BannerControls.GetLogoOverBanner(this); }
		}

		///<summary>
		/// Nav Link 1: Enter the text to appear for the 1 Featured Career
		///</summary>
		[ImplementPropertyType("navLink1")]
		public string NavLink1
		{
			get { return CustomerPortalCMS.GeneratedModels.CareerSecondaryNavigationControls.GetNavLink1(this); }
		}

		///<summary>
		/// Nav Link 2: Enter the text to appear for the 2 Featured Career
		///</summary>
		[ImplementPropertyType("navLink2")]
		public string NavLink2
		{
			get { return CustomerPortalCMS.GeneratedModels.CareerSecondaryNavigationControls.GetNavLink2(this); }
		}

		///<summary>
		/// Nav Link 3: Enter the text to appear for Job 1
		///</summary>
		[ImplementPropertyType("navLink3")]
		public string NavLink3
		{
			get { return CustomerPortalCMS.GeneratedModels.CareerSecondaryNavigationControls.GetNavLink3(this); }
		}

		///<summary>
		/// Nav Link 4: Enter the text to appear for Job 2
		///</summary>
		[ImplementPropertyType("navLink4")]
		public string NavLink4
		{
			get { return CustomerPortalCMS.GeneratedModels.CareerSecondaryNavigationControls.GetNavLink4(this); }
		}

		///<summary>
		/// Nav Link 5: Enter the text to appear for Job 3
		///</summary>
		[ImplementPropertyType("navLink5")]
		public string NavLink5
		{
			get { return CustomerPortalCMS.GeneratedModels.CareerSecondaryNavigationControls.GetNavLink5(this); }
		}

		///<summary>
		/// Nav Link 6: Enter the text to appear for Job 4
		///</summary>
		[ImplementPropertyType("navLink6")]
		public string NavLink6
		{
			get { return CustomerPortalCMS.GeneratedModels.CareerSecondaryNavigationControls.GetNavLink6(this); }
		}

		///<summary>
		/// Nav Link 7: Enter the text to appear for Job 5
		///</summary>
		[ImplementPropertyType("navLink7")]
		public string NavLink7
		{
			get { return CustomerPortalCMS.GeneratedModels.CareerSecondaryNavigationControls.GetNavLink7(this); }
		}

		///<summary>
		/// Nav Link 8: Enter the text to appear for Job 6
		///</summary>
		[ImplementPropertyType("navLink8")]
		public string NavLink8
		{
			get { return CustomerPortalCMS.GeneratedModels.CareerSecondaryNavigationControls.GetNavLink8(this); }
		}

		///<summary>
		/// Career 1 Description: Enter a description for this career
		///</summary>
		[ImplementPropertyType("career1Description")]
		public IHtmlString Career1Description
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol12Controls.GetCareer1Description(this); }
		}

		///<summary>
		/// Career 1 Image: Choose an image for this featured career
		///</summary>
		[ImplementPropertyType("career1Image")]
		public IPublishedContent Career1Image
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol12Controls.GetCareer1Image(this); }
		}

		///<summary>
		/// Career 1 Link: Choose a Link for this career (the caption text will be used for the button link)
		///</summary>
		[ImplementPropertyType("career1Link")]
		public Umbraco.Web.Models.RelatedLinks Career1Link
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol12Controls.GetCareer1Link(this); }
		}

		///<summary>
		/// Career 1 Second Image: Choose a second image to appear for this featured career
		///</summary>
		[ImplementPropertyType("career1SecondImage")]
		public IPublishedContent Career1SecondImage
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol12Controls.GetCareer1SecondImage(this); }
		}

		///<summary>
		/// Career 1 Title: Enter a title for this career
		///</summary>
		[ImplementPropertyType("career1Title")]
		public string Career1Title
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol12Controls.GetCareer1Title(this); }
		}

		///<summary>
		/// Career 2 Description: Enter a description for this career
		///</summary>
		[ImplementPropertyType("career2Description")]
		public IHtmlString Career2Description
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol12Controls.GetCareer2Description(this); }
		}

		///<summary>
		/// Career 2 Image: Choose an image for this featured career
		///</summary>
		[ImplementPropertyType("career2Image")]
		public IPublishedContent Career2Image
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol12Controls.GetCareer2Image(this); }
		}

		///<summary>
		/// Career 2 Link: Choose a Link for this career (the caption text will be used for the button link)
		///</summary>
		[ImplementPropertyType("career2Link")]
		public Umbraco.Web.Models.RelatedLinks Career2Link
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol12Controls.GetCareer2Link(this); }
		}

		///<summary>
		/// Career 2 Second Image: Choose a second image to appear for this featured career
		///</summary>
		[ImplementPropertyType("career2SecondImage")]
		public IPublishedContent Career2SecondImage
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol12Controls.GetCareer2SecondImage(this); }
		}

		///<summary>
		/// Career 2 Title: Enter a title for this career
		///</summary>
		[ImplementPropertyType("career2Title")]
		public string Career2Title
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol12Controls.GetCareer2Title(this); }
		}

		///<summary>
		/// Featured Careers Heading: Enter in the Featured Careers Heading
		///</summary>
		[ImplementPropertyType("featuredCareersHeading")]
		public string FeaturedCareersHeading
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol12Controls.GetFeaturedCareersHeading(this); }
		}

		///<summary>
		/// Job 1 Description: Enter a description for this position
		///</summary>
		[ImplementPropertyType("job1Description")]
		public IHtmlString Job1Description
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob1Description(this); }
		}

		///<summary>
		/// Job 1 Image: Choose an image for this Job
		///</summary>
		[ImplementPropertyType("job1Image")]
		public IPublishedContent Job1Image
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob1Image(this); }
		}

		///<summary>
		/// Job 1 Image Caption: Enter a caption for this image (optional)
		///</summary>
		[ImplementPropertyType("job1ImageCaption")]
		public string Job1ImageCaption
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob1ImageCaption(this); }
		}

		///<summary>
		/// Job 1 Image Video Link
		///</summary>
		[ImplementPropertyType("job1ImageVideoLink")]
		public Umbraco.Web.Models.RelatedLinks Job1ImageVideoLink
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob1ImageVideoLink(this); }
		}

		///<summary>
		/// Job 1 Link: Choose a URL to link to (*the link caption text will be used for the text in the button)
		///</summary>
		[ImplementPropertyType("job1Link")]
		public Umbraco.Web.Models.RelatedLinks Job1Link
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob1Link(this); }
		}

		///<summary>
		/// Job 1 Title: Enter a title for this job
		///</summary>
		[ImplementPropertyType("job1Title")]
		public string Job1Title
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob1Title(this); }
		}

		///<summary>
		/// Job 2 Description: Enter a description for this position
		///</summary>
		[ImplementPropertyType("job2Description")]
		public IHtmlString Job2Description
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob2Description(this); }
		}

		///<summary>
		/// Job 2 Image: Choose an image for this Job
		///</summary>
		[ImplementPropertyType("job2Image")]
		public IPublishedContent Job2Image
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob2Image(this); }
		}

		///<summary>
		/// Job 2 Image Caption: Enter a caption for this image (optional)
		///</summary>
		[ImplementPropertyType("job2ImageCaption")]
		public string Job2ImageCaption
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob2ImageCaption(this); }
		}

		///<summary>
		/// Job 2 Image Video Link
		///</summary>
		[ImplementPropertyType("job2ImageVideoLink")]
		public Umbraco.Web.Models.RelatedLinks Job2ImageVideoLink
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob2ImageVideoLink(this); }
		}

		///<summary>
		/// Job 2 Link: Choose a URL to link to (*the link caption text will be used for the text in the button)
		///</summary>
		[ImplementPropertyType("job2Link")]
		public Umbraco.Web.Models.RelatedLinks Job2Link
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob2Link(this); }
		}

		///<summary>
		/// Job 2 Title: Enter a title for this job
		///</summary>
		[ImplementPropertyType("job2Title")]
		public string Job2Title
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob2Title(this); }
		}

		///<summary>
		/// Job 3 Description: Enter a description for this position
		///</summary>
		[ImplementPropertyType("job3Description")]
		public IHtmlString Job3Description
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob3Description(this); }
		}

		///<summary>
		/// Job 3 Image: Choose an image for this Job
		///</summary>
		[ImplementPropertyType("job3Image")]
		public IPublishedContent Job3Image
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob3Image(this); }
		}

		///<summary>
		/// Job 3 Image Caption: Enter a caption for this image (optional)
		///</summary>
		[ImplementPropertyType("job3ImageCaption")]
		public string Job3ImageCaption
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob3ImageCaption(this); }
		}

		///<summary>
		/// Job 3 Image Video Link
		///</summary>
		[ImplementPropertyType("job3ImageVideoLink")]
		public Umbraco.Web.Models.RelatedLinks Job3ImageVideoLink
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob3ImageVideoLink(this); }
		}

		///<summary>
		/// Job 3 Link: Choose a URL to link to (*the link caption text will be used for the text in the button)
		///</summary>
		[ImplementPropertyType("job3Link")]
		public Umbraco.Web.Models.RelatedLinks Job3Link
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob3Link(this); }
		}

		///<summary>
		/// Job 3 Title: Enter a title for this job
		///</summary>
		[ImplementPropertyType("job3Title")]
		public string Job3Title
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob3Title(this); }
		}

		///<summary>
		/// Job 4 Description: Enter a description for this position
		///</summary>
		[ImplementPropertyType("job4Description")]
		public IHtmlString Job4Description
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob4Description(this); }
		}

		///<summary>
		/// Job 4 Image: Choose an image for this Job
		///</summary>
		[ImplementPropertyType("job4Image")]
		public IPublishedContent Job4Image
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob4Image(this); }
		}

		///<summary>
		/// Job 4 Image Caption: Enter a caption for this image (optional)
		///</summary>
		[ImplementPropertyType("job4ImageCaption")]
		public string Job4ImageCaption
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob4ImageCaption(this); }
		}

		///<summary>
		/// Job 4 Image Video Link
		///</summary>
		[ImplementPropertyType("job4ImageVideoLink")]
		public Umbraco.Web.Models.RelatedLinks Job4ImageVideoLink
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob4ImageVideoLink(this); }
		}

		///<summary>
		/// Job 4 Link: Choose a URL to link to (*the link caption text will be used for the text in the button)
		///</summary>
		[ImplementPropertyType("job4Link")]
		public Umbraco.Web.Models.RelatedLinks Job4Link
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob4Link(this); }
		}

		///<summary>
		/// Job 4 Title: Enter a title for this job
		///</summary>
		[ImplementPropertyType("job4Title")]
		public string Job4Title
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob4Title(this); }
		}

		///<summary>
		/// Job 5 Description: Enter a description for this position
		///</summary>
		[ImplementPropertyType("job5Description")]
		public IHtmlString Job5Description
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob5Description(this); }
		}

		///<summary>
		/// Job 5 Image: Choose an image for this Job
		///</summary>
		[ImplementPropertyType("job5Image")]
		public IPublishedContent Job5Image
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob5Image(this); }
		}

		///<summary>
		/// Job 5 Image Caption: Enter a caption for this image (optional)
		///</summary>
		[ImplementPropertyType("job5ImageCaption")]
		public string Job5ImageCaption
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob5ImageCaption(this); }
		}

		///<summary>
		/// Job 5 Image Video Link
		///</summary>
		[ImplementPropertyType("job5ImageVideoLink")]
		public Umbraco.Web.Models.RelatedLinks Job5ImageVideoLink
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob5ImageVideoLink(this); }
		}

		///<summary>
		/// Job 5 Link: Choose a URL to link to (*the link caption text will be used for the text in the button)
		///</summary>
		[ImplementPropertyType("job5Link")]
		public Umbraco.Web.Models.RelatedLinks Job5Link
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob5Link(this); }
		}

		///<summary>
		/// Job 5 Title: Enter a title for this job
		///</summary>
		[ImplementPropertyType("job5Title")]
		public string Job5Title
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob5Title(this); }
		}

		///<summary>
		/// Job 6 Description: Enter a description for this position
		///</summary>
		[ImplementPropertyType("job6Description")]
		public IHtmlString Job6Description
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob6Description(this); }
		}

		///<summary>
		/// Job 6 Image: Choose an image for this Job
		///</summary>
		[ImplementPropertyType("job6Image")]
		public IPublishedContent Job6Image
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob6Image(this); }
		}

		///<summary>
		/// Job 6 Image Caption: Enter a caption for this image (optional)
		///</summary>
		[ImplementPropertyType("job6ImageCaption")]
		public string Job6ImageCaption
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob6ImageCaption(this); }
		}

		///<summary>
		/// Job 6 Image Video Link
		///</summary>
		[ImplementPropertyType("job6ImageVideoLink")]
		public Umbraco.Web.Models.RelatedLinks Job6ImageVideoLink
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob6ImageVideoLink(this); }
		}

		///<summary>
		/// Job 6 Link: Choose a URL to link to (*the link caption text will be used for the text in the button)
		///</summary>
		[ImplementPropertyType("job6Link")]
		public Umbraco.Web.Models.RelatedLinks Job6Link
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob6Link(this); }
		}

		///<summary>
		/// Job 6 Title: Enter a title for this job
		///</summary>
		[ImplementPropertyType("job6Title")]
		public string Job6Title
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJob6Title(this); }
		}

		///<summary>
		/// Job Heading: Enter the heading for this section
		///</summary>
		[ImplementPropertyType("jobHeading")]
		public string JobHeading
		{
			get { return CustomerPortalCMS.GeneratedModels.CareersJobsCol6Controls.GetJobHeading(this); }
		}

		///<summary>
		/// Meta Description: Best practice is to keep description under 150 characters
		///</summary>
		[ImplementPropertyType("metaDescription")]
		public string MetaDescription
		{
			get { return CustomerPortalCMS.GeneratedModels.SEocontrols.GetMetaDescription(this); }
		}

		///<summary>
		/// SEO Page Title: Overrides Title (from Page Title tab) and Name
		///</summary>
		[ImplementPropertyType("sEOPageTitle")]
		public string SEopageTitle
		{
			get { return CustomerPortalCMS.GeneratedModels.SEocontrols.GetSEopageTitle(this); }
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