import React, { Component } from "react";
const moment = require("moment-jalaali");
import classNames from "classnames/bind";

import { MONTHS, MONTHS_FA, MONTHS_SOLAR, MONTHS_SOLAR_FA } from "../constants";
import { chunk } from "../utils";

import classes from "../sass";

class Month extends Component {
  constructor(props) {
    super(props);
    const { isSolar, lang } = props;

    this.state = {
      moment: props.moment,
      yearStr: isSolar ? "jYear" : "year",
      monthStr: isSolar ? "jMonth" : "month",
      dateStr: isSolar ? "jDate" : "date",
      months: isSolar
        ? lang == "fa"
          ? MONTHS_SOLAR_FA
          : MONTHS_SOLAR
        : lang == "fa"
          ? MONTHS_FA
          : MONTHS
    };
  }

  componentWillReceiveProps(props) {
    const { isSolar, lang } = props;

    this.setState({
      moment: props.moment,
      yearStr: isSolar ? "jYear" : "year",
      monthStr: isSolar ? "jMonth" : "month",
      dateStr: isSolar ? "jDate" : "date",
      months: isSolar
        ? lang == "fa"
          ? MONTHS_SOLAR_FA
          : MONTHS_SOLAR
        : lang == "fa"
          ? MONTHS_FA
          : MONTHS
    });
  }

  changeYear = dir => {
    const _moment = this.state.moment.clone();
    const { yearStr } = this.state;

    this.setState({
      moment: _moment[dir === "prev" ? "subtract" : "add"](1, yearStr)
    });
  };

  select = (month, isDisabled) => {
    if (isDisabled) return;
    const { onSelect } = this.props;
    const _moment = this.state.moment.clone();
    const { monthStr } = this.state;

    _moment[monthStr](month);

    this.setState({
      moment: _moment
    });
    onSelect(_moment);
  };

  _renderMonth = (row, month, idx) => {
    const now = moment();
    const _moment = this.state.moment;
    const { monthStr } = this.state;
    const {
      maxDate,
      minDate,
      months,
      selected,
      range,
      rangeAt,
      dateLimit,
      isSolar
    } = this.props;
    const currentMonth = _moment.clone()[monthStr](month);
    const start =
      selected && range
        ? selected.start
          ? currentMonth.isSame(selected.start, monthStr)
          : false
        : false;
    const end =
      selected && range
        ? selected.end
          ? currentMonth.isSame(selected.end, monthStr)
          : false
        : false;
    const between =
      selected && range
        ? selected.start && selected.end
          ? currentMonth.isBetween(selected.start, selected.end, monthStr)
          : false
        : false;
    const isSelected = selected
      ? range
        ? selected[rangeAt]
          ? currentMonth.isSame(selected[rangeAt], monthStr)
          : false
        : currentMonth.isSame(selected, "day")
      : false;

    let disabledMax1 = false;
    let disabledMin1 = false;
    // for testing in solar mode
    let disabledMax2 = false;
    let disabledMin2 = false;

    if (isSolar) {
      // Solar test
      currentMonth.jDate(1);
      disabledMax1 = maxDate ? currentMonth.isAfter(maxDate, monthStr) : false;
      disabledMin1 = minDate ? currentMonth.isBefore(minDate, monthStr) : false;
      currentMonth.jDate(30);
      disabledMax2 = maxDate ? currentMonth.isAfter(maxDate, monthStr) : false;
      disabledMin2 = minDate ? currentMonth.isBefore(minDate, monthStr) : false;
    } else {
      // Gregorian test
      disabledMax1 = maxDate ? currentMonth.isAfter(maxDate, monthStr) : false;
      disabledMin1 = minDate ? currentMonth.isBefore(minDate, monthStr) : false;
    }

    let disabled = false;
    let limited = false;

    if (range) {
      if (rangeAt === "start" && selected && selected.end) {
        disabled = selected.end && currentMonth.isAfter(selected.end, "day");
      } else if (rangeAt === "end" && selected && selected.start) {
        disabled =
          selected.start && currentMonth.isBefore(selected.start, "day");
      }
    }

    if (dateLimit && range) {
      const limitKey = Object.keys(dateLimit)[0];
      const limitValue = dateLimit[limitKey];
      let minLimitedDate, maxLimitedDate;

      if (selected) {
        if (rangeAt === "start" && selected.start && selected.end) {
          maxLimitedDate = selected.end.clone();
          minLimitedDate = maxLimitedDate
            .clone()
            .subtract(limitValue, limitKey);
        } else if (rangeAt === "end" && selected.start && selected.end) {
          minLimitedDate = selected.start.clone();
          maxLimitedDate = minLimitedDate.clone().add(limitValue, limitKey);
        }

        if (minLimitedDate && maxLimitedDate) {
          limited = !currentMonth.isBetween(
            minLimitedDate,
            maxLimitedDate,
            "day",
            rangeAt === "start" ? "(]" : "[)"
          );
        }
      }
    }

    let isDisabled =
      (isSolar
        ? (disabledMax1 && disabledMax2) || (disabledMin1 && disabledMin2)
        : disabledMax1 || disabledMin1) ||
      disabled ||
      limited;

    const className = classNames({
      [classes["selected"]]: isSelected,
      [classes["now"]]: now.isSame(currentMonth, monthStr),
      [classes["disabled"]]: isDisabled,
      [classes["start"]]: start,
      [classes["end"]]: end,
      [classes["between"]]: between
    });

    return (
      <td
        key={month}
        className={className}
        onClick={this.select.bind(this, month, isDisabled)}
      >
        {months ? months[idx + row * 3] : month}
      </td>
    );
  };

  render() {
    const _moment = this.state.moment;
    const { months } = this.state;
    const { changePanel, style, isSolar } = this.props;

    return (
      <div className={classes["calendar-months"]} style={style}>
        <div className={classes["calendar-nav"]}>
          <button
            type="button"
            className="prev-month"
            onClick={this.changeYear.bind(this, "prev")}
          >
            <i className={`${classes["icon"]} ${classes["icon-angle-left"]}`} />
          </button>
          <span
            className={classes["current-date"]}
            onClick={changePanel.bind(this, "year", _moment)}
          >
            {_moment.format(isSolar ? "jYYYY" : "YYYY")}
          </span>
          <button
            type="button"
            className="next-month"
            onClick={this.changeYear.bind(this, "next")}
          >
            <i
              className={`${classes["icon"]} ${classes["icon-angle-right"]}`}
            />
          </button>
        </div>
        <table>
          <tbody>
            {chunk(months, 3).map((_months, idx) => {
              return (
                <tr key={idx}>
                  {_months.map(this._renderMonth.bind(this, idx))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Month;
