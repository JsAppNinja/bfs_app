
//Import statement
import React, { Component } from 'react';
import quartelyearning from "../img/Quarterly-Earning-bg.jpg";
import addcalender from "../img/plus.svg";
import pdfsvg from "../img/pdf.svg";
import speaker from "../img/speaker.svg";




class InvestorsEventsComponent extends Component {
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
            <div className="bg-gray">
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
                                   <h2 className="mb-0 text-white">Events</h2>
                                </div>
                             </div>
                          </div>
                       </div>
                    </section>
                    <section className="section-event my-5">
                       <div className="container">
                          <div className="row">
                                 <div className="col-md-12">
                                    <h2 className="font-32  heading-outline position-relative color-dark-gray">Events & Presentations</h2>
                                    <h4 className="mt-5 mb-4">Upcoming Events</h4>
                                    </div>
                            </div>
                            <div className="row">
                                 <div className="col-lg-4 col-md-6  mb-5 mb-lg-0">
                                    <div className="border-right">
                                        <h5 className="font-600">Builders FirstSource First Quarter 2019 Earnings Conference Call</h5>
                                           <h6 className="font-600 my-4 py-2">
                                                May 3, 2019 <br />
                                                2:00 PM -3:00 PM EDT
                                           </h6>
                                            <div className="dropdown d-inline-block">
                                                <a class="dropdown-toggle dropdownPlus" data-toggle="dropdown" aria-expanded="false">
                                                    <h6 className="add-calender heading-outline position-relative">Add To Calender
                                                     <span className="ml-3"> <img className="img-fluid " alt="plus" title="plus" src={addcalender} /></span>
                                                     </h6>
                                                 </a>
                                                <ul className="dropdown-menu">
                                                    <li className="dropdown-item">Outlook Calender</li>
                                                    <li className="dropdown-item">Google Calender</li>
                                                    <li className="dropdown-item">Yahoo ! Calender</li>
                                                    <li className="dropdown-item">iCal  Calender</li>
                                                </ul>
                                         </div>
                                        
                                    </div>
                                 </div>
                                 <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                                    <div className="border-right">
                                        <h5 className="font-600">Builders FirstSource First Quarter 2019 Earnings Conference Call</h5>
                                           <h6 className="font-600 my-4 py-2">
                                                May 3, 2019 <br />
                                                2:00 PM -3:00 PM EDT
                                           </h6>
                                            <div className="dropdown d-inline-block">
                                                <a class="dropdown-toggle dropdownPlus" data-toggle="dropdown" aria-expanded="false">
                                                    <h6 className="add-calender heading-outline position-relative">Add To Calender
                                                     <span className="ml-3"> <img className="img-fluid " alt="plus" title="plus" src={addcalender} /></span>
                                                     </h6>
                                                 </a>
                                                <ul className="dropdown-menu">
                                                    <li className="dropdown-item">Outlook Calender</li>
                                                    <li className="dropdown-item">Google Calender</li>
                                                    <li className="dropdown-item">Yahoo ! Calender</li>
                                                    <li className="dropdown-item">iCal  Calender</li>
                                                </ul>
                                         </div>
                                    </div>
                                 </div>
                                 <div className="col-lg-4 col-md-6">
                                    <div className="">
                                        <h5 className="font-600">Builders FirstSource First Quarter 2019 Earnings Conference Call</h5>
                                           <h6 className="font-600 my-4 py-2">
                                                May 3, 2019 <br />
                                                2:00 PM -3:00 PM EDT
                                           </h6>
                                            <div className="dropdown d-inline-block">
                                                <a class="dropdown-toggle dropdownPlus" data-toggle="dropdown" aria-expanded="false">
                                                    <h6 className="add-calender heading-outline position-relative">Add To Calender
                                                     <span className="ml-3"> <img className="img-fluid " alt="plus" title="plus" src={addcalender} /></span>
                                                     </h6>
                                                 </a>
                                                <ul className="dropdown-menu">
                                                    <li className="dropdown-item">Outlook Calender</li>
                                                    <li className="dropdown-item">Google Calender</li>
                                                    <li className="dropdown-item">Yahoo ! Calender</li>
                                                    <li className="dropdown-item">iCal  Calender</li>
                                                </ul>
                                         </div>
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </section>
                    <section className="section-event  py-5">
                       <div className="container">
                     <div className="row">
                                    <div className="col-md-12">
                                     <h2 className="font-32  heading-outline position-relative color-dark-gray">Archived Events</h2>
                                                     <div className="table-responsive w-100 event-table mt-5">
                                                        <table className="w-100 table">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="mb-2"> Date </div> May 3, 2019 
                                                                    9:00 AM CDT 
                                                                 </td>
                                                                 <td>
                                                                     <div className="mb-2"> Description </div> 
                                                                      Builders FirstSource First Quarter 2019 Earnings Conference Call <br />
                                                                      <h6 className="cursor-pointer text-underline">
                                                                          <img className="img-fluid speakerImg" alt="" title="" src={speaker} />
                                                                          Listen to webcast
                                                                      </h6>
                                                                </td>
                                                                <td  className="viewFile">
                                                                    <div className="mb-2">View  </div>
                                                                    <img className="img-fluid" alt="pdf" title="pdf" src={pdfsvg} />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="mb-2"> Date </div>Mar 1, 2019 9:00 AM CST
                                                                 </td>
                                                                 <td>
                                                                     <div className="mb-2"> Description </div> 
                                                                      Builders FirstSource First Quarter 2018 Earnings Conference Call <br />
                                                                      <h6 className="cursor-pointer listn-web text-underline">
                                                                          <img className="img-fluid speakerImg" alt="" title="" src={speaker} />
                                                                          Listen to webcast
                                                                      </h6>
                                                                </td>
                                                                <td  className="viewFile">
                                                                    <div className="mb-2">View  </div>
                                                                    <img className="img-fluid" alt="pdf" title="pdf" src={pdfsvg} />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="mb-2"> Date </div>Nov 2, 2018 9:00 AM CDT 

