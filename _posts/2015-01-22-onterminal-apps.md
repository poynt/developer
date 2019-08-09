---
layout: page
title: "On-Terminal Apps"
category: onterminal
date: 2017-01-22 16:51:51
---


Applications that provide direct interaction with the merchants, collect real time data, or integrate with other accessories connected to the terminal can be built using Poynt SDK for Android. Developers can build both UI-rich applications as well as background services to run on Poynt terminals.

{: .center}
![On-Terminal Apps]({{site.url}}/developer/assets/developers-on-terminal-apps.png)

Given that a main function of the Poynt device is payment processing, there are a few security and compliance requirements that must be abided by:

  * No access to sensitive payment card information - NEVER! All payments are securely processed by Poynt Services running on the terminal and only the post-payment transactional information is made available to 3rd party apps and services.

  * What you can display and ask the customer for on the consumer facing screen is limited to what Poynt exposes as part of the SDK. For example, there are methods in the `IPoyntSecondScreenService` for scanning QR codes, requesting customer contact information (email, phone), tips, etc.

  * No sideloading of apps and services is allowed (either through `adb` or downloading via internet). The Android Debug Bridge (adb) is disabled on live merchant Poynt Terminals.

  * Access to custom USB devices from your apps must be approved by Poynt (at the time of review) and by the Merchant at the time of install.

  * All apps must be reviewed and distributed by Poynt through secure channel.

### Developer Tools

