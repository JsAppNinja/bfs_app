
//Import statement
import React, { Component } from 'react';
import Leaderimg1 from "../img/Leaderimg1.jpg";
import ern1 from "../img/erning-1.jpg";
import ern2 from "../img/erning-2.jpg";
import printedmat from "../img/printer.svg";
import rssnews from "../img/newspaper.svg";
import emailalert from "../img/email.svg";
import downloadlib from "../img/download.svg";
import binit from "../img/binit.jpg";
import { Link } from "react-router-dom";

class Invester2Component extends Component {
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
  render() {
    return (


      <div className={(this.state.addClass ? 'head_sticky' : '')}>
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
        <section className="invertor-2">
          <div className="container">
            <div className="row">
              <h2 className="c-h2 investors-head investors-head-in w-100 pt-5 mt-3 text-uppercase font-weight-bold position-relative px-3" >Investors</h2>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-3">
                    <p className="ins-font-14 mb-0">NASDAQ</p>
                    <h3 className="bldr mb-0">BLDR $15.81</h3>
                    <p className="ins-font-14 mb-0">Pricing Delayed by 15 min</p>
                  </div>
                  <div className="col-md-3">
                    <p className="ins-font-14 mb-0">$Change</p>
                    <p className="ins-font-14 mb-0">+0.00</p>
                  </div>
                  <div className="col-md-3">
                    <p className="ins-font-14 mb-0">$Change</p>
                    <p className="ins-font-14 mb-0">+0.00</p>
                  </div>
                  <div className="col-md-3">
                    <p className="ins-font-14 mb-0">Volume</p>
                    <p className="ins-font-14 mb-0">533,00</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 text-right">
                <button type="button" className="btn btn-information">More Stock Information</button>
              </div>

            </div>
          </div>
        </section>


        <section className="investor-relation-con mt-5 pt-4">
          <div className="container">
            <div className="row">
              <div className="px-3 w-100">
                <div className="bg-investor-relation col-12 d-flex align-items-center">
                  <div className="inner-content ml-auto">
                    <h1 className="w-100 investors-head py-0  font-weight-bold position-relative mb-0" >Investor Relations</h1>
                    <h5>Headquartered in Dallas, Texas, Builders FirstSource is the largest U.S supplier...</h5>
                    <a href="#" className="btn btnLearn p-0 mt-2">Learn More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="recent-release">
          <div className="container">
            <div className="row">
              <h2 className="c-h2 w-100 investors-head pt-5 mt-3 text-uppercase font-weight-bold position-relative px-3 pb-0" >Recent Releases</h2>

              <div className="col-md-4 ">
                <div className="recent-release-con-box">
                  <h3>Builders FirstSource Prices Offering of $400 Million of Senior Secured Notes due 2027</h3>
                  <p className="date pt-4"><i>May 2, 2019</i></p>
                </div>
              </div>

              <div className="col-md-4 ">
                <div className="recent-release-con-box">
                  <h3>Builders FirstSource Launches Offering of $300 Million of Senior Secured Notes due 2027</h3>
                  <p className="date pt-4"><i>May 21, 2019</i></p>
                </div>
              </div>

              <div className="col-md-4 ">
                <div className="recent-release-con-box">
                  <h3>Builders FirstSource to Host First Quarter 2019 Financial Results Conference Call and Webcast</h3>
                  <p className="date pt-4"><i>April 4, 2019</i></p>
                </div>
              </div>

              <div className="col-md-4 ">
                <div className="recent-release-con-box">
                  <h3>Builders FirstSource, Inc. Announces Termination of its Exchange Offer for its Senior Secured Notes due 2024</h3>
                  <p className="date pt-4"><i>March 19, 2019</i></p>
                </div>
              </div>

              <div className="col-md-4 ">
                <div className="recent-release-con-box">
                  <h3>Builders FirstSource Prices Offering of $400 Million of Senior Secured Notes due 2027</h3>
                  <p className="date pt-4"><i>May 2, 2019</i></p>
                </div>
              </div>

              <div className="col-md-4 ">
                <div className="recent-release-con-box">
                  <h3>Builders FirstSource Reports Fourth Quarter and Full Year 2018 Results</h3>
                  <p className="date pt-4"><i>Feb 28, 2019</i></p>
                </div>
              </div>

              <div className="col-12">
                <a href="#" className="btn viewall p-0 mt-2">View all</a>
              </div>

            </div>
          </div>
        </section>


        <section className="investor-relation">
          <div className="container">
            <div className="row">
              <h2 className="c-h2 investors-head w-100 pt-5 mt-3 text-uppercase font-weight-bold position-relative px-3 pb-0">Investor Relations</h2>

              <div className="col-md-3 mb-5 pb-5">
                <figure className="mb-0 investor-img">
                  <img className="img-fluid rounded" alt="invertor" title="invertor" src={binit} />
                </figure>
              </div>
              <div className="col-md-9 pl-4 mb-5 py-3">
                <h1 className="Earnings-head text-dark font-weight-bold">Binit Sanghvi</h1>
                <h3><span>VP Investor Relations</span> | <span>Email : binit.sanghvi@bldr.com</span></h3>
                <a href="#" className="btn viewall email-now p-0 mt-2 text-uppercase">Email Now</a>
              </div>

            </div>
          </div>
        </section>



        <section className="management">
          <div className="container">
            <div className="row">


              <h2 className="c-h2 w-100 investors-head pt-5 text-uppercase font-weight-bold position-relative px-3 pb-0" >
                <span className="pt-4 d-inline-block w-100">Investor relations</span>
              </h2>


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
            </div>
          </div>
        </section>

        <section className="management">
          <div className="container">
            <div className="row">
              <h2 className="c-h2 investors-head investors-head-in w-100 pt-5 mt-3 text-uppercase font-weight-bold position-relative px-3">2018 Earnings</h2>

              <div className="col-md-6 mb-5 pb-5">
                <figure className="mb-0 earn-img">
                  <img src={ern1} className="img-fluid" alt="" />
                </figure>
              </div>
              <div className="col-md-6 mb-5 py-5 pl-5">
                <h5>Download Our</h5>
                <h1 className="Earnings-head text-dark font-weight-bold">Latest Earnings Presentation</h1>
                <a href="#" className="btn viewall  p-0 mt-2 text-uppercase">View</a>
              </div>

              <div className="col-md-6 mb-5 py-5">
                <h5>Download Our</h5>
                <h1 className="Earnings-head  text-dark font-weight-bold">Latest Earnings Presentation</h1>
                <a href="#" className="btn viewall  p-0 mt-2 text-uppercase">View</a>
              </div>

              <div className="col-md-6 mb-5 pb-5 pl-5">
                <figure className="mb-0 earn-img">
                  <img src={ern2} className="img-fluid" alt="" />
                </figure>
              </div>



            </div>
          </div>
        </section>


        <section className="searchlder-tool pb-5">
          <div className="container">
            <div className="row">
              <h2 className="c-h2 investors-head w-100 pt-5 mt-3 text-uppercase font-weight-bold position-relative px-3 pb-0">Shareholder Tools</h2>

              <div className="col-md-6">
                <div className="d-flex align-items-center mb-5">
                
                  <figure className="mb-0 icon-circle d-flex align-items-center justify-content-center">
                    <img src={printedmat} className="img-fluid icon-searchlder" alt="" />
                  </figure><Link to={'/contact'}>
                  <h3 className="mb-0 pl-3"> Contact Us  
                  
                  </h3>
                 
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-5">
                  <figure className="mb-0 icon-circle d-flex align-items-center justify-content-center">
                    <img src={rssnews} className="img-fluid icon-searchlder" alt="" />
                  </figure>
                  <Link to={'/stock-info'}>
                  <h3 className="mb-0 pl-3"> Share Information    </h3>  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-5">
                  <figure className="mb-0 icon-circle d-flex align-items-center justify-content-center">
                    <img src={emailalert} className="img-fluid icon-searchlder" alt="" />
                  </figure>
                  <Link to={'/financial-info'}>
                  <h3 className="mb-0 pl-3">Financial Information</h3>
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-5">
                  <figure className="mb-0 icon-circle d-flex align-items-center justify-content-center">
                    <img src={downloadlib} className="img-fluid icon-searchlder" alt="" />
                  </figure>
                   <Link to={'/sec-filings'}>
                  <h3 className="mb-0 pl-3">SEC Filings</h3>
                  </Link>
                </div>
              </div>


            </div>
          </div>
        </section>



      </div>
    );
  }
}

export default Invester2Component;
