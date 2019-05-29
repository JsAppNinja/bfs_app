import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
import { Link } from "react-router-dom";
//import Autocomplete from 'react-google-autocomplete';
import { GetStatwiseData } from "../utils";
import { globalVar } from "../config";
import shadow from "../img/shadow.png";
import PropTypes from 'prop-types';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import ReactLoading from 'react-loading';
import { OverlappingMarkerSpiderfier } from 'ts-overlapping-marker-spiderfier'
//const gid = 'AIzaSyCAPzibK06qRZ_9o8V7GxOA8k1a5o3WOYs';
var infoWindow;


class StoreLocatore extends Component {
    constructor() {
        super();

        //defining state variable
        this.state = {
            distributeArray: [],
            installLocationArray: [],
            allLocations: [],
            stateWiseData: [],
            lat: null,
            lng: null,
            zoom: 5,
            Radius: 150,
            zip_code: null,
            state_name: "",
            city_name: "",
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            address: "",
            selectList: false,
            reset: false,
            temp_city: "",
            isloading: false,
            showNoLocation: false,
            state_code: ""
        }

        //binding component function
        this.searchBtnFunctionalIty = this.searchBtnFunctionalIty.bind(this);
        this.selectTheLocation = this.selectTheLocation.bind(this);
        this.gettingDistributeData();
        this.gettingLocationInstalled();
        this.gettingAllLocation();
        infoWindow = new window.google.maps.InfoWindow();
    }

    componentDidUpdate() {
        if (localStorage.getItem("locationlink")) {
            localStorage.removeItem("locationlink");
            if (this.props.storeDataHeader && this.props.storeDataHeader.length > 0) {
                this.setState({
                    allLocations: this.props.storeDataHeader,
                    stateWiseData: GetStatwiseData(this.props.storeDataHeader),
                    lat: this.props.storeDataHeader[0].Latitude,
                    lng: this.props.storeDataHeader[0].Longitude
                })
            }


        }
    }

    componentDidMount() {
        // Check for the mobile environment
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            this.setState({ zoom: 3 })
        }

