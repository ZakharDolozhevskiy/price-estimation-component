import React             from 'react';
import Extras            from './sd-extras';
import EngineSelector    from './sd-engine-selector';
import BodytypesSelector from './sd-bodytype-selector';

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
      this.setState({ modelID : props.modelID, year : props.year });
  }

  onBodytypeSelect (res) {
    if (!res.fetchError) {
      this.setState({ isCompleted : false, bodytype : res });
    } else {
      this.setState({
        isCompleted : true,
        bodytype    : null,
        engine      : null
      });
    }
  }

  onEngineSelect (val) {
    this.setState({ isCompleted : true, engine : val });
  }

  onSearch () {
    this.props.onStepComplete({
      bodytype   : this.state.bodytype || '',
      engine     : this.state.engine   || '',
      kilometers : this.refs.kilometers.value || '0'
    });

    //this.setState({
    //  bodytype    : null,
    //  engine      : null
    //});
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
            modelID ={this.state.modelID}
            disabled={!this.state.isCompleted}>
            Receive the prediction
          </button>
        </div>
        <Extras
          bodytype={this.state.bodytype}
          prodYear={this.state.year}
          modelID ={this.state.modelID}
          engine  ={this.state.engine}
        />
      </div>
    )
  }
}
