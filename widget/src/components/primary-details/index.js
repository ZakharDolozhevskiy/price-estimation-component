import React from 'react';
import { fetchBrands } from '../../api';
import BrandSelector from './pd-brands-selector';
import ModelSelector from './pd-models-selector';
import RegistrationYearSelector from './pd-registration-selector';

/**
 * Component response for getting info about brand, model and production year
 */
export default class PrimaryDetails extends React.Component {

  static propTypes = {
    onStepComplete    : React.PropTypes.func.isRequired,
    onChangeSelection : React.PropTypes.func.isRequired
  };

  /**
   * Get list of cars brands
   * @param props
   */
  constructor (props) {
    super(props);
    this.state = {};
    fetchBrands().then( brands => this.setState({ brands }) );
  }

  /**
   * Fetch list of model for selected brand
   * @param {String} selectedBrand - selected brand ID
   */
  onBrandSelection (selectedBrand) {
    this.setState(selectedBrand);

    // Reset previously selected info
    this.props.onChangeSelection();
  }

  onModelSelection (selectedModel) {
    this.setState(selectedModel);

    // Reset previously selected info
    this.props.onChangeSelection();
  }

  /**
   * Notify the parent component when user added primary details
   * @param {String} year - selected production year
   */
  onYearSelection (year) {
    this.props.onStepComplete({
      brandID : this.state.brandID,
      brandTitle : this.state.brandTitle,
      modelID : this.state.modelID,
      modelTitle : this.state.modelTitle,
      year
    });
  }

  render () {
    if (!this.state.brands) { return <p>Processing...</p>; }

    return (
      <div>
        <h3>Primary details</h3>
        <BrandSelector onSelect={this.onBrandSelection.bind(this)} brands={this.state.brands}/>
        <ModelSelector onSelect={this.onModelSelection.bind(this)} brandID={this.state.brandID}/>
        <RegistrationYearSelector onSelect={this.onYearSelection.bind(this)} modelID={this.state.modelID}/>
      </div>
    )
  }
}
