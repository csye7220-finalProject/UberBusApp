import React, { Component } from "react";
import { admindeletebooking } from "../BookingApiCalls";
import { getallbookings } from "../BookingApiCalls";
import Navbar from "../Navbar";
import "../ViewBookings.css";

export default class GetAllBookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      message: "",
      success: "",
      present: false,
    };
    this.handleSearchKeyUp = this.keyUpHandler.bind();
    this.adminDeleteBooking = this.adminDeleteBooking.bind(this);
  }

  adminDeleteBooking(e) {
    console.log(e.target.value);
    console.log("Inside admin delete");
    var data = e.target.value;
    data = data.split(",");
    const object = {
      // email: localStorage.getItem("email"),
      operator: data[0],
      source: data[1],
      destination: data[2],
      date: data[3],
      bustime: data[4],
      email: data[5],
    };
    console.log(object);
    admindeletebooking(object).then((res) => {
      if (res.status === 200) {
        if (res.data["message"] === "No bookings found") {
          this.setState({
            message: res.data["message"],
            present: false,
          });
        } else {
          console.log(this.state.bookings);
          this.setState({
            success: res.data["message"],
          });
          // this.props.history.push("/home");
          const booking = {};
          getallbookings(booking).then((res) => {
            if (res.status === 200) {
              if (res.data === null) {
                console.log("Test1");
                this.setState({
                  message: "",
                  present: false,
                });
              } else if (res.data["message"] === "No bookings found") {
                console.log("Test1");
                this.setState({
                  message: res.data["message"],
                  present: false,
                });
              } else {
                this.setState({
                  message: "Data Present",
                  bookings: res.data,
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

  keyUpHandler() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("listbookings");
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
    const booking = {};
    getallbookings(booking).then((res) => {
      if (res.status === 200) {
        if (res.data === null) {
          console.log("Test1");
          this.setState({
            message: "",
            present: false,
          });
        } else if (res.data["message"] === "No bookings found") {
          console.log("Test1");
          this.setState({
            message: res.data["message"],
            present: false,
          });
        } else {
          this.setState({
            message: "Data Present",
            bookings: res.data,
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

          <div class="list-group " id="listbookings">
            {Object.keys(this.state.bookings).map((booking, index) => (
              <a
                href="#"
                class="list-group-item list-group-item-action flex-column align-items-start mt-2 table-striped "
              >
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">
                    {this.state.bookings[index]["source"] +
                      " to " +
                      this.state.bookings[index]["destination"]}
                  </h5>
                  <button
                    type="button"
                    class="btn btn-dark"
                    value={
                      this.state.bookings[index]["operator"] +
                      "," +
                      this.state.bookings[index]["source"] +
                      "," +
                      this.state.bookings[index]["destination"] +
                      "," +
                      this.state.bookings[index]["date"] +
                      "," +
                      this.state.bookings[index]["bustime"] +
                      "," +
                      this.state.bookings[index]["email"]
                    }
                    onClick={this.adminDeleteBooking}
                  >
                    Delete
                  </button>
                </div>
                <div class="mb-1  ">
                  {"Operator : " + this.state.bookings[index]["operator"]}
                </div>
                <div class="mb-1  ">
                  {"Email : " + this.state.bookings[index]["email"]}
                </div>
                <div class="mb-1 ">
                  {"Travel Date : " +
                    this.state.bookings[index]["date"].substring(0, 10)}
                </div>
                <div class="mb-1 ">
                  {"Bus Time : " + this.state.bookings[index]["bustime"]}
                </div>
              </a>
            ))}
          </div>
        </div>
      </>
    );
  }
}
