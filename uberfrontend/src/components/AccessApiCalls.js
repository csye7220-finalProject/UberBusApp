import axios from "axios";
import { python_url } from "./url.js";
// import { react_url } from "./url.js";

const url = python_url;
// const url = "/app/";
// const url = "http://localhost:5000/app/";

// const url = `http://${process.env.REACT_APP_IP_ADDRESS}:5000/app/`;

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
export const signUp = (newUser) => {
    return axios
        .post(url + "signup", {
            fname: newUser.fname,
            lname: newUser.lname,
            email: newUser.email,
            password: newUser.password,
        })
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((res) => {
            console.log(res);
            let errorMessage = { message: "new error" };
            return errorMessage;
        });
};

export const signIn = (user) => {
    return axios
        .post(url + "signin", {
            email: user.email,
            password: user.password,
        })
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                if (res.data["message"] === "User logged in successfully") {
                    localStorage.setItem("isLoggedIn", res.data["isLoggedIn"]);
                    localStorage.setItem("fname", res.data["fname"]);
                    localStorage.setItem("lname", res.data["lname"]);
                    localStorage.setItem("email", res.data["email"]);
                }
            }
            return res;
        })
        .catch((res) => {
            console.log(res);
            let errorMessage = { message: "error" };
            return errorMessage;
        });
};

export const addBus = (newBus) => {
    return axios
        .post(
            url + "addbus",
            {
                busId: newBus.busId,
                name: newBus.name,
                source: newBus.source,
                destination: newBus.destination,
                date: newBus.date,
                time: newBus.bustime,
                quantity: newBus.quantity,
                cost: newBus.cost,
            },
            config
        )
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((res) => {
            console.log(res);
            let errorMessage = { message: "new error" };
            return errorMessage;
        });
};
