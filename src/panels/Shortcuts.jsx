import React, { Component } from "react";
const moment = require("moment-jalaali");
import classNames from "classnames/bind";
import { CUSTOM_BUTTON_TEXT } from "../constants";
import classes from "../sass";

const isSameRange = (current, value) => {
  return (
    current.start &&
    current.end &&
    current.start.isSame(value.start, "day") &&
    current.end.isSame(value.end, "day")
  );
};

class Shortcuts extends Component {
  handleClick = (value, isCustom) => {
    const { onChange, range } = this.props;

    if (range) {
      onChange && onChange(value, isCustom);
    } else {
      onChange && onChange(value, "day");
    }
  };

  _renderShortcut = (key, value) => {
    const {
      range,
      shortcuts,
      customButtonText = CUSTOM_BUTTON_TEXT
    } = this.props;
    const current = this.props.moment;
    const selected = range
      ? key !== "custom" && isSameRange(current, value)
      : false;
    const isCustomSelected = range
      ? !Object.keys(shortcuts).some(_key =>
          isSameRange(current, shortcuts[_key])
        ) && key === "custom"
      : false;
    const className = classNames(classes["btn"], {
      selected: selected || isCustomSelected
    });

    return (
      <button
        className={className}
        key={key}
        type="button"
        onClick={this.handleClick.bind(this, value, key === "custom")}
      >
        {key === "custom" ? customButtonText : key}
      </button>
    );
  };

  _renderShortcuts = () => {
    const { shortcuts, showCustomButton, customRange, isSolar } = this.props;
    const renderShortcuts = showCustomButton
      ? {
          ...shortcuts,
          custom: customRange || {
            start: moment().subtract(29, isSolar ? "jDays" : "days"),
            end: moment().endOf(isSolar ? "jDay" : "day")
          }
        }
      : shortcuts;

    return Object.keys(renderShortcuts).map(key => {
      return this._renderShortcut(key, renderShortcuts[key]);
    });
  };

  render() {
    return (
      <div className={classes["shortcuts-bar"]}>{this._renderShortcuts()}</div>
    );
  }
}

export default Shortcuts;
