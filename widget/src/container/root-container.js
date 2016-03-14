import React from 'react';
import { fetchPrediction } from '../api';
import SearchResult from '../components/search-result';
import PrimaryDetails from '../components/primary-details';
import SecondaryDetails from '../components/secondary-details';

export default class Root extends React.Component {
  constructor () {
    super();
    this.state = {
      secondaryActive : false,
      searchResult    : null
    };
  }

  _parseEnginePower (str) {
    return '' + str.split('&power=').reverse()[0] * 100;
  }

  getPredictionParams (opt) {
    return {
      brand        : this.state.brandID,
      model        : this.state.modelID,
      mileage      : opt.kilometers || 0,
      bodytype     : opt.bodytype,
      power_from   : this._parseEnginePower(opt.engine),
      initial_registration_from : this.state.year,
    }
  }

  getPrimaryDetails (data) {
    this.setState({
      brandID : data.brandID,
      modelID : data.modelID,
      year    : data.year,
      secondaryActive : true,
    })
  }

  getSecondaryDetails (data) {
    const params = this.getPredictionParams(data);

    fetchPrediction(params).then(res => this.setState({ searchResult : res.results }) );
  }

  render () {
    return (
      <div className='estimation-component wrap'>
        <PrimaryDetails
          onStepComplite={this.getPrimaryDetails.bind(this)}/>
        <SecondaryDetails
          year          ={this.state.year}
          modelID       ={this.state.modelID}
          isActive      ={this.state.secondaryActive}
          onStepComplite={this.getSecondaryDetails.bind(this)}
         />
        <SearchResult
          result={this.state.searchResult}
        />
      </div>
    );
  }
}
