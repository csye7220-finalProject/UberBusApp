import { Component } from "react";
import { Link } from "react-router-dom";
import Admin from "../components/Admin/Admin";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      isAdmin: false,
      isLoggedIn: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);

    console.log(this.state.show);
    // this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu() {
    this.setState({ show: !this.state.show });
  }
  componentDidMount() {
    if (localStorage.fname === "admin") {
      console.log("Inside is Admin");
      this.setState({
        isAdmin: true,
      });
    }
    if (localStorage.isLoggedIn == true) {
      console.log("Inside is logged in");
      this.setState({
        isLoggedIn: true,
      });
    }
  }
  render() {
    const afterLogin = (
      <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-3 fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand mr-3" to={"/addBus"}>
            <img src="static/bus1.png" alt="" width="50px" height="50px" />{" "}
          </Link>
          <h3 className="navbar-brand mr-3"> Hi {localStorage.fname}</h3>
          <button
            type="button"
            class="navbar-toggler"
            onClick={this.toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            style={this.state.show ? { display: "block" } : { display: "none" }}
            className="collapse navbar-collapse"
          >
            <div className="navbar-nav ml-auto">
              <Link className="nav-item nav-link" to={"/view-bookings"}>
                <h4>View Bookings</h4>
              </Link>

              <Link className="nav-item nav-link" to={"/home"}>
                <h4>Home</h4>
              </Link>

              <Link className="nav-item nav-link" to={"/logout"}>
                <h4>Logout</h4>
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
            <img src="static/bus1.png" alt="" width="50px" height="50px" />{" "}
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            onClick={this.toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            style={this.state.show ? { display: "block" } : { display: "none" }}
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
        {this.state.isAdmin && localStorage.isLoggedIn ? (
          <Admin></Admin>
        ) : localStorage.isLoggedIn ? (
          afterLogin
        ) : (
          beforeLogin
        )}
      </>
    );
    // return (
    //   <div>
    //     {this.state.isLoggedIn && this.state.isAdmin ? (
    //       <Admin></Admin>
    //     ) : (
    //       <Admin></Admin>
    //     )}
    //   </div>
    // );

    // {
    //    {localStorage.isLoggedIn ? afterLogin : beforeLogin}</>;
    // }
  }
}

export default Navbar;
