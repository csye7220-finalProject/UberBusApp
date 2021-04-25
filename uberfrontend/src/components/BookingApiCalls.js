import axios from "axios";
import "./url";
const url = python_url;
// const url = "/app/";
// const url = "http://localhost:5000/app/";
//const url = `http://${process.env.REACT_APP_IP_ADDRESS}:5000/app/`;

const localStorageAuthKey = "twtr:auth";
function getAccessToken() {
  if (typeof Storage !== "undefined") {
    try {
      var keys = JSON.parse(localStorage.getItem(localStorageAuthKey));
      return keys.access;
      // the refresh token is keys.refresh
    } catch (ex) {
      console.log(ex);
    }
  } else {
    // No web storage Support :-(
  }
}
const access_token = getAccessToken();
const config = {
  headers: { Authorization: "Bearer " + access_token },
};

export const getoperator = (booking) => {
  return axios
    .post(url + "getoperator", {
      source: booking.source,
      destination: booking.destination,
      date: booking.date,
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((res) => {
      console.log(res);
      return res;
    });
};

export const addbooking = (booking) => {
  console.log("config");
  console.log(config);
  return axios
    .post(
      url + "addbooking",
      {
        email: booking.email,
        source: booking.source,
        destination: booking.destination,
        date: booking.date,
        operator: booking.operator,
      },
      config
    )
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((res) => {
      console.log(res);
    });
};

export const getbookings = (booking) => {
  return axios
    .post(
      url + "getbookings",
      {
        email: localStorage.getItem("email"),
      },
      config
    )
    .then((res) => {
      console.log("Try");
      console.log(res);
      return res;
    })
    .catch((res) => {
      console.log("Catch");
      console.log(res);
    });
};

export const deletebooking = (booking) => {
  return axios
    .post(
      url + "delete",
      {
        email: localStorage.getItem("email"),
        source: booking.source,
        destination: booking.destination,
        date: booking.date,
        operator: booking.operator,
        bustime: booking.bustime,
      },
      config
    )
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((res) => {
      console.log(res);
    });
};

// get all buses
export const getbuses = (buses) => {
  return axios
    .post(url + "getbuses", {})
    .then((res) => {
      console.log("Try");
      console.log(res);
      return res;
    })
    .catch((res) => {
      console.log("Catch");
      console.log(res);
    });
};

// delete bus
export const deletebus = (bus) => {
  return axios
    .post(url + "deletebus", {
      //   email: localStorage.getItem("email"),
      source: bus.source,
      destination: bus.destination,
      date: bus.date,
      name: bus.name,
      bustime: bus.bustime,
      cost: bus.cost,
      quantity: bus.quantity,
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((res) => {
      console.log(res);
    });
};

// get all bookings for all users
export const getallbookings = (booking) => {
  return axios
    .post(url + "allbookings", {})
    .then((res) => {
      console.log("Try");
      console.log(res);
      return res;
    })
    .catch((res) => {
      console.log("Catch");
      console.log(res);
    });
};

// Admin delete booking

export const admindeletebooking = (booking) => {
  return axios
    .post(
      url + "admindelete",
      {
        email: booking.email,
        source: booking.source,
        destination: booking.destination,
        date: booking.date,
        operator: booking.operator,
        bustime: booking.bustime,
      },
      config
    )
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((res) => {
      console.log(res);
    });
};
