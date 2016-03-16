import React from 'react';
import { fetchAboutBodytype } from '../../api';

/**
 * Response for bodytype selection
 */
export default class BodytypesSelector extends React.Component {

  static propTypes = {
    modelID  : React.PropTypes.string.isRequired,
    prodYear : React.PropTypes.string.isRequired,
    onSelect : React.PropTypes.func
  };

  /**
   * Receive properties and fetch bodytype list
   * @param {Object} props - Component properties
   * @param {String} props.modelID - model ID
   * @param {String} props.prodYear - production year
   */
  constructor (props) {
    super(props);
    this.state = { prodYear : props.prodYear };
    this.getBodytypes(props.modelID, props.prodYear);
  }

  componentWillReceiveProps (props) {
    if (props.prodYear !== this.state.prodYear) {
      this.getBodytypes(props.modelID, props.prodYear);
    }
  }

  /**
   * Fetch bodytypes by selected model and production year
   * @param {String} modelID
   * @param {String} prodYear
     */
  getBodytypes (modelID, prodYear) {
    // Notify parent component if error occurs
    const _fetchError = () => {
      this.setState({ prodYear });
      this.props.onSelect({ fetchError : true });
    };

    const _fetchSuccess = (bodytypes) => {
      this.setState({ bodytypes, prodYear });
    };

    fetchAboutBodytype(modelID, prodYear)
      .then(_fetchSuccess)
      .catch(_fetchError);
  }

  getBodytypeName (bodytypeID) {
    if (bodytypeID) {
      return this.state.bodytypes.filter((bodytype) => bodytype.id === bodytypeID)[0].name;
    }
  }

  /**
   * Notify parent component when bodytype selected
   * @param {Object} ev - event object
   */
  selectBodytype (ev) {
    const bodytype = ev.target.value;
    const bodytypeName = this.getBodytypeName(bodytype);

    this.props.onSelect({bodytype, bodytypeName});
  }

  /**
   * Helper methods. Render select's options
   * @param {Array} source - list of data about each bodytype
   * @returns {Array} list of react components
   */
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
