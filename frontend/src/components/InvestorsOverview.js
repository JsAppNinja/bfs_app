
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

class InvestorsOverview extends Component {
    constructor(props) {
        super(props);

        //Defining state variable
        this.state = {

        };

    }

    componentDidUpdate() {
    }


    render() {
        return (

            <div>

                <section className="py-5">
                    <div className="container">
                        <div className="row  row-eq-height">
                        <div className="col-md-4 text-white mb-5 mb-md-0 d-none">
                              <div className="BLDR-Graph rounded invertor-bg p-4 box-shadow">
                               <h4 className="font-weight-bold">NASDAQ: BLDR</h4>
                                  <img className="img-fluid" alt="invertor" title="invertor" src={investgraph} />
                             </div>
                        </div>
                            <div className="col-md-12 flex-column   d-flex justify-content-center pl-md-5">

                                <h2 className="c-h2 text-uppercase font-weight-bold heading-blue heading-outline position-relative">
                                    Investors
                                  </h2>
                                <ul className="list-unstyled ul-home-invest mt-5">
                                    <li className="">
                                        <h6 className="mb-0 text-gray6">2018 Sales</h6>
                                        <h3 className="text-gray6">$7.7 Billion</h3>
                                    </li>
                                    <li className="">
                                        <h6 className="mb-0">2018 Sales</h6>
                                        <h5 className="text-gray6">$7.7 Billion</h5>

                                    </li>
                                    <li className="">
                                        <h6 className="mb-0">Associates</h6>
                                        <h5 className="text-gray6">15 Thousand</h5>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </section>
                <section className="investor-relation my-4">
                    <div className="container">
                        <div className="row row-eq-height">
                            <div className="col-lg-6 mb-5 mb-lg-0">
                                <div className="invertor-bg p-4 border-top-blue h-100">
                                    <h2 className="c-h2 text-uppercase font-weight-bold heading-blue mb-3">Investor Relations</h2>
                                    <p>Headquartered in Dallas, Texas, Builders FirstSource is the largest U.S supplier of building products, prefabricated components, and value-added services to the professional market segment for new residential construction and repair and remodeling.  We provide customers an integrated homebuilding solution, offering manufacturing, supply, delivery and installation of a full range of structural and related building products. We operate in 39 states with approximately 400 locations  and have a market presence in 75 of the top 100 Metropolitan Statistical Areas, providing geographic diversity and balanced end market exposure.  We service customers from strategically located distribution facilities and manufacturing facilities (some of which are co-located) that produce value-added products such as roof and floor trusses, wall panels, stairs, vinyl windows, custom millwork and pre-hung doors. Builders FirstSource also distributes dimensional lumber and lumber sheet goods, millwork, windows, interior and exterior doors, and other building products. </p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="invertor-bg p-4 border-top-blue h-100">
                                    <h2 className="c-h2 text-uppercase font-weight-bold heading-blue mb-3">Investor Relations</h2>
                                    <h3 className="text-gray6 font-weight-bold mb-0">Binit Sanghvi</h3>
                                    <h5 className="mb-0"> VP Investor Relations </h5>
                                    <h5> E-mail: <span className="heading-blue"> binit.sanghvi@bldr.com</span> </h5>
                                    <h2 className="c-h2 text-uppercase font-weight-bold heading-blue mb-2 mt-5"> Management</h2>
                                    <ul className="list-unstyled">
                                        <li className="mb-4">
                                            <h5 className="mb-0"> Chad Crow </h5>
                                            <h5 className="heading-blue">Director and Chief Executive Officer</h5>
                                        </li>
                                        <li className="mb-4">
                                            <h5 className="mb-0">Peter Jackson  </h5>
                                            <h5 className="heading-blue">Senior Vice President and Chief Financial Officer</h5>
                                        </li>
                                        <li className="mb-4">
                                            <h5 className="mb-0"> Donald F. McAleenan  </h5>
                                            <h5 className="heading-blue">Senior Vice President and General Counsel</h5>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="recent-release my-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="c-h2 text-uppercase font-weight-bold heading-blue mb-3">Recent Releases</h2>
                                <div className="table-responsive border-top-blue ">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="text-uppercase">Date</th>
                                                <th scope="col" className="text-uppercase">Document</th>
                                                <th scope="col" className="text-uppercase"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="p-4">
                                                <td className="py-4">May 2, 2019</td>
                                                <td className="py-4">Builders FirstSource Reports First Quarter 2019 Results</td>
                                                <td className="py-4">
                                                    <a href="#" download>
                                                        <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                                                    </a></td>
                                            </tr>
                                            <tr>
                                                <td className="py-4">May 4, 2019</td>
                                                <td className="py-4">Builders FirstSource to Host First Quarter 2019 Financial
                                            Results Conference Call and Webcast</td>
                                                <td className="py-4">
                                                    <a href="#" download>
                                                        <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-4">May 19, 2019</td>
                                                <td className="py-4">Builders FirstSource, Inc. Announces Termination of its
                                            Exchange Offer for its Senior Secured Notes due 2024</td>
                                                <td className="py-4">
                                                    <a href="#" download>
                                                        <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-4">May 5, 2019</td>
                                                <td className="py-4">Builders FirstSource, Inc. Announces Exchange Offer
                                            for its Senior Secured Notes due 2024</td>
                                                <td className="py-4">
                                                    <a href="#" download>
                                                        <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-4">Feb 28, 2019</td>
                                                <td className="py-4">Builders FirstSource Reports Fourth Quarter and
                                                Full Year 2018 Results</td>
                                                <td className="py-4">
                                                    <a href="#" download>
                                                        <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="col-12 text-center mob-xs-1  mt-5 p-0">
                                        <a class="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mb-4" href="">
                                            View All</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section className="bg-blue">

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

                </section> */}


            </div>
        );
    }
}

export default InvestorsOverview;
