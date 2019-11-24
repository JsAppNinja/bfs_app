import React, { Component } from 'react';
import left_h from "../assets/img/icon-left-h.svg";
import right_h from "../assets/img/icon-right-h.svg";
import read_arrow from "../assets/img/read-arrow.svg";
import left_icon from "../assets/img/icon-left.svg";
import right_icon from "../assets/img/icon-right.svg";
import { scrollTopLeadershipModal } from "../assets/js/utils";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import PropTypes from 'prop-types';

import { globalVar } from "../config";

class LeaderShipComponent extends Component {
    constructor() {
        super();

        //defining state variable
        this.state = {
            leaderObj: {},
            modal: false,
            leaderShipData: [],
            title: "",
            content: ""
        };

        //binding function
        this.changeModalData = this.changeModalData.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    /**
    * Changing data in popup modal about the bio of people
    */
    changeModalData = function (x) {
        let index = -1
        for (let i = 0; i < this.state.leaderShipData.length; i++) {
            if (this.state.leaderShipData[i].id === x) {
                index = i;
                break;
            }
        }
        this.setState({
            leaderObj: this.state.leaderShipData[index],
            modal: true
        })

        if (this.state.modal) {
            var root = document.getElementsByTagName('html')[0];
            root.removeAttribute('class');

        } else {
            root = document.getElementsByTagName('html')[0];
            root.setAttribute('class', 'popupclass');
        }
    }

    /**
     * Get the page content
     */
    getLeadershipData() {
        let RootId = 12807;
        let RootId1 = 12760;
        fetch(globalVar.base_url1 + "/umbraco/api/Content/getChildren/" + RootId1, {
            method: 'get'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data) {
                this.setState(
                    {
                        content: data[1].Properties.content,
                        title: data[1].Properties.title
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
            if (data) {
                let leadeShipDataArray = [];
                for (var i = 0; i < data.length; i++) {
                    leadeShipDataArray.push(data[i].Properties)
                }
                leadeShipDataArray.map((obj, index) => {
                    obj.id = index;
                    if(obj.companyUserPicture){
                        obj.companyUserPicture = globalVar.base_url1 + obj.companyUserPicture
                    }else{
                        obj.companyUserPicture = null
                    }
                    
                    return obj;
                })
                this.setState({
                    leaderShipData: leadeShipDataArray
                });
            }
        }).catch(() => {
        });
    }

    componentDidMount() {
        this.getLeadershipData()
    }

    /**
    * Open and close the popup
    */
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
        if (this.state.modal) {
            var root = document.getElementsByTagName('html')[0];
            root.removeAttribute('class');
        } else {
            root = document.getElementsByTagName('html')[0];
            root.setAttribute('class', 'popupclass');
        }
    }


    /**
    * Setting leader object variable to empty
    */
    emptyObj() {
        this.setState({ leaderObj: {} })
    }

    render() {
        return (
            <div className="col-12 p-0 midcontent">
                <div className="bg-gray pt-lg-5 py-5 pt-md-5 pt-xl-5 d-flex px-3">
                    <div className="container">
                        <div className="w-100">
                            <h1 dangerouslySetInnerHTML={{ __html: this.state.title }} className="display-4 font-weight-medium color-dark-gray text-center"></h1>
                            <span className="mob-font-ttl construct-desc" dangerouslySetInnerHTML={{ __html: this.state.content }}></span>
                        </div>
                    </div>
                </div>
                <div className="bg-gray d-flex pb-4 pb-lg-5">
                    <div className="container pb-4 pb-lg-5">
                        <div className="row m-0">
                            {this.state.leaderShipData.map((person, index) => (
                                <div className="col-md-6 col-12 col-lg-4 mb-4" key={index}>
                                    <div data-toggle="modal" data-target="#myModal" className="emp_home_section employee-section position-relative" onClick={() => this.changeModalData(person.id)}>
                                        <div className="emp_img">
                                            {person.companyUserPicture?(<img src={person.companyUserPicture} alt={person.companyUserName} />):null}
                                        </div>
                                        <div className="employee-info p-4">
                                            <div className="titles_text w-100">
                                                <h3 className="small-text-title text-white font-weight-medium">{person.companyUserName}</h3>
                                                <h5 className="small-txt-content text-white font-weight-medium text-light"> {person.companyUserPosition} </h5>
                                            </div>
                                            <button type="button" className="bg-transparent p-0 border-0 text-white font-weight-bold c-pointer">Read More
											<span className="dis-sm-none"> <img className="wid-20" src={read_arrow} alt="read_arrow" /> </span>   </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className="request-form modal-dialog-centered modal-lg leader-ship-box">
                    <ModalHeader toggle={this.toggle}></ModalHeader>
                    <ModalBody className="p-4 p-lg-5">
                        <div className="row m-0">
                            {this.state.leaderObj.companyUserPicture?(<div className="py-0 px-md-3 px-0 team-member position-relative col-sm-12 col-xl-5 text-center">
                                <img src={this.state.leaderObj.companyUserPicture} className="img-fluid" alt={this.state.leaderObj.companyUserName} />
                            </div>):null}
                            <div className="col-sm-12 col-xl-7">
                                <h1 className="display-4 font-weight-normal position-relative"> {this.state.leaderObj.companyUserName} </h1>
                                <h6 className="py-2 font-medium"> {this.state.leaderObj.companyUserPosition}</h6>
                                <div dangerouslySetInnerHTML={{ __html: this.state.leaderObj.companyUserAbout }} className="line-height mb-4 aboutuser leader-desc"></div>
                            </div>
                        </div>
                        <button type="button" onClick={() => { this.previousButton(this.state.leaderObj.id) }} className="position-absolute left-side-btn bg-transparent border-0"><img src={left_icon} className="border-icon left-img without_hover" alt="left_icon" /><img src={left_h} className="border-icon hoverable" alt="left_h" /></button>
                        <button type="button" onClick={() => { this.nextButton(this.state.leaderObj.id) }} className="position-absolute right-side-btn bg-transparent border-0"><img src={right_icon} className="border-icon right-img without_hover" alt="right_icon" /><img src={right_h} className="border-icon hoverable" alt="right_h" /></button>
                        <button type="button" onClick={() => { this.previousButton(this.state.leaderObj.id) }} className="position-absolute  arw_new_left bg-transparent border-0"><img src={left_icon} className="border-icon left-img without_hover" alt="left_icon" /><img src={left_h} className="border-icon hoverable" alt="left_h" /></button>
                        <button type="button" onClick={() => { this.nextButton(this.state.leaderObj.id) }} className="position-absolute  arw_new_right bg-transparent border-0"><img src={right_icon} className="border-icon right-img without_hover" alt="right_icon" /><img src={right_h} className="border-icon hoverable" alt="right_h" /></button>
                    </ModalBody>
                </Modal>
            </div>
        );
    }


    /**
    * Navigating to previous data in carousel
    */
    previousButton = (x) => {
        var leadershipLength = this.state.leaderShipData.length;
        if (x <= 0) {
            let index = -1;
            for (let i = 0; i < this.state.leaderShipData.length; i++) {
                if (this.state.leaderShipData[i].id === leadershipLength - 1) {
                    index = i;
                    break;
                }
            }
            scrollTopLeadershipModal()

            this.setState({
                leaderObj: this.state.leaderShipData[index]
            })
        } else {
            let index = -1;
            for (let i = 0; i < this.state.leaderShipData.length; i++) {
                if (this.state.leaderShipData[i].id === x - 1) {
                    index = i;
                    break;
                }
            }
            scrollTopLeadershipModal()

            this.setState({
                leaderObj: this.state.leaderShipData[index]
            })
        }
    }


    /**
    * Navigating to next data in carousel
    */
    nextButton = (x) => {
        if (x >= this.state.leaderShipData.length - 1) {
            let index = -1;
            for (let i = 0; i < this.state.leaderShipData.length; i++) {
                if (this.state.leaderShipData[i].id === 0) {
                    index = i;
                    break;
                }
            }
            scrollTopLeadershipModal()
            this.setState({
                leaderObj: this.state.leaderShipData[index]
            })
        } else {
            let index = -1
            for (let i = 0; i < this.state.leaderShipData.length; i++) {
                if (this.state.leaderShipData[i].id === x + 1) {
                    index = i;
                    break;
                }
            }
            scrollTopLeadershipModal()
            this.setState({
                leaderObj: this.state.leaderShipData[index]
            })
        }
    }
}

export default LeaderShipComponent;
/**
 * Define the proptypes
 */
LeaderShipComponent.propTypes = {
    mapdata: PropTypes.node,
};