        //this.initMap();
    }

    initMap(locationData, lat, lng) {
        let self = this;
        if (locationData.length > 0) {
            var latitude = locationData[0].Latitude
            var longitude = locationData[0].Longitude
        } else {
            if (lat && lng) {
                latitude = lat
                longitude = lng
            } else {
                latitude = 30.274096
                longitude = -93.732666
            }
        }
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
            zoom: 8
        });
        var oms = new OverlappingMarkerSpiderfier(map, {
            markersWontMove: true,
            markersWontHide: true,
            basicFormatEvents: false,
            keepSpiderfied: true,
            ignoreMapClick: true,
        });


        var service = new window.google.maps.places.PlacesService(map);
        if (locationData.length === 0) {
            if (this.state.city_name) {
                var request = {
                    query: this.state.city_name,
                    fields: ['name', 'geometry'],
                };
                service.findPlaceFromQuery(request, function (results, status) {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        map.fitBounds(results[0].geometry.viewport);
                        //map.setCenter(results[0].geometry.location);
                    } else {
                        if (self.state.state_name) {
                            request = {
                                query: self.state.state_name,
                                fields: ['name', 'geometry'],
                            };
                            service.findPlaceFromQuery(request, function (results, status) {
                                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                                    map.fitBounds(results[0].geometry.viewport);
                                    //map.setCenter(results[0].geometry.location);
                                }
                            });
                        }
                    }
                });

            } else if (this.state.state_name) {
                request = {
                    query: this.state.state_name,
                    fields: ['name', 'geometry'],
                };
                service.findPlaceFromQuery(request, function (results, status) {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        map.fitBounds(results[0].geometry.viewport);
                        //map.setCenter(results[0].geometry.location);
                    }
                });
            }
        }

        var markers = [];
        var contents = [];
        var bounds = new window.google.maps.LatLngBounds();
        for (let i = 0; i < locationData.length; i++) {
            var myLatLng = new window.google.maps.LatLng(parseFloat(locationData[i].Latitude), parseFloat(locationData[i].Longitude));
            var latLng = new window.google.maps.LatLng(parseFloat(locationData[i].Latitude), parseFloat(locationData[i].Longitude));
            if (markers.length !== 0 || i === 0) {
                // for (i = 0; i < markers.length; i++) {
                //     var existingMarker = markers[i];
                //     var pos = existingMarker.getPosition();
                //     if (latLng.equals(pos)) {
                //         var a = 360.0 / markers.length;
                //         var newLat = pos.lat() + -.00004 * Math.cos((+a * i) / 180 * Math.PI);  //x
                //         var newLng = pos.lng() + -.00500 * Math.sin((+a * i) / 180 * Math.PI);  //Y
                //         latLng = new window.google.maps.LatLng(newLat, newLng);
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

                // infowindows[i] = new window.google.maps.InfoWindow({
                //     content: contents[i],
                //     maxWidth: 300
                // });

                /*let info=  new window.google.maps.InfoWindow({
                    content: contents[i],
                    maxWidth: 300
                });*/
                // window.google.maps.event.addListener(markers[i], 'click', function (marker, content, infowindow) {
                //     infoWindow.setContent(contents[i]);
                //     infoWindow.open(map, markers[this.index]);
                //     //map.panTo(markers[this.index].getPosition());
                // });
                window.google.maps.event.addListener(markers[i], 'spider_click', function (e) {  // 'spider_click', not plain 'click'
                    infoWindow.setContent(contents[i]);
                    infoWindow.open(map, markers[this.index]);
                });

                oms.addMarker(markers[i]);


            }

            // new MarkerClusterer(map, markers,
            //     {
            //         maxZoom: 13,
            //         imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            //     }
            // );

        }
        oms.addListener('format', function (marker, status) {
            var iconURL = status === OverlappingMarkerSpiderfier.markerStatus.SPIDERFIED ? 'icons8-google-maps.png' :
                status === OverlappingMarkerSpiderfier.markerStatus.SPIDERFIABLE ? 'google-maps-Plus.png' :
                    status === OverlappingMarkerSpiderfier.markerStatus.UNSPIDERFIABLE ? 'icons8-google-maps.png' :
                        null;
            marker.setIcon({
                url: iconURL,
                scaledSize: new window.google.maps.Size(22, 32),

            });
        });

    }

    resetSearch() {
        if (this.state.reset) {
            this.setState(
                {
                    isloading: true
                }
            )
            this.gettingAllLocation();
        }
        this.setState(
            {
                zip_code: "",
                city_name: "",
                state_name: "",
                reset: false
            }
        )

        this.state.distributeArray.map(function (item) {
         return   item.checked = false
        })

        this.state.installLocationArray.map(function (item) {
            return   item.checked = false
        })
        var cbarray = document.getElementsByName("is_name");
        for (var i = 0; i < cbarray.length; i++) {

            cbarray[i].checked = false;
        }
    }


    /**
    *Getting distributed data through API
    */
    gettingDistributeData() {
        axios.get(globalVar.base_url1 + "/umbraco/api/LocationData/GetDistributionList?forPage=MainLocationsPage", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            if (response.status === 200) {
                this.setState({
                    distributeArray: response.data,
                });
            }
        }).catch(() => {
        });
    }

    /**
     * Getting the installed loations
     */
    gettingLocationInstalled() {
        axios.get(globalVar.base_url1 + "/umbraco/api/LocationData/GetInstalledServiceList?forPage=MainLocationsPage", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            if (response.status === 200) {
                this.setState({
                    installLocationArray: response.data,
                });
            }
        }).catch(() => {
        });
    }

    /**
     * Getting the All location
     */
    gettingAllLocation(distributionAlias, installedServiceName, lat, lng, address, state, srl) {
        if (localStorage.getItem("locationlink")) {
            localStorage.removeItem("locationlink");
            if (this.props.storeDataHeader && this.props.storeDataHeader.length > 0) {
                this.setState({
                    allLocations: this.props.storeDataHeader,
                    stateWiseData: GetStatwiseData(this.props.storeDataHeader),
                    lat: this.props.storeDataHeader[0].Latitude,
                    lng: this.props.storeDataHeader[0].Longitude,
                    isloading: false
                })
            }
        } else {
            distributionAlias = (distributionAlias && distributionAlias.length > 0) ? distributionAlias : "";
            installedServiceName = installedServiceName ? installedServiceName : ""
            let self = this;
            fetch(globalVar.base_url1 + '/umbraco/api/LocationData/GetAllLocations', {
                method: 'post',
                body: JSON.stringify({
                    radius: self.state.Radius,
                    latitude: lat,
                    longitude: lng,
                    DistributionList: distributionAlias,
                    installedServiceName: installedServiceName,
                    City: address,
                    State: state
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.length > 0) {
                    this.setState({
                        allLocations: data,
                        stateWiseData: GetStatwiseData(data),
                        isloading: false,
                        showNoLocation: false
                    })
                    if (this.state.lat === null) {
                        this.setState({
                            lat: parseFloat(data[0].Latitude),
                            lng: parseFloat(data[0].Longitude)
                        })
                    }
                    if (srl) {
                        let elmnt = document.getElementById("content");
                        elmnt.scrollIntoView();
                    }

                    this.initMap(data, lat, lng);
                } else {
                    NotificationManager.error('', 'There are no locations for this search criteria', 3000);
                    this.setState({
                        allLocations: data,
                        stateWiseData: GetStatwiseData(data),
                        isloading: false,
                        showNoLocation: true
                    })
                    let elmnt = document.getElementById("content");
                    elmnt.scrollIntoView();
                    this.initMap(data, lat, lng);
                }
            }).catch(() => {

            });
        }
    }

    searchBtnFunctionalIty() {
        var geocoder = new window.google.maps.Geocoder();
        let self = this;
        let distributeArray = [];
        let installLocationArray = [];
        this.state.distributeArray.map(function (item) {
            if (item.checked) {
                distributeArray.push(
                    {
                        alias: item.Alias
                    })
            }
            return true
        })
        this.state.installLocationArray.map(function (item) {
            if (item.checked) {
                installLocationArray.push(item.Name)
            }
            return true
        })

        if (self.state.zip_code) {
            if (this.state.city_name || this.state.state_name) {
                NotificationManager.error('', 'Please either enter zipcode or state and city', 3000);
            } else {
                let self = this
                this.setState(
                    {
                        isloading: true
                    }
                )
                geocoder.geocode({ 'componentRestrictions': { 'postalCode': self.state.zip_code } }, function (results, status) {
                    if (results[0]) {
                        self.setState({
                            lat: results[0].geometry.location.lat(),
                            lng: results[0].geometry.location.lng(),
                            zoom: 9,
                            address: "",
                            reset: true
                        })
                        if (self.state.temp_city) {
                            self.gettingAllLocation(distributeArray, installLocationArray.join(), results[0].geometry.location.lat(),
                                results[0].geometry.location.lng(), self.state.temp_city, self.state.state_name, true)
                        } else {
                            self.gettingAllLocation(distributeArray, installLocationArray.join(), results[0].geometry.location.lat(),
                                results[0].geometry.location.lng(), self.state.city_name, self.state.state_name, true)
                        }
                    } else {
                        self.setState(
                            {
                                isloading: false
                            }
                        )
                        NotificationManager.error('', 'Zip code you have entered could not be found', 3000);
                    }
                })
            }

        } else {

            self.setState({
                lat: null,
                lng: null,
                zoom: 9,
                reset: true,
                isloading: true
            })

            if (self.state.city_name && self.state.state_name) {
                geocoder.geocode({
                    'address': self.state.city_name,
                    'componentRestrictions': {
                        'administrativeArea': self.state.state_code
                    }
                }, function (results, status) {
                    if (results[0]) {
                        self.gettingAllLocation(distributeArray, installLocationArray.join(), results[0].geometry.location.lat(), results[0].geometry.location.lng(), "", "", true)
                    } else {
                        self.gettingAllLocation(distributeArray, installLocationArray.join(), "", "", self.state.city_name, self.state.state_name, true)
                    }
                })
            } else if (self.state.city_name) {
                geocoder.geocode({
                    'address': self.state.city_name
                }, function (results, status) {
                    if (results[0]) {
                        self.gettingAllLocation(distributeArray, installLocationArray.join(), results[0].geometry.location.lat(), results[0].geometry.location.lng(), "", "", true)
                    } else {
                        self.gettingAllLocation(distributeArray, installLocationArray.join(), "", "", self.state.city_name, self.state.state_name, true)
                    }
                });
            } else if (self.state.state_name) {
                self.gettingAllLocation(distributeArray, installLocationArray.join(), "", "", self.state.city_name, self.state.state_name, true)
            } else {
                self.gettingAllLocation(distributeArray, installLocationArray.join(), "", "", self.state.city_name, self.state.state_name, true)
            }
        }
    }

    resetMap() {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            this.setState({ zoom: 3 })
        } else {
            this.setState({
                zoom: 5,
                reset: false
            })
        }
        this.gettingAllLocation();
    }

    /**
     * Getting the lat lng from the place object
     * @param {Object} place 
     */
    getLatLon(place) {
        if (place.geometry) {
            if (place.geometry.location.lng()) {
                this.setState({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    zoom: 9,
                    selectedPlace: true,
                    temp_city: place.address_components[1].long_name
                })
            }
        }
    }

    /**
     * Marker click
     */
    onMarkerClick = (props, marker) => {
        /*this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });*/
    }

    /**
     * Map Clicked
     */
    onMapClicked = () => {
        if (this.state.showingInfoWindow) {

            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    /**
     * Search Change Handler
     * @param {Event} e 
     */
    searchChangeHandler(e) {
        if (e.target && e.target.value) {
            this.setState(
                {
                    city_name: e.target.value,
                    selectedPlace: false
                })
        } else {
            this.setState(
                {
                    city_name: "",
                    selectedPlace: false
                })
        }
    }

    /** Zip code Formatter */
    numberOnly(e) {
        var element = document.getElementById("zip_locations_module");
        var regex = /[^0-9]/gi;
        element.value = element.value.replace(regex, "");
        this.setState(
            {
                zip_code: e.target.value
            })
    }

    /**
     * Event on selecting store
     */
    selectTheLocation(alias, id, name) {
        let storedetail = alias + "," + id + "," + name;
        localStorage.setItem("selectedStore", storedetail);
        localStorage.setItem("storeId", id);
    }

    closeMessage() {
        this.setState(
            {
                showNoLocation: false
            }
        )
    }

    render() {
        let content = "";
        let pagetitle = "";
        if (this.props.basicDataLoaded) {
            this.props.getLocationContent();
        }
        if (this.props.locationContent.length > 0) {
            if (this.props.locationContent[0]) {
                content = this.props.locationContent[0].content;
                pagetitle = this.props.locationContent[0].pageTitle;
            }
        }

        return (
            <div>
                <NotificationContainer />
                <div className="loc_mein midcontent">
                    <div className="pt-lg-5 pt-5 pt-md-5 pt-xl-5 d-flex px-3">
                        <div className="container">
                            <div className="BasicPageTopWrap mt-3">
                                <h1 className="MainH1">
                                    {pagetitle}
                                </h1>
                                {content ? (<div dangerouslySetInnerHTML={{ __html: content }}></div>) : null}
                                <img className="shadow-img w-100" alt="line" title="Resource Center - Green Works " src={shadow} />
                            </div>
                        </div>
                    </div>
                    <div className="content_full LocationsPage bg-white pb-5">
                        <div className="container">
                            <div className="fond_loc loc_box">
                                <div className="fnd_bx">
                                    <h4 style={{ display: 'inline-flex' }}>Find a location close to you by: {this.state.isloading ? (<ReactLoading className="loaderhead" type={"spin"} color={"black"} height={30} width={30} />) : null}</h4>

                                    <form className="srch_form">
                                        <div className="row">
                                            <div className="form-group col-sm-12 col-md-3">

                                                <div className="input-group">
                                                    <input type="text" maxLength="5" id="zip_locations_module" onChange={(e => { this.numberOnly(e) })} placeholder="ZIP (leave empty for all)" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="form-group col-sm-12 col-md-1">
                                                <div className="or_txt"> or </div>
                                            </div>
                                            <div className="form-group col-sm-12 col-md-2" >
                                                {/* <div className="input-group"> */}
                                                {/*<Autocomplete className="form-control" style={{ width: '100%' }} placeholder="City" onChange={(e) => this.searchChangeHandler(e)} onPlaceSelected={(place) => {
                                                    this.getLatLon(place);
                                                }}
                                                    types={['(cities)']}
                                            />*/}

                                                {/* </div> */}

                                                <input type="text" onChange={(e) => this.searchChangeHandler(e)} placeholder="City" className="form-control" />
                                            </div>
                                            <div className="form-group col-sm-12 col-md-2">
                                                <select name="ddlState" id="ddlState" className="form-control" onChange={(e) => { this.setState({ state_name: e.target.value.split(",")[1], state_code: e.target.value.split(",")[0] }); }} >
                                                    <option value="">-- Select State --</option>
                                                    <option value="AL,Alabama">AL Alabama</option>
                                                    <option value="AK,Alaska">AK Alaska</option>
                                                    <option value="AZ,Arizona">AZ Arizona</option>
                                                    <option value="AR,Arkansas">AR Arkansas</option>
                                                    <option value="CA,California">CA California</option>
                                                    <option value="CO,Colorado">CO Colorado</option>
                                                    <option value="CT,Connecticut">CT Connecticut</option>
                                                    <option value="DE,Delaware">DE Delaware</option>
                                                    <option value="FL,Florida">FL Florida</option>
                                                    <option value="GA,Georgia">GA Georgia</option>
                                                    <option value="HI,Hawaii">HI Hawaii</option>
                                                    <option value="ID,Idaho">ID Idaho</option>
                                                    <option value="IL,Illinois">IL Illinois</option>
                                                    <option value="IN,Indiana">IN Indiana</option>
                                                    <option value="IA,Iowa">IA Iowa</option>
                                                    <option value="KS,Kansas">KS Kansas</option>
                                                    <option value="KY,Kentucky">KY Kentucky</option>
                                                    <option value="LA,Louisiana">LA Louisiana</option>
                                                    <option value="ME,Maine">ME Maine</option>
                                                    <option value="MD,Maryland">MD Maryland</option>
                                                    <option value="MA,Massachusetts">MA Massachusetts</option>
                                                    <option value="MI,Michigan">MI Michigan</option>
                                                    <option value="MN,Minnesota">MN Minnesota</option>
                                                    <option value="MS,Mississipp">MS Mississippi</option>
                                                    <option value="MO,Missouri">MO Missouri</option>
                                                    <option value="MT,Montana">MT Montana</option>
                                                    <option value="NE,Nebraska">NE Nebraska</option>
                                                    <option value="NV,Nevada">NV Nevada</option>
                                                    <option value="NH,New Hampshire">NH New Hampshire</option>
                                                    <option value="NJ,New Jersey">NJ New Jersey</option>
                                                    <option value="NM,New Mexico">NM New Mexico</option>
                                                    <option value="NY,New York">NY New York</option>
                                                    <option value="NC,North Carolina">NC North Carolina</option>
                                                    <option value="ND,North Dakota">ND North Dakota</option>
                                                    <option value="OH,Ohio">OH Ohio</option>
                                                    <option value="OK,Oklahoma">OK Oklahoma</option>
                                                    <option value="OR,Oregon">OR Oregon</option>
                                                    <option value="PA,Pennsylvania">PA Pennsylvania</option>
                                                    <option value="RI,Rhode Island">RI Rhode Island</option>
                                                    <option value="SC,South Carolina">SC South Carolina</option>
                                                    <option value="SD,South Dakota">SD South Dakota</option>
                                                    <option value="TN,Tennessee">TN Tennessee</option>
                                                    <option value="TX,Texas">TX Texas</option>
                                                    <option value="UT,Utah">UT Utah</option>
                                                    <option value="VT,Vermont">VT Vermont</option>
                                                    <option value="VA,Virginia">VA Virginia</option>
                                                    <option value="WA,Washington">WA Washington</option>
                                                    <option value="WV,West Virginia">WV West Virginia</option>
                                                    <option value="WI,Wisconsin">WI Wisconsin</option>
                                                    <option value="WY,Wyoming">WY Wyoming</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-sm-12 col-md-2">

                                                <input type="button" name="BtnSearch" value="Search" id="BtnSearch" onClick={() => this.searchBtnFunctionalIty()} className="sbmt_bttn btn btn-primary" />
                                            </div>
                                            <div className="form-group col-sm-12 col-md-2">

                                                <input type="reset" name="BtnSearch1" value="Reset Search" id="BtnSearch1" onClick={() => this.resetSearch()} className="sbmt_bttn btn btn-primary" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>


                            <div className="fond_loc loc_box mt-4">
                                <div className="mein_distribution_list">
                                    <h6>Show only locations that distribute any of these Products:</h6>
                                    <div className="distribution_list">
                                        <div className="row">
                                            {
                                                this.state.distributeArray.map(function (item, index) {
                                                    return (<div className="col-md-3 col-sm-6 col-xs-6" key={index}>
                                                        <div className="loc_check"> <input type="checkbox" name="is_name" onChange={(e) => { item.checked = e.target.checked }} /> <label>{item.Name}
                                                        </label>
                                                        </div>
                                                    </div>)

                                                })
                                            }
                                        </div>
                                    </div>
                                    <h6 className="py-3 m-0">Show only locations that install any of these Products:</h6>
                                    <div className="distribution_list">
                                        <div className="row">
                                            {
                                                this.state.installLocationArray.map(function (item, index) {
                                                    return (

                                                        <div className="col-md-3 col-sm-6 col-xs-6" key={index}>
                                                            <div className="loc_check"><input type="checkbox" name="is_name" onChange={(e) => { item.checked = e.target.checked }} />
                                                                <label> {item.Name}
                                                                </label>
                                                            </div>
                                                        </div>)
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="location_map" id="content">
                        <div className="container">
                            {/*{this.state.reset?(<div className="row pb-5">
                               <div className="col-md-12">
                                  <input type="button" name="BtnSearch1" id="BtnSearch1" onClick={() => this.resetMap()} className="sbmt_bttn btn btn-danger" value="Reset Map"/>
                               </div>
                            </div>):null}*/}
                            <div className="row">
                                <div className="col-md-12">
                                    <div style={{ height: '100vh', width: '100%' }}>
                                        {/*<Map google={this.props.google} zoom={this.state.zoom} center={{ lat: this.state.lat ? this.state.lat : 40.552524, lng: this.state.lng ? this.state.lng : -101.815753 }}>
                                            {

                                                this.state.allLocations.map((item, index) =>
                                                    <Marker
                                                        title={item.Address1}
                                                        name={item.Name}
                                                        key={index}
                                                        email={item.Email}
                                                        phone={item.PhoneNo}
                                                        alias={item.Alias}
                                                        position={{ lat: parseFloat(item.Latitude), lng: parseFloat(item.Longitude) }}
                                                        onClick={this.onMarkerClick} />
                                                )
                                            }
                                            <InfoWindow
                                                marker={this.state.marker}
                                                visible={true}>
                                                <div>
                                                    <h3><a target="_blank" rel="noopener noreferrer" href={"/location_" + this.state.selectedPlace.alias}>{this.state.selectedPlace.name}</a></h3>
                                                    <h6>Phone : {this.state.selectedPlace.phone}</h6>
                                                    <h6>Email : {this.state.selectedPlace.email}</h6>
                                                    <h6>Address: {this.state.selectedPlace.title}</h6>
                                                </div>
                                            </InfoWindow>

                                        </Map>*/}
                                        {this.state.showNoLocation ? (<div id="alert" className="alert alert-danger">
                                            <a className="close" onClick={() => this.closeMessage()} aria-label="close">&times;</a>
                                            <strong>No Location!</strong> There are no locations for this search criteria.
                                        </div>) : null}
                                        <div style={{ height: "100%" }} id="map" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="all_location bg-grey bg-gray py-3">
                    <div className="container">
                        <div className="col-md-12">
                            <h2>All Locations</h2>
                        </div>
                        <div className="col-md-12">
                            <div className="alocation" >
                                <div className="row">
                                    {
                                        this.state.stateWiseData.map(function (item, index) {
                                            return (
                                                <div className="col-md-4 col-sm-4" key={index}>
                                                    <div className="loc_link_box">
                                                        <h5>{item.State}</h5>
                                                        {
                                                            item.locationList.map(function (data, i) {

                                                                //return (<Link target="_blank" onClick={() => self.selectTheLocation(data.Alias, data.Id, data.Name)} to={'/location_' + data.Alias} key={i}> {data.Name}</Link>)
                                                                return (<Link target="_blank" to={'/location_' + data.Alias} key={i}> {data.Name}</Link>)
                                                            })
                                                        }

                                                    </div>
                                                </div>
                                            )

                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


// export default StoreLocatore;

export default GoogleApiWrapper({
    apiKey: globalVar.apiKey
})(StoreLocatore)


/**
 * Define the proptype
 */
StoreLocatore.propTypes = {
    locationContent: PropTypes.array,
    google: PropTypes.any,
    storeDataHeader: PropTypes.array,
    basicDataLoaded: PropTypes.bool,
    getLocationContent: PropTypes.func

};