---
template: blog-post
title: WordPress change specific texts and strings "by hand"
slug: wordpress-change-specific-texts-and-strings-by-hand
date: 2020-11-15 13:30
description: How to change specific texts, titles, terms and strings "by hand"
  on WordPress or WooCommerce? Find it out on this post.
featuredImage: /assets/woocommerce-logo.png
tags:
  - Web-dev
	- WooCommerce
	- PHP
---
The function bellow allows you to change all texts, titles or strings found on WordPress and WooCommerce pages "by hand". You just have to follow the logic shown inside of the `switch`: add a `case`, a `$translated_text`and a `break`.



```php
function change_texts_by_hand( $translated_text, $text, $domain ) {

	  switch ($translated_text) {
		case 'Additional Information':
		  $translated_text = __('Details afhaling', 'woocommerce');
		  break;
		case 'Order Tracking':
		  $translated_text = __('Uw bestelling', 'woocommerce');
		  break;
	  }
	return $translated_text;
  }
  add_filter( 'gettext', 'change_texts_by_hand', 20, 3 );
```

# When to use it?

You might use this function only if you are translating a website and still some terms or text aren't translated automatically. If this is your case, then you can use this function, instead of change the texts directly on the WordPress files. Which can be a pain, in case you update plugins, themes or the core files of WordPress, loosing your previous text changes. 

## Please Note

You just want to use this approach as a last resource on changing texts and translated texts on WordPress. This works great if you don't have a multilingual website running directly on WordPress. If that's your case, you should update the respective `.po` files found on `/wp-content/languages/`.