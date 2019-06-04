
//Import statement
import React, { Component } from 'react';
import ReportDetail from "../img/Report.jpg";
import earningImg from "../img/earing1.jpg";
import earningImg2 from "../img/earing2.jpg";
import earningImg3 from "../img/earing3.jpg";
import earningImg4 from "../img/earing4.jpg";
import pdfsvg from "../img/pdf.svg";
import { Link } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';



class AnnualReportComponent extends Component {
  constructor(props) {
    super(props);

    //Defining state variable
    this.state = {
        activeTab: '2',
      addClass: false
    };

  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
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



  render() {
    return (

      <div className={(this.state.addClass ? ' head_sticky' : '')} >

        <section className="stock-quote py-3 sticky-navigation-invest">
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
        <section className="">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mt-5 mb-2  text-center">
                <h1 className="subboxes-heading text-left">Annual Reports</h1>
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
                      onClick={() => { this.toggle('/financial-info'); }}
                    >
                   <span className="font-weight-medium font-weight-bold z-index">Overview </span>
                    </NavLink>
                  </NavItem>
                  <NavItem className="text-uppercase txt-left-mob">

                       <NavLink
                      className={classnames({ active: this.state.activeTab === '2' }) + " py-md-4 py-3 text-white"}
                      onClick={() => { this.toggle('/annualreport'); }} 
                    >
                      <span className="font-weight-medium font-weight-bold z-index">Annual Reports</span>
                    </NavLink>
                  </NavItem>

                  <NavItem className="text-uppercase txt-left-mob">
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '3' }) + " py-md-4 py-3 text-white"}
                      onClick={() => { this.toggle('/sec-filings'); }}
                    >
                      <span className="font-weight-medium font-weight-bold z-index">SEC Filings  </span>
                    </NavLink>
                  </NavItem>
                  <NavItem className="text-uppercase txt-left-mob">
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '4' }) + " py-md-4 py-3 text-white"}
                      onClick={() => { this.toggle('/quarterlyearning'); }}
                    >
                      <span className="font-weight-medium font-weight-bold z-index">Quarterly Results</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </div>
          </div>
        </section>
        <section className="annualReport position-relative py-3">
          <div className="container">

            <div className="row mb-4">
              <div className="col-md-3 col-sm-4 mt-5 mb-2 text-center text-sm-left">
                <img className="img-fluid" alt="invertor" title="invertor" src={ReportDetail} />
              </div>
              <div className="col-md-9 col-sm-8 mt-5 mb-2 ">
                <h1 className="text-center text-sm-left">2018</h1>
                <div className="my-3" id="accordion">
                  <div className="card" id="AccordianHeading">
                    <div className="card-header  p-0" id="heading-1">
                      <a className="accord_style h5  mb-0 py-2 px-4 collapsed" id="accord1" role="button" data-toggle="collapse" href="#report1" aria-expanded="false" aria-controls="report1">
                        2018 Annual Report
                                                                                             <i class="fa fa-angle-down h5 float-right" aria-hidden="true"></i>
                      </a>
                    </div>
                    <div id="report1" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                      <div className="card-body">
                        <h6> <img className="img-fluid pdf-img" alt="pdf" title="pdf" src={pdfsvg} />
                          2018 Results
                        <span className="float-right font-12 text-download">Download</span>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="row mb-4">
              <div className="col-md-3 col-sm-4 mt-5 mb-2 text-center text-sm-left">
                <img className="img-fluid" alt="invertor" title="invertor" src={ReportDetail} />
              </div>
              <div className="col-md-9 col-sm-8 mt-5 mb-2 ">
                <h1 className="text-center text-sm-left">2018</h1>
                <div className="my-3" id="accordion">
                  <div className="card" id="AccordianHeading">
                    <div className="card-header  p-0" id="heading-1">
                      <a className="accord_style h5  mb-0 py-2 px-4 collapsed" id="accord1" role="button" data-toggle="collapse" href="#report2" aria-expanded="false" aria-controls="report1">
                        Proxy Statement
                         <i class="fa fa-angle-down h5 float-right" aria-hidden="true"></i>
                      </a>
                    </div>
                    <div id="report2" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                      <div className="card-body">
                        <h6> <img className="img-fluid pdf-img" alt="pdf" title="pdf" src={pdfsvg} />
                          2018 Proxy statement
                          <span className="float-right font-12 text-download">Download</span>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bottomLinks position-relative mb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-xl-3 col-md-6  cont_type_mob mb-4">
                <div className="position-relative cover-area">
                  <div className="const_img_mob"> <img className="img-fluid" alt="invertor" title="invertor" src={earningImg} /> </div>
                  <div className="mob-ht  h-100 align-items-center gallery-area">
                    <div className="w-100 d-flex align-items-center h-100 ">
                      <div className="text-center flex-content-mob font-weight-normal w-100">
                        <h5 className="text-uppercase tab-sm  text-white">
                          About Builders <br /> First Source
                                                </h5>
                        <div className="rd-name mt-3">
                          <Link className="btn theme-btn text-white  text-uppercase bg-info px-4 py-3 text-white h5 mb-0" to={'/investorhome'} >Learn More</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xl-3 col-md-6 cont_type_mob mb-4">
                <div className="position-relative cover-area">
                  <div className="const_img_mob"> <img className="img-fluid" alt="invertor" title="invertor" src={earningImg2} /> </div>
                  <div className="mob-ht  h-100 align-items-center gallery-area">
                    <div className="w-100 d-flex align-items-center h-100 ">
                      <div className="text-center flex-content-mob font-weight-normal w-100">
                        <h5 className="text-uppercase tab-sm  text-white">
                          QUARTERLY  <br /> EARNINGS
                                                </h5>
                        <div className="rd-name mt-3">
                          <Link className="btn theme-btn text-white text-uppercase bg-info px-4 py-3 text-white h5 mb-0" to={'/quarterlyearning'}>Learn More</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xl-3 col-md-6  cont_type_mob mb-4">
                <div className="position-relative cover-area">
                  <div className="const_img_mob"> <img className="img-fluid" alt="invertor" title="invertor" src={earningImg3} /> </div>
                  <div className="mob-ht  h-100 align-items-center gallery-area">
                    <div className="w-100 d-flex align-items-center h-100 ">
                      <div className="text-center flex-content-mob font-weight-normal w-100">
                        <h5 className="text-uppercase tab-sm  text-white">
                          LEADERSHIP
                                                </h5>
                        <div className="rd-name mt-3">
                          <Link className="btn text-white theme-btn text-uppercase bg-info px-4 py-3 text-white h5 mb-0" to={'/leaderships'}>Learn More</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xl-3 col-md-6  cont_type_mob mb-4">
                <div className="position-relative cover-area">
                  <div className="const_img_mob"> <img className="img-fluid" alt="invertor" title="invertor" src={earningImg4} /> </div>
                  <div className="mob-ht  h-100 align-items-center gallery-area">
                    <div className="w-100  d-flex align-items-center h-100 ">
                      <div className="text-center flex-content-mob font-weight-normal w-100">
                        <h5 className="text-uppercase tab-sm  text-white">
                          News &  <br /> Events
                                                </h5>
                        <div className="rd-name mt-3">
                          <Link className="btn text-white theme-btn text-uppercase bg-info px-4 py-3 text-white h5 mb-0" to={'/news'}>Learn More</Link>
                        </div>
                      </div>
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

export default AnnualReportComponent;
