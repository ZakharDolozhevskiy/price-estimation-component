import React from 'react';
import { fetchModels } from '../../api';

/**
 * Response for model selection
 */
export default class ModelSelector extends React.Component {

  static propTypes = {
    brandID  : React.PropTypes.string,
    onSelect : React.PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  /**
   * Look for models list changes
   * @param {Object} props Component properties
   * @param {Array} props.models list of models's data
   */
  componentWillReceiveProps (props) {
    if (!props.brandID) {
      return this.setState({ models: null });
    }

    if (props.brandID !== this.state.brandID)
    fetchModels(props.brandID).then((models) => {
      this.setState({
        brandID: props.brandID,
        models
      });
    });
  }

  parseModelTitle (modelID) {
    if (modelID) {
      return this.state.models.filter((model) => model.id === +modelID)[0].name;
    }
  }

  /**
   * Notify parent component when model selected
   * @param {Object} ev - event object
   */
  handleModelSelect (ev) {
    const modelID = ev.target.value;
    const modelTitle = this.parseModelTitle(modelID);

    this.props.onSelect({ modelID, modelTitle });
  }

  /**
   * Helper methods. Render select's options
   * @param {Array} source - list of data about each model
   * @returns {Array} list of react components
   */
  printOptions (source) {
    return source ? source.map(el => <option key={el.id} value={el.id}>{el.name}</option>) : null;
  }

  render () {
    return (
      <div>
        <label htmlFor="models-selector"> Models </label>
        <select id="models-selector"
          disabled={!this.state.models}
          onChange={this.handleModelSelect.bind(this)}
        >
          <option value="">select please</option>
          { this.printOptions(this.state.models) }
        </select>
      </div>
    )
  }
}
