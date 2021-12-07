---
template: blog-post
title: How to add thumbnails on WooCommerce's Grouped Products
slug: how-to-add-thumbnails-on-woocommerce-grouped-products
date: 2021-08-31 12:04
description: Discover how to add thumbnails on WooCommerce's Grouped Products.
  And, on the "Bonus" section you can find out how to show every single
  variation of a Variable Product.
featuredImage: /assets/woocommerce-logo.png
tags:
  - Web-dev
  - PHP
  - WooCommerce
---
## The Problem
I've been looking for a solution to show, on a single product page, a list of chosen products (Grouped Products) on an online shop running on WooCommerce. 

After finding a bunch of payed plugins, I had to come with this simple, yet functional, solution.

## The Solution
This solution lets you show the thumbnail image for each product listed and let the user stay on the same page, without having to go forward and backward.

You must add the following code on your `functions.php` child theme file:

```php
add_action( 'woocommerce_grouped_product_list_before_quantity', 'woocommerce_grouped_product_thumbnail' );

function woocommerce_grouped_product_thumbnail( $product ) {
    $attachment_url = wp_get_attachment_image_src($product->get_image_id(), 'thumbnail', false)[0];
    ?>
      <td class="woocommerce-grouped-product-list-item__image">
          <img src="<?php echo $attachment_url; ?>" />
      </td>
    <?php
}
```

---

## Bonus

If you are wondering how can you display all the variations of a `variable product`, you can archieve this by replacing the line #15 on this file: `woocommerce/inclues/admin/meta-boxes/views/html-product-data-linked-products.php`. Just look for the attribute `data-action` and replace the previous property `woocommerce_json_search_products` by this new one: `woocommerce_json_search_products_and_variations`.

So, in the end you should have this: `data-action="woocommerce_json_search_products_and_variations"`

### Please Note

With this solution we are changing the core files of WooCommerce, which means you have to double-check this always when you make a new update, as this file it will be replaced by the new. 

If you have a solution for this particular case, please let me know and I am more than happy to share with everybody.

The source for this "bonus" was found [here](https://stackoverflow.com/questions/28922171/woocommerce-is-it-possible-to-add-variable-products-to-a-grouped-product/54949123#54949123).