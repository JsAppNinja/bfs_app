import React, { Component } from 'react';
import { globalVar } from "../config";
import { topFunction } from "../utils";
var base_url = globalVar.base_url1;
var communitylistdata = [];

class CommunityComponent extends Component {
    
    constructor(props) {
        super(props);

        //Setting state variable
        this.state = {
            image:"",
            mobileimage:"",
            title:"",
            headercontent:"",
            communitylink:[],
            communitydata:[]
        }
    }

    /**
     * Getting community data from api
    */
    getCommunityData(){
        let self = this;
        let RootId = 12845
        fetch(globalVar.base_url1 + '/umbraco/api/Content/Get/' + RootId, {
                method: 'get'
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if(data.Properties){
                    let communitydata = data.Properties
                    communitylistdata = JSON.parse(communitydata.communityList);
                    let arr = [];
                    for (let i = 0; i < communitylistdata.length; i++) {
                        let link = JSON.parse(communitylistdata[i].communityLink);
                        if(link){
                            arr.push(link[0]);
                        }
                    }
                    if(communitydata.headerBackgroundImage){
                       var image = base_url + communitydata.headerBackgroundImage
                    }else{
                        image = null
                    }

                    if(communitydata.headerMobileBackgroundImage){
                        var mobileimage = base_url + communitydata.headerMobileBackgroundImage
                    }else{
                        mobileimage = null
                    }
                    self.setState(
                        {
                            image:image,
                            mobileimage:mobileimage,
                            title:communitydata.pageTitle,
                            headercontent:communitydata.content,
                            communitylink:arr,
                            communitydata:JSON.parse(communitydata.communityList)
                        }
                    )
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
                                <div className="comm-bannr-txt" dangerouslySetInnerHTML={{ __html: this.state.headercontent }}></div>
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
                                        <a className={index === 0 ? "p-3 accord_style " : "p-3 accord_style collapsed"} id={"collpase" + index} role="button" data-toggle="collapse" href={'#collapse-' + index} aria-expanded={index === 0 ? "true": "false"} aria-controls={'collapse-' + index} onClick={() => this.scrollToTop(community.communityName)}>
                                            {community.communityName}
                                        </a>
                                    </h5>
                                </div>
                                <div id={'collapse-' + index} className={index === 0 ? "collapse show" : "collapse"} data-parent="#accordion" aria-labelledby={'heading-' + index}>
                                    <div className="card-body">
                                        <div className="d-xl-flex align-items-start mb-4">
                                            <span className="align-top m-auto d-block m-xl-0 text-center"><img src={base_url + community.communityImage} alt="home aid logo" /></span>
                                            <div className="align-top mb-0 pt-xl-5">
                                                <span dangerouslySetInnerHTML={{ __html: community.communityAbout }}></span>
                                                {this.state.communitylink[index]?(<div className="col-12 p-0 mt-4"><a href={this.state.communitylink[index].link} target="_blank" rel="noopener noreferrer" className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mb-4">Learn More </a></div>):null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-gray d-block">
                    <div className="container desk-accordian px-0 container p-0">
                        <div className="row mx-0 text-center-mob">
                            <div className="container-fluid p-0">
                                {this.state.communitydata.map((community, index) => (
                                    <div key={index} className="d-lg-flex align-items-start my-lg-5">
                                        <span className="align-top m-auto d-block m-lg-0 mr-lg-5 text-center"><img className="ct-shadow" src={base_url + community.communityImage} alt="home aid logo" /></span>
                                        <div className="align-top mb-0 ml-lg-5">
                                            <h2 className="display-4 dis-4-tab font-weight-normal mb-4">{community.communityName}</h2>
                                            <span dangerouslySetInnerHTML={{ __html: community.communityAbout }}></span>
                                            {this.state.communitylink[index]?(<div className="col-12 p-0 mt-4"><a href={this.state.communitylink[index].link} target="_blank" rel="noopener noreferrer" className="btn theme-btn text-uppercase bg-info px-4 py-3 d-inline-block login-blue text-white mb-4">Learn More </a></div>):null}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CommunityComponent;
