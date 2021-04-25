import { Component } from "react";
import { Link } from "react-router-dom";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
        this.toggleMenu = this.toggleMenu.bind(this);

        console.log(this.state.show);
        // this.toggleMenu = this.toggleMenu.bind(this);
    }
    toggleMenu() {
        this.setState({ show: !this.state.show });
    }
    render() {
        const afterLogin = (
            <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-3 fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand mr-3" to={"/home"}>
                        <img
                            src="static/bus1.png"
                            alt=""
                            width="50px"
                            height="50px"
                        />{" "}
                    </Link>
                    {/* <h3>Adminnnnnn</h3> */}
                    <h3 className="navbar-brand mr-3">
                        {" "}
                        Hi {localStorage.fname}
                    </h3>
                    <button
                        type="button"
                        class="navbar-toggler"
                        onClick={this.toggleMenu}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        style={
                            this.state.show
                                ? { display: "block" }
                                : { display: "none" }
                        }
                        className="collapse navbar-collapse"
                    >
                        <div className="navbar-nav ml-auto">
                            <Link className="nav-item nav-link" to={"/addBus"}>
                                Add a Bus
                            </Link>

                            <Link
                                className="nav-item nav-link"
                                to={"/viewBuses"}
                            >
                                View Buses
                            </Link>

                            <Link
                                className="nav-item nav-link"
                                to={"/deleteBus"}
                            >
                                Delete A Bus
                            </Link>
                            <Link
                                className="nav-item nav-link"
                                to={"/yourRides"}
                            >
                                View Bookings
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        );

        const beforeLogin = (
            <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-3 fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand mr-3" to={"/home"}>
                        <img
                            src="static/bus1.png"
                            alt=""
                            width="50px"
                            height="50px"
                        />{" "}
                    </Link>
                    <button
                        type="button"
                        className="navbar-toggler"
                        onClick={this.toggleMenu}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        style={
                            this.state.show
                                ? { display: "block" }
                                : { display: "none" }
                        }
                        className="collapse navbar-collapse"
                    >
                        <div className="navbar-nav ml-auto ">
                            <Link className="nav-item nav-link" to={"/sign-in"}>
                                Login
                            </Link>

                            <Link className="nav-item nav-link" to={"/sign-up"}>
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        );

        return (
            <>
                <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-3 fixed-top">
                    <div className="container-fluid">
                        <Link className="navbar-brand mr-3" to={"/home"}>
                            <img
                                src="static/bus1.png"
                                alt=""
                                width="50px"
                                height="50px"
                            />{" "}
                        </Link>
                        {/* <h3>Adminnnnnn</h3> */}
                        <h3 className="navbar-brand mr-3">
                            {" "}
                            Hi {localStorage.fname}
                        </h3>
                        <button
                            type="button"
                            class="navbar-toggler"
                            onClick={this.toggleMenu}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            style={
                                this.state.show
                                    ? { display: "block" }
                                    : { display: "none" }
                            }
                            className="collapse navbar-collapse"
                        >
                            <div className="navbar-nav ml-auto">
                                <Link
                                    className="nav-item nav-link"
                                    to={"/addBus"}
                                >
                                    <h4>Add Bus</h4>
                                </Link>

                                <Link
                                    className="nav-item nav-link"
                                    to={"/viewBuses"}
                                >
                                    <h4>View Buses</h4>
                                </Link>
                                <Link
                                    className="nav-item nav-link"
                                    to={"/all-bookings"}
                                >
                                    <h4>View Bookings</h4>
                                </Link>
                                <Link
                                    className="nav-item nav-link"
                                    to={"/logout"}
                                >
                                    <h4>Logout</h4>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}

export default Admin;
