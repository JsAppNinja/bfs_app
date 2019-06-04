
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
class InvestorsNewsComponent extends Component {
   constructor(props) {
      super(props);

      //Defining state variable
      this.state = {
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

   render() {
      return (
         <div className={"investHome" + (this.state.addClass ? ' head_sticky' : '')}>
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
            <section className="main-heading">
               <div className="container">
                  <div className="row">
                     <div className="col-md-12 mt-5 mb-5 text-center">
                        <h1 className="subboxes-heading text-left">News</h1>
                     </div>
                  </div>
               </div>
            </section>
            <section className="investor-relation">
               <div className="container">
                  <div className="row row-eq-height">
                     <div className="col-12 mb-5 mb-lg-0">
                        <div className="invertor-bg p-4 border-top-blue h-100 invertor-news-release">
                           <h2 className="c-h2 text-uppercase font-weight-bold heading-blue mb-3">News Releases</h2>

                           <div className="row">
                              <div className="form-group col-6">
                                 <label for="category">Category: </label>
                                 <select class="custom-select" id="category">
                                    <option selected>Choose from list</option>
                                    <option value="1">General</option>
                                    <option value="2">In the News</option>
                                 </select>
                              </div>

                              <div className="form-group col-6">
                                 <label for="year">Year: </label>
                                 <select class="custom-select" id="year">
                                    <option selected>--Any--</option>
                                    <option value="1">2019</option>
                                    <option value="2">2018</option>
                                    <option value="3">2017</option>
                                    <option value="3">2016</option>
                                    <option value="3">2015</option>
                                    <option value="3">2014</option>
                                    <option value="3">2013</option>
                                    <option value="3">2012</option>
                                    <option value="3">2011</option>
                                    <option value="3">2010</option>
                                 </select>
                              </div>

                           </div>
                           <div className="collapse-accordion invertor-news-accordion" id="accordion2" aria-multiselectable="false">
                              <div className="card-custom position-relative mt-3 d-inline-block w-100">
                                 <div className="card-header p-0 bg-transparent border-0" role="tab" id="headingOne1">
                                    <h5 className="mb-0 d-flex align-items-lg-center">
                                       <a data-toggle="collapse" className="d-block bg-transparent text-link-news pl-4 text-dark" data-parent="#accordion2" href="#collapseOne1" aria-expanded="false" aria-controls="collapseOne">
                                          <span className="togle-active  txt-left-mob nav-item pl-2 py-0">Builders FirstSource Prices Offering of $400 Million of Senior Secured Notes due 2027</span>
                                       </a>
                                       <a className="ml-auto  download-pdf-news" href="#" download>
                                          <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                                       </a>
                                    </h5>
                                    <div className="date-acc-news px-2">
                                       <h6 className="px-4">May 22, 2019</h6>
                                    </div>
                                 </div>
                                 <div id="collapseOne1" className="collapse" role="tabpanel" aria-labelledby="headingOne2">
                                    <div className="card-block px-4">
                                       <div className="px-2">
                                          <p className="mb-0  pt-2">DALLAS , May 22, 2019 (GLOBE NEWSWIRE) -- Builders FirstSource, Inc. (Nasdaq: BLDR) (the "Company") today announced that it has priced an offering of $400 million aggregate principal amount of 6.750% Senior Secured Notes due 2027 (the "Notes"). The price to investors will be 100.0% of the principal</p>
                                          <a href="#" className="btn btn-link px-0">Read More</a>
                                       </div>
                                    </div>

                                 </div>
                              </div>

                              <div className="card-custom position-relative mt-3 d-inline-block w-100">
                                 <div className="card-header p-0 bg-transparent border-0" role="tab" id="headingOne1">
                                    <h5 className="mb-0 d-flex align-items-lg-center">
                                       <a data-toggle="collapse" className="d-block bg-transparent text-link-news  pl-4 text-dark" data-parent="#accordion2" href="#collapseOne2" aria-expanded="false" aria-controls="collapseOne">
                                          <span className="togle-active  txt-left-mob nav-item pl-2 py-0">Builders FirstSource Launches Offering of $300 Million of Senior Secured Notes due 2027</span>
                                       </a>
                                       <a className="ml-auto download-pdf-news" href="#" download>
                                          <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                                       </a>
                                    </h5>
                                    <div className="date-acc-news px-2">
                                       <h6 className="px-4">May 22, 2019</h6>
                                    </div>
                                 </div>
                                 <div id="collapseOne2" className="collapse" role="tabpanel" aria-labelledby="headingOne2">
                                    <div className="card-block px-4">
                                       <div className="px-2">
                                          <p className="mb-0  pt-2">DALLAS , May 21, 2019 (GLOBE NEWSWIRE) -- Builders FirstSource, Inc. (Nasdaq: BLDR) (the "Company") today announced that it has launched an offering of $300 million aggregate principal amount of Senior Secured Notes due 2027 (the "Notes"). The Company intends to use the net proceeds from the</p>
                                          <a href="#" className="btn btn-link px-0">Read More</a>
                                       </div>
                                    </div>

                                 </div>
                              </div>


                              <div className="card-custom position-relative mt-3 d-inline-block w-100">
                                 <div className="card-header p-0 bg-transparent border-0" role="tab" id="headingOne1">
                                    <h5 className="mb-0 d-flex align-items-lg-center">
                                       <a data-toggle="collapse" className="d-block bg-transparent text-link-news  pl-4 text-dark" data-parent="#accordion2" href="#collapseOne3" aria-expanded="false" aria-controls="collapseOne">
                                          <span className="togle-active  txt-left-mob nav-item pl-2 py-0">Builders FirstSource Reports First Quarter 2019 Results</span>
                                       </a>
                                       <a className="ml-auto download-pdf-news" href="#" download>
                                          <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                                       </a>
                                    </h5>
                                    <div className="date-acc-news px-2">
                                       <h6 className="px-4">May 22, 2019</h6>
                                    </div>
                                 </div>
                                 <div id="collapseOne3" className="collapse" role="tabpanel" aria-labelledby="headingOne2">
                                    <div className="card-block px-4">
                                       <div className="px-2">
                                          <p className="mb-0  pt-2">Solid market fundamentals and strategic execution support another strong quarterly performance DALLAS , May 02, 2019 (GLOBE NEWSWIRE) -- Builders FirstSource, Inc. (Nasdaq: BLDR) today reported its results for the first quarter ending March 31, 2019 . “The execution of our strategic priorities is</p>
                                          <a href="#" className="btn btn-link px-0">Read More</a>
                                       </div>
                                    </div>

                                 </div>
                              </div>


                              <div className="card-custom position-relative mt-3 d-inline-block w-100">
                                 <div className="card-header p-0 bg-transparent border-0" role="tab" id="headingOne1">
                                    <h5 className="mb-0 d-flex align-items-lg-center">
                                       <a data-toggle="collapse" className="d-block bg-transparent text-link-news  pl-4 text-dark" data-parent="#accordion2" href="#collapseOne4" aria-expanded="false" aria-controls="collapseOne">
                                          <span className="togle-active  txt-left-mob nav-item pl-2 py-0">Summary ToggleBuilders FirstSource Reports First Quarter 2019 Results</span>
                                       </a>
                                       <a className="ml-auto download-pdf-news" href="#" download>
                                          <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                                       </a>
                                    </h5>
                                    <div className="date-acc-news px-2">
                                       <h6 className="px-4">May 22, 2019</h6>
                                    </div>
                                 </div>
                                 <div id="collapseOne4" className="collapse" role="tabpanel" aria-labelledby="headingOne2">
                                    <div className="card-block px-4">
                                       <div className="px-2">
                                          <p className="mb-0  pt-2">DALLAS , May 21, 2019 (GLOBE NEWSWIRE) -- Builders FirstSource, Inc. (Nasdaq: BLDR) (the "Company") today announced that it has launched an offering of $300 million aggregate principal amount of Senior Secured Notes due 2027 (the "Notes"). The Company intends to use the net proceeds from the</p>
                                          <a href="#" className="btn btn-link px-0">Read More</a>
                                       </div>
                                    </div>

                                 </div>
                              </div>

                           </div>
                        </div>
                     </div>
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

export default InvestorsNewsComponent;
