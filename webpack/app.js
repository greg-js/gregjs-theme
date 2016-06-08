import { h, render, Component } from 'preact';
import MobileMenu from './components/mobile-menu';
import Header from './components/header';

const container = document.querySelector('#container');
const containerTop = document.querySelector('#container-top');

class ContainerTop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuActive: false
    };

    this.toggleMenuClass = this.toggleMenuClass.bind(this);
  }

  toggleMenuClass() {
    this.setState({
      isMenuActive: !this.state.isMenuActive
    });
  }

  render() {
    return (
      <div id='container-top'>
        <MobileMenu toggleMenu={this.toggleMenuClass} />
        <Header isMenuActive={this.state.isMenuActive} />
      </div>
    );
  }
}

render(<ContainerTop />, container, containerTop);
