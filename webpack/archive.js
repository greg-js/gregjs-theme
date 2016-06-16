import { h, render, Component } from 'preact';
import ArchivedPost from './components/archived-post';

require('es6-promise').polyfill();
require('universal-fetch');

const mainArchive = document.querySelector('#main-archive');
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
    fetch('https://api.gregjs.com/posts/everything').then(res => {
      return res.json();
    }).then(json => {
      this.setState({
        posts: json.posts,
        categories: json.categories,
        tags: json.tags
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
      <div class='archive'>
        <p>
          <em>I'm currently working on this, apologies for the somewhat wonky functionality right now. Expect an update by June 16/17.</em>
        </p>
        {this.state.posts.length ? this.renderPosts(this.state.posts) : <div id='loading'></div>}
      </div>
    );
  }
}

render(<Archive />, mainArchive, archive);
