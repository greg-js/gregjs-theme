import { h, render, Component } from 'preact';
import ArchivedPost from './components/archived-post';

require('es6-promise').polyfill();
require('universal-fetch');

const main = document.querySelector('#main');
const archive = document.querySelector('.archive');

class Archive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      location: window.location.pathname
    };

    this.filterPosts = this.filterPosts.bind(this);
  }

  filterPosts(filterObj) {
    const filtered = this.state.posts.filter(post => {
      // tags
      if (post.tags.indexOf(filterObj.tag) !== -1) {
        return true;
      }
      // category
      for (let prop in post) {
        if (post.hasOwnProperty(prop)) {
          if (post[prop] === filterObj[prop]) {
            return true;
          }
        }
      }
    });

    this.setState({
      posts: filtered
    });
  }

  componentWillMount() {
    fetch('https://api.gregjs.com/posts').then(res => {
      return res.json();
    }).then(posts => {
      this.setState({
        posts
      });

      // filter category or tag based on location
      if (/categories/.test(this.state.location)) {
        const category = this.state.location.replace(/\/|categories/g, '');
        this.filterPosts({category});
      } else if (/tags/.test(this.state.location)) {
        const tag = this.state.location.replace(/\/|tags/g, '').replace(/\-/g, ' ');
        this.filterPosts({tag});
      }
    });
  }

  renderPosts(posts) {
    return posts.map(post => (
      <ArchivedPost postData={post} filterPosts={this.filterPosts} />
    ));
  }

  render() {

    return (
      <div class='main-archive'>
        {this.state.posts.length ? this.renderPosts(this.state.posts) : null}
      </div>
    );
  }
}

render(<Archive />, main, archive);
