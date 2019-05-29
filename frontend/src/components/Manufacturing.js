import React, { Component } from 'react';
import { globalVar } from "../config";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
var base_url = globalVar.base_url1;

class ManufacturingComponent extends Component {
    constructor() {
        super();

        //defining state variable
        this.state = {
            manufactureObj: {},
            modal: false,
            backimage: "",
            title: "",
            content: "",
            manufacturingitems: [],
            videolisttitle: "",
            videolistitems: []
        };

        //binding component function
        this.changeModalData = this.changeModalData.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.getManufacturingVideos();
        this.getManufacturingContent();
    }

    /**
     * Get the page videos
     */
    getManufacturingVideos() {
        let RootId = 12897
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
     * Get the page content
     */
    getManufacturingContent() {
        let RootId = 12897
        fetch(globalVar.base_url1 + '/umbraco/api/Content/Get/' + RootId, {
            method: 'get'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data) {
                this.setState(
                    {
                        title: data.Properties.pageTitle,
                        content: data.Properties.content,
                        backimage: base_url + data.Properties.headerBackgroundImage,
                        manufacturingitems: JSON.parse(data.Properties.dataLocation),
                        videolisttitle: data.Properties.videoHeader
                    }
                )
            }
        })
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
     * Open and close the popup modal
     */
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
        if (!this.state.modal) {
            this.stopVideoPlaying()
        }
    }

     /**
     * Change the popup modal video
     */
    changeModalData = function (x) {
        let item = {}
        item["videolink"] = x
        this.setState({
            manufactureObj: item,
            modal: true
        })
    }

    render() {
        let videolistitems = [];

        if (this.state.videolistitems.length > 0) {
            for (let i = 0; i < this.state.videolistitems.length; i++) {
                let videolink = JSON.parse(this.state.videolistitems[i].Properties.videoLinkURL);
                if(this.state.videolistitems[i].Properties.videoLinkThumbnail){
                    var videoThumb = base_url + this.state.videolistitems[i].Properties.videoLinkThumbnail
                }else{
                    videoThumb = null
                }
                videolistitems.push(
                    {
                        key: this.state.videolistitems[i].Key,
                        videoThumb: videoThumb,
                        videoTitle: this.state.videolistitems[i].Properties.videoLinkLabel,
                        videoDetail: videolink[0]
                    }
                )
            }
        }

        return (
            <div className="container midcontent">
                <div className="col-12 p-lg-0">
                    <div className="BasicPageTopWrap mt-3">
                        {this.state.backimage ? (<div className="banner">
                            <img className="w-100" src={this.state.backimage} border="0" alt="Resource Center - Green Works " />
                        </div>) : null}
                        <h1 className="MainH1">
                            {this.state.title}
                        </h1>
                    </div>
                    {this.state.manufacturingitems.length > 0 ? (<div className="content_full_all">
                        <div className="row">
                            <div className="col-sm-12">
                                <span dangerouslySetInnerHTML={{ __html: this.state.content }}></span>
                                <div className="MediaListWrap">
                                    {this.state.manufacturingitems ? (<div className="row">
                                        {this.state.manufacturingitems.sort((a, b) => a.TypeName.localeCompare(b.TypeName)).map((item, index) => (
                                            <div key={index} className="col-md-3 col-sm-6 col-6">
                                                <div className="py-3 mt-2 text-center text-blue">{item.TypeName}</div>
                                                {item.TypeImage?(<div>
                                                    <img className="w-100" src={base_url + item.TypeImage} alt="img1" />
                                                </div>):null}
                                            </div>
                                        ))}
                                    </div>) : null}
                                    {videolistitems.length > 0 ? (<div className="py-4 mt-5" id="video">
                                        <h2>{this.state.videolisttitle}</h2>
                                        <div className="MediaListWrap mb-5 float-left w-100">
                                            <ul className="media_list p-0">
                                                {videolistitems.sort((a, b) => a.videoTitle.localeCompare(b.videoTitle)).map((item, index) => (
                                                    <li data-toggle="modal" key={index} onClick={() => this.changeModalData(item.videoDetail.link)} data-target="#manufacturingVideoModal">
                                                        <div className="vdo_iner_cntnt">
                                                            <div className="position-relative">
                                                                <span className="vdo_icon_im"></span>
                                                                {item.videoThumb?(<img className="w-100" src={item.videoThumb} alt="vdo1" />):null}
                                                            </div>
                                                            <div className="videoLabel py-1">{item.videoTitle}</div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>) : null}
                                </div>
                            </div>
                        </div>
                    </div>) : null}

                    {/* <!-- Modal --> */}
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-dialog-centered mnt-video">
                        <ModalHeader toggle={this.toggle}></ModalHeader>
                        <ModalBody className="p-0">
                            <div className="mnt-video-frame">
                                <iframe id="manufacturingVideos" title="manufacturingvideos" src={this.state.manufactureObj.videolink} width="900" height="300" frameBorder="0"></iframe>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default ManufacturingComponent;




