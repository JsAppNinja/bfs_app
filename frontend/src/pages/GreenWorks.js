//importing library
import React, { Component } from 'react';
import shadow from "../img/shadow.png";
import { globalVar } from "../config";

//Global variable
var base_url = globalVar.base_url1;

class GreenWorksComponent extends Component {

	constructor() {
		super();

		//Defining state variable
		this.state = {
			content: "",
			title: "",
			backimage: ""
		}
	}

	/**
	 * Get the page content
	 */
	getGreenWorksData() {
		let RootId = 12849
		fetch(globalVar.base_url1 + '/umbraco/api/Content/Get/' + RootId, {
			method: 'get'
		}).then((response) => {
			return response.json();
		}).then((data) => {
			if(data.Properties.headerBackgroundImage){
				var backimage = base_url + data.Properties.headerBackgroundImage
			}else{
				backimage = null
			}
			this.setState(
				{
					content: data.Properties.content,
					title: data.Properties.pageTitle,
					backimage: backimage
				}
			)
		}).catch(() => {
		});
	}

	componentDidMount() {
		this.getGreenWorksData();
	}

	render() {
		return (
			<div className="container midcontent">
				<div className="col-12">
					<div className="BasicPageTopWrap mt-3">
						{this.state.backimage ? (
							<div className="banner">
								<img className="w-100" src={this.state.backimage} border="0" alt="Resource Center - Green Works " />
							</div>
						) : null}
						<h1 className="MainH1">
							{this.state.title}
						</h1>
						{this.state.backimage ? (<img className="shadow-img w-100" alt="line" title="Resource Center - Green Works " src={shadow} />) : null}
					</div>
					<div className="content_full pt-0  my-4">
						<div className="row" dangerouslySetInnerHTML={{ __html: this.state.content }}>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default GreenWorksComponent