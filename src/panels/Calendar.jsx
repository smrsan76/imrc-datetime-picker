import React, { Component } from "react";
const moment = require("moment-jalaali");

import Day from "./Day.jsx";
import Month from "./Month.jsx";
import Year from "./Year.jsx";

import classes from "../sass";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: this.getCurrentMoment(props),
      panel: props.minPanel || "day"
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      moment: this.getCurrentMoment(props)
    });

    if (!props.isOpen) {
      this.setState({
        panel: props.minPanel || "day"
      });
    }
  }

  getCurrentMoment = props => {
    const { range, rangeAt } = props;
    const now = this.state ? this.state.moment || moment() : moment();
    let result = props.moment;

    if (result) {
      if (range) {
        result = result[rangeAt] || now;
      }
    } else {
      result = now;
    }

    return result;
  };

  handleSelect = selected => {
    const { panel } = this.state;
    const { onChange, range, rangeAt, minPanel } = this.props;
    const nextPanel =
      (panel === "year" ? "month" : "day") === "month"
        ? minPanel === "year"
          ? "year"
          : "month"
        : minPanel === "month"
          ? "month"
          : "day";
    let _selected = this.props.moment;
    let shouldChange = panel === minPanel;

    if (_selected && !shouldChange) {
      if (range) {
        shouldChange = rangeAt === "start" ? _selected.start : _selected.end;
      } else {
        shouldChange = true;
      }
    }

    if (range) {
      const copyed = _selected ? { ..._selected } : {};

      copyed[rangeAt] = selected;
      _selected = copyed;
    } else {
      _selected = selected;
    }

    this.changePanel(nextPanel, selected);

    if (shouldChange) {
      onChange && onChange(_selected, panel);
    }
  };

  changePanel = (panel, moment = this.state.moment) => {
    this.setState({
      moment,
      panel
    });
  };

  render() {
    const {
      weeks,
      months,
      dayFormat,
      style,
      maxDate,
      minDate,
      dateLimit,
      range,
      rangeAt,
      lang,
      isSolar
    } = this.props;
    const props = {
      moment: this.state.moment,
      selected: this.props.moment,
      onSelect: this.handleSelect,
      changePanel: this.changePanel,
      weeks,
      months,
      dayFormat,
      maxDate,
      minDate,
      dateLimit,
      range,
      rangeAt,
      lang,
      isSolar
    };
    const { panel } = this.state;
    const isDayPanel = panel === "day";
    const isMonthPanel = panel === "month";
    const isYearPanel = panel === "year";

    return (
      <div style={style}>
        <div className={classes["calendar"]}>
          {(() => {
            if (isDayPanel) return <Day {...props} />;
            if (isMonthPanel) return <Month {...props} />;
            if (isYearPanel) return <Year {...props} />;
          })()}
        </div>
      </div>
    );
  }
}

export default Calendar;
