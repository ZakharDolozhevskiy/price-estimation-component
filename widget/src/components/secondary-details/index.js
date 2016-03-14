import React             from 'react';
import fetch             from 'isomorphic-fetch';
import Extras            from './sd-extras';
import EngineSelector    from './sd-engine-selector';
import BodytypesSelector from './sd-bodytype-selector';

export default class SecondaryDetails extends React.Component {
  static propTypes = {
    year           : React.PropTypes.string,
    modelID        : React.PropTypes.string,
    isActive       : React.PropTypes.bool.isRequired,
    onStepComplite : React.PropTypes.func.isRequired,
  };

  constructor (props) {
    super(props);
    this.state = {
      isCompleted : false
    };
  }

  componentWillReceiveProps (props) {
    if (!props.isActive) return;

    this.setState({
      modelID : props.modelID,
      year    : props.year
    });
  }

  onBodytypeSelect (val) {
    this.setState({
      isCompleted : false,
      bodytype    : val
    });
  }

  onEngineSelect (val) {
    this.setState({
      isCompleted : true,
      engine      : val
    });
  }

  onExtrasFetch (val) {
    this.setState({
      isExtrasLoaded : true
    });
  }

  onSearch () {
    this.props.onStepComplite({
      bodytype   : this.state.bodytype,
      engine     : this.state.engine,
      kilometers : this.refs.kilometers.value || null
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
            disabled={!this.state.isCompleted || !this.state.isExtrasLoaded}>
            Receive the prediction
          </button>
        </div>
        <Extras
          bodytype={this.state.bodytype}
          prodYear={this.state.year}
          modelID ={this.state.modelID}
          engine  ={this.state.engine}
          onFetch ={this.onExtrasFetch.bind(this)}
        />
      </div>
    )
  }
}
