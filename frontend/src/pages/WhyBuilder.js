import React, { Component } from 'react';
import { globalVar } from "../config";
var base_url = globalVar.base_url1;
class WhyBuilderComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      whybuilderData: []
    }
  }

  /**
   * Fetch the page data
   */
  getWhyBuilderData() {
    let RootId = 12921
    fetch(globalVar.base_url1 + '/umbraco/api/Content/get/' + RootId, {
      method: 'get'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      let whybuilderDataArray = [];
      whybuilderDataArray.push(data.Properties);
      this.setState(
        {
          whybuilderData: whybuilderDataArray
        }
      )
    }).catch(() => {
    });
  }

  componentDidMount() {
    this.getWhyBuilderData();
    setTimeout(() => {
      this.scrollToTopic()
    }, 500)
  }

  scrollToTopic() {
        window.location.hash = window.decodeURIComponent(window.location.hash);
        var hashParts = []
        var scrollToAnchor = () => {
            hashParts = window.location.hash.split('#');
            if (hashParts.length > 0) {
                document.querySelector(`#${hashParts[1]}`).scrollIntoView();
            }
        };
        scrollToAnchor();
        window.onhashchange = scrollToAnchor;
  }

  render() {
    let data = {};
    if (this.state.whybuilderData.length > 0) {
      if (this.state.whybuilderData[0]) {
        data["bannercaption"] = this.state.whybuilderData[0].bannerCaption;
        if(this.state.whybuilderData[0].bannerImage){
          data["bannerimage"] = base_url + this.state.whybuilderData[0].bannerImage;
        }else{
          data["bannerimage"] = null
        }
        
        data["careercontent"] = this.state.whybuilderData[0].careerContent;
        if(this.state.whybuilderData[0].leftColumnImage){
          data["leftcolumnimage"] = base_url + this.state.whybuilderData[0].leftColumnImage;
        }else{
          data["leftcolumnimage"] = null;
        }
       
        data["rightcolumntoptext"] = this.state.whybuilderData[0].rightColumnTopText;
        data["rightcolumnquote"] = this.state.whybuilderData[0].rightColumnQuote;
        data["rightcolumnbottomtext"] = this.state.whybuilderData[0].rightColumnBottomText;
        data["leftcolumnquote"] = this.state.whybuilderData[0].leftColumnQuote;
        if(this.state.whybuilderData[0].value1Image){
          data["value1image"] = base_url + this.state.whybuilderData[0].value1Image;
        }else{
          data["value1image"] = null;
        }
       
        data["value1desc"] = this.state.whybuilderData[0].value1Desc;
        if(this.state.whybuilderData[0].value2Image){
          data["value2image"] = base_url + this.state.whybuilderData[0].value2Image;
        }else{
          data["value2image"] = null;
        }
        
        data["value2desc"] = this.state.whybuilderData[0].value2Desc;
        if(this.state.whybuilderData[0].value3Image){
          data["value3image"] = base_url + this.state.whybuilderData[0].value3Image;
        }else{
          data["value3image"] = null;
        }
        data["value3desc"] = this.state.whybuilderData[0].value3Desc;
        if(this.state.whybuilderData[0].value4Image){
          data["value4image"] = base_url + this.state.whybuilderData[0].value4Image;
        }else{
          data["value4image"] = null;
        }
        
        data["value4desc"] = this.state.whybuilderData[0].value4Desc;
        if(this.state.whybuilderData[0].value5Image){
          data["value5image"] = base_url + this.state.whybuilderData[0].value5Image;
        }else{
          data["value5image"] = null;
        }
        
        data["value5desc"] = this.state.whybuilderData[0].value5Desc;
        if(this.state.whybuilderData[0].value6Image){
          data["value6image"] = base_url + this.state.whybuilderData[0].value6Image;
        }else{
          data["value6image"] = null;
        }
       
        data["value6desc"] = this.state.whybuilderData[0].value6Desc;
      }
    }
    return (
      <div className="job_area_mein why_build midcontent">
        <div className="col-12 p-0">
          {data.bannerimage ? (<div className="col-12 p-0 CareerSubBanner CareerMobileBanner" style={{ backgroundImage: 'Url(' + data.bannerimage + ')', backgroundSize: 'cover', backgroundPositionX: 'center',backgroundPositionY: 'top' }}>


            {/* <img alt="bannerimage" className="w-100 h-100" src={data.bannerimage} /> */}


            {data.bannercaption ? (<div className="CareersBannerCaption w-100 position-absolute">
              <div className="container">
                <h1 className="display-4 ts-family text-white over-shadow">{data.bannercaption}</h1>
              </div>
            </div>) : null}

          </div>
          ) : null}
        </div>
        <div className="career_sub_content WhyBuilders">
          <section className="clearfix">
            <div className="row m-0">
              <div className="TopColumn col-md-6">
                {data.leftcolumnimage ? (<img src={data.leftcolumnimage} alt="whyblders" />) : null}
                {data.leftcolumnquote ? (<div className="FocusedParagraph">
                  <p dangerouslySetInnerHTML={{ __html: data.leftcolumnquote }}>
                  </p>
                </div>) : null}
              </div>
              <div className="TopColumn col-md-6">
                <div>
                  {data.rightcolumntoptext ? (<span dangerouslySetInnerHTML={{ __html: data.rightcolumntoptext }}></span>) : null}
                  <div className="FocusedParagraph">
                    <p dangerouslySetInnerHTML={{ __html: data.rightcolumnquote }}></p>
                  </div>
                  {data.rightcolumnbottomtext ? (<div className="LargeVisible" dangerouslySetInnerHTML={{ __html: data.rightcolumnbottomtext }}>

                  </div>) : null}
                </div>
              </div>
            </div>
          </section>
          <div className="CareeersSubContentWrap clearfix">
            <div className="CareersSubContHeader">
              <h3>Vision, Mission <span>&amp;</span> Values</h3>
            </div>
            <div className="shade_divider"></div>
            <p></p>
            {data.value1image ? (<div className="ValuesIntro">
              <div className="why_content_wrap cf">
                <p>OUR <span>VISION</span> - Helping builders fulfill their customer’s dream of affordable home ownership.</p>
                <p>OUR <span>MISSION</span> - To be the best in the industry, Builders FirstSource and its companies will strive to be every builder’s first source for building materials and services while delivering superior value to your stakeholders.</p>
              </div>
            </div>) : null}
            <p></p>
            <div className="row m-0">
              <div className="MidColumn col-md-6">
                <div className="clearfix ValueWrap">
                  {data.value1image ? (<div className="ValueIcon">
                    <img src={data.value1image} alt="safety" />
                  </div>) : null}
                  {data.value1desc ? (<div className="ValueDesc" dangerouslySetInnerHTML={{ __html: data.value1desc }}>
                  </div>) : null}
                </div>
                <div className="clearfix ValueWrap">
                  {data.value2image ? (<div className="ValueIcon"><img src={data.value2image} alt="team" /></div>) : null}
                  {data.value2desc ? (<div className="ValueDesc" dangerouslySetInnerHTML={{ __html: data.value2desc }}>

                  </div>) : null}
                </div>
                <div className="clearfix ValueWrap">
                  {data.value3image ? (<div className="ValueIcon"><img src={data.value3image} alt="customer" /></div>) : null}
                  {data.value3desc ? (<div className="ValueDesc" dangerouslySetInnerHTML={{ __html: data.value3desc }}>
                  </div>) : null}
                </div>
              </div>
              <div className="MidColumn col-md-6">
                <div className="clearfix ValueWrap">
                  {data.value4image ? (<div className="ValueIcon"><img src={data.value4image} alt="competition" /></div>) : null}
                  {data.value4desc ? (<div className="ValueDesc" dangerouslySetInnerHTML={{ __html: data.value4desc }}>
                  </div>) : null}
                </div>
                <div className="clearfix ValueWrap">
                  {data.value5image ? (<div className="ValueIcon"><img src={data.value5image} alt="integrity" /></div>) : null}
                  {data.value5desc ? (<div className="ValueDesc" dangerouslySetInnerHTML={{ __html: data.value5desc }}>
                  </div>) : null}
                </div>
                <div className="clearfix ValueWrap">
                  {data.value6image ? (<div className="ValueIcon"><img src={data.value6image} alt="recognition" /></div>) : null}
                  {data.value6desc ? (<div className="ValueDesc" dangerouslySetInnerHTML={{ __html: data.value6desc }}>
                  </div>) : null}
                </div>
              </div>
            </div>
          </div>
          <div id="benefits">
            {data.careercontent ? (<div  className="CareeersSubContentWrap">
              <div className="CareersSubContHeader">
                <h3 id="benefits">Benefits</h3>
              </div>
              <div dangerouslySetInnerHTML={{ __html: data.careercontent }} className="BenefitsContentWrap">
              </div>
            </div>) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default WhyBuilderComponent;

