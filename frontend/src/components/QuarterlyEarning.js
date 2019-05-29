
//Import statement
import React, { Component } from 'react';
import quartelyearning from "../img/Quarterly-Earning-bg.jpg";
import earningImg from "../img/earing1.jpg";
import earningImg2 from "../img/earing2.jpg";
import earningImg3 from "../img/earing3.jpg";
import earningImg4 from "../img/earing4.jpg";
import downloadBtn from "../img/download-button.svg";
import pdfsvg from "../img/pdf.svg";

class QuarterlyEarningComponent extends Component {
   constructor(props) {
      super(props);

      //Defining state variable
      this.state = {

      };

   }

   componentDidUpdate() {
   }

   expandcollapse() {
      // console.log("Hello");
   }

   checkForIE() {

      var ua = window.navigator.userAgent;
      var msie = ua.indexOf("MSIE ");

      if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
      {
         return true
      }
      else  // If another browser, return 0
      {
         return false
      }

   }
   render() {
      return (

         <div>
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
            <section className="quartely-earning-banner position-relative mt-4">
               <div className="container">
                  <div className="row">
                     <div className="col-md-12">
                        <img className="img-fluid" alt="invertor" title="invertor" src={quartelyearning} />
                     </div>
                     <div className="col-md-12">
                        <div className="banner-heading text-left position-absolute w-100 px-5 py-2">
                           <h2 className="mb-0 font-weight-medium text-white">Quarterly Earnings</h2>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            {/* IE fix */}
            {
               this.checkForIE() &&
               <div class="panel-group d-none" id="accordion">
                  <div class="panel panel-default">
                     <div class="panel-heading">
                        <h4 class="panel-title">
                           <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Collapsible Group 1</a>
                        </h4>
                     </div>
                     <div id="collapse1" class="panel-collapse collapse in">
                        <div class="panel-body">Lorem ipsum dolor sit amet</div>
                     </div>
                  </div>

               </div>
            }
            {/*/IE fix */}

            <section className="quartely-earning-accordian position-relative mb-5">
               <div className="container ">
                  <div className="row" id="accordion">
                     <div className="col-md-12 mt-5 mb-2">
                        <h1>2019</h1>
                        <div className="my-3">
                           <div className="card panel"  >
                              <div className="card-header  p-0" id="heading-1">
                                 <a className="accord_style h5  mb-0 py-2 px-4 collapsed" id="accord1" role="button" data-toggle="collapse" href="#collapse-1" aria-expanded="false" aria-controls="collapse-1" onClick={() => this.expandcollapse()}>
                                     First Quarter
                                       <i class="fa fa-angle-down h5" aria-hidden="true"></i>
                                 </a>

                              </div>
                              <div id="collapse-1" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                 <div className="card-body">
                                   <h4>Full Report</h4>
                                   <hr />
                                   <h6> <img className="img-fluid pdf-img" alt="pdf" title="pdf" src={pdfsvg} /> Builders FirstSource Reports First Quarter 2019 Results
                                    <span className="float-right font-12 text-download">Download</span>
                                   </h6>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="col-md-12 mt-4 mb-2">
                        <h1>2018</h1>
                        <div className="my-3"  >
                           <div className="card"  >
                              <div className="card-header  p-0" id="heading-1">
                                 <a className="accord_style h5  mb-0 py-2 px-4 collapsed" id="accord1" role="button" data-toggle="collapse" href="#collapse-11" aria-expanded="false" aria-controls="collapse-1" onClick={() => this.expandcollapse()}>
                                 Fourth Quarter
                                       <i class="fa fa-angle-down h5" aria-hidden="true"></i>
                                 </a>

                              </div>
                              <div id="collapse-11" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                 <div className="card-body">
                                    <h4>Full Report</h4>
                                   <hr />
                                   <h6> <img className="img-fluid pdf-img" alt="pdf" title="pdf" src={pdfsvg} /> Builders FirstSource Reports Fourth Quarter and Full Year 2018 Results
                                    <span className="float-right font-12 text-download">Download</span>
                                    </h6>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="my-3"  >
                           <div className="card"  >
                              <div className="card-header  p-0" id="heading-1">
                                 <a className="accord_style h5  mb-0 py-2 px-4 collapsed" id="accord1" role="button" data-toggle="collapse" href="#collapse-12" aria-expanded="false" aria-controls="collapse-1" onClick={() => this.expandcollapse()}>
                                    Third Quarter
                                       <i class="fa fa-angle-down h5" aria-hidden="true"></i>
                                 </a>

                              </div>
                              <div id="collapse-12" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                 <div className="card-body">
                                      <h4>Full Report</h4>
                                   <hr />
                                   <h6> <img className="img-fluid pdf-img" alt="pdf" title="pdf" src={pdfsvg} /> Builders FirstSource Reports Third Quarter 2018 Results
                                    <span className="float-right font-12 text-download">Download</span>
                                    </h6>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="my-3"  >
                           <div className="card"  >
                              <div className="card-header  p-0" id="heading-1">
                                 <a className="accord_style h5  mb-0 py-2 px-4 collapsed" id="accord1" role="button" data-toggle="collapse" href="#collapse-13" aria-expanded="false" aria-controls="collapse-1" onClick={() => this.expandcollapse()}>
                                   Second Quarter
                                       <i class="fa fa-angle-down h5" aria-hidden="true"></i>
                                 </a>

                              </div>
                              <div id="collapse-13" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                 <div className="card-body">
                                  <h4>Full Report</h4>
                                   <hr />
                                   <h6> <img className="img-fluid pdf-img" alt="pdf" title="pdf" src={pdfsvg} /> 
                                    Builders FirstSource Reports Second Quarter 2018 Results
                                    <span className="float-right font-12 text-download">Download</span>
                                    </h6>
                                  
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="my-3">
                           <div className="card"  >
                              <div className="card-header  p-0" id="heading-1">
                                 <a className="accord_style h5  mb-0 py-2 px-4 collapsed" id="accord1" role="button" data-toggle="collapse" href="#collapse-14" aria-expanded="false" aria-controls="collapse-1" onClick={() => this.expandcollapse()}>
                                   First Quarter
                                       <i class="fa fa-angle-down h5" aria-hidden="true"></i>
                                 </a>

                              </div>
                              <div id="collapse-14" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                 <div className="card-body">
                                 <h4>Full Report</h4>
                                   <hr />
                                   <h6> <img className="img-fluid pdf-img" alt="pdf" title="pdf" src={pdfsvg} /> 
                                   Builders FirstSource Reports First Quarter 2018 Results
                                    <span className="float-right font-12 text-download">Download</span>
                                 </h6>
                                 </div>
                              </div>
                           </div>
                        </div>

                     </div>

                     <div className="col-md-12 mt-4 mb-2">
                        <h1>2017</h1>
                        <div className="my-3"  >
                           <div className="card"  >
                              <div className="card-header  p-0" id="heading-1">
                                 <a className="accord_style h5  mb-0 py-2 px-4 collapsed" id="accord1" role="button" data-toggle="collapse" href="#collapse-21" aria-expanded="false" aria-controls="collapse-1" onClick={() => this.expandcollapse()}>
                                    Fourth Quarter
                                       <i class="fa fa-angle-down h5" aria-hidden="true"></i>
                                 </a>

                              </div>
                              <div id="collapse-21" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                 <div className="card-body">
                                   <h4>Full Report</h4>
                                   <hr />
                                   <h6> <img className="img-fluid pdf-img" alt="pdf" title="pdf" src={pdfsvg} /> 
                                   Builders FirstSource Reports Fourth Quarter and Fiscal 2017 Results
                                    <span className="float-right font-12 text-download">Download</span>
                                 </h6>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="my-3"  >
                           <div className="card"  >
                              <div className="card-header  p-0" id="heading-1">
                                 <a className="accord_style h5  mb-0 py-2 px-4 collapsed" id="accord1" role="button" data-toggle="collapse" href="#collapse-22" aria-expanded="false" aria-controls="collapse-1" onClick={() => this.expandcollapse()}>
                                   Third Quarter
                                       <i class="fa fa-angle-down h5" aria-hidden="true"></i>
                                 </a>

                              </div>
                              <div id="collapse-22" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                 <div className="card-body">
                                  <h6> <img className="img-fluid pdf-img" alt="pdf" title="pdf" src={pdfsvg} /> 
                                 Builders FirstSource Reports Third Quarter 2017 Results
                                    <span className="float-right font-12 text-download">Download</span>
                                 </h6>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="my-3"  >
                           <div className="card"  >
                              <div className="card-header  p-0" id="heading-1">
                                 <a className="accord_style h5  mb-0 py-2 px-4 collapsed" id="accord1" role="button" data-toggle="collapse" href="#collapse-23" aria-expanded="false" aria-controls="collapse-1" onClick={() => this.expandcollapse()}>
                                  Second Quarter
                                       <i class="fa fa-angle-down h5" aria-hidden="true"></i>
                                 </a>

                              </div>
                              <div id="collapse-23" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                 <div className="card-body">
                                     <h6> <img className="img-fluid pdf-img" alt="pdf" title="pdf" src={pdfsvg} /> 
                                Builders FirstSource Reports Second Quarter 2017 Results
                                    <span className="float-right font-12 text-download">Download</span>
                                 </h6>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="my-3"  >
                           <div className="card"  >
                              <div className="card-header  p-0" id="heading-1">
                                 <a className="accord_style h5  mb-0 py-2 px-4 collapsed" id="accord1" role="button" data-toggle="collapse" href="#collapse-24" aria-expanded="false" aria-controls="collapse-1" onClick={() => this.expandcollapse()}>
                                   First Quarter
                                       <i class="fa fa-angle-down h5" aria-hidden="true"></i>
                                 </a>

                              </div>
                              <div id="collapse-24" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                 <div className="card-body">
                                    <h6> <img className="img-fluid pdf-img" alt="pdf" title="pdf" src={pdfsvg} /> 
                              Builders FirstSource Reports First Quarter 2017 Results
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

            <section className="bottomLinks position-relative mb-5 d-none">
               <div className="container">
                  <div className="row">
                     <div className="col-lg-6 col-xl-3 col-md-12  cont_type_mob mb-4">
                        <div className="position-relative cover-area">
                           <span className="const_img_mob"> <img className="img-fluid" alt="invertor" title="invertor" src={earningImg} /> </span>
                           <div className="mob-ht  h-100 align-items-center gallery-area">
                              <div className="w-100 d-sm-flex d-md-flex d-lg-flex align-items-center h-100 ">
                                 <div className="text-center flex-content-mob font-weight-normal w-100">
                                    <h5 className="text-uppercase tab-sm  text-white">
                                       About Builders <br /> First Source
                                                </h5>
                                    <div className="rd-name mt-3">
                                       <a className="btn theme-btn text-white  text-uppercase bg-info px-4 py-3 text-white h5 mb-0">Learn More</a>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-6 col-xl-3 col-md-12 cont_type_mob mb-4">
                        <div className="position-relative cover-area">
                           <span className="const_img_mob"> <img className="img-fluid" alt="invertor" title="invertor" src={earningImg2} /> </span>
                           <div className="mob-ht  h-100 align-items-center gallery-area">
                              <div className="w-100 d-sm-flex d-md-flex d-lg-flex align-items-center h-100 ">
                                 <div className="text-center flex-content-mob font-weight-normal w-100">
                                    <h5 className="text-uppercase tab-sm  text-white">
                                       QUARTERLY  <br /> EARNINGS
                                                </h5>
                                    <div className="rd-name mt-3">
                                       <a className="btn theme-btn text-white text-uppercase bg-info px-4 py-3 text-white h5 mb-0">Learn More</a>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-6 col-xl-3 col-md-12  cont_type_mob mb-4">
                        <div className="position-relative cover-area">
                           <span className="const_img_mob"> <img className="img-fluid" alt="invertor" title="invertor" src={earningImg3} /> </span>
                           <div className="mob-ht  h-100 align-items-center gallery-area">
                              <div className="w-100 d-sm-flex d-md-flex d-lg-flex align-items-center h-100 ">
                                 <div className="text-center flex-content-mob font-weight-normal w-100">
                                    <h5 className="text-uppercase tab-sm  text-white">
                                       LEADERSHIP
                                                </h5>
                                    <div className="rd-name mt-3">
                                       <a className="btn text-white theme-btn text-uppercase bg-info px-4 py-3 text-white h5 mb-0">Learn More</a>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-6 col-xl-3 col-md-12  cont_type_mob mb-4">
                        <div className="position-relative cover-area">
                           <span className="const_img_mob"> <img className="img-fluid" alt="invertor" title="invertor" src={earningImg4} /> </span>
                           <div className="mob-ht  h-100 align-items-center gallery-area">
                              <div className="w-100 d-sm-flex d-md-flex d-lg-flex align-items-center h-100 ">
                                 <div className="text-center flex-content-mob font-weight-normal w-100">
                                    <h5 className="text-uppercase tab-sm  text-white">
                                       News &  <br /> Events
                                                </h5>
                                    <div className="rd-name mt-3">
                                       <a className="btn text-white theme-btn text-uppercase bg-info px-4 py-3 text-white h5 mb-0">Learn More</a>
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

export default QuarterlyEarningComponent;
