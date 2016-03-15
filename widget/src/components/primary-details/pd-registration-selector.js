import React from 'react';
import { fetchProductionYear } from '../../api';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const defaultYears = {
  from: 1960,
  to: new Date().getFullYear()
};

export default class RegistrationYearSelector extends React.Component {
  static propTypes = {
    modelID  : React.PropTypes.string,
    onSelect : React.PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps (props) {
    if (!props.modelID) {
      this.resetSelection();
      this.setState({
        modelID : null,
        availableYears : null
      });

      return;
    }

    if (props.modelID !== this.state.modelID) {
      this.resetSelection();
      fetchProductionYear(props.modelID)
        .then(this.createListWithYears.bind(this))
        .catch(this._errorFetchHandler.bind(this));
    }
  }

  _errorFetchHandler () {
    this.createListWithYears(defaultYears);
  }

  createListWithYears (param) {
    let availableYears = [];

    for (let i = param.from; i <= param.to; i++) {
      availableYears.push(i);
    }

    this.setState({
      availableYears,
      modelID : this.props.modelID
    });
  }

  resetSelection () {
    this.refs.months[0].defaultSelected = true;
    this.refs.years[0].defaultSelected  = true;
  }

  handleYearSelect (ev) {
    const year  = ev.target.value;
    const month = this._parseMonthOrder(this.refs.months.value);

    this.props.onSelect(`${year}-${month}`);
  }

  _parseMonthOrder (val) {
    let month = '01';

    if (val) {
      month = months.indexOf(val) + 1;
      month = (month < 10) ? `0${month}` : month;
    }

    return month;
  }

  printOptions (source) {
    return source ? source.map((val, index) => <option key={index} value={val}>{val}</option>) : null;
  }

  render () {
    const monthsOpt = this.printOptions(months);
    const yearsOpt  = this.printOptions(this.state.availableYears);

    return (
      <div>
        <label> Select first registration </label>
        <select id="prod-year-selector"
          ref="months"
          disabled={!this.state.availableYears}
        >
          <option value="">select please</option>
          { monthsOpt }
        </select>
        <select id="prod-year-selector"
          ref="years"
          disabled={!this.state.availableYears}
          onChange={this.handleYearSelect.bind(this)}
        >
          <option value="">select please</option>
          { yearsOpt }
        </select>
      </div>
    )
  }
}
