import React, { Component } from "react";
const moment = require("moment-jalaali");
import classNames from "classnames/bind";

import { WEEKS, WEEKS_FA, DAY_FORMAT, DAY_FORMAT_SOLAR } from "../constants";
import {
  range as arrayRange,
  chunk,
  convertNumToPersian,
  enWeekToFaWeek
} from "../utils";

import classes from "../sass";

class Day extends Component {
  constructor(props) {
    super(props);
    const { isSolar } = props;

    this.state = {
      moment: props.moment,
      dateStr: isSolar ? "jDate" : "date",
      monthStr: isSolar ? "jMonth" : "month"
    };
  }

  componentWillReceiveProps(props) {
    const { isSolar } = props;

    this.setState({
      moment: props.moment,
      dateStr: isSolar ? "jDate" : "date",
      monthStr: isSolar ? "jMonth" : "month"
    });
  }

  changeMonth = dir => {
    const _moment = this.state.moment.clone();
    const { monthStr } = this.state;

    this.setState({
      moment: _moment[dir === "prev" ? "subtract" : "add"](1, monthStr)
    });
  };

  select = (day, isSelected, isDisabled, isPrevMonth, isNextMonth) => {
    if (isDisabled) return;
    const { range, onSelect } = this.props;
    const _moment = this.state.moment.clone();
    const { monthStr, dateStr } = this.state;

    if (isPrevMonth) _moment.subtract(1, monthStr);
    if (isNextMonth) _moment.add(1, monthStr);

    _moment[dateStr](day);

    this.setState({
      moment: range ? this.state.moment : _moment
    });
    onSelect(_moment);
  };

  _renderWeek = week => {
    return <th key={week}>{week}</th>;
  };

  _renderDay = (week, day) => {
    const {
      maxDate,
      minDate,
      range,
      rangeAt,
      selected,
      dateLimit,
      lang
    } = this.props;
    const now = moment();
    const _moment = this.state.moment;
    const { monthStr, dateStr } = this.state;
    const isPrevMonth = week === 0 && day > 7;
    const isNextMonth = week >= 4 && day <= 14;
    const month = isNextMonth
      ? _moment.clone().add(1, monthStr)
      : isPrevMonth
      ? _moment.clone().subtract(1, monthStr)
      : _moment.clone();
    const currentDay = month.clone()[dateStr](day);
    const start =
      selected && range
        ? selected.start
          ? currentDay.isSame(selected.start, "day")
          : false
        : false;
    const end =
      selected && range
        ? selected.end
          ? currentDay.isSame(selected.end, "day")
          : false
        : false;
    const between =
      selected && range
        ? selected.start && selected.end
          ? currentDay.isBetween(selected.start, selected.end, "day")
          : false
        : false;
    const isSelected = selected
      ? range
        ? (rangeAt === "start" && start) || (rangeAt === "end" && end)
        : currentDay.isSame(selected, "day")
      : false;
    const disabledMax = maxDate ? currentDay.isAfter(maxDate, "day") : false;
    const disabledMin = minDate ? currentDay.isBefore(minDate, "day") : false;
    let disabled = false;
    let limited = false;

    if (range) {
      if (rangeAt === "start" && selected && selected.end) {
        disabled = currentDay.isAfter(selected.end, "day");
      } else if (rangeAt === "end" && selected && selected.start) {
        disabled = currentDay.isBefore(selected.start, "day");
      }
    }

    if (dateLimit && range) {
      const limitKey = Object.keys(dateLimit)[0];
      const limitValue = dateLimit[limitKey];
      let minLimitedDate, maxLimitedDate;

      if (selected) {
        if (rangeAt === "start" && selected.end) {
          maxLimitedDate = selected.end.clone();
          minLimitedDate = maxLimitedDate
            .clone()
            .subtract(limitValue, limitKey);
        } else if (rangeAt === "end" && selected.start) {
          minLimitedDate = selected.start.clone();
          maxLimitedDate = minLimitedDate.clone().add(limitValue, limitKey);
        }

        if (minLimitedDate && maxLimitedDate) {
          limited = !currentDay.isBetween(
            minLimitedDate,
            maxLimitedDate,
            "day",
            rangeAt === "start" ? "(]" : "[)"
          );
        }
      }
    }

    const isDisabled = disabledMax || disabledMin || disabled || limited;
    const className = classNames({
      [classes["prev"]]: isPrevMonth,
      [classes["next"]]: isNextMonth,
      [classes["selected"]]: isSelected,
      [classes["now"]]: now.isSame(currentDay, "day"),
      [classes["disabled"]]: isDisabled,
      [classes["start"]]: start,
      [classes["end"]]: end,
      [classes["between"]]: between
    });

    return (
      <td
        key={day}
        className={className}
        onClick={this.select.bind(
          this,
          day,
          isSelected,
          isDisabled,
          isPrevMonth,
          isNextMonth
        )}
      >
        {lang == "fa" ? convertNumToPersian(day) : day}
      </td>
    );
  };

  render() {
    const {
      isSolar,
      lang,
      weeks = lang == "fa" ? WEEKS_FA : WEEKS,
      dayFormat = isSolar ? DAY_FORMAT_SOLAR : DAY_FORMAT,
      style,
      changePanel
    } = this.props;
    const _moment = this.state.moment;
    const { monthStr, dateStr } = this.state;
    let firstDay = _moment
      .clone()
      [dateStr](1)
      .day();
    if (lang == "fa") firstDay = enWeekToFaWeek(firstDay);
    const endOfThisMonth = _moment
      .clone()
      .endOf(monthStr)
      [dateStr]();
    const endOfLastMonth = _moment
      .clone()
      .subtract(1, monthStr)
      .endOf(monthStr)
      [dateStr]();
    const days = [].concat(
      arrayRange(endOfLastMonth - firstDay + 1, endOfLastMonth + 1),
      arrayRange(1, endOfThisMonth + 1),
      arrayRange(1, 42 - endOfThisMonth - firstDay + 1)
    );

    return (
      <div className={classes["calendar-days"]} style={style}>
        <div className={classes["calendar-nav"]}>
          <button
            type="button"
            className="prev-month"
            onClick={this.changeMonth.bind(this, "prev")}
          >
            <i className={`${classes["icon"]} ${classes["icon-angle-left"]}`} />
          </button>
          <span
            className={classes["current-date"]}
            onClick={changePanel.bind(this, "month", _moment)}
          >
            {_moment.format(dayFormat)}
          </span>
          <button
            type="button"
            className="next-month"
            onClick={this.changeMonth.bind(this, "next")}
          >
            <i
              className={`${classes["icon"]} ${classes["icon-angle-right"]}`}
            />
          </button>
        </div>
        <table>
          <thead>
            <tr>{weeks.map(week => this._renderWeek(week))}</tr>
          </thead>
          <tbody>
            {chunk(days, 7).map((week, idx) => {
              return (
                <tr key={idx}>{week.map(this._renderDay.bind(this, idx))}</tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Day;
