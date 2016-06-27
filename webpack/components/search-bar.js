import { h, render, Component } from 'preact';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      focused: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const value = this.state.value.toLowerCase();
    const { setFilter, tags, categories } = this.props;

    if (categories.includes(value)) {
      setFilter({category: value});
      this.setState({
        value: ''
      });
    } else if (tags.includes(value)) {
      setFilter({tag: value});
      this.setState({
        value: ''
      });
    } else {
      // treat every word as an separate filter
      value.split(' ').forEach(word => {
        setFilter({searchTerm: word});
      });
      this.setState({
        value: ''
      });
    }
  }

  handleFocus(event) {
    event.preventDefault();
    this.setState({
      focused: true
    });
    this.base.scrollIntoView();
  }

  handleBlur(event) {
    event.preventDefault();
    this.setState({
      focused: false
    });
  }

  render() {
    return (
      <div class='search-bar-div'>
        <form id='searchForm' onSubmit={this.handleSubmit}>
          <input
            class='search-bar'
            type='text'
            value={this.state.value}
            onChange={this.handleChange}
            placeholder={(this.state.focused) ? '' : 'Click on or type a category, tag or keyword(s)'}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </form>
      </div>
    );
  }
}

export default SearchBar;
