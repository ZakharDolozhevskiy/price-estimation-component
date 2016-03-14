import React from 'react';
import fetch from 'isomorphic-fetch';
import SearchResult from '../components/search-result';
import PrimaryDetails from '../components/primary-details';
import SecondaryDetails from '../components/secondary-details';

export default class Root extends React.Component {
  constructor () {
    super();
    this.state = {
      secondaryActive : false
    };
  }

  _parseEnginePower (str) {
    return '' + str.split('&power=').reverse()[0] * 100;
  }

  fetchPrediction (opt) {
    const URL = 'http://pkw.de/api/v1/cars/search';
    const payload = {
      //power_from : this._parseEnginePower(opt.engine),
      brand      : +this.state.brandID,
      //model      : this.state.modelID,
      //initial_registration : this.state.year,
    };

    if (opt.kilometers) { payload.mileage = opt.kilometers; }

    fetch(URL, {
      method  : 'post',
     // headers : {'Accept': 'application/json', 'Content-Type': 'application/json'},
     // body    : JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {})
      .catch(err => {});
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
    this.fetchPrediction({
      bodytype   : data.bodytype,
      engine     : data.engine,
      kilometers : data.kilometers
    });
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
          result={null}
        />
      </div>
    );
  }
}
