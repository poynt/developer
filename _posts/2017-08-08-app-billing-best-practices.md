---
layout: page
title: "App Billing Best Practices"
category: appstore
date: 2012-06-11 11:35:00
---

### Plan scopes
All billing plans can be set at different scopes based on your business model. At Poynt, merchants can have multiple stores (MIDs) in their business, and each store can have one or more terminals (TIDs).  Store scope provides the best coverage for most of the applications.

 * **Business** - when you want to charge merchants at their business level. Plans with Business scope will allow the merchant to install and use your app at any store and terminal that they might have. This scope is more useful for Apps that provide functionality aggregated at business level across multiple stores. Sample use cases include data analytics, reporting, inventory distribution, logistics, etc.
 * **Store** - when you want to charge merchants at each store level. Plans with Store scope will allow the merchant to install and use your app on every terminal at the store for which they have subscribed for. Sample use cases include employee management, inventory management, product catalogs, supplier chain management, POS applications, etc.
 * **Device** - when you want to charge merchants at each terminal level. Plans with Terminal scope will only allow the merchant to install and use your app on the terminal for which they have subscribed for. Sample use cases include integrations with external systems like POS system, ERP, etc. Device scope adds a little bit of complexity to handle cases like terminal swaps where the subscriptions need to be transferred from one terminal to another.

### Subscription life-cycle
Poynt Billing service is responsible for maintaining the life-cycle of each subscription. The subscriptions are initiated when a merchant signs up for one and ended when either a merchant explicitly requests a cancellation or fails to pay for the subscription within the allowed grace period.

`NOTE: Merchants can cancel the subscriptions by themselves through the Poynt Apps app via the Account screen. `

### Verifying Subscriptions
While Poynt Apps and Billing services take care of handling all billing needs for your app, it is very important for your applications to perform all the necessary checks to make sure all your users have subscribed to your app and their subscriptions are in good standing. Poynt In-App and RESTful Billing APIs provides various ways for you to perform these checks from your App or from your backend:

 * Web Hooks: Poynt Billing Service sends SUBSCRIPTION START and END webhook events that you can receive on your backend to record the merchants that have started or ended their subscriptions. The webhook event includes the merchant’s businessId, your applicationId, and a url to GET the subscription status. You can find more details about the Webhooks [here](integrating-with-billing.html#webhooks).
 * RESTful APIs: Poynt Billing Service provides simple REST apis to obtain all subscriptions associated with your application. This includes both active and inactive subscriptions. You can find more details about the REST API [here](integrating-with-billing.html#get-subscriptions-api).
 * In-App Billing Service: Poynt In-App Billing Service provides the necessary APIs on the PoyntOS platform for your App to verify the subscription status programmatically. These include APIs to get subscriptions associated with the current business (to which the terminal is associated with), and plans associated with your own app. You can find more details about the InApp billing apis [here](integrating-with-billing.html#in-app-changes).

### Grandfathering existing merchants
Whenever an update to your app is released, it is very important to make sure all existing merchant can continue to use your app - not just the newly subscribed merchants. This includes both merchants that have installed your app without any subscriptions in the past  or with subscriptions using older billing plans.

 * When adding new plans, please indicate whether you intend to replace existing plans with the new plans or add them as additional plans. Please note that Poynt never deletes existing plans that have any on-going subscriptions attached to them, but can hide them from being displayed to the merchants as available billing plans based on your needs.
 * When deprecating existing plans, please make sure you handle merchants with existing subscriptions gracefully. You can either (1) continue supporting them, or (2) request them to upgrade from within your application to a newer plan using the Poynt Billing Fragment API.
 * `NOTE: Always avoid hard coding the planIds in your application APKs. Use the GetPlans API in the Poynt In-App Billing service to query available plans for your application and use your backend to identify what features/functionality the merchant is authorized to use based on the subscribed plan. This will help you support merchants that might have subscribed to a newer plan but still using an older version of your app.`

### Upgrades & downgrades
At this moment Poynt Billing Fragment does not provide support for upgrade/downgrade of billing plans in an existing merchant subscription. We do intend to add support for this in the near future, but until then please contact Poynt Developer Support after you’ve upgraded a merchant (with their consent) with details about which old subscription to end, so Poynt can make sure merchants are not double charged.

 * Please note that in some cases, it’s also a valid use case for a merchant to have multiple subscriptions for different premium features provided by your application. So it’s really up to your application’s monetization models on how you would like to handle these.

### Test Merchants
 Developers and Test teams using Poynt DevKits and emulators use "Test Merchant" accounts for development and testing. While Poynt makes sure that Test Merchants are not charged for the usage, it's your responsibility to access control usage of your app.  You can verify the business type to make sure it's a LIVE  or TEST merchant.
