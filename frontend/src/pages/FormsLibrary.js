
//imprting library
import React, { Component } from 'react';
import Icon_Pdf from "../img/Icon_Pdf.png";
import shadow from "../img/shadow.png";
import { globalVar } from "../config";

//Global variable
var base_url = globalVar.base_url1;

class FormsLibraryComponent extends Component {

  constructor() {
    super();

    //defining state variable
    this.state = {
      content: [],
      title: "",
      backimage: "",
      contentdata: ""
    }
  }

  /**
   * GEt the page content
   */
  getFormsLibraryData() {
    let RootId = 12857;
    fetch(globalVar.base_url1 + '/umbraco/api/Content/Get/' + RootId, {
      method: 'get'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data) {
        if(data.Properties.headerBackgroundImage){
          var backimage = base_url + data.Properties.headerBackgroundImage
        }else{
          backimage = null;
        }
        this.setState(
          {
            title: data.Properties.pageTitle,
            content: JSON.parse(data.Properties.documents),
            backimage: backimage,
            contentdata: data.Properties.content
          }
        )
      }
    }).catch(() => {
    });
  }

  componentDidMount() {
    this.getFormsLibraryData();
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
            <h5 dangerouslySetInnerHTML={{ __html: this.state.contentdata }} className="contentdata">

            </h5>
            {this.state.backimage ? (<img className="shadow-img w-100" alt="line" src={shadow} />) : null}
          </div>
          <div className="content_full">
            <ul className="DocListWrap clearfix">
              {this.state.content.map((formslibrary, index) => (
                formslibrary.hidden === "0" ? (
                  <li key={index}>
                    <a href={base_url + formslibrary.file} className="PDFLink" target="_blank" rel="noopener noreferrer" >
                      <div className="listingPDF">
                        <div className="IconWrap">
                          <img src={Icon_Pdf} alt="pdf1" />
                        </div>
                        <div className="DocInfo">
                          <div className="Doc_content_detail">
                            <span className="DocName" title={formslibrary.documentName}>{formslibrary.documentName} </span><br />
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                ) : null
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default FormsLibraryComponent