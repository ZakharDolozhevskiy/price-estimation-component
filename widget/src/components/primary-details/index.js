import React from 'react';
import { fetchBrands } from '../../api';
import BrandSelector from './pd-brands-selector';
import ModelSelector from './pd-models-selector';
import RegistrationYearSelector from './pd-registration-selector';

export default class PrimaryDetails extends React.Component {
  static propTypes = {
    onStepComplete    : React.PropTypes.func.isRequired,
    onChangeSelection : React.PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {};
    fetchBrands().then( brands => this.setState({ brands }) );
  }

  onBrandSelection (selectedBrand) {
    const brand = this.state.brands.filter((brand) => brand.id === +selectedBrand)[0];

    this.setState({
      models  : brand ? brand.models : null,
      brandID : selectedBrand,
      modelID : null
    });

    this.props.onChangeSelection();
  }

  onModelSelection (modelID) {
    this.setState({ modelID });
    this.props.onChangeSelection();
  }

  onYearSelection (year) {
    this.props.onStepComplete({
      brandID : this.state.brandID,
      modelID : this.state.modelID,
      year
    });
  }

  render () {
    if (!this.state.brands) { return <p>Processing...</p>; }

    return (
      <div>
        <h3>Primary details</h3>
        <BrandSelector onSelect={this.onBrandSelection.bind(this)} brands={this.state.brands}/>
        <ModelSelector onSelect={this.onModelSelection.bind(this)} models={this.state.models}/>
        <RegistrationYearSelector onSelect={this.onYearSelection.bind(this)} modelID={this.state.modelID}/>
      </div>
    )
  }
}
