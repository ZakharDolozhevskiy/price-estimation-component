import React from 'react';
import { fetchExtras } from '../../api';

/**
 * Response for extras options selection
 */
export default class Extras extends React.Component {

  static propTypes = {
    onExtrasLoad : React.PropTypes.func.isRequired,
    modelID  : React.PropTypes.string.isRequired,
    prodYear : React.PropTypes.string.isRequired,
    bodytype : React.PropTypes.string,
    engine   : React.PropTypes.string
  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  /**
   * Fetch extras option about selected model with available options
   * @param {Object} props Component properties
   * @param {String} props.modelID - selected model id
   * @param {String} props.engine - selected engine
   * @param {String} props.prodYear - selected production year
   * @param {String} props.bodytype - selected bodytype
   */
  componentWillReceiveProps (props) {
    if (!props.engine || props.engine === this.state.engine ) return;

    this.setState({
      engine   : props.engine,
      modelID  : props.modelID
    });

    fetchExtras(props.modelID, props.prodYear, props.bodytype, props.engine)
      .then((response) => this.successFetchHandler(response));

  }

  successFetchHandler (response) {
    this.setState({ extras : response.extras });

    this.props.onExtrasLoad({
      carID          : response.id,
      predictedPrice : response.predicted_price
    });
  }

  /**
   * Helper methods. Render select's options
   * @param {Array} source - list of extras options
   * @returns {Array} list of react components
   */
  printExtras (source) {
    return Object.keys(source).map((key) => {
      const item = source[key];

      return (
        <div key={item.id}>
          <label>
            {item.label}
            <input type="checkbox" value={item.label}/>
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
