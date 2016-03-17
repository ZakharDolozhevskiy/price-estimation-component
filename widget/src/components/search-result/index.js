import React from 'react';

/**
 * Print search result
 */
export default class SearchResult extends React.Component {

  static propTypes = {
    result : React.PropTypes.array
  };

  printSearchResult (source) {
    return source.map((item) => {
      return (
        <div key={item.id}>
          Prediction price: <strong>{item.price.predicted}</strong>
          <hr/>
        </div>
      )
    });
  }

  render () {
    if (!this.props.result) {
      return null;
    }
    else if (!this.props.result.length) {
      return <p>Can't find cars by this search params</p>;
    }

    return (
      <div>
        <h3>Search results</h3>
        <div>{ this.printSearchResult(this.props.result) }</div>
      </div>
    )
  }
}
