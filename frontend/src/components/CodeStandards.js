import React, { Component } from 'react';
import shadow from "../img/shadow.png";
import {globalVar} from "../config"; 
var base_url = globalVar.base_url1;


class CodeStandardComponent extends Component{

	constructor() {
		super();
		
		//Setting state variable
        this.state = {
            content:"",
			title:"",
			backimage:""
        }
    }

    /**
     * Getting code standard data from api
    */
	getCodeStandardData() {
		let RootId = 12847;
		fetch(globalVar.base_url1 + '/umbraco/api/Content/Get/' + RootId, {
            method: 'get'
          }).then((response) => {
            return response.json();
          }).then((data) => {
             if(data){
				 if(data.Properties.headerBackgroundImage){
					 var backimage = base_url + data.Properties.headerBackgroundImage;
				 }else{
					 backimage = null;
				 }
				 this.setState(
					 {
						 content: data.Properties.content,
						 title: data.Properties.pageTitle,
						 backimage:backimage
					 }
				 )
			 }
          }).catch(() => {
    
          });
	}
    
    componentDidMount() {
		 this.getCodeStandardData()
    }

    render() {
        return (
		   <div className="midcontent">
            <div className="container">
				<div className="col-12">
					<div className="BasicPageTopWrap mt-3">
						{this.state.backimage?(
						<div className="banner">
							<img className="w-100" src={this.state.backimage} border="0" alt="Resource Center - Green Works " /> 
						</div>
						):null}
						{this.state.title?(<h1 className="MainH1">
							{this.state.title}
						</h1>):null}
						{this.state.backimage?(<img className="shadow-img w-100" alt="line" title="Resource Center - Green Works " src={shadow} />):null}
					</div>
					<div className="content_full pt-0  my-4">
						<div className="row">
							<span dangerouslySetInnerHTML={{ __html: this.state.content }}></span>
						</div>
					</div>
				</div>
			</div>
		  </div>
        )
    }
}

export default CodeStandardComponent