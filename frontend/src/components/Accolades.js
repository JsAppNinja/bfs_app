import React, { Component } from 'react';
import {globalVar} from "../config";
import UsaHeatChartComponent from './usa-heat-map'
import { GetStatwiseData } from "../utils";
var awardsdata = [];
var base_url = globalVar.base_url1;

class AccoladesComponent extends Component {

    constructor(props) {
        super(props);

        //Defining state variable
        this.state = {
          awardsimage:[],
          lat: null,
          lng: null,
          Radius: 200,
          DistributionList: null,
          installedServiceName: null,
          Address: null,
          stateWiseData: [],
          allStateData: [],
          mapBackColor: "",
          mapHoverColor: "",
          mapBorderColor: "",
          page_properties:{},
          awardsdata
        }
    }

    /**
     * To get location data through API
    */
    getAccoladesPageData(){
        let RootId = 12836;
        fetch(globalVar.base_url1 + "/umbraco/api/Content/get/" + RootId, {
            method: 'get'
          }).then((response) => {
            return response.json();
          }).then((data) => {
              if(data){
                  let imagedata = []
                  if(data.Properties.awardsImages){
                    if(data.Properties.awardsImages.split(",").length>0){
                      var image = data.Properties.awardsImages.split(",")
                      imagedata = image;
                    }else{
                       image = data.Properties.awardsImages
                       imagedata.push(image);
                    }
                  }
                  this.setState(
                      {
                          page_properties:data.Properties,
                          awardsdata: JSON.parse(data.Properties.awardsData),
                          awardsimage: imagedata
                      }
                  )
              }
          }).catch(() => {
            
          });
    }

    componentDidMount(){
      this.getAccoladesPageData();  
    }

    UNSAFE_componentWillMount(){
      this.gettingAllLocation();
    }

    /**
     * To get all location data through API
    */
    gettingAllLocation(){
      let self  =  this;
      fetch(globalVar.base_url1 + '/umbraco/api/LocationData/GetAllLocations', {
          method: 'post',
          body: JSON.stringify({
              radius: self.state.Radius,
              latitude: self.state.lat,
              longitude: self.state.lng,
              DistributionList: null,
              installedServiceName: null,
              Address: null
          }),
          headers: {
              'Content-Type': 'application/json'
          },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if(data.length>0){
              let alldata = [];
              for(let i=0; i < data.length ; i++){
                if(data[i].Name &&  data[i].Latitude && data[i].Longitude ){
                  alldata.push(
                    {
                      name: data[i].Name,
                      lat: data[i].Latitude,
                      lng: data[i].Longitude,
                      description:data[i].Address1,
                      color: data[i].StoreColor,
                      type: data[i].StoreIconType.toLowerCase(),
                      border_color: data[i].StoreColor
                    }
                  )
                }
                 
              }
              if(alldata.length>0){
                this.setState({
                  stateWiseData: GetStatwiseData(data),
                  allStateData: alldata
                }) 
              }  
            }
        }).catch(() => {
            
        });
    }

    render() {
        return (
          <div className="col-12 midcontent">
            <div className="bg-grayd-flex">
               <div className="container px-0">
                  <div className="w-100 pad-xs py-5">
                     <h1 className="display-4 font-weight-medium color-dark-gray text-center pb-3">{this.state.page_properties.title}</h1>
                     <div className="text-center mt-xs-3"><span className="accolades-desc" dangerouslySetInnerHTML={{ __html: this.state.page_properties.content }}></span></div>
                  </div>
               </div>
            </div>
            <div id="mapsection" className="bg-gray d-flex">
               <div className="container px-0">
                  <div className="w-100">
                     <h2 className="display-4  p-4 w-100 text-center mob-font font-weight-500">{this.state.page_properties.mapSectionTitle}</h2>
                     <div className="col-12 p-2 acc-map position-relative" >
                        <UsaHeatChartComponent regionimage={this.state.page_properties.mapImage} mapdata={this.state.allStateData} />
                     </div>
                     <div className="col-12 px-0 py-5 py-md-5 py-xl-5">
                        <h2 className="display-4  font-small-tab w-100 font-weight-500 py-md-5 py-xl-5 px-3">{ this.state.page_properties.awardsSectionTitle }</h2>
                        <div className="row m-0">
                          {this.state.awardsdata.map((awards, index) => (
                            <div key={index} className="col-md-6 mb-4">
                               <h3 className="dis-2-tab">{ awards.awardTitle }</h3>
                               <p className="h5 pt-1 font-weight-light">{ awards.awardYear } - { awards.awardLocation }</p>
                            </div>
                          ))}
                        </div>
                        <div className="row m-0 py-5 py-md-5 py-xl-5">
                        
                           {this.state.awardsimage.map((awardsimage, index) => (
                               <div key={index} className="award col-md-3 col-sm-6 col-12 col my-3"><img src={base_url+awardsimage+"?anchor=center&mode=crop&width=310&height=258"} alt="award_2017" className="img-fluid" /></div>
                            ))}
                           
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        );
    }
}

export default AccoladesComponent;
