import React from 'react';

export default class ModelSelector extends React.Component {
  static propTypes = {
    models   : React.PropTypes.array,
    onSelect : React.PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps (props) {
    if (props.models) {
      this.setState({ models : props.models });
    } else {
      this.setState({ models : null });
    }
  }

  handleModelSelect (ev) {
    this.props.onSelect(ev.target.value);
  }

  printOptions (source) {
    return source ? source.map(el => <option key={el.id} value={el.id}>{el.name}</option>) : null;
  }

  render () {
    const modelsOptionsList = this.printOptions(this.state.models);

    return (
      <div>
        <label htmlFor="models-selector"> Models </label>
        <select id="models-selector"
          disabled={!this.state.models}
          onChange={this.handleModelSelect.bind(this)}
        >
          <option value="">select please</option>
          { modelsOptionsList }
        </select>
      </div>
    )
  }
}
