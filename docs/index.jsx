import React, { Component } from "react";
import { render } from "react-dom";
import moment from "moment";

const DatetimePicker = RCLOADABLE(() => import("../src/Picker"));
const DatetimePickerTrigger = RCLOADABLE(() => import("../src/Trigger"));

import "./index.scss";

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
        <span className="text">
          Datetime: {moment.format("YYYY/MM/DD HH:mm")}
        </span>
        <DatetimePicker moment={moment} onChange={this.handleChange} />
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
    const value = datetime ? datetime.format("YYYY/MM/DD HH:mm") : "";

    return (
      <React.Fragment>
        <DatetimePickerTrigger
          shortcuts={shortcuts}
          moment={datetime}
          onChange={this.handleChange}
          appendToBoddy={true}
          position="bottom"
        >
          <input type="text" value={value} readOnly />
          <span className="fa fa-calendar-o" />
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
    const value = datetime ? datetime.format("YYYY/MM/DD HH:mm") : "";

    return (
      <React.Fragment>
        <DatetimePickerTrigger
          shortcuts={shortcuts}
          moment={datetime}
          onChange={this.handleChange}
          appendToBoddy={true}
          position="top"
        >
          <input type="text" value={value} readOnly />
          <span className="fa fa-calendar-o" />
        </DatetimePickerTrigger>
      </React.Fragment>
    );
  }
}

render(<InlinePicker />, document.getElementById("inline-picker"));

render(<PopupPickerBottom />, document.getElementById("popup-picker-bottom"));
render(<PopupPickerTop />, document.getElementById("popup-picker-top"));
