
//Import statement
import React, { Component } from 'react';
import investorbanner from "../img/investor-banner.jpg";
import investgraph from "../img/invest-graph.jpg";
import Leaderimg1 from "../img/Leaderimg1.jpg";
import userprofileinvest from "../img/userProfile-invest.svg";
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from "react-router-dom";

class InvesterComponent extends Component {
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
  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
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

      <div className={"invertor-relation " + (this.state.addClass ? 'head_sticky' : '')}>
        <section className="stock-quote py-3 sticky-navigation-invest">
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
                <h1 className="subboxes-heading text-left">Leadership</h1>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-3">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <ul className="list-unstyled menu-company-hightlight text-center">
                <li className="list-inline-item  py-2 py-lg-4" ><Link to={'/investorhome'} className="">Company Highlights</Link></li>
                  <li className="list-inline-item active py-2 py-lg-4" ><Link to={'/governance'} className="">Governance</Link></li>
                  <li className="list-inline-item py-2 py-lg-4"><Link to={'/news'} className="">News</Link></li>
                  <li className="list-inline-item  py-2 py-lg-4"><Link to={'/events'} className="">Events</Link></li>
                  <li className="list-inline-item  py-2 py-lg-4"><Link to={'/stock-info'} className="">Stock Information</Link></li>
                  <li className="list-inline-item  py-2 py-lg-4"><Link to={'/financial-info'} className="">Financial Information</Link></li>
                  <li className="list-inline-item  py-2 py-lg-4"><Link to={'/email-alert'}className="">Email Alerts</Link></li>
                  <li className="list-inline-item  py-2 py-lg-4"><Link to={'/faq'} className="">FAQs</Link></li>
                  <li className="list-inline-item  py-2 py-lg-4"><Link to={'/contact'} className="">Contact Us</Link></li>
                </ul>
              </div>
            </div>

          </div>

        </section>
        {/* <section className="py-5">
          <div className="container">
            <div className="row  row-eq-height">
              <div className="col-lg-4 text-white mb-5 mb-lg-0">
                <div className="BLDR-Graph rounded invertor-bg p-4 box-shadow">
                  <h4 className="font-weight-bold">NASDAQ: BLDR</h4>
                  <img className="img-fluid" alt="invertor" title="invertor" src={investgraph} />
                </div>
              </div>
              <div className="col-lg-8">
                <ul className="list-unstyled invertor-detail">
                  <li className="list-inline-item mr-5 mb-0 heading-blue text-uppercase heading-blue">
                    2018 Sales:$7.7 Billion
                  </li>
                  <li className="list-inline-item mr-5 mb-0 text-uppercase heading-blue">
                    Associates:15 Thousand
                  </li>
                  <li className="list-inline-item mb-0 text-uppercase heading-blue">
                    operations in 38 states
                  </li>

                </ul>
                <p className="font-paragraph mt-3">Headquartered in Dallas, Texas, Builders FirstSource is the largest U.S supplier of building products, prefabricated components, and value-added services to the professional market segment for new residential construction and repair and remodeling.  We provide customers an integrated homebuilding solution, offering manufacturing, supply, delivery and installation of a full range of structural and related building products. We operate in 39 states with approximately 400 locations  and have a market presence in 75 of the top 100 Metropolitan Statistical Areas, providing geographic diversity and balanced end market exposure.  We service customers from strategically located distribution facilities and manufacturing facilities (some of which are co-located) that produce value-added products such as roof and floor trusses, wall panels, stairs, vinyl windows, custom millwork and pre-hung doors. Builders FirstSource also distributes dimensional lumber and lumber sheet goods, millwork, windows, interior and exterior doors, and other building products. </p>

              </div>
            </div>
          </div>
        </section> */}
        <section className="leader-ship my-4">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 d-none">
                <h2 className="display-4 font-weight-medium color-dark-gray text-center">Leadership</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="py-lg-5 px-0">

