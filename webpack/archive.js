import { h, render, Component } from 'preact';
import ArchivedPost from './components/archived-post';
import FilterOptions from './components/filter-options';

const mainArchive = document.querySelector('#main-archive');
const archive = document.querySelector('.archive');

class Archive extends Component {
  constructor(props) {
    super(props);
    const loc = window.location.pathname;

    this.state = {
      total: null,
      filteredTotal: null,
      posts: [],
      categories: [],
      tags: [],
      activeFilters: {
        categories: [],
        tags: [],
        maxDate: '',
        minDate: '',
        searchTerms: []
      }
    };

    this.setFilter = this.setFilter.bind(this);

    // filter category or tag based on location
    if (/categories/.test(loc)) {
      const category = loc.replace(/\/|categories/g, '');
      this.state.activeFilters.categories = [category];
    } else if (/tags/.test(loc)) {
      const tag = loc.replace(/\/|tags/g, '').replace(/\-/g, ' ');
      this.state.activeFilters.categories = [tag];
    }
  }

  componentWillMount() {
    // populate posts from api
    fetch('https://api.gregjs.com/posts/everything').then(res => {
      return res.json();
    }).then(json => {
      this.setState({
        total: json.posts.length,
        posts: json.posts,
        categories: json.categories,
        tags: json.tags
      });
    });
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
    } else if (searchTerm) {
      const searchTerms = this.state.activeFilters.searchTerms;

      // if the new term already exists, get rid of it, else add it to the filters
      this.setState({
        activeFilters: {
          ...this.state.activeFilters,
          searchTerms: searchTerms.includes(searchTerm) ? searchTerms.slice(0, searchTerms.indexOf(searchTerm)).concat(searchTerms.slice(searchTerms.indexOf(searchTerm) + 1)) : [...searchTerms, searchTerm]
        }
      });
    // overwrite dates no matter what
    } else if (minDate) {
      this.setState({
        activeFilters: {
          ...this.state.activeFilters,
          minDate
        }
      });
    } else if (maxDate) {
      this.setState({
        activeFilters: {
          ...this.state.activeFilters,
          maxDate
        }
      });
    }
  }

  renderPosts(posts) {
    const filteredPosts = filterPosts(this.state.activeFilters, posts);

    function filterPosts(filters, items) {
      return items.filter(item => {
        // tags
        if (filters.tags.length) {
          return filters.tags.every(tag => {
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
        // minDate
        if (filters.minDate.length) {
          return (new Date(item.date)).getTime() >= (new Date(filters.minDate)).getTime();
        }
        return item;
      }).filter(item => {
        // maxDate
        if (filters.maxDate.length) {
          return (new Date(item.date)).getTime() <= (new Date(filters.maxDate)).getTime();
        }
        return item;
      }).filter(item => {
        // searchTerm
        if (filters.searchTerms.length) {
          return filters.searchTerms.every(term => {
            return (new RegExp(term, 'gi')).test(item.title);
          });
        }
        return item;
      })
    }

    this.setState({
      filteredTotal: filteredPosts.length
    });

    // apply filters to posts and render
    return filteredPosts.map(post => (
      <ArchivedPost postData={post} setFilter={this.setFilter} />
    ));
  }

  render() {
    return (
      <div class='archive'>
        <FilterOptions
          setFilter={this.setFilter}
          tags={this.state.tags}
          categories={this.state.categories}
          activeFilters={this.state.activeFilters}
          total={this.state.total}
          filteredTotal={this.state.filteredTotal}
        />
        <div class='archived-posts'>
          {this.state.posts.length ? this.renderPosts(this.state.posts) : <div id='loading'></div>}
        </div>
      </div>
    );
  }
}

render(<Archive />, mainArchive, archive);
