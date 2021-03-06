<?php

// Exit if accessed directly
if ( !defined('ABSPATH')) exit;


/**
 *
 * WARNING: Please do not edit this file in any way
 *
 * load the theme function files
 */
if (function_exists('register_sidebar')) {
    register_sidebar(array(
        'name' => 'Footer Left',
        'id'   => 'footer-left-widget',
        'description'   => 'Left Footer widget position.',
        'before_widget' => '<div id="%1$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h2>',
        'after_title'   => '</h2>'
    ));

    register_sidebar(array(
        'name' => 'Footer Right',
        'id'   => 'footer-right-widget',
        'description'   => 'Right Footer widget position.',
        'before_widget' => '<div id="%1$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h2>',
        'after_title'   => '</h2>'
    ));
  }

add_filter('body_class','my_class_names');

function my_class_names($classes) {
    if (!in_array('blog', $classes) && !in_array('page-template-full-width-page-php', $classes) && !in_array('error404', $classes)) {
      $classes[] = 'sidebar-layout';
    }

    if ( !is_front_page() ) {
      $classes[] = 'not-front';
    }
    // return the $classes array
    return $classes;
}

function is_blog () {
    global $post;
    $posttype = get_post_type($post );
    return ( ((is_archive()) || (is_author()) || (is_category()) || (is_home()) || (is_single()) || (is_tag())) && ( $posttype == 'post') ) ? true : false ;
}

function custom_wp_trim_excerpt($text) {
    $raw_excerpt = $text;
    if ( '' == $text ) {
        //Retrieve the post content.
        $text = get_the_content('');

        //Delete all shortcode tags from the content.
        $text = strip_shortcodes( $text );

        $text = apply_filters('the_content', $text);
        $text = str_replace(']]>', ']]&gt;', $text);

        /*
        $allowed_tags = ''; // MODIFY THIS. Add the allowed HTML tags separated by a comma.
        $text = strip_tags($text, $allowed_tags);
        */

        $excerpt_word_count = 55; /*** MODIFY THIS. change the excerpt word count to any integer you like.***/
        $excerpt_length = apply_filters('excerpt_length', $excerpt_word_count);

        $excerpt_end = '[...]'; /*** MODIFY THIS. change the excerpt endind to something else.***/
        $excerpt_more = apply_filters('excerpt_more', ' ' . $excerpt_end);

        $words = preg_split("/[\n\r\t ]+/", $text, $excerpt_length + 1, PREG_SPLIT_NO_EMPTY);
        if ( count($words) > $excerpt_length ) {
            array_pop($words);
            $text = implode(' ', $words);
            $text = $text . $excerpt_more;
        } else {
            $text = implode(' ', $words);
        }
    }
    return apply_filters('wp_trim_excerpt', force_balance_tags($text), $raw_excerpt);
    }

remove_filter('get_the_excerpt', 'wp_trim_excerpt');
add_filter('get_the_excerpt', 'custom_wp_trim_excerpt');

/**
 * Load webfonts from Google
 */

if ( !function_exists( 'osu_ocio_fonts' ) ) {
    function osu_ocio_fonts() {
        if ( !is_admin() ) {
            wp_register_style( 'osu_web_fonts', '//'.$_SERVER['SERVER_NAME'].'/fonts/webfonts.css', '', null, 'screen' );
            wp_enqueue_style( 'osu_web_fonts' );
        }
    }
}

add_action( 'init', 'osu_ocio_fonts', 10 );

function custom_scripts () {
    if( !is_admin()){
           wp_enqueue_script('jquery');
    }

    wp_register_script('custom_scripts', get_bloginfo('stylesheet_directory').'/js/scripts.js');
    wp_enqueue_script('custom_scripts');
    wp_enqueue_script( 'retina', get_stylesheet_directory_uri() . '/js/retina.js', array( 'jquery' ), false, true );

}

add_action('init', 'custom_scripts');


function osu_ocio_stylesheets() {
    wp_register_style( 'font-awesome', get_stylesheet_directory_uri() . '/font-awesome/css/font-awesome.min.css');
    wp_enqueue_style( 'font-awesome' );
    wp_register_style( 'font-awesome-social', get_stylesheet_directory_uri() . '/font-awesome/css/font-awesome-social.css');
    wp_enqueue_style( 'font-awesome-social' );
    wp_register_style( 'osu-navbar', get_stylesheet_directory_uri() . '/osu_navbar/css/osu_navbar-resp.css');
    wp_enqueue_style( 'osu-navbar' );
}

add_action( 'wp_enqueue_scripts', 'osu_ocio_stylesheets' );


function featuredtoRSS($content) {
    global $post;
    if ( has_post_thumbnail( $post->ID ) ){
        $content = '' . get_the_post_thumbnail( $post->ID, 'thumbnail', array( 'style' => 'float:left; margin:10px 15px px 0;' ) ) . '' . $content;
    }
    return $content;
    }

add_filter('the_excerpt_rss', 'featuredtoRSS');
add_filter('the_content_feed', 'featuredtoRSS');

/**
 *  Install Add-ons
 *
 *  The following code will include all 4 premium Add-Ons in your theme.
 *  Please do not attempt to include a file which does not exist. This will produce an error.
 *
 *  All fields must be included during the 'acf/register_fields' action.
 *  Other types of Add-ons (like the options page) can be included outside of this action.
 *
 *  The following code assumes you have a folder 'add-ons' inside your theme.
 *
 *  IMPORTANT
 *  Add-ons may be included in a premium theme as outlined in the terms and conditions.
 *  However, they are NOT to be included in a premium / free plugin.
 *  For more information, please read http://www.advancedcustomfields.com/terms-conditions/
 */

/**
 *  Register Field Groups
 *
 *  The register_field_group function accepts 1 array which holds the relevant data to register a field group
 *  You may edit the array as you see fit. However, this may result in errors if the array is not compatible with ACF
 */


if(function_exists("register_field_group"))
{
    register_field_group(array (
        'id' => 'acf_page-banner',
        'title' => 'Page Banner',
        'fields' => array (
            array (
                'key' => 'field_51ae3001c7385',
                'label' => 'Page Banner',
                'name' => 'page_banner',
                'type' => 'image',
                'save_format' => 'id',
                'preview_size' => 'full',
            ),
        ),
        'location' => array (
            array (
                array (
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'post',
                    'order_no' => 0,
                    'group_no' => 0,
                ),
            ),
            array (
                array (
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'page',
                    'order_no' => 0,
                    'group_no' => 1,
                ),
            ),
        ),
        'options' => array (
            'position' => 'normal',
            'layout' => 'no_box',
            'hide_on_screen' => array (
            ),
        ),
        'menu_order' => 0,
    ));
}

/**
 * Hide ACF menu item from the admin menu
 */

function hide_admin_menu()
{
    global $current_user;
    get_currentuserinfo();

    if($current_user->user_login != 'admin')
    {
        echo '<style type="text/css">#toplevel_page_edit-post_type-acf{display:none;}</style>';
    }
}

add_action('admin_head', 'hide_admin_menu');


?>
