import { h, render, Component } from 'preact';
import Nav from './nav';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmenuOpen: false
    };

    this.onClickProjects = this.onClickProjects.bind(this);
  }

  onClickProjects() {
    this.setState({
      isSubmenuOpen: !this.state.isSubmenuOpen
    });
  }

  renderSubmenu(items) {
    return items.map(item => {
      return <a href={item.url} class='submenu-item'><li>{item.title}</li></a>
    });
  }

  render() {
    const projectLinks = [
      {
        title: 'arch-wiki-man',
        url: 'https://github.com/greg-js/arch-wiki-man'
      },
      {
        title: 'hexo-cli-extras',
        url: 'https://github.com/greg-js/hexo-cli-extras'
      },
      {
        title: 'arch-wiki-md-repo',
        url: 'https://github.com/greg-js/arch-wiki-md-repo'
      },
      {
        title: 'offline-arch-wiki',
        url: 'https://github.com/greg-js/offline-arch-wiki'
      },
      {
        title: 'wdn',
        url: 'https://github.com/greg-js/wdn'
      },
      {
        title: 'markdown2troff',
        url: 'https://github.com/greg-js/markdown2troff'
      }
    ];

    return (
      <div onClick={ () => this.onClickProjects() }>
        <a href='' class='menu-item-submenu'>projects</a>
        <ul class={ (this.state.isSubmenuOpen) ? 'submenu active' : 'submenu' }>
          {this.renderSubmenu(projectLinks)}
        </ul>
      </div>
    );
  }
}

export default Header;
