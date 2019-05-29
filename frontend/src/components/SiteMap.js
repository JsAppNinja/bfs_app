//importing library
import React, { Component } from 'react';
import shadow from "../img/shadow.png";
import hm from "../img/hm.png";
import axios from 'axios';
import { Link } from "react-router-dom";
import { globalVar } from "../config";

class SitemapComponent extends Component {
    constructor() {
        super();

        //defining state variable
        this.state = {
            showLoader: true,
            imgAndTitle: null,
            linksArray: []
        }
    }

    componentDidMount() {
        this.gettingImgAndTitle();
        this.getSiteMapContent();
    }

    /**
    * Getting site map page image and title
    */
    gettingImgAndTitle() {
        axios.get(globalVar.base_url1 + "/umbraco/Api/Content/get/12965", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            if (response.status === 200) {
                this.setState({
                    imgAndTitle: response.data.Properties,
                    showLoader: false
                });
            }
        }).catch(() => {
        });
    }


    /**
    * Getting site map page content
    */
    getSiteMapContent() {
        axios.get(globalVar.base_url1 + "/umbraco/Api/Content/GetSiteMapContent", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            if (response.status === 200) {
                this.setState({
                    linksArray: response.data,
                });
            }
        }).catch(() => {
        });
    }

    render() {
        return (
            <div className="site_map_mein midcontent">
                <div className="container">
                    <div className="col-12 p-0">
                        {
                            this.state.showLoader ? null : (<div className="BasicPageTopWrap mt-3">
                                {this.state.imgAndTitle.headerBackgroundImage?(<div className="banner">
                                    <img className="w-100" src={globalVar.base_url1 + this.state.imgAndTitle.headerBackgroundImage} border="0" alt="Resource Center - Green Works " />
                                </div>):null}
                                <h1 className="MainH1">
                                    {this.state.imgAndTitle.pageTitle}
                                </h1>
                                <h5 dangerouslySetInnerHTML={{ __html: this.state.imgAndTitle.content }}></h5>
                                <img className="shadow-img w-100" alt="line" title="Resource Center - Green Works " src={shadow} />
                            </div>)
                        }
                        <div className="content_full">
                            <div className="SiteMap clearfix">
                                <div className="SiteMapWrap">
                                    <div className="SiteMapHome"><a href="/" title="Home"><img id="__mcenew" src={hm} alt="Home" /></a></div>
                                    {this.state.showLoader ? null : (<div> <div className="grid">
                                        <ul>
                                            {JSON.parse(this.state.imgAndTitle.tab1Links).map(function (item, index) {
                                                return (<li key={index}><Link to={item.link}> {item.caption}</Link></li>)
                                            })}
                                        </ul>
                                    </div>
                                        <div className="grid">
                                            <ul>
                                                <li>
                                                    <Link to={this.state.imgAndTitle.tab2Link}> {this.state.imgAndTitle.tab2Title}</Link>
                                                    <ul>
                                                        {JSON.parse(this.state.imgAndTitle.tab2Links).map(function (item, index) {
                                                            return (<li key={index}><Link to={item.link}> {item.caption}</Link></li>)
                                                        })}
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>)}
                                    {
                                        this.state.linksArray.map(function (item, index) {
                                            return (
                                                <div className="grid" key={index}>
                                                    <ul>
                                                        <li>
                                                            <Link to={item.Url}> {item.Name}</Link>
                                                            <ul>
                                                                {item.Childrens.map(function (data, i) {
                                                                    return (<li key={i}><Link to={data.Url}> {data.Name}</Link></li>)
                                                                })}
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SitemapComponent;

