
//Import statement
import React, { Component } from 'react';
import ReportDetail  from "../img/Report.jpg";
import earningImg from "../img/earing1.jpg";
import earningImg2 from "../img/earing2.jpg";
import earningImg3 from "../img/earing3.jpg";
import earningImg4 from "../img/earing4.jpg";
import pdfsvg from "../img/pdf.svg";


class AnnualReportComponent extends Component {
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
        </section>          <section className="annualReport position-relative py-3">
              <div className="container">
                          <div className="row mb-4">
                           <div className="col-md-12 mt-5 mb-2  text-center">
                              <h1 className="display-4 font-weight-medium color-dark-gray text-center">Annual Reports</h1>
                              </div>
                          </div>
                                  <div className="row mb-4">
                                             <div className="col-md-3 col-sm-4 mt-5 mb-2 text-center text-sm-left">
                                              <img className="img-fluid" alt="invertor" title="invertor" src={ReportDetail} />
                                              </div>
                                                <div className="col-md-9 col-sm-8 mt-5 mb-2 ">
                                                   <h1 className="text-center text-sm-left">2018</h1>
                                                         <div className="my-3" id="accordion">
                                                                       <div  className="card" id="AccordianHeading">
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
                                                                       <div  className="card" id="AccordianHeading">
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
                                                    <a className="btn theme-btn text-white  text-uppercase bg-info px-4 py-3 text-white h5 mb-0">Learn More</a>
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
                                                    <a className="btn theme-btn text-white text-uppercase bg-info px-4 py-3 text-white h5 mb-0">Learn More</a>
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
                                                    <a className="btn text-white theme-btn text-uppercase bg-info px-4 py-3 text-white h5 mb-0">Learn More</a>
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

export default AnnualReportComponent;
