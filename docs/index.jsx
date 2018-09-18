import "babel-polyfill";
import React, { Component } from "react";
import { render } from "react-dom";
const moment = require("moment");

import "../src/sass";

// Production Test/Use
const DatetimePicker = RCLOADABLE(
  () => import("../dist/imrc-datetime-picker.min.js"),
  {
    render: (loaded, props) => {
      const { DatetimePicker } = loaded;
      return <DatetimePicker {...props} />;
    }
  }
);
const DatetimePickerTrigger = RCLOADABLE(
  () => import("../dist/imrc-datetime-picker.min.js"),
  {
    render: (loaded, props) => {
      const { DatetimePickerTrigger } = loaded;
      return <DatetimePickerTrigger {...props} />;
    }
  }
);

// Development Test (HMR)
// import { DatetimePicker, DatetimePickerTrigger } from "../src";

import "./index.scss";
import classes from "./index.scss";

class InlinePicker extends Component {
  constructor() {
    super();
    this.state = {
      moment: moment()
    };
  }

  handleChange = moment => {
    this.setState({
      moment
    });
  };

  render() {
    const { moment } = this.state;

    return (
      <div>
        <span className="text">Datetime: {moment.format("YYYY/MM/DD")}</span>
        <DatetimePicker
          moment={moment}
          onChange={this.handleChange}
          showTimePicker={false}
        />
      </div>
    );
  }
}

class PopupPickerBottom extends Component {
  constructor() {
    super();
    this.state = {
      datetime: moment()
    };
  }

  handleChange = moment => {
    this.setState({
      datetime: moment
    });
  };

  render() {
    const shortcuts = {
      Today: moment(),
      Yesterday: moment().subtract(1, "days"),
      Clear: ""
    };
    const { datetime } = this.state;
    const value = datetime ? datetime.format("YYYY/MM/DD") : "";

    return (
      <React.Fragment>
        <DatetimePickerTrigger
          shortcuts={shortcuts}
          moment={datetime}
          onChange={this.handleChange}
          appendToBoddy={true}
          showTimePicker={false}
          position="bottom"
        >
          <input type="text" value={value} readOnly />
          <span
            className={`input-icon ${classes["icon"]} ${
              classes["icon-calendar-empty"]
            }`}
          />
        </DatetimePickerTrigger>
      </React.Fragment>
    );
  }
}

class PopupPickerTop extends Component {
  constructor() {
    super();
    this.state = {
      datetime: moment()
    };
  }

  handleChange = moment => {
    this.setState({
      datetime: moment
    });
  };

  render() {
    const shortcuts = {
      Today: moment(),
      Yesterday: moment().subtract(1, "days"),
      Clear: ""
    };
    const { datetime } = this.state;
    const value = datetime ? datetime.format("YYYY/MM/DD") : "";

    return (
      <React.Fragment>
        <DatetimePickerTrigger
          shortcuts={shortcuts}
          moment={datetime}
          onChange={this.handleChange}
          appendToBoddy={true}
          showTimePicker={false}
          position="top"
        >
          <input type="text" value={value} readOnly />
          <span
            className={`input-icon ${classes["icon"]} ${
              classes["icon-calendar-empty"]
            }`}
          />
        </DatetimePickerTrigger>
      </React.Fragment>
    );
  }
}

render(<InlinePicker />, document.getElementById("inline-picker"));

render(<PopupPickerBottom />, document.getElementById("popup-picker-bottom"));
render(<PopupPickerTop />, document.getElementById("popup-picker-top"));
