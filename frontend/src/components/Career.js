
//importing library

import React, { Component } from 'react';
// import { Carousel, CarouselItem, CarouselControl, CarouselCaption } from 'reactstrap';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { globalVar } from "../config";
import { Link } from "react-router-dom";
import Slider from "react-slick";

//Global variable
var base_url = globalVar.base_url1;
var slides = [];

class CareerComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { activeIndex: 0, videoobj: {}, modal: false, careerData: [], jobsData: [] };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.changeModalData = this.changeModalData.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    /**
     * To get career data through API
    */
    getCareerData() {
        let RootId = 12919;
        let RootId1 = 13096;
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
                        careerData: arr
                    }
                )
            }
        }).catch(() => {
        });

        fetch(globalVar.base_url1 + '/umbraco/api/Content/getChildren/' + RootId1, {
            method: 'get'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data) {
                this.setState(
                    {
                        jobsData: data
                    }
                )
            }
        }).catch(() => {

        });
    }

    componentDidMount() {
        this.getCareerData();
    }


    /**
     * To slide next image in the carousel
    */
    next() {
        const nextIndex = this.state.activeIndex === slides.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }


    /**
     * To slide previous image in the carousel
    */
    previous() {
        const nextIndex = this.state.activeIndex === 0 ? slides.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }


    /**
     * To change video in the popup modal
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
     * To stop playing video
    */
    stopVideoPlaying() {
        this.setState({
            videoobj: {}
        })
    }


    /**
      * To close and open video popup modal
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

        //Variable to store data fetched through API
        var settings = {
            arrows: true,
            dots: false,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,

            fade: true,
           
        };

        slides = [];
        // const { activeIndex } = this.state;
        let dataobj = {};
        let alljobs = [];
        if (this.state.careerData.length > 0) {
            if (this.state.careerData[0]) {
                if (this.state.careerData[0].careerCarouselImage1) {
                    slides.push(
                        {
                            "image": base_url + this.state.careerData[0].careerCarouselImage1,
                            "caption": this.state.careerData[0].careerCarouselImage1Caption,
                            "captiontext": "",
                            "imagecheck": this.state.careerData[0].careerCarouselImage1
                        }
                    )
                }

                if (this.state.careerData[0].careerCarouselImage2) {
                    slides.push(
                        {
                            "image": base_url + this.state.careerData[0].careerCarouselImage2,
                            "caption": this.state.careerData[0].careerCarouselImage2Caption,
                            "captiontext": "",
                            "imagecheck": this.state.careerData[0].careerCarouselImage2
                        }
                    )
                }

                if (this.state.careerData[0].careerCarouselImage3) {
                    slides.push(
                        {
                            "image": base_url + this.state.careerData[0].careerCarouselImage3,
                            "caption": this.state.careerData[0].careerCarouselImage3Caption,
                            "captiontext": "",
                            "imagecheck": this.state.careerData[0].careerCarouselImage3
                        }
                    )
                }

                if (this.state.careerData[0].careerCarouselImage4) {
                    slides.push(
                        {
                            "image": base_url + this.state.careerData[0].careerCarouselImage4,
                            "caption": this.state.careerData[0].careerCarouselImage4Caption,
                            "captiontext": "",
                            "imagecheck": this.state.careerData[0].careerCarouselImage4
                        }
                    )
                }

                if (this.state.careerData[0].careerCarouselImage5) {
                    slides.push(
                        {
                            "image": base_url + this.state.careerData[0].careerCarouselImage5,
                            "caption": this.state.careerData[0].careerCarouselImage5Caption,
                            "captiontext": "",
                            "imagecheck": this.state.careerData[0].careerCarouselImage5
                        }
                    )
                }

                //Setting all the varibale in dataobj variable

                dataobj["introText1"] = this.state.careerData[0].careerIntroParagraph1;
                dataobj["introText2"] = this.state.careerData[0].careerIntroParagraph2;
                dataobj["careerSubMenu1Text"] = this.state.careerData[0].careerSubMenu1Text;
                dataobj["careerSubMenu2Text"] = this.state.careerData[0].careerSubMenu2Text;
                dataobj["careerSubMenu3Text"] = this.state.careerData[0].careerSubMenu3Text;
                dataobj["careerSubMenu4Text"] = this.state.careerData[0].careerSubMenu4Text;
                dataobj["careerSubMenu5Text"] = this.state.careerData[0].careerSubMenu5Text;
                if(this.state.careerData[0].careerSubMenu1Image){
                    dataobj["careerSubMenu1Image"] = base_url + this.state.careerData[0].careerSubMenu1Image;
                }else{
                    dataobj["careerSubMenu1Image"] = null;
                }

                if(this.state.careerData[0].careerSubMenu2Image){
                    dataobj["careerSubMenu2Image"] = base_url + this.state.careerData[0].careerSubMenu2Image;
                }else{
                    dataobj["careerSubMenu2Image"] = null;
                }
                
                if(this.state.careerData[0].careerSubMenu3Image){
                    dataobj["careerSubMenu3Image"] = base_url + this.state.careerData[0].careerSubMenu3Image;
                }else{
                    dataobj["careerSubMenu3Image"] = null
                }

                if(this.state.careerData[0].careerSubMenu4Image){
                    dataobj["careerSubMenu4Image"] = base_url + this.state.careerData[0].careerSubMenu4Image;
                }else{
                    dataobj["careerSubMenu4Image"] = null;
                }

                if(this.state.careerData[0].careerSubMenu5Image){
                    dataobj["careerSubMenu5Image"] = base_url + this.state.careerData[0].careerSubMenu5Image;
                }else{
                    dataobj["careerSubMenu5Image"] = null
                }
                let link2 = JSON.parse(this.state.careerData[0].careerSubMenu2Link);
                let link3 = JSON.parse(this.state.careerData[0].careerSubMenu3Link);
                let link4 = JSON.parse(this.state.careerData[0].careerSubMenu4Link);
                dataobj["careerLink1"] = "careers";
                dataobj["careerLink2"] = link2.link;
                dataobj["careerLink3"] = link3.link;
                dataobj["careerLink4"] = link4.link;
                dataobj["jobHeading"] = this.state.careerData[0].jobHeading;
                dataobj["bannerCaption"] = this.state.careerData[0].bannerCaption;
                if(this.state.careerData[0].bannerImage){
                    dataobj["bannerImage"] = base_url + this.state.careerData[0].bannerImage;
                }else{
                    dataobj["bannerImage"] = null;
                }
                
                dataobj["careerContent"] = this.state.careerData[0].careerContent;
                if(this.state.careerData[0].brandImage1){
                    dataobj["brandimage1"] = base_url + this.state.careerData[0].brandImage1;
                }else{
                    dataobj["brandimage1"] = null 
                }
                
                let brandlink1 = JSON.parse(this.state.careerData[0].brandLink1);
                dataobj["brandlink1"] = brandlink1.link;
                if(this.state.careerData[0].brandImage2){
                    dataobj["brandimage2"] = base_url + this.state.careerData[0].brandImage2;
                }else{
                    dataobj["brandimage2"] = null;
                } 
               
                if(this.state.careerData[0].brandImage3){
                    dataobj["brandimage3"] = base_url + this.state.careerData[0].brandImage3;
                }else{
                    dataobj["brandimage3"] = null;
                } 
                
                if(this.state.careerData[0].brandImage4){
                    dataobj["brandimage4"] = base_url + this.state.careerData[0].brandImage4;
                }else{
                    dataobj["brandimage4"] = null;
                } 
                
                if(this.state.careerData[0].brandImage5){
                    dataobj["brandimage5"] = base_url + this.state.careerData[0].brandImage5;
                }else{
                    dataobj["brandimage5"] = null;
                } 

                if(this.state.careerData[0].brandImage6){
                    dataobj["brandimage6"] = base_url + this.state.careerData[0].brandImage6;
                }else{
                    dataobj["brandimage6"] = null;
                } 
            }
        }

        if (this.state.jobsData.length > 0) {
            for (let i = 0; i < this.state.jobsData.length; i++) {
                let joblink = JSON.parse(this.state.jobsData[i].Properties.jobLink);
                let videolink = JSON.parse(this.state.jobsData[i].Properties.jobVideoLink);
                alljobs.push(
                    {
                        jobtitle: this.state.jobsData[i].Properties.jobTitle,
                        buttoncaption: joblink[0].caption,
                        link: joblink[0].link,
                        jobimage: base_url + this.state.jobsData[i].Properties.jobImage,
                        jobdescription: this.state.jobsData[i].Properties.jobDescription,
                        videolink: videolink[0].link
                    }
                )
            }
        }



        let newSlides = slides.map((item, i) => {
            if (item.imagecheck && item.image) {
                return (
                    <div className="job-ban"
                        key={i}>
                        <div style={{ backgroundImage: 'Url(' + item.image + ')', backgroundSize: 'cover', backgroundPositionX: 'center',backgroundPositionY: 'top'}}>
                            <div className="career-banner-text">
                                <h1>{item.caption}</h1>
                            </div>
                        </div>
                    </div>)

            } else {
                return null
            }
        });

        return (
            <div className="career_mein midcontent">
                <div className="col-12 p-0">
                    <div className="col-12 p-0 jobsarea-banner">
                        {slides && slides.length > 0 ?
                            <Slider {...settings}>
                                {newSlides}
                            </Slider> : null
                            }

                    </div>
                </div>
                <div className="CareersIntro py-5">
                    {dataobj.introText1 ? (<div className="CareersIntroInner container">
                        <div className=""><span dangerouslySetInnerHTML={{ __html: dataobj.introText1 }}></span></div>
                        <div className=" pt-4"><span dangerouslySetInnerHTML={{ __html: dataobj.introText2 }}></span></div>
                    </div>) : null}
                    {dataobj.careerSubMenu1Image ? (<div className="CareersSubMenu">
                        <div className="CareersSubMenuInner container">
                            <div className="row  m-0 mt-5">
                                {dataobj.careerSubMenu1Image || dataobj.careerSubMenu1Text?(<div className="col-12 col-xl-2 text-center CareersSubMenu-list px-0 d-inline-block">
                                    <Link to={"/job-areas"}>
                                        {dataobj.careerSubMenu1Image?(<span className="col-12 d-block"><img src={dataobj.careerSubMenu1Image} alt="Jobs" title="All Positions &amp; Career Paths" /></span>):null}
                                        {dataobj.careerSubMenu1Text?(<span dangerouslySetInnerHTML={{ __html: dataobj.careerSubMenu1Text }} className="col-12 d-block h5 font-weight-bold text-white text-center mt-3 px-0"></span>):null}
                                    </Link>
                                </div>):null}
                                {dataobj.careerSubMenu2Image || dataobj.careerSubMenu2Text?(<div className="col-12 col-xl-2 text-center CareersSubMenu-list px-0 d-inline-block">
                                    <a href="https://www.dayforcehcm.com/CandidatePortal/en-US/builders" rel="noopener noreferrer" target="_blank">
                                        {dataobj.careerSubMenu2Image?(<span className="col-12 d-block "><img src={dataobj.careerSubMenu2Image} alt="Search for an Opportunity Near You" title="Search for an Opportunity Near You" /></span>):null}
                                        {dataobj.careerSubMenu2Text?(<span className="col-12 d-block h5 font-weight-bold text-white text-center mt-3 px-0">{dataobj.careerSubMenu2Text}</span>):null}
                                    </a>
                                </div>):null}
                                {dataobj.careerSubMenu3Image || dataobj.careerSubMenu3Text?(<div className="col-12 col-xl-2 text-center CareersSubMenu-list px-0 d-inline-block">
                                    <Link to={"/why-builders"}>
                                        {dataobj.careerSubMenu3Image?(<span className="col-12 d-block"><img src={dataobj.careerSubMenu3Image} alt="Why Builders?" title="Why Builders?" /></span>):null}
                                        {dataobj.careerSubMenu3Text?(<span className="col-12 d-block h5 font-weight-bold text-white text-center mt-3 px-0">{dataobj.careerSubMenu3Text}</span>):null}
                                    </Link>
                                </div>):null}
                                {dataobj.careerSubMenu4Image || dataobj.careerSubMenu4Text?(<div className="col-12 col-xl-2 text-center CareersSubMenu-list px-0 d-inline-block">
                                    <Link to={"/why-builders#benefits"}>
                                        {dataobj.careerSubMenu4Image?(<span className="col-12 d-block"><img src={dataobj.careerSubMenu4Image} alt="Benefits" title="Benefits" /></span>):null}
                                        {dataobj.careerSubMenu4Text?(<span className="col-12 d-block h5 font-weight-bold text-white text-center mt-3 px-0">{dataobj.careerSubMenu4Text}</span>):null}
                                    </Link>
                                </div>):null}
                                {dataobj.careerSubMenu5Image || dataobj.careerSubMenu5Text?( <div className="col-12 col-xl-2 text-center CareersSubMenu-list px-0 d-inline-block">
                                    <Link to={"/about-us"}>
                                        {dataobj.careerSubMenu5Image?(<span className="col-12 d-block"><img src={dataobj.careerSubMenu5Image} alt="About Us" title="About Us" /></span>):null}
                                        {dataobj.careerSubMenu5Text?(<span className="col-12 d-block h5 font-weight-bold text-white text-center mt-3 px-0">{dataobj.careerSubMenu5Text}</span>):null}
                                    </Link>
                                </div>):null}
                            </div>
                        </div>
                    </div>) : null}
                </div>
                <div className="pt-3 CareersFeaturedInner">
                    <div className="container">
                        {dataobj.jobHeading ? (<div className="row">
                            <div className="col-md-12">
                                <h2 className="display-4 dis-4-tab font-weight-normal mb-4 text-center mt-5">{dataobj.jobHeading}</h2>
                            </div>
                        </div>) : null}
                        <div className="row">
                            {alljobs.length > 0 ?
                                alljobs.map((jobs, index) => (
                                    <div key={index} className=" col-12 col-sm-12 col-md-6 col-xl-6">
                                        <div className="jobs_box sales-cdn py-4">
                                            {jobs.videolink ? (<a onClick={() => this.changeModalData(jobs.videolink)}><img src={jobs.jobimage} alt="sales" className="w-100" /></a>) : <img src={jobs.jobimage} alt="sales" className="w-100" />}
                                            {jobs.jobtitle ? (<h2 className="display-4 font-weight-normal my-4">{jobs.jobtitle}</h2>):null}
                                            {jobs.jobdescription?(<span dangerouslySetInnerHTML={{ __html: jobs.jobdescription }}></span>):null}
                                            {jobs.link?(<a href={jobs.link} className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block text-white d-none-mob mt-4" rel="noopener noreferrer" target="_blank ">{jobs.buttoncaption}</a>):null}
                                        </div>
                                    </div>)) : null}
                        </div>
                    </div>
                </div>
                {dataobj.bannerImage ? (<div className="CareersBanner CareerHomeBanner position-relative mt-md-5 mt-3">
                    <div className="bnr-height">
                        <div className="image w-100 position-absolute" style={{ backgroundImage: 'Url(' + dataobj.bannerImage + ')', backgroundSize: 'cover',  backgroundPositionX: 'center',backgroundPositionY: 'top'}}>
                            {/* <img className="w-100" src={dataobj.bannerImage} alt="bannerimage" /> */}
                        </div>
                        <div className="CareersBanner-Caption  w-100">
                            <div className="Container">
                                <p>{dataobj.bannerCaption}</p>
                            </div>
                        </div>
                    </div>
                </div>) : null}
                {dataobj.careerContent ? (<div className="CareersDisclaimer container mt-4">
                    <div className="CareersDisclaimerInner">
                        <span dangerouslySetInnerHTML={{ __html: dataobj.careerContent }}></span>
                    </div>
                </div>) : null}
                <div className="career_logos clearfix CareersBrandBanner">
                    {dataobj.brandimage1 ? (<div className="brandingItem">
                        <a href="/"><img src={dataobj.brandimage1} alt="Builders FirstSource" /></a>
                    </div>) : null}
                    {dataobj.brandimage2 ? (<div className="brandingItem">
                        <img src={dataobj.brandimage2} alt="cr-logo-2png" />
                    </div>) : null}
                    {dataobj.brandimage3 ? (<div className="brandingItem">
                        <img src={dataobj.brandimage3} alt="cr-logo-3png" />
                    </div>) : null}
                    {dataobj.brandimage4 ? (<div className="brandingItem">
                        <img src={dataobj.brandimage4} alt="cr-logo-4png" />
                    </div>) : null}
                    {dataobj.brandimage5 ? (<div className="brandingItem">
                        <img src={dataobj.brandimage5} alt="cr-logo-5png" />
                    </div>) : null}
                    {dataobj.brandimage6 ? (<div className="brandingItem">
                        <img src={dataobj.brandimage6} alt="cr-logo-6png" />
                    </div>) : null}
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-dialog-centered mnt-video">
                    <ModalHeader toggle={this.toggle}></ModalHeader>
                    <ModalBody className="p-0">
                        <div className="mnt-video-frame">
                            <iframe id="manufacturingVideos" title="manufacturingvideos" src={this.state.videoobj.videolink} width="900" height="300" frameBorder="0"></iframe>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

  
export default CareerComponent;
