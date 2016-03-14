import React from 'react';
import fetch from 'isomorphic-fetch';

export default class BodytypesSelector extends React.Component {
  static propTypes = {
    modelID  : React.PropTypes.string.isRequired,
    prodYear : React.PropTypes.string.isRequired,
    onSelect : React.PropTypes.func
  };

  constructor (props) {
    super(props);
    this.state = {};
    this.fetchAboutBodyType(this.props.modelID, this.props.prodYear);
  }

  componentWillReceiveProps (props) {
    if (props.modelID !== this.state.modelID) {
      this.fetchAboutBodyType(props.modelID, props.prodYear);
    }
  }

  fetchAboutBodyType (id, year) {
    return fetch(`http://www.pkw.de/api/v1/procurement/models/${id}/${year}/body_types`)
      .then(res => {
        return res.json()
      })
      .then(bodytypes => {
        this.setState({
          modelID : id,
          bodytypes
        });
      });
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
