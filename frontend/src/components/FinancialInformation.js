
//Import statement
import React, { Component } from 'react';
import quartelyearning from "../img/Quarterly-Earning-bg.jpg";
import downloadpdf from "../img/download-pdf.jpg";
import ReportDetail from "../img/Report.jpg";
import earningImg from "../img/earing1.jpg";
import earningImg2 from "../img/earing2.jpg";
import earningImg3 from "../img/earing3.jpg";
import earningImg4 from "../img/earing4.jpg";
import pdfsvg from "../img/pdf.svg";
import { Link } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { BrowserRouter as Route } from 'react-router-dom';

class FinancialInformationComponent extends Component {
  constructor(props) {
    super(props);

    //Defining state variable
    this.state = {
      activeTab: '1',
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

  componentDidUpdate() {
  }


  render() {
    return (
      <div className={"bg-gray" + (this.state.addClass ? ' head_sticky' : '')}>
        <section className={"stock-quote py-3  sticky-navigation-invest"}>
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
        <section className="main-heading">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mt-5 mb-2  text-center">
                <h1 className="subboxes-heading text-left">Financial Information</h1>
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

        <section className="my-5 financial-info">
          <div className="container">
            <div className="row">
              <div className="col-md-9 col-lg-8">
                <h2 className="font-weight-bold color-dark-gray">
                  Latest Earnings Release and 10-Q
                            </h2>
              </div>
              <div className="col-md-3 col-lg-4 text-md-right">
                <div className="dropdown">
                  <span className="h6 font-weight-400">Year</span> &nbsp; <button type="button" className="btn btn-primary d-inline-block dropdown-toggle theme-dropdown" data-toggle="dropdown">
                    2019
                                             <i className="fa fa-angle-down h4 float-right" aria-hidden="true"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">2014</li>
                    <li className="dropdown-item">2013</li>
                    <li className="dropdown-item">2012</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                <div className="position-relative Info-Download   border-right">
                  <h4>Second Quarter 2018 Financial Results</h4>
                  <h6 className="DownloadPresentation">Download Presentation</h6>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                <div className="position-relative Info-Download  border-right">
                  <h4 className="">Form 10-Q</h4>
                  <h6 className="DownloadPresentation">Download Presentation</h6>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                <div className="position-relative Info-Download  border-right">
                  <h4 className="">Form 11-S</h4>
                  <h6 className="DownloadPresentation">Download Presentation</h6>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="position-relative Info-Download">
                  <h4 className="">Form 12-T</h4>
                  <h6 className="DownloadPresentation">Download Presentation</h6>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-12">
                <a className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mb-4">View More</a>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <hr />
            </div>
          </div>
        </div>
        <section className="my-5 financial-info">
          <div className="container">
            <div className="row">
              <div className="col-md-9 col-lg-8">
                <h2 className="font-32 font-weight-bold color-dark-gray">
                  Latest Annual Report and 10-k
                            </h2>
              </div>
              <div className="col-md-3 col-lg-4 text-md-right">
                <span className="h6 font-weight-400">Year</span> &nbsp;  <div className="dropdown d-inline-block">
                  <button type="button" className="btn btn-primary dropdown-toggle theme-dropdown" data-toggle="dropdown">
                    2019
                                                    <i className="fa fa-angle-down float-right" aria-hidden="true"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">2016</li>
                    <li className="dropdown-item">2017</li>
                    <li className="dropdown-item">2018</li>
                    <li className="dropdown-item">2019</li>

                  </ul>
                </div>
              </div>

            </div>

            <div className="row mt-4">
              <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0 ">
                <div className="position-relative Info-Download border-right">
                  <h4>Second Quarter 2018 Financial Results</h4>
                  <h6 className="DownloadPresentation">2017 Annual Report</h6>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0 ">
                <div className="position-relative Info-Download border-right">
                  <h4 className="">2018 Proxy Statement</h4>
                  <h6 className="DownloadPresentation">Download Presentation</h6>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                <div className="position-relative Info-Download  border-right">
                  <h4 className="">Form 10-Q</h4>
                  <h6 className="DownloadPresentation">Download Presentation</h6>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mb-0">
                <div className="position-relative Info-Download">
                  <h4 className="">Form 11-QT</h4>
                  <h6 className="DownloadPresentation">Download Presentation</h6>
                </div>
              </div>

            </div>
            <div className="row mt-5">
              <div className="col-md-12">
                <Link to={'/annualreport'} className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mb-4">View More</Link>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <hr />
            </div>
          </div>
        </div>
        <section className="my-5 SEC-Filings financial-info">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h2 className="font-32 font-weight-bold color-dark-gray">
                  SEC Filings
                            </h2>
              </div>
              <div className="col-md-8 text-md-right">
                <div className="d-inline-block mr-4 mb-3 mb-sm-0">

                  <div className="dropdown">
                    <span className="h6 font-weight-400">Year</span> &nbsp;<button type="button" className="btn d-inline-block btn-primary dropdown-toggle theme-dropdown" data-toggle="dropdown">
                      2019


                                                    <i className="fa fa-angle-down h4 float-right" aria-hidden="true"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item">2019</li>

                      <li className="dropdown-item">2018</li>
                      <li className="dropdown-item">2017 </li>
                      <li className="dropdown-item">2016</li>
                      <li className="dropdown-item">2015 </li>
                      <li className="dropdown-item">2014</li>
                    </ul>
                  </div>

                </div>
                <div className="d-inline-block">

                  <div className="dropdown">
                    <span className="h6 font-weight-400">Group</span> &nbsp; <button type="button" className="btn btn-primary d-inline-block dropdown-toggle group-dropdown theme-dropdown" data-toggle="dropdown">
                      Choose from List
                                                 <i className="fa fa-angle-down h4 float-right" aria-hidden="true"></i>
                    </button>
                    <ul className="dropdown-menu group-dropdown-show">

                      <li>Annual Filling</li>
                      <li>Curent Report</li>
                      <li>3 ,4,5</li>
                      <li>Annual Filling</li>
                      <li>Mergers & acquisitions</li>
                      <li>Others</li>
                      <li>Proxy Filling</li>
                      <li>Quaretly Filling</li>
                      <li>Registration statement</li>
                    </ul>
                  </div>
                </div>

              </div>
              <div className="row">

              </div>

            </div>
            <div className="row mt-5">
              <div className="col-md-12">
                <div className="table-responsive w-100">
                  <table className="w-100 table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Filling</th>
                        <th>Description</th>
                        <th>Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>May 24, 2019</td>
                        <td>8-K</td>
                        <td>Report of unscheduled material events or corporate event</td>
                        <td><img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} /></td>
                      </tr>
                      <tr>
                        <td>May 24, 2019</td>
                        <td>8-K</td>
                        <td>Report of unscheduled material events or corporate event</td>
                        <td><img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} /></td>
                      </tr>
                      <tr>
                        <td>May 24, 2019</td>
                        <td>8-K</td>
                        <td>Report of unscheduled material events or corporate event</td>
                        <td><img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} /></td>
                      </tr>
                      <tr>
                        <td>May 24, 2019</td>
                        <td>8-K</td>
                        <td>Report of unscheduled material events or corporate event</td>
                        <td> <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-12">
                <Link to={'/sec-filings'} className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mb-4">View More</Link>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <hr />
            </div>
          </div>
        </div>
        <section className="my-5 financial-info">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-9">
                <h2 className="font-32 font-weight-bold color-dark-gray">
                  Latest Proxy Statement
                                </h2>
              </div>
              <div className="col-lg-4 col-md-3 text-md-right">
                <div className="dropdown">
                  <span className="h6 font-weight-400">Year</span> &nbsp;<button type="button" className="btn btn-primary dropdown-toggle theme-dropdown" data-toggle="dropdown">
                    2019
                                             <i className="fa fa-angle-down h4 float-right" aria-hidden="true"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">2016</li>
                    <li className="dropdown-item">2017</li>
                    <li className="dropdown-item">2018</li>
                    <li className="dropdown-item">2019</li>

                  </ul>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                <div className="position-relative Info-Download border-right">
                  <h4 className="mb-0">DEF 14A</h4>
                  <i className="h6">Apr 12, 2019</i>
                  <h6 className="DownloadPresentation mt-3">Download Presentation</h6>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                <div className="position-relative Info-Download border-right">
                  <h4 className="mb-0">DEFA14A</h4>
                  <i className="h6">Apr 12, 2019</i>
                  <h6 className="DownloadPresentation mt-3">Download Presentation</h6>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                <div className="position-relative Info-Download border-right">
                  <h4 className="mb-0">DEF 15AB </h4>
                  <i className="h6">Apr 12, 2019</i>
                  <h6 className="DownloadPresentation mt-3">Download Presentation</h6>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="position-relative Info-Download">
                  <h4 className="mb-0">DEF 16A</h4>
                  <i className="h6">Apr 12, 2019</i>
                  <h6 className="DownloadPresentation mt-3">Download Presentation</h6>
                </div>
              </div>

            </div>
            <div className="row mt-5">
              <div className="col-md-12">
                <a className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mb-4">View More</a>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <hr />
            </div>
          </div>
        </div>

        <section className="annualReport position-relative py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 class="font-32 font-weight-bold color-dark-gray">Annual Report</h2>
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

        <section className="bottomLinks position-relative my-4">
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

export default FinancialInformationComponent;
