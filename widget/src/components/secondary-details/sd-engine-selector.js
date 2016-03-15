import React from 'react';
import { fetchAboutEnginesType }  from '../../api';

/**
 * Response for engine selection
 */
export default class EngineSelector extends React.Component {

  static propTypes = {
    modelID  : React.PropTypes.string.isRequired,
    prodYear : React.PropTypes.string.isRequired,
    bodytype : React.PropTypes.string,
    onSelect : React.PropTypes.func
  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  /**
   * Fetch available engines by selected bodytype and model
   * @param {Object} props Component properties
   * @param {String} props.modelID - selected model id
   * @param {String} props.prodYear - selected production year
   * @param {String} props.bodytype - selected bodytype
   */
  componentWillReceiveProps (props) {
      if (!props.bodytype || props.modelID === this.state.modelID) return;

      this.refreshSelectValue();

      fetchAboutEnginesType(props.modelID, props.prodYear, props.bodytype)
        .then(engines =>
          this.setState({
            engines,
            bodytype : props.bodytype,
            modelID  : props.modelID
          })
        );
  }

  /**
   * Reset previous selected input value
   */
  refreshSelectValue () {
    this.refs.engines[0].defaultSelected = true;
  }

  /**
   * Notify parent component when engine selected
   * @param {Object} ev - event object
   */
  selectEngine (ev) {
    this.props.onSelect(ev.target.value);
  };

  /**
   * Helper methods. Render select's options
   * @param {Array} source - list of data about each engine
   * @returns {Array} list of react components
   */
  printEnginesList (source) {
    let value = null;

    return source.map((el, index) => {
      value = `${el.engine}&power=${el.power}`;

      return <option key={index} value={value}>{el.label}</option>;
    })
  }

  render () {
    const enginesList = this.state.engines ? this.printEnginesList(this.state.engines) : null;

    return (
      <div>
        <label> Engine </label>
        <select id="engines-selector"
          ref = "engines"
          disabled={!this.state.engines}
          onChange={this.selectEngine.bind(this)}
        >
          <option value="">select please</option>
          { enginesList }
        </select>
      </div>
    )
  }
}
