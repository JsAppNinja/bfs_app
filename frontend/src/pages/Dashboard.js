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
import {
	Carousel,
	CarouselItem,
	CarouselControl,
	CarouselCaption,
} from "reactstrap";
import PropTypes from "prop-types";
import ReactPlayer from 'react-player';
import ContainerComponent from "../components/Container";
import { GoogleApiWrapper } from "google-maps-react";
import { cancellablePromise, delay } from "../utils";

// Import the images
import mplayButton from "../img/mPlay_button.png";
import playBtn from "../img/play-button.png";
import mpauseButton from "../img/mPausebutton.png";
import Vimeo from "@u-wave/react-vimeo";
import manufacture from "../img/manufacture.jpg";
import weAre from "../img/who-we-are.jpg";
import distribution from "../img/distribution.jpg";
import Service from "../img/services.jpg";
import tenor from "../img/loader.gif";
import slider1 from "../img/sliders/who-we-are.jpg";
import slider2 from "../img/sliders/manufature.jpg";
import slider3 from "../img/sliders/distribution.jpg";
import slider4 from "../img/sliders/installation.jpg";

//Global Variables
var baseurl = globalVar.base_url1;
//const gid = 'AIzaSyCAPzibK06qRZ_9o8V7GxOA8k1a5o3WOYs';
var mybody = {};

const sliders = [ slider1, slider2, slider3, slider4 ];
const thumbnails = [ weAre, manufacture, distribution, Service];

class DashboardComponent extends Component {
	pendingPromises = [];

	constructor(props) {
		super(props);
		this.state = {
			autoSlide: true,
			videoIndex: 0,
			paused: false,
			addClass: false,
			modal: false,
			toggleClass: false,
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
			videos: [],
			allvideos: [],
			dashdata: [],
			mobilevideos: [],
			mobiletitle: "",
			showPlayButton: true,
			backImage: "",
			isPlaying: false,
		};

		this.toggle = this.toggle.bind(this);
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.getStoreData = this.getStoreData.bind(this);
		this.sendQuote = this.sendQuote.bind(this);
		this.togglesendquote = this.togglesendquote.bind(this);
		this.sendRequestQuote = this.sendRequestQuote.bind(this);
		window.addEventListener("resize", function() {});
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.refreshStore &&
			this.props.refreshStore.length !== this.state.refreshStores.length
		) {
			if (this.props.storeData.length === 0) {
				this.toggle();
				this.setState({
					noStoreFound: true,
				});
			}
			this.setState({ refreshStores: this.props.refreshStore });
		}

		if (
			this.props.basicDataLoaded !== prevProps.basicDataLoaded &&
			this.props.basicDataLoaded
			) {
			this.props.getHomePageData();
			this.props.getConstructionTypeDataHome();
		}