                  {/* Responsive */}
                  <div className="collapse-accordion d-block d-xl-none" id="accordion2" aria-multiselectable="false">
                    <div className="card-custom position-relative mt-3">
                      <div className="card-header" role="tab" id="headingOne1">
                        <h6 className="mb-0">
                          <a data-toggle="collapse" className="d-block" data-parent="#accordion2" href="#collapseOne2" aria-expanded="true" aria-controls="collapseOne">
                            <span className="togle-active font-weight-bold  text-uppercase txt-left-mob nav-item">OUR LEADERSHIP</span>
                          </a>
                        </h6>
                      </div>
                      <div id="collapseOne2" className="collapse show" role="tabpanel" aria-labelledby="headingOne2">
                        <div className="card-block">
                          <div className="row mt-4 ">
                            <div className="col-lg-4 col-sm-6 mb-5 mb-lg-0">
                              <div className="h-100 ourLeader position-relative">
                                <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                                <div className="leaderDetail p-4 position-absolute w-100">
                                  <h3 className="text-white mb-1">Chad Crow </h3>
                                  <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mb-5 mb-lg-0">
                              <div className="h-100 ourLeader position-relative">
                                <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                                <div className="leaderDetail p-4 position-absolute w-100">
                                  <h3 className="text-white mb-1">Chad Crow </h3>
                                  <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                                </div>
                              </div>
                            </div>  <div className="col-lg-4 col-sm-6 mb-5 mb-lg-0">
                              <div className="h-100 ourLeader position-relative">
                                <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                                <div className="leaderDetail p-4 position-absolute w-100">
                                  <h3 className="text-white mb-1">Chad Crow </h3>
                                  <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                                </div>
                              </div>
                            </div>  <div className="col-lg-4 col-sm-6 mb-5 mb-lg-0">
                              <div className="h-100 ourLeader position-relative">
                                <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                                <div className="leaderDetail p-4 position-absolute w-100">
                                  <h3 className="text-white mb-1">Chad Crow </h3>
                                  <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mb-5 mb-lg-0">
                              <div className="h-100 ourLeader position-relative">
                                <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                                <div className="leaderDetail p-4 position-absolute w-100">
                                  <h3 className="text-white mb-1">Chad Crow </h3>
                                  <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mb-5 mb-lg-0">
                              <div className="h-100 ourLeader position-relative">
                                <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                                <div className="leaderDetail p-4 position-absolute w-100">
                                  <h3 className="text-white mb-1">Chad Crow </h3>
                                  <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 text-center  pt-lg-5 px-0">
                              <button type="button" className="mt-3  btn theme-btn text-uppercase bg-red px-4 py-3 d-inline-block login-blue text-white mb-4 cursor-pointer">View all </button>
                            </div>

                          </div>
                        </div>
                    
                      </div>
                    </div>
                    <div className="card-custom position-relative">
                      <div className="card-header" role="tab" id="headingTwo2">
                        <h6 className="mb-0">
                          <a className="collapsed d-block" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo2" aria-expanded="false" aria-controls="collapseTwo2">
                            <span className="font-weight-bold text-uppercase txt-left-mob nav-item">EXECUTIVE OFFICERS</span>
                          </a>
                        </h6>
                      </div>
                      <div id="collapseTwo2" className="collapse" role="tabpanel" aria-labelledby="headingTwo2">
                        <div className="card-block">
                          <div className="row row-eq-height mt-4 ">
                            <div className="col-lg-4 col-sm-6 mb-5 mb-lg-0">
                              <div className="h-100 ourLeader position-relative">
                                <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                                <div className="leaderDetail p-4 position-absolute w-100">
                                  <h3 className="text-white mb-1">Chad Crow </h3>
                                  <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mb-5 mb-lg-0">
                              <div className="h-100 ourLeader position-relative">
                                <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                                <div className="leaderDetail p-4 position-absolute w-100">
                                  <h3 className="text-white mb-1">Chad Crow </h3>
                                  <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                                </div>
                              </div>
                            </div> <div className="col-lg-4 col-sm-6 mb-5 mb-lg-0">
                              <div className="h-100 ourLeader position-relative">
                                <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                                <div className="leaderDetail p-4 position-absolute w-100">
                                  <h3 className="text-white mb-1">Chad Crow </h3>
                                  <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mb-5 mb-lg-0">
                              <div className="h-100 ourLeader position-relative">
                                <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                                <div className="leaderDetail p-4 position-absolute w-100">
                                  <h3 className="text-white mb-1">Chad Crow </h3>
                                  <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 text-center  pt-lg-5 px-0">
                              <button type="button" className="mt-3  btn theme-btn text-uppercase bg-red px-4 py-3 d-inline-block login-blue text-white mb-4 cursor-pointer">View all </button>
                            </div>
                          </div>
                        </div>
              
