import React from 'react';

export default class SearchResult extends React.Component {
  static propTypes = {
    result :  React.PropTypes.array
  };

  render () {
    if (!this.props.result) return null;

    return (
      <div> search result will display here </div>
    )
  }
}
