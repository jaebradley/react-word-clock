import React, { Component } from 'react';
import classNames from 'classnames';

import getTextualizedTime from './utilities/getTextualizedTime';
import calculateMillisecondsUntilNextFiveMinuteInterval from './utilities/calculateMillisecondsUntilNextFiveMinuteInterval';
import './index.css';

class Clock extends Component {
  static getRow({ active, value }) {
    return <div className={classNames('col-sm', { active })}>{ value }</div>;
  }

  constructor(props) {
    super(props);

    this.updateTextualizedTime = this.updateTextualizedTime.bind(this);

    this.state = { textualizedTime: getTextualizedTime() };
  }

  componentDidMount() {
    this.updateTextualizedTime();
  }

  componentWillUnmount() {
    clearInterval(this.updateTextualizedTimeTimeoutID);
  }

  getPreviousFiveMinuteIntervalRow(minutes) {
    const active = this.state.textualizedTime.minutes === minutes.toLowerCase()
      || (this.state.textualizedTime.minutes === 'twenty five'
          && (minutes.toLowerCase() === 'twenty' || minutes.toLowerCase() === 'five'));
    return Clock.getRow({ active, value: minutes });
  }

  getVerbRow(verb) {
    const { textualizedTime } = this.state;
    const { minutes } = textualizedTime;
    return Clock.getRow({
      active: !!minutes && textualizedTime.verb === verb.toLowerCase(),
      value: verb,
    });
  }

  getHourRow(hour) {
    return Clock.getRow({
      active: this.state.textualizedTime.hour === hour.toLowerCase(),
      value: hour,
    });
  }

  updateTextualizedTime() {
    this.setState({ textualizedTime: getTextualizedTime() });

    this.updateTextualizedTimeTimeoutID = setTimeout(
      this.updateTextualizedTime,
      calculateMillisecondsUntilNextFiveMinuteInterval(),
    );
  }

  render() {
    const { textualizedTime } = this.state;
    const { minutes } = textualizedTime;

    return (
      <div className={classNames('clock', 'container')}>
        <div className="row">
          <div className={classNames('col-sm', 'active')}>It</div>
          <div className={classNames('col-sm', 'active')}>Is</div>
          { this.getPreviousFiveMinuteIntervalRow('Half') }
          { this.getPreviousFiveMinuteIntervalRow('Ten') }
        </div>
        <div className="row">
          { this.getPreviousFiveMinuteIntervalRow('Quarter') }
          { this.getPreviousFiveMinuteIntervalRow('Twenty') }
        </div>
        <div className="row">
          { this.getPreviousFiveMinuteIntervalRow('Five') }
          <div className={classNames('col-sm', { active: !!minutes && minutes !== 'quarter' && minutes !== 'half' })}>Minutes</div>
          { this.getVerbRow('To') }
        </div>
        <div className="row">
          { this.getVerbRow('Past') }
          { this.getHourRow('One') }
          { this.getHourRow('Two') }
        </div>
        <div className="row">
          { this.getHourRow('Three') }
          { this.getHourRow('Four') }
          { this.getHourRow('Five') }
        </div>
        <div className="row">
          { this.getHourRow('Six') }
          { this.getHourRow('Seven') }
          { this.getHourRow('Eight') }
        </div>
        <div className="row">
          { this.getHourRow('Nine') }
          { this.getHourRow('Ten') }
          { this.getHourRow('Eleven') }
        </div>
        <div className="row">
          { this.getHourRow('Twelve') }
          <div className={classNames('col-sm', 'active')}>O&apos;Clock</div>
        </div>
      </div>
    );
  }
}

export default Clock;
