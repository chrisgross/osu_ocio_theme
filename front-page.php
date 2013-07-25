<?php

// Exit if accessed directly
if ( !defined('ABSPATH')) exit;

/**
 * Home Page
 *
 * Note: You can overwrite home.php as well as any other Template in Child Theme.
 * Create the same file (name) include in /responsive-child-theme/ and you're all set to go!
 * @see            http://codex.wordpress.org/Child_Themes
 *
 * @file           home.php
 * @package        Responsive
 * @author         Emil Uzelac
 * @copyright      2003 - 2013 ThemeID
 * @license        license.txt
 * @version        Release: 1.0
 * @filesource     wp-content/themes/responsive/home.php
 * @link           http://codex.wordpress.org/Template_Hierarchy
 * @since          available since Release 1.0
 */

get_header();

$front = get_option('show_on_front');
//if ( !function_exists( 'dynamic_sidebar' ) || !is_active_sidebar('home-widget-1') && !is_active_sidebar('home-widget-2') && !is_active_sidebar('home-widget-3') ){
if ( $front == 'page' ){
  include (basename( get_page_template() ));
}
else {
  get_sidebar('home');
}

get_footer();

?>