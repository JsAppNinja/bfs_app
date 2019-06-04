
//Import statement
import React, { Component } from 'react';
import htmlsvg from "../img/html.svg";
import pdfsvg from "../img/pdf.svg";
import xlssvg from "../img/xls.svg";
import quartelyearning from "../img/Quarterly-Earning-bg.jpg";
import stockgraph from "../img/stock-graph.jpg";
import investpresentation from "../img/investor-presentation.jpg";
import { Link } from "react-router-dom";
import latestEarings from "../img/latest-Earings.jpg";
import backimg from "../img/2018-earning.jpg";
import printedmat from "../img/printer.svg";
import rssnews from "../img/newspaper.svg";
import emailalert from "../img/email.svg";
import downloadlib from "../img/download.svg";


import FusionCharts from 'fusioncharts';
import Maps from 'fusioncharts/fusioncharts.maps';
import World from 'fusioncharts/maps/fusioncharts.world';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

ReactFC.fcRoot(FusionCharts, Maps, World, FusionTheme, TimeSeries);

const jsonify = res => res.json();
const dataFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json"
).then(jsonify);
const schemaFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json"
).then(jsonify);

const dataSource = {
  chart: {},
  caption: {
    text: "Sales Analysis"
  },
  subcaption: {
    text: "Grocery"
  },
  yaxis: [
    {
      plot: {
        value: "Grocery Sales Value"
      },
      format: {
        prefix: "$"
      },
      title: "Sale Value"
    }
  ]
};


const chartConfigs = {
  type: 'candlestick',
  width: '100%',
  height: 500,
  dataFormat: 'json',
  dataSource: dataSource
};