                      </div>
                    </div>
                    <div className="card-custom position-relative">
                      <div className="card-header" role="tab" id="headingThree2">
                        <h6 className="mb-0">
                          <a className="collapsed d-block" data-toggle="collapse" data-parent="#accordion2" href="#collapseThree2" aria-expanded="false" aria-controls="collapseThree2">
                            <span className="font-weight-bold text-uppercase txt-left-mob nav-item">BOARD OF DIRECTORS</span>
                          </a>
                        </h6>
                      </div>
                      <div id="collapseThree2" className="collapse" role="tabpanel" aria-labelledby="headingThree2">
                        <div className="card-block">
                          <div className="row row-eq-height mt-4 ">
                            <div className="col-lg-4 col-sm-6 mb-5 mb-lg-0">
                              <div className="h-100 ourLeader position-relative">
                                <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                                <div className="leaderDetail p-4 position-absolute w-100">
                                  <h3 className="text-white mb-1">Chad Crow </h3>
                                  <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mb-5 mb-lg-0">
                              <div className="h-100 ourLeader position-relative">
                                <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                                <div className="leaderDetail p-4 position-absolute w-100">
                                  <h3 className="text-white mb-1">Chad Crow </h3>
                                  <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mb-5 mb-lg-0">
                              <div className="h-100 ourLeader position-relative">
                                <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                                <div className="leaderDetail p-4 position-absolute w-100">
                                  <h3 className="text-white mb-1">Chad Crow </h3>
                                  <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 text-center  pt-lg-5 px-0">
                              <button type="button" className="mt-3  btn theme-btn text-uppercase bg-red px-4 py-3 d-inline-block login-blue text-white mb-4 cursor-pointer">View all </button>
                            </div>
                          </div>
                        </div>
 
