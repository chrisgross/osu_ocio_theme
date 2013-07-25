/**
 *	@name jump-calendar.js
 *	@desc
 *		JavaScript for jump calendar functionality
 *
 *	@author Joe Bondra
 */

jQuery.noConflict();

jQuery( document ).ready( init );

function init() {
	jQuery( '.ep-calendar-prev-next .ep-prev, .ep-calendar-prev-next .ep-next' ).click( jumpCalendarUpdateAjax ).attr( 'href', '#' );
	jQuery( '.event-posts-calendar.view-jump .ep-calendar' ).children( 'div:visible' ).addClass( 'ep-jump-view-current' );
	jQuery( '.event-posts-calendar.view-jump .ep-calendar-controls input[type="submit"]' ).click( jumpCalendarFormUpdateAjax );
	jQuery( '.ep-calendar-day-num a' ).click(
		function( e ) {
			e.preventDefault();
		}
	);
	jQuery( '.ep-size-small .ep-calendar-day' ).live( 'click', showDaysEvents );
	jQuery( '.ep-detail-close-link' ).live( 'click', closeDayDetail );

	var day_detail_markup = '<div class="ep-day-detail"></div>';
	jQuery( '.event-posts-calendar.view-grid, .ep-jump-calendar.view-grid' ).prepend( day_detail_markup );
	jQuery( '.ep-day-detail' ).css( 'position', 'absolute' ).hide();

	jQuery( '.ep-size-full .ep-calendar-day' ).live( 'mouseover', showZoomIcon );
	jQuery( '.ep-size-full .ep-calendar-day' ).live( 'mouseout', hideZoomIcon );

	jQuery( '.ep-size-full .ep-calendar-day' ).live( 'click', zoomDaysEvents );
}

function jumpCalendarUpdateAjax( e ) {
	e.preventDefault();

	var link_id = jQuery( this ).attr( 'id' ); // used to determine if a prev or next link was clicked; id also contains relevant information

	var link_info = link_id.split( '_' );
	var id = link_info[0];
	link_info = link_info[1].split( '-' );
	var direction = link_info[0];
	var update_year = link_info[1];
	var update_month = link_info[2];

	var nonce = jQuery( '#' + id + '-jump-calendar-update-nonce' ).val();

	var prev_next_selector = '#' + id + ' .ep-prev, #' + id + ' .ep-next';
	jQuery( prev_next_selector ).unbind( 'click' );
	jQuery( prev_next_selector ).click(
		function( e ) {
			e.preventDefault();
		}
	);

	var prev_next_div = jQuery( this ).parent( '.ep-calendar-prev-next' );

	var calendar_container = jQuery( this ).parents( '.event-posts-calendar.view-jump' );
	var calendar = calendar_container.children( '.ep-jump-calendar' );

	// harvest calendar info (stored in id)
	var calendar_info = calendar.attr( 'id' );
	calendar_info = calendar_info.split( '_' );
	// id in calendar_info[0] is unneeded (taken from link_info above)
	var atts = calendar_info[1];
	atts = atts.split( '-' );
	var start_year = atts[0];
	var start_month = atts[1];
	var end_year = atts[2];
	var end_month = atts[3];
	var number_of_months = atts[4];
	var display = atts[5];
	var size = atts[6];

	// generate ids for needed months to check if they've already been loaded
	var ids = new Array();
	var m = +update_month; // use unary '+' to convert from string to numerical value
	var y = +update_year;
	var i = 1;
	ids[0] = id + '_' + y + '-' + m;
	while( i < number_of_months ) {
		m += 1;
		if( m > 12 ) {
			y = y + 1;
			m = 1;
		}
		ids[i] = id + '_' + y + '-' + m;
		i++;
	}

	// determine which of requested months are already in DOM and which need to be requested
	var id_elements_found = new Array();
	var id_elements_needed = new Array();
	jQuery.each(
		ids,
		function( index, value ) {
			var id_selector = '#' + value;
			var element_exists = jQuery( id_selector ).length;
			if( element_exists ) {
				id_elements_found.push( id_selector );
			}
			else {
				id_elements_needed.push( id_selector );
			}
		}
	);

	// generate new ids for prev/next links based on updated month/year
	// find new prev month/year
    // make sure new prev month is number of months back
    var month_difference = +update_month - +number_of_months;
    var prev_month = -1;
    var prev_year = -1;
    if( month_difference < 0 ) {
      // need to subtract month difference from 12 for month number ( but must whiddle down the difference by factors of 12 to get a positive number greater than 0 )
      prev_month = ( 12 + ( 12 * Math.floor( Math.abs( month_difference ) / 12 ) ) ) + +month_difference;
    }
    else {
      prev_month = month_difference;
    }

    if( prev_month == 0 ) {
      // in either above case, if we end up at 0, it will be December
      prev_month = 12;
    }

    if( month_difference <= 0 ) {
      // the year has counted back at least once, plus however many extra years
      prev_year = +update_year - 1 + ( Math.floor( Math.abs( +month_difference ) / 12 ) );
    }
    else {
      // the year has not changed
      prev_year = update_year;
    }

	// find new next month/year
    // end month is last needed month
    var last_id_index = ids.length - 1;
    var last_id = ids[last_id_index];
    var next_end_month_year = last_id.split( '_' )[1].split( '-' );
    var next_end_year = next_end_month_year[0];
    var next_end_month = next_end_month_year[1];

    // next year should be next "set of months" determined by number of months displayed
    var next_year = ( next_end_month == 12 ) ? +next_end_year + 1: next_end_year;
    var next_month = ( next_end_month == 12 ) ? 1 : +next_end_month + 1;

	// prepare to hide all currently visible elements
	jQuery( '#' + id + ' .ep-jump-calendar div').removeClass( 'ep-jump-view-current' );

	// prepare to show all elements currently present
	jQuery.each(
		id_elements_found,
		function( index, value ) {
			jQuery( value ).addClass( 'ep-jump-view-current' );
		}
	);

	if( id_elements_needed.length ) {
		// get months not yet in calendar
		// use AJAX call to get needed months
		var data = {
			action: 'jump_calendar_update',
			'event-posts' :
			{
				'jump-calendar-update':
				{
					'id': id,
					'nonce': nonce,
					'display': display,
					'direction': direction,
					'start-year': start_year,
					'start-month': start_month,
					'end-year': end_year,
					'end-month': end_month,
					'number-of-months': number_of_months,
					'size': size,
					'id-elements-needed': id_elements_needed
				}
			}
		};

		// tack in loading animation
		jQuery( prev_next_div ).append( '<span class="ep-loading">Loading...</span>' );

		// only post if calendar months needed aren't already in the DOM (otherwise just make them visible)
		var jqXHR = jQuery.ajax({
			type: 'POST',
			url: EventPosts.ajaxurl,
			data: data,
			dataType: "xml",
			success: jumpCalendarUpdate,
			complete:
				function() {
					// hide all months
					jQuery( '#' + id + ' .ep-jump-calendar' ).children( 'div' ).hide();
					// show current months
					jQuery( '#' + id + ' .ep-jump-calendar .ep-jump-view-current' ).show();

					jQuery( prev_next_div ).find( '.ep-loading' ).remove();

					// update id of calendar div to reflect changed state
					var updated_calendar_id = id + '_' + update_year + '-' + update_month + '-' + next_end_year + '-' + next_end_month + '-' + number_of_months + '-' + display + '-' + size;
					jQuery( '#' + id + ' .ep-jump-calendar' ).attr( 'id', updated_calendar_id );

					// update ids of prev/next calendar links
					var updated_prev_id = id + '_prev-' + prev_year + '-' + prev_month;
					var updated_next_id = id + '_next-' + next_year + '-' + next_month;
					jQuery( '#' + id + ' .ep-prev' ).attr( 'id', updated_prev_id );
					jQuery( '#' + id + ' .ep-next' ).attr( 'id', updated_next_id );

					// updated dropdown menus
					if( update_month < 10 ) {
						jQuery( '#' + id + ' .ep-sm-select' ).val( '0' + update_month );
					}
					else {
						jQuery( '#' + id + ' .ep-sm-select' ).val( update_month );
					}
					updateYearDropdown( id, update_year, false );

					jQuery( prev_next_selector ).click( jumpCalendarUpdateAjax );
				}
		});
	}
	else {
		// hide all months
		jQuery( '#' + id + ' .ep-jump-calendar' ).children( 'div' ).hide();
		// show currently displayed months
		jQuery( '#' + id + ' .ep-jump-calendar .ep-jump-view-current' ).show();

		// remove loading animation
		jQuery( this ).parent( '.ep-calendar-prev-next' ).remove( 'span.ep-loading' );

		// update id of calendar div to reflect changed state
		var updated_calendar_id = id + '_' + update_year + '-' + update_month + '-' + next_end_year + '-' + next_end_month + '-' + number_of_months + '-' + display + '-' + size;
		jQuery( '#' + id + ' .ep-jump-calendar' ).attr( 'id', updated_calendar_id );

		// update ids of prev/next calendar links
		var updated_prev_id = id + '_prev-' + prev_year + '-' + prev_month;
		var updated_next_id = id + '_next-' + next_year + '-' + next_month;
		jQuery( '#' + id + ' .ep-prev' ).attr( 'id', updated_prev_id );
		jQuery( '#' + id + ' .ep-next' ).attr( 'id', updated_next_id );

		// updated dropdown menus
		if( update_month < 10 ) {
			jQuery( '#' + id + ' .ep-sm-select' ).val( '0' + update_month );
		}
		else {
			jQuery( '#' + id + ' .ep-sm-select' ).val( update_month );
		}
		updateYearDropdown( id, update_year, false );

		jQuery( prev_next_selector ).click( jumpCalendarUpdateAjax );
	}
	/*
	 * due to the asynchronous nature of the AJAX call, it seems
	 * I need to duplicate some of the above code... It looks weird, but at
	 * the moment, I'm at a loss as to how to keep the links unclickable
	 * until the behaviour completes while making sure I'm not bugging
	 * the server when the necessary divs already exist in the DOM
	 * (Otherwise I get multiple sets of months showing up, etc.)
	 */
}

function jumpCalendarUpdate( response ) {
  var xml = jQuery( response );

	var id = xml.find( 'id' ).text();
	var direction = xml.find( 'direction' ).text();
	var start_month = xml.find( 'start_month' ).text();
	var start_year = xml.find( 'start_year' ).text();
	var end_month = xml.find( 'end_month' ).text();
	var end_year = xml.find( 'end_year' ).text();

	// add new months to calendar (in proper order)
	var calendar_markup = xml.find( 'calendar_markup' ).text();

	if( direction == 'prev' ) {
		var current_id = id + '_' + start_year + '-' + start_month;
		jQuery( '#' + current_id ).before( calendar_markup );
	}
	else if( direction == 'next' ) {
		var current_id = id + '_' + end_year + '-' + end_month;
		jQuery( '#' + current_id ).after( calendar_markup );
	}

}

function jumpCalendarFormUpdateAjax( e ) {
	e.preventDefault();

	var calendar_id = jQuery( this ).parent( 'form' ).parent( '.ep-calendar-controls' ).siblings( '.ep-jump-calendar' ).attr( 'id' );
	calendar_info = calendar_id.split( '_' );
	var id = calendar_info[0];
	var atts = calendar_info[1];
	atts = atts.split( '-' );
	var start_year = atts[0];
	var start_month = atts[1];
	var end_year = atts[2];
	var end_month = atts[3];
	var number_of_months = atts[4];
	var display = atts[5];
	var size = atts[6];

	var nonce = jQuery( '#' + id + '-jump-calendar-update-nonce' ).val();

	// can't let user click on prev/next links until this action is completed
	var prev_next_selector = '#' + id + ' .ep-prev, #' + id + ' .ep-next';
	jQuery( prev_next_selector ).unbind( 'click' );
	jQuery( prev_next_selector ).click(
		function( e ) {
			e.preventDefault();
		}
	);

	// month dropdown in 0 padded; cast as int using unary operator
	var selected_month = +jQuery( this ).siblings( '.ep-sm-select' ).val();
	var selected_year = jQuery( this ).siblings( '.ep-sy-select' ).val();

	// generate ids for needed months to check if they've already been loaded
	var ids = new Array();
	var m = +selected_month; // use unary '+' to convert from string to numerical value
	var y = +selected_year;
	var i = 1;
	ids[0] = id + '_' + y + '-' + m;
	while( i < number_of_months ) {
		m += 1;
		if( m > 12 ) {
			y = y + 1;
			m = 1;
		}
		ids[i] = id + '_' + y + '-' + m;
		i++;
	}

	var id_elements_found = new Array();
	var id_elements_needed = new Array();
	jQuery.each(
		ids,
		function( index, value ) {
			var id_selector = '#' + value;
			var element_exists = jQuery( id_selector ).length;
			if( element_exists ) {
				id_elements_found.push( id_selector );
			}
			else {
				id_elements_needed.push( id_selector );
			}
		}
	);

	// generate new ids for prev/next links based on updated month/year
	// find new prev month/year
    // make sure new prev month is number of months back
    var month_difference = +selected_month - +number_of_months;
    var prev_month = -1;
    var prev_year = -1;
    if( month_difference < 0 ) {
      // need to subtract month difference from 12 for month number ( but must whiddle down the difference by factors of 12 to get a positive number greater than 0 )
      prev_month = ( 12 + ( 12 * Math.floor( Math.abs( month_difference ) / 12 ) ) ) + +month_difference;
    }
    else {
      prev_month = month_difference;
    }

    if( prev_month == 0 ) {
      // in either above case, if we end up at 0, it will be December
      prev_month = 12;
    }

    if( month_difference <= 0 ) {
      // the year has counted back at least once, plus however many extra years
      prev_year = +selected_year - 1 + ( Math.floor( Math.abs( +month_difference ) / 12 ) );
    }
    else {
      // the year has not changed
      prev_year = selected_year;
    }

	// find new next month/year
    // end month is last needed month
    var last_id_index = ids.length - 1;
    var last_id = ids[last_id_index];
    var next_end_month_year = last_id.split( '_' )[1].split( '-' );
    var next_end_year = next_end_month_year[0];
    var next_end_month = next_end_month_year[1];

    // next year should be next "set of months" determined by number of months displayed
    var next_year = ( next_end_month == 12 ) ? +next_end_year + 1: next_end_year;
    var next_month = ( next_end_month == 12 ) ? 1 : +next_end_month + 1;

	// prepare to hide all currently visible elements
	jQuery( '#' + id + ' .ep-jump-calendar div').removeClass( 'ep-jump-view-current' );

	// prepare to show all elements currently present
	jQuery.each(
		id_elements_found,
		function( index, value ) {
			jQuery( value ).addClass( 'ep-jump-view-current' );
		}
	);

	if( id_elements_needed.length ) {
		var data = {
			action: 'jump_calendar_update',
			'event-posts' :
			{
				'jump-calendar-update':
				{
					'id': id,
					'nonce': nonce,
					'display': display,
					'start-year': start_year,
					'start-month': start_month,
					'end-year': end_year,
					'end-month': end_month,
					'number-of-months': number_of_months,
					'size': size,
					'id-elements-needed': id_elements_needed
				}
			}
		};

		// only post if calendar months needed aren't already in the DOM (otherwise just make them visible)
		var jqXHR = jQuery.ajax({
			type: 'POST',
			url: EventPosts.ajaxurl,
			data: data,
			dataType: "xml",
			success: jumpCalendarFormUpdate,
			complete:
				function() {
					// show current months
					jQuery( '#' + id + ' .ep-jump-calendar .ep-jump-view-current' ).show();

					// update id of calendar div to reflect changed state
					var updated_calendar_id = id + '_' + selected_year + '-' + selected_month + '-' + next_end_year + '-' + next_end_month + '-' + number_of_months + '-' + display + '-' + size;
					jQuery( '#' + id + ' .ep-jump-calendar' ).attr( 'id', updated_calendar_id );

					// update ids of prev/next calendar links
					var updated_prev_id = id + '_prev-' + prev_year + '-' + prev_month;
					var updated_next_id = id + '_next-' + next_year + '-' + next_month;
					jQuery( '#' + id + ' .ep-prev' ).attr( 'id', updated_prev_id );
					jQuery( '#' + id + ' .ep-next' ).attr( 'id', updated_next_id );

					// updated dropdown menus
					if( selected_month < 10 ) {
						jQuery( '#' + id + ' .ep-sm-select' ).val( '0' + selected_month );
					}
					else {
						jQuery( '#' + id + ' .ep-sm-select' ).val( selected_month );
					}
					updateYearDropdown( id, selected_year, false );

					jQuery( prev_next_selector ).click( jumpCalendarUpdateAjax );
				}
		});
	}
	else {
		// hide all months
		jQuery( '#' + id + ' .ep-jump-calendar' ).children( 'div' ).hide();
		// show currently displayed months
		jQuery( '#' + id + ' .ep-jump-calendar .ep-jump-view-current' ).show();

		// update id of calendar div to reflect changed state
		var updated_calendar_id = id + '_' + selected_year + '-' + selected_month + '-' + next_end_year + '-' + next_end_month + '-' + number_of_months + '-' + display + '-' + size;
		jQuery( '#' + id + ' .ep-jump-calendar' ).attr( 'id', updated_calendar_id );

		// update ids of prev/next calendar links
		var updated_prev_id = id + '_prev-' + prev_year + '-' + prev_month;
		var updated_next_id = id + '_next-' + next_year + '-' + next_month;
		jQuery( '#' + id + ' .ep-prev' ).attr( 'id', updated_prev_id );
		jQuery( '#' + id + ' .ep-next' ).attr( 'id', updated_next_id );

		// updated dropdown menus
		if( selected_month < 10 ) {
			jQuery( '#' + id + ' .ep-sm-select' ).val( '0' + selected_month );
		}
		else {
			jQuery( '#' + id + ' .ep-sm-select' ).val( selected_month );
		}
		updateYearDropdown( id, selected_year, false );

		jQuery( prev_next_selector ).click( jumpCalendarUpdateAjax );
	}

}

function jumpCalendarFormUpdate( response ) {
	var xml = jQuery( response );

	var id = xml.find( 'id' ).text();

	var calendar = jQuery( '#' + id + ' .ep-jump-calendar' );

	// hide all months
	calendar.children( 'div' ).hide();

	var start_month = xml.find( 'start_month' ).text();
	var start_year = xml.find( 'start_year' ).text();
	var end_month = xml.find( 'end_month' ).text();
	var end_year = xml.find( 'end_year' ).text();

	// add new months to calendar (in proper order)
	var calendar_markup = xml.find( 'calendar_markup' ).text();

	// dump the new months in
	calendar.append( calendar_markup );

	// created a sorted array of the elements
	var months = calendar.children( '.ep-calendar-month' ).toArray();
	var day_detail = calendar.children( '.ep-day-detail' );

	months.sort(
		function( a, b ) {
			var a_info = a.id.split( '_' )[1].split( '-' );
			var a_y = +a_info[0];
			var a_m = +a_info[1];

			var b_info = b.id.split( '_' )[1].split( '-' );
			var b_y = +b_info[0];
			var b_m = +b_info[1];

			if( a_y == b_y ) {
				if( a_m == b_m ) {
					return 0;
				}
				else if( a_m < b_m ) {
					return -1;
				}
				else if( a_m > b_m ) {
					return 1;
				}
			}
			else if( a_y < b_y ) {
				return -1;
			}
			else if( a_y > b_y ) {
				return 1;
			}

		}
	);

	// dump out the old calendar
	calendar.empty();

	calendar.append( day_detail );

	// add in the new sorted calendar
	jQuery.each(
		months,
		function( index, value ) {
			calendar.append( value );
		}
	);


}

function updateYearDropdown ( id, selected_year, year_span ) {
  var markup = '';

  if( !selected_year ) {
	var d = new Date();
    selected_year = d.getFullYear();
  }

  if( !year_span ) {
	year_span = 5;
  }

  var year_counter = selected_year - year_span;
  var total_years = year_span * 2;

  for( var i = 0; i <= total_years; i++ ) {
    if( year_counter == selected_year ) {
      markup += '<option value=\"' + year_counter + '\" selected=\"selected\">' + year_counter + '</option>';
    }
    else {
      markup += '<option value=\"' + year_counter + '\">' + year_counter + '</option>';
    }

    year_counter++;
  }

  jQuery( '#' + id + ' .ep-sy-select' ).empty();
  jQuery( '#' + id + ' .ep-sy-select' ).append( markup );
  jQuery( '#' + id + ' .ep-sy-select' ).val( selected_year );


}

function showDaysEvents( e ) {
	e.preventDefault();

	var has_events = jQuery( this ).find( '.ep-calendar-day-num a' ).length;

	if( has_events ) {
		var day = jQuery( this );

		var calendar = day.parents( '.ep-jump-calendar.view-grid' );
		var day_detail = calendar.children( '.ep-day-detail' );

		calendar.find( '.ep-calendar-day' ).css({
			'z-index' : 'auto',
			'border' : 'none'
		});

		var day_td = day.parent( 'td' );
		var day_td_width = day_td.width();
		var day_td_height = day_td.height();
		var day_td_pos = day_td.position();

		var cal_table = day.parents( '.ep-calendar-month' );
		var cal_pos = cal_table.position();

		var content = day.html();

		var caption = day.parents( 'tbody' ).siblings( 'caption' ).text();
		var caption_parts = caption.split( ' ' );
		var month = caption_parts[0];
		var year = caption_parts[1];
		var day_num = day.find( '.ep-calendar-day-num a' ).text();

		var date_markup = '<div class="ep-calendar-day-date">' + month + ' ' + day_num + ', ' + year + '</div>';
		var close_link = '<a class="ep-detail-close-link" href="#">[x]close</a>';

		day_detail.empty();
		day_detail.append( close_link );
		day_detail.append( date_markup );
		day_detail.append( content );
		day_detail.find( '.ep-calendar-day-num' ).remove();

		var day_detail_z = day_detail.css( 'z-index' );
		var day_detail_border_color = day_detail.css( 'border-top-color' );
		var day_detail_border_width = day_detail.css( 'border-top-width' );
		var day_detail_border_style = day_detail.css( 'border-top-style' );

		day_detail.children( '*' ).show();
		day_detail.css({
			'width': day_td_width * 6.9,
			'top': cal_pos.top + day_td_pos.top + day_td_height - 3,
			'left': cal_pos.left

		});

		day.css({
			'z-index' : day_detail_z + 1,
			'border-top-color' : day_detail_border_color,
			'border-top-width' : day_detail_border_width,
			'border-top-style' : day_detail_border_style,
			'border-left-color' : day_detail_border_color,
			'border-left-width' : day_detail_border_width,
			'border-left-style' : day_detail_border_style,
			'border-right-color' : day_detail_border_color,
			'border-right-width' : day_detail_border_width,
			'border-right-style' : day_detail_border_style
		});

		day_detail.fadeIn();
	}

}

