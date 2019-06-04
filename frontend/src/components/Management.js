

//Import statement
import React, { Component } from 'react';
import binit from "../img/binit.jpg";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

class ManagementComponent extends Component {
    constructor(props) {
        super(props);

        //Defining state variable
        this.state = {
                activeTab: '2',
            addClass: false
        };

    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    toggle(tab) {
    this.props.history.push(tab)
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
                      <div className="col-md-12 mt-5 mb-2  text-center">
                        <h1 className="subboxes-heading text-left">Management</h1>
                      </div>
                    </div>
                  </div>
             </section>
            <section className="governance-page-navs py-4">
                  <div className="container">
                    <Nav tabs className="nav-fill tab-none border-bottom-0 overflow-h">
                      <NavItem className="text-uppercase txt-left-mob">
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '1' }) + " py-md-4 py-3 text-white"}
                          onClick={() => { this.toggle('/governance'); }}
                        >
                          <span className="font-weight-medium font-weight-bold z-index">Overview</span>
                        </NavLink>
                      </NavItem>
                      <NavItem className="text-uppercase txt-left-mob">
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '2' }) + " py-md-4 py-3 text-white"}
                          onClick={() => { this.toggle('/management'); }}
                        >
                          <span className="font-weight-medium font-weight-bold z-index">Management</span>
                        </NavLink>
                      </NavItem>

                      <NavItem className="text-uppercase txt-left-mob">
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '3' }) + " py-md-4 py-3 text-white"}
                          onClick={() => { this.toggle('/board-of-directors'); }}
                        >
                          <span className="font-weight-medium font-weight-bold z-index">Board of Directors</span>
                        </NavLink>
                      </NavItem>
                      <NavItem className="text-uppercase txt-left-mob">
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '4' }) + " py-md-4 py-3 text-white"}
                          onClick={() => { this.toggle('/commitees'); }}
                        >
                          <span className="font-weight-medium font-weight-bold z-index">Committees</span>
                        </NavLink>
                      </NavItem>

                      <NavItem className="text-uppercase txt-left-mob">
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '5' }) + " py-md-4 py-3 text-white"}
                          onClick={() => { this.toggle('/contact-board'); }}
                        >
                          <span className="font-weight-medium font-weight-bold z-index">Contact the Board</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
            </section>
            
                  <section className="investor-relation-managment pb-5">
          <div className="container">
             
            <div className="row mt-5">
              <div className="col-md-4 col-lg-3 col-md-4 col-lg-3 pb-sm-5 pb-0">
                <figure className="mb-0 investor-img">
                  <img className="img-fluid rounded" alt="invertor" title="invertor" src={binit} />
                </figure>
              </div>
              <div className="col-md-8 col-lg-9 pl-4">
                <h1 className="Earnings-head text-dark font-weight-bold mb-0"> Chad Crow</h1>
                <h5>Director and Chief Executive Officer</h5>
                <p className="mt-3">Mr. Crow joined the Company in September 1999, and has held several roles of increasing responsibility. Mr. Crow became a director in 2017 and President and CEO on December 29, 2017. In 2009, Mr. Crow was named Senior Vice President and Chief Financial Officer and in 2014 was promoted to President and Chief Operating Officer. Prior to joining Builders FirstSource, he served in a variety of positions at Pier One Imports and Price Waterhouse LLP. Mr. Crow received his B.B.A. degree from Texas Tech University.</p>
              </div>

            </div>
             <div className="container py-4">
                    <div className="row">
                        <div className="col-md-12">
                        <hr />

                        </div>
                    </div>
                </div>
             <div className="row mt-5">
              <div className="col-md-4 col-lg-3 col-md-4 col-lg-3 pb-sm-5 pb-0">
                <figure className="mb-0 investor-img">
                  <img className="img-fluid rounded" alt="invertor" title="invertor" src={binit} />
                </figure>
              </div>
              <div className="col-md-8 col-lg-9 pl-4">
                <h1 className="Earnings-head text-dark font-weight-bold mb-0"> Peter Jackson</h1>
                <h5>Senior Vice President and Chief Financial Officer</h5>
                <p className="mt-3"> On November 4, 2016 Mr. Jackson was named Senior Vice President and Chief Financial Officer.  Mr. Jackson joins Builders FirstSource from Lennox International, Inc., where he served in various senior financial roles, most recently VP and CFO – Refrigeration Segment.  Prior to that, Mr. Jackson was Vice President, Finance - FP&A and M&A.  He served as Lennox’s Residential Heating & Cooling Segment CFO from 2007-2013. Before joining Lennox, Mr. Jackson served in multiple financial leadership positions at SPX Corporation, General Electric and Gerber Scientific.  Mr. Jackson is a certified public accountant, earned an MBA from Rensselaer Polytechnic Institute.</p>
              </div>

            </div>
 <div className="container py-4">
                    <div className="row">
                        <div className="col-md-12">
                        <hr />

                        </div>
                    </div>
                </div>
            <div className="row mt-5">
              <div className="col-md-4 col-lg-3 col-md-4 col-lg-3 pb-sm-5 pb-0">
                <figure className="mb-0 investor-img">
                  <img className="img-fluid rounded" alt="invertor" title="invertor" src={binit} />
                </figure>
              </div>
              <div className="col-md-8 col-lg-9 pl-4">
                <h1 className="Earnings-head text-dark font-weight-bold mb-0">  Donald F. McAleenan</h1>
                <h5>Senior Vice President and General Counsel</h5>
                <p className="mt-3"> Mr. McAleenan is a co-founder of BFS and serves as General Counsel. Prior to co-founding BFS, Mr. McAleenan served as Vice President and Deputy General Counsel of Fibreboard Corporation from 1992 to 1997. Mr. McAleenan was also Assistant General Counsel of AT&E Corporation and spent nine years as a securities lawyer at two New York City law firms. Mr. McAleenan has a B.S. from Georgetown University and J.D. from New York University Law School.

</p>
              </div>

            </div>
          </div>
        </section>
             
            </div>
        );
    }
}

export default ManagementComponent;
