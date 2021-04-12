import React, { Component } from "react";
// import TimePickerPage from "./TimePickerPage";
import DatePicker from "react-datepicker";
import TimePicker from "react-bootstrap-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "rc-time-picker/assets/index.css";
import moment from "moment";
import { addbooking, getoperator } from "./BookingApiCalls";
import Navbar from "./Navbar";
var currDate = "";
var currTime = "";
export default class HomePage extends Component {
<<<<<<< HEAD
    constructor(props) {
        super(props);
        this.state = {
            source: "Select Source",
            destination: "Select Destination",
            operator: "",
            operatorsList: [],
            date: currDate,
            time: 0,
            enable: true,
            success: "",
            noTiketsMessage: "The Bus is full",
            errors: {
                source: "",
                destination: "",
                operator: "",
                date: "",
                submit: "",
            },
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.getOperator = this.getOperator.bind(this);
        this.handleSourceChange = this.handleSourceChange.bind(this);
        this.handleDestinationChange = this.handleDestinationChange.bind(this);
        this.handleOperatorChange = this.handleOperatorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
=======
  constructor(props) {
    super(props);
    this.state = {
      source: "Select Source",
      destination: "Select Destination",
      operator: "",
      operatorsList: [],
      date: currDate,
      time: 0,
      enable: true,
      success: "",
      noTiketsMessage: "The Bus is full",
      errors: {
        source: "",
        destination: "",
        operator: "",
        date: "",
        submit: "",
      },
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.getOperator = this.getOperator.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.handleOperatorChange = this.handleOperatorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("isLoggedIn") === null) {
      this.props.history.push("/");
>>>>>>> 774cc68c99dc15d0350d4a8727ad5125cd8a2aff
    }

    componentDidMount() {
        if (localStorage.getItem("isLoggedIn") === null) {
            this.props.history.push("/");
        }
    }

    handleTimeChange(time) {
        console.log(time); // <- prints "3600" if "01:00" is picked
        this.setState({ time });
    }
    handleSourceChange(event) {
        this.setState({
            source: event.target.value,
            destination: "Select Destination",
            date: currDate,
            operator: "",
            errors: {
                source: "",
                destination: "",
                submit: "",
            },
        });
    }

    handleDateChange(value) {
        if (this.state.source === "Select Source") {
            this.setState({
                errors: {
                    source: "Source cannot be empty",
                    destination: "",
                },
            });
        } else if (this.state.destination === "Select Destination") {
            this.setState({
                errors: {
                    source: "",
                    destination: "Destionation cannot be empty",
                },
            });
        } else {
            console.log("Value");
            console.log(value);
            this.setState({
                date: new Date(value),
                operatorsList: [],
                operator: "",
                errors: {
                    source: "",
                    destination: "",
                },
            });
            console.log("Check");
            console.log(this.state.date);
        }
    }

    getOperator(event) {
        event.preventDefault();
        console.log("Get Operator");
        console.log(this.state.date);
        const booking = {
            source: this.state.source,
            destination: this.state.destination,
            date: this.state.date,
        };
        getoperator(booking).then((res) => {
            if (res.status === 200) {
                if (
                    res.data["message"] ===
                        "No operators has seats available" ||
                    res.data["message"] === "No operators found"
                ) {
                    console.log("Operator data1");
                    console.log(res.data);
                    this.setState({
                        operatorsList: [],
                        enable: true,
                        errors: {
                            source: "",
                            destination: "",
                            operator:
                                "No operators has seats available. Select another date.",
                            submit: "",
                        },
                    });
                } else {
                    console.log("Operator data2");
                    console.log(res.data);
                    let size = Object.keys(res.data).length;
                    console.log(size);
                    if (size < 1) {
                        this.setState({
                            operatorsList: [],
                            enable: true,
                            errors: {
                                operator: "No operator found",
                                submit: "",
                            },
                        });
                    } else {
                        this.setState({
                            enable: false,
                        });
                        this.setState({
                            operatorsList: res.data,
                            operator: res.data[0]["name"],
                            errors: {
                                source: "",
                                destination: "",
                                operator: "",
                            },
                        });
                    }
                }
            }
        });
    }

<<<<<<< HEAD
    handleDestinationChange(event) {
        if (this.state.source === "Select Source") {
=======
    const defaultBooking = {
      source: "Select Source",
      destination: "Select Destination",
      date: "",
      operator: "",
    };
    if (
      this.state.source === defaultBooking.source ||
      this.state.destination === defaultBooking.destination ||
      this.state.date === defaultBooking.date ||
      this.state.operator === defaultBooking.operator
    ) {
      this.setState({
        errors: {
          submit: "Select all the required fields",
        },
      });
    } else {
      const booking = {
        email: localStorage.getItem("email"),
        source: this.state.source,
        destination: this.state.destination,
        date: this.state.date,
        operator: this.state.operator,
        ride_time: this.state.time,
      };
      console.log(booking);
      addbooking(booking).then((res) => {
        if (res.status === 200) {
          if (res.data["message"] === "Operator not available") {
>>>>>>> 774cc68c99dc15d0350d4a8727ad5125cd8a2aff
            this.setState({
                errors: {
                    source: "Source cannot be empty",
                    destination: "",
                },
            });
        } else if (this.state.source === event.target.value) {
            this.setState({
                errors: {
                    source: "",
                    destination: "Destination cannot be same as source",
                },
            });
        } else {
            this.setState({
                destination: event.target.value,
                date: currDate,
                operator: "",
                errors: {
                    source: "",
                    destination: "",
                },
            });
        }
    }

    handleOperatorChange(event) {
        console.log(event.target.key);
        this.setState({ operator: event.target.value });
        console.log("Operator Change:", this.state.operator);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(currDate);
        console.log(this.state.date);
        console.log(this.state.operator);

        const defaultBooking = {
            source: "Select Source",
            destination: "Select Destination",
            date: "",
            operator: "",
        };
        if (
            this.state.source === defaultBooking.source ||
            this.state.destination === defaultBooking.destination ||
            this.state.date === defaultBooking.date ||
            this.state.operator === defaultBooking.operator
        ) {
            this.setState({
                errors: {
                    submit: "Select all the required fields",
                },
            });
        } else {
            const booking = {
                email: localStorage.getItem("email"),
                source: this.state.source,
                destination: this.state.destination,
                date: this.state.date,
                operator: this.state.operator,
                ride_time: this.state.time,
            };
            console.log(booking);
            addbooking(booking).then((res) => {
                if (res.status === 200) {
                    if (res.data["message"] === "Operator not available") {
                        this.setState({
                            error: {
                                source: "",
                                destination: "",
                                operator: res.data["message"],
                                operatorsList: [],
                                submit: res.data["message"],
                            },
                        });
                    } else {
                        let size = Object.keys(res.data).length;
                        console.log(size);
                        if (size < 1) {
                            this.setState({
                                error: {
                                    source: "",
                                    destination: "",
                                    operator: "",
                                    operatorsList: [],
                                    submit: "No buses found",
                                },
                            });
                        }
                        this.setState({
                            source: "Select Source",
                            destination: "Select Destination",
                            operator: "",
                            operatorsList: [],
                            date: currDate,
                            enable: true,
                        });
                        setTimeout(
                            () =>
                                this.setState({
                                    success: "Booking done successfully",
                                }),
                            1000
                        );
                    }
                }
            });
        }
    }

    render() {
        return (
            <>
                <Navbar />
                <div class="container">
                    <div class="jumbotron">
                        <form onSubmit={this.handleSubmit}>
                            <h3>Bus Ticket Booking</h3>
                            <div className="form-group">
                                <select
                                    className="custom-select"
                                    value={this.state.source}
                                    onChange={this.handleSourceChange}
                                    required
                                >
                                    <option value="destination">
                                        Select Source
                                    </option>
                                    <option value="Boston">Boston</option>
                                    <option value="New York">New York</option>
                                    <option value="Pittsburgh">
                                        Pittsburgh
                                    </option>
                                </select>
                                {this.state.errors.source !== "" && (
                                    <span className="error">
                                        {this.state.errors.source}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <select
                                    className="custom-select"
                                    value={this.state.destination}
                                    onChange={this.handleDestinationChange}
                                    required
                                >
                                    <option value="destination">
                                        Select Destination
                                    </option>
                                    <option value="Boston">Boston</option>
                                    <option value="New York">New York</option>
                                    <option value="Pittsburgh">
                                        Pittsburgh
                                    </option>
                                </select>
                                {this.state.errors.destination !== "" && (
                                    <span className="error">
                                        {this.state.errors.destination}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <DatePicker
                                    className="custom-select"
                                    value={this.state.date}
                                    selected={this.state.date}
                                    onChange={this.handleDateChange}
                                    minDate={moment().toDate()}
                                    required
                                />
                                {this.state.errors.date !== "" && (
                                    <span className="error">
                                        {this.state.errors.date}
                                    </span>
                                )}
                                <div className="form-group">
                                    <TimePicker
                                        start="05:00"
                                        end="23:30"
                                        step={30}
                                        onChange={this.handleTimeChange}
                                        value={this.state.time}
                                    />
                                </div>
                                {/* <TimePickerPage></TimePickerPage> */}
                                <button
                                    onClick={this.getOperator}
                                    className="btn btn-secondary btn-block"
                                >
                                    Get Operators
                                </button>
                                <select
                                    id="operator"
                                    className="custom-select"
                                    value={this.state.operator}
                                    onChange={this.handleOperatorChange}
                                    disabled={this.state.enable}
                                    required
                                >
                                    {Object.keys(this.state.operatorsList).map(
                                        (operator, index) =>
                                            this.state.operatorsList[index][
                                                "quantity"
                                            ] >= 1 ? (
                                                <option
                                                    key={index}
                                                    value={
                                                        this.state
                                                            .operatorsList[
                                                            index
                                                        ]["name"]
                                                    }
                                                >
                                                    {
                                                        this.state
                                                            .operatorsList[
                                                            index
                                                        ]["name"]
                                                    }
                                                </option>
                                            ) : null
                                    )}
                                </select>
                                {this.state.errors.operator !== "" && (
                                    <span className="error">
                                        {this.state.errors.operator}
                                    </span>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="btn btn-secondary btn-block"
                                value="Submit"
                            >
                                Book
                            </button>
                            {this.state.errors.submit !== "" && (
                                <span className="error">
                                    {this.state.errors.submit}
                                </span>
                            )}
                            {this.state.success !== "" && (
                                <span className="success">
                                    {this.state.success}
                                </span>
                            )}
                        </form>
                    </div>
                </div>
            </>
        );
    }
}