function closeDayDetail( e ) {
	e.preventDefault();

	var close_link = jQuery( this );
	var day_detail = close_link.parent( '.ep-day-detail' );
	var calendar = day_detail.parent( '.view-grid' );

	day_detail.fadeOut();
	calendar.find( '.ep-calendar-day' ).css({
		'z-index' : 'auto',
		'border' : 'none'
	});

	if( jQuery.support.opacity ) {
		calendar.find( '.ep-calendar-month' ).css({
			'opacity' : '1.0'
		});
	}

}

function showZoomIcon( e ) {
	var day = jQuery( this );
	var has_events = day.find( '.ep-calendar-day-item a' ).length;

	if( has_events ) {
		day.addClass( 'ep-day-zoom-hover' );
	}
}

function hideZoomIcon( e ) {
	var day = jQuery( this );

	day.removeClass( 'ep-day-zoom-hover' );
}

function zoomDaysEvents( e ) {
	var day = jQuery( this );
	var day_detail = day.parents( '.view-grid' ).children( '.ep-day-detail' );

	var has_events = day.find( '.ep-calendar-day-item a' ).length;

	if( has_events ) {
		var caption = day.parents( 'tbody' ).siblings( 'caption' ).text();
		var caption_parts = caption.split( ' ' );
		var month = caption_parts[0];
		var year = caption_parts[1];
		var day_num = day.find( '.ep-calendar-day-num a' ).text();

		var date_markup = '<div class="ep-calendar-day-date">' + month + ' ' + day_num + ', ' + year + '</div>';
		var close_link = '<a class="ep-detail-close-link" href="#">[x]close</a>';

		var content = day.html();
		day_detail.empty();
		day_detail.append( close_link );
		day_detail.append( date_markup );
		day_detail.append( content );
		day_detail.find( '.ep-calendar-day-num' ).remove();

		var month_container = day.parents( '.ep-calendar-month' );
		var month = day.parents( 'tbody' );
		var month_pos = month.position();
		var month_top = month_pos.top;
		var month_left = month_pos.left;
		var month_height = month.height();
		var month_width = month.width();

		var day_height = day.height();
		var day_width = day.width();

		day_detail.css({
			'width': month_width / 1.5,
			'top': month_top + day_height * 1.75,
			'left': month_left + day_width * 1.5

		});

		if( jQuery.support.opacity ) {
			day.parents( '.event-posts-calendar.view-jump' ).find( '.ep-calendar-size-full' ).css({
				'opacity' : '1.0'
			});
			month_container.css({
				'opacity' : '0.5'
			});
		}

		day_detail.fadeIn();
	}
}
