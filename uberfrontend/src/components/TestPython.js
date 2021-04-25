import React from "react";
import { Component } from "react";
import axios from "axios";
import { python_url } from "./url.js";
import { react_url } from "./url.js";
// const url1 = "http://localhost:5000/app/";

const url = python_url;

export default class TestPython extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      response: "",
    };
  }

  async componentDidMount() {
    // console.log(qs["salogic"]);
    fetch(url + "testHealth", { mode: "cors" })
      .then(function (response) {
        return response.text();
      })
      .then(function (text) {
        console.log("Request successful", text);
        alert(text);
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }
  render() {
    if (this.state.error != null) {
      return <h4>{this.state.error}</h4>;
    } else {
      return <div>{this.state.response}</div>;
    }
  }
}