                                                                 </td>
                                                                 <td>
                                                                     <div className="mb-2"> Description </div> 
                                                                    Builders FirstSource Third Quarter 2018 Earnings Conference Call <br />
                                                                      <h6 className="cursor-pointer listn-web text-underline">
                                                                          <img className="img-fluid speakerImg" alt="" title="" src={speaker} />
                                                                          Listen to webcast
                                                                      </h6>
                                                                </td>
                                                                <td  className="viewFile">
                                                                    <div className="mb-2">View  </div>
                                                                    <img className="img-fluid" alt="pdf" title="pdf" src={pdfsvg} />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="mb-2"> Date </div>Aug 8, 2018 9:00 AM CDT

                                                                 </td>
                                                                 <td>
                                                                     <div className="mb-2"> Description </div> 
                                                                  Builders FirstSource Second Quarter 2018 Earnings Conference Call <br />
                                                                      <h6 className="cursor-pointer listn-web text-underline">
                                                                          <img className="img-fluid speakerImg" alt="" title="" src={speaker} />
                                                                          Listen to webcast
                                                                      </h6>
                                                                </td>
                                                                <td  className="viewFile">
                                                                    <div className="mb-2">View  </div>
                                                                    <img className="img-fluid" alt="pdf" title="pdf" src={pdfsvg} />
                                                                </td>
                                                            </tr>
                                                              <tr>
                                                                <td>
                                                                    <div className="mb-2"> Date </div>May 10, 2018 10:00 AM CDT

