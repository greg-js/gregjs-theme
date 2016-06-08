import { h, render, Component } from 'preact';
import ProjectsMenu from './projects-menu';

const Nav = ({ isMenuActive }) => (
  <nav class={(isMenuActive) ? 'nav active' : 'nav'}>
    <ul class='menu-top'>
      <li><a href='/' class='menu-item'>blog</a></li>
      <li class='menu-item'>
        <ProjectsMenu />
      </li>
      <li class='menu-item'><a href='/archives'>archives</a></li>
      <li class='menu-item'><a href='/rss.xml'>rss</a></li>
    </ul>
  </nav>
);

export default Nav;
