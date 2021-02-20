---
template: blog-post
title: Defer JS on WordPress
slug: defer-js-on-wordpress
date: 2021-02-20 15:16
description: Defer JavaScript on WordPress and make your website load 10x faster.
featuredImage: /assets/woocommerce-logo.png
---
Defer JavaScript on WordPress and make your website load 10x faster.

```php
// Defer JS
function defer_parsing_of_js($url) {
	if (is_admin()) return $url;
	if (false === strpos($url, '.js')) return $url;
	if (strpos($url, 'jquery.js')) return $url;
	return str_replace(' src', ' defer src', $url);
}
add_filter('script_loader_tag', 'defer_parsing_of_js', 10);`