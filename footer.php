<?php

// Exit if accessed directly
if ( !defined('ABSPATH')) exit;

/**
 * Footer Template
 *
 *
 * @file           footer.php
 * @package        Responsive
 * @author         Emil Uzelac
 * @copyright      2003 - 2013 ThemeID
 * @license        license.txt
 * @version        Release: 1.2
 * @filesource     wp-content/themes/responsive/footer.php
 * @link           http://codex.wordpress.org/Theme_Development#Footer_.28footer.php.29
 * @since          available since Release 1.0
 */
?>
    </div><!-- end of #wrapper -->
    <?php responsive_wrapper_end(); // after wrapper hook ?>
</div><!-- end of #container -->
<?php responsive_container_end(); // after container hook ?>

<div id="footer" class="clearfix">

    <div id="footer-wrapper">


         <?php get_sidebar('colophon'); ?>
        <?php $theme_dir = get_stylesheet_directory_uri(); ?>

        <div class="grid footer-left">
            <?php if ( !function_exists( 'dynamic_sidebar' ) || !dynamic_sidebar('footer-left-widget') ) ?>
            <ul id="social-icons">
              <li><a href="https://twitter.com/#!/TechOhioState" target="_blank" class='social-icon social-icon-twitter'><img src="<?php echo $theme_dir; ?>/images/icon-twitter.png"/></a></li>
              <li><a href="https://plus.google.com/108267101328574178433/posts" target="_blank" class='social-icon social-icon-google-plus'><img src="<?php echo $theme_dir; ?>/images/icon-google-plus.png"/></a></li>
              <li><a href="http://www.linkedin.com/groups/Tech-Ohio-State-Office-Chief-4956310" target="_blank" class='social-icon social-icon-linkedin'><img src="<?php echo $theme_dir; ?>/images/icon-linkedin.png"/></a></li>
              <li><a href="http://www.youtube.com/techohiostate" target="_blank" class='social-icon social-icon-youtube'><img src="<?php echo $theme_dir; ?>/images/icon-youtube.png"/></a></li>
              <li><a href="http://ocio.osu.edu/blog/community/feed/" target="_blank" class='social-icon social-icon-rss'><img src="<?php echo $theme_dir; ?>/images/icon-rss.png"/></a></li>
            </ul>
        </div><!-- end of .copyright -->

        <div class="grid footer-right">
            <?php if ( !function_exists( 'dynamic_sidebar' ) || !dynamic_sidebar('footer-right-widget') ) ?>
            <div id="footer-text">
                <a href="http://ocio.osu.edu" title="Office of the CIO"><img id="footer-logo" src="<?php echo $theme_dir; ?>/images/osu-footer.png" alt="Office of the CIO"/></a>
                <p class="secondary-signature">Office of the Chief Information Officer</p>
                <p>Contact: <a href="http://ocio.osu.edu/help/" target="_blank">IT Service Desk</a> | <a href="http://ocio.osu.edu/help/locations/">Locations</a><span class="mobile-hidden"> | </span><span class="mobile-block">Phone: <a href="tel:614-688-4357">614-688-HELP (4357)</a></span><span class="mobile-block"><span class="mobile-hidden"> | </span>TDD: 614-688-8743</span></p>
            <p>If you have trouble accessing this page and need to request an alternate format, contact <a href="mailto:8help@osu.edu">8help@osu.edu</a>.</p>
            </div>

             <?php $options = get_option('responsive_theme_options');

                // First let's check if any of this was set
/*
                    echo '<ul class="social-icons">';

                    if (!empty($options['twitter_uid'])) echo '<li class="twitter-icon"><a href="' . $options['twitter_uid'] . '">'
                        .'<img src="' . get_stylesheet_directory_uri() . '/icons/twitter-icon.png" width="24" height="24" alt="Twitter">'
                        .'</a></li>';

                    if (!empty($options['facebook_uid'])) echo '<li class="facebook-icon"><a href="' . $options['facebook_uid'] . '">'
                        .'<img src="' . get_stylesheet_directory_uri() . '/icons/facebook-icon.png" width="24" height="24" alt="Facebook">'
                        .'</a></li>';

                    if (!empty($options['linkedin_uid'])) echo '<li class="linkedin-icon"><a href="' . $options['linkedin_uid'] . '">'
                        .'<img src="' . get_stylesheet_directory_uri() . '/icons/linkedin-icon.png" width="24" height="24" alt="LinkedIn">'
                        .'</a></li>';

                    if (!empty($options['youtube_uid'])) echo '<li class="youtube-icon"><a href="' . $options['youtube_uid'] . '">'
                        .'<img src="' . get_stylesheet_directory_uri() . '/icons/youtube-icon.png" width="24" height="24" alt="YouTube">'
                        .'</a></li>';

                    if (!empty($options['stumble_uid'])) echo '<li class="stumble-upon-icon"><a href="' . $options['stumble_uid'] . '">'
                        .'<img src="' . get_stylesheet_directory_uri() . '/icons/stumble-upon-icon.png" width="24" height="24" alt="StumbleUpon">'
                        .'</a></li>';

                    if (!empty($options['rss_uid'])) echo '<li class="rss-feed-icon"><a href="' . $options['rss_uid'] . '">'
                        .'<img src="' . get_stylesheet_directory_uri() . '/icons/rss-feed-icon.png" width="24" height="24" alt="RSS Feed">'
                        .'</a></li>';

                    if (!empty($options['google_plus_uid'])) echo '<li class="google-plus-icon"><a href="' . $options['google_plus_uid'] . '">'
                        .'<img src="' . get_stylesheet_directory_uri() . '/icons/googleplus-icon.png" width="24" height="24" alt="Google Plus">'
                        .'</a></li>';

                    if (!empty($options['instagram_uid'])) echo '<li class="instagram-icon"><a href="' . $options['instagram_uid'] . '">'
                        .'<img src="' . get_stylesheet_directory_uri() . '/icons/instagram-icon.png" width="24" height="24" alt="Instagram">'
                        .'</a></li>';

                    if (!empty($options['pinterest_uid'])) echo '<li class="pinterest-icon"><a href="' . $options['pinterest_uid'] . '">'
                        .'<img src="' . get_stylesheet_directory_uri() . '/icons/pinterest-icon.png" width="24" height="24" alt="Pinterest">'
                        .'</a></li>';

                    if (!empty($options['yelp_uid'])) echo '<li class="yelp-icon"><a href="' . $options['yelp_uid'] . '">'
                        .'<img src="' . get_stylesheet_directory_uri() . '/icons/yelp-icon.png" width="24" height="24" alt="Yelp!">'
                        .'</a></li>';

                    if (!empty($options['vimeo_uid'])) echo '<li class="vimeo-icon"><a href="' . $options['vimeo_uid'] . '">'
                        .'<img src="' . get_stylesheet_directory_uri() . '/icons/vimeo-icon.png" width="24" height="24" alt="Vimeo">'
                        .'</a></li>';

                    if (!empty($options['foursquare_uid'])) echo '<li class="foursquare-icon"><a href="' . $options['foursquare_uid'] . '">'
                        .'<img src="' . get_stylesheet_directory_uri() . '/icons/foursquare-icon.png" width="24" height="24" alt="foursquare">'
                        .'</a></li>';

                    echo '</ul><!-- end of .social-icons -->';*/
             ?>
        </div><!-- end .powered -->

    </div><!-- end #footer-wrapper -->

</div><!-- end #footer -->

<?php wp_footer(); ?>
</body>
</html>
