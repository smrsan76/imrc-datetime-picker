import React, { Component, Fragment } from "react";
import ReactSlider from "react-slider";
const moment = require("moment-jalaali");

import classes from "../sass";

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: this.getCurrentMoment(props)
    };
  }

  componentWillReceiveProps(props) {
    this.updateMoment(props);
  }

  componentDidMount() {
    this.updateMoment(this.props);
  }

  updateMoment = props => {
    this.setState({
      moment: this.getCurrentMoment(props)
    });
  };

  getCurrentMoment = props => {
    const { range, rangeAt } = props;
    let result = props.moment;

    if (result) {
      if (range) {
        result =
          result[rangeAt] ||
          moment()
            .hours(0)
            .minutes(0)
            .seconds(0);
      }
    } else {
      result = moment()
        .hours(0)
        .minutes(0)
        .seconds(0);
    }

    return result;
  };

  handleChange = (type, value) => {
    const { onChange, range, rangeAt } = this.props;
    const _moment = this.state.moment.clone();
    let selected = this.props.moment;

    _moment[type](value);

    if (range) {
      const copyed = selected ? Object.assign(selected, {}) : {};

      copyed[rangeAt] = _moment;
    } else {
      selected = _moment;
    }

    this.setState({
      moment: _moment
    });
    onChange && onChange(selected);
  };

  render() {
    const _moment = this.state.moment;
    const { style, showSecondsPicker } = this.props;
    const defaultHourValue = _moment.hour();
    const defaultMinuteValue = _moment.minute();
    const defaultSecondValue = _moment.second();

    return (
      <div style={style}>
        <div className={classes["time"]}>
          <div className={classes["show-time"]}>
            <span className={classes["text"]}>{_moment.format("HH")}</span>
            <span className={classes["separater"]}>:</span>
            <span className={classes["text"]}>{_moment.format("mm")}</span>
            { showSecondsPicker
              ? (
                <Fragment>
                  <span className={classes["separater"]}>:</span>
                  <span className={classes["text"]}>{_moment.format("ss")}</span>
                </Fragment>
              )
              : (
                undefined
              )
            }
          </div>
          <div className={classes["sliders"]}>
            <span className={classes["slider-text"]}>Hours:</span>
            <ReactSlider
              min={0}
              max={23}
              value={defaultHourValue}
              defaultValue={defaultHourValue}
              onChange={this.handleChange.bind(this, "hours")}
              className={classes["slider"]}
              withBars
            >
              <div className={classes["handle"]} />
            </ReactSlider>
            <span className={classes["slider-text"]}>Minutes:</span>
            <ReactSlider
              min={0}
              max={59}
              value={defaultMinuteValue}
              defaultValue={defaultMinuteValue}
              onChange={this.handleChange.bind(this, "minutes")}
              className={classes["slider"]}
              withBars
            >
              <div className={classes["handle"]} />
            </ReactSlider>
            { showSecondsPicker 
              ? (
                <Fragment>
                  <span className={classes["slider-text"]}>Seconds:</span>
                  <ReactSlider
                    min={0}
                    max={59}
                    value={defaultSecondValue}
                    defaultValue={defaultSecondValue}
                    onChange={this.handleChange.bind(this, "seconds")}
                    className={classes["slider"]}
                    withBars
                  >
                    <div className={classes["handle"]} />
                  </ReactSlider>
                </Fragment>
              )
              : (
                undefined
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Time;
