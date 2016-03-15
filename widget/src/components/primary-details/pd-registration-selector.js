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

/**
 * Response for first registration year selection
 */
export default class RegistrationYearSelector extends React.Component {

  static propTypes = {
    modelID  : React.PropTypes.string,
    onSelect : React.PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  /**
   * Look for models list changes
   * @param {Object} props Component properties
   * @param {String} props.modelID ID of selected model
   */
  componentWillReceiveProps (props) {
    // Reset current selection and refresh generated list of available years
    if (!props.modelID) {

      // clear selected inputs
      this.resetSelection();

      this.setState({
        modelID : null,
        availableYears : null
      });

      return;
    }

    if (props.modelID !== this.state.modelID) {
      // clear selected inputs
      this.resetSelection();

      /**
       * Fetch available productions year of the selected model.
       * Create list with default years if fetch failed.
       */
      fetchProductionYear(props.modelID)
        .then(this.createListWithYears.bind(this))
        .catch(() => {
          this.createListWithYears(defaultYears);
        });
    }
  }

  /**
   * Create list with years
   * @param {Object} param
   * @param {Number} param.from - the year of list start
   * @param {Number} param.to - the year of list end
   */
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

  // Refresh select inputs
  resetSelection () {
    this.refs.months[0].defaultSelected = true;
    this.refs.years[0].defaultSelected  = true;
  }

  /**
   * Notify parent component when year selected
   * @param {Object} ev - event object
   */
  handleYearSelect (ev) {
    const year  = ev.target.value;
    const month = this._parseMonthOrder(this.refs.months.value);

    this.props.onSelect(`${year}-${month}`);
  }

  /**
   * Helper method. Transform production data output for months.
   * @param {String} val - Selected month name
   * @returns {string} - transformed value
   * @private
   */
  _parseMonthOrder (val) {
    let month = '01';

    if (val) {
      month = months.indexOf(val) + 1;
      month = (month < 10) ? `0${month}` : month;
    }

    return month;
  }

  /**
   * Helper methods. Render select's options
   * @param {Array} source - list of year or months
   * @returns {Array} list of react components
   */
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
