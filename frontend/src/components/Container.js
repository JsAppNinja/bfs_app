import PropTypes from 'prop-types';
import {GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import StoreLocatoreComponent from "./StoreLocatore";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { globalVar } from "../config";
import SliderComponent from "./Slider";
import cabinet_frame1 from "../assets/img/product/cabinet.jpg"
import cabinet_frame2 from "../assets/img/product/distribution.jpg"
import cabinet_frame3 from "../assets/img/product/man-slide.jpg"
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReCAPTCHA from "react-google-recaptcha";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';

var base_url = globalVar.base_url1;
var captchaKey = globalVar.googleCaptchaKey;
var mybody = {};
//const gid = 'AIzaSyCAPzibK06qRZ_9o8V7GxOA8k1a5o3WOYs';


class ContainerComponent extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: "2",
            videoIndex: 0,
            paused: false,
            volume: 1,
            showVideo: false,
            storeData: [],
            quoteData: "",
            lastUrl: "",
            modal: false,
            noStoreFound: false,
            zipcode: "",
            sendquotemodal: false,
            emailErr: "",
            zipcodeErr: "",
            messageErr: "",
            captchaErr: "",
            dropdownOpen: false,
            serviceOption: "Service Type",
            quoteEmailStatus: "",
            recaptchaValue: "",
            accordionIndex:0
        };
        this.handlePlayerPause = this.handlePlayerPause.bind(this);
        this.handlePlayerPlay = this.handlePlayerPlay.bind(this);
        this.togglezipcode = this.togglezipcode.bind(this);
        this.showVideo = this.showVideo.bind(this);
        this.getStoreData = this.getStoreData.bind(this);
        this.sendQuote = this.sendQuote.bind(this);
        this.togglesendquote = this.togglesendquote.bind(this);
        this.sendRequestQuote = this.sendRequestQuote.bind(this);
        this.togglerequestquote = this.togglerequestquote.bind(this);
    }

    /**
     * Defining proptypes
     */
    static get propTypes() { 
        return { 
            storeData: PropTypes.any,
            location: PropTypes.any,
            getData: PropTypes.func,
            document: PropTypes.any,
            sendQuote: PropTypes.func,
            quoteData:  PropTypes.any,
            homeData: PropTypes.any,
            constructionData: PropTypes.any
        }; 
    }

    componentDidUpdate(prevProps) {
        
        if(localStorage.getItem("searchedItemLocation")){
            if(document.getElementById("searchfield")){
                document.getElementById("searchfield").value = localStorage.getItem("searchedItemLocation");
                localStorage.removeItem("searchedItemLocation");
            }
        }
        if ((!prevProps || prevProps.storeData !== this.props.storeData) && 
        this.props.storeData && this.props.storeData.length > 0) {
            var scrollToAnchor = () => {
                var storeLocatorModule = "storeLocatorModule"
                document.querySelector(`#${storeLocatorModule}`).scrollIntoView();
            };
            setTimeout(function(){
                scrollToAnchor();
            },500)
        }
        if (!this.state.lastUrl) {
            this.setState({ lastUrl: this.props.location.pathname })
            this.scrollToServices()
        } else if (this.state.lastUrl !== this.props.location.pathname) {
            this.setState({ lastUrl: this.props.location.pathname })
            this.scrollToServices()
        }
       
    }


    /**
     * To toggle menu
    */
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }


    /**
     * To toggle zip code box on header
    */
    togglezipcode(){
        this.setState({
            modal: !this.state.modal
        });
    }


    /**
     * To toggle popup to send quote email
    */
    togglesendquote() {
        this.setState({
            sendquotemodal: !this.state.sendquotemodal
        });
    }



    /**
     * To toggle request popup 
    */
    togglerequestquote() {
        if(localStorage.getItem("selectedStore")) {
            this.togglesendquote();
        }else{
            this.togglezipcode();
        }
    }


   /**
     * To toggle dropdown on quote popup
    */
    addToggleDropdown() {
        this.setState({
            toggleDropdown: !this.state.toggleDropdown
        })
    }

    /**
     * Function to call api for getting location on the basis of zip code
    */
    goToStoreQuote = () => {
        this.setState({ noStoreFound: false })
        if (!this.state.zipcode) {
            this.setState({ zipcodeErr: "Zip code is required." })
        }
        else if (this.state.zipcode.length !== 5) {
            this.setState({ zipcodeErr: "Zip code is not valid." })
        } else {
            this.setState({ zipcodeErr: "" })
            this.getLatLngFromZip(this.state.zipcode);
        }
    }


    /**
     * Api to get location data on the basis of zip code 
    */
    getLatLngFromZip = (zip) => {
        let self = this
        var  geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ 'componentRestrictions':{ 'postalCode': zip }}, function (results, status) {
            if(results[0]){
                mybody = {};
                mybody["Address"] = "";
                mybody["Radius"] = 200;
                mybody["DistributionList"] = [];
                mybody["InstalledServiceList"] = [];
                mybody["Latitude"] = results[0].geometry.location.lat();
                mybody["Longitude"] = results[0].geometry.location.lng();
                self.setState({ noStoreFound: false })
                self.props.getData(mybody);
                self.togglezipcode();
                self.props.document.getElementById("linkToHome").click();
            }else{
                self.setState({ zipcodeErr: "Zip code could not be found." })
            }
        });
    }

    /**
     * Validate textbox for zipcode 
    */
    handleZipcodeChange(e) {
        var element = document.getElementById("zipcode");
        var regex = /[^0-9]/gi;
        element.value = element.value.replace(regex, "");
        this.setState({ zipcode: e.target.value })
    }


    /**
     * Validate textbox for phone number 
    */
    handlePhoneChange() {
        var element = document.getElementById("phone");
        var regex = /[^0-9]/gi;
        element.value = element.value.replace(regex, "");
    }


    /**
     * Validate textbox for email
    */
    validateEmail(email) {
        let re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
        return re.test(email);
    }


    /**
     * Scroll page to product and service section
    */
    scrollToServices() {
        if (this.props.location) {
            let location = this.props.location;
            let page = location.href.split("/");
            if (page[3] === "products-services") {
                setTimeout(()=>{
                    this.props.document.querySelector(`#${'productservice'}`).scrollIntoView();
                },2000)
            }
        }
    }


    /**
     * To control the pause on video
    */
    handlePlayerPause() {
        this.setState({ paused: true });
    }


    /**
     * To control the play on video
    */
    handlePlayerPlay() {
        this.setState({ paused: false });
    }


    /**
     * To show video instead of image on button click
    */
    showVideo() {
        this.setState({ showVideo: true });
    }
    

    /**
     * Get store data through api on the basis of parameter
    */
    getStoreData(data) {
        this.props.getData(data);
        this.setState({ storeData: this.props.storeData });
    }
    
    /**
     * Sending quote email
    */
    sendQuote(data) {
        this.props.sendQuote(data);
        this.setState({ quoteData: this.props.quoteData });
    }


    /**
     * Action on recaptcha change on quote form in popup modal
    */
    onRecaptchChange(value) {
        this.setState({ recaptchaValue: value });
    }


    /**
     * Sending email for request quote through API
    */
    sendRequestQuote() {
        let data  = localStorage.getItem("selectedStore");
        let storeData = data.split(",");
        if (this.checkFormValidation() === true) {
            this.setState({ quoteEmailStatus: "Please wait sending email..." })
            let quoteData = {
                FullName: document.getElementById("name").value,
                Email: document.getElementById("email").value,
                ServiceName: this.state.serviceOption,
                ZipCode: document.getElementById("zipcode").value,
                Phone: document.getElementById("phone").value,
                Message: document.getElementById("message").value,
                LocationId: storeData[1],
                RecaptchaResponse: this.state.recaptchaValue
            }
            this.props.sendQuote(quoteData);
            setTimeout(() => {
                if (this.props.quoteData === true) {
                    setTimeout(() => {
                        this.setState({
                            sendquotemodal: !this.state.sendquotemodal
                        });
                    }, 2000)
                    this.setState({ quoteEmailStatus: "Email has been successfully sent!!!" })
                } else {
                    this.setState({ quoteEmailStatus: "Internal problem occured not able to send email please try again!" })
                }
            }, 10000)

            setTimeout(() => {
                this.setState({ quoteEmailStatus: "" })
            }, 20000)
        }
    }


    /**
     * Validating request quote form
    */
    checkFormValidation() {
        let check = false
        if (document.getElementById("name").value === "" || document.getElementById("name").value.trim() === "") {
            this.setState({ nameErr: "Name is required." });

        } else {
            this.setState({ nameErr: "" });

        }
        if (!this.validateEmail(document.getElementById("email").value.trim())) {
            this.setState({ emailErr: "Email entered is not valid!!!" });

        } else {
            this.setState({ emailErr: "" });

        }
        if (document.getElementById("phone").value === "" || document.getElementById("phone").value.trim() === "") {
            this.setState({ phoneErr: "Phone Number is required." })


        } else {
            this.setState({ phoneErr: "" })

        }
        if (document.getElementById("message").value === "" || document.getElementById("message").value.trim() === "") {
            this.setState({ messageErr: "Message is required." })


        } else {
            this.setState({ messageErr: "" })

        }
        if (document.getElementById("zipcode").value === "" || document.getElementById("zipcode").value.trim() === "") {
            this.setState({ zipcodeErr: "Zipcode is required." })

        } else {
            this.setState({ zipcodeErr: "" })

        }

        if (this.state.recaptchaValue === "") {
            this.setState({ captchaErr: "Captcha is not valid!!!" })
        } else {
            this.setState({ captchaErr: "" })
        }

        if (document.getElementById("name").value === "" || document.getElementById("name").value.trim() === ""
            || !this.validateEmail(document.getElementById("email").value.trim()
                || document.getElementById("phone").value === ""
                || document.getElementById("phone").value.trim() === ""
                || document.getElementById("message").value === ""
                || document.getElementById("message").value.trim() === ""
                || document.getElementById("zipcode").value === ""
                || document.getElementById("zipcode").value.trim() === ""
                || this.state.recaptchaValue === ""
            )) {
            check = true
        } else {
            check = false;
        }

        if (check) {
            return false
        } else {
            return true;
        }
    }


    /**
     * Toggling select box on request quote form
    */
    selectDropToggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    replaceImageDimension(image_url) {
        var url = new URL(image_url);
        var query_string = url.search;
    
        var search_params = new URLSearchParams(query_string); 
    
        let width = search_params.get('width') / 1.5;
    
        let height = search_params.get('height') / 1.5;
    
        search_params.set('width', width);
    
        search_params.set('height', height);
    
        url.search = search_params.toString();
    
        var new_url = url.toString();
    
        return new_url;
    }

    render() {
        let homedata = {};
        let buttonLink = [];
        let manufacturing = {};
        let distributionservice = {};
        let installationservice = {};
        let data1 = [];
        let data2 = [];
        let data3 = [];
        let videolink3 = [];
        let button3 = [];
        let constructiondata = [];
        if (this.props.homeData.length > 0) {
          if(this.props.homeData[0]){
            if(this.props.homeData[0].servicesTab1Image){
                homedata["servicesTab1Image"] = base_url + this.props.homeData[0].servicesTab1Image;
            }else{
                homedata["servicesTab1Image"] = null;
            }

            if(this.props.homeData[0].servicesTab2Image){
                homedata["servicesTab2Image"] = base_url + this.props.homeData[0].servicesTab2Image;
            }else{
                homedata["servicesTab2Image"] = null;
            }

            if(this.props.homeData[0].servicesTab3Image){
                homedata["servicesTab3Image"] = base_url + this.props.homeData[0].servicesTab3Image;
            }else{
                homedata["servicesTab3Image"] = null;
            }

            if(this.props.homeData[0].section1Image1){
                homedata["section1image1"] = this.replaceImageDimension(base_url + this.props.homeData[0].section1Image1);
            }else{
                homedata["section1image1"] = null;
            }

            if(this.props.homeData[0].section1Image2){
                homedata["section1image2"] = this.replaceImageDimension(base_url + this.props.homeData[0].section1Image2);
            }else{
                homedata["section1image2"] = null;
            }
            homedata["section1title"] = this.props.homeData[0].section1Title;
            homedata["section1about"] = this.props.homeData[0].section1About;
            buttonLink = JSON.parse(this.props.homeData[0].section1ButtonLink);
            homedata["section1button"] = buttonLink[0].caption
            homedata["section1buttonlink"] = buttonLink[0].link;
            homedata["section2title"] = this.props.homeData[0].section2Title;
            if(this.props.homeData[0].section2Image1){
                homedata["section2Image1"] = base_url + this.props.homeData[0].section2Image1;
            }else{
                homedata["section2Image1"] = null;
            }
            homedata["section2Image1Title"] = this.props.homeData[0].section2Image1Title;
            if(this.props.homeData[0].section2Image2){
                homedata["section2Image2"] = base_url + this.props.homeData[0].section2Image2;
            }else{
                homedata["section2Image2"] = null;
            }
            homedata["section2Image2Title"] = this.props.homeData[0].section2Image2Title;
            if(this.props.homeData[0].section2Image3){
                homedata["section2Image3"] = base_url + this.props.homeData[0].section2Image3;
            }else{
                homedata["section2Image3"] = null;
            }
            homedata["section2Image3Title"] = this.props.homeData[0].section2Image3Title;
            homedata["section3Title"] = this.props.homeData[0].section3Title;
            homedata["serviceTitle"] = this.props.homeData[0].servicesTitle;
            homedata['section3Description'] = this.props.homeData[0].section3Description;
            videolink3 = JSON.parse(this.props.homeData[0].section3VideoLink);
            button3 = JSON.parse(this.props.homeData[0].section3Button);
            homedata["section3VideoLink"] = videolink3[0].link;
            homedata["section3ButtonCaption"] = button3[0].caption;
            homedata["section3ButtonLink"] = button3[0].link;
            if(this.props.homeData[0].section3VideoThumbnail){
                homedata["section3VideoThumbnail"] = base_url + this.props.homeData[0].section3VideoThumbnail;
            }else{
                homedata["section3VideoThumbnail"] = null;
            }
            
            data1 = JSON.parse(this.props.homeData[0].servicesTab1Data);
            data2 = JSON.parse(this.props.homeData[0].servicesTab2Data);
            data3 = JSON.parse(this.props.homeData[0].servicesTab3Data);

            data1.push(
                {
                    imageTitle: "cabinetcustom",
                    imageUrl: homedata.servicesTab1Image?homedata.servicesTab1Image:cabinet_frame1
                }
            )
            data2.push(
                {
                    imageTitle: "cabinetcustom",
                    imageUrl: homedata.servicesTab2Image?homedata.servicesTab2Image:cabinet_frame2
                }
            )
            data3.push(
                {
                    imageTitle: "cabinetcustom",
                    imageUrl: homedata.servicesTab3Image?homedata.servicesTab3Image:cabinet_frame3
                }
            );
            manufacturing['title'] = this.props.homeData[0].servicesTab1Title;
            distributionservice['title'] = this.props.homeData[0].servicesTab2Title;
            installationservice['title'] = this.props.homeData[0].servicesTab3Title;
          }
        }

        if(this.props.constructionData.length>0){
            let isShow = false;
            for(let i=0; i<this.props.constructionData.length; i++){
                if(this.props.constructionData[i].Properties.homePageBackgroundImage){
                   var image = base_url + this.props.constructionData[i].Properties.homePageBackgroundImage;
                }else{
                    if(this.props.constructionData[i].Properties.image1){
                        image = this.replaceImageDimension(base_url + this.props.constructionData[i].Properties.image1);
                    } else{
                        image="";
                    }    
                }
                 let title = this.props.constructionData[i].Properties.title.substring(0,50);
                 if(this.props.constructionData[i].Properties.homePageButton){
                    let homepagebutton = JSON.parse(this.props.constructionData[i].Properties.homePageButton);
                    var buttontext = homepagebutton[0].caption.substring(0,20);
                    let link = homepagebutton[0].link.split("/");
                    var finallink = link[3];
                 }else{
                     buttontext = ""
                     finallink  =""
                 }

                 if(this.props.constructionData[i].Properties.showOnHomePage){
                     isShow = true;
                 }else{
                     isShow = false
                 }
                
                 constructiondata.push({
                     image:image,
                     title:title,
                     caption:buttontext,
                     link:finallink,
                     isShow:isShow
                 })
            }
            
        }

        return (
            <div className="col-12 px-0">
            <div className="bg-gray col-12 pt-5 pt-sm-4  pt-md-5 px-0">
                <div className="container px-0 pt-sm-4  pt-md-0 pt-lg-5 who_we_are ">
                    <div className="row pt-md-5">
                        <div className="col-12 col-sm-12 col-xl-6 wid-100-tab col-lg-6">
                            <h4 className="display-4  font-weight-normal">{homedata.section1title}</h4>
                            <span className="construct-desc" dangerouslySetInnerHTML={{ __html: homedata.section1about }}></span>
                            {homedata.section1button?(<div className="col-12 mob-xs-1  p-0">
                                <Link to={'/about-us'} className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mb-4">{homedata.section1button}</Link>
                            </div>):null}
                        </div>
                        <div className="col-sm-12 col-xl-1  col-lg-1 pl-0"></div>

                        <div className="col-sm-12 col-xl-5  col-lg-5 ">
                            {homedata.section1image1 ? (<figure className="mb-4 section_fig d-none-mob p-4"><LazyLoadImage src={homedata.section1image1} alt="section_2" className="w-100" /></figure>) : null}
                            {homedata.section1image2 ? (<figure className="mb-4 section_fig d-none-mob p-4"><LazyLoadImage src={homedata.section1image2} alt="section_2" className="w-100" /></figure>) : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray py-sm-4  py-md-5 col-12">
             <div className="container px-0">
                <div className="col-12 px-0 py-md-2 py-lg-5">
                    <h2 className="display-5 text-center constr_mob_cs  font-weight-normal">{homedata.section2title}</h2>
                </div>
                <div className="row py-4 justify-content-center">  
                 {
                    constructiondata.map((item, i) => {
                     if(item.isShow){
                        return(<div key={i} className="col-lg-4 col-xl-4 col-md-6  cont_type_mob mb-4">
                        <div className="position-relative cover-area">
                            {item.image ? (<span className="const_img_mob"><LazyLoadImage src={this.replaceImageDimension(item.image)} alt="section_2" className="w-100" /> </span>) : null}
                            <div className="mob-ht  h-100 align-items-center gallery-area">
                                <div className="w-100 d-sm-flex d-md-flex d-lg-flex align-items-center h-100  ">
                                    <div className="text-center flex-content-mob font-weight-normal w-100 text-white">
                                        <h3 className="display-5 tab-sm mb-xs-50 " dangerouslySetInnerHTML={{ __html: item.title }}></h3>
                                        <div className="rd-name">
                                            <Link to={'/' + item.link} className="btn theme-btn text-uppercase bg-info px-4 py-3 text-white small-size-btn">{item.caption}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                       </div>)
                     }else{
                         return null
                     }
                    })
                 }  
                </div>
              </div>
            </div>

            <div id="productservice" className="bg-gray col-12 py-sm-4 ">
                <div className="container px-0 py-sm-4">
                    <div className="col-12  px-0 pt-md-0">
                        <div className="m-auto our_products_mob">
                            <h2 className="display-4 mob-wid-75 font-small-mob text-center font-weight-normal">{homedata.serviceTitle}</h2>
                            <div className="our_products_mob w-100  py-lg-5 px-0">
                                <div className="collapse-accordion d-block d-xl-none" id="accordion2" aria-multiselectable="false">
                                    <div className="card-custom position-relative ">
                                        <div className="card-header" role="tab" id="headingOne1">
                                            <h6 className="mb-0">
                                                <a  data-toggle="collapse" data-parent="#accordion2" href="#collapseOne2" aria-expanded="true" aria-controls="collapseOne">
                                                    <span className="togle-active font-weight-bold  text-uppercase txt-left-mob nav-item">Manufacturing</span>
                                                </a>
                                            </h6>
                                        </div>
                                        <div id="collapseOne2" className="collapse show" role="tabpanel" aria-labelledby="headingOne2">
                                            <div className="card-block">
                                                <div className="row m-0">
                                                 {
                                                     data1.map((slides, index) =>(
                                                        slides.imageTitle!=="cabinetcustom"?(<div key={index} className="col-sm-6 col-6 col-md-6">
                                                                <div className="gal_text bg-white">
                                                                    { slides.imageUrl?(<LazyLoadImage className="w-100" src={base_url + slides.imageUrl} alt="logo here" />):null}
                                                                    <h5 className="text-center w-100 p-3 font-13 font-medium"> {slides.imageTitle} </h5>
                                                                </div>
                                                        </div>):null
                                                     ))
                                                 }
                                                </div>
                                            </div>
                                            {data1.length>0?(<div className="col-12 text-center  pt-lg-5 px-0">
                                                <Link to={'/manufacturing'} className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mob-view-all">View All</Link>
                                            </div>):null}
                                        </div>
                                    </div>
                                    <div className="card-custom position-relative ">
                                        <div className="card-header" role="tab" id="headingTwo2">
                                            <h6 className="mb-0">
                                                <a  className="collapsed" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo2" aria-expanded="false" aria-controls="collapseTwo2">
                                                    <span className="font-weight-bold text-uppercase txt-left-mob nav-item">Distribution Services</span>
                                                </a>
                                            </h6>
                                        </div>
                                        <div id="collapseTwo2" className="collapse" role="tabpanel" aria-labelledby="headingTwo2">
                                            <div className="card-block">
                                                <div className="row m-0">
                                                  {
                                                     data2.map((slides, index) =>(
                                                        slides.imageTitle!=="cabinetcustom"?(<div key={index} className="col-sm-6 col-6 col-md-6">
                                                                <div className="gal_text bg-white">
                                                                    {slides.imageUrl?(<LazyLoadImage className="w-100" src={base_url + slides.imageUrl} alt="logo here" />):null}
                                                                    <h5 className="text-center w-100 p-3 font-13 font-medium"> {slides.imageTitle} </h5>
                                                                </div>
                                                        </div>):null
                                                     ))
                                                   }
                                                </div>
                                            </div>
                                            {data2.length>0?(<div className="col-12 text-center  pt-lg-5 px-0">
                                                <Link to={'/distribution/'} className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mob-view-all">View All</Link>
                                            </div>):null}
                                        </div>
                                    </div>
                                    <div className="card-custom position-relative ">
                                        <div className="card-header" role="tab" id="headingThree2">
                                            <h6 className="mb-0">
                                                <a  className="collapsed " data-toggle="collapse" data-parent="#accordion2" href="#collapseThree2" aria-expanded="false" aria-controls="collapseThree2">
                                                    <span className="font-weight-bold text-uppercase txt-left-mob nav-item">Installation services</span>
                                                </a>
                                            </h6>
                                        </div>
                                        <div id="collapseThree2" className="collapse" role="tabpanel" aria-labelledby="headingThree2">
                                            <div className="card-block">
                                                <div className="row m-0">
                                                   {
                                                     data3.map((slides, index) =>(
                                                        slides.imageTitle!=="cabinetcustom"?(<div key={index} className="col-sm-6 col-6 col-md-6">
                                                                <div className="gal_text bg-white">
                                                                    {slides.imageUrl?(<LazyLoadImage className="w-100" src={base_url + slides.imageUrl} alt="logo here" />):null}
                                                                    <h5 className="text-center w-100 p-3 font-13 font-medium"> {slides.imageTitle} </h5>
                                                                </div>
                                                        </div>):null
                                                     ))
                                                   }
                                                </div>
                                            </div>
                                            {data3.length>0?(<div className="col-12 text-center  pt-lg-5 px-0">
                                                <Link to={'/installed-services'} className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mob-view-all">View All</Link>
                                            </div>):null}
                                        </div>
                                    </div>
                                </div>
                                {manufacturing.title?(<Nav tabs className="nav-fill tab-none d-none d-xl-flex ">
                                    <NavItem className="text-uppercase txt-left-mob">
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.toggle('1'); }}
                                        >
                                            <span className="font-weight-medium font-weight-bold">{manufacturing.title}</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="text-uppercase txt-left-mob">
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggle('2'); }}
                                        >
                                            <span className="font-weight-medium font-weight-bold">{distributionservice.title}</span>
                                        </NavLink>
                                    </NavItem>

                                    <NavItem className="text-uppercase txt-left-mob">
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '3' })}
                                            onClick={() => { this.toggle('3'); }}
                                        >
                                            <span className="font-weight-medium font-weight-bold">{installationservice.title}</span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>):null}
                            </div>
                            <TabContent className="tab-none d-none d-xl-block" activeTab={this.state.activeTab}>
                                <TabPane tabId={this.state.activeTab}>
                                    <SliderComponent item={this.state.activeTab == 1 ? data1 : this.state.activeTab == 2? data2 : data3} />
                                </TabPane>
                            </TabContent>
                            {data1.length>0?(<div className="col-12 text-center  pt-lg-5 px-0">
                                {this.state.activeTab === '1' ? (<Link to={'/manufacturing'} className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block d-none-mob login-blue text-white">View All</Link>) : this.state.activeTab === '2' ? (<Link to={'/distribution'} className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block d-none-mob login-blue text-white">View All</Link>) : this.state.activeTab === '3' ? (<Link to={'/installed-services'} className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block d-none-mob login-blue text-white">View All</Link>) : null}
                            </div>):null}
                        </div>
                    </div>
                </div>
            </div>
            <div id="storeLocatorModule">
                <StoreLocatoreComponent sendQuote={this.sendQuote} getData={this.getStoreData} quoteData={this.props.quoteData} storeData={this.props.storeData} document={this.props.document}/>
            </div>
            <div className="bg-gray col-12 pt-5 pt-md-0 pb-sm-4 small-pad  pb-md-5 px-0">
                <div className="container  small-pad py-sm-4">
                    <div className="col-12 small-pad px-0">
                        <div className="m-auto small-pad col-12 col-xl-11">
                            <h2 className="display-4 font-small-mob text-center font-weight-normal">{homedata.section3Title}</h2>
                            <div dangerouslySetInnerHTML={{ __html: homedata.section3Description }} className="text-center line-height py-4 construct-desc"></div>
                            <div className="col-12 text-center pb-5 p-0">
                                {homedata.section3ButtonLink?(<a href={homedata.section3ButtonLink} rel="noopener noreferrer" target="_blank" className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white d-none-mob" style={{ marginBottom: '30px' }}>{homedata.section3ButtonCaption} </a>):null}
                                <div className="w-100">
                                    <div className="portal_vdo d-inline-block mb-3 position-relative">
                                        {this.state.showVideo ? (<div className="vidio_over">
                                        
                                            <div className="portal-video">

                                            <div className="portal-inner-section">

                                            <iframe title="instructionvideo" src={homedata.section3VideoLink}
                                                width="760"
                                                height="386"
                                                frameBorder="0">
                                            </iframe>
                                        </div></div> </div>) : null}
                                        {homedata.section3VideoThumbnail ? (<a className="d-block bottom-video" onClick={() => { this.showVideo() }}>
                                            <LazyLoadImage className="w-mob-100  b_img_new" src={homedata.section3VideoThumbnail} alt="logo here" /></a>) : null}
                                    </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {this.state.modal && <Modal isOpen={this.state.modal} toggle={this.togglezipcode} className="request-form modal-dialog-centered">
                <ModalHeader toggle={this.togglezipcode}>
                    <span className="display-4 m-auto pt-5 pb-4 d-block ">
                            Enter your zip code
                    </span>
                </ModalHeader>
                <ModalBody className="px-4 pt-4 px-md-5 pt-md-5 pb-0">
                    <div className="row  m-0">
                        <div className="form-group col-12  mb-5">
                            <div className="position-relative">
                                <input id="zipcode" type="text" maxLength="5" onChange={(e) => this.handleZipcodeChange(e)} className="form-control effect-2 mb-0 bg-transparent rounded-0 border-top-0  border-left-0 border-right-0 px-0" autoComplete="off" />
                                <label htmlFor="Zip" className="head-label h5 font-weight-normal">Zip Code</label>
                                <span className="focus-border"></span>
                            </div>
                            <span className="error-message">{this.state.zipcodeErr}</span>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="border-0 px-5  pb-5">
                    <Button className="btn btn-danger text-uppercase theme-btn  px-4 py-3" onClick={this.goToStoreQuote}>Request Quote</Button>{' '}
                </ModalFooter>
              </Modal>}
            

            {
                this.state.sendquotemodal && <Modal isOpen={this.state.sendquotemodal} toggle={this.togglesendquote} className="request-form modal-dialog-centered">
                <ModalHeader toggle={this.togglesendquote}><span className="display-4 m-auto pt-5 pb-4 d-block ">Request a quote</span></ModalHeader>
                <ModalBody className="px-4 pt-4 px-md-5 pt-md-5 pb-0">
                    <div className="row  m-0">
                        <div className="form-group col-md-6  mb-5">
                            <div className="position-relative">
                                <input id="name" type="text" className="form-control effect-2 mb-0 bg-transparent rounded-0 border-top-0  border-left-0 border-right-0 px-0" autoComplete="off" />
                                <label htmlFor="name" className="head-label h5 font-weight-normal">Full Name</label>
                                <span className="focus-border"></span>
                            </div>
                            <span className="error-message">{this.state.nameErr}</span>

                        </div>
                        <div className="form-group col-md-6  mb-5">
                            <div className="position-relative">
                                <input id="email" type="text" className="form-control effect-2 mb-0 bg-transparent rounded-0 border-top-0  border-left-0 border-right-0 px-0" autoComplete="off" />
                                <label htmlFor="Email" className="head-label h5 font-weight-normal">Email</label>
                                <span className="focus-border"></span>
                            </div>
                            <span className="error-message">{this.state.emailErr}</span>

                        </div>
                        <div className="form-group col-md-12  mb-5">
                            <div className="position-relative choose_serv">
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.selectDropToggle}>
                                    <DropdownToggle caret>
                                        {this.state.serviceOption}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => { this.setState({ serviceOption: "Manufacturing" }) }}>Manufacturing</DropdownItem>
                                        <DropdownItem onClick={() => { this.setState({ serviceOption: "Distribution" }) }}>Distribution</DropdownItem>
                                        <DropdownItem onClick={() => { this.setState({ serviceOption: "Installation" }) }}>Installation</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <label htmlFor="Email" className="head-label h5 font-weight-normal">Service Type</label>
                            </div>
                        </div>
                        <div className="form-group col-md-6  mb-5">
                            <div className="position-relative">
                                <input id="zipcode" type="text" maxLength="5" onChange={(e) => this.handleZipcodeChange(e)} className="form-control effect-2 mb-0 bg-transparent rounded-0 border-top-0  border-left-0 border-right-0 px-0" autoComplete="off" />
                                <label htmlFor="Zip" className="head-label h5 font-weight-normal">Zip Code</label>
                                <span className="focus-border"></span>
                            </div>
                            <span className="error-message">{this.state.zipcodeErr}</span>

                        </div>
                        <div className="form-group col-md-6  mb-5">
                            <div className="position-relative">
                                <input id="phone" type="text" maxLength="12" onChange={(e) => this.handlePhoneChange(e)} className="form-control effect-2 mb-0 bg-transparent rounded-0 border-top-0  border-left-0 border-right-0 px-0" autoComplete="off" />
                                <label htmlFor="Phone" className="head-label h5 font-weight-normal">Phone</label>
                                <span className="focus-border"></span>
                            </div>
                            <span className="error-message">{this.state.phoneErr}</span>

                        </div>
                        <div className="form-group col-md-12  mb-5">
                            <div className="position-relative">
                                <textarea id="message" className="form-control effect-2 mb-0 bg-transparent rounded-0 border-top-0  border-left-0 border-right-0 px-0" autoComplete="off"></textarea>
                                <label htmlFor="Phone" className="head-label h5 font-weight-normal">Message</label>
                                <span className="focus-border"></span>
                            </div>
                            <span className="error-message">{this.state.messageErr}</span>
                            <span className="success-message">{this.state.successMsg}</span>
                        </div>
                        <div className="form-group col-md-12  mb-5">

                            <ReCAPTCHA
                                sitekey={captchaKey}
                                onChange={(e) => this.onRecaptchChange(e)}
                            />
                            <span className="error-message">{this.state.captchaErr}</span>
                        </div>
                        <div style={{ color: "#2C3E50" }}>{this.state.quoteEmailStatus}</div>
                    </div>
                </ModalBody>
                <ModalFooter className="border-0 px-5  pb-5">
                    <Button className="btn btn-danger text-uppercase theme-btn  px-4 py-3" onClick={this.sendRequestQuote}>Request a Quote</Button>{' '}
                </ModalFooter>
        </Modal>
            }
               
        </div>
        );
    }
}

export default GoogleApiWrapper(
    (props) => ({
        apiKey: globalVar.apiKey,
        language: props.language,
    }
    ))(ContainerComponent)
