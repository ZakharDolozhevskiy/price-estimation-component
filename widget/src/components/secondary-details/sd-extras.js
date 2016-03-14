import React from 'react';
import fetch from 'isomorphic-fetch';

export default class Extras extends React.Component {
  static propTypes = {
    modelID  : React.PropTypes.string.isRequired,
    prodYear : React.PropTypes.string.isRequired,
    bodytype : React.PropTypes.string,
    engine   : React.PropTypes.string,
    onFetch  : React.PropTypes.func
  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps (props) {
    if (props.modelID !== this.state.modelID && props.engine) {
      this.fetchExtras(props.prodYear, props.modelID, props.bodytype, props.engine);
      this.setState({ modelID : props.modelID });
    }
  }

  fetchExtras (year, model, bodytype, engine) {
    const URL    = `http://www.pkw.de/api/v1/procurement/models/${model}/${year}/car`;
    const params = `body_type=${bodytype}&engine=${engine}`;

    return fetch(`${URL}?${params}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.props.onFetch();
        this.setState({
          extras : res.extras
        });
      });
  }

  printExtras (source) {
    return Object.keys(source).map((key, index) => {
      const item = source[key];

      return (
        <div>
          <label>
            {item.label}
            <input type="checkbox" key={item.id} value={item.label}/>
          </label>
        </div>
      )
    });
  }

  render () {
    if (!this.state.extras) return null;

    return (
      <div>
        <h3>Extras</h3>
        <div>{this.printExtras(this.state.extras)}</div>
      </div>
    )
  }
}
