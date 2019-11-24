//importing library
import React, { Component } from 'react';
import { globalVar } from "../config";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

//global variable
var base_url = globalVar.base_url1;

class DistributionComponent extends Component {
	constructor() {
		super();

        //defining state variable
		this.state = {
			manufactureObj: {},
			modal: false,
			backimage: "",
			title: "",
			content: "",
			distributionitems: [],
			videolisttitle: "",
			videolistitems: []
		};

		//binding function
		this.changeModalData = this.changeModalData.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	componentDidMount() {
		this.getDistributionVideos();
		this.getDistributionContent();
	}


    /**
     * Fetching distribution videos data through API
    */
	getDistributionVideos() {
		let RootId = 12906
		fetch(globalVar.base_url1 + '/umbraco/api/Content/GetChildren/' + RootId, {
			method: 'get'
		}).then((response) => {
			return response.json();
		}).then((data) => {
			if (data) {
				this.setState(
					{
						videolistitems: data
					}
				)
			}
		}).catch(() => {
		});
	}

	/**
	 * Get the distribution page data through API
	 */
	getDistributionContent() {
		let RootId = 12906
		fetch(globalVar.base_url1 + '/umbraco/api/Content/Get/' + RootId, {
			method: 'get'
		}).then((response) => {
			return response.json();
		}).then((data) => {
			if (data) {
				if(data.Properties.headerBackgroundImage){
					var backimage = base_url + data.Properties.headerBackgroundImage
				}else{
					backimage = null
				}
				this.setState(
					{
						title: data.Properties.pageTitle,
						content: data.Properties.content,
						backimage: backimage,
						distributionitems: JSON.parse(data.Properties.dataLocation),
						videolisttitle: data.Properties.videoHeader
					}
				)
			}
		}).catch(() => {
		});
	}

	/**
	 * Stop playing video
	*/
	stopVideoPlaying() {
		this.setState({
			manufactureObj: {}
		})
	}

	/**
	 * Change video on popup modal
	*/
	changeModalData = function (x) {
		let item = {}
		item["videolink"] = x
		this.setState({
			manufactureObj: item,
			modal: true
		})
	}

	/**
	 * Show or hide popup modal
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
		let videolistitems = []

		//checking whether data from api is empty or not
		if (this.state.videolistitems.length > 0) {
			for (let i = 0; i < this.state.videolistitems.length; i++) {
				let videolink = JSON.parse(this.state.videolistitems[i].Properties.videoLinkURL);
				if(this.state.videolistitems[i].Properties.videoLinkThumbnail){
					var videothumb = base_url + this.state.videolistitems[i].Properties.videoLinkThumbnail
				}else{
					videothumb = null
				}
				videolistitems.push(
					{
						key: this.state.videolistitems[i].Key,
						videoThumb: videothumb,
						videoTitle: this.state.videolistitems[i].Properties.videoLinkLabel,
						videoDetail: videolink[0]
					}
				)
			}

		}
		return (
			<div className="distri_mein midcontent">
				<div className="container">
					<div className="col-12">
						<div className="BasicPageTopWrap mt-3">
							{this.state.backimage ? (<div className="banner">
								<img className="w-100" src={this.state.backimage} border="0" alt="dbanner" />
							</div>) : null}
							<h1 className="MainH1">
								{this.state.title}
							</h1>
						</div>
						<div className="content_full">
							<span className="otherpages" dangerouslySetInnerHTML={{ __html: this.state.content }}></span>
						</div>
					</div>
				</div>
				{this.state.distributionitems ? (<div className="col-12 py-4">
					<div className="container">
						<div className="row mx-0">
							{this.state.distributionitems.sort((a, b) => a.TypeName.localeCompare(b.TypeName)).map((item, index) => (
								<div key={index} className="col-lg-4 col-xl-4 col-md-6 col-sm-6  col-6 cont_type_mob py-3">
									<div className="adhes_sec">
										<div className="adh_head">{item.TypeName}</div>
										{item.TypeImage?(<img src={base_url + item.TypeImage} alt="section_2" className="img-fluid" />):null}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>) : null}
				{videolistitems ? (<div className="container">
					<div id="video">
						<h2>{this.state.videolisttitle}</h2>
						<ul className="media_list p-0">
							{videolistitems.sort((a, b) => a.videoTitle.localeCompare(b.videoTitle)).map((item, index) => (
								<li key={index} onClick={() => this.changeModalData(item.videoDetail.link)}>
									<div className="vdo_iner_cntnt">
										<div className="position-relative">
											<span className="vdo_icon_im"></span>
											{item.videoThumb?(<img alt="installationservice" className="db w-100" src={item.videoThumb} />):null}
										</div>
										<div className="videoLabel py-1">{item.videoTitle}</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>) : null}
				<Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-dialog-centered mnt-video">
					<ModalHeader toggle={this.toggle}></ModalHeader>
					<ModalBody className="p-0">
						<div className="mnt-video-frame">
							<iframe id="manufacturingVideos" title="manufacturingvideos" src={this.state.manufactureObj.videolink} width="900" height="300" frameBorder="0"></iframe>
						</div>
					</ModalBody>
				</Modal>
			</div>
		)
	}
}

export default DistributionComponent