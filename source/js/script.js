/* global jQuery */

'use strict';

(function runEverywhere($) {
  // Caption
  $('.entry-content').each(function addFancybox(i) {
    $(this).find('img').each(function wrapIt() {
      var alt = this.alt;

      if (($(this).parent().hasClass('fancybox'))) { return; }

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function forEachFancybox() {
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox) {
    $('.fancybox').fancybox();
  }

  // top nav
  $('.menu-top').on('mouseover', '.menu-item-submenu', function onHover(e) {
    var $sub = $(this).parent().find('.submenu');
    if ($sub.length) {
      e.preventDefault();
      $sub.addClass('active');
      $(this).parent().on('mouseleave', function onMouseLeave() {
        $sub.removeClass('active');
      });
    }
  });

  // Mobile nav
  $('.mobile-nav-panel').click(function onClick() {
    $('.nav').toggleClass('active');
  });

}(jQuery));
