
//Import statement
import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

class AnalystCoverageComponent extends Component {
  constructor(props) {
    super(props);

    //Defining state variable
    this.state = {
         activeTab: '4',
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
        <section className="stock-quote py-3 sticky-navigation-invest" >
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
                <h1 className="subboxes-heading text-left">Analyst Coverage</h1>
              </div>
            </div>
          </div>
        </section>
 <section className="theme-nav-page  py-4">
           <div className="container p-0">
                 <div className="row">
                        <div className="col-md-12">
                            <Nav tabs className="nav-fill tab-none border-bottom-0 overflow-h">
                              <NavItem className="text-uppercase txt-left-mob">
                                <NavLink
                                  className={classnames({ active: this.state.activeTab === '1' }) + " py-md-4 py-3 text-white"}
                                  onClick={() => { this.toggle('/stock-info'); }}
                                >
                                  <span className="font-weight-medium font-weight-bold z-index">Stock Quote</span>
                                </NavLink>
                              </NavItem>
                              <NavItem className="text-uppercase txt-left-mob">
                                <NavLink
                                  className={classnames({ active: this.state.activeTab === '2' }) + " py-md-4 py-3 text-white"}
                                  onClick={() => { this.toggle('/historic-stock-lookup'); }}
                                >
                                  <span className="font-weight-medium font-weight-bold z-index">Historic Stock Lookup </span>
                                </NavLink>
                              </NavItem>

                              <NavItem className="text-uppercase txt-left-mob">
                                <NavLink
                                  className={classnames({ active: this.state.activeTab === '3' }) + " py-md-4 py-3 text-white"}
                                  onClick={() => { this.toggle('/investment-calculator'); }}
                                >
                                  <span className="font-weight-medium font-weight-bold z-index">Investment Calculator</span>
                                </NavLink>
                              </NavItem>
                              <NavItem className="text-uppercase txt-left-mob">
                                <NavLink
                                  className={classnames({ active: this.state.activeTab === '4' }) + " py-md-4 py-3 text-white"}
                                  onClick={() => { this.toggle('/analyst-coverage'); }}
                                >
                                  <span className="font-weight-medium font-weight-bold z-index">Analyst List</span>
                                </NavLink>
                              </NavItem>
                            </Nav>
                          </div>
                      </div>
          </div>
        </section>
        <section className="mt-4 pb-5">
          <div className="container analystCoverage sec-bg border-top-blue">
            <div className="row theme-table p-4">
              <div className="col-md-12">
                <div className="table-responsive w-100">
                  <table className="w-100 table">
                    <thead>
                      <tr>
                        <th>Firm</th>
                        <th>  Analyst</th>
                        <th>  Phone Number  </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Barclays</td>
                        <td className="linkit"> Matthew Bouley</td>
                        <td className="linkit"> 212-526-9029</td>
                      </tr>
                      <tr>
                        <td>Buckingham Research</td>
                        <td className="linkit"> Megan McGrath</td>
                        <td className="linkit">  212-922-5715</td>
                      </tr>
                      <tr>
                        <td>D.A. Davidson</td>
                        <td className="linkit">   Kurt Yinger</td>
                        <td className="linkit">  503-603-3028</td>
                      </tr>
                      <tr>
                        <td>Deutsche Bank</td>
                        <td className="linkit"> Nishu Sood</td>
                        <td className="linkit"> 212-250-4756</td>
                      </tr>
                      <tr>
                        <td>Evercore ISI</td>
                        <td className="linkit"> Trey Morrish</td>
                        <td className="linkit"> 212-653-9009</td>
                      </tr>
                      <tr>
                        <td>FBR Capital Markets & Co.</td>
                        <td className="linkit"> Alex Rygiel</td>
                        <td className="linkit"> 703-312-9511</td>
                      </tr>
                      <tr>
                        <td>RBC Capital Markets</td>
                        <td className="linkit"> Michael Dahl</td>
                        <td className="linkit"> 212-618-3251</td>
                      </tr>
                      <tr>
                        <td>Seaport Global</td>
                        <td className="linkit">Matt McCall</td>
                        <td className="linkit">804-939-5277</td>
                      </tr>
                      <tr>
                        <td>Stephens, Inc.</td>
                        <td className="linkit">   Trey Grooms</td>
                        <td className="linkit"> 501-377-2318</td>
                      </tr>
                      <tr>
                        <td>Stifel Nicolaus</td>
                        <td className="linkit"> John Baugh</td>
                        <td className="linkit">   804-727-6367</td>
                      </tr>
                      <tr>
                        <td>SunTrust Robinson Humphrey</td>
                        <td className="linkit">Keith Hughes</td>
                        <td className="linkit"> 404-926-5032</td>
                      </tr>
                      <tr>
                        <td>Thompson Research Group</td>
                        <td className="linkit">Kathryn Thompson  </td>
                        <td className="linkit"> 615-891-6206</td>
                      </tr>
                      <tr>
                        <td>Wedbush</td>
                        <td className="linkit"> Jay McCanless</td>
                        <td className="linkit">   212-833-1381</td>
                      </tr>




                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="row  p-4">
              <div className="col-md-12">
                <p>Builders FirstSource, Inc. is followed by the analysts listed above.
                Please note that any opinions, estimates or forecasts regarding Builders FirstSource,
                 Inc.'s performance made by these analysts are theirs alone and do not represent opinions,
                  forecasts or predictions of Builders FirstSource, Inc. or its management. Builders FirstSource,
                   Inc. does not by its reference above or distribution imply its endorsement of or concurrence
                                        with such information, conclusions or recommendations.</p>
              </div>
            </div>
          </div>
        </section>

      </div>

    );
  }
}

export default AnalystCoverageComponent;
