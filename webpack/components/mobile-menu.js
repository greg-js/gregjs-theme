import { h, render, Component } from 'preact';

const MobileMenu = ({ toggleMenu }) => (
  <div
    class='mobile-nav-panel'
    onClick={() => toggleMenu() }
  >
    <i class='icon-reorder icon-large'></i>
  </div>
);

export default MobileMenu;
