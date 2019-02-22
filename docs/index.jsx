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
  state = {
    _moment: null,
    cleared: false
  };

  constructor(props) {
    super(props);

    const defaultMoment = moment();
    defaultMoment.locale("en");

    this.state._moment = defaultMoment;
  }

  handleChange = moment => {
    this.setState({
      _moment: moment,
      cleared: false
    });
  };

  render() {
    const { _moment, cleared } = this.state;

    moment.locale("en");
    const newMoment = moment();

    const shortcuts = {
      Today: newMoment,
      Yesterday: newMoment.clone().subtract(1, "days"),
      Clear: {
        moment: _moment,
        callback: () => {
          this.setState({ cleared: true });
        }
      }
    };
    const value = !cleared && _moment ? _moment.format("YYYY/MM/DD") : "";

    return (
      <DatetimePickerTrigger
        shortcuts={shortcuts}
        moment={_moment}
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
    );
  }
}

class PopupPickerTop extends Component {
  state = {
    _moment: null,
    cleared: false
  };

  constructor(props) {
    super(props);

    const defaultMoment = moment();
    defaultMoment.locale("en");

    this.state._moment = defaultMoment;
  }

  handleChange = moment => {
    this.setState({
      _moment: moment,
      cleared: false
    });
  };

  render() {
    const { _moment, cleared } = this.state;
    const newMoment = moment();
    const shortcuts = {
      Today: newMoment,
      Yesterday: newMoment.clone().subtract(1, "days"),
      Clear: {
        moment: _moment,
        callback: () => {
          this.setState({ cleared: true });
        }
      }
    };
    const value = !cleared && _moment ? _moment.format("YYYY/MM/DD") : "";

    return (
      <DatetimePickerTrigger
        shortcuts={shortcuts}
        moment={_moment}
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
    );
  }
}

render(<InlinePicker />, document.getElementById("inline-picker"));

render(<PopupPickerBottom />, document.getElementById("popup-picker-bottom"));
render(<PopupPickerTop />, document.getElementById("popup-picker-top"));
