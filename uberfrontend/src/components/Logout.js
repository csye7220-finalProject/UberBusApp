import React, { Component } from "react";
const localStorageAuthKey = "twtr:auth";
class Logout extends Component {
  componentDidMount() {
    if (typeof Storage !== "undefined") {
      try {
        localStorage.removeItem(localStorageAuthKey);
      } catch (ex) {
        console.log(ex);
      }
    } else {
      // No web storage Support :-(
    }
    // console.log(localStorage.getItem('isLoggedIn'))
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("fname");
    // localStorage.removeItem('lname')
    this.props.history.push("/sign-in");
  }

  render() {
    return <div>Logged Out</div>;
  }
}

export default Logout;
