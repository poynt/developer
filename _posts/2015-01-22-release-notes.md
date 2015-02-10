---
layout: page
title: "Release Notes"
category: ref
date: 2015-01-22 16:49:01
---

### Current release: ***beta2***

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

| Release  | Date       |
|:--------:|:----------:|
| beta1    | 11/10/2014 |
