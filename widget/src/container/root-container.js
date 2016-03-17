import React from 'react';
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
   * Look for params of primary details component and go to next step
   * @param payload
   */
  getPrimaryDetails (payload) {
    this.setState({
      brandID    : payload.brandID,
      brandTitle : payload.brandTitle,
      modelID    : payload.modelID,
      modelTitle : payload.modelTitle,
      year       : payload.year,
      secondaryActive : true
    });
  }

  /**
   * Collect and concat all search params and initiate search
   * @param payload
   */
  getSecondaryDetails (payload) {
    if (payload.predictedPrice) {
      this.setState({ predictedPrice : `${payload.predictedPrice}` });
    } else {
      this.setState({ predictedPrice : 'error' });
    }
  }

  /**
   * Hide search result component and secondary details
   * section when a brand or model selected again.
   */
  refreshSelection () {
    this.setState({
      secondaryActive : false,
      predictedPrice  : null
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
          result={this.state.predictedPrice}
        />
      </div>
    );
  }
}
