import React, { Component } from "react";
import { MDBTimePicker, MDBCol } from "mdbreact";

class TimePickerPage extends Component {
  getPickerValue = (value) => {
    console.log(value);
  };

  render() {
    return (
      <MDBCol md="3">
        <MDBTimePicker
          id="timePicker"
          label="24hrs format"
          hours={12}
          minutes={0}
          hoursFormat={24}
          getValue={this.getPickerValue}
        />
      </MDBCol>
    );
  }
}

export default TimePickerPage;
