---
template: blog-post
title: WooCommerce — Check if products on cart has a specific tag
slug: woocommerce-check-if-products-on-cart-has-a-specific-tag
date: 2021-04-20 21:56
description: Check if WooCommerce products on cart has a specific tag, for
  example "Bottle", and remove them if they can't be shipped to the customer
  country.
featuredImage: /assets/woocommerce-logo.png
---
# Check if products on cart has a specific tag: "BOTTLE"

I've been looking for a way of removing specific products if they can't be shipped to the customer country. 

Initially, I've came up with a long code with AJAX calls, but that solution was far from perfect. After a few months, I had to add a few more products like those one and I had to sharp the code I had before. After looking for new solutions, I've came up with the following one bellow. 

As you can see, I've mixed two different sources and finally got it working right.

Have in mind for this code to work, you have to add "Bottle" (in this case) as a `product tag`. 
 

```php
/**
 * @snippet       Check if products on cart has a specific tag: "BOTTLE"
 * @sourcecode    https://stackoverflow.com/questions/53346384/avoid-checkout-for-specific-products-on-specific-country-in-woocommerce
 * @sourcecode    https://stackoverflow.com/questions/48795558/disable-shipping-for-specific-products-based-on-country-in-woocommerce
 */

add_action( 'woocommerce_before_calculate_totals', 'checking_and_removing_items', 10, 1 );
function checking_and_removing_items( $cart ) {
	if( !is_checkout() && !is_cart() ) return;

    if ( is_admin() && ! defined( 'DOING_AJAX' ) )
        return;

    if ( did_action( 'woocommerce_before_calculate_totals' ) >= 2 )
        return;

    $custome_shipping_country = WC()->customer->get_shipping_country();

    if( empty($custome_shipping_country) ){
        $package = WC()->shipping->get_packages()[0];
        if( ! isset($package['destination']['country']) ) return;
        $custome_shipping_country = $package['destination']['country'];
    }

    // Only for NON BE customers
    if( $custome_shipping_country == 'BE' ) return;

    // Iterate through each cart item
    $found = false;
    foreach( $cart->get_cart() as $cart_item_key => $cart_item )
        // if( in_array( $cart_item['data']->get_id(), $products_ids ) ){
		if( has_term( array('bottle'), 'product_tag', $cart_item['product_id'] ) ) {
            $found = true;
            $cart->remove_cart_item( $cart_item_key ); // remove item
        }

    if( $found ){
         // Custom notice
         wc_clear_notices();
         wc_add_notice('Wine products are not shippable to your country and have been removed', 'error');
    }
}
```
