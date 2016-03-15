import React from 'react';
import { fetchPrediction } from '../api';
import SearchResult from '../components/search-result';
import PrimaryDetails from '../components/primary-details';
import SecondaryDetails from '../components/secondary-details';

/**
 * Main container
 * Contains logic of children components communication
 */
export default class Root extends React.Component {

  constructor () {
    super();
    this.state = {
      secondaryActive : false,
      searchResult    : null
    };
  }

  /**
   * Helper method. Parse engine power
   * @param {String} str - describe selected engine
   * @returns {String} - parsed engine value
   * @private
   */
  _parseEnginePower (str) {
    return `${str.split('&power=').reverse()[0] * 100}`;
  }

  /**
   * Concat search params from children components
   * @param {Object} opt - search params
   * @returns {Object} - collected prams for search
   */
  getPredictionParams (opt) {
    return {
      brand        : this.state.brandID,
      model        : this.state.modelID,
      mileage_from : opt.kilometers,
      bodytype     : opt.bodytype,
      power_from   : this._parseEnginePower(opt.engine),
      initial_registration_from : this.state.year
    };
  }

  /**
   * Look for params of primary details component and go to next step
   * @param data
   */
  getPrimaryDetails (data) {
    this.setState({
      brandID : data.brandID,
      modelID : data.modelID,
      year    : data.year,
      secondaryActive : true
    });
  }

  /**
   * Collect and concat all search params and initiate search
   * @param data
   */
  getSecondaryDetails (data) {
    const params = this.getPredictionParams(data);

    fetchPrediction(params).then(res => this.setState({ searchResult : res.results }));
  }

  /**
   * Hide search result component and secondary details
   * section when a brand or model selected again.
   */
  refreshSelection () {
    this.setState({
      secondaryActive : false,
      searchResult : null
    });
  }

  render () {
    return (
      <div className='estimation-component wrap'>
        <PrimaryDetails
          onStepComplete   ={this.getPrimaryDetails.bind(this)}
          onChangeSelection={this.refreshSelection.bind(this)}
        />
        <SecondaryDetails
          year          ={this.state.year}
          modelID       ={this.state.modelID}
          isActive      ={this.state.secondaryActive}
          onStepComplete={this.getSecondaryDetails.bind(this)}
        />
        <SearchResult
          result={this.state.searchResult}
        />
      </div>
    );
  }
}
