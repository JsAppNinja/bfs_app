import React, { Component } from 'react';
import { globalVar } from "../config";
import close from "../img/close.svg";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReCAPTCHA from "react-google-recaptcha";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';
import Floater from 'react-floater';

var captchaKey = globalVar.googleCaptchaKey;


let lastStore = ""
class DetailsLocationsComponent extends Component {

    constructor() {
        super();

        //Defining state varibale
        this.state = {
            store: null,
            pop_up_images: null,
            modal: false,
            modal1: false,
            nameErr: "",
            emailErr: "",
            zipcodeErr: "",
            messageErr: "",
            captchaErr: "",
            gpsError: "",
            dropdownOpen: false,
            serviceOption: "Service Type",
            quoteEmailStatus: "",
            storeid: "",
            recaptchaValue: "",

        }

        //binding function
        this.toggle = this.toggle.bind(this);
        this.toggle1 = this.toggle1.bind(this)
        this.sendQuote = this.sendQuote.bind(this);
        this.setLocationZipCode = this.setLocationZipCode.bind(this);
        this.onRecaptchChange = this.onRecaptchChange.bind(this);
    }

    componentDidMount() {
        let body = document.getElementsByTagName('body');
        body[0].classList.add('location-details')
    }
    componentWillUnmount() {
        let body = document.getElementsByTagName('body');
        body[0].classList.remove('location-details')
    }
    componentDidUpdate() {
        let index = window.location.href.indexOf("location_")
        let storeName = window.location.href.slice(index + 9, window.location.href.length)

        if (lastStore !== storeName || !this.state.store) {
            this.getStoreDetail(storeName ? storeName : "Chesapeake-Gypsum");
            lastStore = storeName
        }

    }


    /**
     * Get the user token
    */
    getUserToken(RootId) {
        this.getHomeContent(RootId);
    }


