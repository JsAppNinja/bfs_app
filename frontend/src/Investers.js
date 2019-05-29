
//Import statement
import React, { Component } from 'react';
import investorbanner from "../img/investor-banner.jpg";
import investgraph from "../img/invest-graph.jpg";
import Leaderimg1 from "../img/Chad-Crow.jpg";
import userprofileinvest from "../img/userProfile-invest.svg";
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

class InvesterComponent extends Component {
  constructor(props) {
    super(props);

    //Defining state variable
    this.state = {
      activeTab: '1'
    };

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
  render() {
    return (
      <div className="invertor-relation">
        <section className="stock-quote py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d-lg-flex d-none w-100">
                  <h5 className="font-weight-medium  mb-0 mr-4">Share Price</h5>
                  <ul className="ul-top-share">
                    <li className="list-inline-item px-4 border-right-black h4 mb-0">NASDAQ: BLDR <span class="heading-blue">$15.81</span> </li>
                    <li className="list-inline-item px-4 border-right-black  h4 mb-0"> $ Change <span class="heading-blue">+0.00 </span></li>
                    <li className="list-inline-item px-4 border-right-black h4 mb-0">  % Change <span class="heading-blue">+0.00</span> </li>
                    <li className="list-inline-item px-4  h4 mb-0"> Volume <span class="heading-blue">533,00 </span> </li>
                  </ul>
                  <h6 className="position-absolute mb-0 date-stock">Pricing Delayed by 15 min</h6>
                </div>
                <div className="dropdown d-lg-none d-block w-100 text-right">
                  <a className="dropdown-toggle text-uppercase font-weight-bold heading-blue mb-0" data-toggle="dropdown">
                    Stock Quote
                                          </a>
                  <div className="dropdown-menu p-2">
                    <ul className="list-unstyled px-3">
                      <li className="mb-2 h6 ">NASDAQ: BLDR <span class="heading-blue">$15.81</span> </li>
                      <li className="mb-2 h6"> $ Change <span class="heading-blue">+0.00 </span></li>
                      <li className="mb-2 h6">  % Change <span class="heading-blue">+0.00</span> </li>
                      <li className="mb-2 h6"> Volume <span class="heading-blue">533,00 </span> </li>
                      <li><h6 className="mb-0 date-stock">Pricing Delayed by 15 min</h6></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="inveter-banner position-relative">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <img className="w-100" alt="invertor" title="invertor" src={investorbanner} />
              </div> <div className="col-md-12">
                <div className="banner-heading text-left position-absolute w-100 px-5 py-2">
                  <h2 className="mb-0 font-weight-medium text-white">Investor Relations</h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-3">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <ul className="list-unstyled menu-company-hightlight text-center">
                  <li className="list-inline-item active py-2 py-lg-3"><a href="#" className="">Company Highlights</a></li>
                  <li className="list-inline-item  py-2 py-lg-3"><a href="#" className="">Governance</a></li>
                  <li className="list-inline-item  py-2 py-lg-3"><a href="#" className="">News</a></li>
                  <li className="list-inline-item  py-2 py-lg-3"><a href="#" className="">Events</a></li>
                  <li className="list-inline-item  py-2 py-lg-3"><a href="#" className="">Stock Information</a></li>
                  <li className="list-inline-item  py-2 py-lg-3"><a href="#" className="">Financial Information</a></li>
                  <li className="list-inline-item  py-2 py-lg-3"><a href="#" className="">Email Alerts</a></li>
                  <li className="list-inline-item  py-2 py-lg-3"><a href="#" className="">FAQs</a></li>
                  <li className="list-inline-item  py-2 py-lg-3"><a href="#" className="">Contact Us</a></li>
                </ul>
              </div>
            </div>

          </div>

        </section>
        <section className="py-5">
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
        </section>
        <section className="leader-ship my-4">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="display-4 font-weight-medium color-dark-gray text-center">Leadership</h2>
              </div>
            </div>
            <div className="py-lg-5 px-0">
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
                  className={classnames({ active: this.state.activeTab === '2' })  + " font-weight-medium font-weight-bold"}
                  onClick={() => { this.toggle('2'); }}
                >
                  Executive Officers
                        </NavLink>
              </NavItem>
              <NavItem className="text-uppercase txt-left-mob nav-item" >
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })  + " font-weight-medium font-weight-bold"}
                  onClick={() => { this.toggle('3'); }}
                >
                  Board of Directors
                        </NavLink>
              </NavItem>
            </Nav>

            <TabContent className="tab-none d-none d-xl-block" activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <div className="row mt-4 ">
                  <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                    <div className="h-100 ourLeader position-relative">
                      <img className="img-fluid" alt="invertor" title="invertor" src={Leaderimg1} />
                      <div className="leaderDetail p-4 position-absolute w-100">
                        <h3 className="text-white mb-1">Chad Crow </h3>
                        <h5 className="text-white leaderShip-designation"> Director and Chief Executive Officer</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                    <div className="h-100 ourLeader">
                      <img className="img-fluid" alt="invertor" title="invertor" src={Leaderimg1} />
                      <div className="leaderDetail p-4">
                        <h3 className="text-white mb-1">Peter Jackson</h3>
                        <h5 className="text-white"> Senior Vice President &  Chief Financial
                  Officer</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                    <div className="h-100 ourLeader">
                      <img className="img-fluid" alt="invertor" title="invertor" src={Leaderimg1} />
                      <div className="leaderDetail p-4">
                        <h3 className="text-white mb-1">Donald F. McAleenan </h3>
                        <h5 className="text-white"> Senior Vice President & General Counsel</h5>
                      </div>

                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="2">
                <div className="row row-eq-height mt-4 ">
                  <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                    <div className="h-100 ourLeader">
                      <img className="img-fluid" alt="invertor" title="invertor" src={Leaderimg1} />
                      <div className="leaderDetail p-4">
                        <h3 className="text-white mb-1">Chad Crow </h3>
                        <h5 className="text-white"> Director and Chief Executive Officer</h5>
                      </div>
                    </div>
                  </div>
                 
                  <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                    <div className="h-100 ourLeader">
                      <img className="img-fluid" alt="invertor" title="invertor" src={Leaderimg1} />
                      <div className="leaderDetail p-4">
                        <h3 className="text-white mb-1">Donald F. McAleenan </h3>
                        <h5 className="text-white"> Senior Vice President & General Counsel</h5>
                      </div>

                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="3">
                <div className="row row-eq-height mt-4 ">
                  <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                    <div className="h-100 ourLeader">
                      <img className="img-fluid" alt="invertor" title="invertor" src={Leaderimg1} />
                      <div className="leaderDetail p-4">
                        <h3 className="text-white mb-1">Chad Crow </h3>
                        <h5 className="text-white"> Director and Chief Executive Officer</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
            </TabContent>
            </div>

          </div>
        </section>
        <section className="py-0 py-md-5">
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
