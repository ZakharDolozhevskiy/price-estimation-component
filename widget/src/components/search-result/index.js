import React from 'react';

export default class SearchResult extends React.Component {
  static propTypes = {
    result : React.PropTypes.array
  };

  printSearchResult (source) {
    return source.map((item) => {
      return (
        <div key={item.id}>
          { this._printHeader(item.name, item.brand, item.price, item.mileage) }
          { this._printImage(item.main_image) }
          { this._printDescription(item.bodytype, item.initial_registration, item.power) }
          <hr/>
        </div>
      )
    });
  }

  _printHeader (title, brand, price, mileage) {
    return (
      <div>
        <h5>{brand.name} - {title}</h5>
        Price: <strong>{price.predicted} </strong>
        Mileage: <strong> {mileage}</strong>
      </div>
    )
  }

  _printImage (img) {
    return (
      <div>
        <img src={img.thumb}/>
      </div>
    )
  }

  _printDescription (bodytype, registration, power) {
    return (
      <div>
        <p>Bodytype : {bodytype.name}</p>
        <p>First registration : {registration}</p>
        <p>Engine : {power.hp}</p>
      </div>
    )
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
