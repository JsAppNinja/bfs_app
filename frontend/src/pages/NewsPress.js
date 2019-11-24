//importing library
import React, { Component } from 'react';
import Moment from 'react-moment';
import Icon_Pdf from "../assets/img/Icon_Pdf.png";
import shadow from "../assets/img/shadow.png";
import { globalVar } from "../config";

//global variable
var base_url = globalVar.base_url1;

class NewsPressComponent extends Component {

    constructor() {
        super();

        //defining state varibale
        this.state = {
            content: [],
            title: "",
            backimage: "",
            contentdata: ""
        }
    }

    /**
     * Get the page data
     */
    getNewsPressData() {
        let RootId = 12890;
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
                    title: data.Properties.pageTitle,
                    content: JSON.parse(data.Properties.documents),
                    backimage: backimage,
                    contentdata: data.Properties.content
                }
            )
        }).catch(() => {
        });
    }

    componentDidMount() {
        this.getNewsPressData()
    }

    render() {
        return (
            <div className="container midcontent">
                <div className="col-12">
                    <div className="BasicPageTopWrap mt-3">
                        {this.state.backimage ?
                            (<div className="banner">
                                <img className="w-100" src={this.state.backimage} border="0" alt="Resource Center - Green Works " />
                            </div>) : null
                        }
                        <h1 className="MainH1">
                            {this.state.title}
                        </h1>
                        <h5 dangerouslySetInnerHTML={{ __html: this.state.contentdata }}>

                        </h5>
                        {this.state.backimage ? (<img className="shadow-img w-100" alt="line" src={shadow} />) : null}
                    </div>
                    <div className="content_full">
                        <ul className="DocListWrap clearfix">
                            {
                                this.state.content.map((newspress, index) => (
                                    newspress.hidden === "0" ? (
                                        <li key={index}>
                                            <a href={base_url + newspress.file} className="PDFLink" target="_blank" rel="noopener noreferrer">
                                                <div className="listingPDF">
                                                    <div className="IconWrap">
                                                        <img src={Icon_Pdf} alt="pdficon" />
                                                    </div>
                                                    <div className="DocInfo">
                                                        <div className="">
                                                            <span className="DocName" title={newspress.documentName}>{newspress.documentName}</span><br />
                                                            <span className="ReleaseDate">
                                                                <Moment format="DD/MM/YYYY HH:mm">
                                                                    {newspress.releaseDate}
                                                                </Moment>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    ) : null
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsPressComponent