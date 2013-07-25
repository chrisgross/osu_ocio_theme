(function($) {

  $(document).ready(function() {

    $('#responsive_current_menu_item').html('Menu');

    var slides = $('#featured img');

    if (slides.size() > 2) {
      slides.each(function() {
        var title = $(this).attr('title') ? $(this).attr('title') : $(this).parent().attr('href');
        $(this).after('<span class="featured-text"><strong>Featured:</strong> ' + title + '</span>');
      });
    }


    $('.collapseomatic').attr('href', '#').click(function(e){
      e.preventDefault();
    });

    // set up expandable content sections
    $( '.expand-content' ).hide();
    $( '.expand' ).children( 'h1, h2, h3, h4, h5, h6' ).wrapInner( '<a href="#" class="expand-closed"></a>' );
    $( '.expand' ).children( 'h1, h2, h3, h4, h5, h6' ).toggle( showExpandContent, hideExpandContent );

    $('.ep-vcal-link').addClass('font-awesome').prepend('<i class="icon-calendar" />');
  });



  function showExpandContent( e ) {
    e.preventDefault();

    $( this ).siblings( '.expand-content' ).animate({"height": "toggle", "opacity" : "toggle"}, "normal");
    $( this ).children( 'a' ).addClass( 'expand-open' );
    $( this ).children( 'a' ).removeClass( 'expand-closed' );

    $( this ).parent( '.expand' ).stop().animate( { backgroundColor: '#FFF' } );
  }

  function hideExpandContent( e ) {
     e.preventDefault();

    $( this ).siblings( '.expand-content' ).animate({"height": "toggle", "opacity" : "toggle"}, "normal");
    $( this ).children( 'a' ).addClass( 'expand-closed' );
    $( this ).children( 'a' ).removeClass( 'expand-open' );

    $( this ).parent( '.expand' ).stop().animate( { backgroundColor: '#D0DCDF' } );
  }


})(jQuery);

