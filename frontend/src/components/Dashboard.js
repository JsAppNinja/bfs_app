import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { globalVar } from "../config";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";
import PropTypes from "prop-types";
import ContainerComponent from "./Container";
import { GoogleApiWrapper } from "google-maps-react";

// Import the images
import tenor from "../img/loader.gif";
import HomeSlider from "./HomeSlider.js";
var mybody = {};

class DashboardComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videoIndex: 0,
			paused: false,
			addClass: false,
			modal: false,
			toggleClass: false,
			isPlaying: true,
			pausedonmobile: false,
			activeIndex: 0,
			mobilevideoIndex: 0,
			mobileVideoTitle: "",
			storeData: [],
			quoteData: "",
			showLoader: true,
			noStoreFound: false,
			refreshStores: [],
			sendquotemodal: false,
			emailErr: "",
			zipcodeErr: "",
			messageErr: "",
			captchaErr: "",
			dropdownOpen: false,
			serviceOption: "Service Type",
			quoteEmailStatus: "",
			recaptchaValue: "",
			autoSlide: true,
			clicked: false,
		};

		this.toggle = this.toggle.bind(this);
		this.getStoreData = this.getStoreData.bind(this);
		this.sendQuote = this.sendQuote.bind(this);
		this.togglesendquote = this.togglesendquote.bind(this);
		this.sendRequestQuote = this.sendRequestQuote.bind(this);
	}

	/**
	 *  Toggle the modal
	 */
	toggle() {
		this.setState({
			modal: !this.state.modal,
		});
	}

	/**
	 *  Toggle the send Quote modal
	 */
	togglesendquote() {
		if (this.state.sendquotemodal === false) {
			document
				.getElementsByTagName("html")[0]
				.classList.add("bfs-modal-opened");
		} else {
			document
				.getElementsByTagName("html")[0]
				.classList.remove("bfs-modal-opened");
		}
		this.setState({
			sendquotemodal: !this.state.sendquotemodal,
		});
	}

	/**
	 *  Toggle the request Quote
	 */
	togglerequestquote() {
		if (localStorage.getItem("selectedStore")) {
			this.togglesendquote();
		} else {
			this.toggle();
		}
	}

	/**
	 *  Zip code Validator
	 */
	handleZipcodeChange(e) {
		var element = document.getElementById("zipcode");
		var regex = /[^0-9]/gi;
		element.value = element.value.replace(regex, "");
		this.setState({ zipcode: e.target.value });
	}

	/**
	 *  Hande the phone change
	 */
	handlePhoneChange() {
		var element = document.getElementById("phone");
		var regex = /[^0-9]/gi;
		element.value = element.value.replace(regex, "");
	}

	/**
	 *   Validate the Email
	 */
	validateEmail(email) {
		let re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
		return re.test(email);
	}

	/**
	 *   Events on recaptcha select
	 */
	onRecaptchChange(value) {
		this.setState({ recaptchaValue: value });
	}

	/**
	 *   Sending request quote email
	 */
	sendRequestQuote() {
		let data = localStorage.getItem("selectedStore");
		let storeData = data.split(",");
		if (this.checkFormValidation() === true) {
			this.setState({ quoteEmailStatus: "Please wait sending email..." });
			let quoteData = {
				FullName: document.getElementById("name").value,
				Email: document.getElementById("email").value,
				ServiceName: this.state.serviceOption,
				ZipCode: document.getElementById("zipcode").value,
				Phone: document.getElementById("phone").value,
				Message: document.getElementById("message").value,
				LocationId: storeData[1],
				RecaptchaResponse: this.state.recaptchaValue,
			};
			this.props.sendQuote(quoteData);
			setTimeout(() => {
				if (this.props.quoteData === true) {
					setTimeout(() => {
						this.setState({
							sendquotemodal: !this.state.sendquotemodal,
						});
					}, 2000);
					this.setState({
						quoteEmailStatus: "Email has been successfully sent!!!",
					});
				} else {
					this.setState({
						quoteEmailStatus:
							"Internal problem occured not able to send email please try again!",
					});
				}
			}, 10000);

			setTimeout(() => {
				this.setState({ quoteEmailStatus: "" });
			}, 20000);
		}
	}

	/**
	 *  Handle the form validation
	 */
	checkFormValidation() {
		let check = false;
		if (
			document.getElementById("name").value === "" ||
			document.getElementById("name").value.trim() === ""
		) {
			this.setState({ nameErr: "Name is required." });
		} else {
			this.setState({ nameErr: "" });
		}
		if (!this.validateEmail(document.getElementById("email").value.trim())) {
			this.setState({ emailErr: "Email entered is not valid!!!" });
		} else {
			this.setState({ emailErr: "" });
		}
		if (
			document.getElementById("phone").value === "" ||
			document.getElementById("phone").value.trim() === ""
		) {
			this.setState({ phoneErr: "Phone Number is required." });
		} else {
			this.setState({ phoneErr: "" });
		}
		if (
			document.getElementById("message").value === "" ||
			document.getElementById("message").value.trim() === ""
		) {
			this.setState({ messageErr: "Message is required." });
		} else {
			this.setState({ messageErr: "" });
		}
		if (
			document.getElementById("zipcode").value === "" ||
			document.getElementById("zipcode").value.trim() === ""
		) {
			this.setState({ zipcodeErr: "Zipcode is required." });
		} else {
			this.setState({ zipcodeErr: "" });
		}
		if (this.state.recaptchaValue === "") {
			this.setState({ captchaErr: "Captcha is not valid!!!" });
		} else {
			this.setState({ captchaErr: "" });
		}
		if (
			document.getElementById("name").value === "" ||
			document.getElementById("name").value.trim() === "" ||
			!this.validateEmail(
				document.getElementById("email").value.trim() ||
					document.getElementById("phone").value === "" ||
					document.getElementById("phone").value.trim() === "" ||
					document.getElementById("message").value === "" ||
					document.getElementById("message").value.trim() === "" ||
					document.getElementById("zipcode").value === "" ||
					document.getElementById("zipcode").value.trim() === "" ||
					this.state.recaptchaValue === ""
			)
		) {
			check = true;
		} else {
			check = false;
		}
		if (check) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 *  Select the Dropdown
	 */
	selectDropToggle = () => {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen,
		}));
	};

	/**
	 *  Get the sorted data
	 */
	getStoreData(data) {
		this.props.getStoreData(data);
		this.setState({ storeData: this.props.storeData });
	}

	/**
	 * Send Quote mail
	 */
	sendQuote(data) {
		this.props.sendQuote(data);
		this.setState({ quoteData: this.props.quoteData });
	}

	/**
	 * Show modal popup
	 */
	showPopUP = () => {
		var currentLat = localStorage.getItem("currentlat");
		var currentLng = localStorage.getItem("currentlon");
		if (currentLat) {
			mybody = {};
			mybody["Address"] = "";
			mybody["Radius"] = 200;
			mybody["DistributionList"] = [];
			mybody["InstalledServiceList"] = [];
			mybody["Latitude"] = currentLat;
			mybody["Longitude"] = currentLng;
			this.props.getStoreData(mybody);
			document.getElementById("linkToHome").click();
		} else {
			this.toggle();
		}
	};

	/**
	 * Calling function get location detail from zipcode
	 */
	goToStoreQuote = () => {
		this.setState({ noStoreFound: false });
		if (!this.state.zipcode) {
			this.setState({ zipcodeErr: "Zip code is required." });
		} else if (this.state.zipcode.length !== 5) {
			this.setState({ zipcodeErr: "Zip code is not valid." });
		} else {
			this.setState({ zipcodeErr: "" });
			this.getLatLngFromZip(this.state.zipcode);
		}
	};

	/**
	 * Getting latitude and longitude from API through zipcode
	 */
	getLatLngFromZip = zip => {
		let self = this;
		var geocoder = new window.google.maps.Geocoder();
		geocoder.geocode({ componentRestrictions: { postalCode: zip } }, function(
			results,
			status
		) {
			if (results[0]) {
				mybody = {};
				mybody["Address"] = "";
				mybody["Radius"] = 200;
				mybody["DistributionList"] = [];
				mybody["InstalledServiceList"] = [];
				mybody["Latitude"] = results[0].geometry.location.lat();
				mybody["Longitude"] = results[0].geometry.location.lng();
				self.setState({ noStoreFound: false });
				self.props.getStoreData(mybody);
				self.toggle();
				document.getElementById("linkToHome").click();
			} else {
				self.setState({ zipcodeErr: "Zip code could not be found." });
			}
		});
	};

	render() {
		if (this.props.basicDataLoaded) {
			this.props.getHomePageData();
			this.props.getConstructionTypeDataHome();
		}
		return (
			<div className=" pt-xl-3 bg-gray midcontent">
				<div className="row m-0 bg-gray pb-2 home_slider_mein_sec">
					<HomeSlider homeData={this.props.homeData} />
				</div>
				<ContainerComponent
					document={document}
					location={window.location}
					sendQuote={this.sendQuote}
					quoteData={this.props.quoteData}
					getData={this.getStoreData}
					storeData={this.props.storeData}
					homeData={this.props.homeData}
					constructionData={this.props.constructiontypeDataHome}
				/>
				<Link to={"/"} style={{ display: "none" }} id="linkToHome" />

				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className="request-form modal-dialog-centered"
				>
					<ModalHeader toggle={this.toggle}>
						{this.state.noStoreFound === true ? (
							<span className="display-6 m-auto pt-5 pb-4 d-block ">
								We found no store nearby you please try with zipcode.
							</span>
						) : (
							<span className="display-4 m-auto pt-5 pb-4 d-block ">
								Enter your zip code
							</span>
						)}
					</ModalHeader>
					<ModalBody className="px-4 pt-4 px-md-5 pt-md-5 pb-0">
						<div className="row  m-0">
							<div className="form-group col-12  mb-5">
								<div className="position-relative">
									<input
										id="zipcode"
										type="text"
										maxLength="5"
										onChange={e => this.handleZipcodeChange(e)}
										className="form-control effect-2 mb-0 bg-transparent rounded-0 border-top-0  border-left-0 border-right-0 px-0"
										autoComplete="off"
									/>
									<label
										htmlFor="Zip"
										className="head-label h5 font-weight-normal"
									>
										Zip Code
									</label>
									<span className="focus-border" />
								</div>
								<span className="error-message">{this.state.zipcodeErr}</span>
							</div>
						</div>
					</ModalBody>
					<ModalFooter className="border-0 px-5  pb-5">
						<Button
							className="btn btn-danger text-uppercase theme-btn  px-4 py-3"
							onClick={this.goToStoreQuote}
						>
							Request Quote
						</Button>{" "}
					</ModalFooter>
				</Modal>
				<Modal
					isOpen={this.state.sendquotemodal}
					toggle={this.togglesendquote}
					className="request-form modal-dialog-centered"
				>
					<ModalHeader toggle={this.togglesendquote}>
						<span className="display-4 m-auto pt-5 pb-4 d-block ">
							Request a quote
						</span>
					</ModalHeader>
					<ModalBody className="px-4 pt-4 px-md-5 pt-md-5 pb-0">
						<div className="row  m-0">
							<div className="form-group col-md-6  mb-5">
								<div className="position-relative">
									<input
										id="name"
										type="text"
										className="form-control effect-2 mb-0 bg-transparent rounded-0 border-top-0  border-left-0 border-right-0 px-0"
										autoComplete="off"
									/>
									<label
										htmlFor="name"
										className="head-label h5 font-weight-normal"
									>
										Full Name
									</label>
									<span className="focus-border" />
								</div>
								<span className="error-message">{this.state.nameErr}</span>
							</div>
							<div className="form-group col-md-6  mb-5">
								<div className="position-relative">
									<input
										id="email"
										type="text"
										className="form-control effect-2 mb-0 bg-transparent rounded-0 border-top-0  border-left-0 border-right-0 px-0"
										autoComplete="off"
									/>
									<label
										htmlFor="Email"
										className="head-label h5 font-weight-normal"
									>
										Email
									</label>
									<span className="focus-border" />
								</div>
								<span className="error-message">{this.state.emailErr}</span>
							</div>
							<div className="form-group col-md-12  mb-5">
								<div className="position-relative choose_serv">
									<Dropdown
										isOpen={this.state.dropdownOpen}
										toggle={this.selectDropToggle}
									>
										<DropdownToggle caret>
											{this.state.serviceOption}
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem
												onClick={() => {
													this.setState({ serviceOption: "Manufacturing" });
												}}
											>
												Manufacturing
											</DropdownItem>
											<DropdownItem
												onClick={() => {
													this.setState({ serviceOption: "Distribution" });
												}}
											>
												Distribution
											</DropdownItem>
											<DropdownItem
												onClick={() => {
													this.setState({ serviceOption: "Installation" });
												}}
											>
												Installation
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
									<label
										htmlFor="Email"
										className="head-label h5 font-weight-normal"
									>
										Service Type
									</label>
								</div>
							</div>
							<div className="form-group col-md-6  mb-5">
								<div className="position-relative">
									<input
										id="zipcode"
										type="text"
										maxLength="5"
										onChange={e => this.handleZipcodeChange(e)}
										className="form-control effect-2 mb-0 bg-transparent rounded-0 border-top-0  border-left-0 border-right-0 px-0"
										autoComplete="off"
									/>
									<label
										htmlFor="Zip"
										className="head-label h5 font-weight-normal"
									>
										Zip Code
									</label>
									<span className="focus-border" />
								</div>
								<span className="error-message">{this.state.zipcodeErr}</span>
							</div>
							<div className="form-group col-md-6  mb-5">
								<div className="position-relative">
									<input
										id="phone"
										type="text"
										maxLength="12"
										onChange={e => this.handlePhoneChange(e)}
										className="form-control effect-2 mb-0 bg-transparent rounded-0 border-top-0  border-left-0 border-right-0 px-0"
										autoComplete="off"
									/>
									<label
										htmlFor="Phone"
										className="head-label h5 font-weight-normal"
									>
										Phone
									</label>
									<span className="focus-border" />
								</div>
								<span className="error-message">{this.state.phoneErr}</span>
							</div>
							<div className="form-group col-md-12  mb-5">
								<div className="position-relative">
									<textarea
										id="message"
										className="form-control effect-2 mb-0 bg-transparent rounded-0 border-top-0  border-left-0 border-right-0 px-0"
										autoComplete="off"
									/>
									<label
										htmlFor="Phone"
										className="head-label h5 font-weight-normal"
									>
										Message
									</label>
									<span className="focus-border" />
								</div>
								<span className="error-message">{this.state.messageErr}</span>
								<span className="success-message">{this.state.successMsg}</span>
							</div>
							<div className="form-group col-md-12  mb-5">
								<ReCAPTCHA
									sitekey="6LeGWXcUAAAAANWVU5kzmSQEd85iFIz4Mk3eL2AZ"
									onChange={e => this.onRecaptchChange(e)}
								/>
								<span className="error-message">{this.state.captchaErr}</span>
							</div>
							<div style={{ color: "#2C3E50" }}>
								{this.state.quoteEmailStatus}
							</div>
						</div>
					</ModalBody>
					<ModalFooter className="border-0 px-5  pb-5">
						<Button
							className="btn btn-danger text-uppercase theme-btn  px-4 py-3"
							onClick={this.sendRequestQuote}
						>
							Request a Quote
						</Button>{" "}
					</ModalFooter>
				</Modal>

				{this.state.showLoader ? (
					<div className="showloader ">
						<img src={tenor} alt="loader" />
					</div>
				) : null}
			</div>
		);
	}
}

export default GoogleApiWrapper(props => ({
	apiKey: globalVar.apiKey,
	language: props.language,
}))(DashboardComponent);

/**
 * Define the proptypes
 */
DashboardComponent.propTypes = {
	constructiontypeDataHome: PropTypes.array,
	homeData: PropTypes.array,
	refreshStore: PropTypes.array,
	storeData: PropTypes.array,
	getStoreData: PropTypes.func,
	sendQuote: PropTypes.func,
	quoteData: PropTypes.object,
	basicDataLoaded: PropTypes.bool,
	getHomePageData: PropTypes.func,
	getConstructionTypeDataHome: PropTypes.func,
};
