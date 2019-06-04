

//Import statement
import React, { Component } from 'react';
import binit from "../img/binit.jpg";

class FaqComponent extends Component {
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

   expandcollapse() {
      // console.log("Hello");
   }

   render() {
      return (
         <div className={"bg-gray" + (this.state.addClass ? ' head_sticky' : '')} >
            <section className={"stock-quote py-3 sticky-navigation-invest"}>
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
                        <h1 className="subboxes-heading text-left">FAQ</h1>
                     </div>
                  </div>
               </div>
            </section>

            <section className="theme-accordian pt-4 pb-5">
               <div className="container">
                  <div className="row" id="accordion">
                     <div className="col-md-6">
                        <div className="my-3"  >
                           <div className="card"  >
                              <div className="card-header  p-0" id="heading-1">
                                 <a className="accord_style h5  mb-0 py-2 px-4 collapsed" id="accord1" role="button" data-toggle="collapse" href="#faq1" aria-expanded="false" aria-controls="collapse-1" onClick={() => this.expandcollapse()}>
                                    Who is BLDR's transfer agent?
                                       <i className="fa fa-angle-down h5" aria-hidden="true"></i>
                                 </a>
                              </div>
                              <div id="faq1" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                 <div className="card-body">
                                    <ul className="list-unstyled yearlyDetailUl">
                                       <li>Computershare Shareowner Services LLC</li>
                                       <li>480 Washington Boulevard</li>
                                       <li>Domestic Shareowners: 877-219-7020</li>
                                       <li>TDD for Hearing Impaired Domestic Shareowners: 800-231-5469</li>
                                       <li>Foreign Shareowners: 201-680-6578</li>
                                       <li>TDD for Hearing Impaired Foreign Shareowners: 201-680-6610</li>
                                       <li> www.bnymellon.com/shareowner/equityaccess</li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="col-md-6">
                        <div className="my-3"  >
                           <div className="card"  >
                              <div className="card-header  p-0" id="heading-1">
                                 <a className="accord_style h5  mb-0 py-2 px-4 collapsed" id="accord1" role="button" data-toggle="collapse" href="#faq2" aria-expanded="false" aria-controls="collapse-1" onClick={() => this.expandcollapse()}>
                                    What is a transfer agent?
                                       <i className="fa fa-angle-down h5" aria-hidden="true"></i>
                                 </a>
                              </div>
                              <div id="faq2" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                 <div className="card-body">
                                    <p>A transfer agent and registrar for a publicly held company keeps records of every outstanding stock certificate and the name of the person to whom it is registered. When stock changes hands, the transfer agent transfers the ownership of the stock from the seller's name to the buyer's name. The registrar reconciles all transfer records and makes sure that the number of shares debited is equal to the number of shares credited.
                                   The Company's transfer agent is Computershare Shareowner Services LLC. </p>

                                    <p>The transfer agent does not maintain records of shares bought and
                                    sold through brokerage accounts. Those records are maintained by the specific
 brokerages through which the shares are bought and sold</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>



                     <div className="col-md-6">
                        <div className="my-3"  >
                           <div className="card"  >
                              <div className="card-header  p-0" id="heading-1">
                                 <a className="accord_style h5  mb-0 py-2 px-4 collapsed" id="accord1" role="button" data-toggle="collapse" href="#faq3" aria-expanded="false" aria-controls="collapse-1" onClick={() => this.expandcollapse()}>
                                    When did BLDR go public?
                                       <i className="fa fa-angle-down h5" aria-hidden="true"></i>
                                 </a>
                              </div>
                              <div id="faq3" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                 <div className="card-body">

                                    <p>BLDR went public on June 22, 2005, at a price of $16.00 per share.</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="col-md-6">
                        <div className="my-3"  >
                           <div className="card"  >
                              <div className="card-header  p-0" id="heading-1">
                                 <a className="accord_style h5  mb-0 py-2 px-4 collapsed" id="accord1" role="button" data-toggle="collapse" href="#faq4" aria-expanded="false" aria-controls="collapse-1" onClick={() => this.expandcollapse()}>
                                    Does BLDR pay dividends?
                                       <i className="fa fa-angle-down h5" aria-hidden="true"></i>
                                 </a>
                              </div>
                              <div id="faq4" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                 <div className="card-body">

                                    <p>BLDR does not pay a dividend on stock, and does not foresee doing so in the immediate future. Accordingly, BLDR does not offer a DRIP (Dividend Reinvestment Program).</p>
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

export default FaqComponent;
