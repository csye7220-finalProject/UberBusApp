import { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
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
                            src="static/bus.png"
                            alt=""
                            width="50px"
                            height="50px"
                        />{" "}
                    </Link>
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
                                to={"/view-bookings"}
                            >
                                View Bookings
                            </Link>

                            <Link className="nav-item nav-link" to={"/home"}>
                                Home
                            </Link>

                            <Link className="nav-item nav-link" to={"/logout"}>
                                Logout
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
                            src="static/bus.png"
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

        return <>{localStorage.isLoggedIn ? afterLogin : beforeLogin}</>;
    }
}

export default Navbar;
