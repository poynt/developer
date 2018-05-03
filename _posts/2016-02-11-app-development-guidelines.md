---
layout: page
title: "App Development Guidelines"
category: appstore
date: 2016-02-11 12:35:00
---

Please follow the guidelines below when developing apps for the Poynt platform.

### Required Guidelines

#### DATA SECURITY & PRIVACY:
* Comply with all applicable privacy and data collection laws and regulations if your app collects any customer or merchant data.
* TLS 1.2 must be used for all HTTP based network connections. This also applies to web content displayed in webviews. Invalid certificates are not allowed and will result in failed network connections.
  * The full list of TLS certificates installed on the device can be found under `Settings ­>
    Systems ­> Security ­> Trusted credentials`.
  * Use certificate pinning when transmitting data between your terminal app and your backend services. For more information about certificate pinning on Android see:
    https://www.owasp.org/index.php/Certificate_and_Public_Key_Pinning#Android
* Device apps must use Poynt JWT tokens for authentication (do not store your private keys on the device).
* Apps must only ask for permissions needed in the operations provided. For device apps, permissions are set in the Android manifest. For cloud apps, permissions are defined through the app settings in the developer portal.
<p>
	<div class="alert"><strong>WARNING:</strong> Applications that use any of the permissions tagged as <span style="font-style: italic">Not for use by third-party applications</span> in <a href="https://developer.android.com/reference/android/Manifest.permission.html">Android developer documentation</a> (e.g. android.permission.MOUNT_UNMOUNT_FILESYSTEMS) will not be accepted.
	</div>
</p>
* Webviews must only load content within your control and not permit users to navigate to arbitrary web pages. For hostname whitelisting, see `shouldOverrideUrlLoading` method in Android docs.

#### INTEROPERABILITY:
* If you are building an app that generates or operates on orders (POS, order taking, etc.), utilize the `IPoyntOrderService` ([SDK](https://poynt.github.io/developer/javadoc/co/poynt/os/services/v1/IPoyntOrderService.html)) and/or `Orders` resource ([API](https://poynt.com/docs/api/#orders)) and provide item-level details.
  * This guideline applies whether or not your app utilizies the Poynt `Products`/`Catalog` resources.
  * Publish and subscribe to the following intents which carry `order_id` or order object (if the order has not been persisted):
    * `poynt.intent.action.NEW_ORDER_CREATED`
    * `poynt.intent.action.ORDER_UPDATED`
    * `poynt.intent.action.ORDER_ITEM_ADDED`
    * `poynt.intent.action.ORDER_ITEM_REMOVED`
    * `poynt.intent.action.ORDER_ITEM_UPDATED`
    * `poynt.intent.action.ORDER_CANCELED`
    * `poynt.intent.action.ORDER_FULFILLED`
    * `poynt.intent.action.ORDER_CLOSED`


#### RELIABILITY, USABILITY AND RESPONSIVENESS:
* Thoroughly test your app to prevent `NullPointerException` (NPE) and Application Not Responding (ANR) errors.
* Create a snappy, responsive, simple and intuitive UI
  * Make touch targets at least 48x48 pixels.
  * Support standard gesture navigation.
  * Ensure the product is still usable with larger font sizes.
  * Use more than just color to convey critical information.
  * Ensure critical text has enough contrast.
  * Native UI is recommended for better user experience.
  * Use the following dimensions for logo image assets: 70px(w) x 70px(h) (52dp x 52dp, tvdpi).
  * A flat color logo without any effects is recommended.
  * Provide navigation inside application including back and home buttons.
  * Authenticate users through Poynt's login screen and Token Service. PoyntOS security locks the screen and requires authentication. Additional layers of authentication are unnecessary and time consuming for merchant users.
  * Optimize operations for battery usage (i.e. push long running tasks to the cloud).
  * Provide support contact information for customers with issues/questions.


#### POYNT SPECIFIC:
  * Push order information to the Poynt cloud. This will allow merchant to access this information through ther merchant facing Poynt HQ portal (web) and mobile app (see Interoperabilty above).
  * The application apk must be under 50MB. 
  * Only use the Poynt Payment Fragment to collect payment, tip, signature, PIN and payment processor response information.
  * Disable Pay/Charge button when launching Payment Fragment to prevent multiple Payment Fragments from stacking up if the merchant clicks the button repeatedly.

---

### Recommended Guidelines

#### INTEROPERABILITY:
  * Use Poynt Catalog API and Products Content Provider (enables interoperability with complimentary apps in the ecosystem).
  * Link your customer with Poynt customer accounts.  Note: Poynt creates a customer record for every card swiped/used to enable seamless interactions without the need for additional Identification credentials.

#### USABILITY AND RESPONSIVENESS:
  * Native UI is recommended for a better user experience.
  * Non-native apps should use stylized components that present a native-like experience.

#### POYNT SPECIFIC:
  * Use or sync with Poynt product catalog as applicable.
  * POS/register applications should utilize `IPoyntSecondScreenService` to display item information as items are getting entered/scanned.

---

### Prohibited Guidelines

#### DATA SECURITY & PRIVACY -- YOU MUST NOT:
  * Embed credit card form inside your application (credit cards must only be processed using the payment fragment).
  * Email customer contacts collected from Poynt without their permission. Customers who choose to receive an email receipt should not be targeted to receive marketing emails unless their prior consent has been collected.
  * Resell or redistribute merchant data.
  * Collect sensitive consumer info: debit or credit PIN, SSN (social security number), credit card number, security codes, etc.
  * Store secure credentials in your binary APK (instead, utilize Poynt Token service for authentication and authorization).
  * Add your own authentication screen for secure operations. (instead, leverage PoyntOS authentication and token service)
  * Scan or take pictures of payment cards.

#### USABILITY -- YOU MUST NOT:
  * Create a custom launcher.
  * Use landscape orientation.
  * Launch activity from a background service while Payment Fragment is up.

#### POYNT SPECIFIC -- YOU MUST NOT:
  * Call Poynt Cloud API directly from Poynt terminal (use Poynt Services via SDK).
  * Abuse Poynt Cloud API infrastructure by generating heavy API traffic outside of merchant operations.
  * Use external cloud messaging services (instead, leverage Poynt cloud messaging).
  * Correlate customers across merchants and sharing Poynt customer information with other providers without explicit permission.
  * Using Poynt logo in your app without receiving prior consent from Poynt.
  * Launch any activities when your application is not in the foreground (not currently used by the merchant) including when Payment Fragment is in session. Note: as a background service you can rely on using Android notification framework to bring something to merchant's attention.

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>
