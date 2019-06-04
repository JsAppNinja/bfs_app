

//Import statement
import React, { Component } from 'react';
import binit from "../img/binit.jpg";

class InvestorsContactUsComponent extends Component {
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


    render() {
        return (
            <div className={"bg-gray" + (this.state.addClass ? ' head_sticky' : '')} >
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
                            <div className="col-md-12 mt-5 mb-2">
                                <h1 className="subboxes-heading text-left">Contact Us</h1>
                            </div>
                        </div>
                    </div>
                </section>
                 <section className="">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="font-weight-bold color-dark-gray mt-4 mb-0">Transfer Agent</h2>
                                <h4 className="mt-4">Computershare Investor Services</h4>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-sm-6 col-lg-4 col-md-6">
                              <h5> 211 Quality Circle, Suite 210, <br />
                                College Station, TX 77845 </h5>
                            </div>
                            <div className="col-sm-6 col-lg-4 col-md-6">
                                <h5>Domestic Shareowners <br />
                                877-219-7020</h5>
                            </div>
                        </div>
                          <div className="row mt-5">
                            <div className="col-md-12">
                                <h4>TDD for Hearing Impaired </h4>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-sm-6 col-lg-4 col-md-6">
                             <h5> Domestic Shareowners <br />
                               800-952-9245</h5>
                            </div>
                            <div className="col-sm-6 col-lg-4 col-md-6">
                                <h5>Foreign Shareowners:  <br />
                                732-563-7304</h5>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <h4>TDD for Hearing Impaired  </h4>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-sm-6 col-lg-4 col-md-6">
                             <h5> Foreign Shareowners: <br />
                               800-952-9245</h5>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-md-12">
                        <hr />

                        </div>
                    </div>
                </div>

        <section className="investor-relation">
          <div className="container">
              <div className="row">
                  <div className="col-md-12">
                        <h2 className="font-weight-bold color-dark-gray mt-4 mb-0">Investor Relations</h2>
                    </div>
               </div>
            <div className="row mt-4">
              <div className="col-md-4 col-lg-3 col-md-4 col-lg-3 pb-sm-5 pb-0">
                <figure className="mb-0 investor-img">
                  <img className="img-fluid rounded" alt="invertor" title="invertor" src={binit} />
                </figure>
              </div>
              <div className="col-md-8 col-lg-9 pl-4 py-3">
                <h1 className="Earnings-head text-dark font-weight-bold">Binit Sanghvi</h1>
                <h3><span>VP Investor Relations</span> <span className="divider-email">| </span><span className="email-detail">Email : binit.sanghvi@bldr.com</span></h3>
                <a href="#" className="btn theme-btn text-uppercase bg-info px-4 py-3 mt-4 mt-sm-0 d-inline-block login-blue text-white mb-4">Email Now</a>
              </div>

            </div>
          </div>
        </section>
                 <div className="container py-4">
                    <div className="row">
                        <div className="col-md-12">
                        <hr />

                        </div>
                    </div>
                </div>

        <section className="contactForm  pb-5">
          <div className="container">
              <div className="row">
                  <div className="col-md-12">
                   <h5> Or use the form below to submit questions or comments about the Investor Relations section of our site. * Required fields</h5>
                    </div>
               </div>
                 <form className="row form-inline mt-4">
                       
                            <div className="col-md-6">                        
                                <input type="text" className="form-control mb-3  w-100" placeholder="Name" />
                            </div>
                             <div className="col-md-6">   
                                <input type="email" className="form-control mb-3  w-100" placeholder="Email" />
                            </div>
                      
                            <div className="col-md-12">                        
                                <input type="text" className="form-control mb-3   w-100" placeholder="Subject" />
                            </div>
                        
                            <div className="col-md-12">                        
                                <textarea className="form-control mb-3 h-100-px w-100" placeholder="Comment"></textarea>
                            </div>
                            <div className="col-md-12 mt-3"> 
                                <button className="btn theme-btn text-uppercase bg-info px-5 py-3 d-inline-block  text-white d-none-mob">Submit</button>
                            </div>
                       
                    </form>
                    
              </div>
        </section>

            </div>
        );
    }
}

export default InvestorsContactUsComponent;
