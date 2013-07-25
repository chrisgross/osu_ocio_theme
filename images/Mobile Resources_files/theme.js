(function($) {

  $(document).ready(function() {


    // Portfolio
    $container = $('#portfolio');
    $breaks = $container.width();

    // initialize Isotope

    $container.isotope({
      itemSelector : '.portfolio-item',
      layoutMode: 'fitRows'

    });

    $("#portfolio .portfolio-item .title-overlay").each(function(){
      $(this).dotdotdot();
    });

    // update columnWidth on window resize
    $(window).smartresize(function() {
      $breaks = $container.width();

      $container.isotope({
        layoutMode: 'fitRows'
      });
    });

    $('a[data-filter=".post-'+window.location.hash.substr(1)+'"]').click(); //clicks on element specified by hash

  });

  $("#portfolio .title-overlay").bind('mouseup', function() {
   window.location = $(this).attr('href');
  });

  $("#portfolio .portfolio-item").bind('click mouseenter', function() {
    $('.title-overlay', this).fadeIn(function(){
      $(this).css('pointer-events', 'auto');
    });
    $("#portfolio .portfolio-item .title-overlay").dotdotdot();
  });

  $("#portfolio .portfolio-item").bind('mouseleave', function() {
    //$('.title-overlay', this).fadeOut(function() {
      $(this).css('pointer-events', 'none');
    //});
  });



  $('#filters a').click(function() {
    var selector = $(this).attr('data-filter');
    $(this).parent().siblings().children('a').removeClass('selected');
    $(this).addClass('selected');
    $container.isotope({ filter: selector });
  });

  $('#filters-menu').click(function(e) {
    $(this).siblings('#filters').slideToggle();
  });

})(jQuery);
