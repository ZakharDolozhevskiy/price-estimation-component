import React from 'react';

export default class BrandSelector extends React.Component {
  static propTypes = {
    brands   : React.PropTypes.array.isRequired,
    onSelect : React.PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = { brands : props.brands };
  }

  handleBrandSelect (ev) {
    this.props.onSelect(ev.target.value);
  }

  printOptions (source) {
    return source.map(el => <option key={el.id} value={el.id}>{el.name}</option>);
  }

  render () {
    return (
      <div>
        <label htmlFor="brands-selector"> Brands </label>
        <select id="brands-selector"
          onChange={this.handleBrandSelect.bind(this)}
        >
          <option value="">select please</option>
          { this.printOptions(this.state.brands) }
        </select>
      </div>
    )
  }
}
