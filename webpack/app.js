require('./polyfills');

const hamburgerMenu = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const submenuLinks = Array.from(document.querySelectorAll('.menu-item-submenu'));

hamburgerMenu.addEventListener('click', () => {
  const navClass = navMenu.className;
  navMenu.className = (/active/.test(navClass)) ? navClass.replace(/ active/, '') : `${navClass} active`;
});

submenuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const submenu = link.nextElementSibling;
    if (window.getComputedStyle(hamburgerMenu).getPropertyValue('display') == 'block') {
      const submenuClass = submenu.className;
      submenu.className = (/active/.test(submenuClass)) ? submenuClass.replace(/ active/, '') : `${submenuClass} active`;
    }
  });
});
