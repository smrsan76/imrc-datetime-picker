import "babel-polyfill";
import React, { Component } from "react";
import { render } from "react-dom";
const moment = require("moment-jalaali");
moment.loadPersian({
  dialect: "persian-modern",
  usePersianDigits: true
});

// Production Test/Use
import "../dist/imrc-datetime-picker.min.css";
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
// import "../src/sass";
// import { DatetimePicker, DatetimePickerTrigger } from "../src";

import "./index.scss";
import classes from "./index.scss";

class InlinePicker extends Component {
  state = {
    isFa: false,
    isSolar: false
  };

  constructor(props) {
    super(props);
    let defaultMoment = moment();
    defaultMoment.locale("en");
    this.state = {
      moment: defaultMoment
    };
  }

  handleChange = moment => this.setState({ moment });

  handleToggleSolar = () => {
    this.setState({
      isSolar: !this.state.isSolar
    });
  };

  handleLangChange = () => {
    const { isFa } = this.state;
    const newIsFa = !isFa;
    this.state.moment.locale(newIsFa ? "fa" : "en");
    this.setState({ isFa: newIsFa });
  };

  render() {
    const { moment, isSolar, isFa } = this.state;
    const dateFormat = isSolar ? "jYYYY/jMM/jDD" : "YYYY/MM/DD";

    return (
      <div>
        <span className="text">Datetime: {moment.format(dateFormat)}</span>
        <DatetimePicker
          moment={moment}
          onChange={this.handleChange}
          showTimePicker={false}
          isSolar={isSolar}
          lang={isFa ? "fa" : "en"}
        />
        <input
          type="checkbox"
          name="solar"
          defaultChecked={isSolar}
          onChange={this.handleToggleSolar}
        />{" "}
        Solar Date <br />
        <input
          type="checkbox"
          name="fa-lang"
          defaultChecked={isFa}
          onChange={this.handleLangChange}
        />{" "}
        FA (language)
      </div>
    );
  }
}

class PopupPickerBottom extends Component {
  constructor(props) {
    super(props);
    let defaultDatetime = moment();
    defaultDatetime.locale("en");
    this.state = {
      datetime: defaultDatetime
    };
  }

  handleChange = moment => {
    this.setState({
      datetime: moment
    });
  };

  render() {
    const newMoment = moment();
    moment.locale("en");
    const shortcuts = {
      Today: newMoment,
      Yesterday: newMoment.clone().subtract(1, "days"),
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
  constructor(props) {
    super(props);
    let defaultDatetime = moment();
    defaultDatetime.locale("en");
    this.state = {
      datetime: defaultDatetime
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
