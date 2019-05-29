
//Import statement
import React, { Component } from 'react';
import { topFunctionButtonClick } from "../utils";
import { globalVar } from "../config";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import investorbanner from "../img/investor-banner.jpg";
import investgraph from "../img/invest-graph.jpg";
import downloadpdf from "../img/download-pdf.jpg";
import investpresentation from "../img/investor-presentation.jpg";
import latestEarings from "../img/latest-Earings.jpg";
import printedmat from "../img/printer.svg";
import rssnews from "../img/newspaper.svg";
import emailalert from "../img/email.svg";
import downloadlib from "../img/download.svg";
import backimg from "../img/2018-earning.jpg";
import InvestorsOverview from './InvestorsOverview';
import InvestorsNewsComponent from './InvestorsNews'
import GovernanceComponent from './Governance'

//Global variable
var base_url = globalVar.base_url1;

class InvesterComponent extends Component {
  constructor(props) {
    super(props);

    //Defining state variable
    this.state = {
      storeName: ""
    };

  }
  componentDidMount() {
    let index = window.location.href.indexOf("investors_")
    let storeName = ""
    console.log(index)
    if (index > 0) {
      storeName = window.location.href.slice(index + 10, window.location.href.length)

    } else {
      storeName = ""
    }
    console.log(storeName)
    this.setState({ storeName: storeName })
  }
  componentDidUpdate() {
  }

  goToPage = (link) => {
    if (link == "") {
      this.setState({ storeName: "" })
    } else {
      this.setState({ storeName: link })

    }
  }

  render() {
 
 
    return (
      <div className="investHome">
        <section className="stock-quote py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d-lg-flex w-100">
                  <h5 className="font-weight-medium  mb-0 mr-4">Share Price</h5>
                  <ul className="ul-top-share">
                    <li className="list-inline-item pr-sm-4 pl-lg-4 pl-0 pr-2 border-right-black h4 mb-0">NASDAQ: BLDR <span class="heading-blue">$15.81</span> </li>
                    <li className="list-inline-item pr-sm-4 pl-sm-4 pl-0 pr-2 border-right-black  h4 mb-0"> $ Change <span class="heading-blue">+0.00 </span></li>
                    <li className="list-inline-item pr-sm-4 pl-sm-4 pl-0 pr-2 border-right-black h4 mb-0">  % Change <span class="heading-blue">+0.00</span> </li>
                    <li className="list-inline-item pr-sm-4 pl-sm-4 pl-0 pr-2 h4 mb-0"> Volume <span class="heading-blue">533,00 </span> </li>
                  </ul>
                  <h6 className="position-absolute mb-0 date-stock">Pricing Delayed by 15 min</h6>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="inveter-banner position-relative">
          <img className="img-fluid w-100" alt="invertor" title="invertor" src={investorbanner} />
          <div className="invest-banner-heading text-center position-absolute w-100 h-100 d-flex align-items-center justify-item-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-white">
                  <h1 className="mb-0 text-uppercase font-weight-bold display-2">Buiders First Source</h1>
                  <h3 className="text-uppercase mt-0">Source is quality than you can trust</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <ul className="list-unstyled menu-company-hightlight text-center">
                  <li className={this.state.storeName === "" ? "list-inline-item active py-2 py-lg-4" : "list-inline-item py-2 py-lg-4"}><Link to={'/investorhome'} className="">Company Highlights</Link></li>
                  <li className={this.state.storeName === "governance" ? "list-inline-item active py-2 py-lg-4" : "list-inline-item py-2 py-lg-4"}><Link to={'/governance'} className="">Governance</Link></li>
                  <li className={this.state.storeName === "news" ? "list-inline-item active py-2 py-lg-4" : "list-inline-item py-2 py-lg-4"}><Link to={'/news'} className="">News</Link></li>
                  <li className="list-inline-item  py-2 py-lg-4"><a href="#" className="">Events</a></li>
                  <li className="list-inline-item  py-2 py-lg-4"><a href="#" className="">Stock Information</a></li>
                  <li className="list-inline-item  py-2 py-lg-4"><a href="#" className="">Financial Information</a></li>
                  <li className="list-inline-item  py-2 py-lg-4"><a href="#" className="">Email Alerts</a></li>
                  <li className="list-inline-item  py-2 py-lg-4"><a href="#" className="">FAQs</a></li>
                  <li className="list-inline-item  py-2 py-lg-4"><a href="#" className="">Contact Us</a></li>
                </ul>
              </div>
            </div>

          </div>

        </section>

        <InvestorsOverview></InvestorsOverview>

        <section className="bg-blue">

          <div className="section-image col-12 p-0">
            <img src={backimg} />

            <div className="earn-head-section">
              <div className="container">

                <h2 className="display-2 text-uppercase font-weight-bold">2018 Earnings</h2>

              </div>

            </div>

          </div>

          <div className="earn-section">

            <div className="container py-3 px-5">
              <div className="row text-white">

                <div className="col-md-6 mb-sm-0 text-center">
                  <h4 className="mb-3 et-text w-100 d-inline-block mt-3">Latest Earnings Presentation</h4>
                  <img className="img-fluid bg-white d-inline-block w-100" alt="" title="" src={latestEarings} />
                </div>

                <div className="col-md-6 text-center">
                  <h4 className="mb-3 et-text w-100 d-inline-block mt-3">Investor Presentation</h4>

                  <img className="img-fluid bg-white d-inline-block w-100" alt="" title="" src={investpresentation} />

                </div>






              </div>
            </div>










          </div>


          <div className="container p-3">
            <div className="col-lg-12 col-md-12 mt-5">
              <h4 className="mb-3 et-text w-100 d-inline-block mt-3 text-center display-5 font-weight-bold">Shareholder Tools</h4>

              <ul className="list-unstyled share-holder-ul mt-4 row">
                <li className="mb-3 text-center col-md-3">
                  <div className="icon-circle d-inline-block"><img className="img-fluid d-inline-block" alt="invertor" title="invertor" src={printedmat} /></div>
                  <div className="d-block w-100 text-center h5">Printed Materials</div></li>

                <li className="mb-3 col-md-3">
                  <div className="icon-circle d-inline-block"><img className="img-fluid d-inline-block" alt="invertor" title="invertor" src={downloadlib} /></div>
                  <div className="d-block w-100 text-center h5">Download Library</div></li>


                <li className="mb-3 col-md-3">
                  <div className="icon-circle d-inline-block"><img className="img-fluid d-inline-block" alt="invertor" title="invertor" src={emailalert} /></div>
                  <div className="d-block w-100 text-center h5">Email Alerts</div></li>
                <li className="mb-3 col-md-3">
                  <div className="icon-circle d-inline-block"><img className="img-fluid d-inline-block" alt="invertor" title="invertor" src={rssnews} /></div>
                  <div className="d-block w-100 text-center h5">RSS News Feeds</div></li>
              </ul>


            </div>

          </div>






        </section>
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

export default InvesterComponent;
