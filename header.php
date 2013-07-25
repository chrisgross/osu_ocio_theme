<?php

// Exit if accessed directly
if ( !defined('ABSPATH')) exit;

/**
 * Header Template
 *
 *
 * @file           header.php
 * @package        Responsive
 * @author         Emil Uzelac
 * @copyright      2003 - 2013 ThemeID
 * @license        license.txt
 * @version        Release: 1.3
 * @filesource     wp-content/themes/responsive/header.php
 * @link           http://codex.wordpress.org/Theme_Development#Document_Head_.28header.php.29
 * @since          available since Release 1.0
 */
?>
<!doctype html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="<?php bloginfo('charset'); ?>" />
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">

<title><?php wp_title('&#124;', true, 'right'); ?></title>

<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

<?php wp_enqueue_style('responsive-style', get_stylesheet_uri(), false, '1.8.7');?>
<link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/osu_navbar/images/favicon.ico">
<link rel="apple-touch-icon" href="<?php echo get_stylesheet_directory_uri(); ?>/osu_navbar/images/apple-touch-icon.png">
<?php wp_head(); ?>
</head>
<?php
  $body_classes = 'no-js ';
  if(preg_match('/Win/',$_SERVER['HTTP_USER_AGENT'])) $body_classes .= 'win ';
?>
<!--[if !IE]>      <body <?php body_class($body_classes . "non-ie"); ?>>  <![endif]-->
<!--[if IE 7 ]>    <body <?php body_class($body_classes . "ie7"); ?>>  <![endif]-->
<!--[if IE 8 ]>    <body <?php body_class($body_classes . "ie8"); ?>>  <![endif]-->
<!--[if IE 9 ]>    <body <?php body_class($body_classes . "ie9"); ?>>  <![endif]-->
<!--[if gt IE 9]><!--> <body <?php body_class($body_classes); ?>> <!--<![endif]-->

<?php include('osu_navbar/index.html'); ?>

<?php responsive_container(); // before container hook ?>
<div id="container-header" class="hfeed">

    <?php responsive_header(); // before header hook ?>
    <div id="header">

        <?php if (has_nav_menu('top-menu', 'responsive')) { ?>
          <?php wp_nav_menu(array(
            'container'       => '',
          'fallback_cb'   =>  false,
          'menu_class'      => 'top-menu',
          'theme_location'  => 'top-menu')
          );
        ?>
        <?php } ?>

    <?php responsive_in_header(); // header hook ?>
<div class="wrapper">
  <?php if ( get_header_image() != '' ) : ?>

        <div id="logo">
            <a href="<?php echo home_url('/'); ?>"><img src="<?php header_image(); ?>" width="<?php if(function_exists('get_custom_header')) { echo get_custom_header() -> width;} else { echo HEADER_IMAGE_WIDTH;} ?>" height="<?php if(function_exists('get_custom_header')) { echo get_custom_header() -> height;} else { echo HEADER_IMAGE_HEIGHT;} ?>" alt="<?php bloginfo('name'); ?>" /></a>
        </div><!-- end of #logo -->

    <?php endif; // header image was removed ?>

    <?php if ( !get_header_image() ) : ?>

        <div id="logo">
            <span class="site-name"><a href="<?php echo home_url('/'); ?>" title="<?php echo esc_attr(get_bloginfo('name', 'display')); ?>" rel="home"><?php bloginfo('name'); ?></a></span>
            <span class="site-description"><?php bloginfo('description'); ?></span>
        </div><!-- end of #logo -->

    <?php endif; // header image was removed (again) ?>

    <?php get_sidebar('top'); ?>
        <?php wp_nav_menu(array(
            'container'       => 'div',
            'container_class' => 'main-nav',
            'fallback_cb'   =>  'responsive_fallback_menu',
            'theme_location'  => 'header-menu')
          );
        ?>

            <?php if (has_nav_menu('sub-header-menu', 'responsive')) { ?>
              <?php wp_nav_menu(array(
            'container'       => '',
          'menu_class'      => 'sub-header-menu',
          'theme_location'  => 'sub-header-menu')
          );
        ?>
            <?php } ?>
</div>
         <?php if (is_singular() ) : ?>
            <?php while (have_posts()) : the_post(); ?>
              <?php if( function_exists('get_field') && get_field('page_banner') ): ?>
                <?php $featured_image = '<div id="featured-single">' . wp_get_attachment_image(get_field('page_banner'), 'full')  . '</div>'; ?>
              <?php endif; ?>
            <?php endwhile; ?>
          <?php endif; ?>

         <?php $options = get_option('responsive_theme_options');
            // First let's check if image was set
            if (is_front_page() && !empty($options['featured_content'])) {
              $featured_image = trim(do_shortcode($options['featured_content']));
            }
            elseif (empty($featured_image) && function_exists( 'meteor_slideshow' )) {
              $featured_image = meteor_slideshow( "sitewide-banner", "" );
            }
          ?>


          <?php if (!empty($featured_image)) : ?>
            <div id="featured">
              <div id="featured-image" class="grid col-460 fit">
                <?php echo $featured_image; ?>
              </div>
            </div>
          <?php endif; ?>

        </div><!-- end of #header -->
    <?php responsive_header_end(); // after header hook ?>

  <?php responsive_wrapper(); // before wrapper ?>
</div>
<div id="container-content">
    <div class="wrapper clearfix">
    <?php responsive_in_wrapper(); // wrapper hook ?>