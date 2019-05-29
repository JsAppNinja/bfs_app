import React, { Component } from 'react';
import { globalVar } from "../config";
var base_url = globalVar.base_url1;

class ConstructionTypeComponent extends Component {

    constructor() {
        super();

        //defining state variable
        this.state = {
            url: "",
            title:"",
            content:"",
            constructiontypeData:[]
        };
    }


    componentDidUpdate() {
        if (this.state.constructiontypeData && this.state.constructiontypeData.length > 0) {
            setTimeout(() => {
                this.scrollToTopic()
            }, 500)
        }
    }


    /**
     * To get construction type data through API
    */
    getConstructionTypeData() {
        let RootId = 12831
        fetch(globalVar.base_url1 + '/umbraco/api/Content/Get/' + RootId, {
            method: 'get'
          }).then((response) => {
            return response.json();
          }).then((data) => {
             if(data){
                 this.setState(
                     {
                         title: data.Properties.title,
                         content: data.Properties.content
                     }
                 )
             }
          }).catch(() => {
            
          });

         fetch(globalVar.base_url1 + '/umbraco/Api/Content/getChildren/' + RootId, {
            method: 'get'
          }).then((response) => {
            return response.json();
          }).then((data) => {
            this.setState(
              {
                constructiontypeData: data
              }
            )
          }).catch(() => {
            
          });

    }

    componentDidMount() {
        this.setState({ url: window.url })
        this.getConstructionTypeData();
    }
    

    /**
     * Code to scroll to particular section 
    */
    scrollToTopic() {
        window.location.hash = window.decodeURIComponent(window.location.hash);
        var hashParts = []
        var scrollToAnchor = () => {
            hashParts = window.location.hash.split('#');
            if (hashParts.length > 0) {
                if (hashParts[1] === "residential" || hashParts[1] === "commercial" || hashParts[1] === "remodel") {
                    document.querySelector(`#${hashParts[1]}`).scrollIntoView();
                }

            }
        };
        scrollToAnchor();
        window.onhashchange = scrollToAnchor;
    }


    render() {
        let constructiondata = [];
        if (this.state.constructiontypeData.length > 0) {
            for (let i = 0; i < this.state.constructiontypeData.length; i++) {
                var divid = "others";
                if (this.state.constructiontypeData[i].Name === "Commercial Multi-Family") {
                    divid = "commercial"
                }
                if (this.state.constructiontypeData[i].Name === "Remodel") {
                    divid = "remodel"
                }
                if (this.state.constructiontypeData[i].Name === "Residential") {
                    
                    divid = "residential"
                }
                if(this.state.constructiontypeData[i].Properties.image1){
                    var image1 = base_url + this.state.constructiontypeData[i].Properties.image1
                }else{
                    image1 = null;
                }

                if(this.state.constructiontypeData[i].Properties.image2){
                    var image2 = base_url + this.state.constructiontypeData[i].Properties.image2
                }else{
                    image2 = null;
                }
                constructiondata.push(
                    {
                        image1: image1,
                        image2: image2,
                        title: this.state.constructiontypeData[i].Properties.title,
                        about: this.state.constructiontypeData[i].Properties.about,
                        id: divid
                    }
                )
            }
        }

        return (
            <div className="col-12 p-0 midcontent">
                <div className="bg-gray">
                    <div className="container">
                        <div className="w-100 py-5">
                            <h1 className="display-4 font-weight-medium text-center">{this.state.title}</h1>
                            <h5 dangerouslySetInnerHTML={{ __html: this.state.content }} className="display-6 font-weight-medium text-center"></h5>
                        </div>
                    </div>
                </div>
                {
                    constructiondata.map((item, i) => {
                        return (
                            <div key={i} id={item.id} className={i===0?"bg-gray resident-section d-flex col-12":"pt-5 bg-gray resident-section d-flex col-12"} >
                                <div className="w-100 position-relative " >
                                    <div className="container px-0">
                                        <div className="row">
                                            <div className=" col-12 col-sm-12 col-md-12 col-xl-6  ">
                                                <h4 dangerouslySetInnerHTML={{ __html: item.title }} className="display-4 dis-4-tab font-weight-normal"></h4>
                                                <span dangerouslySetInnerHTML={{ __html: item.about }}></span>
                                            </div>
                                            <div className="col-12  col-md-12 col-xl-6 image-layer pr-3 pr-xl-0">
                                                {item.image1 ? (<figure className="mb-4 section_fig"><img src={item.image1} alt="section_2" className="w-100" /></figure>) : null}
                                                {item.image2 ? (<figure className="mb-4 section_fig"><img src={item.image2} alt="section_2" className="w-100" /></figure>) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default ConstructionTypeComponent;
