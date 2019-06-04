

//Import statement
import React, { Component } from 'react';

class InvestorsEmailAlertComponent extends Component {
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
                                <h1 className="subboxes-heading text-left mb-4">Email Alert Subscription</h1>
                                <h5>If you have already signed up for Builders FirstSource, Inc. Email Alerts, please enter your email address in the field below and submit. A confirmation email will be sent. Please click on the link provided in the confirmation email to view your alert subscription</h5>
                            </div>
                        </div>
                    </div>
                </section>
                 <section className="alert-Subscription pb-5 mt-5">
                    <div className="container  sec-bg border-top-blue p-5">
                        <div className="row">
                            <div className="col-md-12 mb-2">
                                <h2 className="font-weight-bold color-dark-gray mb-0">Alerts Type *</h2>
                            </div>
                        </div>
                         <div className="row alert-Type">
                                     <div className="col-xl-3 col-md-4 col-sm-6 mt-3 mb-2">
                                        <input type="checkbox" className="mr-3" name="" value="" /> Quote By Email<br />
                                    </div>
                                     <div className="col-xl-3 col-md-4 col-sm-6 mt-3 mb-2">
                                        <input type="checkbox" className="mr-3"  name="" value="" />  All SEC Filings<br />
                                    </div>
                                    <div className="col-xl-3 col-md-4 col-sm-6 mt-3 mb-2">
                                        <input type="checkbox" className="mr-3"  name="" value="" /> Insider Transactions<br />
                                    </div>
                                    <div className="col-xl-3 col-md-4 col-sm-6 mt-3 mb-2">
                                        <input type="checkbox" className="mr-3"  name="" value="" /> Quarterly and Annual Reports<br />
                                    </div>
                                    <div className="col-xl-3 col-md-4 col-sm-6 mt-3 mb-2">
                                        <input type="checkbox" className="mr-3"  name="" value="" />  All SEC Filings<br />
                                    </div>
                                    <div className="col-xl-3 col-md-4 col-sm-6 mt-3 mb-2">
                                        <input type="checkbox" className="mr-3"  name="" value="" /> Insider Transactions<br/>
                                   </div>
                                   <div className="col-xl-3 col-md-4 col-sm-6 mt-3 mb-2">
                                        <input type="checkbox" className="mr-3"  name="" value="" />Weekly summary<br/>
                                   </div>
                            </div>
                        <div className="row">
                            <div className="col-md-12 mb-sm-0 mb-5">
                                <h2 className="font-weight-bold color-dark-gray mt-4 mb-0">Email</h2>
                                 <form>
                                     <input type="text" className="form-control my-3 w-100 theme-form-control" placeholder="Email" />
                                      <button className="btn theme-btn text-uppercase  my-2 bg-info px-5 py-3 d-inline-block  text-white d-none-mob">Submit</button>
                                    <h6 className="mt-4 text-underline">Unsubscribe from Investor Relations email alerts.</h6>
                                </form>
                            </div>
                      </div>
                    </div>
        </section>

            </div>
        );
    }
}

export default InvestorsEmailAlertComponent;
