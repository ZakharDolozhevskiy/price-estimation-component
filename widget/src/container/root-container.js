import React from 'react';
import { fetchPrediction, fetchValidBrands, fetchValidModels } from '../api';
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

    fetchValidBrands().then(validBrands =>
      this.setState({ validBrands })
    );

    fetchValidModels().then(validModels =>
      this.setState({ validModels })
    );
  }

  /**
   * Return string with replaced slashes and whitespaces.
   * @private
   */
  _resetValueString (str) {
    return str.replace(/-|\s/g,'').toLowerCase();
  }

  /**
   * Retunr valid engine param fro search
   * @param {String} engineTitle - Full title about engine
   * @returns {string} - fromatted value of engine
   * @private
     */
  _getValidEnginePower (engineTitle) {
      return engineTitle ? `${engineTitle.split('&power=').reverse()[0] * 100}` : '';
  }

  _getValidYear (year) {
    return year.split('-')[0]
  }

  /**
   * Retrun valid ID for searched brand
   * @param {String} brandTitle - Name of searched brand
   * @returns {String}
   * @private
   */
  _getValidBrandID (brandTitle) {
    let key, validBrandsTitle;
    const validBrands = this.state.validBrands.brand.valid_values;
    const fixedTitle =  this._resetValueString(brandTitle);

    for (key in validBrands) {
      validBrandsTitle = this._resetValueString(validBrands[key]);

      if (validBrands.hasOwnProperty(key) && validBrandsTitle === fixedTitle) {
        return key;
      }
    }
  }

  /**
   * Return ID of searched bodytype
   * @param {String} bodytype - name of searched bodytype
   * @returns {string}
   * @private
   */
  _getValidBodytype (bodytype) {
    const validBodytypes = this.state.validBrands.bodytype.valid_values;

    for (let key in validBodytypes) {
      if (validBodytypes.hasOwnProperty(key) && validBodytypes[key] === bodytype) {
        return key;
      }
    }
  }

  /**
   * Return formatted model id fro search
   * @param {String} brandID - valid ID of searched brand
   * @param modelTitle - name of searched model
   * @returns {String} - valid model ID
   * @private
  */
  _getValidModelID (brandID = '', modelTitle = '') {
    const title = this._resetValueString(modelTitle);

    const models = this.state.validModels.filter((brand) => brand.id === +brandID)[0];

    const model = models.models.filter((model) => {
      const validModelName = this._resetValueString(model.name);

      return (title === validModelName || new RegExp(title).test(validModelName));
    });

    return model[0] ? model[0].id : '';
  }

  /**
   * Concat search params from children components and creat valid param for search request
   * @param {Object} opt - search params
   * @returns {Object} - collected prams for search
   */
  getPredictionParams (opt) {
    const validBrandID = this._getValidBrandID(this.state.brandTitle);
    const validModelID = this._getValidModelID(validBrandID, this.state.modelTitle);

    return {
      brand        : validBrandID,
      model        : validModelID,
      bodytype     : this._getValidBodytype(opt.bodytypeName),
      power_from   : this._getValidEnginePower(opt.engine),
      mileage_to   : opt.kilometers || '200000',
      initial_registration_from :  this._getValidYear(this.state.year)
    };
  }

  /**
   * Look for params of primary details component and go to next step
   * @param data
   */
  getPrimaryDetails (data) {
    this.setState({
      brandID    : data.brandID,
      brandTitle : data.brandTitle,
      modelID    : data.modelID,
      modelTitle : data.modelTitle,
      year       : data.year,
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
