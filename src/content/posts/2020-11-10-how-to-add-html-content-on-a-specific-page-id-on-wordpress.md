---
template: blog-post
title: How to add HTML content on a specific page-id on WordPress ?
slug: how-to-add-html-content-on-a-specific-page-id-on-wordpress
date: 2020-11-10 23:19
description: How to add HTML content on a specific page-id on WordPress ?
featuredImage: /assets/woocommerce-logo.png
---
Bellow is shown how to add a lightbox message on a specific page on WordPress. In this example for a wine section on the website [suninabox.eu](https://suninabox.eu), is there a conditional to check for the page-id `if( $post->ID == 2647)`. From here, is just a matter of writing down the desired code for the page.

Here is where all the magic happens: `add_action( 'wp_footer', 'age_wine_message' );`, this snippet is loaded on the footer of the page.

```javascript
/*  18 Year Old — Popup message on wine page
	=============================================================== */

add_action( 'wp_footer', 'age_wine_message' );

function age_wine_message() {
	global $post;
	
	if( $post->ID == 2647) { ?>
		<div id="age-wine-message">
			<div id="nm-lightbox-content" class="nm-row" style="position: fixed; top: 20%; height: 60%; width: 50%; left: 25%; right: 25%; z-index: 10001;">
				<div id="nm-lightbox-content" class="col col-sm-8 col-xs-12 centered nopad">
					<div style="padding:7%; text-align:center; background:#fff;">
						<h3>Gelieve uw leeftijd te verifiëren</h3>
						<p style="margin-top: 20px; margin-bottom: 0!important">U moet 18 jaar oud zijn om wijn op onze website te bestellen</p>
						<h6 style="margin-bottom: 10px;">Bent u ouder dan 18 jaar?</h6>
						<a style="font-size: small; margin-right: 4px; padding: 6px 12px" href="#" id="close-age-message" class="button">Ja</a>
						<a style="font-size: small; padding: 6px 12px" href="/" class="button">Nee</a>
					</div>
				</div>
			</div>
		</div>
		<div id="notice-bg" class="mfp-bg nm-wp-gallery-popup nm-mfp-zoom-in mfp-ready" style="position: fixed; top: 0; left: 0; bottom: 0; right: 0;"></div>
		<script>
			window.addEventListener('load', function(event) {
				jQuery('#close-age-message').click(function() {
					jQuery('#notice-bg').fadeOut(600);
					jQuery('#age-wine-message').fadeOut(300);
				});
			});
		</script>
	<?php }
}
```

I hope this code snippet might be helpful for you.