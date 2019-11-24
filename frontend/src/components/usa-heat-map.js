import React, { Component } from "react";
import $ from 'jquery'
import legent_locations from "../assets/img/legend_new.PNG";
import PropTypes from 'prop-types';
import { globalVar } from "../config";
var base_url = globalVar.base_url1;

export default class UsaHeatChartComponent extends Component {

  constructor(props) {
    super(props);
    this.show = true;
    this.diskstyle = {
      color: "red",
      "list-style-type": "disc"
    };

    this.simplemaps_usmap_mapdata = {
      main_settings: {
        width: "responsive",
        background_transparent: "no",
        label_color: "white",
        hide_labels: "no",
        border_color: "white",
        state_description: " ",
        state_color: "#d3d2d7",
        state_hover_color: "#1d69b4",
        state_url: "",
        all_states_inactive: "no",
        location_descriptionription: "",
        location_color: "#8470ff",
        location_pulse: "yes",
        location_pulse_size: "3",
        location_opacity: "0",
        location_url: "",
        all_states_zoomable: "no",
        location_size: "5",
        location_type: "",
        all_locations_inactive: "no",
        url_new_tab: "yes",
        auto_load: "yes",
        zoom: "yes",
        initial_zoom: "-1",
        initial_zoom_solo: "yes",
        div: "map",
        state_image_url: "",
        state_image_position: "",
        location_image_url: "",
        label_hover_color: "",
        label_size: "",
        label_font: "",
        popups: "detect",
        border_size: "1",
        manual_zoom: "yes"
      },
      state_specific: {
        HI: { name: "Hawaii", hide: "no", inactive: "no" },
        AK: { name: "Alaska", hide: "no", inactive: "no" },
        FL: { name: "Florida", inactive: "no", hide: "no" },
        NH: {
          name: "New Hampshire",
          hide: "no",
          inactive: "yes",
          color: "#acacac"
        },
        VT: { name: "Vermont", hide: "no", inactive: "yes", color: "#acacac" },
        ME: { name: "Maine", hide: "no", inactive: "yes", color: "#acacac" },
        RI: {
          name: "Rhode Island",
          hide: "no",
          inactive: "yes",
          color: "#acacac"
        },
        NY: { name: "New York", hide: "no", inactive: "no" },
        PA: { name: "Pennsylvania", hide: "no", inactive: "no" },
        NJ: { name: "New Jersey", hide: "no", inactive: "no" },
        DE: { name: "Delaware", hide: "no", inactive: "no" },
        MD: { name: "Maryland", hide: "no", inactive: "no" },
        VA: { name: "Virginia", hide: "no", inactive: "no" },
        WV: { name: "West Virginia", hide: "no", inactive: "no" },
        OH: { name: "Ohio", hide: "no", inactive: "no" },
        IN: { name: "Indiana", hide: "no", inactive: "no" },
        IL: { name: "Illinois", hide: "no", inactive: "no" },
        CT: { name: "Connecticut", hide: "no", inactive: "no" },
        WI: { name: "Wisconsin", hide: "no", inactive: "no" },
        NC: { name: "North Carolina", hide: "no", inactive: "no" },
        DC: { name: "District of Columbia", hide: "no", inactive: "no" },
        MA: {
          name: "Massachusetts",
          hide: "no",
          inactive: "yes",
          color: "#acacac",
        },
        TN: { name: "Tennessee", hide: "no", inactive: "no" },
        AR: { name: "Arkansas", hide: "no", inactive: "yes", color: "#acacac" },
        MO: { name: "Missouri", hide: "no", inactive: "no" },
        GA: { name: "Georgia", hide: "no", inactive: "no" },
        SC: { name: "South Carolina", hide: "no", inactive: "no" },
        KY: { name: "Kentucky", hide: "no", inactive: "no" },
        AL: { name: "Alabama", hide: "no", inactive: "no" },
        LA: {
          name: "Louisiana",
          hide: "no",
          inactive: "yes",
          color: "#acacac"
        },
        MS: { name: "Mississippi", hide: "no", inactive: "no" },
        IA: { name: "Iowa", hide: "no", inactive: "no" },
        MN: { name: "Minnesota", hide: "no", inactive: "no" },
        OK: { name: "Oklahoma", hide: "no", inactive: "no" },
        TX: { name: "Texas", hide: "no", inactive: "no" },
        NM: { name: "New Mexico", hide: "no", inactive: "no" },
        KS: { name: "Kansas", hide: "no", inactive: "no" },
        NE: { name: "Nebraska", hide: "no", inactive: "yes", color: "#acacac" },
        SD: { name: "South Dakota", hide: "no", inactive: "no" },
        ND: { name: "North Dakota", hide: "no", inactive: "no" },
        WY: { name: "Wyoming", hide: "no", inactive: "no" },
        MT: { name: "Montana", hide: "no", inactive: "no" },
        CO: { name: "locationcolorado", hide: "no", inactive: "no" },
        UT: { name: "Utah", hide: "no", inactive: "no" },
        AZ: { name: "Arizona", hide: "no", inactive: "no" },
        NV: { name: "Nevada", hide: "no", inactive: "yes", color: "#acacac" },
        OR: { name: "Oregon", hide: "no", inactive: "no" },
        WA: { name: "Washington", hide: "no", inactive: "no" },
        CA: { name: "California", hide: "no", inactive: "no" },
        MI: { name: "Michigan", hide: "no", inactive: "no" },
        ID: { name: "Idaho", hide: "no", inactive: "no" },
        GU: { name: "Guam", hide: "yes", inactive: "no" },
        VI: { name: "Virgin Islands", hide: "yes", inactive: "no" },
        PR: { name: "Puerto Rico", hide: "yes", inactive: "no" },
        MP: { name: "Northern Mariana Islands", hide: "yes", inactive: "no" }
      },
      locations: [
        {
          name: "East Hartford Lumber",
          lat: 41.797112,
          lng: -72.619775,
          description:
            "367 Ellington Rd, East Hartford, 6108 </br>Ph: 860-289-3474",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "East Hartford Gypsum",
          lat: 41.797112,
          lng: -72.619775,
          description:
            "367 Ellington Rd, East Hartford, 6108 </br>Ph: 860-289-3474",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Bayport Lumber",
          lat: 40.746717,
          lng: -73.057259,
          description: "678 Montauk Hwy, Bayport, 11705 </br>Ph: 631-472-1000",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Farmingdale Lumber",
          lat: 40.732824,
          lng: -73.42383,
          description:
            "1294 Route 110 (PO Box 409), Farmingdale, 11735 </br>Ph: 631-249-2400",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Ticonderoga Lumber",
          lat: 43.843597,
          lng: -73.448371,
          description:
            "884 NYS Route 9N, Ticonderoga, 12883 </br>Ph: 518-585-2818",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "New Hyde Park Lumber",
          lat: 40.743207,
          lng: -73.672898,
          description:
            "1801 Falmouth Ave, New Hyde Park, 11040 </br>Ph: 516-561-2700",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Mahopac Lumber",
          lat: 41.370532,
          lng: -73.737543,
          description: "585 Route 6, Mahopac, 10541 </br>Ph: 845-628-3431",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Clifton Park Showroom",
          lat: 42.8608889,
          lng: -73.76427778,
          description:
            "1675 Route 9 Ste 110, Clifton Park, 12065 </br>Ph: 518-243-5850",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Congers Lumber",
          lat: 41.154187,
          lng: -73.927834,
          description: "102 N. Route 9W, Congers, 10920 </br>Ph: 845-268-9245",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Vails Gate Lumber",
          lat: 41.453779,
          lng: -74.059064,
          description:
            "149 Temple Hill Rd, Vails Gate, 12584 </br>Ph: 845-562-5442",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Rosendale Lumber",
          lat: 41.835133,
          lng: -74.069888,
          description:
            "918 Route 32 (PO Box 303), Rosendale, 12472 </br>Ph: 845-658-8331",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Elizabeth Lumber",
          lat: 40.66614,
          lng: -74.187312,
          description: "555 Dowd Ave, Elizabeth, 7201 </br>Ph: 908-787-0020",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Lakewood Lumber",
          lat: 40.073684,
          lng: -74.22457,
          description: "301 Prospect St, Lakewood, 8701 </br>Ph: 732-363-6611",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Lakewood Gypsum",
          lat: 40.073684,
          lng: -74.22457,
          description: "301 Prospect St, Lakewood, 8701 </br>Ph: 732-363-6611",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Johnstown Lumber",
          lat: 43.010166,
          lng: -74.360387,
          description:
            "99 N. Comrie Ave, Johnstown, 12095 </br>Ph: 518-762-0074",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Middletown Millwork",
          lat: 41.439054,
          lng: -74.372468,
          description:
            "30-40 Golf Links Rd, Middletown, 10940 </br>Ph: 845-343-7742",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Middletown Liquidation",
          lat: 41.439054,
          lng: -74.372468,
          description:
            "30 Golf Links Rd, Middletown, 10940 </br>Ph: 845-343-7742",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Middletown Kitchens",
          lat: 41.439054,
          lng: -74.372468,
          description:
            "87 Wisner Ave., Middletown, 10940 </br>Ph: 845-342-5555",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Middletown Lumber",
          lat: 41.456609,
          lng: -74.410713,
          description: "87 Wisner Ave, Middletown, 10940 </br>Ph: 845-342-5555",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Pleasantville Lumber",
          lat: 39.412629,
          lng: -74.524576,
          description: "950 Mill Rd, Pleasantville, 8232 </br>Ph: 609-568-9360",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Mt Holly Lumber",
          lat: 39.996913,
          lng: -74.801471,
          description: "301 Rancocas Rd, Mt Holly, 8060 </br>Ph: 609-702-0910",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Berlin North Components",
          lat: 39.750796,
          lng: -74.934039,
          description:
            "210 Williamstown Rd, Berlin, 8009 </br>Ph: 856-767-3153",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "NJ/PA Construction Services",
          lat: 39.942785,
          lng: -74.950381,
          description:
            "817 East Gate Drive Suite #101, Mount Laurel, 8054 </br>Ph: 856-505-1100",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Gloucester City Millwork",
          lat: 39.888506,
          lng: -75.124337,
          description:
            "850 Charles St, Gloucester City, 8030 </br>Ph: 856-742-7250",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Gloucester City Kitchens",
          lat: 39.888506,
          lng: -75.124337,
          description:
            "850 Charles St, Gloucester City, 8030 </br>Ph: 856-742-7250",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Lewes Gypsum",
          lat: 38.744715,
          lng: -75.154879,
          description: "34130 Citizens Dr, Lewes, 19958 </br>Ph: 302-644-8395",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Philadelphia Kitchen Showroom",
          lat: 39.938821,
          lng: -75.176743,
          description:
            "2001 Washington Ave, Philadelphia, 19146 </br>Ph: 215-893-8645",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Phillipsburg Lumber",
          lat: 40.695878,
          lng: -75.200376,
          description:
            "15 Sawmill St., Phillipsburg, 8865 </br>Ph: 908-343-2471",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Phillipsburg Gypsum",
          lat: 40.695878,
          lng: -75.200376,
          description:
            "15 Sawmill St, Phillipsburg, 8865 </br>Ph: 908-343-2471",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Newark Gypsum",
          lat: 39.649382,
          lng: -75.715214,
          description: "54 Albe Dr, Newark, 19702 </br>Ph: 302-731-0678",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Kingston Gypsum",
          lat: 41.272228,
          lng: -75.885615,
          description: "695 Wyoming Ave, Kingston, 18704 </br>Ph: 570-287-5072",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "North East Yard",
          lat: 39.62033,
          lng: -75.95287,
          description:
            "18 Industrial Drive, North East, 21901 </br>Ph: 410-287-7797",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Easton Lumber",
          lat: 38.779244,
          lng: -76.059954,
          description:
            "8401 Ocean Gateway, Easton, 21601 </br>Ph: 410-822-4880",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Cicero Showroom",
          lat: 43.1581944,
          lng: -76.12261111,
          description: "8011 Brewerton Rd, Cicero, 13039 </br>Ph: 315-915-6030",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Mexico Lumber",
          lat: 43.468396,
          lng: -76.232445,
          description: "5818 Scenic Ave, Mexico, 13114 </br>Ph: 315-963-7293",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Chesapeake Lumber",
          lat: 36.749937,
          lng: -76.236314,
          description:
            "404 Green Tree Rd, Chesapeake, 23320 </br>Ph: 757-548-1532",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Chesapeake Gypsum",
          lat: 36.789308,
          lng: -76.246646,
          description:
            "1752 South Military HWY, Chesapeake, 23320 </br>Ph: 757-420-1661",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Lancaster Gypsum",
          lat: 40.04446,
          lng: -76.281248,
          description:
            "1103 Ranck Mill Rd, Lancaster, 17602 </br>Ph: 717-672-0428",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Jessup Gypsum",
          lat: 39.13428,
          lng: -76.79884,
          description:
            "10650 Riggs Hill Road, Jessup, 20794 </br>Ph: 410-719-2800",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Williamsburg Lumber",
          lat: 37.378349,
          lng: -76.800795,
          description: "7812 Richmond Road, Toano, 23168 </br>Ph: 757-566-3070",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "West Point Components",
          lat: 37.560918,
          lng: -76.820923,
          description:
            "311 Industrial Parkway, West Point, 23181 </br>Ph: 804-843-3203",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Tappahannock Lumber",
          lat: 37.9152,
          lng: -76.859269,
          description:
            "1225 Tappahannock Blvd (PO Box 789), Tappahannock, 22560 </br>Ph: 804-443-3326",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Harrisburg Gypsum",
          lat: 40.30094,
          lng: -76.89585,
          description: "3405 N 6th St, Harrisburg, 17110 </br>Ph: 717-236-9425",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Waldorf Lumber",
          lat: 38.62071,
          lng: -76.90788,
          description: "11850 Pika Drive, Waldorf, 20602 </br>Ph: 301-843-2467",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Waldorf Gypsum",
          lat: 38.619229,
          lng: -76.909285,
          description: "11850 Pika Drive, Waldorf, 20602 </br>Ph: 301-967-9100",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Washington Yard",
          lat: 35.53877,
          lng: -77.05,
          description:
            "515 E. Water Street, Washington, 27889 </br>Ph: 252-946-6431",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Petersburg Gypsum & Roofing",
          lat: 37.198192,
          lng: -77.377135,
          description:
            "2520 South Crater Rd, Petersburg, 23805 </br>Ph: 804-732-0811",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Chester Lumber & Millwork",
          lat: 37.354252,
          lng: -77.39175,
          description:
            "12611 Bermuda Triangle Rd, Chester, 23836 </br>Ph: 804-748-2010",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Jacksonville Lumber",
          lat: 34.747104,
          lng: -77.393495,
          description:
            "131 Ellis Blvd, Jacksonville, 28540 </br>Ph: 910-353-8700",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Frederick Lumber",
          lat: 39.36149,
          lng: -77.418411,
          description:
            "7203 McKinney Circle, Frederick, 21704 </br>Ph: 301-696-1504",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Frederick Gypsum",
          lat: 39.36149,
          lng: -77.418411,
          description:
            "7203 McKinney Circle, Frederick, 21704 </br>Ph: 301-670-0800",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Manassas Deck Store",
          lat: 38.772494,
          lng: -77.436481,
          description:
            "9109 Owens Drive, Manassas Park, 20111 </br>Ph: 703-330-8095",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Chantilly Gypsum",
          lat: 38.917652,
          lng: -77.471229,
          description:
            "25279 Pleasant Valley Rd, Chantilly, 20152 </br>Ph: 703-471-9062",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Maryland Millwork",
          lat: 39.325371,
          lng: -77.489362,
          description:
            "3302 Ballenger Creek Pike, Frederick, 21703 </br>Ph: 301-874-2442",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Fredericksburg Gypsum",
          lat: 38.252874,
          lng: -77.498319,
          description:
            "5213 Jefferson Davis Hwy, Fredericksburg, 22408 </br>Ph: 540-834-2111",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Point of Rocks Yard",
          lat: 39.27453,
          lng: -77.52773,
          description:
            "4011 Rock Hall Road, Point of Rocks, 21777 </br>Ph: 301-874-5151",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Roanoke Rapids Lumber",
          lat: 36.441566,
          lng: -77.642435,
          description:
            "1625 E. 10th Street, Roanoke Rapids, 27870 </br>Ph: 252-537-2583",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Hagerstown Panel & Truss",
          lat: 39.630603,
          lng: -77.738415,
          description:
            "914 South Burhans Boulevard, Hagerstown, 21740 </br>Ph: 240-500-1300",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "State College Gypsum",
          lat: 40.939558,
          lng: -77.819975,
          description:
            "250 Runville Rd, Bellefonte, 16823 </br>Ph: 814-357-8100",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Culpeper Yard",
          lat: 38.51897,
          lng: -77.85666,
          description:
            "13234 Airpark Drive, Elkwood, 22718 </br>Ph: 540-825-0200",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Wilmington Lumber",
          lat: 34.24791,
          lng: -77.869,
          description:
            "5415 Market Street, Wilmington, 28405 </br>Ph: 910-799-0986",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Wilmington Millwork",
          lat: 34.236118,
          lng: -77.888663,
          description:
            "252 S. Kerr Ave, Wilmington, 28403 </br>Ph: 910-799-7910",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Wilmington Gypsum",
          lat: 34.235256,
          lng: -77.892664,
          description:
            "4151 Emerson St, Wilmington, 28403 </br>Ph: 910-313-3056",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Southport Yard",
          lat: 33.917082,
          lng: -78.019059,
          description:
            "1609 Howe Street SE, Southport, 28461 </br>Ph: 910-457-6455",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Winchester Components",
          lat: 39.141982,
          lng: -78.134509,
          description: "296 Arbor CT, Winchester, 22602 </br>Ph: 540-665-0078",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Winchester Lumber",
          lat: 39.208654,
          lng: -78.150699,
          description:
            "1182 Martinsburg Pike, Winchester, 22603 </br>Ph: 540-667-4770",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Clayton Lumber",
          lat: 35.613239,
          lng: -78.40962,
          description:
            "140 North Tech Dr., Clayton, 27520 </br>Ph: 919-772-2835",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Clayton Gypsum",
          lat: 35.613239,
          lng: -78.40962,
          description:
            "140 North Tech Dr., Clayton, 27520 </br>Ph: 919-772-2835",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Charlottesville Gypsum",
          lat: 38.153563,
          lng: -78.420908,
          description:
            "4257 Seminole Trail (Unit 110), Charlottesville, 22911 </br>Ph: 434-964-1192",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Charlottesville Lumber",
          lat: 38.004076,
          lng: -78.499153,
          description:
            "1200 Stoney Ridge Rd, Charlottesville, 22902 </br>Ph: 434-973-5356",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Raleigh Lumber",
          lat: 35.808974,
          lng: -78.601506,
          description: "2512 Yonkers RD, Raleigh, 27604 </br>Ph: 919-833-3639",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Coastal Carolina Truss",
          lat: 34.05628,
          lng: -78.8903,
          description:
            "150 Santee Cooper Lane, Loris, 29569 </br>Ph: 843-756-6400",
          color: "#006838",
          type: "triangle",
          border_color: "#006838",
          size: 8
        },
        {
          name: "Fayetteville Millwork",
          lat: 35.005507,
          lng: -78.897322,
          description:
            "125 Ivan Dr., Fayetteville, 28306 </br>Ph: 910-307-0339",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Fayetteville Yard",
          lat: 35.03979,
          lng: -78.90448,
          description:
            "1135 Robeson Street, Fayetteville, 28305 </br>Ph: 910-485-1111",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Apex Yard",
          lat: 35.73738,
          lng: -78.96006,
          description: "23 Red Cedar Way, Apex, 27523 </br>Ph: 919-363-4956",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Conway Yard",
          lat: 33.79923,
          lng: -78.98841,
          description:
            "651 Century Circle, Conway, 29526 </br>Ph: 843-347-7866",
          color: "#006838",
          type: "triangle",
          border_color: "#006838",
          size: 8
        },
        {
          name: "Verona Lumber",
          lat: 38.201144,
          lng: -79.007163,
          description:
            "51 Laurel Hill Rd (PO Box 879), Verona, 24482 </br>Ph: 540-248-0301",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Hillsborough Yard",
          lat: 36.06039,
          lng: -79.09102,
          description:
            "401 Valley Forge Road, Hillsborough, 27278 </br>Ph: 919-644-1231",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Pawleys Island Yard",
          lat: 33.44745,
          lng: -79.12162,
          description:
            "226 Tiller Drive, Pawleys Island, 29585 </br>Ph: 843-237-0333",
          color: "#006838",
          type: "triangle",
          border_color: "#006838",
          size: 8
        },
        {
          name: "Lynchburg Lumber",
          lat: 37.333813,
          lng: -79.242413,
          description:
            "21020 Timberlake Rd, Lynchburg, 24502 </br>Ph: 434-239-3402",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Aberdeen Yard",
          lat: 35.124796,
          lng: -79.439707,
          description:
            "3189 NC Highway 5, Aberdeen, 28315 </br>Ph: 910-944-2516",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Florence Yard",
          lat: 34.22749,
          lng: -79.79667,
          description:
            "1724 West Lucas Street, Florence, 29501 </br>Ph: 843-669-5101",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Greensboro Gypsum",
          lat: 36.057538,
          lng: -79.833337,
          description:
            "300 N. Chimney Rock Rd., Greensboro, 27409 </br>Ph: 336-834-0540",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Greensboro Yard",
          lat: 36.0855568,
          lng: -79.9413933,
          description:
            "7601 Boeing Drive, Greensboro, 27409 </br>Ph: 336-884-5454",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Roanoke Lumber",
          lat: 37.267246,
          lng: -80.003996,
          description:
            "3488 Aerial Way Drive SW, Roanoke, 24018 </br>Ph: 540-982-5803",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Charleston Yard",
          lat: 32.8679,
          lng: -80.00901,
          description:
            "4451 Arco Lane, N Charleston, 29418 </br>Ph: 843-554-8280",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Johns Island Yard",
          lat: 32.73224,
          lng: -80.05638,
          description:
            "3155 Maybank Hwy., Johns Island, 29455 </br>Ph: 843-559-4190",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "West Palm Beach Yard",
          lat: 26.78298,
          lng: -80.09346,
          description:
            "3661 Blue Heron Boulevard, Riviera Beach, 33404 </br>Ph: 561-793-1810",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Albemarle Components",
          lat: 35.340141,
          lng: -80.16662,
          description:
            "2100 Sterling Dr, Albemarle, 28001 </br>Ph: 704-983-6748",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Summerville Yard",
          lat: 33.051228,
          lng: -80.210157,
          description:
            "257 Deming Way, Summerville, 29483 </br>Ph: 843-419-1440",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Summerville Gypsum",
          lat: 33.051154,
          lng: -80.211639,
          description:
            "257 Deming Way, Summerville, 29483 </br>Ph: 843-419-1440",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Edisto Island Yard",
          lat: 32.55035,
          lng: -80.29714,
          description:
            "796 Highway 174 / PO Box 99, Edisto Island, 29438 </br>Ph: 843-869-2160",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Sumter Components",
          lat: 33.9168,
          lng: -80.31842,
          description:
            "114 Myrtle Beach Hwy, Sumter, 29153 </br>Ph: 803-778-1921",
          color: "#006838",
          type: "triangle",
          border_color: "#006838",
          size: 8
        },
        {
          name: "Treasure Coast Components",
          lat: 27.443019,
          lng: -80.401091,
          description:
            "701 S Kings Hwy, Fort Pierce, 34945 </br>Ph: 772-461-5475",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Palm Bay Yard",
          lat: 28.040168,
          lng: -80.621864,
          description:
            "4550 Babcock St NE, Palm Bay, 32905 </br>Ph: 321-676-6196",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Harrisburg Yard",
          lat: 35.3116,
          lng: -80.67486,
          description:
            "7770 Caldwell Road, Harrisburg, 28075 </br>Ph: 704-455-6444",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Cherry Point Yard",
          lat: 32.30132,
          lng: -80.93506,
          description:
            "2651 North Okatie Highway, Ridgeland, 29936 </br>Ph: 843-987-0810",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Charlotte Millwork",
          lat: 35.120207,
          lng: -80.94321,
          description:
            "3135 Nevada Blvd, Charlotte, 28273 </br>Ph: 704-588-5100",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Charlotte Lumber",
          lat: 35.120207,
          lng: -80.94321,
          description:
            "3135 Nevada Blvd, Charlotte, 28273 </br>Ph: 704-588-5100",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Charlotte Gypsum",
          lat: 35.118435,
          lng: -80.947779,
          description:
            "13050 General Dr, Charlotte, 28273 </br>Ph: 704-504-3404",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Columbia Yard",
          lat: 34.17024,
          lng: -80.94949,
          description:
            "180 Hobart Road, Blythewood, 29016 </br>Ph: 803-735-3500",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Savannah Components",
          lat: 32.097283,
          lng: -81.233183,
          description: "6 AJ Garcia Rd, Pooler, 31322 </br>Ph: 912-330-9991",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Pooler Lumber",
          lat: 32.097283,
          lng: -81.233183,
          description: "6 AJ Garcia Rd, Pooler, 31322 </br>Ph: 912-330-9991",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Bunnell Yard",
          lat: 29.47861,
          lng: -81.26719,
          description:
            "1700 N State Street, Bunnell, 32110 </br>Ph: 386-437-5252",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Sanford Millwork",
          lat: 28.823011,
          lng: -81.316986,
          description: "3874 Church St, Sanford, 32771 </br>Ph: 407-323-6990",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Sanford Lumber",
          lat: 28.82301,
          lng: -81.317788,
          description: "3874 Church St, Sanford, 32771 </br>Ph: 407-323-6990",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Orlando Yard",
          lat: 28.4022,
          lng: -81.37823,
          description:
            "11501 Ryland Court, Orlando, 32824 </br>Ph: 407-851-2100",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Charleston Lumber",
          lat: 38.370245,
          lng: -81.665723,
          description:
            "500 Patrick St, Charleston, 25387 </br>Ph: 304-343-9576",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Jacksonville Yard",
          lat: 30.230554,
          lng: -81.699168,
          description:
            "6550 Roosevelt Blvd, Jacksonville, 32244 </br>Ph: 904-772-6100",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Jacksonville Truss",
          lat: 30.230554,
          lng: -81.699168,
          description:
            "6550 Roosevelt Blvd, Jacksonville, 32244 </br>Ph: 904-772-6100",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Jacksonville Millwork",
          lat: 30.381645,
          lng: -81.784116,
          description:
            "8275 Forshee Drive, Jacksonville, 32219 </br>Ph: 904-764-5506",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Groveland Yard",
          lat: 28.640811,
          lng: -81.812288,
          description:
            "8601 Justice Place, Groveland, 34736 </br>Ph: 352-429-0395",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Cowpens Truss",
          lat: 35.04504,
          lng: -81.82031,
          description:
            "151 Dewberry Road, Cowpens, 29330 </br>Ph: 864-463-1631",
          color: "#006838",
          type: "triangle",
          border_color: "#006838",
          size: 8
        },
        {
          name: "Millwood Millwork",
          lat: 38.905334,
          lng: -81.833043,
          description:
            "158 Jack Burlingame Rd. , Millwood, 25262 </br>Ph: 888-246-5115",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Lady Lake Components",
          lat: 28.92793,
          lng: -81.935531,
          description:
            "712 Duck Lake Rd (PO Box 895259), Lady Lake, 32159 </br>Ph: 352-259-1768",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Spartanburg Gypsum & Roofing",
          lat: 34.955522,
          lng: -81.940226,
          description:
            "8035 Howard Street, Spartanburg, 29303 </br>Ph: 864-503-9501",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Spartanburg Lumber",
          lat: 34.99627,
          lng: -81.984061,
          description:
            "259 Access Rd (PO Box 8037), Spartanburg, 29305 </br>Ph: 864-503-9500",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Punta Gorda Lumber",
          lat: 26.875741,
          lng: -82.005852,
          description:
            "6850 Taylor Rd, Punta Gorda, 33950 </br>Ph: 941-575-2250",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Punta Gorda Components",
          lat: 26.875741,
          lng: -82.005852,
          description:
            "6850 Taylor Rd, Punta Gorda, 33950 </br>Ph: 941-575-2250",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Tampa Yard",
          lat: 27.99771,
          lng: -82.16135,
          description:
            "1602 Industrial Park Drive, Plant City, 33566 </br>Ph: 813-759-5922",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Plant City Components",
          lat: 28.003472,
          lng: -82.165468,
          description:
            "4408 Airport Rd, Plant City, 33567 </br>Ph: 813-305-1300",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Bristol Yard",
          lat: 36.59522,
          lng: -82.18929,
          description: "941 W State St, Bristol, 24201 </br>Ph: 276-466-8500",
          color: "#F900FE",
          type: "circle",
          border_color: "#F900FE"
        },
        {
          name: "Piney Flats Millwork",
          lat: 36.42535,
          lng: -82.31368,
          description:
            "260 Piney Flats Road, Piney Flats, 37686 </br>Ph: 423-538-8102",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Piney Flats Truss",
          lat: 36.42535,
          lng: -82.31368,
          description:
            "260 Piney Flats Road, Piney Flats, 37686 </br>Ph: 423-538-8102",
          color: "#006838",
          type: "triangle",
          border_color: "#006838",
          size: 8
        },
        {
          name: "Johnson City Yard",
          lat: 36.3174,
          lng: -82.34588,
          description:
            "407 E. State of Franklin Road, Johnson City, 37601 </br>Ph: 423-929-3186",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Tampa Millwork",
          lat: 27.980498,
          lng: -82.351963,
          description:
            "9009 E Dr. Martin Luther King Jr. Blvd., Tampa, 33610 </br>Ph: 813-769-1080",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Greenville Millwork",
          lat: 34.78602,
          lng: -82.40488,
          description:
            "108 White Horse Court, Greenville, 29605 </br>Ph: 864-236-9330",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Brooksville Lumber",
          lat: 28.553812,
          lng: -82.405466,
          description:
            "940 W. Jefferson St, Brooksville, 34601 </br>Ph: 352-796-7232",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Greenville Yard",
          lat: 34.82072,
          lng: -82.42838,
          description:
            "801 S. Washington Avenue, Greenville, 29611 </br>Ph: 864-269-8110",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Hendersonville Yard",
          lat: 35.31765,
          lng: -82.45552,
          description:
            "433 4th Avenue East, Hendersonville, 28793 </br>Ph: 828-693-1792",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Hendersonville Lumber",
          lat: 35.343902,
          lng: -82.473906,
          description:
            "2324 Asheville Hwy, Hendersonville, 28791 </br>Ph: 828-694-0665",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Hendersonville Gypsum",
          lat: 35.343902,
          lng: -82.473906,
          description:
            "2324 Asheville Hwy, Hendersonville, 28791 </br>Ph: 828-694-0665",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Gray Yard",
          lat: 36.399506,
          lng: -82.483903,
          description:
            "691 Suncrest Dr, Johnson City, 37615 </br>Ph: 423-477-1433",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Bradenton Lumber",
          lat: 27.493786,
          lng: -82.558596,
          description: "516 6th Ave E, Bradenton, 34208 </br>Ph: 941-746-2161",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Asheville Yard",
          lat: 35.57756,
          lng: -82.57791,
          description:
            "332 Haywood Road, Asheville, 28806 </br>Ph: 828-252-2481",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Mansfield Lumber",
          lat: 40.765377,
          lng: -82.595752,
          description: "2275 Stumbo Rd, Mansfield, 44906 </br>Ph: 419-529-5411",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Lake City Truss",
          lat: 30.18768,
          lng: -82.597056,
          description:
            "2525 East Duval Street, Lake City, 32055 </br>Ph: 386-755-6894",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Kingsport Yard",
          lat: 36.5422,
          lng: -82.66164,
          description:
            "230 West Main St., Mt. Carmel, 37645 </br>Ph: 423-357-4331",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Anderson Yard",
          lat: 34.53308,
          lng: -82.69629,
          description:
            "1510 Pearman Dairy Road, Anderson, 29625 </br>Ph: 864-226-7651",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Brevard Yard",
          lat: 35.25461,
          lng: -82.70056,
          description: "1242 Ecusta Road, Brevard, 28712 </br>Ph: 828-884-2166",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Largo (Hwy 19 North) Lumber",
          lat: 27.897061,
          lng: -82.725355,
          description:
            "13750 US Highway 19 N, Clearwater, 33764 </br>Ph: 727-535-6435",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Seneca Yard",
          lat: 34.71176,
          lng: -82.89206,
          description: "101 Lumber Lane, Seneca, 29672 </br>Ph: 864-888-2807",
          color: "#F9931E",
          type: "circle",
          border_color: "#F9931E"
        },
        {
          name: "Bad Axe Lumber",
          lat: 43.803793,
          lng: -82.938606,
          description:
            "2060 Sand Beach Rd, Bad Axe, 48413 </br>Ph: 989-269-2060",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Delaware Lumber",
          lat: 40.280852,
          lng: -83.087719,
          description: "130 Johnson Dr, Delaware, 43015 </br>Ph: 740-549-0465",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Delaware Components",
          lat: 40.280852,
          lng: -83.087719,
          description: "130 Johnson Dr, Delaware, 43015 </br>Ph: 740-549-0465",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Caro Lumber",
          lat: 43.464778,
          lng: -83.427876,
          description: "2061 W Caro Rd, Caro, 48723 </br>Ph: 989-673-3121",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Alpena Lumber",
          lat: 45.061379,
          lng: -83.480396,
          description:
            "1441 M-32 West Route 6, Alpena, 49707 </br>Ph: 989-356-2106",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Macon Lumber",
          lat: 32.814821,
          lng: -83.671282,
          description:
            "1641 Eisenhower Pkwy, Macon, 31206 </br>Ph: 478-781-9540",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Gainesville Yard",
          lat: 34.27459,
          lng: -83.8209,
          description:
            "1285 W. Ridge Road, Gainesville, 30501 </br>Ph: 770-536-1237",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Blairsville Yard",
          lat: 34.8753,
          lng: -83.95798,
          description:
            "57 Cleveland Street, Blairsville, 30512 </br>Ph: 706-745-2032",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Saginaw Lumber",
          lat: 43.48551,
          lng: -84.092279,
          description: "5340 Midland Rd, Saginaw, 48603 </br>Ph: 989-695-5393",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Knoxville West Yard",
          lat: 35.9660041,
          lng: -84.1353273,
          description:
            "10101 Caneel Drive, Knoxville, 37931 </br>Ph: 865-971-3579",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Duluth Multi-Family Sales",
          lat: 33.983697,
          lng: -84.158357,
          description:
            "3165 Pleasant Hill Rd, Duluth, 30096 </br>Ph: 678-417-2280",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Duluth Lumber",
          lat: 33.983697,
          lng: -84.158357,
          description:
            "3165 Pleasant Hill Rd, Duluth, 30096 </br>Ph: 678-417-2280",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Norcross Components",
          lat: 33.977766,
          lng: -84.169599,
          description:
            "4094 Blue Ridge Ind Pkwy NW, Norcross, 30071 </br>Ph: 770-813-2200",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Dayton Lumber",
          lat: 39.911776,
          lng: -84.198118,
          description:
            "4173 Old Springfield Rd, Vandalia, 45377 </br>Ph: 937-898-1358",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Atlanta Yard",
          lat: 33.91477,
          lng: -84.24122,
          description: "6870 Mimms Drive, Atlanta, 30340 </br>Ph: 770-613-0002",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Tallahassee Lumber",
          lat: 30.454124,
          lng: -84.345123,
          description:
            "1369 Blountstown Hwy, Tallahassee, 32304 </br>Ph: 850-576-5177",
          color: "#67318E",
          type: "circle",
          border_color: "#67318E"
        },
        {
          name: "Atlanta Millwork",
          lat: 33.566966,
          lng: -84.354615,
          description: "1100 Commerce Rd, Morrow, 30260 </br>Ph: 678-422-5599",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Cincinnati Lumber",
          lat: 39.306209,
          lng: -84.465361,
          description:
            "10059 Princeton Glendale, Cincinnati, 45246 </br>Ph: 513-874-9950",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "St. Helen Lumber",
          lat: 44.305378,
          lng: -84.490329,
          description:
            "6045 E West Branch Rd, St. Helen, 48656 </br>Ph: 989-389-4935",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Lexington Lumber",
          lat: 38.075312,
          lng: -84.516298,
          description: "1551 Mercer Rd, Lexington, 40577 </br>Ph: 859-233-4878",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Rudyard Lumber",
          lat: 46.234135,
          lng: -84.593433,
          description:
            "11020 W Kipling Dr, Rudyard, 49780 </br>Ph: 906-478-6221",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Kennesaw Lumber",
          lat: 34.017337,
          lng: -84.613462,
          description: "2600 Summers St, Kennesaw, 30144 </br>Ph: 770-428-2604",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Kennesaw Gypsum",
          lat: 34.017337,
          lng: -84.613462,
          description: "2600 Summers St, Kennesaw, 30144 </br>Ph: 770-659-6063",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Gaylord Lumber",
          lat: 45.04266,
          lng: -84.674978,
          description: "1054 Old US 27 N, Gaylord, 49734 </br>Ph: 989-732-5136",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Alma Lumber",
          lat: 43.408104,
          lng: -84.679626,
          description: "3680 W Monroe Road, Alma, 48801 </br>Ph: 989-463-4936",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Mt Pleasant DC",
          lat: 43.611846,
          lng: -84.705678,
          description:
            "7105 E Pickard Rd, Mt Pleasant, 48858 </br>Ph: 989-772-0276",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Petoskey Lumber",
          lat: 45.389187,
          lng: -84.913203,
          description: "1282 US 31 N, Petoskey, 49770 </br>Ph: 231-347-8785",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Villa Rica Components",
          lat: 33.739647,
          lng: -84.931216,
          description:
            "100 East Industrial Court, Villa Rica, 30180 </br>Ph: 678-785-3915",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Morrow Lumber",
          lat: 33.741685,
          lng: -84.935762,
          description: "1100 Commerce Rd, Morrow, 30260 </br>Ph: 678-422-5599",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Columbus Yard",
          lat: 32.52409,
          lng: -84.96475,
          description:
            "5515 Veterans Parkway, Columbus, 31904 </br>Ph: 706-324-4401",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "LaGrange Yard",
          lat: 33.05163,
          lng: -84.98467,
          description: "195 Davis Road, LaGrange, 30240 </br>Ph: 706-882-1428",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Huntertown Lumber",
          lat: 41.20083,
          lng: -85.170896,
          description: "12727 Lima Rd, Fort Wayne, 46818 </br>Ph: 260-637-3191",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Chattanooga Lumber",
          lat: 35.025152,
          lng: -85.193771,
          description: "6006 Lee Hwy, Chattanooga, 37421 </br>Ph: 423-892-2444",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Shelbyville Lumber",
          lat: 38.19957,
          lng: -85.266451,
          description:
            "1051 Taylorsville Rd, Shelbyville, 40065 </br>Ph: 502-633-3832",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Cadillac Lumber",
          lat: 44.278194,
          lng: -85.406804,
          description:
            "2201 North Mitchell, Cadillac, 49601 </br>Ph: 231-775-3453",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Auburn Yard",
          lat: 32.608769,
          lng: -85.44497,
          description:
            "1865 East Glenn Ave, Auburn, 36830 </br>Ph: 334-502-3991",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Cookeville Lumber",
          lat: 36.125346,
          lng: -85.474966,
          description:
            "1848 Browns Mill Rd, Cookeville, 38506 </br>Ph: 931-372-1320",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Kalamazoo Lumber",
          lat: 42.193611,
          lng: -85.597532,
          description: "8357 Shaver Rd, Portage, 49024 </br>Ph: 269-327-3909",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Traverse City Lumber",
          lat: 44.66504,
          lng: -85.690566,
          description: "5700 US Hwy 31 S, Grawn, 49637 </br>Ph: 231-943-7000",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Panama City Lumber",
          lat: 30.244,
          lng: -85.908,
          description:
            "17446 Panama City Beach Pkwy, Panama City Beach, 32413 </br>Ph: 850-235-1085",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Fremont Lumber",
          lat: 43.466818,
          lng: -86.039227,
          description:
            "11850 N Maple Island Rd, Fremont, 49412 </br>Ph: 231-924-3250",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Freeport Yard",
          lat: 30.48404,
          lng: -86.12487,
          description:
            "16664 US Hwy 331 South, Freeport, 32439 </br>Ph: 850-835-1711",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Indianapolis Millwork",
          lat: 39.766672,
          lng: -86.191335,
          description:
            "1717 W Washington St, Indianapolis, 46222 </br>Ph: 317-639-5431",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Indianapolis Lumber",
          lat: 39.766672,
          lng: -86.191335,
          description:
            "1717 W Washington St, Indianapolis, 46222 </br>Ph: 317-639-5431",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Nashville Yard",
          lat: 36.20811,
          lng: -86.2911,
          description:
            "300 Pryor Creek Road, Lebanon, 37090 </br>Ph: 615-453-5332",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Bowling Green Truss",
          lat: 37.02295,
          lng: -86.346838,
          description:
            "120 Kelly Court, Bowling Green, 42101 </br>Ph: 270-938-6535",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Mooresville Components",
          lat: 39.558322,
          lng: -86.379658,
          description:
            "9028 North Old S.R. 67, Mooresville, 46158 </br>Ph: 317-834-5380",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Nashville Truss",
          lat: 36.19087,
          lng: -86.41673,
          description:
            "6010 E. Division Street, Lebanon, 37090 </br>Ph: 615 453-5332",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Shelby Components",
          lat: 33.11175,
          lng: -86.59182,
          description:
            "252 County Rd 308 W, Shelby, 35143 </br>Ph: 205-669-4188",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Chelsea Yard",
          lat: 33.34011,
          lng: -86.63026,
          description: "315 Hwy 433, Chelsea, 35043 </br>Ph: 205-678-0411",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Nashville Gypsum & Roofing",
          lat: 36.150747,
          lng: -86.707762,
          description:
            "712 Massman Drive, Nashville, 37210 </br>Ph: 615.994.3727",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Pelham Lumber",
          lat: 33.28939,
          lng: -86.814727,
          description: "3160 Lee St, Pelham, 35124 </br>Ph: 205-664-2511",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Franklin Lumber",
          lat: 35.925994,
          lng: -86.858153,
          description: "300 Eddy Ln, Franklin, 37064 </br>Ph: 615-814-3160",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Milton Components",
          lat: 30.638698,
          lng: -86.973351,
          description:
            "5690 East Milton Road, Milton, 32583 </br>Ph: 850-626-9620",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Pensacola Millwork",
          lat: 30.523277,
          lng: -87.197645,
          description:
            "8809 Paul Starr Drive, Pensacola, 32514 </br>Ph: 850-432-1421",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D",
          size: 10
        },
        {
          name: "Pensacola Lumber",
          lat: 30.405809,
          lng: -87.234407,
          description: "1500 W Main St, Pensacola, 32502 </br>Ph: 850-432-1421",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Terre Haute Lumber",
          lat: 39.433651,
          lng: -87.42465,
          description:
            "555 W Margaret Ave, Terre Haute, 47802 </br>Ph: 812-232-1107",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Hopkinsville Lumber",
          lat: 36.868976,
          lng: -87.501604,
          description:
            "385 North Dr, Hopkinsville, 42240 </br>Ph: 270-886-0117",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "De Pere Lumber",
          lat: 44.460454,
          lng: -88.099853,
          description: "3400 S Ridge Rd, De Pere, 54115 </br>Ph: 920-983-4200",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "De Pere Components",
          lat: 44.460454,
          lng: -88.099853,
          description: "3400 S Ridge Rd, De Pere, 54115 </br>Ph: 920-347-3900",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Tolono Lumber",
          lat: 39.959374,
          lng: -88.266471,
          description: "Route 45 South, Tolono, 61880 </br>Ph: 217-485-6913",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Lomira Lumber",
          lat: 43.616354,
          lng: -88.442227,
          description: "W964 Hwy 49, Lomira, 53048 </br>Ph: 920-269-4336",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Greenville Lumber",
          lat: 44.307708,
          lng: -88.548899,
          description:
            "N1824 Greenville Dr, Greenville, 54942 </br>Ph: 920-757-5433",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Fort Atkinson Lumber",
          lat: 42.909651,
          lng: -88.851107,
          description:
            "1400 Janesville Ave, Fort Atkinson, 53538 </br>Ph: 920-563-8434",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Hattiesburg Lumber",
          lat: 31.312963,
          lng: -89.408344,
          description:
            "74 Liberty Place, Hattiesburg, 39402 </br>Ph: 601-261-1030",
          color: "#D6C19D",
          type: "circle",
          border_color: "#D6C19D"
        },
        {
          name: "Middleton Lumber",
          lat: 43.089038,
          lng: -89.536284,
          description:
            "1987 Pleasant View Rd, Middleton, 53562 </br>Ph: 608-836-1941",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Breese Lumber",
          lat: 38.611283,
          lng: -89.551086,
          description:
            "8120 Old Us Hwy 50, Breese, 62230 </br>Ph: 618-526-7218",
          color: "#0000FE",
          type: "circle",
          border_color: "#0000FE"
        },
        {
          name: "Monroe Lumber",
          lat: 42.70239,
          lng: -89.662082,
          description:
            "W5395 County Hwy DR, Monroe, 53566 </br>Ph: 608-325-9101",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Wausau Lumber",
          lat: 44.953851,
          lng: -89.665616,
          description: "801 S 24Th Ave, Wausau, 54401 </br>Ph: 715-842-2001",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Minocqua Lumber",
          lat: 45.825345,
          lng: -89.721114,
          description:
            "7450 Hwy 51 South, Minocqua, 54548 </br>Ph: 715-356-9406",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Platteville Lumber",
          lat: 42.730586,
          lng: -90.455979,
          description:
            "100 Eastside Rd, Platteville, 53818 </br>Ph: 608-348-9751",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Davenport Lumber",
          lat: 41.587557,
          lng: -90.570567,
          description:
            "6727 N Brady St, Davenport, 52806 </br>Ph: 563-391-3003",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Greenwood Lumber",
          lat: 44.761634,
          lng: -90.598274,
          description: "517 S Main St, Greenwood, 54437 </br>Ph: 715-267-6135",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Dubuque Lumber",
          lat: 42.537361,
          lng: -90.690351,
          description: "10581 Rt 52 N, Dubuque, 52001 </br>Ph: 563-588-0573",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Elkader Lumber",
          lat: 42.876733,
          lng: -91.382365,
          description: "24411 Hwy 13 N, Elkader, 52043 </br>Ph: 563-245-2515",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Eau Claire Lumber",
          lat: 44.861697,
          lng: -91.457876,
          description:
            "3701 N Hastings Way, Eau Claire, 54703 </br>Ph: 715-834-5351",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Waukon Lumber",
          lat: 43.240583,
          lng: -91.574667,
          description: "219 Hwy 9 SW, Waukon, 52172 </br>Ph: 563-568-3459",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Walker Lumber",
          lat: 42.284223,
          lng: -91.788483,
          description:
            "4369 Spencer Grove, Walker, 52352 </br>Ph: 319-448-4323",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Menomonie Lumber",
          lat: 44.902756,
          lng: -91.927468,
          description: "421 Oak Ave, Menomonie, 54751 </br>Ph: 715-235-3491",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "New Hampton Components",
          lat: 43.066729,
          lng: -92.325722,
          description:
            "714 W Milwaukee, New Hampton, 50659 </br>Ph: 641-394-5718",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Waterloo Lumber",
          lat: 42.469161,
          lng: -92.397229,
          description:
            "2015 W Ridgeway Ave, Waterloo, 50701 </br>Ph: 319-232-7116",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "New Richmond Lumber",
          lat: 45.128143,
          lng: -92.537464,
          description:
            "606 N Knowles Ave, New Richmond, 54017 </br>Ph: 715-246-6143",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Mason City Lumber",
          lat: 43.15375,
          lng: -93.208885,
          description: "516 2nd NW, Mason City, 50401 </br>Ph: 641-424-4952",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Lakeville Lumber",
          lat: 44.655817,
          lng: -93.250919,
          description:
            "9130 W 202nd St, Lakeville, 55044 </br>Ph: 952-469-2116",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Iowa Falls Lumber",
          lat: 42.515779,
          lng: -93.262659,
          description: "220 S Oak, Iowa Falls, 50126 </br>Ph: 641-648-2547",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Twin Cities Millwork",
          lat: 44.637774,
          lng: -93.293948,
          description:
            "11356 215th St West, Lakeville, 55044 </br>Ph: 952-469-3466",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Waseca Lumber",
          lat: 44.076634,
          lng: -93.507702,
          description: "206 S State St, Waseca, 56093 </br>Ph: 507-835-1830",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Oak Grove Lumber",
          lat: 45.445845,
          lng: -93.584089,
          description:
            "19361 Tamarack St. NW, Oak Grove, 55011 </br>Ph: 763-856-2355",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Boone Lumber",
          lat: 42.065689,
          lng: -93.879541,
          description: "924 10th St, Boone, 50036 </br>Ph: 515-432-6400",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Mankato Lumber",
          lat: 44.148214,
          lng: -94.105561,
          description: "1631 Stadium Rd., Mankato, 56001 </br>Ph: 507-387-5608",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "St. Cloud Lumber",
          lat: 45.522515,
          lng: -94.161986,
          description:
            "2915 Roosevelt Rd., St. Cloud, 56301 </br>Ph: 320-251-0861",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Cokato Lumber",
          lat: 45.078261,
          lng: -94.190178,
          description:
            "170 Broadway Ave S, Cokato, 55321 </br>Ph: 320-286-2023",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Brainerd Lumber",
          lat: 46.354606,
          lng: -94.197487,
          description: "401 S 8th St, Brainerd, 56401 </br>Ph: 218-829-2891",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Algona Lumber",
          lat: 43.067772,
          lng: -94.226724,
          description: "219 S Phillips St, Algona, 50511 </br>Ph: 515-295-7761",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Pequot Lakes Lumber",
          lat: 46.604811,
          lng: -94.313542,
          description:
            "4326 E Sibley St, Pequot Lakes, 56472 </br>Ph: 218-568-4040",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Little Falls Lumber",
          lat: 45.976784,
          lng: -94.355933,
          description:
            "200 NE 5th St, Little Falls, 56345 </br>Ph: 320-632-9209",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Lees Summit Lumber",
          lat: 38.9019,
          lng: -94.371576,
          description:
            "103 SE Oldham Pkwy, Lees Summit, 64081 </br>Ph: 816-246-5373",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Grandview Millwork",
          lat: 38.907741,
          lng: -94.529086,
          description:
            "1227 E 119th St., Grandview, 64030 </br>Ph: 816-765-4080",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Bemidji Lumber",
          lat: 47.493418,
          lng: -94.902033,
          description:
            "1635 Paul Bunyan Dr Nw, Bemidji, 56601 </br>Ph: 218-751-4896",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Wadena Components",
          lat: 46.45099,
          lng: -95.125256,
          description:
            "1100 Jefferson St. N, Wadena, 56482 </br>Ph: 218-631-2607",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Osakis Lumber",
          lat: 45.869066,
          lng: -95.150258,
          description:
            "105 East First Ave, Osakis, 56360 </br>Ph: 320-859-2814",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Storm Lake Lumber",
          lat: 42.645674,
          lng: -95.18929,
          description:
            "206 Salebarn Rd, Storm Lake, 50588 </br>Ph: 712-732-4538",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Manvel Lumber",
          lat: 29.460249,
          lng: -95.335859,
          description: "21520 E Hwy 6, Manvel, 77578 </br>Ph: 281-489-5200",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Conroe Lumber",
          lat: 30.2281,
          lng: -95.45744,
          description: "15543 I-45 South, Conroe, 77385 </br>Ph: 936-321-6800",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Houston Windows",
          lat: 29.847934,
          lng: -95.570068,
          description: "5525 Brittmoore, Houston, 77041 </br>Ph: 713-849-2110",
          color: "#006838",
          type: "triangle",
          border_color: "#006838",
          size: 8
        },
        {
          name: "Houston Millwork",
          lat: 29.876656,
          lng: -95.572809,
          description:
            "16245 Port Northwest Drive, Suite 100, Houston, 77041 </br>Ph: 832-243-9100",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Montevideo Lumber",
          lat: 44.948197,
          lng: -95.732736,
          description:
            "412 Canton Ave, Montevideo, 56265 </br>Ph: 320-269-5552",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Detroit Lakes Lumber",
          lat: 46.812627,
          lng: -95.82907,
          description:
            "950 Randolph Rd, Detroit Lakes, 56501 </br>Ph: 218-847-2688",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Tulsa Roofing/Gypsum",
          lat: 36.075606,
          lng: -95.841745,
          description:
            "12213 E 61St St, Broken Arrow, 74012 </br>Ph: 918-250-9766",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Tulsa Millwork",
          lat: 36.075606,
          lng: -95.841745,
          description:
            "12213 E 61St St, Broken Arrow, 74012 </br>Ph: 918-250-9766",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Tulsa Lumber",
          lat: 36.075606,
          lng: -95.841745,
          description:
            "12213 E 61st St, Broken Arrow, 74012 </br>Ph: 918-250-9766",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Katy Lumber",
          lat: 29.786043,
          lng: -95.85136,
          description: "27710 Hwy Blvd, Katy, 77494 </br>Ph: 281-391-0111",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Fergus Falls Lumber",
          lat: 46.271465,
          lng: -96.056043,
          description:
            "1315 Pebble Lake Rd, Fergus Falls, 56537 </br>Ph: 218-736-7537",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Madison MN Lumber",
          lat: 45.008688,
          lng: -96.182812,
          description: "319 1st St, Madison, 56256 </br>Ph: 320-598-7949",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Thief Riverfalls Lumber",
          lat: 48.120834,
          lng: -96.200372,
          description:
            "1301 Third St West, Thief Riverfalls, 56701 </br>Ph: 218-681-4447",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Terrell Yard",
          lat: 32.729846,
          lng: -96.273581,
          description:
            "511 East Temple Street, Terrell, 75160 </br>Ph: 469-474-2860",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "College Station Lumber",
          lat: 30.587846,
          lng: -96.290697,
          description:
            "3100 Longmire, College Station, 77845 </br>Ph: 979-693-2111",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Hawley Lumber",
          lat: 46.876602,
          lng: -96.318939,
          description: "801 Burns St, Hawley, 56549 </br>Ph: 218-483-3369",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Sioux City Lumber",
          lat: 42.493959,
          lng: -96.380771,
          description: "2210 E 4th St, Sioux City, 51101 </br>Ph: 712-255-3509",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Wheaton Lumber",
          lat: 45.80424,
          lng: -96.498211,
          description: "15 11th St S, Wheaton, 56296 </br>Ph: 320-563-8221",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Wahpeton Lumber",
          lat: 46.25968,
          lng: -96.636842,
          description:
            "7929 180th Ave SE, Wahpeton, 58075 </br>Ph: 701-642-5561",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Sherman Truss",
          lat: 33.622992,
          lng: -96.701764,
          description: "200 Cody Lane, Sherman, 75092 </br>Ph: 903-893-5329",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Brookings Lumber",
          lat: 44.311204,
          lng: -96.750832,
          description: "3200 E 6th St, Brookings, 57006 </br>Ph: 605-692-6255",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Sioux Falls Lumber",
          lat: 43.465018,
          lng: -96.787384,
          description:
            "27077 South Tallgrass Ave, Sioux Falls, 57108 </br>Ph: 605-368-2311",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Corporate Office",
          lat: 32.785504,
          lng: -96.796336,
          description:
            "Julie Ward 2001 Bryan St., Suite 1600, Dallas, 75201 </br>Ph: (214) 880-3500",
          color: "#ED174C",
          type: "star",
          border_color: "#ED174C",
          size: 10
        },
        {
          name: "Prosper Lumber",
          lat: 33.248232,
          lng: -96.798206,
          description:
            "365 West Prosper Trail, Prosper, 75078 </br>Ph: 972-346-3431",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Dallas-Fort Worth Components",
          lat: 32.961551,
          lng: -96.84662,
          description:
            "2800 Surveyor BLVD, BLDG #3, Carrollton, 75006 </br>Ph: 972-245-8531",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Fargo Showroom",
          lat: 46.826301,
          lng: -96.882128,
          description:
            "5631 36th Ave. South, Suite 200, Building A (corner of Veterans Blvd and 36th Ave S.), Fargo, 58104 </br>Ph: 701-929-2374",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Lewisville Yard",
          lat: 33.055617,
          lng: -96.999051,
          description:
            "902 North Mill Street, Lewisville, 75067 </br>Ph: 972-221-7632",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Dallas-Fort Worth Millwork",
          lat: 32.926897,
          lng: -97.017156,
          description:
            "8701 Sterling St Suite 180, Irving, 75063 </br>Ph: 972-621-2233",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Grand Prairie Millwork",
          lat: 32.77455,
          lng: -97.05496,
          description:
            "1750 Westpark Drive Suite 100, Grand Prairie, 75050 </br>Ph: 817-385-5600",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Rockport Retail",
          lat: 28.023466,
          lng: -97.059184,
          description: "301 E North St, Rockport, 78382 </br>Ph: 361-729-6831",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Arlington Millwork",
          lat: 32.76577,
          lng: -97.070111,
          description: "2230 Avenue J, Arlington, 76006 </br>Ph: 817-640-1234",
          color: "#006838",
          type: "triangle",
          border_color: "#006838",
          size: 8
        },
        {
          name: "Madison SD Lumber",
          lat: 44.00195,
          lng: -97.109843,
          description:
            "401 S Washington Ave, Madison, 57042 </br>Ph: 605-256-4529",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Wichita Lumber & Roofing",
          lat: 37.62242,
          lng: -97.337713,
          description:
            "125 West Macarthur Rd, Wichita, 67217 </br>Ph: 316-522-9334",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Ft Worth Lumber",
          lat: 32.817178,
          lng: -97.348546,
          description:
            "500 Terminal Rd, Fort Worth, 76106 </br>Ph: 817-625-1200",
          color: "#006838",
          type: "triangle",
          border_color: "#006838",
          size: 8
        },
        {
          name: "Valley Center Components",
          lat: 37.824997,
          lng: -97.372004,
          description:
            "131 W Industrial, Valley Center, 67147 </br>Ph: 316-755-3114",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Oklahoma City South Lumber",
          lat: 35.392612,
          lng: -97.423777,
          description:
            "7401 S Sooner Rd, Oklahoma City, 73135 </br>Ph: 405-321-2255",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Oklahoma City Gypsum",
          lat: 35.392612,
          lng: -97.423777,
          description:
            "7401 S Sooner Rd, Oklahoma City, 73135 </br>Ph: 405-321-2255",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Oklahoma City North Lumber",
          lat: 35.598553,
          lng: -97.513551,
          description:
            "12500 N Santa Fe, Oklahoma City, 73114 </br>Ph: 405-348-6810",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Oklahoma City Millwork",
          lat: 35.598553,
          lng: -97.513551,
          description:
            "12500 N Santa Fe, Oklahoma City, 73114 </br>Ph: 405-348-6810",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Hutto Millwork",
          lat: 30.5427351,
          lng: -97.5938529,
          description:
            "902 Tradesmens Park Loop, Hutto, 78634 </br>Ph: 512-832-8746",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Austin Millwork",
          lat: 30.581271,
          lng: -97.613233,
          description:
            "5975 County Rd 110, Round Rock, 78665 </br>Ph: 512-759-1942",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Georgetown Lumber",
          lat: 30.621924,
          lng: -97.68254,
          description:
            "300 Leander Rd, Georgetown, 78626 </br>Ph: 512-930-5050",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Buda Lumber",
          lat: 30.0579,
          lng: -97.844229,
          description: "700 Cement Plant Rd, Buda, 78610 </br>Ph: 512-295-2949",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Buda Components",
          lat: 30.0579,
          lng: -97.844229,
          description: "700 Cement Plant Rd, Buda, 78610 </br>Ph: 512-295-2401",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Rio Grande Valley Components",
          lat: 26.152863,
          lng: -97.868985,
          description:
            "302 North Mile 2-1/2 East, Mercedes, 78570 </br>Ph: 956-755-0303",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "RGV Millwork",
          lat: 26.152863,
          lng: -97.868985,
          description:
            "302 North Mile 2-1/2 East, Mercedes, 78570 </br>Ph: 956-755-0301",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Mercedes Lumber",
          lat: 26.152863,
          lng: -97.868985,
          description:
            "302 North Mile 2-1/2 East, Mercedes, 78570 </br>Ph: 956-755-0399",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Mitchell Lumber",
          lat: 43.70174,
          lng: -98.048507,
          description: "1705 W Havens, Mitchell, 57301 </br>Ph: 605-996-6523",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Mitchell Components",
          lat: 43.70174,
          lng: -98.048532,
          description: "1707 W Havens, Mitchell, 57301 </br>Ph: 605-996-0668",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Huron DC",
          lat: 44.363577,
          lng: -98.192228,
          description: "1455 3rd St SE, Huron, 57350 </br>Ph: 605-352-6770",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "San Antonio Truss",
          lat: 29.5614361,
          lng: -98.2144918,
          description: "220 East Fm 78, Cibolo, 78108 </br>Ph: 210-658-7057",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Huron Lumber",
          lat: 44.37066,
          lng: -98.222021,
          description: "445 4th St NW, Huron, 57350 </br>Ph: 605-352-9382",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Rio Grande Valley Commercial",
          lat: 26.209781,
          lng: -98.27732,
          description:
            "5020 W Bus Hwy 83, McAllen, 78501 </br>Ph: 956-686-1761",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "McAllen Lumber",
          lat: 26.209781,
          lng: -98.27732,
          description:
            "5020 W Bus Hwy 83, McAllen, 78501 </br>Ph: 956-686-1761",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Schertz Yard",
          lat: 29.613791,
          lng: -98.290758,
          description: "9901 Doerr Ln, Schertz, 78154 </br>Ph: 210-698-1959",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "San Antonio Windows",
          lat: 29.450141,
          lng: -98.42636,
          description:
            "3703 N. Pan Am Expressway, San Antonio, 78219 </br>Ph: 210-591-6109",
          color: "#006838",
          type: "triangle",
          border_color: "#006838",
          size: 8
        },
        {
          name: "Aberdeen Lumber",
          lat: 45.464282,
          lng: -98.484933,
          description: "205 1st Ave SE, Aberdeen, 57401 </br>Ph: 605-225-7700",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Jamestown Lumber",
          lat: 46.889514,
          lng: -98.719133,
          description:
            "1905 8th Ave SW, Jamestown, 58401 </br>Ph: 701-252-5921",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Devils Lake Lumber",
          lat: 48.10012,
          lng: -98.84673,
          description:
            "1315 Hwy 2 East, Devils Lake, 58301 </br>Ph: 701-662-4929",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Fredericksburg Lumber",
          lat: 30.258839,
          lng: -98.885385,
          description:
            "1119 Hwy 16 S, Fredericksburg, 78624 </br>Ph: 830-997-2106",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Pierre Lumber",
          lat: 44.361335,
          lng: -100.342061,
          description: "800 E Sioux, Pierre, 57501 </br>Ph: 605-224-5909",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Mandan Lumber",
          lat: 46.811646,
          lng: -100.839408,
          description: "1513 39th Ave SE, Mandan, 58554 </br>Ph: 701-663-9861",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Garden City Lumber",
          lat: 37.963864,
          lng: -100.855996,
          description:
            "1514-18 E Fulton St, Garden City, 67846 </br>Ph: 620-275-7411",
          color: "#00FBFE",
          type: "circle",
          border_color: "#00FBFE"
        },
        {
          name: "Dickinson Lumber",
          lat: 46.87797,
          lng: -102.775662,
          description: "646 E Villard, Dickinson, 58601 </br>Ph: 701-225-8152",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Rapid City Lumber",
          lat: 44.105383,
          lng: -103.222687,
          description: "666 Howard St, Rapid City, 57701 </br>Ph: 605-343-1115",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Hot Springs Lumber",
          lat: 43.422035,
          lng: -103.467215,
          description:
            "1045 S 6th St, Hot Springs, 57747 </br>Ph: 605-745-3300",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Williston Lumber",
          lat: 48.168833,
          lng: -103.619413,
          description:
            "401 East 26th St, Williston, 58801 </br>Ph: 701-572-7785",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Spearfish Lumber",
          lat: 44.488627,
          lng: -103.860297,
          description:
            "203 W Hudson St, Spearfish, 57783 </br>Ph: 605-642-4733",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Sidney Lumber",
          lat: 47.703663,
          lng: -104.165345,
          description: "100 14th St SE, Sidney, 59270 </br>Ph: 406-433-2012",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Colorado Springs Millwork & Windows",
          lat: 38.872995,
          lng: -104.675983,
          description:
            "2810 Capital Dr, Colorado Springs, 80939 </br>Ph: 719-638-6400",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Colorado Springs Lumber",
          lat: 38.872995,
          lng: -104.675983,
          description:
            "2810 Capital Dr, Colorado Springs, 80939 </br>Ph: 719-638-6400",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Colorado Springs Components",
          lat: 38.872995,
          lng: -104.675983,
          description:
            "2810 Capital Dr, Colorado Springs, 80939 </br>Ph: 303-485-9894",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Glendive Lumber",
          lat: 47.109152,
          lng: -104.735689,
          description: "23 Hwy 16, Glendive, 59330 </br>Ph: 406-365-3511",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Longmont Millwork",
          lat: 40.213058,
          lng: -104.972357,
          description:
            "4058 Camelot Cir, Longmont, 80504 </br>Ph: 303-485-9894",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Longmont Lumber",
          lat: 40.213058,
          lng: -104.972357,
          description:
            "4058 Camelot Cir, Longmont, 80504 </br>Ph: 303-485-9894",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Longmont Components",
          lat: 40.213058,
          lng: -104.972357,
          description:
            "4058 Camelot Cir, Longmont, 80504 </br>Ph: 303-485-9894",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Front Range Window",
          lat: 39.810815,
          lng: -104.975529,
          description:
            "6260 N. Washington St., Denver, 80216 </br>Ph: 303-248-1400",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Loveland Lumber",
          lat: 40.432103,
          lng: -104.975873,
          description:
            "6775 Sherman Street, Loveland, 80538 </br>Ph: 970-226-5110",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Littleton Millwork",
          lat: 39.547915,
          lng: -105.037221,
          description: "8037 Midway Dr, Littleton, 80125 </br>Ph: 303-791-3715",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Littleton Lumber",
          lat: 39.558469,
          lng: -105.042899,
          description:
            "8347 Blakeland Dr, Littleton, 80125 </br>Ph: 303-470-3771",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Miles City Lumber",
          lat: 46.41108,
          lng: -105.85057,
          description:
            "819 Washington, Miles City, 59301 </br>Ph: 406-232-2208",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Santa Fe Lumber",
          lat: 35.662109,
          lng: -105.99478,
          description: "1137 Siler Rd, Santa Fe, 87505 </br>Ph: 505-471-7474",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Casper Lumber",
          lat: 42.857807,
          lng: -106.259136,
          description:
            "4800 E Yellowstone, Evansville, 82636 </br>Ph: 307-237-8788",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Albuquerque Millwork",
          lat: 35.16872,
          lng: -106.59376,
          description:
            "7801 Tiburon NE, Albuquerque, 87109 </br>Ph: 505-831-6700",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Albuquerque Lumber",
          lat: 35.16872,
          lng: -106.59376,
          description:
            "7801 Tiburon NE, Albuquerque, 87109 </br>Ph: 505-823-2700",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Albuquerque Components",
          lat: 35.16872,
          lng: -106.59376,
          description:
            "7801 Tiburon NE, Albuquerque, 87109 </br>Ph: 505-823-2700",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Steamboat Springs Lumber",
          lat: 40.491291,
          lng: -106.849639,
          description:
            "1500 13th St, Steamboat Springs, 80487 </br>Ph: 970-879-0023",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Aspen Lumber",
          lat: 39.213704,
          lng: -106.86133,
          description: "38005 Hwy 82, Aspen, 81611 </br>Ph: 970-925-4262",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Basalt Millwork Showroom",
          lat: 39.385804,
          lng: -107.082579,
          description: "240 Market Street, Suite 1008, Basalt, 81621",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Glenwood Springs Lumber",
          lat: 39.469391,
          lng: -107.265696,
          description:
            "7150 Hwy 82, Glenwood Springs, 81601 </br>Ph: 970-945-5464",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Montrose Lumber",
          lat: 38.477096,
          lng: -107.879862,
          description: "16 W Main St, Montrose, 81401 </br>Ph: 970-249-9672",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Durango Lumber",
          lat: 37.251413,
          lng: -107.940548,
          description: "602 Sawmill Rd, Durango, 81302 </br>Ph: 970-259-0340",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Farmington Lumber",
          lat: 36.732106,
          lng: -108.190908,
          description:
            "1411 San Juan Blvd, Farmington, 87401 </br>Ph: 505-325-3344",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Billings Lumber",
          lat: 45.809471,
          lng: -108.472985,
          description: "542 Main St, Billings, 59105 </br>Ph: 406-252-9395",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Grand Junction Truss",
          lat: 39.062034,
          lng: -108.538574,
          description:
            "2773 Riverside Parkway, Grand Junction, 81501 </br>Ph: 970-243-4688",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Grand Junction Lumber",
          lat: 39.06291,
          lng: -108.541239,
          description:
            "2773 Riverside Pkwy, Grand Junction, 81501 </br>Ph: 970-243-4688",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Dolores Components",
          lat: 37.386424,
          lng: -108.552754,
          description:
            "27151 County Rd M, Dolores, 81323 </br>Ph: 970-565-9207",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Cortez Lumber",
          lat: 37.386608,
          lng: -108.554407,
          description: "12028 Hwy 145, Cortez, 81321 </br>Ph: 970-565-9449",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Cody Lumber",
          lat: 44.52596,
          lng: -109.050416,
          description: "1938 Sheridan Ave, Cody, 82414 </br>Ph: 307-587-2202",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Havre Lumber",
          lat: 48.551823,
          lng: -109.651937,
          description: "2225 E 1St St, Havre, 59501 </br>Ph: 406-265-5851",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Show Low Lumber",
          lat: 34.261447,
          lng: -110.025935,
          description: "1300 N 16Th St, Show Low, 85901 </br>Ph: 928-537-2907",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Great Falls Lumber",
          lat: 47.508709,
          lng: -111.342397,
          description:
            "826 Northwest Bypass (9Th St NW), Great Falls, 59404 </br>Ph: 406-761-0601",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Heber City Lumber",
          lat: 40.486183,
          lng: -111.40662,
          description: "1690 S Hwy 40, Heber City, 84032 </br>Ph: 435-657-0297",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Flagstaff Lumber",
          lat: 35.191907,
          lng: -111.636333,
          description:
            "1200 E Butler Ave, Flagstaff, 86001 </br>Ph: 928-779-3381",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Flagstaff DC & Roofing",
          lat: 35.191907,
          lng: -111.636333,
          description:
            "1200 E Butler Ave, Flagstaff, 86001 </br>Ph: 928-779-3381",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Spanish Fork Lumber Yard",
          lat: 40.1277,
          lng: -111.65423,
          description:
            "1350 N. Main Streeet, Spanish Fork, 84660 </br>Ph: 801-504-9507",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Sedona Home Center",
          lat: 34.863059,
          lng: -111.801635,
          description: "2385 W Hwy 89A, Sedona, 86339 </br>Ph: 928-282-7174",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Midvale Lumber",
          lat: 40.616421,
          lng: -111.910633,
          description: "7380 S 700 W, Midvale, 84047 </br>Ph: 801-255-4201",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Salt Lake City Components",
          lat: 40.74122,
          lng: -111.955741,
          description:
            "2560 W. California Ave, Salt Lake City, 84104 </br>Ph: 801-401-1076",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Salt Lake City Millwork",
          lat: 40.732529,
          lng: -112.00472,
          description:
            "4711 W 1730 S., Salt Lake City, 84104 </br>Ph: (801)-973-3530",
          color: "#26EFA2",
          type: "circle",
          border_color: "#26EFA2"
        },
        {
          name: "Helena Lumber",
          lat: 46.598259,
          lng: -112.023118,
          description: "1000 E Lyndale, Helena, 59601 </br>Ph: 406-442-7110",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Prescott Valley Lumber",
          lat: 34.580623,
          lng: -112.347259,
          description:
            "6601 E 2nd St, Prescott Valley, 86314 </br>Ph: 928-772-1221",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Butte DC",
          lat: 45.928556,
          lng: -112.508681,
          description:
            "113 North Parkmont St Suite A, Butte, 59701 </br>Ph: 406-494-3309",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Butte Lumber",
          lat: 45.992127,
          lng: -112.52912,
          description: "2805 Lexington Ave, Butte, 59701 </br>Ph: 406-494-7600",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Kalispell Lumber",
          lat: 48.240528,
          lng: -114.280558,
          description:
            "41 W Reserve Dr, Kalispell, 59901 </br>Ph: 406-752-9663",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Lake Havasu City Lumber",
          lat: 34.494899,
          lng: -114.347796,
          description:
            "694 N Lake Havasu Ave, Lake Havasu City, 86403 </br>Ph: 928-855-4061",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Twin Falls Lumber",
          lat: 42.650751,
          lng: -114.442233,
          description:
            "1000 Centennial Spur, Jerome, 83338 </br>Ph: 208-536-7091",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "McCall Lumber",
          lat: 44.89762,
          lng: -116.096093,
          description: "400 Deinhard LN, McCall, 83638 </br>Ph: 208-634-2234",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Boise Millwork",
          lat: 43.609919,
          lng: -116.387001,
          description:
            "7557 W Mossy Cup St., Boise, 83709 </br>Ph: 208-888-1457",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Meridian Lumber",
          lat: 43.609919,
          lng: -116.387001,
          description: "415 E Broadway, Meridian, 83642 </br>Ph: 208-888-1457",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Boise Gypsum",
          lat: 43.609919,
          lng: -116.387001,
          description: "415 E Broadway, Meridian, 83642 </br>Ph: 208-888-1457",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Post Falls Lumber",
          lat: 47.716395,
          lng: -116.894184,
          description: "N 2000 Hwy 41, Post Falls, 83854 </br>Ph: 208-773-1560",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "El Cajon Home Center",
          lat: 32.795067,
          lng: -116.93782,
          description: "1262 E Main St, El Cajon, 92021 </br>Ph: 619-440-7711",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Rancho San Diego Home Center",
          lat: 32.745955,
          lng: -116.963487,
          description:
            "3607 Avocado Blvd, La Mesa, 91941 </br>Ph: 619-670-5600",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "La Mesa Home Center",
          lat: 32.77571,
          lng: -117.016157,
          description: "8372 Center Dr, La Mesa, 91942 </br>Ph: 619-465-4242",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "South Bay Home Center",
          lat: 32.65718,
          lng: -117.090673,
          description:
            "3450 Highland Ave, National City, 91950 </br>Ph: 619-425-6660",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Escondido Home Center",
          lat: 33.119553,
          lng: -117.098966,
          description: "561 N Tulip St, Escondido, 92025 </br>Ph: 760-745-7271",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "National City Hardlines & Millwork DC",
          lat: 32.658699,
          lng: -117.11292,
          description:
            "1022 Bay Marina Dr. Suite 190, National City, 91950 </br>Ph: 619-684-4610",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "National City Lumber DC",
          lat: 32.654445,
          lng: -117.115453,
          description:
            "2470 Tidelands Ave, National City, 91950 </br>Ph: 619-477-3791",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Kearny Mesa Home Center",
          lat: 32.830518,
          lng: -117.153413,
          description: "4888 Convoy St, San Diego, 92111 </br>Ph: 858-279-5010",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Miramar Home Center",
          lat: 32.881904,
          lng: -117.156649,
          description:
            "7292 Miramar Rd, San Diego, 92121 </br>Ph: 858-695-0600",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Sports Arena Home Center",
          lat: 32.753166,
          lng: -117.208187,
          description:
            "3250 Sports Arena Blvd, San Diego, 92110 </br>Ph: 619-224-4161",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Solana Beach Home Center",
          lat: 32.99595,
          lng: -117.260449,
          description:
            "663 Lomas Santa Fe Dr, Solana Beach, 92075 </br>Ph: 858-755-0246",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Spokane Lumber",
          lat: 47.68033,
          lng: -117.266263,
          description:
            "10310 E Montgomery Ave, Spokane, 99206 </br>Ph: 509-924-2420",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Spokane Components",
          lat: 47.68033,
          lng: -117.266263,
          description:
            "10310 E Montgomery Ave, Spokane, 99206 </br>Ph: 509-924-2420",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Colton Lumber",
          lat: 34.030966,
          lng: -117.372772,
          description: "12212 Holly St, Riverside, 92509 </br>Ph: 951-786-9177",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Walla Walla Lumber",
          lat: 46.077509,
          lng: -118.309477,
          description:
            "508 Wellington Ave, Walla Walla, 99362 </br>Ph: 509-525-4000",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Kennewick Millwork",
          lat: 46.212219,
          lng: -119.173033,
          description:
            "3919 W Clearwater Ave. , Kennewick, 99336 </br>Ph: 509-783-8148",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Kennewick Lumber",
          lat: 46.212219,
          lng: -119.173033,
          description:
            "3919 W Clearwater Ave. , Kennewick, 99336 </br>Ph: 509-783-8148",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Othello Lumber",
          lat: 46.814587,
          lng: -119.174134,
          description: "1050 S 1St Ave, Othello, 99344 </br>Ph: 509-488-6601",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Shafter Lumber",
          lat: 35.501932,
          lng: -119.179498,
          description:
            "300 N American St, Shafter, 93263 </br>Ph: 661-393-3292",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Hermiston Lumber",
          lat: 45.884828,
          lng: -119.297143,
          description:
            "81054 Hwy 395 N, Hermiston, 97838 </br>Ph: 541-567-2550",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "West Richland Components",
          lat: 46.26033,
          lng: -119.348749,
          description:
            "4213 South 47Th Ave, West Richland, 99353 </br>Ph: 509-627-0288",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Wenatchee Lumber",
          lat: 47.483762,
          lng: -120.319675,
          description:
            "3628 Chelan Hwy, Wenatchee, 98801 </br>Ph: 509-662-4407",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Lakeview Lumber",
          lat: 42.193128,
          lng: -120.354519,
          description:
            "1303 North 4th St, Lakeview, 97630 </br>Ph: 541-947-4071",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Yakima Lumber",
          lat: 46.577804,
          lng: -120.484061,
          description: "1301 E Mead Ave, Yakima, 98903 </br>Ph: 509-575-1600",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Bend Lumber",
          lat: 44.083214,
          lng: -121.297108,
          description: "20545 Murray Rd, Bend, 97701 </br>Ph: 541-382-2441",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Salinas Home Center",
          lat: 36.65398,
          lng: -121.628431,
          description: "1250 Abbott St, Salinas, 93901 </br>Ph: 831-758-3367",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Soquel Home Center",
          lat: 36.984252,
          lng: -121.96495,
          description: "2435 41St Ave, Soquel, 95073 </br>Ph: 831-475-6100",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Santa Cruz Millwork Showroom",
          lat: 36.968906,
          lng: -121.970748,
          description:
            "1230 Thompson Ave, Santa Cruz, 95062 </br>Ph: 831-475-7575",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Santa Cruz Home Center",
          lat: 36.979244,
          lng: -122.02794,
          description: "235 River St, Santa Cruz, 95060 </br>Ph: 831-426-1020",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Santa Cruz Garden Center",
          lat: 36.979244,
          lng: -122.02794,
          description: "235 River St, Santa Cruz, 95060 </br>Ph: 831-423-0223",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Felton Home Center",
          lat: 37.047963,
          lng: -122.064376,
          description:
            "5843 Graham Hill Rd, Felton, 95018 </br>Ph: 831-335-4423",
          color: "#F95858",
          type: "circle",
          border_color: "#F95858"
        },
        {
          name: "Arlington Lumber",
          lat: 48.18386,
          lng: -122.137003,
          description:
            "20815 67th Ave NE, Arlington, 98223 </br>Ph: 360-925-4100",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Arlington Components",
          lat: 48.18386,
          lng: -122.137003,
          description:
            "20815 67th Ave NE, Arlington, 98223 </br>Ph: 360-925-4155",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Graham Lumber",
          lat: 47.06802,
          lng: -122.294881,
          description:
            "20810 Meridian Ave E, Graham, 98338 </br>Ph: 253-847-2900",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Fife Lumber",
          lat: 47.239086,
          lng: -122.355369,
          description: "5519 20th St E, Tacoma, 98424 </br>Ph: 253-922-8779",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Spanaway Lumber",
          lat: 47.06794,
          lng: -122.413286,
          description: "1331 208th St E, Spanaway, 98387 </br>Ph: 253-846-3005",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Tacoma LCW DC",
          lat: 47.171418,
          lng: -122.500056,
          description:
            "9311 47th Ave SW, Bldg 13, Tacoma, 98496 </br>Ph: 253-588-5237",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Bainbridge Is Lumber",
          lat: 47.635784,
          lng: -122.514447,
          description:
            "1365 Wintergreen Lane NE, Bainbridge Is., 98110 </br>Ph: 206-842-5691",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Clackamas Millwork",
          lat: 45.408473,
          lng: -122.562417,
          description:
            "15877 SE 98Th Ave, Clackamas, 97015 </br>Ph: 503-657-4555",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Clackamas Lumber",
          lat: 45.408473,
          lng: -122.562417,
          description:
            "15877 SE 98Th Ave, Clackamas, 97015 </br>Ph: 503-657-8686",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Gig Harbor Lumber",
          lat: 47.307916,
          lng: -122.579513,
          description:
            "5522 Point Fosdick Rd NW, Gig Harbor, 98335 </br>Ph: 253-858-9958",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Ferndale Lumber",
          lat: 48.855525,
          lng: -122.587753,
          description: "5880 Portal Way, Ferndale, 98248 </br>Ph: 360-384-4300",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Vancouver Lumber",
          lat: 45.678882,
          lng: -122.642174,
          description:
            "2820 NE 78th St, Vancouver, 98665 </br>Ph: 360-574-4541",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Beaverton Components",
          lat: 45.481341,
          lng: -122.786215,
          description:
            "5350 SW 107th Drive, Beaverton, 97005 </br>Ph: (971) 371-5971",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Longview Lumber",
          lat: 46.125097,
          lng: -122.93894,
          description:
            "642 Commerce Ave, Longview, 98632 </br>Ph: 360-425-1950",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Olympia Lumber",
          lat: 47.031512,
          lng: -122.941647,
          description:
            "1830 SW Black Lake Blvd, Olympia, 98512 </br>Ph: 360-754-0300",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Shelton Lumber",
          lat: 47.21449,
          lng: -123.099585,
          description: "114 E Cedar St, Shelton, 98584 </br>Ph: 360-426-2611",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Forest Grove Lumber",
          lat: 45.508203,
          lng: -123.10335,
          description: "920 Elm St, Forest Grove, 97116 </br>Ph: 503-357-2178",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Tangent Lumber",
          lat: 44.557822,
          lng: -123.109867,
          description: "33535 Hwy 99 E, Tangent, 97389 </br>Ph: 541-926-8658",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Hoodsport Lumber",
          lat: 47.406271,
          lng: -123.143176,
          description:
            "150 N Lake Cushman Rd, Hoodsport, 98548 </br>Ph: 360-877-6881",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "McMinnville Lumber",
          lat: 45.222979,
          lng: -123.195272,
          description:
            "545 North 99 W, McMinnville, 97128 </br>Ph: 503-472-6105",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Seaside Lumber",
          lat: 45.941294,
          lng: -123.919705,
          description:
            "84808 Frontage Rd, Seaside, 97138 </br>Ph: 503-738-9548",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Lincoln City Lumber",
          lat: 44.919564,
          lng: -124.010554,
          description:
            "6305 SW Hwy 101, Lincoln City, 97367 </br>Ph: 541-996-2155",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Newport Lumber",
          lat: 44.640551,
          lng: -124.053197,
          description: "615 N Coast Hwy, Newport, 97365 </br>Ph: 541-265-2221",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Coos Bay Lumber",
          lat: 43.376383,
          lng: -124.214712,
          description:
            "1221 N Bayshore Dr, Coos Bay, 97420 </br>Ph: 541-269-5988",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Sitka Lumber",
          lat: 57.05017,
          lng: -135.311221,
          description: "104 Smith St, Sitka, 99835 </br>Ph: 907-747-3339",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Fairbanks Polar",
          lat: 64.813946,
          lng: -147.766511,
          description:
            "2134 Texaco Ave Unit A, Fairbanks, 99701 </br>Ph: 907-452-4743",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Fairbanks Lumber",
          lat: 64.846779,
          lng: -147.772321,
          description:
            "2460 Phillips Field Rd, Fairbanks, 99701 </br>Ph: 907-450-2200",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Palmer Lumber",
          lat: 61.585108,
          lng: -149.125533,
          description:
            "97 Inner Springer Loop, Palmer, 99645 </br>Ph: 907-746-7001",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Eklutna Components",
          lat: 61.4581043,
          lng: -149.356272,
          description:
            "28273 Denaina Elders Rd, Chugiak, 99567 </br>Ph: 907-261-9299",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Wasilla (Matsu Galco)",
          lat: 61.59372,
          lng: -149.386871,
          description: "1900 W Parks Hwy, Wasilla, 99654 </br>Ph: 907-373-2806",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Seward Lumber",
          lat: 60.113125,
          lng: -149.442064,
          description:
            "Mile 3.5 Seward Hwy, Seward, 99664 </br>Ph: 907-224-5576",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Wasilla Lumber",
          lat: 61.57912,
          lng: -149.492975,
          description: "1700 W Parks Hwy, Wasilla, 99654 </br>Ph: 907-376-5237",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Birchwood Components",
          lat: 61.416191,
          lng: -149.495814,
          description:
            "20850 Birchwood Spur, Chugiak, 99567 </br>Ph: 907-688-4161",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Eagle River Lumber",
          lat: 61.339914,
          lng: -149.5596,
          description:
            "17320 Northgate Rd, Eagle River, 99577 </br>Ph: 907-694-3527",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Lake Otis Lumber",
          lat: 61.149932,
          lng: -149.834354,
          description:
            "7828 Lake Otis Pkwy, Anchorage, 99507 </br>Ph: 907-561-2808",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Anchorage (Galco) DC",
          lat: 61.130031,
          lng: -149.864223,
          description:
            "10010 Old Seward Hwy, Anchorage, 99515 </br>Ph: 907-261-9380",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Anchorage Curtis & Campbell",
          lat: 61.164279,
          lng: -149.88385,
          description:
            "6239 B Street, Suite 102, Anchorage, 99518 </br>Ph: 907-561-6011",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Anchorage DC",
          lat: 61.225553,
          lng: -149.889435,
          description:
            "790 Ocean Dock Rd, Anchorage, 99501 </br>Ph: 907-222-1746",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Anchorage Polar",
          lat: 61.230143,
          lng: -149.890984,
          description:
            "300 E. 54th Ave., Anchorage, 99518 </br>Ph: 907-563-5000",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Anchorage Millwork",
          lat: 61.179717,
          lng: -149.914815,
          description: "4600 Lois Dr, Anchorage, 99517 </br>Ph: 907-563-3141",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Anchorage (Lois Drive) Lumber",
          lat: 61.180521,
          lng: -149.91547,
          description: "4412 Lois Dr, Anchorage, 99517 </br>Ph: 907-563-3141",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Soldotna Lumber",
          lat: 60.47481,
          lng: -151.083949,
          description:
            "48855 Funny River Rd, Soldotna, 99669 </br>Ph: 907-262-9143",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Kenai Lumber",
          lat: 60.500994,
          lng: -151.275684,
          description:
            "40575 Kalifornsky Beach Rd, Kenai, 99611 </br>Ph: 907-283-7584",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Kenai Components",
          lat: 60.500994,
          lng: -151.275684,
          description:
            "40575 Kalifornsky Beach Rd, Kenai, 99611 </br>Ph: 907-335-1657",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Homer Lumber",
          lat: 59.647219,
          lng: -151.52552,
          description: "3978 Lake St, Homer, 99603 </br>Ph: 907-235-8506",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        },
        {
          name: "Kodiak Lumber",
          lat: 57.799522,
          lng: -152.383895,
          description: "1600 Mill Bay  Rd, Kodiak, 99615 </br>Ph: 907-486-4168",
          color: "#F9DC00",
          type: "circle",
          border_color: "#F9DC00"
        }
      ],
      regions: {
      },
      labels: {
        /*"0": {
          name: "",
          line: "yes",
          parent_id: "MA",
          x: "869.97338",
          y: "155.03993"
        },
        "1": {
          name: "",
          line: "yes",
          parent_id: "NH",
          x: "866.42413",
          y: "134.63177"
        },
        "2":{
          name:"",
          line:"yes",
          parent_id: "CT",
          x: "859.32564",
          y: "178.11003"
        },
        "3":{
          name:"",
          line:"yes",
          parent_id: "VT",
          x: "850.45253",
          y: "136.40639",
          height:"300"
        }*/
      }
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    if ((!prevProps || prevProps.mapdata !== this.props.mapdata) && this.props.mapdata && this.props.mapdata.length > 0) {
      this.getSortedData()
    }
  }

  /**
   * Apply Sorting
   */
  getSortedData = () => {
    var mapArray = [];
    mapArray = this.props.mapdata;
    for (let i = 0; i < mapArray.length; i++) {
      let x = mapArray[i]
      mapArray[i]['distance'] = this.getDistanceFromLatLonInKm(44.999142, -67.927621, x.lat, x.lng);
    }

    for (let i = 0; i < mapArray.length - 1; i++) {
      for (let j = i + 1; j < mapArray.length; j++) {
        if (mapArray[i].distance > mapArray[j].distance) {
          let temp = mapArray[i];
          mapArray[i] = mapArray[j];
          mapArray[j] = temp;
        }
      }
    }

    this.simplemaps_usmap_mapdata.locations = mapArray;
    this.createMap();
  }

  /**
   * Measue the distance bw two point with lat lng
   * @param {first point} lat1 
   * @param {first point} lon1 
   * @param {Second point} lat2 
   * @param {Second point} lon2 
   */
  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = this.deg2rad(lat2 - lat1);
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  /**
   * Degree to radion conversion
   * @param  deg 
   */
  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  /**
   * Handle the scroll event
   */
  handleScroll = () => {

    $(document).ready(function () {
      var simplemaps_usmap = '';
      $("[class^=sm_location]").each(function (i) {
        var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
        if (isIE) {
          if ($(this)[0] && $(this)[0].className && $(this)[0].animVal !== "sm_location_groupBy") {
            let row = $(this);
            setTimeout(function () {
              $("#test").animate({ left: '100px', top: '100px' }, 500);
              row
                .css({
                  opacity: "0.5",
                  display: "block"
                })
                .show()
                .animate({ opacity: 1 });
              if (simplemaps_usmap) {
                var locationcolor = simplemaps_usmap.mapdata.locations[i].locationcolor;
                row.css({
                  stroke: locationcolor,
                  fill: locationcolor,
                  transition: "1.0s"
                });
              }
            }, 1000 + i * 10);
          }
        } else {
          if ($(this)[0] && $(this)[0].classList && $(this)[0].classList.length > 0 && $(this)[0].classList[0] !== "sm_location_groupBy") {
            let row = $(this);
            setTimeout(function () {
              $("#test").animate({ left: '100px', top: '100px' }, 500);
              row
                .css({
                  opacity: "0.5",
                  display: "block"
                })
                .show()
                .animate({ opacity: 1 });
              if (simplemaps_usmap) {
                var locationcolor = simplemaps_usmap.mapdata.locations[i].locationcolor;
                row.css({
                  stroke: locationcolor,
                  fill: locationcolor,
                  transition: "1.0s"
                });
              }
            }, 1000 + i * 10);
          }
        }
      });
    });
  }

  /**
   * Initate the map
   */
  createMap() {
    let mapdata = document.createElement("script");
    mapdata.type = "text/javascript";
    var mapdatastringify =
      "var simplemaps_usmap_mapdata=" +
      JSON.stringify(this.simplemaps_usmap_mapdata);
    mapdata.type = "text/javascript";
    mapdata.innerText = mapdatastringify;
    mapdata.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(mapdata);
    const script = document.createElement("script");
    script.src =
      "https://simplemaps.com/static/lib/simplemaps/trials/maps/usmap.js";
    script.async = true;
    document.body.appendChild(script);
    $(".mapline").css({ display: "block" }).animate({}, 500);


    setInterval(() => {
      let inner_map = $('#map_inner');
      if (inner_map && inner_map.children('div').length) {
        let child = inner_map.children('div');
        if (this.checkForIE()) {
          // For the IE
          if (child[0].id && child[0].id === "tt_sm_map") {
            child[1].style['cssText'] = ""
            child[1].style['display'] = "none"
          } else if (child[1]) {
            child[0].style['cssText'] = ""
            child[0].style['display'] = "none"
          }
        } else {
          // For the Others
          if (child[0].id && child[0].id === "tt_sm_map") {
            child[1].style['display'] = "none"
          } else {
            child[0].style['display'] = "none"
          }
        }
      }
    }, 10)
  }

  checkForIE() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
      return true
    }
    else  // If another browser, return 0
    {
      return false
    }

  }
  render() {
    var USAComponent = <div>
      <div className="row ">
        <div className="col col-xl-12">
          <div id="map" className="accoladesmap" />
          {
            this.props.regionimage ? (
              <img alt="mapdescription" className="float-right" src={base_url + this.props.regionimage} />
            ) : (
                <img alt="mapdescription" className="float-right" src={legent_locations} />
              )
          }

        </div>
      </div>
    </div>;
    return USAComponent;
  }


  /**
   * Load the point data on map
   */
  load() {
    $("[class^=sm_location]").each(function () {
      if ($(this)[0].classList[0] !== "sm_location_groupBy") {
        $(this)
          .css({
            opacity: "0",
            display: "none"
          })
          .hide()
          .animate({ opacity: "1" })
      }
    });
  }
}

/**
 * Define the protype
 */
UsaHeatChartComponent.propTypes = {
  mapdata: PropTypes.array,
};