---
template: blog-post
title: How to add extra "Local Pickup" fields for shipping methods in WooCommerce?
slug: add-extra-local-pickup-fields-in-woocommerce
date: 2020-11-05 20:34
featuredImage: /assets/woocommerce-logo.png
tags:
  - Web-dev
  - WooCommerce
categories:
  - Tips
description: Learn how to add extra fields options for the "Local Pickup"
  shipping methods on WooCommerce's Cart and Checkout page.
---
This post is helpful if you want to add extra options on "Local Pickup" shipping methods. You must add this code on your `functions.php` file.

```php
/*  Custom Shipping (select local pick-up)
	=============================================================== */

// Custom function that handle your settings
function carrier_settings(){
    return array(
        'targeted_methods' => array('local_pickup:9','local_pickup:4'), // Your targeted shipping method(s) in this array
        'field_id'         => 'carrier_name', // Field Id
        'field_type'       => 'select', // Field type
        'field_label'      => '', // Leave empty value if the first option has a text (see below).
        'label_name'       => __("Pickup location and time:","woocommerce"), // for validation and as meta key for orders
        'field_options'    => array(
             // The option displayed at first ( or keep an empty value '',)
            __("Choose a local pickup and time", "woocommerce"),
            // The carrier companies below (one by line)
            'Local pickup 1 — 12h-18h',
            'Local pickup 2 — 12h-18h',
            'Local pickup 3 — 12h-18h',
            'Local pickup 4 — 12h-18h',
        ),
    );
}

// Display the custom checkout field
add_action( 'woocommerce_after_shipping_rate', 'carrier_company_custom_select_field', 20, 2 );
function carrier_company_custom_select_field( $method, $index ) {
    extract( carrier_settings() ); // Load settings and convert them in variables

    $chosen  = WC()->session->get('chosen_shipping_methods'); // The chosen methods
    $value   = WC()->session->get($field_id);
    $value   = WC()->session->__isset($field_id) ? $value : WC()->checkout->get_value('_'.$field_id);
    $options = array(); // Initializing

    if( ! empty($chosen) && $method->id === $chosen[$index] && in_array($method->id, $targeted_methods)  ) {
        echo '<div class="custom-carrier">';

        // Loop through field otions to add the correct keys
        foreach( $field_options as $key => $option_value ) {
            $option_key = $key == 0 ? '' : $key;
            $options[$option_key] = $option_value;
        }

        woocommerce_form_field( $field_id, array(
            'type'     => $field_type,
            'label'    => '', // Not required if the first option has a text.
            'class'    => array('form-row-wide ' . $field_id . '-' . $field_type ),
            'required' => true,
            'options'  => $options,
        ), $value );

        echo '</div>';
    }
}
```

```php
// jQuery code (client side) - Ajax sender 
add_action( 'wp_footer', 'carrier_company_script_js' );
function carrier_company_script_js() {
    // Only cart & checkout pages
    if( is_cart() || ( is_checkout() && ! is_wc_endpoint_url() ) ):

    // Load settings and convert them in variables
    extract( carrier_settings() );

    $js_variable = is_cart() ? 'wc_cart_params' : 'wc_checkout_params';

    // jQuery Ajax code
    ?>
    <script type="text/javascript">
    jQuery( function($){
        if (typeof <?php echo $js_variable; ?> === 'undefined')
            return false;

        $(document.body).on( 'change', 'select#<?php echo $field_id; ?>', function(){
            var value = $(this).val();
            $.ajax({
                type: 'POST',
                url: <?php echo $js_variable; ?>.ajax_url,
                data: {
                    'action': 'carrier_name',
                    'value': value
                },
                success: function (result) {
                    console.log(result); // Only for testing (to be removed)
                }
            });
        });
    });
    </script>
    <?php
    endif;
}

// The Wordpress Ajax PHP receiver
add_action( 'wp_ajax_carrier_name', 'set_carrier_company_name' );
add_action( 'wp_ajax_nopriv_carrier_name', 'set_carrier_company_name' );
function set_carrier_company_name() {
    if ( isset($_POST['value']) ){
        // Load settings and convert them in variables
        extract( carrier_settings() );

        if( empty($_POST['value']) ) {
            $value = 0;
            $label = 'Empty';
        } else {
            $value = $label = esc_attr( $_POST['value'] );
        }

        // Update session variable
        WC()->session->set( $field_id, $value );

        // Send back the data to javascript (json encoded)
        echo $label . ' | ' . $field_options[$value];
        die();
    }
}

// Conditional function for validation
function has_carrier_field(){
    $settings = carrier_settings();
    return array_intersect(WC()->session->get( 'chosen_shipping_methods' ), $settings['targeted_methods']);
}

// Validate the custom selection field
add_action('woocommerce_checkout_process', 'carrier_company_checkout_validation');
function carrier_company_checkout_validation() {
    // Load settings and convert them in variables
    extract( carrier_settings() );

    if( has_carrier_field() && isset( $_POST[$field_id] ) && empty( $_POST[$field_id] ) )
        wc_add_notice(
            sprintf( __("Please select a %s as it is a required field.","woocommerce"),
            '<strong>' . $label_name . '</strong>'
        ), "error" );
}

// Save custom field as order meta data
add_action( 'woocommerce_checkout_create_order', 'save_carrier_company_as_order_meta', 30, 1 );
function save_carrier_company_as_order_meta( $order ) {
    // Load settings and convert them in variables
    extract( carrier_settings() );

    if( has_carrier_field() && isset( $_POST[$field_id] ) && ! empty( $_POST[$field_id] ) ) {
        $order->update_meta_data( '_'.$field_id, $field_options[esc_attr($_POST[$field_id])] );
        WC()->session->__unset( $field_id ); // remove session variable
    }
}

// Display custom field in admin order pages
add_action( 'woocommerce_admin_order_data_after_shipping_address', 'admin_order_display_carrier_company', 30, 1 );
function admin_order_display_carrier_company( $order ) {
    // Load settings and convert them in variables
    extract( carrier_settings() );

    $carrier = $order->get_meta( '_'.$field_id ); // Get carrier company

    if( ! empty($carrier) ) {
        // Display
        echo '<p><strong>' . $label_name . '</strong>: ' . $carrier . '</p>';
    }
}
```

```php
// Display carrier company after shipping line everywhere (orders and emails)
add_filter( 'woocommerce_get_order_item_totals', 'display_carrier_company_on_order_item_totals', 1000, 3 );
function display_carrier_company_on_order_item_totals( $total_rows, $order, $tax_display ){
    // Load settings and convert them in variables
    extract( carrier_settings() );

    $carrier = $order->get_meta( '_'.$field_id ); // Get carrier company

    if( ! empty($carrier) ) {
        $new_total_rows = [];

        // Loop through order total rows
        foreach( $total_rows as $key => $values ) {
            $new_total_rows[$key] = $values;
            
            // Inserting the carrier company under shipping method
            if( $key === 'shipping' ) {
                $new_total_rows[$field_id] = array(
                    'label' => $label_name,
                    'value' => $carrier,
                );
            }
        }
        return $new_total_rows;
    }
    return $total_rows;
}
```

-------
Source: https://stackoverflow.com/questions/63191513/extra-carrier-field-for-shipping-methods-in-woocommerce-cart-and-checkout