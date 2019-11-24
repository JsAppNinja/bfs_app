import React, { Component } from 'react';
import shadow from "../assets/img/shadow.png";
import {globalVar} from "../config"; 
var base_url = globalVar.base_url1;

class BfsTermsComponent extends Component {

    constructor() {
        super();

        //Defining state variable
        this.state = {
            termData:[]
        }
    }

    componentDidMount(){
        this.getTermData();
    }


    /**
     * To get term data through API
    */
    getTermData(){
        let RootId = 12931;
        fetch(globalVar.base_url1 + '/umbraco/api/Content/get/' + RootId, {
            method: 'get'
          }).then((response) => {
            return response.json();
          }).then((data) => {
            let termDataArray = [];
            termDataArray.push(data.Properties);
            this.setState(
              {
                termData: termDataArray
              }
            )
          }).catch(() => {
            
          });
    }

    render() {
        //Variable to store data fetched through api
        let backimage = "";
		let content   = "";
        let pagetitle = "";
        
        //Checking whether data recieved is empty or not
		if (this.state.termData.length > 0) {
		  if(this.state.termData[0]) {
              if(this.state.termData[0].headerBackgroundImage){
                backimage = base_url + this.state.termData[0].headerBackgroundImage;
              }else{
                  backimage = null;
              }
              
              content   = this.state.termData[0].content;
              pagetitle = this.state.termData[0].pageTitle;
		  }
		} 

        return (
            <div className="terms_mein midcontent">
                <div className="container">
                    <div className="col-12 p-0">
                        <div className="BasicPageTopWrap mt-3">
                            {backimage?(<div className="banner">
                                <img className="w-100" src={backimage} border="0" alt="Terms of use" />
                            </div>):null}

                            <h1 className="MainH1">
                                {pagetitle}
				            </h1>
                            <img className="shadow-img w-100" alt="line" title="Resource Center - Green Works " src={shadow} />
                        </div>
                        <div className="content_full" dangerouslySetInnerHTML={{ __html: content }}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BfsTermsComponent;

