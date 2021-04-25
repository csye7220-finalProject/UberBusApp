import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import TimePicker from "react-bootstrap-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "rc-time-picker/assets/index.css";
import { addBus } from "../AccessApiCalls";
import { Alert } from "react-bootstrap";
import moment from "moment";
import Navbar from "../Navbar";
import "../../App.css";

const validEmailRegex = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/);
const locationRegex = RegExp(/^\w+([.-]?\w+)+$/);
const numberRegex = RegExp();
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};
const countErrors = (errors) => {
  let count = 0;
  Object.values(errors).forEach((val) => val.length > 0 && (count = count + 1));
  return count;
};
export default class AddBus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busId: "",
      name: "",
      date: "",
      time: "",
      source: "",
      destination: "",
      quantity: "",
      cost: "",
      success: "",
      busadded: false,
      successMessage: "",
      placeholder: "Journey Date",
      errors: {
        busId: "",
        name: "",
        source: "",
        destination: "",
        quantity: "",
        submit: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeId = this.handleChangeId.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }
  componentDidMount() {
    // if (localStorage.getItem("isLoggedIn") === null) {
    //   this.props.history.push("/");
    // }
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      successMessage: "",
      busadded: false,
    });
  };
  // handleChange(event) {
  //   this.setState({ value: event.target.value });
  // }
  handleChange1 = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "name":
        errors.name = locationRegex.test(value)
          ? ""
          : "No special characters or numbers allowed";
        break;
      case "adSource":
        errors.adSource = locationRegex.test(value)
          ? ""
          : "No special characters or numbers allowed";
        break;
      case "adDestination":
        errors.adDestination = locationRegex.test(value)
          ? ""
          : "No special characters or numbers allowed";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };
  handleTimeChange(time) {
    console.log(time); // <- prints "3600" if "01:00" is picked
    this.setState({ time });
  }
  handleDateChange(value) {
    this.setState({
      date: new Date(value),
      startDate: value,
    });
    console.log("Check");
    console.log(this.state.date);
  }
  handleChangeId(event) {
    this.setState({
      busId: event.target.value,
    });
    console.log(this.state.busId);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Add Bus clicked");
    // this.setState({ formValid: validateForm(this.state.errors) });
    // this.setState({ errorCount: countErrors(this.state.errors) });
    const data = {
      name: this.state.name,
      source: this.state.source,
      destination: this.state.destination,
      date: this.state.date,
      bustime: this.state.bustime,
      quantity: this.state.quantity,
      cost: this.state.cost,
    };

    addBus(data).then((res) => {
      console.log(res);
      if (res.status === 200) {
        if (res.data["message"].includes("Bus added successfully")) {
          console.log("Bus added");
          this.setState({
            name: "",
            source: "",
            destination: "",
            date: "",
            bustime: "",
            quantity: "",
            cost: "",
            busadded: true,
            successMessage: "Bus added successfully!",
          });
          // this.props.history.push("/addBus");
          // window.location.reload();
        } else {
          this.setState({
            errors: {
              busId: "",
              name: "",
              source: "",
              destination: "",
              date: "",
              bustime: "",
              quantity: "",
            },
          });
          setTimeout(
            () =>
              this.setState({
                success: "Bus added successfully",
                successMessage: "Bus added successfully!",
              }),
            500
          );
        }
      } else {
        alert("Server Error!");
      }
    });
  };
  render() {
    return (
      <>
        <Navbar />
        <div class="container">
          <div class="jumbotron">
            {this.state.busadded ? (
              <Alert className={"col-lg-12"} variant={"success"}>
                {this.state.successMessage}
              </Alert>
            ) : (
              ""
            )}
            <form onSubmit={this.handleSubmit}>
              <h3>Admin Add Bus</h3>
              <div className="form-group">
                {/* <label htmlFor="ad-operator">Bus Operator</label> */}
                <input
                  type="text"
                  className="form-control"
                  id="ad-operator"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Bus Operator"
                  required
                />
              </div>
              <div className="form-group">
                {/* <label htmlFor="ad-source">Source</label> */}
                <input
                  type="text"
                  className="form-control"
                  id="ad-source"
                  name="source"
                  value={this.state.source}
                  onChange={this.handleChange}
                  placeholder="Pickup Location"
                  required
                />
              </div>
              <div className="form-group">
                {/* <label htmlFor="ad-destination">Destination</label> */}
                <input
                  type="text"
                  className="form-control"
                  id="ad-destination"
                  name="destination"
                  value={this.state.destination}
                  onChange={this.handleChange}
                  placeholder="Drop Location"
                  required
                />
              </div>
              <div className="form-group">
                {/* <label>Date</label> */}
                <DatePicker
                  className="custom-select"
                  value={this.state.date}
                  selected={this.state.date}
                  onChange={this.handleDateChange}
                  placeholderText={this.state.placeholder}
                  selected={this.state.startDate}
                  minDate={moment().toDate()}
                  required
                />
              </div>
              <div className="form-group">
                {/* <label htmlFor="bus-time">Bus Time</label> */}
                <input
                  type="text"
                  className="form-control"
                  id="bus-time"
                  name="bustime"
                  value={this.state.bustime}
                  onChange={this.handleChange}
                  placeholder="Journey Time"
                  required
                />
              </div>
              {/* <div className="form-group">
                <label>Bus Time</label>
                <TimePicker
                  start="05:00"
                  end="23:30"
                  step={30}
                  onChange={this.handleTimeChange}
                  value={this.state.bustime}
                />
              </div> */}
              <div className="form-group">
                {/* <label htmlFor="ad-seats">Seats</label> */}
                <input
                  type="number"
                  className="form-control"
                  id="ad-seats"
                  min="0"
                  max="80"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.handleChange}
                  placeholder="Seats"
                  required
                />
              </div>
              <div className="form-group">
                {/* <label htmlFor="cost">Cost</label> */}
                <input
                  type="text"
                  className="form-control"
                  id="cost"
                  name="cost"
                  value={this.state.cost}
                  onChange={this.handleChange}
                  placeholder="Ticket Price"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-secondary btn-block"
                value="Submit"
              >
                Add Bus
              </button>
              {this.state.errors.submit !== "" && (
                <span className="error">{this.state.errors.submit}</span>
              )}
              {this.state.success !== "" && (
                <span className="success">{this.state.success}</span>
              )}
            </form>
          </div>
        </div>
      </>
    );
  }
}
