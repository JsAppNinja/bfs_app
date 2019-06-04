

//Import statement
import React, { Component } from 'react';
import binit from "../img/binit.jpg";

class ContactTheBoardComponent extends Component {
    constructor(props) {
        super(props);

        //Defining state variable
        this.state = {
            addClass: false
        };

    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    /**
    * Handle Scroll
    */
    handleScroll = () => {
        if (window.pageYOffset > 130) {
            this.setState({ addClass: true })
        } else {
            this.setState({ addClass: false })
        }
    }


    render() {
        return (
            <div className={"bg-gray" + (this.state.addClass ? ' head_sticky' : '')} >
             ContactTheBoardComponent
            </div>
        );
    }
}

export default ContactTheBoardComponent;
