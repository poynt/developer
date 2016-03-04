---
layout: page
title: "App Development Guidelines"
category: ref
date: 2016-02-11 12:35:00
---

Please follow the guidelines below when developing apps for the Poynt platform.



### REQUIRED 
* Comply with all applicable privacy and data collection laws and regulations if your app collects any customer or merchant data.
* TLS1.2 must be used for all http based network connections. This also applies to web content displayed in webviews. Invalid certificates are not allowed and will result in failed network connections.
  * The full list of TLS certificates installed on the device can be found under Settings ­>
    Systems ­> Security ­> Trusted credentials.
  * Use certificate pinning. For more information about certificate pinning on Android see:
    https://www.owasp.org/index.php/Certificate_and_Public_Key_Pinning#Android
* Thoroughly test your app to prevent Null Pointer Exceptions or Application Not Responding errors.
  * Create a snappy, responsive, simple and intuitive UI
  * Make touch targets at least 48x48 pixels
  * Support standard gesture navigation
  * Ensure the product is still usable with larger font sizes
  * Use more than just color to convey critical information
  * Ensure critical text has enough contrast
  * Native UI is recommended for better user experience
* Use the following dimensions for logo image assets: 70px(w) x 70px(h) (52dp x 52dp, tvdpi). We recommend using a flat color logo without any effects.
* Poynt  Payment Fragment is the only way to  collect payments, tip, signature, pin, payment processor responses info.
* Provide navigation inside application including back and HOME button in your application. 
* Device apps should use secure TLS 1.2 and Poynt JWT tokens for authentication (don’t store your private keys on the device).
* Your app's Android manifest should only ask for permissions used by your application and needed in the operations provided.  
* Optimize operations for battery useage and push long running tasks to the cloud. 
* Authenticate user through Poynt login screen and token Service. Note: Poynt OS security locks the screen and requires authentication. Additional layers of authentication are unnecessary and time consuming for merchant users. 
* App Store Requirement: Leverage Poynt Merchant profile facilitate single-click sign-up. Consider delaying additional data collection to post first time use experience.
* Provide your support contact information for customers to reach you with issues or questions. 
* Disable Pay/Charge button which launches Payment Fragment to prevent multiple Payment Fragment stacking up if the merchant clicks the button repeatedly.
* If you are using a POS Register application make sure you are utilizing IPoyntSecondScreenService to display item information as items are getting entered/scanned.


### RECOMMENDED
* Use Poynt Catalog API and Products Content Provider (to enable inter-operability with complimentary apps in the ecosystem).
* Link your customer with Poynt customer accounts.  Note: Poynt creates a customer record for every card swiped/used to enable seamless interactions without the need for additional Identification credentials. 
* If you are building an app that generates or operates on orders (POS, Ordering...etc) interoperability with other apps is important: 
  * Publish and subscribe to the following intents which carry order_id or order object (if the order has not been persisted):
     * poynt.intent.action.NEW_ORDER_CREATED 
     * poynt.intent.action.ORDER_UPDATED
     * poynt.intent.action.ORDER_ITEM_ADDED
     * poynt.intent.action.ORDER_ITEM_REMOVED
     * poynt.intent.action.ORDER_ITEM_UPDATED
     * poynt.intent.action.ORDER_CANCELED
     * poynt.intent.action.ORDER_FULFILLED
     * poynt.intent.action.ORDER_CLOSED
  * Push order information to the Poynt cloud. This will allow merchant to access this information through their Poynt web portal and HQ mobile app.
  * Use or sync with Poynt product catalog as applicable.


### NOT ALLOWED
* Calling Poynt Cloud API directly from Poynt terminal (utilize Poynt Services).
* Embedding credit card form inside your application. Credit cards need to be processed using the payment fragment.
* Scanning or taking pictures of payment cards.
* Creating a custom launcher.
* Reselling merchants’ data.
* Emailing customer contacts collected from Poynt without their permission. Customers who choose to receive an email receipt should not be targeted to receive marketing emails unless their prior consent has been collected.
* Using landscape orientation in your application.
* Using Poynt logo in your app without getting a prior consent from Poynt.
* Creating your app UI that can be confused with Poynt Payment Fragment, Terminal or Register.
* Abusing Poynt Cloud API infrastructure by generating heavy API traffic outside of merchant operations.
* Storing secure credentials in your app’s apk (utilize Poynt Token service for authentication and authorization).
* Using external cloud messaging services. Leverage Poynt cloud messaging instead.
* Collecting sensitive consumer info: debit or credit PIN, SSN (social security number), credit card.
* Correlating customers across merchants and sharing Poynt customer information with other providers without explicit permission.
* Adding your own authentication screen for secure operations. Leverage Poynt OS authentication and token service..