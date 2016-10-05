import { h, render, Component } from 'preact';
import ArchivedPost from './components/archived-post';
import FilterOptions from './components/filter-options';
import filterPosts from './helpers/filter-posts';

const mainArchive = document.querySelector('#main-archive');
const archive = document.querySelector('.archive');

class Archive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      filteredPosts: [],
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
    this.renderPosts = this.renderPosts.bind(this);
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

      // on initial render, filter category or tag based on location in address bar
      if (/categories/.test(loc)) {
        const category = loc.replace(/\/|categories/g, '');
        this.setFilter({category});
      } else if (/tags/.test(loc)) {
        const tag = loc.replace(/\/|tags/g, '').replace(/\-/g, ' ');
        this.setFilter({tag});
      } else {
        this.setFilter({});
      }
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

    this.setState({
      filteredPosts: filterPosts(this.state.activeFilters, this.state.posts)
    });
  }

  renderPosts(posts) {
    return posts.map(post => (
      <ArchivedPost postData={post} setFilter={this.setFilter} />
    ));
  }

  render() {
    const { filteredPosts } = this.state;

    return (
      <div class='archive'>
        <FilterOptions
          setFilter={this.setFilter}
          tags={this.state.tags}
          categories={this.state.categories}
          activeFilters={this.state.activeFilters}
          total={this.state.posts.length}
          filteredTotal={this.state.filteredPosts.length}
        />
        <div class='archived-posts'>
          {filteredPosts.length ? this.renderPosts(filteredPosts) : <div id='loading'></div>}
        </div>
      </div>
    );
  }
}

if (isNotIE()) {
  // proceed with preact components
  render(<Archive />, mainArchive, archive);
} else {
  // turn off flexbox
  document.querySelector('.archived-posts').style.display = 'block';
}

/**
 * Detect if the browser is any version of internet explorer
 */
function isNotIE() {
  var msie = parseInt((/msie (\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
  if (isNaN(msie)) {
    msie = parseInt((/trident\/.*; rv:(\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
  }
  return isNaN(msie);
}
