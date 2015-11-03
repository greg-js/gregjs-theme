(function($) {
  // Caption
  $('.entry-content').each(function(i) {
    $(this).find('img').each(function() {
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function() {
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox) {
    $('.fancybox').fancybox();
  }

  // Mobile nav

  $('.mobile-nav-panel').click(function() {
    $('.nav').toggleClass('active');
  });

  $('.gutter pre').each(function(i, e) {
    console.log(e.children.length);
    if (e.children.length == 2) {
      e.style.display = 'none';
    }
  });

})(jQuery);
