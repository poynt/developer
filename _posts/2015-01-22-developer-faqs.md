---
layout: page
title: "Developer FAQs"
category: doc
date: 2015-01-22 15:07:24
---

### Do you have an Android sample app?
Our Android sample app is available on Github. The app demonstrates invoking a payment fragment and displaying information on the second screen. For additional capabilities exposed in our SDK please visit https://poynt.github.io/developer/doc/onterminal-apps.html. 

### How do I use Poynt’s Cloud API?
Our Python sample app demonstrates the usage of Poynt Cloud API. For more informaton on how to use Cloud API please refer to https://poynt.github.io/developer/tut/integrating-with-poynt-cloud-apis.html. 

### Can I develop for Poynt if I don’t have a test device?
Yes. Our developer portal has instructions on how to set up a PoyntOS Emulator.

### Can my cloud app communicate with my Android app on the terminal?
Yes. Your cloud app can send messages to your Android app as described in our documentation. If you need to enable your app id to send cloud messages please send us an email at support@poynt.com and include your app id and package name of your Android application.

### What permissions do I need to declare in Android manifest to consume Poynt Services?
All Poynt Services are access controlled by android permissions defined in the Poynt Services Permission group (co.poynt.services.permissions). Below are the permissions that you must add to your Android Manifest file before consuming any of the Poynt Services:

* **Transaction Service**: poynt.permission.TRANSACTION_SERVICE
* **Order Service**: poynt.permission.ORDER_SERVICE
* **Second Screen Service**: poynt.permission.SECOND_SCREEN_SERVICE
* **Receipt Printing Service**: poynt.permission.RECEIPT_PRINTING_SERVICE
* **Product Catalog Service**: poynt.permission.PRODUCT_SERVICE
* **Customer Service**: poynt.permission.CUSTOMER_SERVICE
* **Business Service**: poynt.permission.BUSINESS_SERVICE
* **Email Service**: poynt.permission.EMAIL_SERVICE
* **Cash Register Service**: poynt.permission.CASH_REGISTER_SERVICE

### How do I use Poynt Content Providers?
Poynt Content Providers provide a storage for various business related data including the orders and transactions, through the standard Android Content Provider interfaces. Below you'll find the data contracts (columns, and helper classes) that you can use to query data from the Poynt Content Providers. These content providers can be used to load data into various standard Android widgets directly from the data source.

Poynt OS SDK provides access to the data contracts:

* **Orders**: co.poynt.contentproviders.orders.orders
* **Transactions**: co.poynt.contentproviders.orders.transactions
* **Products**: co.poynt.contentproviders.products.products
* **Business**: co.poynt.android.providers.BusinessContract
* **Customer**: co.poynt.android.providers.CustomerContract
* **Activity**: co.poynt.android.providers.ActivityContract

Permissions

All the Poynt ContentProviders require explicit permissions to be acquired via the applications' AndroidManifest during the app installation process. Below are the permissions defined in the Poynt's data permissions group (co.poynt.permissions) that you must add to your AndroidManifest file in order to use the data:

* **Activities**:
  * co.poynt.activities.ACCESS_DATA
  * co.poynt.activities.WRITE_DATA
* **Orders**:
  * co.poynt.orders.ACCESS_ORDERS
  * co.poynt.orders.WRITE_ORDERS
* **Business**:
  * co.poynt.business.ACCESS_BUSINESS
  * co.poynt.business.WRITE_BUSINESS
* **Customer**:
  * co.poynt.customers.ACCESS_CUSTOMER
  * co.poynt.customers.WRITE_CUSTOMER
* **Products/Catalogs**:
  * co.poynt.products.ACCESS_PRODUCTS
  * co.poynt.products.WRITE_PRODUCTS


### How do I create a product catalog and assign it to the register app?
Please refer to instructions  at https://poynt.github.io/developer/tut/assign-catalog-to-poynt-register.html.

### Are there any restrictions on what apps can be built?
Yes. More detailed information is in our SDK documentation. Some key points to keep in mind: 

1. no access to sensitive payment card information 
2. there are restrictions on what can be displayed on the consumer facing screen 
3. sideloading of apps and services is not allowed
4. access to custom USB devices from your apps must be approved by Poynt
5. all apps must be reviewed and distributed by Poynt through secure channel.

### How can I install my app on the device ? Which USB port do I use to connect to the computer with ADB?
You can sideload an apk using `adb install <myapp.apk>` or via Android Studio. The terminal needs to be connected to your computer using the micro USB port located on the right side of the merchant facing screen below the volume keys. Note that USB ports on the dock can only be used to connect peripherals like printer or scanner.

### Can my app have access to NFC APIs?
We do not provide direct access to NFC APIs at the moment. All the NFC interactions are payment related and only Poynt Payment service has access to it due to PCI/Security reasons.

### How much of an app’s purchase price do you keep?
We keep 20% of the app purchase price.

### Can I see the second screen on the emulator?
In the emulator go to device settings > Developer Options > Simulate Secondary Displays and select 720x480 mdpi option. Please keep in mind that you can't interact with the second display using the emulator.
