---
template: blog-post
title: Remove zeros on WooCommerce (3 ways)
slug: remove-zeros-on-woocommerce-3ways
date: 2020-12-07 16:41
description: Remove zeros on WooCommerce (3 ways)
featuredImage: /assets/woocommerce-logo.png
tags:
  - Web-dev
	- WooCommerce
	- PHP
	- JavaScript
---
# 1st way — Remove the Zeros globally (front-end/backend)

This first approach is the "official" WooCommerce approach from the docs. However, in a situation you want to have the Zeros on the backend, for generated Invoice PDFs, for instance, the 2nd option it will be more appropriated.
 

```php
/**
 * Trim zeros in price decimals
 **/
add_filter( 'woocommerce_price_trim_zeros', '__return_true' ); 
```


# 2nd way — Removing ".00" with JavaScript (front-end only)

```php
add_action( 'wp_footer', 'remove_zeros' );
function remove_zeros() {
?>

	<script>
		jQuery(document).ready(function($){
			$('.amount').text(function(index, text) {
				return text.replace(/.00/g, ''); 
				console.log("test");
			});
		});
	</script>

<?php
}
```


# 3rd way — Create a function to make it work properly (on front-end only)

After some help on Slack, I got the following snippet, the best one:

```php
function conditionally_trim_zeros( $trim ) {
	if ( ! is_admin() ) {
		$trim = true;
	}
	return $trim;
}
add_filter( 'woocommerce_price_trim_zeros', 'conditionally_trim_zeros' );
```