                                                                 </td>
                                                                 <td>
                                                                     <div className="mb-2"> Description </div> 
                                                                  Builders FirstSource First Quarter 2018 Earnings Conference Call <br />
                                                                      <h6 className="cursor-pointer listn-web text-underline">
                                                                          <img className="img-fluid speakerImg" alt="" title="" src={speaker} />
                                                                          Listen to webcast
                                                                      </h6>
                                                                </td>
                                                                <td  className="viewFile">
                                                                    <div className="mb-2">View  </div>
                                                                    <img className="img-fluid" alt="pdf" title="pdf" src={pdfsvg} />
                                                                </td>
                                                            </tr>
                                                             <tr>
                                                                <td>
                                                                    <div className="mb-2"> Date </div> Mar 1, 2018 
                                                                       10:00 AM CST
                                                                 </td>
                                                                 <td>
                                                                     <div className="mb-2"> Description </div> 
                                                                 Builders FirstSource Fourth Quarter 2017 Earnings Conference Call <br />
                                                                      <h6 className="cursor-pointer listn-web text-underline">
                                                                          <img className="img-fluid speakerImg" alt="" title="" src={speaker} />
                                                                          Listen to webcast
                                                                      </h6>
                                                                </td>
                                                                <td  className="viewFile">
                                                                    <div className="mb-2">View  </div>
                                                                    <img className="img-fluid" alt="pdf" title="pdf" src={pdfsvg} />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="mb-2"> Date </div> Nov 9, 2017 
                                                                    9:00 AM CST
                                                                 </td>
                                                                 <td>
                                                                     <div className="mb-2"> Description </div> 
                                                                 Builders FirstSource Third Quarter 2017 Earnings Conference Call <br />
                                                                      <h6 className="cursor-pointer listn-web text-underline">
                                                                          <img className="img-fluid speakerImg" alt="" title="" src={speaker} />
                                                                          Listen to webcast
                                                                      </h6>
                                                                </td>
                                                                <td  className="viewFile">
                                                                    <div className="mb-2">View  </div>
                                                                    <img className="img-fluid" alt="pdf" title="pdf" src={pdfsvg} />
                                                                </td>
                                                            </tr>
                                                              <tr>
                                                                <td>
                                                                    <div className="mb-2"> Date </div> Aug 4, 2017 
                                                                    9:00 AM CDT
                                                                 </td>
                                                                 <td>
                                                                     <div className="mb-2"> Description </div> 
                                                                 Builders FirstSource Second Quarter 2017 Earnings Conference Call <br />
                                                                      <h6 className="cursor-pointer listn-web text-underline">
                                                                          <img className="img-fluid speakerImg" alt="" title="" src={speaker} />
                                                                          Listen to webcast
                                                                      </h6>
                                                                </td>
                                                                <td  className="viewFile">
                                                                    <div className="mb-2">View  </div>
                                                                    <img className="img-fluid" alt="pdf" title="pdf" src={pdfsvg} />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="mb-2"> Date </div> May 9, 2017 9:00 AM CDT
                                                                 </td>
                                                                 <td>
                                                                     <div className="mb-2"> Description </div> 
                                                                Builders FirstSource First Quarter 2017 Earnings Conference Call <br />
                                                                      <h6 className="cursor-pointer listn-web text-underline">
                                                                          <img className="img-fluid speakerImg" alt="" title="" src={speaker} />
                                                                          Listen to webcast
                                                                      </h6>
                                                                </td>
                                                                <td  className="viewFile">
                                                                    <div className="mb-2">View  </div>
                                                                    <img className="img-fluid" alt="pdf" title="pdf" src={pdfsvg} />
                                                                </td>
                                                            </tr>
                                                              <tr>
                                                                <td>
                                                                    <div className="mb-2"> Date </div> Mar 1, 2017 10:00 AM CST
                                                                 </td>
                                                                 <td>
                                                                     <div className="mb-2"> Description </div> 
                                                               Builders FirstSource Fourth Quarter and Fiscal Year End 2016 Earnings Conference Call <br />
                                                                      <h6 className="cursor-pointer listn-web text-underline">
                                                                          <img className="img-fluid speakerImg" alt="" title="" src={speaker} />
                                                                          Listen to webcast
                                                                      </h6>
                                                                </td>
                                                                <td  className="viewFile">
                                                                    <div className="mb-2">View  </div>
                                                                    <img className="img-fluid" alt="pdf" title="pdf" src={pdfsvg} />
                                                                </td>
                                                            </tr>
                                                           
                                                           
                                                        </tbody>
                                                        </table>
                                                    </div>
                                            </div>
                                    </div>
                         
                                     <div className="row">
                                                 <div className="col-md-12">
                                                <a className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mb-4" href="/about-us">View More</a>
                                                </div>
                                       </div>
                                 
                      </div>
                      </section>

        </div>

        );
    }
}

export default InvestorsEventsComponent;
