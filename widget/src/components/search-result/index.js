import React from 'react';

/**
 * Print search result
 */
export default class SearchResult extends React.Component {

  static propTypes = {
    result : React.PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      errorMsg : 'Predicted price not found'
    }
  }

  render () {
    if (!this.props.result) { return null; }

    if (this.props.result === 'error') {
      return <p style={{color:'red'}}>{this.state.errorMsg}</p>;
    }

    return (
      <div>
        <h3>Search result:</h3>
        <div>
          Predicted price: <strong>{this.props.result}</strong>
          <hr/>
        </div>
      </div>
    )
  }
}