class StockInfoComponent extends Component {
  constructor(props) {
    super(props);

    //Defining state variable
    this.state = {

      activeTab: '1',
      addClass: false,
      timeseriesDs: {
        type: "timeseries",
        renderAt: "container",
        width: "100%",
        height: "500",
        dataSource
      }
    };

  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.onFetchData();

  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  /**
     * To toggle menu
    */
    toggle(tab) {
    this.props.history.push(tab)
  }

  /**
  * Handle Scroll
  */
  handleScroll = () => {
    if (window.pageYOffset > 130) {
      this.setState({ addClass: true })
    } else {
      this.setState({ addClass: false })
    }
  }


  onFetchData() {
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      timeseriesDs.dataSource.data = fusionTable;
      this.setState({
        timeseriesDs
      });
    });
  }

  componentDidUpdate() {
  }


  render() {
    return (
      <div className={"bg-gray" + (this.state.addClass ? ' head_sticky' : '')} >
        <section className="stock-quote py-3 sticky-navigation-invest">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d-lg-flex w-100">
                  <h5 className="font-weight-medium  mb-0 mr-4">Share Price</h5>
                  <ul className="ul-top-share">
                    <li className="list-inline-item pr-sm-4 pl-lg-4 pl-0 pr-2 border-right-black h4 mb-0">NASDAQ: BLDR <span className="heading-blue">$15.81</span> </li>
                    <li className="list-inline-item pr-sm-4 pl-sm-4 pl-0 pr-2 border-right-black  h4 mb-0"> $ Change <span className="heading-blue">+0.00 </span></li>
                    <li className="list-inline-item pr-sm-4 pl-sm-4 pl-0 pr-2 border-right-black h4 mb-0">  % Change <span className="heading-blue">+0.00</span> </li>
                    <li className="list-inline-item pr-sm-4 pl-sm-4 pl-0 pr-2 h4 mb-0"> Volume <span className="heading-blue">533,00 </span> </li>
                  </ul>
                  <h6 className="position-absolute mb-0 date-stock">Pricing Delayed by 15 min</h6>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mt-5   text-center">
                <h1 className="subboxes-heading text-left">Stock information</h1>
              </div>
            </div>
          </div>
        </section>
         <section className="theme-nav-page  py-4">
           <div className="container p-0">
                 <div className="row">
                        <div className="col-md-12">
                            <Nav tabs className="nav-fill tab-none border-bottom-0 overflow-h">
                              <NavItem className="text-uppercase txt-left-mob">
                                <NavLink
                                  className={classnames({ active: this.state.activeTab === '1' }) + " py-md-4 py-3 text-white"}
                                  onClick={() => { this.toggle('/stock-info'); }}
                                >
                                  <span className="font-weight-medium font-weight-bold z-index">Stock Quote</span>
                                </NavLink>
                              </NavItem>
                              <NavItem className="text-uppercase txt-left-mob">
                                <NavLink
                                  className={classnames({ active: this.state.activeTab === '2' }) + " py-md-4 py-3 text-white"}
                                  onClick={() => { this.toggle('/historic-stock-lookup'); }}
                                >
                                  <span className="font-weight-medium font-weight-bold z-index">Historic Stock Lookup </span>
                                </NavLink>
                              </NavItem>

                              <NavItem className="text-uppercase txt-left-mob">
                                <NavLink
                                  className={classnames({ active: this.state.activeTab === '3' }) + " py-md-4 py-3 text-white"}
                                  onClick={() => { this.toggle('/investment-calculator'); }}
                                >
                                  <span className="font-weight-medium font-weight-bold z-index">Investment Calculator</span>
                                </NavLink>
                              </NavItem>
                              <NavItem className="text-uppercase txt-left-mob">
                                <NavLink
                                  className={classnames({ active: this.state.activeTab === '4' }) + " py-md-4 py-3 text-white"}
                                  onClick={() => { this.toggle('/analyst-coverage'); }}
                                >
                                  <span className="font-weight-medium font-weight-bold z-index">Analyst List</span>
                                </NavLink>
                              </NavItem>
                            </Nav>
                          </div>
                      </div>
          </div>
        </section>
        <section className="">
          <div className="container">
            <div className="row  row-eq-height">
              <div className="col-md-12 flex-column   d-flex justify-content-center pl-md-5">
                <ul className="list-unstyled ul-home-stock mt-5">
                  <li className="">
                    <h6 className="mb-0 text-gray6">Last Price</h6>
                    <h3 className="text-gray6 font-weight-bold">$14.57</h3>
                  </li>
                  <li className="mt-3 mt-sm-0">
                    <div className="d-inline-block w-100 pb-3">
                      <h6 className="mb-0">Change</h6>
                      <h5 className="text-gray6 font-weight-bold">0 (0.00)</h5>
                    </div>
                    <div className="d-inline-block w-100  border-top pt-3">
                      <h6 className="mb-0">Volume</h6>
                      <h5 className="text-gray6 font-weight-bold">0</h5>
                    </div>


                  </li>
                  <li className="mt-3 mt-sm-0">
                    <div className="d-inline-block w-100 pb-3">
                      <h6 className="mb-0">Open</h6>
                      <h5 className="text-gray6 font-weight-bold">-</h5>
                    </div>
                    <div className="d-inline-block w-100  border-top pt-3">
                      <h6 className="mb-0">Previous Close</h6>
                      <h5 className="text-gray6 font-weight-bold">$14.57</h5>
                    </div>
                  </li>
                  <li className="">
                    <div className="d-inline-block w-100 pb-3">
                      <h6 className="mb-0">Day High</h6>
                      <h5 className="text-gray6 font-weight-bold">$14.71</h5>
                    </div>
                    <div className="d-inline-block w-100  border-top pt-3">
                      <h6 className="mb-0">Day Low</h6>
                      <h5 className="text-gray6 font-weight-bold">$14.00</h5>
                    </div>



                  </li>
                  <li className="">
                    <div className="d-inline-block w-100 pb-3">
                      <h6 className="mb-0">52-Week High</h6>
                      <h5 className="text-gray6 font-weight-bold">$20.79</h5>
                    </div>
                    <div className="d-inline-block w-100  border-top pt-3">
                      <h6 className="mb-0">52-Week Low</h6>
                      <h5 className="text-gray6 font-weight-bold">$10.15</h5>
                    </div>


                  </li>
                </ul>







              </div>
            </div>
          </div>
        </section>

        <section className="pb-5 pt-3">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                {/* <ReactFC {...chartConfigs} /> */}
                {this.state.timeseriesDs.dataSource.data ? (
                  <ReactFC {...this.state.timeseriesDs} />
                ) : (
                    "loading"
                  )}
              </div>
            </div>
          </div>

        </section>
        {/* <section className="pb-5 pt-3">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <img className="img-fluid" alt="stock" title="stock" src={stockgraph} />
              </div>
            </div>
          </div>

        </section> */}
        <section className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mb-sm-0 mb-5">
                <div className="m-auto text-center">
                  <h2 className="display-4 font-weight-medium color-dark-gray text-center">Email Alerts </h2>
                  <h5 className="">Sign Up For Builders Firstsource News & Updates </h5>
                </div>
                <div className="search_frm  pb-4 d-md-flex align-items-center mt-4">
                  <div className="input-group mb-4 mb-md-0">
                    <input type="test" placeholder="Enter E-mail Address" className="form-control" style={{ width: '100%' }} />
                  </div>
                  <div className="ml-auto mt-1 text-center">
                    <div className="my-lyc">
                      <button className="btn text-uppercase bg-info px-5 py-3 d-inline-block d-none-mob  text-white sp-shadow">Sign up</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

    );
  }
}
export default StockInfoComponent;