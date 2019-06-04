

//Import statement
import React, { Component } from 'react';
import historicdummygraph from "../img/historic-stock.jpg";


class HistoricStockLookupComponent extends Component {
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
                                <h1 className="subboxes-heading text-left">historic stock lookup</h1>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="historic-stock py-4">
                    <div className="container sec-bg border-top-blue">
                        <div className="row p-4">
                       <div className="form-group col-sm-4">
                                            <label for="category">Lookup Month </label>
                                            <select className="custom-select" id="category">
                                                <option>January</option>
                                                <option>February</option>
                                                <option>March</option>
                                                <option>April</option>
                                                <option selected>May</option>
                                                <option>June</option>
                                                <option>July</option>
                                                <option>August</option>
                                                <option>September</option>
                                                <option>October</option>
                                                <option>Novermber</option>
                                                <option>December</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label for="year">Lookup Day </label>
                                            <select className="custom-select" id="year">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                 <option>4</option>
                                                  <option>5</option>
                                                   <option>6</option>
                                                    <option>7</option>
                                                     <option>8</option>
                                                <option>9</option>
                                                <option>10</option>
                                                 <option>11</option>
                                                  <option>12</option>
                                                   <option>13</option>
                                                    <option>14</option>
                                                    <option>15</option>
                                                <option>16</option>
                                                 <option>17</option>
                                                  <option>18</option>
                                                   <option>19</option>
                                                    <option>20</option>
                                                        <option>21</option>
                                                 <option>22</option>
                                                  <option>23</option>
                                                   <option>24</option>
                                                    <option>25</option>
                                                    <option>26</option>
                                                <option>27</option>
                                                 <option>28</option>
                                                  <option>29</option>
                                                   <option>30</option>
                                               
                                            </select>
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label for="year">Lookup Year </label>
                                            <select className="custom-select" id="year">
                                                <option>2015</option>
                                                <option>2016</option>
                                                <option>2017</option>
                                                <option>2018</option>
                                                <option selected>2019</option>
                                               
                                               
                                            </select>
                                        </div>
                                        <div className="form-group col-12 mt-3 btn-submit-historic">
                                        <a className="btn theme-btn text-uppercase bg-info px-4  py-3 d-inline-block d-none-mob btn-submit-2 text-white">Submit</a>
                                        </div>
                                    </div>
                    


                        <div className="row theme-table px-4">
                            <div className="col-md-12">
                            <h4 className="font-32 font-weight-bold color-dark-gray">Week of May 28, 2019</h4>
                                <div className="table-responsive w-100 mt-4">
                                     <table className="w-100 table">
                                        <thead>
                                            <tr>
                                                <th>Date Requested</th>
                                                <th> Closing Price</th>
                                                <th>Volume  </th>
                                                <th>Split Adjustment Factor</th>
                                                <th>Open Price </th>
                                                <th>Day High </th>
                                                <th>Day Low</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>May 28, 2019 </td>
                                                <td>$14.73</td>
                                                <td>839,621</td>
                                                <td>1:1</td>
                                                <td>$15.06</td>
                                                <td>$15.06  </td>
                                                <td> $14.68</td>
                                            </tr>
                                                <tr>
                                                <td>May 29, 2019 </td>
                                                <td>$14.57</td>
                                                <td>1,398,985</td>
                                                <td>1:1</td>
                                                <td>  $14.60</td>
                                                <td>$14.71  </td>
                                                <td> $14.00</td>
                                            </tr>
                                                <tr>
                                                <td>May 30, 2019</td>
                                                <td>$14.42</td>
                                                <td>888,007</td>
                                                <td>1:1</td>
                                                <td> $14.59</td>
                                                <td> $14.81</td>
                                                <td> $14.34</td>
                                            </tr>
                                           
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                      
                    </div>
                </section>
                <section className="mt-4 pb-5">
                     <div className="container  sec-bg border-top-blue">
                       <div className="row  p-4">
                                <div className="col-md-12">
                                    <h4 className="font-32 font-weight-bold color-dark-gray mb-4">Year End Stock Prices</h4>
                                    <img className="img-fluid" alt="downloadpdf" title="downloadpdf" src={historicdummygraph} />
                                 <p className="mt-4"><strong>NOTE:</strong> The Closing Price, Day's High, Day's Low, and Day's Volume have been adjusted to account for any stock splits and/or dividends which may have occurred for this security since the date shown above. The Actual Price is not adjusted for splits or dividends. The Split Adjustment Factor is a cumulative factor which encapsulates all splits since the date shown above. The closing price above is not necessarily indicative of future price performance.</p>
                                 </div>
                            </div>


                      </div>
                  </section>
                </div>
    );
  }
}

export default HistoricStockLookupComponent;
