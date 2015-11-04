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

  $('.nav a').first().hover(function() {
    this.text = 'home';
  }, function() {
    this.text = '../';
  });

  $('.nav a:eq(1)').hover(function() {
    this.text = 'blog';
  }, function() {
    this.text = './';
  });

  // Mobile nav

  $('.mobile-nav-panel').click(function() {
    $('.nav').toggleClass('active');
  });

})(jQuery);
