---
template: blog-post
title: Remove zeros on WooCommerce (2 ways)
slug: remove-zeros-on-woocommerce-2ways
date: 2020-12-07 16:41
description: Remove zeros on WooCommerce (2 ways)
featuredImage: /assets/woocommerce-logo.png
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