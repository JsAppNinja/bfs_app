
//importing library and component
import React, { Component } from 'react';
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import Routes from "./route";
import { withRouter } from "react-router-dom";
import { topFunction } from "./utils";
import { globalVar } from "./config";
import axios from 'axios';
import tenor from "./img/loader.gif";
import PropTypes from 'prop-types';
import './css/App.css';
import './css/Appresponsive.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();

    //defining state variable
    this.state = {
      headerData: [],
      footerData: [],
      headerImage : "",
      baseurl: globalVar.base_url1,
      content: [],
      leaderShipData: [],
      basicDataLoaded: false,
      communityData: [],
      constructiontypeData: [],
      storeData: [],
      homeData: [],
      quoteData: {},
      refreshStore: [],
      locationzipCode: "",
      showLoader: false,
      searchZipCode: "",
      storeDataHeader: [],
      constructiontypeDataHome: [],
      locationtypeData:[]
    }
    this.fetchHeaderMenu = this.fetchHeaderMenu.bind(this);
    this.getStoreData = this.getStoreData.bind(this);
  }
  

  /**
    * Defining proptypes
   */
  static get propTypes() { 
    return { 
        history: PropTypes.any
    }; 
   }

  UNSAFE_componentWillMount() {
    this.unlisten = this.props.history.listen(() => {
      topFunction();
      document.getElementsByClassName('close_Side_menu')[0].click();
      //this.child.current.closeSideBar();
      this.showLoaderFun();
    });

    if(globalVar.production){
      if (window.location.href.indexOf("https://") === -1) {
		    window.location.href = window.location.href.replace("http://", "https://");
      }
    } 
    localStorage.removeItem("locationzip");
  }

  componentWillUnmount() {
    this.unlisten();
  }

  componentDidMount() {
    this.fetchHeaderMenu();
  }


  /**
    * To show loader on page
   */
  showLoaderFun = () => {
    if (window.location.pathname === '/' || window.location.pathname === '' || window.location.pathname === '/products-services') {
      this.setState({
        showLoader: false
      })

    } else {

      this.setState({
        showLoader: true
      })
      setTimeout(() => {
        this.setState({
          showLoader: false
        })
      }, 2000)
    }
  }

  /**
    * Api to fetch data of header menu
   */
  fetchHeaderMenu() {
    axios.get(globalVar.base_url1 + "/umbraco/api/Content/GetMenus", {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      let footerData = [];
      footerData.push(response.data.Footer);
      let RootId = 12760;
      this.getHomeContent(RootId);
      this.setState({
        headerData: response.data.Menu,
        footerData: footerData,
        headerImage: footerData[0].Properties.mainLogo
      });
    }).catch(() => {

    });
  }


  /**
    * Check for empty object
   */
  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  /**
    * Api to fetch data of home
   */
  getHomePageContent = () => {
    if (this.state.homeData.length < 1) {
        let RootId = 12757
        fetch(globalVar.base_url1 + '/umbraco/api/Content/Get/' + RootId, {
          method: 'get'
        }).then((response) => {
          return response.json();
        }).then((data) => {
          let homeDataArray = [];
          homeDataArray.push(data.Properties);
          this.setState(
            {
              homeData: homeDataArray
            }
          )
        }).catch(() => {

        });
    } else {
      return
    }
  }


  /**
    * Api to fetch data of home page
  */
  getHomeContent(RootId) {
    fetch(globalVar.base_url1 + "/umbraco/api/Content/getChildren/" + RootId, {
      method: 'get'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if(data){
        this.setState({
          content: data,
          basicDataLoaded: true
        });
      }else{
        this.setState({
          content: [],
          basicDataLoaded: true
        });
      }
    }).catch(() => {
     
    });
  }


  /**
    * Api to fetch data of all location
  */
  getLocationContent = () => {
    if (this.state.locationtypeData.length < 1) {
          let RootId = 12761
          fetch(globalVar.base_url1 + '/umbraco/api/Content/Get/' + RootId, {
            method: 'get'
          }).then((response) => {
            return response.json();
          }).then((data) => {
            let locationDataArray = [];
            locationDataArray.push(data.Properties);
            this.setState(
              {
                locationtypeData: locationDataArray,
              }
            )
          }).catch(() => {
           
          });
    } else {
      return
    }
  }

  /**
    * Api to fetch data of construction type page
  */
  getConstructionTypeDataHome = () => {
    if (this.state.constructiontypeDataHome.length < 1) {
        let RootId = 12831
        fetch(globalVar.base_url1 + '/umbraco/Api/Content/getChildren/' + RootId, {
          method: 'get'
        }).then((response) => {
          return response.json();
        }).then((data) => {
          let constructiontypeHomeDataArray = [];
          constructiontypeHomeDataArray = data
          this.setState(
            {
              constructiontypeDataHome: constructiontypeHomeDataArray
            }
          )
        }).catch(() => {
        });
    } else {
      return
    }
  }


  /**
    * Api to fetch data of store based on search parameter
  */
  getStoreData = (data) => {
    let aliasdata = [];
    for (let i = 0; i < data.DistributionList.length; i++) {
      aliasdata.push({ alias: data.DistributionList[i].alias })
    }
    fetch(globalVar.base_url1 + '/umbraco/api/LocationData/GetAllLocations', {
      body: JSON.stringify({
        radius: data.Radius,
        latitude: data.Latitude,
        longitude: data.Longitude,
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
      this.setState(
        {
          storeData: data,
          refreshStore: [...this.state.refreshStore, "refresh"]
        })
    }).catch(() => {
    });
    
  }


  /**
    * To set data which we get through search of stores
  */
  setStoreData =(stores) => {
    this.setState(
      {
        storeData: stores,
        refreshStore: [...this.state.refreshStore, "refresh"]
      })
  }


  /**
    * To set data which we get through search of stores
  */
  getStoreDataHeader = (data) => {
    let aliasdata = [];
    for (let i = 0; i < data.DistributionList.length; i++) {
      aliasdata.push({ alias: data.DistributionList[i].alias })
    }
      fetch(globalVar.base_url1 + '/umbraco/api/LocationData/GetAllLocations', {
        body: JSON.stringify({
          radius: data.Radius,
          latitude: data.Latitude,
          longitude: data.Longitude,
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
        this.setState(
          {
            storeDataHeader: data
          })
      }).catch(() => {

      });
  }


  /**
    * API to send email for quote
  */
  sendQuote = (data) => {
    axios.post(globalVar.base_url1 + "/umbraco/Api/Content/SendQuoteByLocation",data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        this.setState(
        {
          quoteData: response.data
        })
         
    }).catch(() => {
        
    }); 
  }


  /**
    * Getting search data on the basis of zip code and setting the same
  */
  getLocationzipcode = (data) => {
    this.setState({
      quoteData: data
    })
  }


  /**
    * Setting data on zipcode on which we have to search
  */
  searchStoreByZipCode = (zip) => {
    this.setState({ locationZipCode: zip })
  }


  render() {
    const childProps = {
      hederData: this.state.headerData,
      locationZipCode: this.state.locationZipCode,
      footerData: this.state.footerData,
      content: this.state.content,
      basicDataLoaded: this.state.basicDataLoaded,
      getHomePageData: this.getHomePageContent,
      homeData: this.state.homeData,
      getConstructionTypeDataHome: this.getConstructionTypeDataHome,
      constructiontypeDataHome: this.state.constructiontypeDataHome,
      setLocationZipCode: this.setLocationZipCode,
      storeData: this.state.storeData,
      getStoreData: this.getStoreData,
      refreshStore: this.state.refreshStore,
      sendQuote: this.sendQuote,
      quoteData: this.state.quoteData,
      getLocationzipcode: this.getLocationzipcode,
      searchStoreByZipCode: this.searchStoreByZipCode,
      searchZipCode: this.state.searchZipCode,
      getStoreDataHeader: this.getStoreDataHeader,
      storeDataHeader: this.state.storeDataHeader,
      setStoreData : this.setStoreData,
      getLocationContent:this.getLocationContent,
      locationContent:this.state.locationtypeData
    };

    return (
      <div>
        <HeaderComponent ref={this.child} menuData={this.state.headerData} childProps={childProps} mainImage={this.state.headerImage} />
        <Routes childProps={childProps} />
        <FooterComponent menuData={this.state.footerData} activeMenu={window.location.pathname}/>
        {
          this.state.showLoader ? (<div className="showloader " style={{ background: "     rgba(224, 228, 222, 0.5)", width: "100%", height: "100%", textAlign: "center" }}>
            <img src={tenor} alt="loader" style={{ marginTop: "21%" }} />
          </div>) : null

        }
      </div>
    );
  }
}

export default withRouter(App);



