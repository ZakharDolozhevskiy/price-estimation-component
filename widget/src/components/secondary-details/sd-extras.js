import React from 'react';
import { fetchExtras } from '../../api';

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
    if (props.modelID === this.state.modelID || !props.engine) return;

    fetchExtras(props.modelID, props.prodYear, props.bodytype, props.engine).then(this.fetchHandler.bind(this));

    this.setState({ modelID : props.modelID });
  }

  fetchHandler (response) {
    this.props.onFetch();
    this.setState({ extras : response.extras });
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
