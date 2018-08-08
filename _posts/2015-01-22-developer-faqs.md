---
layout: page
title: "Developer FAQs"
category: overview
date: 2010-01-22 15:07:24
---

### General information
**What type of applications can I build on Poynt?**<br>
First, from the platform/technology perspective -- the PoyntOS SDK lets you build on-terminal apps that the merchant can interact with in the
store environment. With the Poynt RESTful Cloud APIs, you can also build powerful standlone backend applications, or backend apps that connect to
apps installed on the terminal. Poynt provides you with a comprehensive set of [resources](https://poynt.com/docs/api/) to build the best solutions
for merchants -- [orders](https://poynt.com/docs/api/#orders-index), [transactions](https://poynt.com/docs/api/#transactions-index),
[customers](https://poynt.com/docs/api/#customers-index), product catalogs, and more.

Second, from the solutions perspective -- there are many application categories, from point-of-sale, loyalty, CRM, analytics, accounting, inventory
management, employee management, and more. Also, considering the breadth and depth of merchant vertical categories (i.e. 100 types of
eating/drinking places, 100+ types of apparel stores, etc.), there are a multitude of solutions you can build to address category-specific
problems.

Historically, building solutions for SMB (small and medium-sized business) was difficult -- from both the development and marketing perspectives.
With the PoyntOS SDK and Poynt RESTful APIs, building apps and integrating with merchant data is a snap. And because Poynt works directly with
acquiring banks and their ISOs (independent sales organizations), your apps can have unprecedented reach and distribution directly to merchants
across many markets.<br><br>

**Are there any restrictions on what apps can be built on Poynt?**<br>
Yes. From a technical standpoint, there is detailed information is in our SDK documentation. From a guidelines standpoint, see the [App Development Guidelines](https://poynt.github.io/developer/appstore/app-development-guidelines.html). Some key points to keep in mind:

1. Your app cannot access sensitive payment card information.
2. The consumer facing screen (the smaller one) has restrictions on what can be displayed.
3. Sideloading apps and services on live merchant devices is not allowed.
4. Access to custom USB devices from your apps must be approved by Poynt.
5. Apps will be reviewed and distributed by Poynt through secure channels.<br>

---

### App Marketing and Distribution

**How can I monetize my app? How is billing managed?**<br>
Apps that are submitted for review and approved by Poynt will be made available to merchants for purchase/subscription (see marketplace question below). Invoicing and billing is managed by Poynt.<br><br>

**What is the revenue share on my software running on Poynt?**<br>
It's a simple 80/20 revenue split of Net Revenue (as defined in the Developer Distribution Agreement) -- 80% to you (the developer), 20% to Poynt. *<br><br>

**When will an app marketplace be available to all merchants?**<br>
Poynt will start strategic rollouts of app marketplaces in Q2/2017. We're currently piloting select apps with live merchants using Poynt terminals. If your app is merchant-ready and
you would like us to review it for inclusion in a pilot deployment program, we'd love to hear more at devrelations@poynt.com.<br><br>

**What type of subscription models does Poynt support? How do I define those?**<br>
Poynt supports monthly subscriptions plans. One-time free trial periods are mandatory in most cases. At this time you cannot define app subscription plans; however, as we get closer to the general
rollout of the app marketplaces, the interface for defining these plans can be done in the application management section of the Poynt HQ developer portal.

\* Please contact Poynt for enterprise pricing and pricing for semi-integrated solutions.

---

### Developing on Poynt
**Can I develop for Poynt if I don’t have a test device?**<br>
Yes. For developing apps that run on the Poynt Smart Terminal, you can use the [PoyntOS emulator](/developer/setup/setup-poyntos.html) in Android Studio (AVD), Genymotion, or on a standard 7" Android tablet.
Additionally, you can also build pure cloud applications that operate independent of the physical Poynt terminal. Cloud apps can use the [Poynt Cloud API](https://poynt.com/docs/api/) to access [business](https://poynt.com/docs/api/#businesses-index), [customer](https://poynt.com/docs/api/#customers-index) and [transaction](https://poynt.com/docs/api/#transactions-index) data -- or even create [webhooks](https://poynt.com/docs/api/#hooks-index) for a variety of events.<br><br>


**Do you have an Android sample app?**<br>
Our Android sample app is available on Github. The app demonstrates invoking a payment fragment and displaying information on the second screen. For additional capabilities exposed in our SDK please visit [On-Terminal Apps](../onterminal/onterminal-apps.html).<br><br>

**How do I use Poynt’s Cloud APIs?**<br>
Our Python sample app demonstrates the usage of Poynt Cloud API. For more informaton on how to use Cloud API please refer [Integrating with Poynt Cloud APIs](../cloud/integrating-with-poynt-cloud-apis.html).<br><br>

**How do I create a product catalog and assign it to the register app?**<br>
Please refer to instructions [here](../setup/assign-catalog-to-poynt-register.html).<br><br>

**Can my cloud-based app communicate with my Android app installed on the terminal?**<br>
Yes. Your cloud app can send messages to your Android app as described in our documentation. If you need to enable your app id to send cloud messages please send us an email at support@poynt.com and include your app id and package name of your Android application.<br><br>

**What permissions do I need to declare in Android manifest to consume Poynt Services?**<br>
All Poynt Services are access controlled by android permissions defined in the Poynt Services Permission group (`co.poynt.services.permissions`). Below are the permissions that you must add to your Android Manifest file before consuming any of the Poynt Services:

* **Transaction Service**: `poynt.permission.TRANSACTION_SERVICE`
* **Order Service**: `poynt.permission.ORDER_SERVICE`
* **Second Screen Service**: `poynt.permission.SECOND_SCREEN_SERVICE`
* **Receipt Printing Service**: `poynt.permission.RECEIPT_PRINTING_SERVICE`
* **Product Catalog Service**: `poynt.permission.PRODUCT_SERVICE`
* **Customer Service**: `poynt.permission.CUSTOMER_SERVICE`
* **Business Service**: `poynt.permission.BUSINESS_SERVICE`
* **Email Service**: `poynt.permission.EMAIL_SERVICE`
* **Cash Register Service**: `poynt.permission.CASH_REGISTER_SERVICE`<br><br>

**How do I use Poynt Content Providers?**<br>
Poynt Content Providers provide a storage for various business related data including the orders and transactions, through the standard Android Content Provider interfaces. Below you'll find the data contracts (columns, and helper classes) that you can use to query data from the Poynt Content Providers. These content providers can be used to load data into various standard Android widgets directly from the data source.

Poynt OS SDK provides access to the data contracts:

* **Orders**: `co.poyntcontentproviders.orders.orders`
* **Transactions**: `co.poyntcontentproviders.orders.transactions`
* **Products**: `co.poyntcontentproviders.products.products`
* **Business**: `co.poyntandroid.providers.BusinessContract`
* **Customer**: `co.poyntandroid.providers.CustomerContract`
* **Activity**: `co.poyntandroid.providers.ActivityContract`<br><br>

All the Poynt ContentProviders require explicit permissions to be acquired via the applications' Android Manifest during the app installation process. Below are the permissions defined in the Poynt's data permissions group (`co.poynt.permissions) that you must add to your AndroidManifest file in order to use the data:

* **Activities**:
  * `co.poynt.activities.ACCESS_DATA`
  * `co.poynt.activities.WRITE_DATA`
* **Orders**:
  * `co.poynt.orders.ACCESS_ORDERS`
  * `co.poynt.orders.WRITE_ORDERS`
* **Business**:
  * `co.poynt.business.ACCESS_BUSINESS`
  * `co.poynt.business.WRITE_BUSINESS`
* **Customer**:
  * `co.poynt.customers.ACCESS_CUSTOMER`
  * `co.poynt.customers.WRITE_CUSTOMER`
* **Products/Catalogs**:
  * `co.poynt.products.ACCESS_PRODUCTS`
  * `co.poynt.products.WRITE_PRODUCTS`<br><br>

**How can I install my app on the device? Which USB port do I use to connect to the computer with ADB?**<br>
You can sideload an APK using `adb install <myapp.apk>` or via Android Studio. The terminal needs to be connected to your computer using the micro USB port located on the right side of the merchant facing screen (below the volume keys). Note that USB ports on the dock can only be used to connect peripherals like a printer or scanner.<br><br>

**Can my app have access to NFC APIs?**<br>
We do not currently provide direct access to NFC APIs. All NFC interactions are payment related and only accessible to the Poynt Payment service for PCI/security reasons.<br><br>

**Can I see the second screen on the emulator?**<br>
In the emulator go to `Device settings` > `Developer Options` > `Simulate Secondary Displays` and select `720x480 mdpi` option. Please keep in mind that you can't interact with the second display using the emulator.<br><br>

**How can I inject test encryption keys?**<br>
Go to `Settings` > `About` > tap 10 times on `Payment Firmware` > tap on `Inject` button.<br><br>

**How can I get the currency code for the merchant/terminal is configured for?**<br>
`Currency.getInstance(resources.getConfiguration().locale);`. Alternatively you can look up account currency in `Business.Store.currency` using [getBusiness API](../onterminal/authenticating-terminals.html).

**How can I programmatically get device serial number?**<br>
You can get it from `android.os.Build.SERIAL`

**How do I unlock `Developer Preferences` on a developer device or emulator?**<br>
Swipe down from the top of the screen, go to Settings > About > tap 10 times on `PoyntOS Version`. When you go back to the Settings screen, you will see `Develeoper Preferences`. (Please note that enabling Developer Preferences on a production terminal prompts for a PIN. If you really need to access Dev Prefs on a production terminal please contact Developer Support to get the PIN.)

**How do I get to Android System settings on a developer device?**<br>
You can either unlock Developer Preferences and tap on System or use this adb command `adb shell am start -S com.android.settings/.Settings`.

**How can my app tell if it's running on a Poynt 5 terminal?**<br>
You can use `android.os.Build` class to determine the type of terminal: `if("Poynt-P5".equals(Build.MODEL)){ /* running on Poynt5 */}`

**What endpoints does the Poynt terminal connects to? Can I get th list of IPs to whitelist on my network?**<br>
We host our services on AWS and cannot guarantee static IPs. The terminal needs to be able to connect to the following endpoints:<br>

* https://fouroneone.poynt.net
* https://mothership.poynt.net
* https://mothership-eu.poynt.net
* https://services.poynt.net
* https://services-eu.poynt.net
* https://ding2rj4jlgsl.cloudfront.net
* wss://pcm.poynt.net
* wss://pcm-eu.poynt.net
* http://connectivitycheck.gstatic.com
* http://clients3.google.com

**How can I check card reader configuration?**<br>
Go to `Settings` > `Developer Preferences` > `Card Reader Configuration`. Tap on `Get Config` button. You should see configuration options set for CONTACT, CONTACTLESS and MSR interfaces.

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>
