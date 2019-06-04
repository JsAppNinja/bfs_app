
//Import statement
import React, { Component } from 'react';
import htmlsvg from "../img/html.svg";
import pdfsvg from "../img/pdf.svg";
import xlssvg from "../img/xls.svg";
import quartelyearning from "../img/Quarterly-Earning-bg.jpg";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

class SecFillingComponent extends Component {
    constructor(props) {
        super(props);

        //Defining state variable
        this.state = {
              activeTab: '3',
            addClass: false,
            secondryClass:false
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
        if (window.pageYOffset > 125) {
            this.setState({ secondryClass: true })
        } else {
            this.setState({ secondryClass: false })
        }
        if (window.pageYOffset > 135) {
            this.setState({ addClass: true })
        } else {
            this.setState({ addClass: false })
        }
    }

    componentDidUpdate() {
    }


    render() {
        return (
            <div className={"bg-gray" + (this.state.addClass ? ' head_sticky' : '') + (this.state.secondryClass ? ' on_top_head' : '')} >
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
                                <h1 className="subboxes-heading text-left">SEC FILINGS</h1>
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
                      onClick={() => { this.toggle('/financial-info'); }}
                    >
                   <span className="font-weight-medium font-weight-bold z-index">Overview </span>
                    </NavLink>
                  </NavItem>
                  <NavItem className="text-uppercase txt-left-mob">

                       <NavLink
                      className={classnames({ active: this.state.activeTab === '2' }) + " py-md-4 py-3 text-white"}
                      onClick={() => { this.toggle('/annualreport'); }} 
                    >
                      <span className="font-weight-medium font-weight-bold z-index">Annual Reports</span>
                    </NavLink>
                  </NavItem>

                  <NavItem className="text-uppercase txt-left-mob">
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '3' }) + " py-md-4 py-3 text-white"}
                      onClick={() => { this.toggle('/sec-filings'); }}
                    >
                      <span className="font-weight-medium font-weight-bold z-index">SEC Filings  </span>
                    </NavLink>
                  </NavItem>
                  <NavItem className="text-uppercase txt-left-mob">
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '4' }) + " py-md-4 py-3 text-white"}
                      onClick={() => { this.toggle('/quarterlyearning'); }}
                    >
                      <span className="font-weight-medium font-weight-bold z-index">Quarterly Results</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </div>
          </div>
        </section>

                <section className="SEC-fill investor-relation py-5">
                    <div className="container sec-bg border-top-blue ">
                        <div className="row row-eq-height">
                            <div className="col-12 mb-5 mb-lg-0">
                                <div className="invertor-bg  p-4 h-100 invertor-news-release">
                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label for="category">Group</label>
                                            <select className="custom-select" id="category">
                                                <option selected>Choose from List</option>

                                                <option value="1">Annual Filling</option>
                                                <option value="2">Curent Report</option>
                                                <option >3 ,4,5</option>
                                                <option value="1">Annual Filling</option>
                                                <option value="2">Mergers & acquisitions</option>
                                                <option>Others</option>
                                                <option value="1">Proxy Filling</option>
                                                <option value="2">Quaretly Filling</option>
                                                <option value="2">Registration statement</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-6">
                                            <label for="year">Filling Year: </label>
                                            <select className="custom-select" id="year">
                                                <option selected>--Any--</option>
                                                <option value="1">2019</option>
                                                <option value="2">2018</option>
                                                <option value="3">2017</option>
                                                <option value="3">2016</option>
                                                <option value="3">2015</option>
                                                <option value="3">2014</option>
                                                <option value="3">2013</option>
                                                <option value="3">2012</option>
                                                <option value="3">2011</option>
                                                <option value="3">2010</option>
                                                <option value="3">2009</option>
                                                <option value="3">2008</option>
                                                <option value="3">2007</option>
                                                <option value="3">2006</option>
                                                <option value="3">2005</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-responsive w-100 Sec-filling-table">
                                    <table className="w-100 table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="mb-2"> Form  </div>  S-1
                                             </td>
                                                <td>
                                                    <div className="mb-2"> Description </div>  Registration statement for face-amount certificate companies
                                            </td>
                                                <td>
                                                    <div className="mb-2"> Final Date   </div> Feb 14, 2005
                                             </td>
                                                <td className="viewFile">
                                                    <div className="mb-2">View  </div>
                                                    <img className="img-fluid" alt="pdf" title="pdf" src={htmlsvg} />
                                                    <img className="img-fluid" alt="pdf" title="pdf" src={pdfsvg} />
                                                    <img className="img-fluid" alt="pdf" title="pdf" src={xlssvg} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="mb-2"> Form  </div>  3
                                             </td>
                                                <td>
                                                    <div className="mb-2"> Description </div>
                                                    Initial filing by director officer or owner of more than ten percent.
                                            </td>
                                                <td>
                                                    <div className="mb-2"> Final Date   </div>   Jun 21, 2005
                                             </td>
                                                <td className="viewFile">
                                                    <div className="mb-2">View  </div>
                                                    <img className="img-fluid" alt="pdf" title="pdf" src={htmlsvg} />
                                                    <img className="img-fluid" alt="pdf" title="pdf" src={pdfsvg} />
                                                    <img className="img-fluid" alt="pdf" title="pdf" src={xlssvg} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="mb-2"> Form  </div>  S-1/A
                                             </td>
                                                <td>
                                                    <div className="mb-2"> Description </div>
                                                    Amended Registration statement for face-amount certificate companies
                                            </td>
                                                <td>
                                                    <div className="mb-2"> Final Date   </div>   Jun 15, 2005
                                             </td>
                                                <td className="viewFile">
                                                    <div className="mb-2">View  </div>
                                                    <img className="img-fluid" alt="pdf" title="pdf" src={htmlsvg} />
                                                    <img className="img-fluid" alt="pdf" title="pdf" src={pdfsvg} />
                                                    <img className="img-fluid" alt="pdf" title="pdf" src={xlssvg} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="mb-2"> Form  </div>  8-A12G
                                             </td>
                                                <td>
                                                    <div className="mb-2"> Description </div>
                                                    Registration of certain classes of securities 12(g) of the Securities Exchange Act
                                            </td>
                                                <td>
                                                    <div className="mb-2"> Final Date   </div>   Jun 14, 2005
                                             </td>
                                                <td className="viewFile">
                                                    <div className="mb-2">View  </div>
                                                    <img className="img-fluid" alt="pdf" title="pdf" src={htmlsvg} />
                                                    <img className="img-fluid" alt="pdf" title="pdf" src={pdfsvg} />
                                                    <img className="img-fluid" alt="pdf" title="pdf" src={xlssvg} />
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

        );
    }
}

export default SecFillingComponent;
