---
layout: page
title: "Release Notes"
category: ref
date: 2015-03-04 16:49:01
---

### Current release: ***beta7***
### PoyntOS SDK Version: 1.2.14
### Poynt API Model Version: 1.2.62

### Changes since beta6 (1.2.11)
* Updated API Model with new modifiers support (`selectableVariations`)
* Support for skipping default Poynt receipt (`setSkipReceipt(true)` in payment object)
* New transaction funding source: checks (`CHEQUE`)
* Support for fees/surcharges at the item level (in addition to order level)

### Changes since beta5 (1.2.10)
* Updated API Model (1.2.44) with a different parcel mechanism that allows for future version compatibility.
* Updated Receipts as per Acquirer EMV certification requirements
* Support for Android Emulators
* Various bug fixes
* Capability Manager & Accessory Manager updates
* Settlements application

### Changes since beta4 (1.2.8)
* Updaed API Model (1.2.36) - please rebuild your apps to package the new version
* Printer Service Updated
* Support for Debit transactions
* Support for Voice Auths
* Support for EMV Referrals
* Stability improvements

#### Changes since beta3 (1.2.6)
* Updated API Model (1.2.32)
* Initial support for custom tenders (discounts & giftcards)
* Stability improvements
* New Payment Fragment UI
* Payment bridge for external systems
* Order Inbox

#### Changes since beta2 update (1.2.4)
* Payment Fragments converted into Payment Activity
* Bug fixes in Register and Terminal Apps
* Bug fixes in Payment Activity
* Updates to Poynt Messages to support push notifications from cloud
* API Model and SDK are now tracked with different version numbers
* AIDL service interfaces clean up - mostly removing unnecessary test interfaces

#### Changes since beta2

* Discounts (item level only) support in Poynt Register (API support for both item level and order level)
* Performance improvements in Register for catalog load
* Sync adapters to keep various data resources in sync w/ Poynt Cloud
* Poynt Cloud Messaging - enables application developers to send push notifications to Poynt Terminals
* Multi-tender bug fixes in Payment Fragments
* Various UI fixes in Poynt Terminal and Register Apps
* Updates to Product Content Provider
* Support for custom invoiceId, auth only mode and non-reference credits both in APIs and Poynt Terminal/Register Apps
* Login screen changes


#### Changes since beta1

* SDK Package renamed: co.poynt.android.* —> co.poynt.os.*
* New api-model changes with biggest being changes to Business and Store ID changed as UUIDs, and timestamps changed to Calendar
* In-sync with Poynt Cloud APIs (v1.2) to provide inter-operability between terminal apps and cloud apps using the same data entities.
* New Poynt Settings app that allows the merchants to add new business users and check their business, store and payment settings.
* New AIDL service permissions, change in package name to include service version and consistent/simple callback model for all AIDL services (co.poynt.os.services.v1.*)
* Updated apps (Register/Terminal/Insights). Register app now presents the product catalogs configured from the merchant portal.
* More payment features added to Payment Fragment (support authorization only transaction, support for custom invoice ids, and non-reference credits) along with save transaction feature when offline
websocket based live stream connection with host
* New device activation app (OOBE) that verifies the merchant account (MID and TID), activates the device by generating device credentials and registering them with Poynt, creates a business user for the owner to login to the device and also triggers Poynt.net (merchant portal) signup email to the merchant’s email account.
* New Product Catalog APIs with support for variants
* New Intent actions for inter-app communications on Poynt devices
* Crashlytics to all release builds to track application crashes.
* Poynt Launcher updated with developer mode (on ten taps on the Poynt logo) to display all apps.
* New Developer Portal to enable developers register test merchants, terminals, stores, etc. and obtain application credentials for integrating with Poynt Cloud APIs.
* New Merchant Portal to enable merchants access their business data - orders, transactions, products, catalogs, users, and more.

### Older Releases

| Release  | Date       | SDK Version |
|:--------:|:----------:|:-----------:|
| beta7    | 07/26/2016 | 1.2.14 |
| beta6    | 05/03/2016 | 1.2.11 |
| beta5    | 01/22/2016 | 1.2.10 |
| beta4    | 10/25/2015 | 1.2.8 |
| beta3    | 04/22/2015 | 1.2.6 |
| beta2-update| 03/04/2015| 1.2.4 |
| beta2    | 01/16/2015 | 1.2.1 |
| beta1    | 11/10/2014 | 1.0 |
