<?php

// Exit if accessed directly
if ( !defined('ABSPATH')) exit;

$theme_dir = get_stylesheet_directory_uri();

?>
<?php get_header(); ?>

        <div id="content" class="grid col-940">

			<?php responsive_entry_before(); ?>
			<div id="post-0" class="error404">
				<?php responsive_entry_top(); ?>

                <div class="post-entry">

                    <?php get_template_part( 'loop-no-posts' ); ?>

                </div><!-- end of .post-entry -->

				<?php responsive_entry_bottom(); ?>
        <img alt="" src="<?php echo $theme_dir; ?>/images/four-oh-four.png" class="four-oh-four"/>
			</div><!-- end of #post-0 -->
			<?php responsive_entry_after(); ?>

        </div><!-- end of #content-full -->

<?php get_footer(); ?>
