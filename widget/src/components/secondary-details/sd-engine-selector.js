import React from 'react';
import { fetchAboutEnginesType }  from '../../api';

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

  componentWillReceiveProps (props) {
      if (props.bodytype === this.state.bodytype) return;

      this.refreshSelectValue();

      fetchAboutEnginesType(props.modelID, props.prodYear, props.bodytype)
        .then(engines =>
          this.setState({ engines, bodytype : props.bodytype })
        );
  }

  refreshSelectValue () {
    this.refs.engines[0].defaultSelected = true;
  }

  selectEngine (ev) {
    this.props.onSelect(ev.target.value);
  };

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