		if (
			this.props.homeData.length !== prevProps.homeData.length &&
			this.props.homeData.length > 0
		) {
			let videos = [];
			let allvideos = [];
			let dashdata = [];
			let video = {};
			let mobilevideos = [];
			let mobiletitle = "";

			this.setState({
				backImage:
					globalVar.base_url1 + this.props.homeData[0].feature1VideoImage,
			});

			[1, 2, 3, 4].forEach(id => {
				const { homeData } = this.props;
				let vid = homeData[0][`feature${id}VideoLink`].split('/');
				let finalVideo = vid[4].split('?');

				videos.push({
					id: finalVideo[0],
					link: homeData[0][`feature${id}VideoLink`],
					name: homeData[0][`feature${id}Label`].substring(0, 20),
					responsive: true,
					image: sliders[id - 1],
					featureImage: homeData[0][`feature${id}VideoImage`]
						? baseurl + homeData[0][`feature${id}VideoImage`]
						: sliders[id - 1]
				});
				allvideos.push({
					id: finalVideo[0],
					name: homeData[0][`feature${id}Label`].substring(0, 20),
					responsive: true,
					videoLabel: homeData[0][`feature${id}Label`].substring(0, 20),
					featureImage: baseurl + homeData[0][`feature${id}VideoImage`]
				});
				dashdata[`featurethumbnail${id}`] = homeData[0][`feature${id}Thumbnail`]
					? baseurl + homeData[0][`feature${id}Thumbnail`]
					: thumbnails[id - 1];
				dashdata[`thumbnailtitle${id}`] = homeData[0][`feature${id}Label`];
			});
			video = videos[this.state.videoIndex];
			mobilevideos.push({
				id: video.id,
				link: video.link,
				name: video.name,
				responsive: true,
				videoLabel: video.name,
				sliderimage: video.featureImage ? video.featureImage : video.image,
			});
			mobiletitle = allvideos[this.state.videoIndex].videoLabel;

			var divele = document.getElementsByClassName("video-option");
			var myElements = document.querySelectorAll(".videocaption");
			for (var i = 0; i < myElements.length; i++) {
				if (
					this.props.homeData[0].imageTextHorizontalPosition &&
					this.props.homeData[0].imageTextHorizontalPosition.toLowerCase() ===
						"right"
				) {
					myElements[i].style.textAlign = "right";
					var element = document.getElementsByClassName("carousel-caption");
					element[0].classList.add("rightCaption");
				} else if (
					this.props.homeData[0].imageTextHorizontalPosition &&
					this.props.homeData[0].imageTextHorizontalPosition.toLowerCase() ===
						"middle"
				) {
					myElements[i].style.textAlign = "center";
				} else {
					myElements[i].style.textAlign = "left";
				}

				myElements[
					i
				].childNodes[0].style.color = this.props.homeData[0].imageTextFontColor;
				myElements[i].childNodes[0].style.fontSize = this.props.homeData[0]
					.imageTextFontSize
					? this.props.homeData[0].imageTextFontSize + "px"
					: "48px";
				if (this.props.homeData[0].imageTextVerticalPosition) {
					if (
						this.props.homeData[0].imageTextVerticalPosition.toLowerCase() ===
						"top"
					) {
						divele[0].classList.add("video-option-top");
					} else if (
						this.props.homeData[0].imageTextVerticalPosition.toLowerCase() ===
						"bottom"
					) {
						divele[0].classList.add("video-option-bottom");
					}
				}

				if (
					this.props.homeData[0].imageTextGradientPosition &&
					this.props.homeData[0].imageTextGradientPosition.toLowerCase() ===
						"right"
				) {
					// myElements[i].style.background = "linear-gradient(to left, rgba(43,51,56,1) 0%, rgba(43,51,56,0.11)" + this.props.homeData[0].imageGradientOpacity + "%" + ")"
					myElements[
						i
					].style.background = "linear-gradient(to left, rgba(43,51,56,1) 0%, rgba(43,51,56,0.11)".concat(
						this.props.homeData[0].imageGradientOpacity,
						"%)"
					);
				}
				if (
					this.props.homeData[0].imageTextGradientPosition &&
					this.props.homeData[0].imageTextGradientPosition.toLowerCase() ===
						"left"
				) {
					// myElements[i].style.background = "linear-gradient(to right, rgba(43,51,56,1) 0%, rgba(43,51,56,0.11)" + this.props.homeData[0].imageGradientOpacity + "%" + ")"
					myElements[
						i
					].style.background = "linear-gradient(to right, rgba(43,51,56,1) 0%, rgba(43,51,56,0.11)".concat(
						this.props.homeData[0].imageGradientOpacity,
						"%)"
					);
				}
			}

			this.setState({
				videos,
				allvideos,
				dashdata,
				mobilevideos,
				mobiletitle,
			});
		}

