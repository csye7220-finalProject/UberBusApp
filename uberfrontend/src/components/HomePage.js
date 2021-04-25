import React, { Component } from "react";
// import TimePickerPage from "./TimePickerPage";
import DatePicker from "react-datepicker";
import TimePicker from "react-bootstrap-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "rc-time-picker/assets/index.css";
import moment from "moment";
import { addbooking, getoperator } from "./BookingApiCalls";
import Navbar from "./Navbar";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import { debounce } from "lodash";
import MarkerComponent from "./MarkerComponent";
import "../App.css";
import {
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
    Polyline,
} from "react-google-maps";

var currDate = "";
var currTime = "";
export default class HomePage extends Component {
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
            marker_path: [],
            source_lat: 0,
            source_lng: 0,
            dest_lat: 0,
            dest_lng: 0,
            google: 0,
            flightPath: 0,
            temp: 0,
            errors: {
                source: "",
                destination: "",
                operator: "",
                date: "",
                submit: "",
            },
        };
        Geocode.setApiKey("AIzaSyArSiBGE5n217Fcd9N59Y6yIynN6gyVSzM");
        this.handleDateChange = this.handleDateChange.bind(this);
        this.getOperator = this.getOperator.bind(this);
        this.handleSourceChange = this.handleSourceChange.bind(this);
        this.handleDestinationChange = this.handleDestinationChange.bind(this);
        this.handleOperatorChange = this.handleOperatorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
    }

    handleTimeChange(time) {
        console.log(time); // <- prints "3600" if "01:00" is picked
        this.setState({ time });
    }

    componentDidMount() {
        if (localStorage.getItem("isLoggedIn") === null) {
            this.props.history.push("/");
        }
    }

    handleSourceChange(event) {
        this.setState({
            source: event.target.value,

            date: currDate,
            operator: "",
            errors: {
                source: "",
                destination: "",
                submit: "",
            },
        });
        // this.handleSourceMarker(event.target.value);
    }
    handleSourceMarker(src) {
        console.log("inside");
        if (this.state.flightPath) {
            this.state.flightPath.setMap(null);
        }
        if (src) {
            this.sourceHandler(src);
        }
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
                            operator:
                                res.data[0]["name"] +
                                "/" +
                                res.data[0]["bustime"],
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
    handleSourceMarker(src) {
        // debugger;
        console.log("inside");

        if (this.state.flightPath) {
            this.state.flightPath.setMap(null);
        }
        if (src) {
            this.sourceHandler(src);
        }
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

    handleDestinationChange(event) {
        if (this.state.source === "Select Source") {
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
        this.handleDestinationMarker(event.target.value);
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
                            marker_path: [],
                            source_lat: 0,
                            source_lng: 0,
                            dest_lat: 0,
                            dest_lng: 0,
                            google: this.state.temp,
                            flightPath: this.state.flightPath.setMap(null),

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

    //   sourceHandler(e) {
    //     Geocode.fromAddress(e).then(
    //       (response) => {
    //         const { lat, lng } = (this.state.marker_path[0] =
    //           response.results[0].geometry.location);
    //         this.setState({
    //           source_lat: lat,
    //           source_lng: lng,
    //           marker_path: this.state.marker_path,
    //         });
    //         if (this.state.marker_path.length > 1) {
    //           var flightPath = new this.state.google.maps.Polyline({
    //             path: this.state.marker_path,
    //             geodesic: true,
    //             strokeColor: "red",
    //             strokeOpacity: 1,
    //             strokeWeight: 2,
    //           });

    //                     this.state.flightPath.setMap(this.state.google.map);
    //                     this.setState({
    //                         flightPath: flightPath,
    //                     });
    //                 }
    //             },
    //             (error) => {
    //                 console.error(error);
    //             }
    //         );
    //     });
    // }
    sourceHandler(e) {
        // debugger;
        Geocode.fromAddress(e).then(
            (response) => {
                const { lat, lng } = (this.state.marker_path[0] =
                    response.results[0].geometry.location);
                this.setState({
                    source_lat: lat,
                    source_lng: lng,
                    marker_path: this.state.marker_path,
                });
                if (this.state.marker_path.length > 1) {
                    // debugger;
                    this.setState({
                        google: this.state.temp,
                    });
                    var flightPath = new this.state.google.maps.Polyline({
                        path: this.state.marker_path,
                        geodesic: true,
                        strokeColor: "red",
                        strokeOpacity: 1,
                        strokeWeight: 3,
                    });
                    if (this.state.flightPath) {
                        this.state.flightPath.setMap(null);
                    }
                    flightPath.setMap(this.state.google.map);
                    this.setState({
                        flightPath: flightPath,
                    });
                }
            },
            (error) => {
                console.error(error);
            }
        );
    }

    destinationHandler(e) {
        Geocode.fromAddress(e).then(
            (response) => {
                // debugger;
                const { lat, lng } = (this.state.marker_path[1] =
                    response.results[0].geometry.location);
                this.setState({
                    dest_lat: lat,
                    dest_lng: lng,
                    marker_path: this.state.marker_path,
                });

                if (this.state.marker_path.length > 1) {
                    // debugger;
                    this.setState({
                        google: this.state.temp,
                    });
                    var flightPath = new this.state.google.maps.Polyline({
                        path: this.state.marker_path,
                        geodesic: true,
                        strokeColor: "red",
                        strokeOpacity: 1,
                        strokeWeight: 3,
                    });
                    if (this.state.flightPath) {
                        this.state.flightPath.setMap(null);
                    }
                    flightPath.setMap(this.state.google.map);
                    this.setState({
                        flightPath: flightPath,
                    });
                }
            },
            (error) => {
                console.error(error);
            }
        );
    }

    handleDestinationMarker(dest) {
        // debugger;
        if (this.state.flightPath) {
            this.state.flightPath.setMap(null);
            this.state.flightPath.setPath([]);
            this.state.flightPath = null;
        }

        if (dest) {
            this.destinationHandler(dest);
        }
    }

    render() {
        return (
            <>
                <Navbar />
                <div className="container m-auto marginconatiner">
                    <div className="row">
                        <div className="col-xs-6 col-md-6">
                            <div className="jumbotron">
                                <form onSubmit={this.handleSubmit}>
                                    <h3>Bus Ticket Booking</h3>
                                    <div className="form-group">
                                        <select
                                            className="custom-select"
                                            value={this.state.source}
                                            onChange={(e) => {
                                                // setAlertVisible({ isOpen: false });

                                                this.handleSourceChange(e);
                                                this.handleSourceMarker(
                                                    e.target.value
                                                );
                                            }}
                                            required
                                        >
                                            <option value="destination">
                                                Select Source
                                            </option>
                                            <option value="Boston">
                                                Boston
                                            </option>
                                            <option value="New York">
                                                New York
                                            </option>
                                            <option value="Pittsburgh">
                                                Pittsburgh
                                            </option>
                                            <option value="Vermont">
                                                Vermont
                                            </option>
                                            <option value="Maine">Maine</option>
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
                                            onChange={(e) => {
                                                this.handleDestinationChange(e);
                                                this.handleDestinationMarker(
                                                    e.target.value
                                                );
                                            }}
                                            required
                                        >
                                            <option value="destination">
                                                Select Destination
                                            </option>
                                            <option value="Boston">
                                                Boston
                                            </option>
                                            <option value="New York">
                                                New York
                                            </option>
                                            <option value="Pittsburgh">
                                                Pittsburgh
                                            </option>
                                            <option value="Vermont">
                                                Vermont
                                            </option>
                                            <option value="Maine">Maine</option>
                                        </select>
                                        {this.state.errors.destination !==
                                            "" && (
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
                                        {/* <div className="form-group">
                                    <TimePicker
                                        start="05:00"
                                        end="23:30"
                                        step={30}
                                        onChange={this.handleTimeChange}
                                        value={this.state.time}
                                    />
                                </div> */}
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
                                            {Object.keys(
                                                this.state.operatorsList
                                            ).map((operator, index) =>
                                                this.state.operatorsList[index][
                                                    "quantity"
                                                ] >= 1 ? (
                                                    <option
                                                        key={index}
                                                        value={
                                                            this.state
                                                                .operatorsList[
                                                                index
                                                            ]["name"] +
                                                            "/" +
                                                            this.state
                                                                .operatorsList[
                                                                index
                                                            ]["bustime"]
                                                        }
                                                    >
                                                        {this.state
                                                            .operatorsList[
                                                            index
                                                        ]["name"] +
                                                            " " +
                                                            this.state
                                                                .operatorsList[
                                                                index
                                                            ]["bustime"]}
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
                        <div class="col-xs-6 col-md-6">
                            <div className="iframe-container">
                                <div>
                                    <GoogleMapReact
                                        bootstrapURLKeys={{
                                            key:
                                                "AIzaSyArSiBGE5n217Fcd9N59Y6yIynN6gyVSzM",
                                        }}
                                        defaultCenter={{
                                            lat: 42.361145,
                                            lng: -71.057083,
                                        }}
                                        yesIWantToUseGoogleMapApiInternals
                                        onGoogleApiLoaded={(e) =>
                                            this.setState({
                                                google: e,
                                                temp: e,
                                            })
                                        }
                                        defaultZoom={5}
                                    >
                                        {this.state.source &&
                                            this.state.source_lat &&
                                            this.state.source_lng && (
                                                <MarkerComponent
                                                    lat={this.state.source_lat}
                                                    lng={this.state.source_lng}
                                                    text="S"
                                                />
                                            )}
                                        {this.state.destination &&
                                            this.state.dest_lat &&
                                            this.state.dest_lng && (
                                                <MarkerComponent
                                                    lat={this.state.dest_lat}
                                                    lng={this.state.dest_lng}
                                                    text="D"
                                                />
                                            )}
                                    </GoogleMapReact>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
