
import React, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import shadow from "../assets/img/shadow.png";
import { globalVar } from "../config";
import { topFunction } from "../assets/js/utils";
import PropTypes from 'prop-types';
import axios from 'axios';
var base_url = globalVar.base_url1;

class ContactUsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.selectChange = this.selectChange.bind(this);
        this.sendContact = this.sendContact.bind(this);

    }

    /**
     * Defining proptypes
    */
    static get propTypes() {
        return {
            locationZipCode: PropTypes.any
        };
    }


    /**
     * Function to set state to their initial state
    */
    getInitialState = () => {
        const initialState = {
            showError: false,
            ToAddress: "",
            ZipCode: "",
            Name: "",
            Company: "",
            EmailAddress: "",
            Phone: "",
            ContactTime: "",
            HearAboutUs: "",
            Message: "",
            RecaptchaResponse: "",
            zipCodeError: "",
            nameError: "",
            companyError: "",
            emailError: "",
            phoneError: "",
            contactTimeError: "",
            hearError: "",
            messageError: "",
            captchaError: "",
            confirmationMessage: "",
            content: "",
            title: "",
            backimage: ""
        }
        return initialState;
    }


    /**
     * API to send email for contact us
    */
    getContactusData() {
        let RootId = 12764;
        fetch(globalVar.base_url1 + '/umbraco/api/Content/get/' + RootId, {
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
                        content: data.Properties.content,
                        title: data.Properties.pageTitle,
                        backimage: backimage
                    }
                )
            }
        }).catch(() => {

        });
    }

    componentDidMount() {
        this.getContactusData();
    }


    /**
     * To reset the state
    */
    resetState = () => {
        this.setState(this.getInitialState());
        topFunction();
    }

    /**
     * Action on recaptcha change
    */
    onRecaptchChange(value) {
        this.setState({
            RecaptchaResponse: value
        })
    }


    /**
     * Validating email
    */
    validateEmail(email) {
        let re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
        return re.test(email);
    }

    /**
     * Select box change
    */
    selectChange(e) {
        let self = this;
        if (e.target.value !== "reason") {
            self.setState({
                showcontactdiv: true
            })
        } else {
            self.setState({
                showcontactdiv: false
            })
        }
    }


    /**
     * API to send contact us email
    */
    sendContact = () => {
        let data = this.state;
        let self = this;
        data['LocationZipCode'] = this.props.locationZipCode ? this.props.locationZipCode : ""

        if (this.validateForm()) {
            this.setState({ confirmationMessage: "We are submitting your form." })

            axios.post(base_url +'/umbraco/Api/Content/ContactUs',data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                
                if(response.data){
                    this.setState({ confirmationMessage: "Your form has been submitted successfully." })
                    setTimeout(() => {
                        self.resetState();
                    }, 2000)
                }
            }).catch((error) => {
                this.setState({ confirmationMessage: error })
            });

        }

    }

    /**
     * Detect textfield change and fire event on the basis of that
    */
    handleChange = (event) => {
        if (event.target.id === "ZipCode") {
            this.numberOnlyZip(event)
        } else if (event.target.id === "Phone") {
            this.numberOnlyPhone(event)

        } else {
            this.setState({
                [event.target.id]: event.target.value
            });

        }
    }


    /**
     * Checking validation whether number only has been entered in zip field
    */
    numberOnlyZip(event) {
        var element = document.getElementById("ZipCode");
        var regex = /[^0-9]/gi;
        element.value = element.value.replace(regex, "");
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    /**
     * Checking validation whether number only has been entered in phone number field
    */
    numberOnlyPhone(event) {
        var element = document.getElementById("Phone");
        var regex = /[^0-9]/gi;
        element.value = element.value.replace(regex, "");
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    /**
     * Validating the contact us form
    */
    validateForm() {
        let self = this;
        if (!self.state.ZipCode) {
            self.setState({
                zipCodeError: "Please enter valid zipcode."
            });
        } else {
            self.setState({
                zipCodeError: ""
            });
        }

        if (!self.state.Name) {
            self.setState({
                nameError: "Please enter your name."
            });
        } else {
            self.setState({
                nameError: ""
            });
        }

        if (!self.state.Company) {
            self.setState({
                companyError: "Please enter your company name."
            });
        } else {
            self.setState(
                {
                    companyError: ""
                }
            )
        }

        if (!self.validateEmail(self.state.EmailAddress)) {
            self.setState({
                emailError: "Please enter valid email."
            });
        } else {
            self.setState(
                {
                    emailError: ""
                }
            )
        }

        if (!self.state.Phone) {
            self.setState({
                phoneError: "Please enter your Phone Number."
            });
        } else {
            self.setState(
                {
                    phoneError: ""
                }
            )
        }

        if (!self.state.ContactTime) {
            self.setState({
                contactTimeError: "Please select your preferred contact time."
            });
        } else {
            self.setState({
                contactTimeError: ""
            });
        }

        if (!self.state.HearAboutUs) {
            self.setState({
                hearError: "Please select how did you hear about us."
            });
        } else {
            self.setState({
                hearError: ""
            });
        }

        if (!self.state.Message) {
            self.setState({
                messageError: "Please enter your message."
            });
        } else {
            self.setState({
                messageError: ""
            });
        }

        if (!self.state.RecaptchaResponse) {
            self.setState({
                captchaError: "Please enter valid captcha."
            });
        } else {
            self.setState({
                captchaError: ""
            });
        }

        if (self.state.ZipCode && self.state.Name && self.state.Company && self.validateEmail(self.state.EmailAddress) && self.state.ContactTime && self.state.HearAboutUs && self.state.Message && self.state.RecaptchaResponse) {
            return true
        } else {
            return false
        }

    }

    render() {
        return (
            <div className="contact_mein midcontent">
                <div className="container">
                    <div className="col-12">
                        <div className="BasicPageTopWrap mt-3">
                            {this.state.backimage ? (<div className="banner">
                                <img className="w-100" src={this.state.backimage} border="0" alt="Resource Center - Green Works " />
                            </div>) : null}
                            <h1 className="MainH1">
                                {this.state.title}
                            </h1>
                            <img className="shadow-img w-100" alt="line" src={shadow} />
                        </div>
                    </div>
                    <div className="row mx-0 pb-5 cnt-section">
                        <div className="xs-hidden sm-hidden md-hidden col-lg-1"></div>
                        <div className="col-md-7 col-lg-6">
                            <div style={{ paddingBottom: "40px", maxWidth: "400px", margin: "0 auto" }}>
                                <h3 style={{ textAlign: "center" }}>Get in touch with BFS</h3>
                                {this.state.showError ? (<h6 style={{ color: "red" }}>All fields are mandatory</h6>) : null}
                                <div className="validation-summary-valid" data-valmsg-summary="true">
                                </div>
                                <div className="form-group">
                                    <select onChange={(e) => { this.handleChange(e) }} id="ToAddress" value={this.state.ToAddress} name="ToAddress">
                                        <option id="reason" value="">Reason for Inquiry</option>
                                        <option id="sales" value="sales">Sales</option>
                                        <option id="warranty" value="warranty">Warranty</option>
                                        <option id="safety" value="safety">Safety</option>
                                        <option id="careers" value="careers">Careers</option>
                                        <option id="other" value="other">Other</option>
                                    </select>
                                </div>

                                {this.state.ToAddress ? (<form> <div className="InnerFormWrap" style={{ "display": "block" }}>
                                    <span className="field-validation-valid" data-valmsg-for="ZipCode" data-valmsg-replace="true"></span>
                                    <div className="form-group">
                                        <input data-val="true" maxLength="5" data-val-required="The ZipCode field is required." onChange={(e) => { this.handleChange(e) }} id="ZipCode" name="ZipCode" placeholder="Enter Zip Code" type="text" />
                                    </div>
                                    <div><h6 style={{ color: "red" }}>{this.state.zipCodeError}</h6></div>
                                    <span className="field-validation-valid" data-valmsg-for="Name" data-valmsg-replace="true"></span>
                                    <div className="form-group">
                                        <input data-val="true" data-val-required="The Name field is required." id="Name" onChange={(e) => { this.handleChange(e) }} name="Name" placeholder="Name" type="text" />
                                    </div>

                                    <div><h6 style={{ color: "red" }}>{this.state.nameError}</h6></div>


                                    <span className="field-validation-valid" data-valmsg-for="Company" data-valmsg-replace="true"></span>
                                    <div className="form-group">
                                        <input data-val="true" data-val-required="The Company field is required." onChange={(e) => { this.handleChange(e) }} id="Company" name="Company" placeholder="Company" type="text" />
                                    </div>
                                    <div><h6 style={{ color: "red" }}>{this.state.companyError}</h6></div>


                                    <span className="field-validation-valid" data-valmsg-for="EmailAddress" data-valmsg-replace="true"></span>
                                    <div className="form-group">
                                        <input data-val="true" id="EmailAddress" onChange={(e) => { this.handleChange(e) }} name="EmailAddress" placeholder="Email" type="text" />
                                    </div>
                                    <div><h6 style={{ color: "red" }}>{this.state.emailError}</h6></div>

                                    <span className="field-validation-valid" data-valmsg-for="Phone" data-valmsg-replace="true"></span>
                                    <div className="form-group">
                                        <input data-val="true" onChange={(e) => { this.handleChange(e) }} data-val-required="The Phone field is required." id="Phone" name="Phone" placeholder="Phone" type="text" />
                                    </div>
                                    <div><h6 style={{ color: "red" }}>{this.state.phoneError}</h6></div>


                                    <span className="field-validation-valid" data-valmsg-for="ContactTime" data-valmsg-replace="true"></span>
                                    <div className="form-group">
                                        <select id="ContactTime" onChange={(e) => { this.handleChange(e) }} name="ContactTime">
                                            <option value="" >Preferred Contact Time</option>
                                            <option value="Morning">Morning</option>
                                            <option value="Afternoon">Afternoon</option>
                                            <option value="Evening">Evening</option>
                                        </select>
                                    </div>
                                    <div><h6 style={{ color: "red" }}>{this.state.contactTimeError}</h6></div>

                                    <span className="field-validation-valid" data-valmsg-for="HearAboutUs" data-valmsg-replace="true"></span>
                                    <div className="form-group">
                                        <select id="HearAboutUs" name="HearAboutUs" onChange={(e) => { this.handleChange(e) }}>
                                            <option value="" >How did you hear about us ?</option>
                                            <option value="Referral">Referral</option>
                                            <option value="Advertising in a newspaper or magazine">Advertising in a newspaper or magazine</option>
                                            <option value="Online site (community, site, newsletters, etc.)">Online site (community, site, newsletters, etc.)</option>
                                            <option value="Search engine">Search engine</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <h6 style={{ color: "red" }}>{this.state.hearError}</h6></div>


                                    <span className="field-validation-valid" data-valmsg-for="Message" data-valmsg-replace="true"></span>
                                    <div className="form-group">
                                        <textarea cols="20" data-val="true" data-val-required="The Message field is required." id="Message" name="Message" onChange={(e) => { this.handleChange(e) }} placeholder="Message" rows="2"></textarea>
                                    </div>
                                    <div><h6 style={{ color: "red" }}>{this.state.messageError}</h6></div>

                                    <div className="form-group">
                                        <ReCAPTCHA
                                            sitekey={globalVar.googleCaptchaKey}
                                            onChange={(e) => this.onRecaptchChange(e)}
                                        />
                                    </div>
                                    <div><h6 style={{ color: "red" }}>{this.state.captchaError}</h6></div>
                                    <div>
                                        <h6 style={{ color: "blue" }}>{this.state.confirmationMessage}</h6>
                                    </div>
                                    <button onClick={() => { this.sendContact() }} type="button" className="sbmtBtn">Submit</button>


                                </div> </form>) : null}

                            </div>
                        </div>
                        <div className="xs-hidden sm-hidden md-hidden col-lg-1"></div>
                        <div className="col-md-5 col-lg-4 ContactInfoCol">
                            <span dangerouslySetInnerHTML={{ __html: this.state.content }}></span>
                        </div>
                    </div>



                </div>
            </div>
        );
    }
}


export default ContactUsComponent;
