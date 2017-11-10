---
layout: page
title: "Plug and Pay (PnP)"
category: semi
date: 2015-04-01 13:05:00
---

## Overview

Plug and Pay is a simple embeddable Javascript snippet that allows you to initiate a Poynt transaction with the click of a button.

## Get Started Guide
To create a button that charges a specified amount to a device, simply insert
the snippet below where you want the button to appear.

    <script
      id='poynt-script'
      src='https://poynt.net/snippet/pnp/script.js'
      data-purchase-amount=1200
    </script>

If no serial number or device ID is specified, the payment will be initiated on all the devices belonging to the merchant that authorizes this transaction.

### Script Attributes
#### Required params
* data-purchase-amount (Number) - The amount to charge (excluding tip)

#### Optional params
* data-device-id (String) - The device ID
* data-serial-number (String) - The serial number of the device
* data-currency (String) - 3 digit currency value (e.g. "USD")
* data-tip-amount (Number) - Tip amount (if enabled for merchant)
* data-order-id (String) - Order ID to associate this transaction to

#### Other customizations
* data-custom-handler (Boolean) - By default, a Poynt terminal status indicator appears on the bottom left corner of the page. Set data-custom-handler to true to hide this status indicator. To handle the payment status, implement the following code:

	 	window.addEventListener('message', function (e) {
	 		var data = e.data;
	 		var eventName = data.eventName;
	 		var payload = data.payload;	// contains transactions data

	 		if (eventName === 'CHARGE_BEGIN') {
	 			// Transaction initiated
        	} else if (eventName === 'CHARGE_COMPLETE') {
        		// Transaction complete
        	} else if { eventName === 'CHARGE_TIMEOUT') {
        		// Request timed out
 			}
        });
