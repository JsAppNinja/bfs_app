import React, { Component } from 'react';
import salesv from "../img/sales-v.jpg";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { globalVar } from "../config";
import PropTypes from 'prop-types';

var base_url = globalVar.base_url1;


class JobAreaComponent extends Component {

	constructor() {
		super();
		this.state = {
			videoobj: {},
			modal: false,
			jobareaData: []
		};
		this.changeModalData = this.changeModalData.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	/**
	 * Get the page data
	 */
	getJobAreaData() {
		let RootId = 12920
		fetch(globalVar.base_url1 + '/umbraco/api/Content/get/' + RootId, {
			method: 'get'
		}).then((response) => {
			return response.json();
		}).then((data) => {
			if (data) {
				let arr = []
				arr.push(data.Properties);
				this.setState(
					{
						jobareaData: arr
					}
				)
			}
		}).catch(() => {
		});
	}

	componentDidMount() {
		this.getJobAreaData()
	}

	/**
	 * Change the modal data
	 */
	changeModalData = function (x) {
		let item = {}
		item["videolink"] = x
		this.setState({
			videoobj: item,
			modal: true
		})
	}

	/**
	 * Move to specific target
	 */
	moveToTarget = function (target){
		var elmnt = document.getElementById(target);
        elmnt.scrollIntoView();
	}
	 
	 

	/**
	 * Stop playing video
	 */
	stopVideoPlaying() {
		this.setState({
			videoobj: {}
		})
	}

	/**
	 * Open and close popup modal
	*/
	toggle() {
		this.setState({
			modal: !this.state.modal
		});

		if (!this.state.modal) {
			this.stopVideoPlaying()
		}
	}

	render() {
		//object variable to set data fetched through api
		let data = {};

		//checking whether data fetched through api is empty or not
		if (this.state.jobareaData.length > 0) {
			if (this.state.jobareaData[0]) {

				//setting api data in object variable
				data["bannercaption"] = this.state.jobareaData[0].bannerCaption;
				data["bannerimage"] = base_url + this.state.jobareaData[0].bannerImage;
				data["navlink1"] = this.state.jobareaData[0].navLink1;
				data["navlink2"] = this.state.jobareaData[0].navLink2;
				data["navlink3"] = this.state.jobareaData[0].navLink3;
				data["navlink4"] = this.state.jobareaData[0].navLink4;
				data["navlink5"] = this.state.jobareaData[0].navLink5;
				data["navlink6"] = this.state.jobareaData[0].navLink6;
				data["navlink7"] = this.state.jobareaData[0].navLink7;
				data["navlink8"] = this.state.jobareaData[0].navLink8;
				data["featuredcareerheading"] = this.state.jobareaData[0].featuredCareersHeading;
				if(this.state.jobareaData[0].career1Image){
					data["career1image"] = base_url + this.state.jobareaData[0].career1Image;
				}else{
					data["career1image"] = null;
				}
				
				if(this.state.jobareaData[0].career1SecondImage){
					data["career1secondImage"] = base_url + this.state.jobareaData[0].career1SecondImage;
				}else{
					data["career1secondImage"] = null;
				}
				
				data["career1title"] = this.state.jobareaData[0].career1Title;
				data["career1description"] = this.state.jobareaData[0].career1Description;
				let career1videolink = JSON.parse(this.state.jobareaData[0].job1ImageVideoLink);
				let link1 = JSON.parse(this.state.jobareaData[0].career1Link);
				data["career1link"] = link1[0].link;
				data["career1videolink"] = career1videolink[0].link;
				data["career2title"] = this.state.jobareaData[0].career2Title;
				data["career2description"] = this.state.jobareaData[0].career2Description;
				let link2 = JSON.parse(this.state.jobareaData[0].career2Link);
				let career2videolink = JSON.parse(this.state.jobareaData[0].career2ImageVideoLink)
				data["career2videolink"] = career2videolink[0].link;
				data["career2link"] = link2[0].link;
				if(this.state.jobareaData[0].career2Image){
					data["career2image"] = base_url + this.state.jobareaData[0].career2Image
				}else{
					data["career2image"] = null;
				}
				if(this.state.jobareaData[0].career2SecondImage){
					data["career2SecondImage"] = base_url + this.state.jobareaData[0].career2SecondImage;
				}else{
					data["career2SecondImage"] = null;
				}
				
				data["jobheading"] = this.state.jobareaData[0].jobHeading;
				if(this.state.jobareaData[0].job1Image){
					data["job1image"] = base_url + this.state.jobareaData[0].job1Image
				}else{
					data["job1image"] = null;
				}
				
				let job1videolink = JSON.parse(this.state.jobareaData[0].job1ImageVideoLink);
				data["job1imagevideolink"] = job1videolink[0].link;
				let job1link = JSON.parse(this.state.jobareaData[0].job1Link);
				data["job1link"] = job1link[0].link;
				data["job1title"] = this.state.jobareaData[0].job1Title;
				data["job1description"] = this.state.jobareaData[0].job1Description;
				data["job2title"] = this.state.jobareaData[0].job2Title;
				data["job2description"] = this.state.jobareaData[0].job2Description;
				let job2link = JSON.parse(this.state.jobareaData[0].job2Link);
				data["job2link"] = job2link[0].link;
				if(this.state.jobareaData[0].job2Image){
                    data["job2image"] = base_url + this.state.jobareaData[0].job2Image;
				}else{
					data["job2image"] = null;
				}
				
				data["job3title"] = this.state.jobareaData[0].job3Title;
				data["job3description"] = this.state.jobareaData[0].job3Description;
				let job3link = JSON.parse(this.state.jobareaData[0].job3Link);
				data["job3link"] = job3link[0].link;
				if(this.state.jobareaData[0].job3Image){
                    data["job3image"] = base_url + this.state.jobareaData[0].job3Image;
				}else{
					data["job3image"] = null;
				}
				
				data["job4title"] = this.state.jobareaData[0].job4Title;
				data["job4description"] = this.state.jobareaData[0].job4Description;
				let job4link = JSON.parse(this.state.jobareaData[0].job4Link);
				data["job4link"] = job4link[0].link;
				if(this.state.jobareaData[0].job4Image){
					data["job4image"] = base_url + this.state.jobareaData[0].job4Image;
				}else{
					data["job4image"] = null;
				}
				
				data["job5title"] = this.state.jobareaData[0].job5Title;
				data["job5description"] = this.state.jobareaData[0].job5Description;
				let job5link = JSON.parse(this.state.jobareaData[0].job5Link)
				data["job5link"] = job5link[0].link;
				if(this.state.jobareaData[0].job5Image){
					data["job5image"] = base_url + this.state.jobareaData[0].job5Image;
				}else{
					data["job5image"] = null;
				}
				
				data["job6title"] = this.state.jobareaData[0].job6Title;
				data["job6description"] = this.state.jobareaData[0].job6Description;
				let job6link = JSON.parse(this.state.jobareaData[0].job6Link);
				data["job6link"] = job6link[0].link;
				if(this.state.jobareaData[0].job6Image){
                    data["job6image"] = base_url + this.state.jobareaData[0].job6Image;
				}else{
					data["job6image"] = null;
				}
				
			}
		}
		return (
			<div className="job_area_mein midcontent">
				<div className="col-12 p-0">
					{data.bannerimage ? (
					<div className="col-12 p-0 CareerSubBanner CareerMobileBanner" style={{ backgroundImage: 'Url(' + data.bannerimage + ')', backgroundSize: 'cover',  backgroundPositionX: 'center',backgroundPositionY: 'top'}}>
						{/* <img alt="bannerimage" className="w-100 h-100" src={data.bannerimage} /> */}
						<div className="CareersBannerCaption w-100 position-absolute">
							<div className="container">
								<h1 className="display-4 ts-family text-white over-shadow">{data.bannercaption}</h1>

							</div>
						</div>
					</div>
					) : null}
				</div>
				{data.navlink1 ? (<div className="jobrole_sec">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="jobrole_in text-center">
									<ul className="list-unstyled">
										{data.navlink1?(<li>
											<Link onClick={(e) =>{ e.preventDefault(); this.moveToTarget(data.navlink1)}} to={"#"+data.navlink1}>
												{data.navlink1}</Link>
										</li>):null}
										{data.navlink2?(<li>
											<Link onClick={(e) =>{ e.preventDefault(); this.moveToTarget(data.navlink2)}} to={"#"+data.navlink2} >
												{data.navlink2}</Link>
										</li>):null}
										{data.navlink3?(<li>
											<Link onClick={(e) =>{ e.preventDefault(); this.moveToTarget("other")}} to={"#other"} >
												{data.navlink3}</Link>
										</li>):null}
										{data.navlink4?(<li>
											<Link onClick={(e) =>{ e.preventDefault(); this.moveToTarget("other")}} to={"#other"}>
												{data.navlink4}</Link>
										</li>):null}
										{data.navlink5?(<li>
											<Link onClick={(e) =>{e.preventDefault(); this.moveToTarget("other")}} to={"#other"}>
												{data.navlink5}</Link>
										</li>):null}
										{data.navlink6?(<li>
											<Link onClick={(e) =>{ e.preventDefault(); this.moveToTarget("other")}} to={"#other"}>
												{data.navlink6}</Link>
										</li>):null}
										{data.navlink7?(<li>
											<Link onClick={(e) =>{ e.preventDefault(); this.moveToTarget("other")}} to={"#other"}>
												{data.navlink7}</Link>
										</li>):null}
										{data.navlink8?(<li>
											<Link onClick={(e) =>{ e.preventDefault(); this.moveToTarget("other")}} to={"#other"}>
												{data.navlink8}</Link>
										</li>):null}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>) : null}
				<div className="feat-section">
					<div className="col-12">
						<div className="career_sub_content">
							{data.featuredCareersHeading ? (<div className="feat_head">
								<h2>{data.featuredCareersHeading}</h2>
							</div>) : null}
							<div id={data.navlink1} className="FeaturedJobItemWrap">
								<div className="FeaturedJobItemRow clearfix">
									<div className="row">
										{data.career1image ? (<div className="FeaturedJobItemColumn ImgDivWrap col-xs-6 col-sm-6">
											<div className="ImgDiv ImgMobile"><img src={data.career1image} alt="section_2" className="w-100" /></div>
										</div>) : null}
										{data.career1secondImage ? (<div onClick={() => this.changeModalData(data.career1videolink)} className="FeaturedJobItemColumn ImgDivWrap col-xs-6 col-sm-6">
											<a className="popup-vimeo" data-toggle="modal" data-target="#videoModal">
												<div>
													<span id="video-sym"></span>
													<div className="ImgDiv ImgMobile"><img src={data.career1secondImage} alt="section_2" className="w-100" /></div>
												</div>
												<div className="videoLabel"> </div>
											</a>
										</div>) : null}
									</div>
									{data.career1secondImage ? (<div className="FeaturedJobItemSingleCol">
										<div className="ImgDiv ImgMobile"><img src={data.career1secondImage} alt="section_2" className="w-100" /></div>
									</div>) : null}
								</div>
								<div className="FeaturedJobItemRow clearfix">
									<div className="row">
										<div className="FeaturedJobItemColumn FeaturedJobDesc col-xs-12 col-md-8">
											{data.career1title ? (<h3>{data.career1title}</h3>) : null}
											<p></p>
											<span className="otherpagescareer" dangerouslySetInnerHTML={{ __html: data.career1description }}></span>
											<p></p>
										</div>
										{data.career1link ? (<div className="FeaturedJobItemColumn col-xs-12 col-md-4">
											<div><a href={data.career1link} className="btn CareersButton" rel="noopener noreferrer" target="_blank">Find a Position Near Me</a></div>
										</div>) : null}
									</div>
								</div>
							</div>
							<div id={data.navlink2} className="FeaturedJobItemWrap">
								<div className="FeaturedJobItemRow clearfix">
									<div className="row">
										{data.career2image ? (<div onClick={() => this.changeModalData(data.career2videolink)} className="FeaturedJobItemColumn ImgDivWrap col-xs-6 col-sm-6">
											<div className="ImgDiv ImgMobile"><img src={data.career2image} alt="section_2" className="w-100" /></div>
										</div>) : null}
										{data.career2SecondImage ? (<div className="FeaturedJobItemColumn ImgDivWrap col-xs-6 col-sm-6">
											<a className="popup-vimeo" data-toggle="modal" data-target="#videoModal">
												<div>
													<span id="video-sym"></span>
													<div className="ImgDiv ImgMobile"><img src={data.career2SecondImage} alt="section_2" className="w-100" /></div>
												</div>
												<div className="videoLabel"> </div>
											</a>
										</div>) : null}
									</div>
									<div className="FeaturedJobItemSingleCol">
										<div className="ImgDiv ImgMobile"><img src={salesv} alt="section_2" className="w-100" /></div>
									</div>
								</div>
								<div className="FeaturedJobItemRow clearfix">
									<div className="row">
										{data.career2link ? (<div className="FeaturedJobItemColumn col-xs-12 col-md-4">
											<div><a className="btn CareersButton" href={data.career2link} rel="noopener noreferrer" target="_blank">Find a Position Near Me</a></div>
										</div>) : null}
										{data.career2description ? (<div className="FeaturedJobItemColumn FeaturedJobDesc col-xs-12 col-md-8">
											<h3>{data.career2title}</h3>
											<span dangerouslySetInnerHTML={{ __html: data.career2description }}></span>
										</div>) : null}
									</div>
								</div>
							</div>
							<div id="other" className="all_job pt-3">
								<div className="container">
									<div className="row">
										<div className="col-md-12">
											<h2>{data.jobheading}</h2>
										</div>
									</div>
									<div className="row">
										<div className=" col-12 col-sm-12 col-md-6 col-xl-6">
											{data.job1image ? (<div className="jobs_box py-4">
												<div className="ImgDiv ImgMobile"><img src={data.job1image} alt="ware" className="w-100" /></div>
												<h4>{data.job1title}</h4>
												<span dangerouslySetInnerHTML={{ __html: data.job1description }}></span>
												<a href={data.job1link} className="btn" rel="noopener noreferrer" target="_blank">Find a Position Near Me</a>
											</div>) : null}
										</div>
										<div className=" col-12 col-sm-12 col-md-6 col-xl-6">
											{data.job2image ? (<div className="jobs_box py-4">
												<div className="ImgDiv ImgMobile"><img src={data.job2image} alt="ware" className="w-100" /></div>
												<h4>{data.job2title}</h4>
												<span dangerouslySetInnerHTML={{ __html: data.job2description }}></span>
												<a href={data.job2link} className="btn" rel="noopener noreferrer" target="_blank">Find a Position Near Me</a>
											</div>) : null}
										</div>
										<div className=" col-12 col-sm-12 col-md-6 col-xl-6">
											{data.job3image ? (<div className="jobs_box py-4">
												<div className="ImgDiv ImgMobile"><img src={data.job3image} alt="ware" className="w-100" /></div>
												<h4>{data.job3title}</h4>
												<span dangerouslySetInnerHTML={{ __html: data.job3description }}></span>
												<a href={data.job3link} className="btn" rel="noopener noreferrer" target="_blank">Find a Position Near Me</a>
											</div>) : null}
										</div>
										<div className=" col-12 col-sm-12 col-md-6 col-xl-6">
											{data.job4image ? (<div className="jobs_box py-4">
												<div className="ImgDiv ImgMobile"><img src={data.job4image} alt="ware" className="w-100" /></div>
												<h4>{data.job4title}</h4>
												<span dangerouslySetInnerHTML={{ __html: data.job4description }}></span>
												<a href={data.job4link} className="btn" rel="noopener noreferrer" target="_blank">Find a Position Near Me</a>
											</div>) : null}
										</div>
										<div className=" col-12 col-sm-12 col-md-6 col-xl-6">
											{data.job5image ? (<div className="jobs_box py-4">
												<div className="ImgDiv ImgMobile"><img src={data.job5image} alt="ware" className="w-100" /></div>
												<h4>{data.job5title}</h4>
												<span dangerouslySetInnerHTML={{ __html: data.job5description }}></span>
												<a href={data.job5link} className="btn" rel="noopener noreferrer" target="_blank">Find a Position Near Me</a>
											</div>) : null}
										</div>
										<div className=" col-12 col-sm-12 col-md-6 col-xl-6">
											{data.job6image ? (<div className="jobs_box py-4">
												<div className="ImgDiv ImgMobile"><img src={data.job6image} alt="ware" className="w-100" /></div>
												<h4>{data.job6title}</h4>
												<span dangerouslySetInnerHTML={{ __html: data.job6description }}></span>
												<a href={data.job6link} className="btn" rel="noopener noreferrer" target="_blank">Find a Position Near Me</a>
											</div>) : null}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-dialog-centered mnt-video">
					<ModalHeader toggle={this.toggle}></ModalHeader>
					<ModalBody className="p-0">
						<div className="row m-0">
							<div className="col-sm-12 col-xl-12 mnt-video-frame">
								<iframe id="manufacturingVideos" title="manufacturingvideos" src={this.state.videoobj.videolink} width="900" height="300" frameBorder="0"></iframe>
							</div>
						</div>
					</ModalBody>
				</Modal>
			</div>
		)
	}
}

export default JobAreaComponent;

/**
 * Define the proptype
 */
JobAreaComponent.propTypes = {
	mapdata: PropTypes.node,
};