
//Import statement
import React, { Component } from 'react';
import { topFunctionButtonClick } from "../../assets/js/utils";
import uparrwo from "../../assets/img/up-arrow-key.png"
import { globalVar } from "../../config";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

//Global variable

class TabbarComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        data1 = JSON.parse(this.props.homeData[0].servicesTab1Data);
        data2 = JSON.parse(this.props.homeData[0].servicesTab2Data);
        data3 = JSON.parse(this.props.homeData[0].servicesTab3Data);
    }

    render() {
        let data1 = [];
        let data2 = [];
        let data3 = [];
        data1 = JSON.parse(this.props.homeData[0].servicesTab1Data);
        data2 = JSON.parse(this.props.homeData[0].servicesTab2Data);
        data3 = JSON.parse(this.props.homeData[0].servicesTab3Data);
        return (
            <div id="productservice" className="bg-gray col-12 py-sm-4 ">
                <div className="container px-0 py-sm-4">
                    <div className="col-12  px-0 pt-md-0">
                        <div className="m-auto our_products_mob">
                            <h2 className="display-4 mob-wid-75 font-small-mob text-center font-weight-normal">{homedata.serviceTitle}</h2>
                            <div className="our_products_mob w-100  py-lg-5 px-0">
                                <div className="collapse-accordion d-block d-xl-none" id="accordion2" aria-multiselectable="false">
                                    <div className="card-custom position-relative ">
                                        <div className="card-header" role="tab" id="headingOne1">
                                            <h6 className="mb-0">
                                                <a data-toggle="collapse" data-parent="#accordion2" href="#collapseOne2" aria-expanded="true" aria-controls="collapseOne">
                                                    <span className="togle-active font-weight-bold  text-uppercase txt-left-mob nav-item">Manufacturing</span>
                                                </a>
                                            </h6>
                                        </div>
                                        <div id="collapseOne2" className="collapse show" role="tabpanel" aria-labelledby="headingOne2">
                                            <div className="card-block">
                                                <div className="row m-0">
                                                 {
                                                     data1.map((slides, index) =>(
                                                        slides.imageTitle!=="cabinetcustom"?(<div key={index} className="col-sm-6 col-6 col-md-6">
                                                                <div className="gal_text bg-white">
                                                                    { slides.imageUrl?(<LazyLoadImage className="w-100" src={base_url + slides.imageUrl} alt="logo here" />):null}
                                                                    <h5 className="text-center w-100 p-3 font-13 font-medium"> {slides.imageTitle} </h5>
                                                                </div>
                                                        </div>):null
                                                     ))
                                                 }
                                                </div>
                                            </div>
                                            {data1.length>0?(<div className="col-12 text-center  pt-lg-5 px-0">
                                                <Link to={'/manufacturing'} className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mob-view-all">View All</Link>
                                            </div>):null}
                                        </div>
                                    </div>
                                    <div className="card-custom position-relative ">
                                        <div className="card-header" role="tab" id="headingTwo2">
                                            <h6 className="mb-0">
                                                <a  className="collapsed" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo2" aria-expanded="false" aria-controls="collapseTwo2">
                                                    <span className="font-weight-bold text-uppercase txt-left-mob nav-item">Distribution Services</span>
                                                </a>
                                            </h6>
                                        </div>
                                        <div id="collapseTwo2" className="collapse" role="tabpanel" aria-labelledby="headingTwo2">
                                            <div className="card-block">
                                                <div className="row m-0">
                                                  {
                                                     data2.map((slides, index) =>(
                                                        slides.imageTitle!=="cabinetcustom"?(<div key={index} className="col-sm-6 col-6 col-md-6">
                                                                <div className="gal_text bg-white">
                                                                    {slides.imageUrl?(<LazyLoadImage className="w-100" src={base_url + slides.imageUrl} alt="logo here" />):null}
                                                                    <h5 className="text-center w-100 p-3 font-13 font-medium"> {slides.imageTitle} </h5>
                                                                </div>
                                                        </div>):null
                                                     ))
                                                   }
                                                </div>
                                            </div>
                                            {data2.length>0?(<div className="col-12 text-center  pt-lg-5 px-0">
                                                <Link to={'/distribution/'} className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mob-view-all">View All</Link>
                                            </div>):null}
                                        </div>
                                    </div>
                                    <div className="card-custom position-relative ">
                                        <div className="card-header" role="tab" id="headingThree2">
                                            <h6 className="mb-0">
                                                <a  className="collapsed " data-toggle="collapse" data-parent="#accordion2" href="#collapseThree2" aria-expanded="false" aria-controls="collapseThree2">
                                                    <span className="font-weight-bold text-uppercase txt-left-mob nav-item">Installation services</span>
                                                </a>
                                            </h6>
                                        </div>
                                        <div id="collapseThree2" className="collapse" role="tabpanel" aria-labelledby="headingThree2">
                                            <div className="card-block">
                                                <div className="row m-0">
                                                   {
                                                     data3.map((slides, index) =>(
                                                        slides.imageTitle!=="cabinetcustom"?(<div key={index} className="col-sm-6 col-6 col-md-6">
                                                                <div className="gal_text bg-white">
                                                                    {slides.imageUrl?(<LazyLoadImage className="w-100" src={base_url + slides.imageUrl} alt="logo here" />):null}
                                                                    <h5 className="text-center w-100 p-3 font-13 font-medium"> {slides.imageTitle} </h5>
                                                                </div>
                                                        </div>):null
                                                     ))
                                                   }
                                                </div>
                                            </div>
                                            {data3.length>0?(<div className="col-12 text-center  pt-lg-5 px-0">
                                                <Link to={'/installed-services'} className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mob-view-all">View All</Link>
                                            </div>):null}
                                        </div>
                                    </div>
                                </div>
                                {manufacturing.title?(<Nav tabs className="nav-fill tab-none d-none d-xl-flex ">
                                    <NavItem className="text-uppercase txt-left-mob">
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.toggle('1'); }}
                                        >
                                            <span className="font-weight-medium font-weight-bold">{manufacturing.title}</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="text-uppercase txt-left-mob">
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggle('2'); }}
                                        >
                                            <span className="font-weight-medium font-weight-bold">{distributionservice.title}</span>
                                        </NavLink>
                                    </NavItem>

                                    <NavItem className="text-uppercase txt-left-mob">
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '3' })}
                                            onClick={() => { this.toggle('3'); }}
                                        >
                                            <span className="font-weight-medium font-weight-bold">{installationservice.title}</span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>):null}
                            </div>
                            <TabContent className="tab-none d-none d-xl-block" activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <SliderComponent item={data1} />
                                </TabPane>
                                <TabPane tabId="2">
                                    <SliderComponent item={data2} />
                                </TabPane>
                                <TabPane tabId="3">
                                    <SliderComponent item={data3} />
                                </TabPane>
                            </TabContent>
                            {data1.length>0?(<div className="col-12 text-center  pt-lg-5 px-0">
                                {this.state.activeTab === '1' ? (<Link to={'/manufacturing'} className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block d-none-mob login-blue text-white">View All</Link>) : this.state.activeTab === '2' ? (<Link to={'/distribution'} className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block d-none-mob login-blue text-white">View All</Link>) : this.state.activeTab === '3' ? (<Link to={'/installed-services'} className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block d-none-mob login-blue text-white">View All</Link>) : null}
                            </div>):null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FooterComponent;

/**
 * Define the proptypes
 */
FooterComponent.propTypes = {
    menuData: PropTypes.array,
    activeMenu: PropTypes.string
};