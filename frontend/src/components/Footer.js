
//Import statement
import React, { Component } from 'react';
import { topFunctionButtonClick } from "../assets/js/utils";
import uparrwo from "../assets/img/up-arrow-key.png"
import { globalVar } from "../config";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

//Global variable
var base_url = globalVar.base_url1;

class FooterComponent extends Component {
    constructor(props) {
        super(props);

        //Defining state variable
        this.state = {
            hideScroll: true,
            dropdownOpen: false,
            menuName: "Main menu"
        };

        //Binding function
        this.setCaption = this.setCaption.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidUpdate() {
        let name = (this.props.activeMenu && this.props.activeMenu !== '/') ? this.props.activeMenu.split("-").join(" ").toUpperCase() : "/Main Menu";
        name = name.slice(1, name.length)
        if (name !== this.state.menuName) {
            this.setCaption(name)
        }
    }


    /**
	 * Show or hide dropdown
	*/
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    /**
	 * Setting caption
	*/
    setCaption(caption) {
        this.setState({
            menuName: caption
        })
    }

    render() {
        //varibale for setting data fetched through API
        let data = {};
        let footerlinks = [];
        let footercontent = "";

        //checking whether data fetched from API is empty or not
        if (this.props.menuData) {
            if (this.props.menuData[0]) {
                if(this.props.menuData[0].Properties.footerLogo){
                    var footerlogo = base_url + this.props.menuData[0].Properties.footerLogo;
                }else{
                    footerlogo = this.props.menuData[0].Properties.footerLogo;
                }
                data["footertitle"] = this.props.menuData[0].Properties.copyrightText
                data["footerlogo"] = footerlogo;
                footerlinks = JSON.parse(this.props.menuData[0].Properties.links);
                footercontent = this.props.menuData[0].Properties.footerContent;
            }
        }
        return (
            <footer className="footr">
                {this.state.hideScroll ? (
                    <button className="btn gotop" onClick={() => topFunctionButtonClick()}>
                        <img src={uparrwo} alt="up-arrow" />
                    </button>
                ) : null}
                <div className="container py-5 px-0">
                    <div className="row align-items-center justify-content-between m-0">
                        {data.footerlogo ? (<div className="col-md-12 col-md-6 col-sm-12 text-center-media ftr-logo px-3 px-md-0">
                            <h3 className="text-white mb-0"><img src={data.footerlogo} alt="footer img logo-footer" /></h3>
                        </div>) : null}
                    </div>
                    <div className="col-12 pt-3 px-0 ">
                        <p className="text-white mob-wid-75">{data.footertitle}</p>
                    </div>
                    <div className="footer_form w-100 p-4 d-flex d-xl-none">
                        <div className="form-group bg-transparent position-relative w-100">
                            <Dropdown className="w-100" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret>
                                    {this.state.menuName}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {footerlinks.map(function (footerlink, index) {
                                        if (!footerlink.isExternalLink) {
                                            return (<DropdownItem onClick={() => { this.setCaption(footerlink.caption) }} key={index}> <Link to={footerlink.link}> {footerlink.caption}</Link></DropdownItem>
                                            )
                                        } else {
                                            return (<DropdownItem onClick={() => { this.setCaption(footerlink.caption) }} key={index}><a href={footerlink.link} rel="noopener noreferrer" target="_blank"> {footerlink.caption} </a></DropdownItem>)
                                        }
                                    }.bind(this))}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="d-none d-xl-block text-center-media px-3 px-md-0">
                        <nav className="navbar  navbar-expand-lg navbar-light w-100 mt-2 pr-0 pl-0">
                            <div className="navbar-collapse mt-3 mb-2 my-lg-0" id="navbarSupportedContent">
                                <ul className="navbar navbar-nav p-0 font-weight-semi-bold align-items-start footer-menu">
                                    {footerlinks.map(function (footerlink, index) {
                                        return <li key={index} className="nav-item">

                                            {
                                                footerlink.isExternalLink ? (
                                                    <a href={footerlink.link} target="_blank" rel="noopener noreferrer" className="nav-link pl-0 text-white text-white-hover text-uppercase">
                                                        {footerlink.caption}</a>)
                                                    :
                                                    (<Link to={footerlink.link} className="nav-link pl-0 text-white text-white-hover text-uppercase">
                                                        {footerlink.caption}
                                                    </Link>)

                                            }
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className="text-center-media  bg-red_mob ">
                        <span dangerouslySetInnerHTML={{ __html: footercontent }}></span>
                    </div>
                </div>
            </footer>
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