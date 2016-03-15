import React from 'react';
import { fetchAboutBodytype } from '../../api';

export default class BodytypesSelector extends React.Component {
  static propTypes = {
    modelID  : React.PropTypes.string.isRequired,
    prodYear : React.PropTypes.string.isRequired,
    onSelect : React.PropTypes.func
  };

  constructor (props) {
    super(props);
    this.state = {};
    this.getBodytypes(this.props.modelID, this.props.prodYear);
  }

  componentWillReceiveProps (props) {
    if (props.modelID !== this.state.modelID) {
      this.getBodytypes(props.modelID, props.prodYear);
    }
  }

  getBodytypes (modelID, prodYear) {
    const _fetchError = () => {
      this.setState({ modelID });
      this.props.onSelect({ fetchError : true });
    };

    const _fetchSuccess = (bodytypes) => this.setState({ bodytypes, modelID });

    fetchAboutBodytype(modelID, prodYear)
      .then(_fetchSuccess)
      .catch(_fetchError);
  }

  selectBodytype (ev) {
    this.props.onSelect(ev.target.value);
  }

  printBodytypesList (source) {
    return source.map(el => <option key={el.id} value={el.id}>{el.name}</option>);
  }

  render () {
    const bodytypesList = this.state.bodytypes ? this.printBodytypesList(this.state.bodytypes) : null;

    return (
      <div>
        <label> Body type </label>
        <select id="bodytypes-selector"
          disabled={!this.state.bodytypes}
          onChange={this.selectBodytype.bind(this)}
        >
          <option value="">select please</option>
          { bodytypesList }
        </select>
      </div>
    )
  }
}
