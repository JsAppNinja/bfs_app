
//Import statement
import React, { Component } from 'react';
import Leaderimg1 from "../img/Leaderimg1.jpg";
import userprofileinvest from "../img/userProfile-invest.svg";
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import quartelyearning from "../img/Quarterly-Earning-bg.jpg";
import downloadpdf from "../img/download-pdf.jpg";
import htmlsvg from "../img/html.svg";
import pdfsvg from "../img/pdf.svg";
import xlssvg from "../img/xls.svg";
import { Link } from "react-router-dom";

class FinancialInformation2 extends Component {
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

    /**
      * To toggle menu
    */
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <div className={"bg-gray financialInfo2" +  (this.state.addClass ? ' head_sticky' : '')}>

                <section className="stock-quote py-3  sticky-navigation-invest">
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



                <section className="mt-5 financial-info  d-none d-xl-flex">
                    <div className="container">
                        <div className="row">
                            <Nav tabs className="nav-fill tab-none  nav nav-tabs mb-5 w-100">
                                <NavItem className="text-uppercase txt-left-mob nav-item" >
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '1' }) + " font-weight-medium font-weight-bold"}
                                        onClick={() => { this.toggle('1'); }}
                                    >
                                        Annual Reports
                              </NavLink>
                                </NavItem>
                                <NavItem className="text-uppercase txt-left-mob nav-item" >
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '2' }) + " font-weight-medium font-weight-bold"}
                                        onClick={() => { this.toggle('2'); }}
                                    >
                                        SEC Filings
                                </NavLink>
                                </NavItem>
                                <NavItem className="text-uppercase txt-left-mob nav-item" >
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '3' }) + " font-weight-medium font-weight-bold"}
                                        onClick={() => { this.toggle('3'); }}
                                    >
                                        Quarterly Results
                                </NavLink>
                                </NavItem>
                            </Nav>

                            <TabContent className="tab-none d-none d-xl-block w-100 mb-5" activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h2 className="font-32 font-weight-bold color-dark-gray">
                                                Latest Annual Report and 10-k
                            </h2>
                                        </div>
                                        <div className="col-md-4 text-md-right">
                                            <span className="h6 font-weight-400">Year</span> &nbsp;  <div className="dropdown d-inline-block">
                                                <button type="button" className="btn btn-primary dropdown-toggle theme-dropdown" data-toggle="dropdown">
                                                    2015
                                                    <i className="fa fa-angle-down float-right" aria-hidden="true"></i>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li className="dropdown-item">2016</li>
                                                    <li className="dropdown-item">2017</li>
                                                    <li className="dropdown-item">2018</li>
                                                </ul>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                                            <div className="position-relative Info-Download border-right">
                                                <h4>Second Quarter 2018 Financial Results</h4>
                                                <h6 className="DownloadPresentation">2017 Annual Report</h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                                            <div className="position-relative Info-Download border-right">
                                                <h4 className="">2018 Proxy Statement</h4>
                                                <h6 className="DownloadPresentation">Download Presentation</h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 mb-0">
                                            <div className="position-relative Info-Download border-right">
                                                <h4 className="">Form 10-Q</h4>
                                                <h6 className="DownloadPresentation">Download Presentation</h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 mb-0">
                                            <div className="position-relative Info-Download">
                                                <h4 className="">Form 11-s</h4>
                                                <h6 className="DownloadPresentation">Download Presentation</h6>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-md-12">
                                            <Link to={'/annualreport'} className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mb-4">View More</Link>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <h2 className="font-32 font-weight-bold color-dark-gray">
                                                SEC Filings
                            </h2>
                                        </div>
                                        <div className="col-md-8 text-md-right">
                                            <div className="d-inline-block mr-4">

                                                <div className="dropdown">
                                                    <span className="h6 font-weight-400">Year</span> &nbsp;<button type="button" className="btn d-inline-block btn-primary dropdown-toggle theme-dropdown" data-toggle="dropdown">
                                                        2017
                                                    <i className="fa fa-angle-down h4 float-right" aria-hidden="true"></i>
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li className="dropdown-item">2016</li>
                                                        <li className="dropdown-item">2017</li>
                                                        <li className="dropdown-item">2018</li>
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
                                            <div className="table-responsive w-100 Sec-filling-table">
                                                <table className="w-100 table">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div className="mb-2"> Form  </div>  S-1
                                             </td>
                                                            <td>
                                                                <div className="mb-2"> Description </div>  Registration statement for face-amount certificate companies
                                            </td>
                                                            <td>
                                                                <div className="mb-2"> Final Date   </div> Feb 14, 2005
                                             </td>
                                                            <td className="viewFile">
                                                                <div className="mb-2">View  </div>
                                                                <img className="img-fluid" alt="pdf" title="pdf" src={htmlsvg} />
                                                                <img className="img-fluid" alt="pdf" title="pdf" src={pdfsvg} />
                                                                <img className="img-fluid" alt="pdf" title="pdf" src={xlssvg} />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="mb-2"> Form  </div>  3
                                             </td>
                                                            <td>
                                                                <div className="mb-2"> Description </div>
                                                                Initial filing by director officer or owner of more than ten percent.
                                            </td>
                                                            <td>
                                                                <div className="mb-2"> Final Date   </div>   Jun 21, 2005
                                             </td>
                                                            <td className="viewFile">
                                                                <div className="mb-2">View  </div>
                                                                <img className="img-fluid" alt="pdf" title="pdf" src={htmlsvg} />
                                                                <img className="img-fluid" alt="pdf" title="pdf" src={pdfsvg} />
                                                                <img className="img-fluid" alt="pdf" title="pdf" src={xlssvg} />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="mb-2"> Form  </div>  S-1/A
                                             </td>
                                                            <td>
                                                                <div className="mb-2"> Description </div>
                                                                Amended Registration statement for face-amount certificate companies
                                            </td>
                                                            <td>
                                                                <div className="mb-2"> Final Date   </div>   Jun 15, 2005
                                             </td>
                                                            <td className="viewFile">
                                                                <div className="mb-2">View  </div>
                                                                <img className="img-fluid" alt="pdf" title="pdf" src={htmlsvg} />
                                                                <img className="img-fluid" alt="pdf" title="pdf" src={pdfsvg} />
                                                                <img className="img-fluid" alt="pdf" title="pdf" src={xlssvg} />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="mb-2"> Form  </div>  8-A12G
                                             </td>
                                                            <td>
                                                                <div className="mb-2"> Description </div>
                                                                Registration of certain classes of securities 12(g) of the Securities Exchange Act
                                            </td>
                                                            <td>
                                                                <div className="mb-2"> Final Date   </div>   Jun 14, 2005
                                             </td>
                                                            <td className="viewFile">
                                                                <div className="mb-2">View  </div>
                                                                <img className="img-fluid" alt="pdf" title="pdf" src={htmlsvg} />
                                                                <img className="img-fluid" alt="pdf" title="pdf" src={pdfsvg} />
                                                                <img className="img-fluid" alt="pdf" title="pdf" src={xlssvg} />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-md-12">
                                            <Link  to={'/sec-filings'} className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mb-4">View More</Link>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tabId="3">
                                    <div className="row">
                                        <div className="col-md-9 col-lg-8">
                                            <h2 className="font-weight-bold color-dark-gray">
                                                Latest Earnings Release and 10-Q
                            </h2>
                                        </div>
                                        <div className="col-md-3 col-lg-4 text-md-right">
                                            <div className="dropdown">
                                                <span className="h6 font-weight-400">Year</span> &nbsp; <button type="button" className="btn btn-primary d-inline-block dropdown-toggle theme-dropdown" data-toggle="dropdown">
                                                    2015
                                             <i className="fa fa-angle-down h4 float-right" aria-hidden="true"></i>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li className="dropdown-item">2016</li>
                                                    <li className="dropdown-item">2017</li>
                                                    <li className="dropdown-item">2018</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-lg-3 col-md-6 mb-5 mb-lg-0 ">
                                            <div className="position-relative Info-Download  border-right">
                                                <h4>Second Quarter 2018 Financial Results</h4>
                                                <h6 className="DownloadPresentation">Download Presentation</h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6">
                                            <div className="position-relative Info-Download  border-right">
                                                <h4 className="">Form 10-Q</h4>
                                                <h6 className="DownloadPresentation">Download Presentation</h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6">
                                            <div className="position-relative Info-Download  border-right">
                                                <h4 className="">Form 11-R</h4>
                                                <h6 className="DownloadPresentation">Download Presentation</h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6">
                                            <div className="position-relative Info-Download">
                                                <h4 className="">Form 12-S</h4>
                                                <h6 className="DownloadPresentation">Download Presentation</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-md-12">
                                            <Link to={'/quarterlyearning'} className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mb-4">View More</Link>
                                        </div>
                                    </div>
                                </TabPane>
                            </TabContent>
                        </div>
                    </div>
                </section>



                { /* Collpase for the responsive */}
                <section className="py-5  d-block d-xl-none financial-info2-mobile">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="collapse-accordion" id="accordion2" aria-multiselectable="false">
                                    <div className="card-custom position-relative ">
                                        <div className="card-header" role="tab" id="headingOne1">
                                            <h6 className="mb-0">
                                                <a data-toggle="collapse" className="d-block" data-parent="#accordion2" href="#collapseOne2" aria-expanded="true" aria-controls="collapseOne">
                                                    <span className="togle-active font-weight-bold  text-uppercase txt-left-mob nav-item">Annual Reports</span>
                                                </a>
                                            </h6>
                                        </div>
                                        <div id="collapseOne2" className="collapse show px-3" role="tabpanel" aria-labelledby="headingOne2">
                                            <div className="card-block">
                                                <div className="row mt-5">
                                                    <div className="col-md-9 col-lg-8">
                                                        <h2 className="font-32 font-weight-bold color-dark-gray">
                                                            Latest Annual Report and 10-k
                                                                                                      </h2>
                                                    </div>
                                                    <div className="col-md-3 col-lg-4 text-md-right">
                                                        <span className="h6 font-weight-400">Year</span> &nbsp;
                                                                                                          <div className="dropdown d-inline-block">
                                                            <button type="button" className="btn btn-primary dropdown-toggle theme-dropdown" data-toggle="dropdown">
                                                                2015
                                                                                                                        <i className="fa fa-angle-down float-right" aria-hidden="true"></i>
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                <li className="dropdown-item">2016</li>
                                                                <li className="dropdown-item">2017</li>
                                                                <li className="dropdown-item">2018</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row mt-4 ">
                                                    <div className="col-lg-3  col-sm-6 mb-4 mb-lg-0 ">
                                                        <div className="position-relative Info-Download border-right">
                                                            <h4>Second Quarter 2018 Financial Results</h4>
                                                            <h6 className="DownloadPresentation">2017 Annual Report</h6>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3  col-sm-6 mb-4 mb-lg-0 ">
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

                                                <div className="row mt-5 mb-5">
                                                    <div className="col-md-12">
                                                        <a className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mb-4">View More</a>
                                                    </div>
                                                </div>



                                            </div>
                                        </div>

                                    </div>



                                    <div className="card-custom position-relative SEC-Filings financial-info">
                                        <div className="card-header" role="tab" id="headingTwo2">
                                            <h6 className="mb-0">
                                                <a className="collapsed" className="d-block" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo2" aria-expanded="false" aria-controls="collapseTwo2">
                                                    <span className="font-weight-bold text-uppercase txt-left-mob nav-item">SEC Filings</span>
                                                </a>
                                            </h6>
                                        </div>
                                        <div id="collapseTwo2" className="collapse px-3" role="tabpanel" aria-labelledby="headingTwo2">
                                            <div className="card-block">

                                                <div className="row mt-5">
                                                    <div className="col-md-4">
                                                        <h2 className="font-32 font-weight-bold color-dark-gray">
                                                            SEC Filings
                                                                                            </h2>
                                                    </div>
                                                    <div className="col-md-8 text-md-right">
                                                        <div className="d-inline-block mr-4 mb-3 mb-sm-0">

                                                            <div className="dropdown">
                                                                <span className="h6 font-weight-400">Year</span> &nbsp;<button type="button" className="btn d-inline-block btn-primary dropdown-toggle theme-dropdown" data-toggle="dropdown">
                                                                    2017
                                                                                                                                  <i className="fa fa-angle-down h4 float-right" aria-hidden="true"></i>
                                                                </button>
                                                                <ul className="dropdown-menu">
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
                                                <div className="row mt-5 mb-5">
                                                    <div className="col-md-12">
                                                        <a className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mb-4">View More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="card-custom position-relative financial-info ">

                                    <div className="card-header" role="tab" id="headingThree2">
                                        <h6 className="mb-0">
                                            <a className="collapsed" className="d-block" data-toggle="collapse" data-parent="#accordion2" href="#collapseThree2" aria-expanded="false" aria-controls="collapseThree2">
                                                <span className="font-weight-bold text-uppercase txt-left-mob nav-item">QUARTERLY RESULTS</span>
                                            </a>
                                        </h6>
                                    </div>

                                    <div id="collapseThree2" className="collapse px-3" role="tabpanel" aria-labelledby="headingThree2">
                                        <div className="card-block">
                                            <div className="row mt-5">
                                                <div className="col-md-9 col-lg-8">
                                                    <h2 className="font-weight-bold color-dark-gray">
                                                        Latest Earnings Release and 10-Q
                                                                                          </h2>
                                                </div>
                                                <div className="col-md-3 col-lg-4 text-md-right">
                                                    <div className="dropdown">
                                                        <span className="h6 font-weight-400">Year</span> &nbsp; <button type="button" className="btn btn-primary d-inline-block dropdown-toggle theme-dropdown" data-toggle="dropdown">
                                                            2015
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

export default FinancialInformation2;
