
//Import statement
import React, { Component } from 'react';
import quartelyearning from "../img/Quarterly-Earning-bg.jpg";
import downloadpdf from "../img/download-pdf.jpg";

class FinancialInformationComponent extends Component {
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
            <div  className="bg-gray">


    <section className="stock-quote py-3">
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
        <section className="quartely-earning-banner position-relative mt-4">
               <div className="container">
                  <div className="row">
                     <div className="col-md-12 px-0">
                        <img className="img-fluid" alt="invertor" title="invertor" src={quartelyearning} />
                     </div>
                     <div className="col-md-12">
                        <div className="banner-heading text-left position-absolute w-100 px-5 py-2">
                           <h2 className="mb-0 font-weight-medium text-white">Financial Information</h2>
                        </div>
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
                         <div className="col-lg-8 col-md-9">
                            <h2 className="font-32 font-weight-bold color-dark-gray">
                              Latest Proxy Statement
                            </h2>
                            </div>
                           <div className="col-lg-4 col-md-3 text-md-right">
                                 <div className="dropdown">
                                      <span className="h6 font-weight-400">Year</span> &nbsp;<button type="button" className="btn btn-primary dropdown-toggle theme-dropdown" data-toggle="dropdown">
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
             <section className="my-5 financial-info share-related">
                <div className="container">
                    <div className="row">
                         <div className="col-md-6">
                            <h2 className="font-32 font-weight-bold color-dark-gray">
                             Share Related Items
                            </h2>
                         </div>
                    </div>
                     <div className="row mt-4">
                         <div className="col-md-12">
                                 <table className="w-100 table">
                                 <tbody>
                                          <tr>
                                                <td className="w-50">Market Capitalization (Mil)</td>
                                                 <td className="text-right w-50">$1,741.05</td>
                                          </tr>
                                             <tr>
                                                <td className="w-50">Shares Outstanding (Mil)   </td>
                                                 <td className="text-right w-50">115.61</td>
                                          </tr>
                                          <tr>
                                                <td className="w-50">Shares Outstanding, Average (FY) (Mil) </td>
                                                 <td className="text-right w-50">116.55</td>
                                          </tr>
                                          <tr>
                                                <td className="w-50">Float (Mil)    </td>
                                                 <td className="text-right w-50">113.35</td>
                                          </tr>
                                          </tbody>
                                  </table>
                              </div>
                      </div>
                </div>
            </section>

               
</div>

        );
    }
}

export default FinancialInformationComponent;
