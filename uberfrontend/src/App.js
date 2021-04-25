import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import logo from './static/bus.png';
import Home from "./components/HomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Logout from "./components/Logout";
// import ViewBookings from "./components/ViewBookings";
import ViewBookingsNew from "./components/ViewBookingsNew";
import Navbar from "./components/Navbar";
import Error from "./components/Error";
import Admin from "./components/Admin/Admin";
import AddBus from "./components/Admin/AddBus";
import GetAllBuses from "./components/Admin/GetAllBuses";
import GetAllBookings from "./components/Admin/GetAllBookings";
import TestPython from "./components/TestPython";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/view-bookings" component={ViewBookingsNew} />
          <Route exact path="/home" component={Home} />
          {/* <Route exact path="/admin" component={Admin} /> */}
          <Route exact path="/sign-in" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route path="/admin" component={Admin} />
          <Route path="/addBus" component={AddBus} />
          <Route path="/viewBuses" component={GetAllBuses} />
          <Route exact path="/all-bookings" component={GetAllBookings} />
          <Route exact path="/testHealth">
            <div
              style={{
                marginTop: 100,
                color: "white",
                fontWeight: 700,
              }}
            >
              Hello from Uber Bus React App. I am healthy!
            </div>
          </Route>
          <Route exact path="/testComms" component={TestPython} />
          {/* <Route path="/deleteBus" component={DeleteBusPage} /> */}
          <Route exact path="/logout" component={Logout} />
          <Route path="/" component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
