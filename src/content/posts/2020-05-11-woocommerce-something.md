---
template: blog-post
title: How to customize your /wp-admin with  admin.css
slug: how-to-customize-your-wp-admin-with-admin-css
date: 2020-11-05 20:34
featuredImage: /assets/woocommerce-logo.png
tags:
  - Web-dev
  - WooCommerce
categories:
  - Tips
description: Learn how to customize your /wp-admin with admin.css
---
This post is helpful if you want to customize your `/wp-admin` with your own `admin.css` file. 

## Adding the code first to your functions.php

Depending on how deep you want the customization to the admin dashboard, you might be interested in using an **[extra plugin](https://wordpress.org/plugins/user-role-editor/) to set `user roles`**. With this plugin you will be able to set specific CSS to each user role, for instance, `Shop Manager`.  

To keep things easy for the copy/paste, I will just provide one script. You must add this code on your `functions.php` file.

```php
/*  Add user role body class (admin)
	=============================================================== */

// front-end
add_filter('body_class', function($classes) {
    global $current_user;
    foreach ($current_user->roles as $user_role) {
        $classes[] = 'role-'. $user_role;
    }
    return $classes;
});

// admin
add_filter('admin_body_class', function($classes) {
  $user = wp_get_current_user();
  foreach ($user->roles as $user_role) {
    $classes .= ' ' . 'role-' . $user_role . ' ';
  }
  return $classes;
});


/*  Add admin.css to your theme or child-theme
	=============================================================== */

function admin_style() {
    wp_enqueue_style( 'admin_css', get_stylesheet_directory_uri() . '/admin.css', false, '1.0.0' );
}

add_action( 'admin_enqueue_scripts', 'admin_style' );
```

## admin.css — a "real world scenario" example

While writing the first part of the post, I realized it might be interesting to see an example of a live website I've developed. So, I just did it. The code bellow is the admin.css file of an online-shop (around 100 products). 

```css
#wp-admin-bar-wp-logo,
#wp-admin-bar-user-info,
#wp-admin-bar-edit-profile,
#wpfooter,
.role-shop_manager .update-nag,
.role-shop_manager li.menu-icon-post,
.role-shop_manager li.menu-icon-tools,
.role-shop_manager li.toplevel_page_wpcf7,
.role-shop_manager li.menu-icon-team,
.role-shop_manager li.toplevel_page_vc-welcome,
.role-shop_manager li.menupop#wp-admin-bar-comments,
.role-shop_manager li#wp-admin-bar-new-post,
.role-shop_manager li#wp-admin-bar-new-page,
.role-shop_manager #wpseo-dashboard-overview,
.role-shop_manager #screen-meta-links,
.role-shop_manager #local-storage-notice,
.role-shop_manager #has-newer-autosave,
.role-shop_manager .wpb_vc_raw_html,
.role-shop_manager .screen-meta-links,
.role-shop_manager .vc_navbar,
.role-shop_manager .wpb_vc_empty_space,
.role-shop_manager .vc_control,
.role-shop_manager .vc_empty-container,
.role-shop_manager .vc_hidden-lg,
.role-shop_manager .vc_element-name,
.role-shop_manager #adminmenu li:nth-child(1),
.role-shop_manager #menu-pages .wp-submenu,
.role-shop_manager .wp-submenu-head .wp-submenu li:nth-child(2),
.role-shop_manager .woo-nav-tab-wrapper a:nth-child(2),
.role-shop_manager .woo-nav-tab-wrapper a:nth-child(3),
.role-shop_manager .woo-nav-tab-wrapper a:nth-child(5),
.role-shop_manager .woo-nav-tab-wrapper a:nth-child(6),
.role-shop_manager .woo-nav-tab-wrapper a:nth-child(7),
.role-shop_manager .woo-nav-tab-wrapper a:nth-child(8),
.role-shop_manager .woo-nav-tab-wrapper a:nth-child(9),
.role-shop_manager .woo-nav-tab-wrapper a:nth-child(10),
.role-shop_manager .woo-nav-tab-wrapper a:nth-child(11),
.role-shop_manager .woo-nav-tab-wrapper a:nth-child(12),
.role-shop_manager .toplevel_page_woocommerce-marketing,
.role-shop_manager #nm-product-layout,
.role-shop_manager #nm-product-description-layout,
.role-shop_manager #wpb_visual_composer .postbox-header,
.role-shop_manager.woocommerce-page #wpb_visual_composer,
.role-shop_manager .woocommerce-layout__header,
.role-shop_manager #wpbody-content > div:nth-child(4) > .woocommerce-layout,
.role-shop_manager .woocommerce-embed-page .woocommerce-layout__header,
.role-shop_manager ._sku_field,
.order_data_column:nth-child(2) .form-field.form-field-wide,
.role-shop_manager .user-rich-editing-wrap,
.role-shop_manager .user-comment-shortcuts-wrap,
.role-shop_manager .user-admin-bar-front-wrap,
.role-shop_manager .user-display-name-wrap,
.role-shop_manager .user-facebook-wrap,
.role-shop_manager .user-instagram-wrap,
.role-shop_manager .user-linkedin-wrap,
.role-shop_manager .user-pinterest-wrap,
.role-shop_manager .user-soundcloud-wrap,
.role-shop_manager .user-twitter-wrap,
.role-shop_manager .user-youtube-wrap,
.role-shop_manager .user-wikipedia-wrap,
.role-shop_manager #createuser table:last-of-type,
.role-shop_manager .form-table .form-field:nth-child(3),
.role-shop_manager .form-table .form-field:nth-child(4),
.role-shop_manager .form-table .form-field:nth-child(5),
.role-shop_manager .form-table .form-field:nth-child(6),
.role-shop_manager .yoast.yoast-settings,
.role-shop_manager.user-edit-php .user-admin-color-wrap,
.role-shop_manager.user-edit-php form#your-profile h2:nth-of-type(1),
.role-shop_manager.user-edit-php form#your-profile h2:nth-of-type(2),
.role-shop_manager.user-edit-php form#your-profile h2:nth-of-type(3),
.role-shop_manager.user-edit-php form#your-profile h2:nth-of-type(4),
.role-shop_manager.user-edit-php form#your-profile h2:nth-of-type(5),
.role-shop_manager.user-edit-php form#your-profile h3:first-of-type,
.role-shop_manager.user-edit-php form#your-profile .form-table:nth-of-type(1),
.role-shop_manager.user-edit-php form#your-profile .form-table:nth-of-type(4),
.role-shop_manager.user-edit-php form#your-profile .form-table:nth-of-type(6),
.role-shop_manager.user-edit-php form#your-profile .user-user-login-wrap,
.role-shop_manager.user-edit-php form#your-profile .user-url-wrap,
.role-shop_manager.user-edit-php form#your-profile .user-nickname-wrap,
.role-shop_manager.user-edit-php form#your-profile .user-myspace-wrap,
.role-shop_manager.user-edit-php form#your-profile .user-pinterest-wrap,
.role-shop_manager.user-edit-php form#your-profile .user-soundcloud-wrap,
.role-shop_manager.user-edit-php form#your-profile .user-tumblr-wrap,
.role-shop_manager.user-edit-php form#your-profile .user-twitter-wrap,
.role-shop_manager.user-edit-php form#your-profile .user-youtube-wrap,
.role-shop_manager.user-edit-php form#your-profile .user-wikipedia-wrap,
.role-shop_manager form#your-profile #fieldset-billing tr:last-of-type,
.role-shop_manager #wpseo-filter,
.role-shop_manager #wpseo-readability-filter,
.role-shop_manager th.column-date,
.role-shop_manager td.column-date,
.role-shop_manager th.column-wpseo-score,
.role-shop_manager td.column-wpseo-score,
.role-shop_manager th.column-wpseo-score-readability,
.role-shop_manager td.column-wpseo-score-readability,
.role-shop_manager th.column-wpseo-links,
.role-shop_manager td.column-wpseo-links,
.role-shop_manager th.column-wpseo-linked,
.role-shop_manager td.column-wpseo-linked,
.role-shop_manager th.column-product_tag,
.role-shop_manager td.column-product_tag,
.role-shop_manager .wc-tabs li.Mollie_options.Mollie_tab,
.role-shop_manager .wc-tabs li.euva_tab,
.role-shop_manager .wc-tabs li.yikes_wc_product_tabs_tab
{ display: none!important; }

.role-shop_manager th.column-is_in_stock,
.role-shop_manager td.column-is_in_stock {
    max-width: 140px;
}

.role-shop_manager .wp-list-table th#comments,
.role-shop_manager .wp-list-table td.comments,
.role-shop_manager .wp-list-table .column-comments
{ text-indent: -9999px; }

.role-shop_manager ul#adminmenu { margin-top: 0; }
.role-shop_manager form#your-profile h2 {
    padding-top: 30px;
    border-top: 2px solid lightgray;
}

.role-shop_manager .woocommerce-embed-page #wpbody .woocommerce-layout,
.role-shop_manager .woocommerce-embed-page .woocommerce-layout__notice-list-hide+.wrap,
.role-shop_manager .nosubsub,
.role-shop_manager .wp-heading-inline
    { padding-top: 20px!important; }
    
.role-shop_manager .woocommerce-layout__primary
    { margin-top: 20px!important; }


.role-shop_manager .woocommerce-embed-page .woocommerce-layout__header { 
    height: 0!important; overflow: hidden!important; }

#wpbody {
    opacity: 0;
    animation: fadeIn 900ms ease forwards;
    animation-delay: 600ms;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.woo-variation-swatches-pro_options {
    display: none!important;
}
```

You can use the **`.role-shop_manager`** selector to customize the `/wp-admin`.

For a last snippet I've got here an advanced example in how your own `admin.css` file  it might be your best friend for literally "printing" the wp-admin dashboard. This code is actually the continuity of the last snippet. In this example, this is helpful if the shop manager whants to **print the shop  "Overview" analytics**.

```css
/* Print "Overview" from Analytics */
@media print { 
    #adminmenumain,
    .woocommerce-layout__header,
    #screen-meta-links,
    .woocommerce-dashboard-section__add-more,
    .woocommerce-filters-label,
    .woocommerce-card__header { display: none!important; }
    #wpcontent { margin-left: 0; }
    .woocommerce-layout__primary { margin-top: -30px!important; }

    
    .woocommerce-summary { display: grid!important; grid-template-columns: 1fr 1fr!important; }
    .woocommerce-dashboard__columns { display: flex!important; }
    .woocommerce-card { width: 50%!important;}
    
    .woocommerce-layout__main { margin: 0!important; }
    table * { font-size: 8pt!important; padding: 3px!important; }
}
```



Hope this might be helpful to someone else, as well it helps me.