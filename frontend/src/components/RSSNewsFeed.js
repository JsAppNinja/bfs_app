
//Import statement
import React, { Component } from 'react';
import htmlsvg from "../img/html.svg";
import pdfsvg from "../img/pdf.svg";
import xlssvg from "../img/xls.svg";
import quartelyearning from "../img/Quarterly-Earning-bg.jpg";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import downloadpdf from "../img/download-pdf.jpg";
import rss from "../img/rss.svg";

class RSSNewsFeedComponent extends Component {
    constructor(props) {
        super(props);

        //Defining state variable
        this.state = {
            activeTab: '3',
            addClass: false,
            secondryClass: false
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
        if (window.pageYOffset > 1000) {
            this.setState({ secondryClass: true })
        } else {
            this.setState({ secondryClass: false })
        }
        if (window.pageYOffset > 140) {
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
                 <section className={"stock-quote py-3  sticky-navigation-invest" + (window.pageYOffset > 140 ? ' slideInDown' : '')} >
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
                <h1 className="subboxes-heading text-left">Rss News Feed</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="container rss-feed">
            <div className="row">
                <div className="col-md-12">
                <h2 className="font-weight-bold color-dark-gray mt-4">What is RSS?</h2>
                <h4 className="investor-para"> Really Simple Syndication (RSS) is a format designed for sharing web content such as headlines. An RSS feed highlights fresh material for you, so you don't have to repeatedly check a site yourself for updates.</h4>
                </div>
                <div className="col-md-12 mt-4">
                <h2 className="font-weight-bold color-dark-gray mt-4">How do I use RSS?</h2>
                <h4 className="investor-para"> To make use of RSS, you'll need an RSS reader, or aggregator.
                 An RSS aggregator can be a stand-alone application,
                  or a plug-in for another program you already use,
                   such as <span className="linktr"> Microsoft Outlook.</span>Some web browsers, such as  <span className="linktr">Firefox </span> and <span className="linktr"> Safari RSS,</span>
                    have RSS readers built in. There are also online aggregators,
                     websites such as  <span className="linktr">My Yahoo </span>or  <span className="linktr">Bloglines </span>that allow you to customize 
                     them by adding RSS feeds. <span className="linktr"> Find a downloadable RSS aggregator.</span>
                </h4>
                </div>
                 <div className="col-md-12 mt-4">
                <h2 className="font-weight-bold color-dark-gray mt-4">To view a feed in your RSS Aggregator</h2>
                <ul className="list-unstyled rssFeedUl">
                <li className="mb-2"> 1) Click on the RSS feed that corresponds to the topic that interests you.</li>
                 <li className="mb-2">2) Copy the URL.</li>
                  <li className="mb-2">3) Paste the URL into your reader.</li>
                  </ul>
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
        <section className="rss-feed-detail pb-5">
            <div className="container">
                    <div className="row">
                            <div className="col-md-12">
                                    <h2 className="font-weight-bold color-dark-gray mb-3"> RSS Feed</h2>
                                </div>
                            </div>

                    <div className="row">
                        <div className="col-md-3">
                        <h5 className="wordLimit"> <img className="img-fluid  rss-file mr-3" alt="rss" title="pdf" src={rss} /><span className="linktr">All Press Releases</span></h5>
                        </div>
                        <div className="col-md-3">
                        <h5 className="wordLimit"><img className="img-fluid  rss-file  mr-3" alt="rss" title="pdf" src={rss} /><span className="linktr" >Financial</span></h5>
                        </div>
                        <div className="col-md-3">
                        <h5 className="wordLimit"><img className="img-fluid  rss-file  mr-3" alt="rss" title="pdf" src={rss} /> <span className="linktr">General</span></h5>
                        </div>
                        <div className="col-md-3">
                        <h5 className="wordLimit"><img className="img-fluid  rss-file  mr-3" alt="rss" title="pdf" src={rss} /> <span className="linktr">In the News</span></h5>
                        </div>
                    </div>
                     <div className="row mt-3">
                            <div className="col-md-3">
                            <h5 className="wordLimit"> <img className="img-fluid  rss-file mr-3" alt="rss" title="pdf" src={rss} /> <span className="linktr">All SEC Filings</span></h5>
                            </div>
                            <div className="col-md-3">
                            <h5 className="wordLimit"><img className="img-fluid  rss-file  mr-3" alt="rss" title="pdf" src={rss} /> <span className="linktr">Form 4 SEC Filings</span></h5>
                            </div>
                      
                        </div>
        
            </div>
        </section>
            </div>

        );
    }
}

export default RSSNewsFeedComponent;
