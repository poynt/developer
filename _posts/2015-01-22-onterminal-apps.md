---
layout: page
title: "On-Terminal Apps"
category: doc
date: 2015-01-22 16:51:51
---


Applications that provide direct interaction with the merchants or collect real time data or integrate with other connected devices on the terminal, can be built using Poynt SDK beta for Android. Developers can build both applications and background services to run on the terminal as they may fit their needs.

<center>
![On-Terminal Apps]({{site.url}}../assets/developers-on-terminal-apps.png)
</center>

Given the primary purpose of the device being payment processing, there are a few security and compliance requirements that we must abide to:

* No access to sensitive payment card information - NEVER! All payments are processed by the secure Poynt Services on the terminal and only the processed payment transactional information is shared with 3rd party apps and services.

* What you can display and ask for on the consumer facing screen is limited to what we expose as part of our SDK.

* No sideloading of apps and services is allowed (either through adb or downloading via internet). Infact ADB (Android Debug Bridge) is disabled on the actual Poynt Terminals.

* Access to custom USB devices from your apps must be approved by Poynt (at the time of review) and by the Merchant at the time of install.

* All apps must be reviewed and distributed by Poynt through secure channel.

### Developer Tools

Application development is same as any other Android application development process using the standard android development tools available from developer.android.com. Poynt Terminals run on customized build of Android 4.4.4 (KitKat). So all applications must be built with target as android-19.

Android Studio with gradle build toolkit is recommended. Although any android emulator would work, we would recommend using Genymotion emulator with screen resolution as 800x1280.

Poynt Smart Terminal developer edition is also available for pre-order. We highly recommend testing on it avoid any incompatibility issues before releasing your app to merchants. These developer editions have adb enabled so you can easily test your application in your development environments.

### Poynt SDK

The Poynt SDK for Android provides all the necessary interfaces and helper classes to access both Poynt Services and Data stored on the device and/or cloud, and also to initiate the secure payment process from your applications if needed.

Please contact us to obtain the latest copy of the Poynt SDK.

### Poynt Services

Poynt Services provide the core functionality exposed as AIDL services for 3rd party applications. These include,

1. [Poynt Transaction Service]({{site.url}}../javadoc/co/poynt/os/services/v1/IPoyntTransactionService.html) - provides the payment transactional information (status, amounts, etc.)
2. [Poynt Order Service]({{site.url}}../javadoc/co/poynt/os/services/v1/IPoyntOrderService.html) - provides the order management apis
3. [Poynt Business Service]({{site.url}}../javadoc/co/poynt/os/services/v1/IPoyntBusinessService.html) - provides the information about the merchant’s business, stores, employees, etc.
4. [Poynt Customer Service]({{site.url}}../javadoc/co/poynt/os/services/v1/IPoyntCustomerService.html) - provides apis to lookup and manage customers of the merchant
5. [Poynt Email Service]({{site.url}}../javadoc/co/poynt/os/services/v1/IPoyntEmailService.html) - provides apis to request receipts sent as email
6. [Poynt Product Service]({{site.url}}../javadoc/co/poynt/os/services/v1/IPoyntProductService.html) - provides apis to get product catalog for the merchant
7. [Poynt Receipt Printing Service]({{site.url}}../javadoc/co/poynt/os/services/v1/IPoyntReceiptPrintingService.html) - provides apis to print receipts for payment transaction and/or orders
8. [Poynt Second Screen Service]({{site.url}}../javadoc/co/poynt/os/services/v1/IPoyntSecondScreenService.html) - provides apis to request content to be displayed in the the consumer screen
9. [Poynt Cash Register Service]({{site.url}}../javadoc/co/poynt/os/services/v1/IPoyntCashRegisterService.html) - provides apis to open/close Cash drawer connected over USB
10. [Poynt Session Service]({{site.url}}../javadoc/co/poynt/os/services/v1/IPoyntSessionService.html) - provides apis to obtain current logged in business user (merchant) information
11. Poynt Authenticator - provides business user (merchant) login/authentication through Android’s [Account Manager API](http://developer.android.com/reference/android/accounts/AccountManager.html).

All the AIDL files required to generate the service stubs through Android SDK are bundled in the Poynt SDK. Please see [calling an IPC method](http://developer.android.com/guide/components/aidl.html#Calling) in Android developer documentation on how to use AIDL services.

### Poynt Content Providers

Poynt Content Providers provide the data store for various resources related to the merchant data. These include business, product, transactions, orders, customers, and more through the standard [Android Content Providers](http://developer.android.com/guide/topics/providers/content-providers.html) interface. All the Poynt Content Provider interfaces are provided through the SDK. These can be used with standard android widgets that support content resolver integration (eg. Lists).

### Poynt Payment Fragments

In order to protect customer payment card information, Poynt provides Payment Fragments that 3rd party applications can launch to collect payment card information securely and process transactions. The Payment Fragments can be launched by providing a ‘Payment’ object containing the transactional information like amounts, tip and reference identifier.

<center>
![Payment Fragment]({{site.url}}../assets/developers-fragment-1.png)
</center>

Three types of Payment Fragments are provided through Poynt SDK:

* Payment Fragment - provides necessary interface and callbacks to process a single transaction. Once a transaction is processed, the transactional information is passed back through the callback interface.

* MultiTender Payment Fragment - provides necessary interface and callbacks to process multiple payment tenders (of different types - cash, card, etc.) and split the amounts among them (auto-split or custom).

* Display Transactions Fragment - provides the necessary interface to display the transactional information for a given transaction Id or a reference id with which one or more transactions are linked with. Merchants can capture a pending transaction, void an authorization, or refund a processed transaction from this interface.

When the Payment Fragments are launched by an application, the consumer facing screen is taken over by the Payment Fragments to collect and process payment securely.

### Poynt Intents

Intents are a standard way for cross-application notifications in Android OS. Poynt Services broadcast various [events]({{site.url}}../javadoc/co/poynt/os/model/Intents.html) (as implicit intents) related to payments, orders and various other activities happening on the Terminal in real time. These events can be received by Applications and Services interested in receiving them and handle custom logic as needed. Please refer to the [javadocs]({{site.url}}../javadoc/co/poynt/os/model/Intents.html) for a complete list of Intent Actions defined in the PoyntOS platform.

Also as a good citizen in our App ecosystem, we request you to broadcast events that might be useful to other apps running the same terminal. This will help in building an integrated experience to the merchant - eg. when a POS app creates a new order, broadcasting an event about the new order created would help other apps and services (eg. an analytics and reporting app, or a order fulfillment app) to react as necessary.

Poynt Intents are broadcasted in addition to the common Intents broadcasted by the Android system. Please see ‘Intents and Intent Filters’ for more information on how to handle Intents programmatically or through Android Manifest file.