		if (this.state.videoIndex !== prevState.videoIndex) {
			const { videos, allvideos } = this.state;
			const video = videos[this.state.videoIndex];
			let mobilevideos = [];
			let mobiletitle = "";
			mobilevideos.push({
				id: video.id,
				link: video.link,
				name: video.name,
				responsive: true,
				videoLabel: video.name,
				sliderimage: video.featureImage ? video.featureImage : video.image,
			});
			mobiletitle = allvideos[this.state.videoIndex].videoLabel;
			this.setState({
				mobilevideos,
				mobiletitle,
				backImage: 
					globalVar.base_url1 + this.props.homeData[0][`feature${this.state.videoIndex + 1}VideoImage`],
			});
		}
	}

	componentWillUnmount() {
		this.clearPendingPromises();
	}

	appendPendingPromise = promise =>
		(this.pendingPromises = [...this.pendingPromises, promise]);

	removePendingPromise = promise =>
		(this.pendingPromises = this.pendingPromises.filter(p => p !== promise));

	clearPendingPromises = () => this.pendingPromises.map(p => p.cancel());

	handleClick = index => {
		const waitForClick = cancellablePromise(delay(300));
		this.appendPendingPromise(waitForClick);

		return waitForClick.promise
			.then(() => {
				this.removePendingPromise(waitForClick);
				this.selectVideo(index);
			})
			.catch(errorInfo => {
				this.removePendingPromise(waitForClick);
				if (!errorInfo.isCanceled) {
					throw errorInfo.error;
				}
			});
	};

	handleDoubleClick = index => {
		this.clearPendingPromises();
		this.playVideo(index);
	};

	playVideo = index => {
		var element = document.getElementsByClassName("carousel-caption");
		element[0].classList.remove("animated");
		element[0].classList.remove("fadeInUp");

		var imgelement = document.getElementsByClassName("imagepart");
		var videoelement = document.getElementsByClassName("videopart");
		var titleelement = document.getElementsByClassName("vm-layout");
		imgelement[0].classList.remove("showele");
		imgelement[0].classList.add("hideele");
		videoelement[0].classList.remove("hideele");
		videoelement[0].classList.add("showele");
		titleelement = document.getElementsByClassName("vm-layout");
		titleelement[0].classList.add("d-none");
		this.setState({
			videoIndex: index,
			isPlaying: true,
			paused: false,
			pausedonmobile: !this.state.pausedonmobile,
		});
	};

	/**
	 *  Select the video
	 */
	selectVideo(index) {
		var element = document.getElementsByClassName("carousel-caption");
		element[0].classList.remove("animated");
		element[0].classList.remove("fadeInUp");
		if (index !== this.state.videoIndex) {
			var imgelement = document.getElementsByClassName("imagepart");
			var videoelement = document.getElementsByClassName("videopart");
			imgelement[0].classList.remove("hideele");
			imgelement[0].classList.add("showele");
			videoelement[0].classList.remove("showele");
			videoelement[0].classList.add("hideele");
			var titleelement = document.getElementsByClassName("vm-layout");
			titleelement[0].classList.remove("d-none");
			this.setState({
				videoIndex: index,
				isPlaying: false,
				paused: true,
				pausedonmobile: true,
			});
		} else {
			imgelement = document.getElementsByClassName("imagepart");
			videoelement = document.getElementsByClassName("videopart");
			imgelement[0].classList.remove("showele");
			imgelement[0].classList.add("hideele");
			videoelement[0].classList.remove("hideele");
			videoelement[0].classList.add("showele");
			titleelement = document.getElementsByClassName("vm-layout");
			titleelement[0].classList.add("d-none");
			this.setState({
				videoIndex: index,
				isPlaying: !this.state.isPlaying,
				paused: !this.state.paused,
				pausedonmobile: !this.state.pausedonmobile,
			});
		}
	}

	/**
	 *  Toggle Slider on the mobile
	 */
	toggleSliderOnMobile() {
		var imgelement = document.getElementsByClassName("imagepart");
		var videoelement = document.getElementsByClassName("videopart");
		imgelement[0].classList.remove("showele");
		imgelement[0].classList.add("hideele");
		videoelement[0].classList.remove("hideele");
		videoelement[0].classList.add("showele");
		var titleelement = document.getElementsByClassName("vm-layout");
		titleelement[0].classList.add("d-none");
		this.setState({ pausedonmobile: !this.state.pausedonmobile });
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
	 *  Move to next slide
	 */

	next() {
		const { videos, allvideos } = this.state;
		const nextIndex =
			this.state.videoIndex === videos.length - 1
				? 0
				: this.state.videoIndex + 1;
		const mobiletitle = allvideos[this.state.videoIndex].videoLabel;
		this.setState({
			pausedonmobile: true,
			videoIndex: nextIndex,
			paused: true,
			mobiletitle,
			isPlaying: false,
		});
		var imgelement = document.getElementsByClassName("imagepart");
		var videoelement = document.getElementsByClassName("videopart");
		imgelement[0].classList.remove("hideele");
		imgelement[0].classList.add("showele");
		videoelement[0].classList.remove("showele");
		videoelement[0].classList.add("hideele");
		var titleelement = document.getElementsByClassName("vm-layout");
		titleelement[0] && titleelement[0].classList.remove("d-none");
	}

	/**
	 *  Move to previous slide
	 */

	previous() {
		const { videos, allvideos } = this.state;
		const nextIndex =
			this.state.videoIndex === 0
				? videos.length - 1
				: this.state.videoIndex - 1;
		const mobiletitle = allvideos[this.state.videoIndex].videoLabel;
		this.setState({
			pausedonmobile: true,
			videoIndex: nextIndex,
			paused: true,
			mobiletitle,
			isPlaying: false,
		});
		var imgelement = document.getElementsByClassName("imagepart");
		var videoelement = document.getElementsByClassName("videopart");
		imgelement[0].classList.remove("hideele");
		imgelement[0].classList.add("showele");
		videoelement[0].classList.remove("showele");
		videoelement[0].classList.add("hideele");
		var titleelement = document.getElementsByClassName("vm-layout");
		titleelement[0].classList.remove("d-none");
	}

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
	 * Firing events once video is ready
	 */

	changeOnreadyVideo() {
		let self = this;
		this.setState({
			showLoader: false,
		});
		this.manageTextStyles();
	}

	/**
	 * Check whether vimeo video is in cue and fire event on the basis of that
	 */

	vimeoCue() {
		this.setState({
			videoIndex: this.state.videoIndex,
		});
	}

	/**
	 * Check whether vimeo video has been started playing and firing event on the basis of that
	 */

	vimeoPlayed() {
		var element = document.getElementsByClassName("carousel-caption");
		element[0].classList.remove("animated");
		element[0].classList.remove("fadeInUp");
		this.setState({ autoSlide: false });
	}

	/**
	 * Fire on the Video End
	 */
	videoEnd() {
		this.setState({ autoSlide: true, isPlaying: false });
		this.next();
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

	/**
	 * Showing video caption
	 */

	showText() {
		var element = document.getElementsByClassName("carousel-caption");
		element[0].classList.add("animated");
		element[0].classList.add("fadeInUp");
	}

	/**
	 * Hiding video caption
	 */

	hideText() {
		var element = document.getElementsByClassName("carousel-caption");
		element[0].classList.remove("animated");
		element[0].classList.remove("fadeInUp");
	}

	/**
	 * Manage styles dynamically on video such as caption
	 */

	manageTextStyles() {
		var myMobileElements = document.querySelectorAll(".vdo_icn");
		for (var i = 0; i < myMobileElements.length; i++) {
			myMobileElements[
				i
			].childNodes[0].childNodes[1].style.color = this.props.homeData[0].imageTextFontColor;

			if (this.props.homeData[0].imageTextVerticalPosition) {
				if (
					this.props.homeData[0].imageTextVerticalPosition.toLowerCase() ===
					"top"
				) {
					myMobileElements[i].style.top = 0;
				} else if (
					this.props.homeData[0].imageTextVerticalPosition.toLowerCase() ===
					"bottom"
				) {
					myMobileElements[i].style.bottom = 0;
				}
			}
			if (
				this.props.homeData[0].imageTextHorizontalPosition &&
				this.props.homeData[0].imageTextHorizontalPosition.toLowerCase() ===
					"right"
			) {
				myMobileElements[i].childNodes[0].style.textAlign = "right";
			} else if (
				this.props.homeData[0].imageTextHorizontalPosition &&
				this.props.homeData[0].imageTextHorizontalPosition.toLowerCase() ===
					"middle"
			) {
				myMobileElements[i].childNodes[0].style.textAlign = "center";
			} else {
				myMobileElements[i].childNodes[0].style.textAlign = "left";
			}
			if (this.props.homeData[0].imageTextFontSizeMobile) {
				myMobileElements[i].childNodes[0].childNodes[1].style.fontSize = this
					.props.homeData[0].imageTextFontSizeMobile
					? this.props.homeData[0].imageTextFontSizeMobile + "px"
					: "";
			}
		}
	}

	render() {
		const { activeIndex, mobilevideos, dashdata, mobiletitle, pausedonmobile, isPlaying } = this.state;
		//Looping through carousel items
		const slides = mobilevideos.map((item, i) => {
			return (
				<CarouselItem key={i}>
					<div
						onMouseEnter={this.showText}
						onMouseLeave={this.hideText}
						className="imagepart showele"
					>
						<img
							className="imagepart showele"
							src={item.sliderimage}
							alt="sliderimage"
						/>
						<div className="w-100 h-100 position-absolute  play-button-banner text-center">
							{!this.state.showPlayButton ? null : (
								<img
									className="img-fluid play-button-img"
									src={playBtn}
									onClick={() => this.handleDoubleClick(this.state.videoIndex)}
									alt="playbutton"
								/>
							)}{" "}
						</div>
					</div>
					<div className="videopart hideele">
						<ReactPlayer
							url={item.link}
							autoPlay={false}
							controls={true}
							playing={isPlaying}
							onReady={() => {
								this.changeOnreadyVideo();
							}}
							height="100%"
							onStart={e => {
								this.vimeoPlayed(e);
							}}
							onEnded={e => {
								this.videoEnd(e);
							}}
							muted={false}
						/>
					</div>
					<CarouselCaption
						className="videocaption "
						captionText=""
						captionHeader={item.videoLabel}
					/>
				</CarouselItem>
			);
		});

		return (
			<div className=" pt-xl-3 bg-gray midcontent">
				<div className="row m-0 bg-gray pb-2 home_slider_mein_sec">
					<div className="container hme_slider video-option p-0 ">
						<div className="home_slid_left">
							<div className="bannerSlide position-relative">
								<img
									alt="backimage"
									className="back-image d-none d-md-block"
									src={this.state.backImage}
								/>
								<Carousel
									activeIndex={activeIndex}
									next={this.next}
									previous={this.previous}
									pause={false}
									autoPlay={true}
									interval={this.state.autoSlide ? 4000 : false}
								>
									{slides}
									<CarouselControl
										className="mobilePrev"
										direction="prev"
										directionText="Previous"
										onClickHandler={this.previous}
									/>
									<CarouselControl
										className="mobileNext"
										direction="next"
										directionText="Next"
										onClickHandler={this.next}
									/>
								</Carousel>

								{this.state.showLoader ? null : (
									<span className="vdo_icn">
										<div className="col-12 p-2 vm-layout">
											<img
												className="d-inline-block mb-0 align-middle"
												onClick={() => this.toggleSliderOnMobile()}
												src={
													this.state.pausedonmobile ? mplayButton : mpauseButton
												}
												alt="playButton"
											/>
											<h5 className="align-middle font-weight-bold d-inline-block mb-0 slide_titl">
												{mobiletitle}
											</h5>
										</div>
									</span>
								)}
							</div>
						</div>
					</div>
					<div className="request_quot_mb bg-gray  text-center col-12 mob-xs-1  p-0">
						<button
							type="button"
							onClick={() => this.togglerequestquote()}
							className="mt-3  btn theme-btn text-uppercase bg-red px-4 py-3 d-inline-block login-blue text-white mb-4 cursor-pointer"
						>
							Request a quote{" "}
						</button>
					</div>

					{this.state.showLoader ? null : (
						<div className="container  p-0  main-home-slider-mob d-none d-xl-block">
							<div className="row pt-3 video-space">
								<div
									className={
										this.state.videoIndex === 0
											? "col-12 col-md-3  slide-div shadow-none active "
											: "col-12 col-md-3 shadow-none   slide-div"
									}
								>
									<div className="vd-option option-shadow">
										<img
											className="img-area"
											src={dashdata.featurethumbnail1}
											alt="manufacture"
										/>
										<div className="position-absolute text-center text-white video-title w-100">
											<h4 className="mb-0">{dashdata.thumbnailtitle1}</h4>
										</div>
										<div
											className="position-absolute w-100  h-100 align-items-center play-button"
											onClick={() => this.handleClick(0, this.state.paused)}
											onDoubleClick={() => this.handleDoubleClick(0)}
										/>
									</div>
								</div>

								<div
									className={
										this.state.videoIndex === 1
											? "col-12 col-md-3  slide-div shadow-none active "
											: "col-12 col-md-3 shadow-none   slide-div"
									}
								>
									<div className="vd-option option-shadow">
										<img
											className="img-area"
											src={dashdata.featurethumbnail2}
											alt="manufacture"
										/>
										<div className="text-center  position-absolute text-white video-title w-100">
											<h4 className="mb-0">{dashdata.thumbnailtitle2}</h4>
										</div>
										<div
											className="position-absolute w-100  h-100 align-items-center play-button"
											onClick={() => this.handleClick(1, this.state.paused)}
											onDoubleClick={() => this.handleDoubleClick(1)}
										/>
									</div>
								</div>

								<div
									className={
										this.state.videoIndex === 2
											? "col-12 col-md-3 shadow-none   slide-div active "
											: "col-12 col-md-3 shadow-none   slide-div"
									}
								>
									<div className="vd-option option-shadow">
										<img
											className="img-area"
											src={dashdata.featurethumbnail3}
											alt="manufacture"
										/>
										<div className="position-absolute text-center  text-white video-title w-100">
											<h4 className="mb-0">{dashdata.thumbnailtitle3}</h4>
										</div>
										<div
											className="position-absolute w-100  h-100 align-items-center play-button"
											onClick={() => this.handleClick(2, this.state.paused)}
											onDoubleClick={() => this.handleDoubleClick(2)}
										/>
									</div>
								</div>
								<div
									className={
										this.state.videoIndex === 3
											? "col-12 col-md-3 shadow-none   slide-div active "
											: "col-12 col-md-3 shadow-none   slide-div"
									}
								>
									<div className="vd-option option-shadow">
										<img
											className="img-area"
											src={dashdata.featurethumbnail4}
											alt="manufacture"
										/>
										<div className="position-absolute text-center  text-white video-title w-100">
											<h4 className="mb-0">{dashdata.thumbnailtitle4}</h4>
										</div>
										<div
											className="position-absolute w-100  h-100 align-items-center play-button"
											onClick={() => this.handleClick(3, this.state.paused)}
											onDoubleClick={() => this.handleDoubleClick(3)}
										/>
									</div>
								</div>
							</div>
						</div>
					)}
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
