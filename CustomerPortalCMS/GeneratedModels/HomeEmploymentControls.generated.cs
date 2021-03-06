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
	// Mixin content Type 1273 with alias "homeEmploymentControls"
	/// <summary>Home Employment Controls</summary>
	public partial interface IHomeEmploymentControls : IPublishedContent
	{
		/// <summary>Employment Msg</summary>
		string EmploymentMsg { get; }
	}

	/// <summary>Home Employment Controls</summary>
	[PublishedContentModel("homeEmploymentControls")]
	public partial class HomeEmploymentControls : PublishedContentModel, IHomeEmploymentControls
	{
#pragma warning disable 0109 // new is redundant
		public new const string ModelTypeAlias = "homeEmploymentControls";
		public new const PublishedItemType ModelItemType = PublishedItemType.Content;
#pragma warning restore 0109

		public HomeEmploymentControls(IPublishedContent content)
			: base(content)
		{ }

#pragma warning disable 0109 // new is redundant
		public new static PublishedContentType GetModelContentType()
		{
			return PublishedContentType.Get(ModelItemType, ModelTypeAlias);
		}
#pragma warning restore 0109

		public static PublishedPropertyType GetModelPropertyType<TValue>(Expression<Func<HomeEmploymentControls, TValue>> selector)
		{
			return PublishedContentModelUtility.GetModelPropertyType(GetModelContentType(), selector);
		}

		///<summary>
		/// Employment Msg: Enter the disclaimer for employment
		///</summary>
		[ImplementPropertyType("employmentMsg")]
		public string EmploymentMsg
		{
			get { return GetEmploymentMsg(this); }
		}

		/// <summary>Static getter for Employment Msg</summary>
		public static string GetEmploymentMsg(IHomeEmploymentControls that) { return that.GetPropertyValue<string>("employmentMsg"); }
	}
}
