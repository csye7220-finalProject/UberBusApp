import "../App.css";
import React, { Component } from "react";
export default class MarkerComponent extends Component {
    render() {
        return (
            <div>
                <span className="pin-text">{this.props.text}</span>
                <div className="pin"></div>
            </div>
        );
    }
}
//dummy