Application development for Poynt is the same as any other Android application development process using the standard Android development tools available from [developer.android.com](https://developer.android.com). Poynt Smart Terminal runs on a customized build of Android 4.4.4 (KitKat), so all applications must set the build target to `android-19`. Poynt 5 runs on a customized build of Android 6.0 (Marshmallow).

Android Studio with gradle build toolkit is recommended. Although any android emulator would work, we would recommend using Genymotion emulator with screen resolution as 800x1280.

Poynt Smart Terminal developer edition is also available for pre-order. We highly recommend testing on it avoid any incompatibility issues before releasing your app to merchants. These developer editions have `adb` enabled so you can easily test your application in your development environments.

### Poynt SDK

The Poynt SDK for Android provides all the necessary interfaces and helper classes to access both Poynt Services and Data stored on the device and in the cloud, and also to initiate the secure payment process from your applications if needed.

### Poynt Services

Poynt Services provide the core functionality exposed as AIDL services for 3rd party applications. These include:

1. [Poynt Transaction Service]({{site.url}}/developer/javadoc/co/poynt/os/services/v1/IPoyntTransactionService.html) - provides the payment transactional information (status, amounts, etc.)
2. [Poynt Order Service]({{site.url}}/developer/javadoc/co/poynt/os/services/v1/IPoyntOrderService.html) - provides the order management APIs
3. [Poynt Business Service]({{site.url}}/developer/javadoc/co/poynt/os/services/v1/IPoyntBusinessService.html) - provides the information about the merchant’s business, stores, employees, etc.
4. [Poynt Customer Service]({{site.url}}/developer/javadoc/co/poynt/os/services/v1/IPoyntCustomerService.html) - provides APIs to lookup and manage customers of the merchant
5. [Poynt Product Service]({{site.url}}/developer/javadoc/co/poynt/os/services/v1/IPoyntProductService.html) - provides APIs to get product catalog for the merchant
6. [Poynt Receipt Printing Service]({{site.url}}/developer/javadoc/co/poynt/os/services/v1/IPoyntReceiptPrintingService.html) - provides APIs to print receipts for payment transaction and/or orders
7. [Poynt Second Screen Service]({{site.url}}/developer/javadoc/co/poynt/os/services/v1/IPoyntSecondScreenService.html) - provides APIs to request content to be displayed in the the consumer screen
8. [Poynt Session Service]({{site.url}}/developer/javadoc/co/poynt/os/services/v1/IPoyntSessionService.html) - provides APIs to obtain current logged in business user (merchant) information
9. Poynt Authenticator - provides business user (merchant) login/authentication through Android’s [Account Manager API](http://developer.android.com/reference/android/accounts/AccountManager.html).

All the AIDL files required to generate the service stubs through Android SDK are bundled in the Poynt SDK. Please see [calling an IPC method](http://developer.android.com/guide/components/aidl.html#Calling) in Android developer documentation on how to use AIDL services.

### Poynt Content Providers

Poynt Content Providers provide the data store for various resources related to the merchant data. These include business, product, transactions, orders, customers, and more through the standard [Android Content Providers](http://developer.android.com/guide/topics/providers/content-providers.html) interface. All the Poynt Content Provider interfaces are provided through the SDK. These can be used with standard android widgets that support content resolver integration (eg. Lists).

### Poynt Payment Fragments

In order to protect customer payment card information, Poynt provides Payment Fragments that 3rd party applications can launch to collect payment card information securely and process transactions. The Payment Fragments can be launched by providing a ‘Payment’ object containing the transactional information like amounts, tip and reference identifier.

{: .center}
![Payment Fragment]({{site.url}}/developer/assets/pf-2.png){:height="480" width="300"}

Three types of Payment Fragments are provided through Poynt SDK:

* Payment Fragment - provides necessary interface and callbacks to process a single transaction. Once a transaction is processed, the transactional information is passed back through the callback interface.

* MultiTender Payment Fragment - provides necessary interface and callbacks to process multiple payment tenders (of different types - cash, card, etc.) and split the amounts among them (auto-split or custom).

* Display Transactions Fragment - provides the necessary interface to display the transactional information for a given transaction Id or a reference id with which one or more transactions are linked with. Merchants can capture a pending transaction, void an authorization, or refund a processed transaction from this interface.

When the Payment Fragments are launched by an application, the consumer facing screen is taken over by the Payment Fragments to collect and process payment securely.

### Poynt Intents

Intents are a standard way for cross-application notifications in Android OS. Poynt Services broadcast various [events]({{site.url}}/developer/javadoc/co/poynt/os/model/Intents.html) (as implicit intents) related to payments, orders and various other activities happening on the Terminal in real time. These events can be received by Applications and Services interested in receiving them and handle custom logic as needed. Please refer to the [javadocs]({{site.url}}/developer/javadoc/co/poynt/os/model/Intents.html) for a complete list of Intent Actions defined in the PoyntOS platform.

Also as a good citizen in our App ecosystem, we request you to broadcast events that might be useful to other apps running the same terminal. This will help in building an integrated experience to the merchant - eg. when a POS app creates a new order, broadcasting an event about the new order created would help other apps and services (eg. an analytics and reporting app, or a order fulfillment app) to react as necessary.


Poynt Intents are broadcasted in addition to the common Intents broadcasted by the Android system. Please see ‘Intents and Intent Filters’ for more information on how to handle Intents programmatically or through Android Manifest file.

### Poynt Register Intents

When merchants add or remove items to the Poynt Register application intents will be broadcast so that you can respond to these actions.

**ADD_PRODUCT_TO_CART Intent**

When an item is added to an order, the following intent is broadcast.

~~~
poynt.intent.action.ADD_PRODUCT_TO_CART
~~~

The following values are available as Intent extras.

- order_id
  - the order id (STRING)
- product_name
  - OPTIONAL
  - the name of the order item, if available (STRING)
- product_id:
  - OPTOINAL
  - the product id, if available (STRING)
- product_sku:
  - OPTIONAL
  - the sku of the product, if available (STRING)
- product_quantity
  - OPTIONAL
  - the quantity of the product that was added (FLOAT)


**REMOVE_PRODUCT_FROM_CART Intent**

When an item is added to an order, the following intent is broadcast.

~~~
poynt.intent.action.REMOVE_PRODUCT_FROM_CART
~~~

- order_id
  - the order id (STRING)
- product_name
  - OPTIONAL
  - the name of the order item, if available (STRING)
- product_id:
  - OPTOINAL
  - the product id, if available (STRING)
- product_sku:
  - OPTIONAL
  - the sku of the product, if available (STRING)

<p><div class="note">
<strong>Note</strong> Full list of broadcast intents can be seen in PoyntOS SDK's <a href="https://poynt.github.io/developer/javadoc/co/poynt/os/model/Intents.html" target="_blank">Intents</a> class
</div></p>

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>

<script language="javascript">
window.location="https://poynt.github.io/developer-docs/terminalApps/"
</script>
