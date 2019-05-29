import React, { Component } from 'react';
import { globalVar } from "../config";
class AboutUsComponent extends Component {

    constructor() {
        super();

        //defining state
        this.state = {
            content:"",
            title:""
        }
    }

    /**
     * To get About us data through API
    */
    getAboutUsData() {
        let RootId = 12760;
        fetch(globalVar.base_url1 + "/umbraco/api/Content/getChildren/" + RootId, {
            method: 'get'
            }).then((response) => {
            return response.json();
            }).then((data) => {
                if(data){
                    this.setState(
                        {
                            content: data[0].Properties.content,
                            title: data[0].Properties.title
                        }
                    )
                }
            }).catch(() => {
                 
            });
    }

    componentDidMount() {
        this.getAboutUsData();
    }

    render() { 
        return (
            <div className="midcontent">
                <div className="disp-none-sm col-12 p-0 bg-gray">
                    <div className="bg-gray col-12 p-0 pt-md-5 pt-3">
                        <div className="container">
                            <div className="align-items-center justify-content-center col-12 col-lg-11 m-auto">
                                <div className="col col-xl-12 text-center px-0 ">
                                    <h1 className="display-4 font-weight-medium color-dark-gray mb-0">{this.state.title}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="aboutUs_text" dangerouslySetInnerHTML={{ __html: this.state.content }}>
                </div> 
            </div>
        );
    }
}

export default AboutUsComponent;
