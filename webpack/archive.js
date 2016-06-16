import { h, render, Component } from 'preact';
import ArchivedPost from './components/archived-post';
import FilterOptions from './components/filter-options';

require('es6-promise').polyfill();
require('universal-fetch');

const mainArchive = document.querySelector('#main-archive');
const archive = document.querySelector('.archive');

class Archive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      categories: [],
      tags: [],
      activeFilters: {
        categories: [],
        tags: [],
        maxDate: '',
        minDate: '',
        searchTerm: ''
      },
      location: window.location.pathname
    };

    this.setFilter = this.setFilter.bind(this);
  }

  setFilter({category, tag, minDate, maxDate, searchTerm}) {
    if (category) {
      const cats = this.state.activeFilters.categories;

      // if the new category already exists, get rid of it, else add it to the filters
      this.setState({
        activeFilters: {
          ...this.state.activeFilters,
          categories: cats.includes(category) ? cats.slice(0, cats.indexOf(category)).concat(cats.slice(cats.indexOf(category) + 1)) : [...cats, category]
        }
      });
    } else if (tag) {
      const tags = this.state.activeFilters.tags;

      // if the new tag already exists, get rid of it, else add it to the filters
      this.setState({
        activeFilters: {
          ...this.state.activeFilters,
          tags: tags.includes(tag) ? tags.slice(0, tags.indexOf(tag)).concat(tags.slice(tags.indexOf(tag) + 1)) : [...tags, tag]
        }
      });
    } else {

      // overwrite dates and search terms no matter what
      this.setState({
        activeFilters: {
          ...this.state.activeFilters,
          maxDate,
          minDate,
          searchTerm
        }
      });
    }
  }

  componentWillMount() {
    const loc = window.location.pathname;

    // populate posts from api
    fetch('https://api.gregjs.com/posts/everything').then(res => {
      return res.json();
    }).then(json => {
      this.setState({
        posts: json.posts,
        categories: json.categories,
        tags: json.tags
      });

      // filter category or tag based on location
      if (/categories/.test(loc)) {
        const category = loc.replace(/\/|categories/g, '');
        this.setFilter({category});
      } else if (/tags/.test(loc)) {
        const tag = loc.replace(/\/|tags/g, '').replace(/\-/g, ' ');
        this.setFilter({tag});
      }
    });
  }

  renderPosts(posts) {
    function filterPosts(filters, items) {
      console.log(filters);
      return items.filter(item => {
        // tags
        if (filters.tags.length) {
          return filters.tags.some(tag => {
            return item.tags.includes(tag);
          });
        }
        return items;
      }).filter(item => {
        // categories
        if (filters.categories.length) {
          return filters.categories.some(category => {
            return item.category == category;
          });
        }
        return items;
      }).filter(item => {
        // maxDate
        if (filters.maxDate.length) {
          return (new Date(item.date)).getTime() <= (new Date(filters.maxDate)).getTime();
        }
        return item;
      }).filter(item => {
        // minDate
        if (filters.minDate.length) {
          return (new Date(item.date)).getTime() >= (new Date(filters.minDate)).getTime();
        }
        return item;
      }).filter(item => {
        // searchTerm
        if (filters.searchTerm.length) {
          return filters.searchTerm.split(/[ \-]/).every(term => {
            return (new RegExp(term)).test(item.title);
          });
        }
        return item;
      })
    }

    // apply filters to posts and render
    return filterPosts(this.state.activeFilters, posts).map(post => (
      <ArchivedPost postData={post} setFilter={this.setFilter} />
    ));
  }

  render() {
    return (
      <div class='archive'>
        <p>
          <em>I'm currently working on this, apologies for the somewhat wonky functionality right now. Expect an update by June 16/17.</em>
        </p>
        <FilterOptions setFilter={this.setFilter} />
        {this.state.posts.length ? this.renderPosts(this.state.posts) : <div id='loading'></div>}
      </div>
    );
  }
}

render(<Archive />, mainArchive, archive);
