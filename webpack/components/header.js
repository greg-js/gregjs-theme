import { h, render, Component } from 'preact';
import Nav from './nav';

const Header = ({ isMenuActive }) => (
  <header id='header'>
    <h1 class='blog-title'>
      <a href='/'>
        <span class="blog-title-greg">greg</span>
        <span class="blog-title-JS">JS</span>
      </a>
    </h1>
    <Nav isMenuActive={isMenuActive} />
  </header>
);

export default Header;
