import React, { Component } from "react";
import { getbuses } from "../BookingApiCalls";
import { deletebus } from "../BookingApiCalls";
import Navbar from "../Navbar";
import "../ViewBookings.css";

export default class GetAllBuses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buses: [],
      message: "",
      success: "",
      present: false,
    };
    this.handleSearchKeyUp = this.keyUpHandler.bind();
    this.deleteBus = this.deleteBus.bind(this);
  }

  keyUpHandler() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("listbuses");
    tr = table.getElementsByTagName("a");
    console.log(tr);
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("div")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  componentDidMount() {
    if (localStorage.getItem("isLoggedIn") === null) {
      this.props.history.push("/");
    }
    const allbuses = {};
    getbuses(allbuses).then((res) => {
      if (res.status === 200) {
        if (res.data === null) {
          console.log("Test1");
          this.setState({
            message: "",
            present: false,
          });
        } else if (res.data["message"] === "No buses found") {
          console.log("Test1");
          this.setState({
            message: res.data["message"],
            present: false,
          });
        } else {
          this.setState({
            message: "Data Present",
            buses: res.data,
            present: true,
          });
        }
      } else {
        console.log("Test2");
        this.setState({
          message: "",
          present: false,
        });
      }
    });
  }
  deleteBus(e) {
    console.log(e.target.value);
    var data = e.target.value;
    data = data.split(",");
    const object = {
      //   email: localStorage.getItem("email"),
      name: data[0],
      source: data[1],
      destination: data[2],
      date: data[3],
      bustime: data[4],
      cost: data[5],
      quantity: data[6],
      // id: data[7],
    };
    console.log(object);
    deletebus(object).then((res) => {
      if (res.status === 200) {
        if (res.data["message"] === "No buses found") {
          this.setState({
            message: res.data["message"],
            present: false,
          });
        } else {
          console.log(this.state.buses);
          this.setState({
            success: res.data["message"],
          });
          // this.props.history.push("/home");
          const allbuses = {};
          getbuses(allbuses).then((res) => {
            if (res.status === 200) {
              if (res.data === null) {
                console.log("Test1");
                this.setState({
                  message: "",
                  present: false,
                });
              } else if (res.data["message"] === "No buses found") {
                console.log("Test1");
                this.setState({
                  message: res.data["message"],
                  present: false,
                });
              } else {
                this.setState({
                  message: "Data Present",
                  buses: res.data,
                  present: true,
                });
              }
            } else {
              console.log("Test2");
              this.setState({
                message: "",
                present: false,
              });
            }
          });
        }
      } else {
        this.setState({
          message: "",
          present: false,
        });
      }
    });
  }
  render() {
    return (
      <>
        <Navbar />
        <div class="container">
          <br />
          <br />
          <br />
          {/* <table id="bookings1" hidden={this.state.present}><tr>No bookings available</tr></table> */}
          <input
            type="text"
            id="myInput"
            onKeyUp={this.handleSearchKeyUp}
            placeholder="Search for names.."
            title="Type in a operator name"
          ></input>
          {this.state.success !== "" && (
            <span className="success">{this.state.success}</span>
          )}

          <div class="list-group " id="listbuses">
            {Object.keys(this.state.buses).map((allbuses, index) => (
              <a
                href="#"
                class="list-group-item list-group-item-action flex-column align-items-start mt-2 table-striped "
              >
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">
                    {this.state.buses[index]["source"] +
                      " to " +
                      this.state.buses[index]["destination"]}
                  </h5>
                  <button
                    type="button"
                    class="btn btn-dark"
                    value={
                      this.state.buses[index]["name"] +
                      "," +
                      this.state.buses[index]["source"] +
                      "," +
                      this.state.buses[index]["destination"] +
                      "," +
                      this.state.buses[index]["date"] +
                      "," +
                      this.state.buses[index]["bustime"] +
                      "," +
                      this.state.buses[index]["cost"] +
                      "," +
                      this.state.buses[index]["quantity"]
                    }
                    onClick={this.deleteBus}
                  >
                    Delete
                  </button>
                </div>
                <div class="mb-1  ">
                  {"Operator : " + this.state.buses[index]["name"]}
                </div>
                <div class="mb-1 ">
                  {"Travel Date : " +
                    this.state.buses[index]["date"].substring(0, 10)}
                </div>
                <div class="mb-1 ">
                  {"Bus Time : " + this.state.buses[index]["bustime"]}
                </div>
              </a>
            ))}
          </div>
        </div>
      </>
    );
  }
}
