import React, { Component } from "react";
const moment = require("moment-jalaali");
import classNames from "classnames/bind";

import { chunk, range, convertNumToPersian } from "../utils";

import classes from "../sass";

class Year extends Component {
  constructor(props) {
    super(props);
    const { isSolar } = props;

    this.state = {
      moment: props.moment,
      yearStr: isSolar ? "jYear" : "year"
    };
  }

  componentWillReceiveProps(props) {
    const { isSolar } = props;

    this.setState({
      moment: props.moment,
      yearStr: isSolar ? "jYear" : "year"
    });
  }

  changePeriod = dir => {
    const _moment = this.state.moment.clone();
    const { yearStr } = this.state;

    this.setState({
      moment: _moment[dir === "prev" ? "subtract" : "add"](10, yearStr)
    });
  };

  select = (year, isDisabled) => {
    if (isDisabled) return;
    const _moment = this.state.moment.clone();
    const { yearStr } = this.state;

    _moment[yearStr](year);

    this.setState({
      moment: _moment,
      selected: _moment
    });
    this.props.onSelect(_moment);
  };

  _renderYear = year => {
    const now = moment();
    const _moment = this.state.moment;
    const { yearStr } = this.state;
    const firstYear = Math.floor(_moment[yearStr]() / 10) * 10;
    const {
      maxDate,
      minDate,
      selected,
      range,
      rangeAt,
      dateLimit,
      lang
    } = this.props;
    const currentYear = _moment.clone()[yearStr](year);
    const start =
      selected && range
        ? selected.start
          ? currentYear.isSame(selected.start, yearStr)
          : false
        : false;
    const end =
      selected && range
        ? selected.end
          ? currentYear.isSame(selected.end, yearStr)
          : false
        : false;
    const between =
      selected && range
        ? selected.start && selected.end
          ? currentYear.isBetween(selected.start, selected.end, yearStr)
          : false
        : false;
    const isSelected = selected
      ? range
        ? selected[rangeAt]
          ? selected[rangeAt][yearStr]() === year
          : false
        : selected[yearStr]() === year
      : false;
    const disabledMax = maxDate ? year > maxDate[yearStr]() : false;
    const disabledMin = minDate ? year < minDate[yearStr]() : false;
    let disabled = false;
    let limited = false;

    if (range) {
      if (rangeAt === "start" && selected && selected.end) {
        disabled = selected.end && currentYear.isAfter(selected.end, "day");
      } else if (rangeAt === "end" && selected && selected.start) {
        disabled =
          selected.start && currentYear.isBefore(selected.start, "day");
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
          limited = !currentYear.isBetween(
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
      [classes["selected"]]: isSelected,
      [classes["now"]]: now[yearStr]() === year,
      [classes["prev"]]: firstYear - 1 === year,
      [classes["next"]]: firstYear + 10 === year,
      [classes["disabled"]]: isDisabled,
      [classes["start"]]: start,
      [classes["end"]]: end,
      [classes["between"]]: between
    });

    return (
      <td
        key={year}
        className={className}
        onClick={this.select.bind(this, year, isDisabled)}
      >
        {lang == "fa" ? convertNumToPersian(year) : year}
      </td>
    );
  };

  render() {
    const _moment = this.state.moment;
    const { yearStr } = this.state;
    const { style, lang } = this.props;
    const firstYear = Math.floor(_moment[yearStr]() / 10) * 10;
    const years = range(firstYear - 1, firstYear + 11);

    return (
      <div className={classes["calendar-years"]} style={style}>
        <div className={classes["calendar-nav"]}>
          <button
            type="button"
            className="prev-month"
            onClick={this.changePeriod.bind(this, "prev")}
          >
            <i className={`${classes["icon"]} ${classes["icon-angle-left"]}`} />
          </button>
          <span className={`${classes["current-date"]} ${classes["disabled"]}`}>
            {lang == "fa"
              ? `${convertNumToPersian(firstYear)} - ${convertNumToPersian(
                  firstYear + 9
                )}`
              : `${firstYear} - ${firstYear + 9}`}
          </span>
          <button
            type="button"
            className="next-month"
            onClick={this.changePeriod.bind(this, "next")}
          >
            <i
              className={`${classes["icon"]} ${classes["icon-angle-right"]}`}
            />
          </button>
        </div>
        <table>
          <tbody>
            {chunk(years, 4).map((_years, idx) => {
              return <tr key={idx}>{_years.map(this._renderYear)}</tr>;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Year;