                      </div>
                    </div>
                  </div>
                  <Nav tabs className="nav-fill tab-none d-none d-xl-flex  nav nav-tabs mb-5">
                    <NavItem className="text-uppercase txt-left-mob nav-item" >
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '1' }) + " font-weight-medium font-weight-bold"}
                        onClick={() => { this.toggle('1'); }}
                      >
                        Our Leadership
                      </NavLink>
                    </NavItem>
                    <NavItem className="text-uppercase txt-left-mob nav-item" >
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '2' }) + " font-weight-medium font-weight-bold"}
                        onClick={() => { this.toggle('2'); }}
                      >
                        Executive Officers
                        </NavLink>
                    </NavItem>
                    <NavItem className="text-uppercase txt-left-mob nav-item" >
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '3' }) + " font-weight-medium font-weight-bold"}
                        onClick={() => { this.toggle('3'); }}
                      >
                        Board of Directors
                        </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent className="tab-none d-none d-xl-block" activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <div className="row mt-4 ">
                        <div className="col-lg-4 col-md-6 mb-5">
                          <div className="h-100 ourLeader position-relative">
                            <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                            <div className="leaderDetail p-4 position-absolute w-100">
                              <h3 className="text-white mb-1">Chad Crow </h3>
                              <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-5  ">
                          <div className="h-100 ourLeader position-relative">
                            <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                            <div className="leaderDetail p-4 position-absolute w-100">
                              <h3 className="text-white mb-1">Chad Crow </h3>
                              <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-5  ">
                          <div className="h-100 ourLeader position-relative">
                            <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                            <div className="leaderDetail p-4 position-absolute w-100">
                              <h3 className="text-white mb-1">Chad Crow </h3>
                              <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-5  ">
                          <div className="h-100 ourLeader position-relative">
                            <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                            <div className="leaderDetail p-4 position-absolute w-100">
                              <h3 className="text-white mb-1">Chad Crow </h3>
                              <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-5  ">
                          <div className="h-100 ourLeader position-relative">
                            <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                            <div className="leaderDetail p-4 position-absolute w-100">
                              <h3 className="text-white mb-1">Chad Crow </h3>
                              <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-5  ">
                          <div className="h-100 ourLeader position-relative">
                            <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                            <div className="leaderDetail p-4 position-absolute w-100">
                              <h3 className="text-white mb-1">Chad Crow </h3>
                              <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tabId="2">
                      <div className="row row-eq-height mt-4 ">
                        <div className="col-lg-4 col-md-6 mb-5  ">
                          <div className="h-100 ourLeader position-relative">
                            <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                            <div className="leaderDetail p-4 position-absolute w-100">
                              <h3 className="text-white mb-1">Chad Crow </h3>
                              <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6 mb-5  ">
                          <div className="h-100 ourLeader position-relative">
                            <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                            <div className="leaderDetail p-4 position-absolute w-100">
                              <h3 className="text-white mb-1">Chad Crow </h3>
                              <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-5  ">
                          <div className="h-100 ourLeader position-relative">
                            <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                            <div className="leaderDetail p-4 position-absolute w-100">
                              <h3 className="text-white mb-1">Chad Crow </h3>
                              <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-5  ">
                          <div className="h-100 ourLeader position-relative">
                            <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                            <div className="leaderDetail p-4 position-absolute w-100">
                              <h3 className="text-white mb-1">Chad Crow </h3>
                              <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-5  ">
                          <div className="h-100 ourLeader position-relative">
                            <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                            <div className="leaderDetail p-4 position-absolute w-100">
                              <h3 className="text-white mb-1">Chad Crow </h3>
                              <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tabId="3">
                      <div className="row row-eq-height mt-4 ">
                        <div className="col-lg-4 col-md-6 mb-5  ">
                          <div className="h-100 ourLeader position-relative">
                            <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                            <div className="leaderDetail p-4 position-absolute w-100">
                              <h3 className="text-white mb-1">Chad Crow </h3>
                              <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-5  ">
                          <div className="h-100 ourLeader position-relative">
                            <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                            <div className="leaderDetail p-4 position-absolute w-100">
                              <h3 className="text-white mb-1">Chad Crow </h3>
                              <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                            </div>
                          </div>
                        </div>  <div className="col-lg-4 col-md-6 mb-5  ">
                          <div className="h-100 ourLeader position-relative">
                            <img className="img-fluid w-100" alt="invertor" title="invertor" src={Leaderimg1} />
                            <div className="leaderDetail p-4 position-absolute w-100">
                              <h3 className="text-white mb-1">Chad Crow </h3>
                              <h5 className="small-txt-content text-white font-weight-medium text-light leaderShip-designation"> Director and Chief Executive Officer</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPane>
                  </TabContent>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-5 pb-sm-5">
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
        <section className="ContactDetail pb-5 pt-4">
          <div className="container">
            <div className="row row-eq-height pb-sm-5">
              <div className="col-md-6 mb-md-0 mb-5">
                <div className="boxShadow bg-white p-0 h-100">
                  <h3 className="px-4 mb-0 py-3 headingTextBorder position-relative  font-weight-medium color-dark-gray">Contact Us</h3>
                  <div className="d-flex px-4 py-4">
                    <div className="mr-3 mr-sm-4">
                      <div className="userProfile">
                        <img className="w-100" alt="invertor" title="invertor" src={userprofileinvest} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-weight-bold  mt-2 mb-0  text-dark">Binit Sanghvi</h4>
                      <p className="mb-0"> Vice President Investor Relations</p>
                      <p className="heading-blue">binit.sanghvi@bldr.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-sm-0 mb-5">
                <div className="boxShadow bg-white p-0 h-100">
                  <h3 className="px-4 mb-0 py-3 headingTextBorder position-relative font-weight-medium color-dark-gray">Financial Information</h3>
                  <div className="px-4 py-4">
                    <h4 className="font-weight-bold  mt-2 mb-0  text-dark">Recent Quarterly Results</h4>
                    <p className="mb-0"> Q1 2019 Earnings Release</p>
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

export default InvesterComponent;