    /**
     * Get the store detail from API
    */
    getStoreDetail(storeName) {
        fetch(globalVar.base_url1 + '/umbraco/Api/Content/GetLocationDetail?locationAlias=' + storeName, {
            method: 'get',
        }).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({ store: data.Properties, storeid: data.Id })
        }).catch(() => {
            window.history.go(-1);
        });
    }


    /**
     * Toggle location zipcode modal
    */
    setLocationZipCode = () => {
        this.setState({
            modal: true
        });
    }

    /**
     * Toggling modal
    */
    toggle() {
        if (this.state.modal === false) {
            document.getElementsByTagName("html")[0].classList.add("bfs-modal-opened")
        } else {
            document.getElementsByTagName("html")[0].classList.remove("bfs-modal-opened")
        }
        this.setState({
            modal: !this.state.modal
        });
    }

    /**
     * Toggle the service images modal
     */
    toggle1() {
        this.setState({
            modal1: !this.state.modal1
        })
    }

    /**
     * Show the service details
     */
    showServiceModal = () => {
        this.setState({
            modal1: true
        })
    }

    /**
     * Sending request quote email
    */
    sendQuote() {

        let self = this;
        if (this.checkFormValidation() === true) {
            this.setState({ quoteEmailStatus: "Please wait sending email..." })
            let quoteData = {
                FullName: document.getElementById("name").value,
                Email: document.getElementById("email").value,
                ServiceName: this.state.serviceOption,
                ZipCode: document.getElementById("zipcode").value,
                Phone: document.getElementById("phone").value,
                Message: document.getElementById("message").value,
                LocationId: this.state.storeid,
                RecaptchaResponse: this.state.recaptchaValue
            }
            this.props.sendQuote(quoteData);
            setTimeout(() => {
                if (self.props.quoteData) {
                    setTimeout(() => {
                        self.setState({
                            modal: !self.state.modal
                        });
                    }, 2000)
                    self.setState({ quoteEmailStatus: "Email has been successfully sent!!!" })
                } else {
                    self.setState({ quoteEmailStatus: "Internal problem occured not able to send email please try again!" })
                }
            }, 10000)

            setTimeout(() => {
                this.setState({ quoteEmailStatus: "" })
            }, 20000)
        }
    }

    /**
     * Validating email
    */
    validateEmail(email) {
        let re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
        return re.test(email);
    }

    /**
     * Form validation
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
     * zipcode validation 
    */
    handleZipcodeChange() {
        var element = document.getElementById("zipcode");
        var regex = /[^0-9]/gi;
        element.value = element.value.replace(regex, "");
    }

    /**
     * Phone number validation
    */
    handlePhoneChange() {
        var element = document.getElementById("phone");
        var regex = /[^0-9]/gi;
        element.value = element.value.replace(regex, "");
    }


    /**
     * Allowing user to select from dropdown
    */
    selectDropToggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }


    /**
     * Events on recaptcha change
    */
    onRecaptchChange(value) {
        this.setState({ recaptchaValue: value });
    }

    getHoverContent(service) {
        return service.DistributionSuppliers && service.DistributionSuppliers.length && (service.DistributionSuppliers.map((data, index2) => {
            return (<img src={globalVar.base_url1 + data.SupplierLogo} alt="" key={index2} />)
        }))
    }

    render() {
        // console.log(this.state.store)
        let locationname
        if (this.state.store) {
            locationname = this.state.store.locationName
        }
        return (
            <div className="single_location col-12 midcontent">
                {this.state.store ?
                    <div className="col-12 p-0 bg-gray">
                        <div className="bg-gray col-12 py-5">
                            <div className="container">
                                <div className="align-items-center justify-content-center col-12 col-lg-11 m-auto">
                                    <div className="col col-xl-12 text-center px-0 ">
                                        <h1 className="display-4 color-dark-gray text-center">Locations › <span className="font-weight-medium"> {locationname}</span></h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="single_loc_in">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="single_loc_banner">
                                            {this.state.store.largeImage ? (<img alt="bannerimage" className="w-100" src={globalVar.base_url1 + this.state.store.largeImage} />) : null}
                                            <div className="d-lg-flex align-items-center">
                                                <div className="text-left factlogo">
                                                    {this.state.store.logoImage ? (<img alt="bannerimage" className="single_loc_logo mb-3" src={globalVar.base_url1 + this.state.store.logoImage} />) : null}
                                                </div>
                                                <div className="py-3 text-right requestinfo ml-auto">
                                                    <a className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mb-0" onClick={() => { this.setLocationZipCode() }}>Request a Quote</a>
                                                </div>
                                            </div>
                                            <div className="py-3 address ">
                                                <div className="address_box">
                                                    <div className="row mx-0">
                                                        <div className="col-md-6 col-sm-12">
                                                            <div className="add_list">
                                                                <div className="add"><span><i className="fa fa-map-marker"></i></span>
                                                                    {this.state.store.address1}, {this.state.store.city + " "}  {this.state.store.zipCode}</div>
                                                                <div className="add"><span><i className="fa fa-phone"></i></span>
                                                                    <a href={"tel:" + this.state.store.mainPhone}>      {this.state.store.mainPhone}</a>  </div>
                                                                <div className="add" ><span><i className="fa fa-envelope"></i></span>
                                                                    <a href={"mailto:" + this.state.store.email}>{this.state.store.email}</a> </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-sm-12 right_loc">
                                                            <div className="add_list">
                                                                <div className="add"><b>General Manager:</b>
                                                                    <span> {this.state.store.managerName}</span> </div>
                                                                <div className="add"><b>Sales Manager:</b>
                                                                    <span>  {this.state.store.salesManager}  </span></div>
                                                                <div className="add"><b>Hours:</b>
                                                                    <span> {this.state.store.hoursMF}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="py-3 address loc_distri pb-0">
                                                <h4 className="py-3 mb-2">Distributed Products</h4>
                                                <div className="row pb-4 pb-lg-5">
                                                    {this.state.store.suppliers && JSON.parse(this.state.store.suppliers).length > 0 &&
                                                        JSON.parse(this.state.store.suppliers).sort((a, b) => a.DistributionName.localeCompare(b.DistributionName)).map((service, index) => {
                                                            return (
                                                                service.DistributionSuppliers && service.DistributionSuppliers.length &&
                                                                <div className="col-md-3 col-sm-6" key={index}  >
                                                                    <div className="dlink mb-2">
                                                                          <a onClick={() => { this.showServiceModal(); this.setState({ pop_up_images: service.DistributionSuppliers }) }} >
                                                                                {service.DistributionName}</a>
                                                                        {/*<Floater className="our-classs"
                                                                            content={this.getHoverContent(service)
                                                                            }
                                                                            event="hover"
                                                                        >
                                                                            <a onClick={() => { this.showServiceModal(); this.setState({ pop_up_images: service.DistributionSuppliers }) }} >
                                                                                {service.DistributionName}</a>
                                                                        </Floater>*/}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            {this.state.store.installedServicesPicker && JSON.parse(this.state.store.installedServicesPicker).length > 0 ? (
                                                <div className="py-0 address loc_distri pb-4 pb-lg-5">
                                                    <h4 className="py-3 mb-2">Installed Services</h4>
                                                    <div className="row pb-4 pb-lg-5">
                                                        {JSON.parse(this.state.store.installedServicesPicker).sort((a, b) => a.TypeName.localeCompare(b.TypeName)).map(function (service, index) {
                                                            return (
                                                                <div className="col-md-3 col-sm-6" key={index}>
                                                                    <div className="dlink mb-2"> {service.TypeName}</div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null}

                {/* <div className="modal fade detail_loc_mdl" id="myModal1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button type="button" className="close position-absolute md-close" data-dismiss="modal"><img src={close} alt="close" /></button>
                                {
                                    this.state.pop_up_images && typeof this.state.pop_up_images==='object' ? (this.state.pop_up_images.map(function (data, index) {
                                        return (<img src={globalVar.base_url1 + data.SupplierLogo} alt="" key={index} />)
                                    })) : null
                                }

                            </div>
                        </div>
                    </div>
                </div> */}

                {/* THis is the Service image modal */}
                <Modal isOpen={this.state.modal1} toggle={this.toggle1} className="request-form modal-dialog-centered">
                    {/* <ModalHeader toggle={this.toggle}><span className="display-4 m-auto pt-5 pb-4 d-block ">Request a quote</span></ModalHeader> */}
                    <ModalBody className="service-images-model">
                        <button type="button" className="close position-absolute md-close" onClick={this.toggle1}><img src={close} alt="close" /></button>
                        {
                            this.state.pop_up_images && typeof this.state.pop_up_images === 'object' ? (this.state.pop_up_images.map(function (data, index) {
                                return (<img src={globalVar.base_url1 + data.SupplierLogo} alt="" key={index} />)
                            })) : null
                        }

                    </ModalBody>
                    {/* <ModalFooter className="border-0 px-5  pb-5">
                        <Button className="btn btn-danger text-uppercase theme-btn  px-4 py-3" onClick={this.sendQuote}>Request a Quote</Button>{' '}
                    </ModalFooter> */}
                </Modal>


                {/* This is quotes modal */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="request-form modal-dialog-centered" >
                    <ModalHeader toggle={this.toggle}><span className="display-4 m-auto pt-5 pb-4 d-block ">Request a quote</span></ModalHeader>
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
                        <Button className="btn btn-danger text-uppercase theme-btn  px-4 py-3" onClick={this.sendQuote}>Request a Quote</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default DetailsLocationsComponent;

/**
 * Define the proptypes
 */
DetailsLocationsComponent.propTypes = {
    sendQuote: PropTypes.func,
    homeData: PropTypes.array
};