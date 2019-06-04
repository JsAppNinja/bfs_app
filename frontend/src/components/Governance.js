//Import statement
import React, { Component } from 'react';
import { globalVar } from "../config";
import { Link } from "react-router-dom";
import downloadpdf from "../img/download-pdf.jpg";
import investpresentation from "../img/investor-presentation.jpg";
import latestEarings from "../img/latest-Earings.jpg";
import printedmat from "../img/printer.svg";
import rssnews from "../img/newspaper.svg";
import emailalert from "../img/email.svg";
import downloadlib from "../img/download.svg";
import backimg from "../img/2018-earning.jpg";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';


//Global variable
var base_url = globalVar.base_url1;

class GovernanceComponent extends Component {
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

  tabsinternaldata() {
    return (
      <div>
        <section className="investor-relation mb-5 test">
          <div className="container">
            <div className="row row-eq-height">
              <div className="col-12 mb-5 mb-lg-0">
                <div className="invertor-bg p-4 border-top-blue h-100">
                  <h2 className="text-uppercase font-weight-bold heading-blue mb-3">Corporate Governance</h2>
                  <p>Headquartered in Dallas, Texas, Builders FirstSource is the largest U.S supplier of building products, prefabricated components, and value-added services to the professional market segment for new residential construction and repair and remodeling. We provide customers an integrated homebuilding solution, offering manufacturing, supply, delivery and installation of a full range of structural and related building products. We operate in 39 states with approximately 400 locations and have a market presence in 75 of the top 100 Metropolitan Statistical Areas, providing geographic diversity and balanced end market exposure. We service customers from strategically located distribution facilities and manufacturing facilities (some of which are co-located) that produce value-added products such as roof and floor trusses, wall panels, stairs, vinyl windows, custom millwork and pre-hung doors. Builders FirstSource also distributes dimensional lumber and lumber sheet goods, millwork, windows, interior and exterior doors, and other building products.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="recent-release governance-doc-list my-5 pt-lg-4">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="c-h2 text-uppercase font-weight-bold heading-blue mb-3">General Documents</h2>
                <div className="table-responsive border-top-blue ">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" className="text-uppercase">Document</th>
                        <th scope="col" className="text-uppercase">View</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="p-4">
                        <td className="py-4">Certificate of Incorporation</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a></td>
                      </tr>
                      <tr>
                        <td className="py-4">Amended and Restated By-laws</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>


              <div className="col-md-12 mt-5">
                <h2 className="c-h2 text-uppercase font-weight-bold heading-blue mb-3">Committee Charters</h2>
                <div className="table-responsive border-top-blue ">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" className="text-uppercase">Document</th>
                        <th scope="col" className="text-uppercase">View</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="p-4">
                        <td className="py-4">Audit Committee Charter</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a></td>
                      </tr>
                      <tr>
                        <td className="py-4">Compensation Committee Charter</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">Nominating Committee Charter</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-md-12 mt-5">
                <h2 className="c-h2 text-uppercase font-weight-bold heading-blue mb-3">Governance Policies</h2>
                <div className="table-responsive border-top-blue ">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" className="text-uppercase">Document</th>
                        <th scope="col" className="text-uppercase">View</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="p-4">
                        <td className="py-4">Code of Business Conduct and Ethics</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a></td>
                      </tr>
                      <tr>
                        <td className="py-4">Code of Business Conduct and Ethics (Spanish)</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">Note Regarding Changes to Code of Business Conduct and Ethics</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">Supplemental Code of Ethics for Senior Officers</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">Related Party Transaction Policy</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">Audit and Non-Audit Services Pre-Approval Policy</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">Director Compensation Policy</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">Policy on Director Attendance at the Annual Meeting of Stockholders</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">Policy on Director Nomination Process</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">Policy on Stockholder Recommendations for Director Candidates</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">Policy on Stockholder Communications with Directors</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">Executive Compensation Clawback Policy</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">Responsible Supply Chain Policy</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">Majority Voting in Director Elections and Director Resignation Policy</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">Executive Stock Ownership Policy</td>
                        <td className="py-4">
                          <a href="#" download>
                            <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={downloadpdf} />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    )
  }
  render() {


    return (
      <div className={"investHome" + (this.state.addClass ? ' head_sticky' : '')}>
        <section className="stock-quote py-3  sticky-navigation-invest">
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
        {/* <section className="inveter-banner position-relative">
          <img className="img-fluid w-100" alt="invertor" title="invertor" src={investorbanner} />
          <div className="invest-banner-heading text-center position-absolute w-100 h-100 d-flex align-items-center justify-item-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-white">
                  <h1 className="mb-0 text-uppercase font-weight-bold display-2">Buiders First Source</h1>
                  <h3 className="text-uppercase mt-0">Source is quality than you can trust</h3>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <section className="main-heading">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mt-5 mb-2  text-center">
                <h1 className="subboxes-heading text-left">Governance</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-blue">
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
                  <li className="list-inline-item  py-2 py-lg-4"><Link to={'/email-alert'} className="">Email Alerts</Link></li>
                  <li className="list-inline-item  py-2 py-lg-4"><Link to={'/investorhome'} className="">FAQs</Link></li>
                  <li className="list-inline-item  py-2 py-lg-4"><Link to={'/contact'} className="">Contact Us</Link></li>
                </ul>
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
                  onClick={() => { this.toggle('1'); }}
                >
                  <span className="font-weight-medium font-weight-bold z-index">Overview</span>
                </NavLink>
              </NavItem>
              <NavItem className="text-uppercase txt-left-mob">
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' }) + " py-md-4 py-3 text-white"}
                  onClick={() => { this.toggle('2'); }}
                >
                  <span className="font-weight-medium font-weight-bold z-index">Management</span>
                </NavLink>
              </NavItem>

              <NavItem className="text-uppercase txt-left-mob">
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' }) + " py-md-4 py-3 text-white"}
                  onClick={() => { this.toggle('3'); }}
                >
                  <span className="font-weight-medium font-weight-bold z-index">Board of Directors</span>
                </NavLink>
              </NavItem>
              <NavItem className="text-uppercase txt-left-mob">
                <NavLink
                  className={classnames({ active: this.state.activeTab === '4' }) + " py-md-4 py-3 text-white"}
                  onClick={() => { this.toggle('4'); }}
                >
                  <span className="font-weight-medium font-weight-bold z-index">Committees</span>
                </NavLink>
              </NavItem>

              <NavItem className="text-uppercase txt-left-mob">
                <NavLink
                  className={classnames({ active: this.state.activeTab === '5' }) + " py-md-4 py-3 text-white"}
                  onClick={() => { this.toggle('5'); }}
                >
                  <span className="font-weight-medium font-weight-bold z-index">Contact the Board</span>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </section>

        <TabContent className="tab-none" activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            {this.tabsinternaldata()}
          </TabPane>
          <TabPane tabId="2">
            {this.tabsinternaldata()}

          </TabPane>
          <TabPane tabId="3">
            {this.tabsinternaldata()}

          </TabPane>
          <TabPane tabId="4">
            {this.tabsinternaldata()}

          </TabPane>
          <TabPane tabId="5">
            {this.tabsinternaldata()}

          </TabPane>
        </TabContent>




        <section className="bg-blue">

          <div className="section-image col-12 p-0">
            <img src={backimg} />

            <div className="earn-head-section">
              <div className="container">

                <h2 className="display-2 text-uppercase font-weight-bold">2018 Earnings</h2>

              </div>

            </div>

          </div>

          <div className="earn-section">

            <div className="container py-3 px-5">
              <div className="row text-white">

                <div className="col-md-6 mb-sm-0 text-center">
                  <h4 className="mb-3 et-text w-100 d-inline-block mt-3">Latest Earnings Presentation</h4>
                  <img className="img-fluid bg-white d-inline-block w-100" alt="" title="" src={latestEarings} />
                </div>

                <div className="col-md-6 text-center">
                  <h4 className="mb-3 et-text w-100 d-inline-block mt-3">Investor Presentation</h4>

                  <img className="img-fluid bg-white d-inline-block w-100" alt="" title="" src={investpresentation} />

                </div>






              </div>
            </div>

          </div>
          <div className="container p-3">
            <div className="col-lg-12 col-md-12 mt-5">
              <h4 className="mb-3 et-text w-100 d-inline-block mt-3 text-center display-5 font-weight-bold">Shareholder Tools</h4>

              <ul className="list-unstyled share-holder-ul mt-4 row">

                <li className="mb-3 text-center col-md-3">
                  <Link to={'/contact'}>
                    <div className="icon-circle d-inline-block"><img className="img-fluid d-inline-block" alt="invertor" title="invertor" src={printedmat} /></div>
                    <div className="d-block w-100 text-center h5">Contact</div>
                  </Link></li>




                <li className="mb-3 text-center col-md-3">
                  <Link to={'/sec-filings'}>
                    <div className="icon-circle d-inline-block"><img className="img-fluid d-inline-block" alt="invertor" title="invertor" src={downloadlib} /></div>
                    <div className="d-block w-100 text-center h5">SEC Filings</div>
                  </Link>
                </li>




                <li className="mb-3 col-md-3">
                  <Link to={'/financial-info'}>
                    <div className="icon-circle d-inline-block"><img className="img-fluid d-inline-block" alt="invertor" title="invertor" src={emailalert} /></div>
                    <div className="d-block w-100 text-center h5">Financial Information</div></Link></li>


                <li className="mb-3 col-md-3">
                  <Link to={'/stock-info'}>
                    <div className="icon-circle d-inline-block"><img className="img-fluid d-inline-block" alt="invertor" title="invertor" src={rssnews} /></div>
                    <div className="d-block w-100 text-center h5">Share Information</div>
                  </Link></li>

              </ul>


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

export default GovernanceComponent;
