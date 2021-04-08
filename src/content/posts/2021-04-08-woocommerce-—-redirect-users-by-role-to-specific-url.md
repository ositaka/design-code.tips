---
template: blog-post
title: WooCommerce — Redirect users by role to specific URL
slug: woocommerce-redirect-users-by-role-to-specific-url
date: 2021-04-08 12:25
description: Learn how to redirect "subscribers" and "shop managers" to specific
  URLs, after login in on the wp-admin. This is great if you are developing a
  website and just show an "Under Construction" page.
featuredImage: /assets/woocommerce-logo.png
---
# Visitor

The following snippet is great for when you are still developing the website and you might have a "**Under construction**" page, but you want to show the actual "private" website to your client or a friend. 

First create a new user with this role: "**Subscriber**", then, add the following snippet to the `functions.php` of your child-theme. The you have to share the your link to the **`/wp-admin/`** page. After login in, this user will be redirected to the homepage, with **NO access** to the backend.

```php
function visitor_login_redirect( $redirect_to, $request, $user ) {
    //is there a user to check?
    if (isset($user->roles) && is_array($user->roles)) {
        //check for subscribers
        if (in_array('subscriber', $user->roles)) {
            // redirect them to another URL
            $redirect_to = 'https://YOUR-DOMAIN-HERE.com';
        }
    }

    return $redirect_to;
}

add_filter( 'login_redirect', 'visitor_login_redirect', 10, 3 );
```



# Shop Manager

The following snippet is great to use when you want to show both, the frontend and the backend (wp-admin) to your cliente. In this case, create a new user with "**Shop Manage**r" role and it will be redirected to the "**WooCommerce Orders**" page, after login in.

```php
function shop_manager_login_redirect( $redirect_to, $request, $user ) {
    //is there a user to check?
    if (isset($user->roles) && is_array($user->roles)) {
        //check for shop managers
        if (in_array('shop_manager', $user->roles)) {
            // redirect them to another URL
            $redirect_to = 'https://YOUR-DOMAIN-HERE.com/wp-admin/edit.php?post_type=shop_order';
        }
    }

    return $redirect_to;
}
add_filter( 'login_redirect', 'shop_manager_login_redirect', 10, 3 );
```