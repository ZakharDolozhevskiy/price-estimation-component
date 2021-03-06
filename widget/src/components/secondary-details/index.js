import React             from 'react';
import Extras            from './sd-extras';
import EngineSelector    from './sd-engine-selector';
import BodytypesSelector from './sd-bodytype-selector';

/**
 * Component responses for getting secondary details about searched car
 */
export default class SecondaryDetails extends React.Component {

  static propTypes = {
    year           : React.PropTypes.string,
    modelID        : React.PropTypes.string,
    isActive       : React.PropTypes.bool.isRequired,
    onStepComplete : React.PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = { isCompleted : false };
  }

  componentWillReceiveProps (props) {
    this.setState({
      modelID : props.modelID,
      year : props.year
    });
  }

  /**
   * Listen for bodytype changes.
   * If bodytype fetch error hide engine and bodytype filed and stop to load extras options
   * @param {Object} res - payload from bodytype component
   */
  onBodytypeSelect (res) {
    if (!res.fetchError) {
      this.setState({
        isCompleted  : false,
        engine       : null,
        bodytypeName : res.bodytypeName,
        bodytype     : res.bodytype,
      });
    } else {
      this.setState({
        isCompleted : true,
        bodytype    : null,
        engine      : null,
        predictedPrice : null
      });
    }
  }

  onEngineSelect (val) {
    this.setState({
      isCompleted : false,
      engine : val
    });
  }

  onExtrasLoaded (payload) {
    this.setState({
      isCompleted    : true,
      predictedPrice : payload.predictedPrice
    });
  }

  /**
   * Handle click by search button.
   * Collect added search options and notify parent component.
   */
  onSearch () {
    this.props.onStepComplete({
      predictedPrice : this.state.predictedPrice || ''
    });
  }

  render () {
    if (!this.props.isActive) return null;

    return (
      <div>
        <h3>Additional information</h3>
        <BodytypesSelector
          modelID ={this.state.modelID}
          prodYear={this.state.year}
          onSelect={this.onBodytypeSelect.bind(this)}
        />
        <EngineSelector
          bodytype={this.state.bodytype}
          prodYear={this.state.year}
          modelID ={this.state.modelID}
          onSelect={this.onEngineSelect.bind(this)}
        />
        <lable>Enter kilometers </lable>
        <input ref="kilometers" type="text"/>
        <div>
          <button
            type="button"
            onClick={this.onSearch.bind(this)}
            disabled={!this.state.isCompleted}>
            Receive the prediction
          </button>
        </div>
        <Extras
          bodytype={this.state.bodytype}
          prodYear={this.state.year}
          modelID ={this.state.modelID}
          engine  ={this.state.engine}
          onExtrasLoad={this.onExtrasLoaded.bind(this)}
        />
      </div>
    )
  }
}
