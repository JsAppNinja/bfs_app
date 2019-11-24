import React, { Component } from 'react';
import { globalVar } from "../config";
import { topFunction } from "../assets/js/utils";
var base_url = globalVar.base_url1;
var communitylistdata = [];

class CommunityComponent extends Component {

    constructor(props) {
        super(props);

        //Setting state variable
        this.state = {
            image: "",
            mobileimage: "",
            title: "",
            headercontent: "",
            communitylink: [],
            communitydata: []
        }
    }
    // https://bfs.protacto.com/umbraco/api/Content/GetChildren/12845
    /**
     * Getting community data from api
    */
    getCommunityData() {
        let self = this;
        let RootId = 12845
        fetch(globalVar.base_url1 + '/umbraco/api/Content/Get/' + RootId, {
            method: 'get'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.Properties) {
                let communitydata = data.Properties

                fetch(globalVar.base_url1 + '/umbraco/api/Content/GetChildren/' + RootId, {
                    method: 'get'
                }).then((response) => {
                    return response.json();
                }).then((datas) => {
                    if (datas) {

                        communitylistdata = datas
                        let arr = [];
                        let comunityProp = []
                        for (let i = 0; i < communitylistdata.length; i++) {
                            let link =(communitylistdata[i].Properties.communityLink);
                            if(link){
                                arr.push(JSON.parse(link)[0]);
                            }
                            comunityProp.push(communitylistdata[i].Properties)
                        }

                        if (communitydata.headerBackgroundImage) {
                            var image = base_url + communitydata.headerBackgroundImage
                        } else {
                            image = null
                        }

                        if (communitydata.headerMobileBackgroundImage) {
                            var mobileimage = base_url + communitydata.headerMobileBackgroundImage
                        } else {
                            mobileimage = null
                        }
                        self.setState(
                            {
                                image: image,
                                mobileimage: mobileimage,
                                title: communitydata.pageTitle,
                                headercontent: communitydata.content,
                                communitylink: arr,
                                communitydata: comunityProp
                            }
                        )

                    }
                })



            }
        }).catch(() => {

        });
    }

    componentDidMount() {
        this.getCommunityData();
    }


    /**
     * Function for browser scroll
    */
    scrollToTop() {
        topFunction()
        setTimeout(() => {
            window.scrollBy(0, -230);
        }, 500)
    }


    render() {
        return (
            <div className="col-12 p-0 midcontent">
                <div className="col-12 p-0 community-banner bg-secondary">
                    {this.state.image ? (<img className="w-100 desk_img" src={this.state.image} alt="heroimage" />) : null}
                    <div className="mb_comm_img">
                        {this.state.mobileimage ? (<img className="w-100 mb_img" src={this.state.mobileimage} alt="heroimage" />) : null}
                    </div>

                    <div className="position-absolute w-100 h-100 banner-text">
                        <div className="container d-flex h-100 align-item-center">
                            <div className="txt-white-mob m-auto row mx-0 col-11 py-4">
                                <h1 className="display-2 w-100 text-white text-center font-weight-normal">{this.state.title}</h1>
                                <div className="comm-bannr-txt community-ban" dangerouslySetInnerHTML={{ __html: this.state.headercontent }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="mob-accordian my-5" id="accordion">
                        {this.state.communitydata.map((community, index) => (
                            <div key={index} className="card" id={community.communityName}>
                                <div className="card-header  p-0" id={'heading-' + index}>
                                    <h5 className="mb-0">
                                        <a className={index === 0 ? "p-3 accord_style " : "p-3 accord_style collapsed"} id={"collpase" + index} role="button" data-toggle="collapse" href={'#collapse-' + index} aria-expanded={index === 0 ? "true" : "false"} aria-controls={'collapse-' + index} onClick={() => this.scrollToTop(community.communityName)}>
                                            {community.communityName}
                                        </a>
                                    </h5>
                                </div>
                                <div id={'collapse-' + index} className={index === 0 ? "collapse show" : "collapse"} data-parent="#accordion" aria-labelledby={'heading-' + index}>
                                    <div className="card-body">
                                        <div className="d-xl-flex align-items-start mb-4">
                                            <span className="align-top m-auto d-block m-xl-0 text-center"><img src={base_url + community.communityImage} alt="home aid logo" /></span>
                                            <div className="align-top mb-0 pt-xl-5">
                                                <span className="construct-desc" dangerouslySetInnerHTML={{ __html: community.communityAbout }}></span>
                                                {this.state.communitylink[index] ? (<div className="col-12 p-0 mt-4"><a href={this.state.communitylink[index].link} target="_blank" rel="noopener noreferrer" className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mb-4">Learn More </a></div>) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-gray d-block">
                    <div className="container desk-accordian px-0 container p-0 pt-5">
                        {this.state.communitydata.map((community, index) => (
                            <div key={index} className="row pb-5">
                                <div className="col-md-2 align-top m-auto d-block  text-center"><img className="ct-shadow img-fluid" src={base_url + community.communityImage} alt="home aid logo" /></div>
                                <div className="col-md-10 align-top mb-0 ">
                                    <h2 className="display-4 dis-4-tab font-weight-normal mb-4">{community.communityName}</h2>
                                    <span className="construct-desc" dangerouslySetInnerHTML={{ __html: community.communityAbout }}></span>
                                    {this.state.communitylink[index] ? (<div className="col-12 p-0 mt-4"><a href={this.state.communitylink[index].link} target="_blank" rel="noopener noreferrer" className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mb-4">Learn More </a></div>) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default CommunityComponent;
