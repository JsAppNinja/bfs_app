import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Autocomplete from 'react-google-autocomplete';
import defaultimage from "../img/default.jpg";
import { Link } from "react-router-dom";
import down_arrow from "../img/angle-arrow-down.svg";
import cancel_icon from "../img/cancel.svg";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReCAPTCHA from "react-google-recaptcha";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import { OverlappingMarkerSpiderfier } from 'ts-overlapping-marker-spiderfier'

import tenor from "../img/loader.gif";
import { globalVar } from "../config";

var mylocation = {};
var mybody = {};
var searchField = [];
var count = 1;
var infoWindow;

var captchaKey = globalVar.googleCaptchaKey;

class StoreLocatoreComponent extends Component {

    constructor() {
        super();
        this.state = {
            toggleDropdown: false,
            searchCentre: { latitude: null, longitude: null },
            modal: false,
            fullname: "",
            nameErr: "",
            email: "",
            emailErr: "",
            service: "",
            zipcode: "",
            zipcodeErr: "",
            phone: "",
            phoneErr: "",
            message: "",
            messageErr: "",
            messageSuccess: "",
            locationid: "",
            quoteEmailStatus: "",
            showBlur: true,
            recaptchaValue: "",
            captchaErr: "",
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            zoom: 6,
            storeDataLength: 0,
            storeData: [],
            dropdownOpen: false,
            serviceOption: "Service Type",
            refreshState: false,
            allowgps: false,
            showPrompt: false,
            gpsError: "",
            locationdtlmessage: "",
            paginateData: [],
            viewMoreStores: true,
            showLoad: false,
            tempData: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.sendQuote = this.sendQuote.bind(this);
        this.getLocationOnClick = this.getLocationOnClick.bind(this);
        this.selectThisLocation = this.selectThisLocation.bind(this);
        infoWindow = new window.google.maps.InfoWindow();
    }
    componentDidMount() {
        this.getCurrentLocation();
    }

    componentDidUpdate(prevProps) {
        // Check for the store data in props
        if ((!prevProps || prevProps.storeData !== this.props.storeData) && this.props.storeData && this.props.storeData.length > 0) {
            count = 1;
            this.setState({
                storeData: this.props.storeData,
                paginateData: [],
                showBlur: false,
                searchCentre: {
                    latitude: parseFloat(this.props.storeData[0].Latitude),
                    longitude: parseFloat(this.props.storeData[0].Longitude)
                },
                viewMoreStores: true
            })


            if (localStorage.getItem("locationagain")) {
                let data = JSON.parse(localStorage.getItem("locationagain"));
                this.setSearchText(parseFloat(data.Latitude), parseFloat(data.Longitude), "withzipcode");
                localStorage.removeItem("locationagain");
            } else {
                this.setSearchText(parseFloat(this.props.storeData[0].Latitude), parseFloat(this.props.storeData[0].Longitude), "withzipcode")
            }
            this.initMap(this.props.storeData);
        }
    }

    /**
     * Allow GPS
     */
    togglelocation = () => {
        this.setState({
            allowgps: !this.state.allowgps
        })
    }

    /**
     * Add Pagination in the list
     * @param  items 
     * @param  page 
     * @param  per_page 
     */
    paginator(items, page, per_page) {
        page = page || 1
        per_page = per_page || 3
        var offset = (page - 1) * per_page
        var paginatedItems = items.slice(offset).slice(0, per_page)
        var total_pages = Math.ceil(items.length / per_page)
        if (paginatedItems.length === 0) {
            this.setState({ viewMoreStores: false })
        }
        return {
            page: page,
            per_page: per_page,
            pre_page: page - 1 ? page - 1 : null,
            next_page: (total_pages > page) ? page + 1 : null,
            total: items.length,
            total_pages: total_pages,
            data: paginatedItems
        };
    }

    /**
     * Go to next page
     * @param  item 
    
     */
    viewMore(item) {
        let pagecount = Math.ceil(this.state.paginateData.length / 3);
        if (pagecount === 0) {
            var itempage = 2;
        } else {
            itempage = pagecount + 1;
        }
        if (itempage === 2) {
            for (let i = 0; i < 3; i++) {
                this.state.paginateData.push(this.state.storeData[i]);
            }
        }

        let data = this.paginator(item, itempage);
        for (let i = 0; i < data.data.length; i++) {
            this.state.paginateData.push(data.data[i]);
        }
        if (this.state.paginateData.length === this.state.storeData.length) {
            this.setState({
                viewMoreStores: false
            })
        }
        this.setState({
            paginateData: this.state.paginateData
        })
    }

    /**
     * Update the search Feild from map point address
     * @param  lat 
     * @param  lng 
     * @param  type 
     */
    setSearchText(lat, lng, type) {
        var element = document.getElementById("searchfield");
        var geocoder = new this.props.google.maps.Geocoder();
        var latlng = { lat: parseFloat(lat, 10), lng: parseFloat(lng, 10) };
        var state = "";
        var country = "";
        geocoder.geocode({ 'location': latlng }, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    var super_var1 = results[0].address_components;
                    for (let j = 0; j < super_var1.length; ++j) {
                        var super_var2 = super_var1[j].types;
                        for (let k = 0; k < super_var2.length; ++k) {

                            if (super_var2[k] === "administrative_area_level_1") {
                                state = super_var1[j].long_name
                            }
                            if (super_var2[k] === "country") {
                                country = super_var1[j].long_name
                            }
                        }
                    }
                    if (type) {
                        if (state) {
                            element.value = state + "," + country
                        } else {
                            element.value = country
                        }
                    } else {
                        element.value = results[0].formatted_address;
                    }
                }
            }
        })
    }

    /**
     * Hit when We have current location access is On
     */
    allowCurrentLocation = () => {
        var locationOptions = {};
        var self = this;
        self.setState({ gpsError: "" })
        locationOptions = {
            enableHighAccuracy: true,
            maximumAge: 600000,
            timeout: 60000
        }
        if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > -1) {
            if (navigator.geolocation) {
                self.setState({
                    showBlur: false
                })
                navigator.geolocation.getCurrentPosition(function (position) {
                    self.setState({
                        showBlur: false
                    })
                    if (position.coords.latitude && position.coords.longitude) {
                        localStorage.setItem('currentlat', position.coords.latitude);
                        localStorage.setItem('currentlon', position.coords.longitude);
                        self.setState(
                            {
                                allowgps: false
                            }
                        )
                        self.setSearchText(position.coords.latitude, position.coords.longitude)

                        self.allowLocationClicked();
                        if (self.props.document.getElementById("closetoast")) {
                            self.props.document.getElementById("closetoast").click();
                        }

                    }
                }, function (error) {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            self.setState({ gpsError: "User denied the request for Geolocation." })
                            if (self.props.document.getElementById("closetoast")) {
                                self.props.document.getElementById("closetoast").click();
                            }
                            var date = new Date();
                            localStorage.setItem("gpsPopup", date.toDateString())
                            break;
                        case error.POSITION_UNAVAILABLE:
                            self.setState({ gpsError: "Location information is unavailable." })
                            break;
                        case error.TIMEOUT:
                            self.setState({ gpsError: "The request to get user location timed out." })
                            break;
                        case error.UNKNOWN_ERROR:
                            self.setState({ gpsError: "An unknown error occurred." })
                            break;
                        default:
                            self.setState({ gpsError: "Current location could not be found." })
                    }
                }, locationOptions);
            } else {
                self.setState({ gpsError: "Geolocation is not supported by this browser." })
                if (self.props.document.getElementById("closetoast")) {
                    self.props.document.getElementById("closetoast").click();
                }
            }
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    self.setState({
                        showBlur: false
                    })
                    if (position.coords.latitude && position.coords.longitude) {
                        localStorage.setItem('currentlat', position.coords.latitude);
                        localStorage.setItem('currentlon', position.coords.longitude);
                        self.setState(
                            {
                                allowgps: false
                            }
                        )
                        self.setSearchText(position.coords.latitude, position.coords.longitude)
                        self.allowLocationClicked();
                        if (self.props.document.getElementById("closetoast")) {
                            self.props.document.getElementById("closetoast").click();
                        }
                    }
                }, function (error) {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            self.setState({ gpsError: "User denied the request for Geolocation." })
                            if (self.props.document.getElementById("closetoast")) {
                                self.props.document.getElementById("closetoast").click();
                            }
                            var date = new Date()
                            localStorage.setItem("gpsPopup", date.toDateString())
                            break;
                        case error.POSITION_UNAVAILABLE:
                            self.setState({ gpsError: "Location information is unavailable." })
                            break;
                        case error.TIMEOUT:
                            self.setState({ gpsError: "The request to get user location timed out." })
                            break;
                        case error.UNKNOWN_ERROR:
                            self.setState({ gpsError: "An unknown error occurred." })
                            break;
                        default:
                            self.setState({ gpsError: "Current location could not be found." })
                    }
                }, locationOptions);
            } else {
                self.setState({ gpsError: "Geolocation is not supported by this browser." })
                if (self.props.document.getElementById("closetoast")) {
                    self.props.document.getElementById("closetoast").click();
                }
            }
        }
    }

    /**
     * Get the lat lng from the zipcode
     */
    getLatLngFromZip = (zip) => {
        let self = this;
        var geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ 'componentRestrictions': { 'postalCode': zip } }, function (results, status) {
            if (results[0]) {
                mylocation["lat"] = results[0].geometry.location.lat;
                mylocation["lng"] = results[0].geometry.location.lng;
                self.getCurrentLocation();
            } else {
                NotificationManager.error('', 'Zip code you have entered could not be found', 3000);
            }
        });
    }

    addToggleDropdown() {
        this.setState({
            toggleDropdown: !this.state.toggleDropdown
        })
    }

    allowLocationClicked = () => {
        if (localStorage.getItem("currentlat")) {
            mylocation = { lat: parseFloat(localStorage.getItem("currentlat")), lng: parseFloat(localStorage.getItem("currentlon")) }
            this.setState({
                searchCentre: { latitude: parseFloat(localStorage.getItem("currentlat")), longitude: parseFloat(localStorage.getItem("currentlon")) },
                showBlur: false, storeData: []
            });
            this.setSearchText(mylocation.lat, mylocation.lng);
            mybody.Radius = 200;
            mybody.DistributionList = [];
            mybody.InstalledServiceList = [];
            mybody.Latitude = mylocation.lat
            mybody.Longitude = mylocation.lng
            this.getStoreData(mybody);
        }
    }

    /**
     * Get the Store list from the lat lng
     * @param {object} place 
     */
    getLatLon(place) {
        this.setState({ showBlur: false })
        if (place.geometry) {
            if (place.geometry.location.lng()) {
                this.setState({
                    searchCentre: {
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng(),
                    }
                })
            }
            if (mybody.hasOwnProperty('DistributionList')) {
                mybody["Address"] = "";
                mybody["Radius"] = 200;
                mybody["InstalledServiceList"] = [];
                mybody.Longitude = place.geometry.location.lng();
                mybody.Latitude = place.geometry.location.lat();
                this.getStoreData(mybody);

            } else {
                mybody["Address"] = "";
                mybody["Radius"] = 200;
                mybody["DistributionList"] = [];
                mybody["InstalledServiceList"] = [];
                mybody["Longitude"] = place.geometry.location.lng();
                mybody["Latitude"] = place.geometry.location.lat();
                this.getStoreData(mybody);

            }
        }
    }

    /**
     * handle the blur
     */
    removeBlur() {
        this.setState({
            showBlur: false
        })
    }

    /**
     * Hit on the search
     */
    getLocationOnClick() {
        this.setState({ gpsError: "" })
        let self = this;
        if (localStorage.getItem('currentlat') && localStorage.getItem('currentlon')) {
            this.setState({
                showBlur: false
            })
            this.setSearchText(parseFloat(localStorage.getItem('currentlat')), parseFloat(localStorage.getItem('currentlon')))
            this.setState({ searchCentre: { latitude: parseFloat(localStorage.getItem('currentlat')), longitude: parseFloat(localStorage.getItem('currentlon')) } })
            if (mybody.hasOwnProperty('DistributionList')) {
                mybody["Radius"] = 200;
                mybody["InstalledServiceList"] = [];
                mybody.Latitude = parseFloat(localStorage.getItem('currentlat'));
                mybody.Longitude = parseFloat(localStorage.getItem('currentlon'));
                self.getStoreData(mybody);
                if (self.state.storeData && self.state.storeData.length <= 0) {
                    self.setState({ locationdtlmessage: "No search result found matching your location" })
                }
            } else {
                mybody["Radius"] = 200;
                mybody["DistributionList"] = [];
                mybody["InstalledServiceList"] = [];
                mybody["Longitude"] = parseFloat(localStorage.getItem('currentlat'));
                mybody["Latitude"] = parseFloat(localStorage.getItem('currentlon'));
                self.getStoreData(mybody);
                if (self.state.storeData && self.state.storeData.length <= 0) {
                    self.setState({ locationdtlmessage: "No search result found matching your location" })
                }
            }
        } else {
            this.setState({
                allowgps: true,
                showPrompt: false
            })
        }
    }

    /**
     * Handle gps change
     */
    getCurrentLocationOnClick() {
        this.setState({ gpsError: "" });
        this.allowCurrentLocation();
    }

    selectThisLocation() {
        document.body.classList.add("storeselected_main");
        localStorage.setItem("searchedItemLocation", document.getElementById("searchfield").value);
        localStorage.setItem("searchedItem", JSON.stringify(this.state.storeData));
    }

    selectedLocation(alias, id, name) {
        let storedetail = alias + "," + id + "," + name;
        localStorage.setItem("selectedStore", storedetail);
    }

    /**
     * Get the location 
     */
    getCurrentLocation() {
        if (localStorage.getItem("searchedItem")) {
            let data = JSON.parse(localStorage.getItem("searchedItem"));
            count = 1;
            this.setState(
                {
                    storeData: JSON.parse(localStorage.getItem("searchedItem")),
                    showBlur: false,
                    paginateData: [],
                    viewMoreStores: true
                }
            )
            this.setState({ searchCentre: { latitude: data[0].Latitude, longitude: data[0].Longitude } })
            localStorage.removeItem("searchedItem");
            this.initMap(data);
        }
        else if (localStorage.getItem("locationzip")) {
            localStorage.removeItem("locationzip");
        }
        else {
            if (localStorage.getItem("currentlat")) {
                mylocation = { lat: parseFloat(localStorage.getItem("currentlat")), lng: parseFloat(localStorage.getItem("currentlon")) }
                this.setState({
                    searchCentre: { latitude: parseFloat(localStorage.getItem("currentlat")), longitude: parseFloat(localStorage.getItem("currentlon")) },
                    showBlur: false
                });
                this.setSearchText(mylocation.lat, mylocation.lng)
                this.initMap(this.props.storeData);
            }
            else if (mylocation.lat) {
                this.setState({ searchCentre: { latitude: mylocation.lat, longitude: mylocation.lng } })
                this.initMap(this.props.storeData);
            }
            else {
                mylocation = { lat: 41.9475551, lng: -80.55424089999997 }
                this.setState({ searchCentre: { latitude: mylocation.lat, longitude: mylocation.lng } })
                this.initMap(this.props.storeData);
            }
            if (mybody.hasOwnProperty('DistributionList')) {

                mybody["Radius"] = 200;
                mybody["InstalledServiceList"] = [];
                mybody.Latitude = mylocation.lat;
                mybody.Longitude = mylocation.lng;
                this.getStoreData(mybody);
            } else {
                mybody["Radius"] = 200;
                mybody["DistributionList"] = [];
                mybody["InstalledServiceList"] = [];
                mybody["Longitude"] = mylocation.lng;
                mybody["Latitude"] = mylocation.lat;
                this.getStoreData(mybody);
            }
        }
    }

    /**
     * Get the current location from the gps
     */
    getLocation = () => {
        const pos = {};
        const geolocation = navigator.geolocation;
        if (geolocation) {
            geolocation.getCurrentPosition(findLocal, showEror);
        }
        function findLocal(position) {
            mylocation["lat"] = position.coords.latitude;
            mylocation["lng"] = position.coords.longitude;
            pos.lat = position.coords.latitude;
            pos.lng = position.coords.longitude;

        }
        function showEror() {
        }
        if (pos.lat) {
            this.setState({ showBlur: false })
        }
        return pos;
    };

    /**
     * Handle the change in the search feild
     * @param {string} data 
     */
    handleChange(data) {
        this.setState({ showLoad: true })
        let index = -1
        for (let i = 0; i < searchField.length; i++) {
            if (searchField[i] === data) {
                index = i;
                break;
            }
        }
        if (index < 0) {
            let arr = searchField;
            arr.push(data)
            searchField = arr;
            if (searchField.length === 1) {
                this.setState({ refreshState: !this.state.refreshState })
            }
            this.getAdvanceSearchData();
        } else {
            let arr = searchField;
            arr.splice(index, 1)
            searchField = arr;
            if (searchField.length === 0) {
                this.setState({ refreshState: !this.state.refreshState })
            }
            this.getAdvanceSearchData()
        }
    }

    /**
     * Handle the advance filters
     */
    getAdvanceSearchData() {
        this.setState({ showBlur: false });
        if (mybody.hasOwnProperty('DistributionList')) {
            mybody.DistributionList = [];
            for (let i = 0; i < searchField.length; i++) {
                mybody.DistributionList.push(
                    {
                        "alias": searchField[i]
                    }
                )
            }
            if (searchField.length === 0) {
                mybody.DistributionList = [];
            }
            if (mybody.hasOwnProperty('Address') && mybody.Address !== "") {
                mybody["Radius"] = 200;
                mybody["InstalledServiceList"] = [];
                mybody["Longitude"] = "";
                mybody["Latitude"] = "";
                this.getStoreData(mybody);
            } else {
                mybody["Radius"] = 200;
                mybody["InstalledServiceList"] = [];
                mybody["Longitude"] = this.state.searchCentre.longitude;
                mybody["Latitude"] = this.state.searchCentre.latitude;
                this.getStoreData(mybody);
            }
        } else {
            if (mybody.hasOwnProperty('Address') && mybody.Address !== "") {
                mybody["Radius"] = 200;
                mybody["DistributionList"] = [];
                mybody["InstalledServiceList"] = [];
                mybody["Longitude"] = "";
                mybody["Latitude"] = "";
                this.getStoreData(mybody);
            } else {
                mybody["Radius"] = 200;
                mybody["DistributionList"] = [];
                mybody["InstalledServiceList"] = [];
                mybody["Longitude"] = this.state.searchCentre.longitude;
                mybody["Latitude"] = this.state.searchCentre.latitude;
                this.getStoreData(mybody);
            }
        }
    }

    onRecaptchChange(value) {
        this.setState({ recaptchaValue: value });
    }

    openUrl(id) {
        localStorage.setItem("storeId", id);
    }
    quoteOpenUrl(locationid) {
        this.toggle();
        this.setState({ locationid: locationid });
    }
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
     * Send the Quote email
     */
    sendQuote() {
        if (this.checkFormValidation() === true) {
            this.setState({ quoteEmailStatus: "Please wait sending email..." })
            let quoteData = {
                FullName: document.getElementById("name").value,
                Email: document.getElementById("email").value,
                ServiceName: this.state.serviceOption,
                ZipCode: document.getElementById("zipcode").value,
                Phone: document.getElementById("phone").value,
                Message: document.getElementById("message").value,
                LocationId: this.state.locationid,
                RecaptchaResponse: this.state.recaptchaValue
            }
            this.props.sendQuote(quoteData);
            setTimeout(() => {
                if (this.props.quoteData === true) {
                    setTimeout(() => {
                        this.setState({
                            modal: !this.state.modal
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

    // Email Validator
    validateEmail(email) {
        let re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
        return re.test(email);
    }

    // Zip Validator
    handleZipcodeChange() {
        var element = document.getElementById("zipcode");
        var regex = /[^0-9]/gi;
        element.value = element.value.replace(regex, "");
    }

    // Phone Number Validator
    handlePhoneChange() {
        var element = document.getElementById("phone");
        var regex = /[^0-9]/gi;
        element.value = element.value.replace(regex, "");
    }

    // Form Validator
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

    searchChangeHandler(e) {
        if (e.target && e.target.value === "") {
            mylocation = { lat: 41.9475551, lng: -80.55424089999997 }
            this.setState({ searchCentre: { latitude: mylocation.lat, longitude: mylocation.lng } })
            mybody["Address"] = "";
            mybody["Radius"] = 200;
            mybody["DistributionList"] = [];
            mybody["InstalledServiceList"] = [];
            mybody["Longitude"] = -80.55424089999997;
            mybody["Latitude"] = 41.9475551;
            this.getStoreData(mybody);
        }
    }

    // Get the hit on enter
    searchWithParameter(e) {
        if (e.key === 'Enter') {
            if (mybody.hasOwnProperty('DistributionList')) {
                mybody["Radius"] = 200;
                if (e.target.value.trim()) {
                    mybody["Longitude"] = "";
                    mybody["Latitude"] = "";
                    mybody["Address"] = e.target.value;
                    this.setState({ searchCentre: { latitude: null, longitude: null } });
                    this.getStoreData(mybody);
                } else {
                    this.setState({ storeData: [] })
                }
            } else {
                mybody["Radius"] = 200;
                mybody["DistributionList"] = [];
                mybody["InstalledServiceList"] = [];
                if (e.target.value) {
                    mybody["Longitude"] = "";
                    mybody["Latitude"] = "";
                    mybody["Address"] = e.target.value;
                    this.setState({ searchCentre: { latitude: null, longitude: null } })
                    this.getStoreData(mybody);
                } else {
                    this.setState({ storeData: [] })
                }
            }
        }
    }

    /**
     * Get the store list from the api
     */
    getStoreData = (data) => {
        let aliasdata = [];
        for (let i = 0; i < data.DistributionList.length; i++) {
            aliasdata.push({ alias: data.DistributionList[i].alias })
        }

        fetch(globalVar.base_url1 + '/umbraco/api/LocationData/GetAllLocations', {
            body: JSON.stringify({
                radius: data.Radius,
                latitude: parseFloat(data.Latitude),
                longitude: parseFloat(data.Longitude),
                DistributionList: aliasdata,
                installedServiceName: "",
                Address: data.Address
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            this.initMap(data);
            count = 1;
            this.setState(
                {
                    storeData: data,
                    paginateData: [],
                    viewMoreStores: true,
                    showLoad: false
                })
            if (this.state.searchCentre && this.state.searchCentre.latitude == null && data && data.length > 0) {
                this.setState({
                    searchCentre: {
                        latitude: data[0].Latitude,
                        longitude: data[0].Longitude
                    }
                })
            }
        }).catch(() => {
        });
    }

    /**
     * Filter the array for the duplicacy
     * @param {Array} array 
     */
    uniqurArray(array) {
        var a = array.concat();
        for (var i = 0; i < a.length; i++) {
            for (var j = i + 1; j < a.length; j++) {
                if (a[i].$id === a[j].$id) {
                    a.splice(j--, 1);
                }
            }
        }
        return a;
    }

    /**
     * Make the scroll smooth
     * @param {Element} target 
     */
    smoothScroll(target) {
        var scrollContainer = target;
        do { //find scroll container
            scrollContainer = scrollContainer.parentNode;
            if (!scrollContainer) return;
            scrollContainer.scrollTop += 1;
        } while (scrollContainer.scrollTop === 0);

        var targetY = 0;
        do { //find the top of target relatively to the container
            if (target === scrollContainer) break;
            targetY += target.offsetTop;
        } while (target === target.offsetParent);

        // start scrolling
        this.scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
    }

    scroll(c, a, b, i) {
        let self = this;
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function () { self.scroll(c, a, b, i); }, 20);
    }

    /**
     * map marker click
     */
    onMarkerClick = (props, marker) => {
        let self = this;
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
        if (props && props.markerId) {
            var scrollToAnchor = () => {
                if (document.getElementById("store" + props.markerId)) {
                    if (navigator.userAgent.match(/Android/i)
                        || navigator.userAgent.match(/webOS/i)
                        || navigator.userAgent.match(/iPhone/i)
                        || navigator.userAgent.match(/iPod/i)
                        || navigator.userAgent.match(/BlackBerry/i)
                        || navigator.userAgent.match(/Windows Phone/i)
                        || navigator.userAgent.match(/iPad/i)
                    ) {
                        let scroller = "storelocatorlist"
                        document.querySelector(`#${scroller}`).scrollIntoView(true);
                        setTimeout(function () {
                            self.smoothScroll(document.getElementById("store" + props.markerId));
                        }, 200);

                    } else {
                        let markerid = parseInt(props.markerId, 10) - 1;
                        if (markerid === 0) {
                            markerid = 1;
                        }
                        let scroller = "store" + markerid;
                        document.querySelector(`#${scroller}`).scrollIntoView(true);
                    }

                } else {
                    let arr = [];
                    let anotherarr = [];
                    for (let i = 0; i < parseInt(props.markerId, 10); i++) {
                        arr.push(this.state.storeData[i]);
                    }
                    let itempage = Math.ceil(arr.length / 3);
                    let data = this.paginator(this.state.storeData, itempage);
                    for (let i = 0; i < data.data.length; i++) {
                        arr.push(data.data[i]);
                    }
                    anotherarr = this.uniqurArray(arr);
                    this.setState({
                        paginateData: anotherarr
                    })
                    setTimeout(function () {
                        if (navigator.userAgent.match(/Android/i)
                            || navigator.userAgent.match(/webOS/i)
                            || navigator.userAgent.match(/iPhone/i)
                            || navigator.userAgent.match(/iPod/i)
                            || navigator.userAgent.match(/BlackBerry/i)
                            || navigator.userAgent.match(/Windows Phone/i)
                            || navigator.userAgent.match(/iPad/i)
                        ) {
                            let scroller = "storelocatorlist"
                            document.querySelector(`#${scroller}`).scrollIntoView(true);
                            setTimeout(function () {
                                self.smoothScroll(document.getElementById("store" + props.markerId));
                            }, 200);

                        } else {
                            let markerid = parseInt(props.markerId, 10) - 1;
                            if (markerid === 0) {
                                markerid = 1;
                            }
                            let scroller = "store" + markerid;
                            document.querySelector(`#${scroller}`).scrollIntoView(true);
                        }
                    }, 500)

                }
            };
            scrollToAnchor();
        }
    }

    scrollVertical() {
        window.scrollBy(0, 50);
    }

    onMapClicked = () => {
        if (this.state.showingInfoWindow) {

            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    selectDropToggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }


    initMap(locationData) {

        this.setState({
            selectedPlace: { markerId: "" }
        });
        let self = this;
        if (locationData.length > 0) {
            var latitude = locationData[0].Latitude;
            var longitude = locationData[0].Longitude;
        } else {
            latitude = mylocation.lat;
            longitude = mylocation.lng;
        }
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
            zoom: 12
        });

        var oms = new OverlappingMarkerSpiderfier(map, {
            markersWontMove: true,
            markersWontHide: true,
            basicFormatEvents: false,
            keepSpiderfied: true,
            ignoreMapClick: true,
        });

        var markers = [];
        var contents = [];
        var bounds = new window.google.maps.LatLngBounds();
        for (let i = 0; i < locationData.length; i++) {

            var myLatLng = new window.google.maps.LatLng(parseFloat(locationData[i].Latitude), parseFloat(locationData[i].Longitude));
            var latLng = new window.google.maps.LatLng(parseFloat(locationData[i].Latitude), parseFloat(locationData[i].Longitude));
            // if (markers.length !== 0) {
            //     for (i = 0; i < markers.length; i++) {
            //         var existingMarker = markers[i];
            //         var pos = existingMarker.getPosition();
            //         if (latLng.equals(pos)) {
            //             var a = 360.0 / markers.length;
            //             var newLat = pos.lat() + -.00004 * Math.cos((+a * i) / 180 * Math.PI);  //x
            //             var newLng = pos.lng() + -.00004 * Math.sin((+a * i) / 180 * Math.PI);  //Y
            //             latLng = new window.google.maps.LatLng(newLat, newLng);
            //         }
            //     }
            // }
            markers[i] = new window.google.maps.Marker({
                position: latLng,
                map: map,
                title: locationData[i].Address1
            });
            bounds.extend(myLatLng);
            map.fitBounds(bounds);
            markers[i].index = i;
            markers[i].name = locationData[i].Name;
            markers[i].email = locationData[i].Email;
            markers[i].phone = locationData[i].PhoneNo;
            markers[i].alias = locationData[i].Alias;
            markers[i].markerId = locationData[i].$id;

            contents[i] = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<a target="_blank" href="/location_' + locationData[i].Alias + '">' +
                '<h2 id="firstHeading" class="firstHeading">' + locationData[i].Name + '</h2>' +
                '</a>' +
                '<div id="bodyContent">' +
                '<p><b>Phone:</b> ' + locationData[i].PhoneNo + '' +
                '<p><b>Email:</b> ' + locationData[i].Email + '' +
                '<p><b>Address:</b> ' + locationData[i].Address1 + '' +
                '</div>' +
                '</div>';


            window.google.maps.event.addListener(markers[i], 'spider_click', function (e) {  // 'spider_click', not plain 'click'
                infoWindow.setContent(contents[i]);
                infoWindow.open(map, markers[this.index]);
            });
            window.google.maps.event.addListener(markers[i], 'click', function (marker, content, infowindow) {
                self.setState({
                    selectedPlace: { markerId: this.markerId }
                });
                infoWindow.setContent(contents[i]);
                infoWindow.open(map, markers[this.index]);
                let markid = this.markerId;
                if (markid) {
                    var scrollToAnchor = () => {
                        if (document.getElementById("store" + markid)) {
                            if (navigator.userAgent.match(/Android/i)
                                || navigator.userAgent.match(/webOS/i)
                                || navigator.userAgent.match(/iPhone/i)
                                || navigator.userAgent.match(/iPod/i)
                                || navigator.userAgent.match(/BlackBerry/i)
                                || navigator.userAgent.match(/Windows Phone/i)
                                || navigator.userAgent.match(/iPad/i)
                            ) {
                                let scroller = "storelocatorlist"
                                document.querySelector(`#${scroller}`).scrollIntoView(true);
                                setTimeout(function () {
                                    self.smoothScroll(document.getElementById("store" + markid));
                                }, 200);

                            } else {
                                let markerid = parseInt(markid, 10) - 1;
                                if (markerid === 0) {
                                    markerid = 1;
                                }
                                let scroller = "store" + markerid;
                                document.querySelector(`#${scroller}`).scrollIntoView(true);
                            }

                        } else {
                            let arr = [];
                            let anotherarr = [];
                            for (let i = 0; i < parseInt(markid, 10); i++) {
                                arr.push(self.state.storeData[i]);
                            }
                            let itempage = Math.ceil(arr.length / 3);
                            let data = self.paginator(self.state.storeData, itempage);
                            for (let i = 0; i < data.data.length; i++) {
                                arr.push(data.data[i]);
                            }
                            anotherarr = self.uniqurArray(arr);
                            self.setState({
                                paginateData: anotherarr
                            })
                            setTimeout(function () {
                                if (navigator.userAgent.match(/Android/i)
                                    || navigator.userAgent.match(/webOS/i)
                                    || navigator.userAgent.match(/iPhone/i)
                                    || navigator.userAgent.match(/iPod/i)
                                    || navigator.userAgent.match(/BlackBerry/i)
                                    || navigator.userAgent.match(/Windows Phone/i)
                                    || navigator.userAgent.match(/iPad/i)
                                ) {
                                    let scroller = "storelocatorlist"
                                    document.querySelector(`#${scroller}`).scrollIntoView(true);
                                    setTimeout(function () {
                                        self.smoothScroll(document.getElementById("store" + markid));
                                    }, 200);

                                } else {
                                    let markerid = parseInt(markid, 10) - 1;
                                    if (markerid === 0) {
                                        markerid = 1;
                                    }

                                    let scroller = "store" + markerid;
                                    document.querySelector(`#${scroller}`).scrollIntoView(true);
                                }
                            }, 500)

                        }
                    };
                    scrollToAnchor();
                }
                //map.panTo(markers[this.index].getPosition());
            });
            oms.addMarker(markers[i]);
        }

        oms.addListener('format', function (marker, status) {
            var iconURL = status === OverlappingMarkerSpiderfier.markerStatus.SPIDERFIED ? 'icons8-google-maps.png' :
                status === OverlappingMarkerSpiderfier.markerStatus.SPIDERFIABLE ? 'google-maps-Plus.png' :
                    status === OverlappingMarkerSpiderfier.markerStatus.UNSPIDERFIABLE ? 'icons8-google-maps.png' :
                        null;
            marker.setIcon({
                url: iconURL,
                scaledSize: new window.google.maps.Size(24, 32)  // makes SVG icons work in IE
            });
        });
    }

    render() {
        let bounds = new this.props.google.maps.LatLngBounds();
        if (this.state.storeData.length > 1) {
            for (let i = 0; i < this.state.storeData.length; i++) {
                bounds.extend({
                    lat: parseFloat(this.state.storeData[i].Latitude),
                    lng: parseFloat(this.state.storeData[i].Longitude)
                });
            }
        }

        return (

            <div className="col-12 bg-gray px-0 store_locator_mein midcontent">
                <NotificationContainer />
                <div className="store_locator py-sm-4  py-md-5">
                    <div className="px-0 pt-5 pt-md-0 container">
                        <div className="m-auto">
                            <h2 className="display-4 text-center font-weight-normal">Store <span className="font-weight-light">Locator</span></h2>
                        </div>
                        <div className="search_frm  pb-4 d-md-flex align-items-center">
                            <div className="input-group mb-3 mb-md-0">
                                <Autocomplete types={[]} className="form-control" onKeyPress={(e) => this.searchWithParameter(e)} onChange={(e) => this.searchChangeHandler(e)} style={{ width: '100%' }} onPlaceSelected={(place) => {
                                    this.getLatLon(place);
                                }} id="searchfield"
                                />
                            </div>
                            <div className="ml-auto">
                                <div className="my-lyc">
                                    <button onClick={() => { this.getCurrentLocationOnClick(); }} className="btn text-uppercase bg-info px-4 py-3 d-inline-block d-none-mob  text-white sp-shadow">Use My location</button>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown_adv position-relative clearfix text-left">
                            <button onClick={() => { this.addToggleDropdown() }} className="dropdown-toggle-btn" style={{ cursor: "pointer" }} type="button">
                                Advanced Search  <img className="logo_size" src={down_arrow} alt="arrow here" />
                            </button>
                            <div className={this.state.toggleDropdown ? "show custom_drop_field view_productList" : "show custom_drop_field"} aria-labelledby="about-us" id="advanceSearch">
                                <div className="d-flex  inline_add">
                                    <h5 className="d_ttl font-weight-normal">
                                        Show only locations that distribute any of these products
                                          </h5>
                                    <span onClick={() => { this.addToggleDropdown() }} className="close_p_menu ml-auto">
                                        <img src={cancel_icon} alt="store here" />
                                    </span>
                                </div>
                                <div className="d-flex my-2">
                                </div>

                                <div className="row  pop-ht mt-3">
                                    <div className="col-md-6 pr-lg-0">

                                        <label className="check ">Adhesives & Sealants
                                            <input type="checkbox" name="is_name" onChange={() => this.handleChange("adhesivesSealants")} />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label className="check ">Columns
                                            <input type="checkbox" name="is_name" onChange={() => this.handleChange("columns")} />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label className="check ">Cultured Stone
                                            <input type="checkbox" name="is_name" onChange={() => this.handleChange("culturedStone")} />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label className="check ">Doors
                                            <input type="checkbox" name="is_name" onChange={() => this.handleChange("doors")} />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label className="check ">Engineered Wood Products
                                            <input type="checkbox" name="is_name" onChange={() => this.handleChange("engineeredWoodProducts")} />
                                            <span className="checkmark"></span>
                                        </label>

                                        <label className="check ">Garage Doors
                                            <input type="checkbox" name="is_name" onChange={() => this.handleChange("garageDoors")} />
                                            <span className="checkmark"></span>
                                        </label>

                                        <label className="check ">House Wrap
                                            <input type="checkbox" name="is_name" onChange={() => this.handleChange("houseWrap")} />
                                            <span className="checkmark"></span>
                                        </label>

                                        <label className="check ">Interior Trim & Moduling
                                            <input type="checkbox" name="is_name" onChange={() => this.handleChange("interiorTrimMouldings")} />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label className="check ">Railings
                                            <input type="checkbox" name="is_name" onChange={() => this.handleChange("railings")} />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="check ">Cabinets
                                                <input type="checkbox" name="is_name" onChange={() => this.handleChange("cabinets")} />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label className="check ">Connectors
                                                <input type="checkbox" name="is_name" onChange={() => this.handleChange("connectors")} />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label className="check ">Decking
                                                <input type="checkbox" name="is_name" onChange={() => this.handleChange("decking")} />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label className="check ">Fireplaces
                                                <input type="checkbox" name="is_name" onChange={() => this.handleChange("fireplaces")} />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label className="check ">Hardware
                                                <input type="checkbox" name="is_name" onChange={() => this.handleChange("hardware")} />
                                            <span className="checkmark"></span>
                                        </label>

                                        <label className="check ">Insulation
                                                <input type="checkbox" name="is_name" onChange={() => this.handleChange("insulation")} />
                                            <span className="checkmark"></span>
                                        </label>

                                        <label className="check ">Lumber & Treated Wood
                                                <input type="checkbox" name="is_name" onChange={() => this.handleChange("lumberTreatedWood")} />
                                            <span className="checkmark"></span>
                                        </label>

                                        <label className="check ">Roofing
                                                <input type="checkbox" name="is_name" onChange={() => this.handleChange("roofing")} />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button id="allowLocationClick" onClick={() => this.allowLocationClicked()} style={{ display: "none" }}></button>
                    <div className="row m-0 mt-md-5 mt-lg-5 mt-sm-0 map-section">
                        <div className={this.state.showBlur === true ? " col-sm-12 col-md-12 col-lg-7 map_locate   contpost hideele over-flow" : " col-sm-12 bg-gray col-md-12 col-lg-7 map_locate contpost over-flow pull-right order-lg-2 order-1"}>
                            <div style={{ height: "100%" }} id="map" />
                            {/*<Map google={this.props.google} zoom={this.state.zoom}
                                center={{
                                    lat: this.state.searchCentre.latitude,
                                    lng: this.state.searchCentre.longitude
                                }}
                                bounds={bounds}
                            >
                                {
                                    this.state.storeData.map((store, index) => (
                                        <Marker key={index}
                                            title={store.Name}
                                            name={store.Name}
                                            email={store.Email}
                                            phone={store.PhoneNo}
                                            alias={store.Alias}
                                            markerId={store.$id}
                                            position={{ lat: parseFloat(store.Latitude), lng: parseFloat(store.Longitude) }}
                                            onClick={this.onMarkerClick} />

                                    ))
                                }
                                <InfoWindow
                                    marker={this.state.activeMarker}
                                    visible={this.state.showingInfoWindow}
                                >
                                    <div>
                                        <h3><a target="_blank" href={"location_" + this.state.selectedPlace.alias} className="locationName" rel="noopener noreferrer">{this.state.selectedPlace.name}</a></h3>
                                        <h6>Phone : {this.state.selectedPlace.phone}</h6>
                                        <h6>Email : {this.state.selectedPlace.email}</h6>
                                        <h6>Address: {this.state.selectedPlace.title}</h6>
                                    </div>
                                </InfoWindow>
                            </Map>*/}
                            {this.state.showLoad ? (<div className="loadermap">
                                <div className="showloaderOnMap">
                                    <img src={tenor} alt="loader" />
                                </div>
                            </div>) : null}
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-5 contpost px-0 order-lg-1 order-2">
                            {!this.state.showBlur && this.state.storeData.length === 0 ? (<h5 className="w-100 text-center p-5 mb-0 no-result ">No stores found matching your location or criteria</h5>) : null}
                            <div className="scrollbar_store" id="storelocatorlist">
                                {
                                    this.state.paginateData.length > 0 ?
                                        this.state.paginateData.map((store, index) => (
                                            <div id={"store" + store.$id} className={this.state.showBlur === true ? "col-12 py-3 hideele" : this.state.selectedPlace.markerId === store.$id ? "col-12 py-3 selected-store-class" : "col-12 py-3"}
                                                key={index}>
                                                <div className={this.state.selectedPlace.markerId === store.$id ? "row " : "row"} >
                                                    <div className="col-xl-5 mb-3 mb-md-0">
                                                        <Link onClick={() => { this.selectThisLocation(); }} className="thumbnail" to={'/location_' + store.Alias}>
                                                            {store.LargeImage ? (<img onError={(e) => { e.target.onerror = null; e.target.src = defaultimage }} className="w-100" src={globalVar.base_url1 + store.LargeImage + "?width=195&mode=max&animationprocessmode=first"} alt="store here" />) : (<img className="w-100" src={defaultimage} alt="store here" />)}
                                                        </Link>
                                                    </div>
                                                    <div className="col-xl-7">
                                                        <h5 className="font-weight-bold mb-4 mt-2 position-relative">
                                                            <span className="d-inline-block">{store.$id}.  </span>  <Link onClick={() => { this.selectThisLocation(); }} className="text-dark store-name" to={'/location_' + store.Alias}>{store.Name}</Link>
                                                        </h5>
                                                        <p className="mb-4 store_address">
                                                            {store.Address1} <br />
                                                            {store.city}  {store.State} {store.ZipCode}
                                                        </p>
                                                        <p className="mb-1 store_phone">Phone: {store.PhoneNo}</p>
                                                        <p className="mb-3 store_hours">Hours: {store.HoursMF}</p>
                                                        <Link onClick={() => { this.selectThisLocation(); this.selectedLocation(store.Alias, store.Id, store.Name) }} className="btn theme-btn text-uppercase wid-48 px-4 py-3 mb-3 d-inline-block login-transparent" to={'/location_' + store.Alias}>Select</Link>
                                                        <a className="btn theme-btn text-uppercase wid-48 btn-outline-dark px-4 py-3 mb-3 d-inline-block login-red text-white" onClick={() => this.quoteOpenUrl(store.Id)}>
                                                            Quote</a>
                                                    </div>
                                                </div>
                                            </div>
                                        )) :
                                        this.state.storeData.slice(0, 3).map((store, index) => (
                                            <div id={"store" + store.$id} className={this.state.showBlur === true ? "col-12 py-3 hideele" : this.state.selectedPlace.markerId === store.$id ? "col-12 py-3 selected-store-class" : "col-12 py-3"}
                                                key={index}>
                                                <div className={this.state.selectedPlace.markerId === store.$id ? "row " : "row"} >
                                                    <div className="col-xl-5 mb-3 mb-md-0">
                                                        <Link onClick={() => { this.selectThisLocation(); }} className="thumbnail" to={'/location_' + store.Alias}>
                                                            {store.LargeImage ? (<img onError={(e) => { e.target.onerror = null; e.target.src = defaultimage }} className="w-100" src={globalVar.base_url1 + store.LargeImage + "?width=195&mode=max&animationprocessmode=first"} alt="store here" />) : (<img className="w-100" src={defaultimage} alt="store here" />)}
                                                        </Link>
                                                    </div>
                                                    <div className="col-xl-7">
                                                        <h5 className="font-weight-bold mb-4 mt-2 position-relative">
                                                            <span className="d-inline-block">{store.$id}.  </span>  <Link onClick={() => { this.selectThisLocation(); }} className="text-dark store-name" to={'/location_' + store.Alias}>{store.Name}</Link>
                                                        </h5>
                                                        <p className="mb-4 store_address">
                                                            {store.Address1} <br />
                                                            {store.city}  {store.State} {store.ZipCode}
                                                        </p>
                                                        <p className="mb-1 store_phone">Phone: {store.PhoneNo}</p>
                                                        <p className="mb-3 store_hours">Hours: {store.HoursMF}</p>
                                                        <Link onClick={() => { this.selectThisLocation(); this.selectedLocation(store.Alias, store.Id, store.Name) }} className="btn theme-btn text-uppercase wid-48 px-4 py-3 mb-3 d-inline-block login-transparent" to={'/location_' + store.Alias}>Select</Link>
                                                        <a className="btn theme-btn text-uppercase wid-48 btn-outline-dark px-4 py-3 mb-3 d-inline-block login-red text-white" onClick={() => this.quoteOpenUrl(store.Id)}>
                                                            Quote</a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                }
                                {!this.state.showBlur && this.state.storeData.length > 3 && this.state.viewMoreStores ? (
                                    <div className="moreBtn text-center py-4">
                                        <a className="btn theme-btn text-uppercase wid-100 btn-outline-dark px-4 d-inline-block login-red text-white" onClick={() => { count = count + 1; this.viewMore(this.state.storeData) }}>
                                            View More Stores
                                        </a>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="request-form modal-dialog-centered">
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
                                    <input id="zipcode" type="text" maxLength="5" onChange={() => this.handleZipcodeChange()} className="form-control border-top-0  border-left-0 border-right-0 effect-2 mb-0 bg-transparent rounded-0 border-top-0  border-left-0 border-right-0 px-0" autoComplete="off" />
                                    <label htmlFor="Zip" className="head-label h5 font-weight-normal">Zip Code</label>
                                    <span className="focus-border"></span>
                                </div>
                                <span className="error-message">{this.state.zipcodeErr}</span>

                            </div>
                            <div className="form-group col-md-6  mb-5">
                                <div className="position-relative">
                                    <input id="phone" type="text" maxLength="12" onChange={() => this.handlePhoneChange()} className="form-control effect-2 mb-0 bg-transparent rounded-0 border-top-0  border-left-0 border-right-0 px-0" autoComplete="off" />
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
                <Modal isOpen={this.state.allowgps} toggle={this.togglelocation} className="modal-dialog-centered location">
                    <ModalHeader toggle={this.togglelocation} className="pb-0"><span className="allow-loc-head h1 m-auto pb-0 d-block font-weight-light ">Allow Location Access</span></ModalHeader>
                    <ModalBody className="">
                        <p className="h5 font-weight-light line-height">If you would like to be able to find stores close to you, please enable GPS or allow location sharing. </p>

                    </ModalBody>
                    <ModalFooter className="allow-loc-foot">
                        <div className="d-lg-inline-flex w-100 align-items-center"><h6>{this.state.gpsError}</h6></div>
                        <Button className="bg-info btn text-uppercase theme-btn  px-4 py-3 btn btn-secondary" color="primary" onClick={this.allowCurrentLocation}>Allow</Button>{' '}
                        <Button className="btn btn-danger text-uppercase theme-btn  px-4 py-3 btn btn-secondary" color="secondary" onClick={this.togglelocation}>Cancel</Button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    }
}

/**
 * Define the protype
 */
StoreLocatoreComponent.propTypes = {
    storeData: PropTypes.array,
    google: PropTypes.any,
    sendQuote: PropTypes.func,
    quoteData: PropTypes.object,

};

export default GoogleApiWrapper(
    (props) => ({
        apiKey: globalVar.apiKey,
        language: props.language,
    }
    ))(StoreLocatoreComponent)


