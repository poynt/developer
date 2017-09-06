---
layout: page
title: "Integration with Poynt Billing Services"
category: tut
date: 2014-04-06 07:05:00
---

App integration with Poynt Billing can be performed in two steps broadly:<br>
<br>&nbsp;&nbsp;1)  [_In-App changes_](#in-app-changes)
<br>&nbsp;&nbsp;2)  [_Backend integration with Poynt Cloud_](#cloud-api-integration)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a.  [_Get subscriptions_](#get-subscriptions-api)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b.  [_Webhooks_](#webhooks)
<br>&nbsp;&nbsp;3)  [_Poynt Billing Integration Recommendations_](#poynt-billing-integration-recommendations)

<p>&nbsp;</p>



# In-App-changes
Poynt In-App Billing service provides application developers an easy way to check the status of their subscriptions and request merchants to subscribe for other plans as necessary.

~~~java
interface IPoyntInAppBillingService{

    /**
      * This method returns the current subscriptions for the calling app owned by the merchant.
      * Result will be returned in
      * {@link IPoyntInAppBillingServiceListener#onResponse}.
      *
      * @param packageName Package name of the call originator - this is verified against the
      * calling Uid provided by the android system.
      * @param requestId Request id of the call originator.
      * @param callback {@link IPoyntActivationServiceListener}
      */
    void getSubscriptions( String packageName,
                           String requestId,
                           IPoyntInAppBillingServiceListener callback);

    /**
      * This method returns an intent that can be used to launch Poynt billing fragment to allow
      * a merchant to subscribe to your application.
      *
      * @param packageName Package name of the call originator - this is verified against the
      * calling Uid provided by the android system.
      * @param extras bundle containing extra fields used to identify things like planId, etc.
      *         extras supported: plan_id
      *
      * @return Bundle containing a pending intent
      */
    Bundle getBillingIntent( String packageName, in Bundle extras);
}
~~~


## Integration with IPoyntInAppBillingService

Integration with Poynt In-App Billing service in your application involves:

(1) Creating your subscription plans. Please contact Poynt developer support for creating and loading your subscription plans for your applications. Below is a simple plan that charges $5 per month per business. You can always define multiple plans based on your needs.

~~~json
{
	"name": "Basic Plan",
	"amounts": [
		{
			"country": "US",
			"currency": "USD",
			"value": 500
		}
	],
	"interval": "MONTH",
	"scope": "BUSINESS"
}
~~~

(2) Add the following permissions to your Android Manifest file so you can invoke the PoyntInAppBillingService.

~~~xml
...
<uses-permission android:name="com.poynt.store.BILLING" />
...
~~~

(3) Bind to PoyntInAppBillingService from your activity or service. Note: You would need to have the corresponding "unbindService" call in the same activity or service.

~~~java
Intent serviceIntent = new Intent("com.poynt.store.PoyntInAppBillingService.BIND");
serviceIntent.setPackage("com.poynt.store");
bindService(serviceIntent, mServiceConn, Context.BIND_AUTO_CREATE);
~~~

(4) Check current subscriptions for the merchant - note that the merchant is inferred from the Poynt Terminal Settings.
~~~java
                mBillingService.getSubscriptions("<your-package-name>", requestId,
                        new IPoyntInAppBillingServiceListener.Stub() {
                            @Override
                            public void onResponse(final String resultJson, final PoyntError poyntError, String requestId)
                                    throws RemoteException {
                                if (poyntError != null) {
                                    // handle errors
                                } else {
                                    // resultJson is a json list of subscriptions
                                }
                            }
                        });
~~~

(5) (Optional) Launch In-App billing fragment for additional subscriptions (Eg. upsell, additional services). This involves two steps, first to request a launch intent from PoyntInAppBillingService and then launching the billing fragment using 'startIntentSenderForResult()'.

~~~java

private void launchBillingFragment() throws RemoteException {
        Bundle bundle = new Bundle();
        // add plan Id
        bundle.putString("plan_id", "<your-plan-id>");
        Intent launchIntent = mBillingService.getBillingIntent(getPackageName(), bundle);
        if (bundle != null && bundle.containsKey("BUY_INTENT")) {
            PendingIntent intent = bundle.getParcelable("BUY_INTENT");
            if (intent != null) {
                try {
                    startIntentSenderForResult(
                                            intent.getIntentSender(),
                                            BUY_INTENT_REQUEST_CODE,
                                            null,
                                            Integer.valueOf(0),
                                            Integer.valueOf(0),
                                            Integer.valueOf(0));
                } catch (IntentSender.SendIntentException e) {
                    e.printStackTrace();
                    // handle error - Failed to launch billing fragment!
                }
            } else {
                // handle error - Did not receive buy intent!
            }
        }
}


@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    // Check which request we're responding to
    if (requestCode == BUY_INTENT_REQUEST_CODE) {
        // Make sure the request was successful
        if (resultCode == RESULT_OK) {
            // Subscription request was successful - run Check Subscription to confirm!"
        } else if (resultCode == RESULT_CANCELED) {
            // Subscription request canceled
        }
    }
}    

~~~

## Sample-App

[PoyntSamples](https://github.com/poynt/PoyntSamples) repository on github contains a working sample of PoyntInAppBillingService. Please refer to [InAppBillingActivity.java](https://github.com/poynt/PoyntSamples/blob/develop/codesamples/src/main/java/co/poynt/samples/codesamples/InAppBillingActivity.java) for billing service specific code. Below are some screenshots of what you would see when you run the PoyntSamples application with your own packageName and Plans.

<div>
<img src="{{site.url}}/developer/assets/InAppBilling1.jpg" alt="InAppBilling1" width="300" style="border:20px;margin:20px"><img src="{{site.url}}/developer/assets/InAppBilling2.jpg" alt="InAppBilling2" width="300" style="border:20px;margin:20px"><img src="{{site.url}}/developer/assets/InAppBilling3.jpg" alt="InAppBilling3" width="300" style="border:20px;margin:20px"><img src="{{site.url}}/developer/assets/InAppBilling8.jpg" alt="InAppBilling8" width="300" style="border:20px;margin:20px"><img src="{{site.url}}/developer/assets/InAppBilling7.jpg" alt="InAppBilling7" width="300" style="border:20px;margin:20px"><img src="{{site.url}}/developer/assets/InAppBilling5.jpg" alt="InAppBilling5" width="300" style="border:20px;margin:20px"><img src="{{site.url}}/developer/assets/InAppBilling6.jpg" alt="InAppBilling6" width="300" style="border:20px;margin:20px">
</div>


# Cloud API integration

### Get-Subscriptions-API

This API returns a list of ALL Active Subscriptions across ALL merchants for a specific developer appId.

e.g.:

Request URL - {endpoint}/apps/{appId}/subscriptions (Add query params businessId={businessId}, start={pagination start value}, count={pagination count})

~~~
curl -X GET   https://billing.poynt.net/apps/urn:aid:b326335b-ce7c-4482-80d4-109e0fe6f9d9/subscriptions?businessId=db4a4f0d-d467-472d-a85b-2d08a61b57fa   
-H 'authorization: Bearer <access-token>'   
-H 'cache-control: no-cache'   
-H 'content-type: application/json'
~~~

Sample Response:

~~~
{"list":[{"createdAt":"2017-05-22T21:23:27Z","updatedAt":"2017-05-22T21:23:27Z","businessId":"db4a4f0d-d467-472d-a85b-2d08a61b57fa",
"appId":"urn:aid:b326335b-ce7c-4482-80d4-109e0fe6f9d9","subscriptionId":"28d80f61-cc26-4b28-8562-45e750c0e684",
"planId":"292771f3-acb2-47fa-9d5a-e64a8f5fe0ef","bundled":false,"status":"ACTIVE"},
{"createdAt":"2017-05-24T02:13:43Z","updatedAt":"2017-05-24T02:13:43Z","businessId":"db4a4f0d-d467-472d-a85b-2d08a61b57fa","appId":
"urn:aid:b326335b-ce7c-4482-80d4-109e0fe6f9d9","subscriptionId":"65f713f3-55eb-40ed-bb4a-e4f392ccc2fb","planId":
"292771f3-acb2-47fa-9d5a-e64a8f5fe0ef","bundled":false,"status":"ACTIVE"},
{"createdAt":"2017-05-22T21:49:03Z","updatedAt":"2017-05-22T21:49:03Z","businessId":"db4a4f0d-d467-472d-a85b-2d08a61b57fa","appId":
"urn:aid:b326335b-ce7c-4482-80d4-109e0fe6f9d9","subscriptionId":"6c8dd921-0eaf-4f9c-8620-5b4d018e511a","planId":"
292771f3-acb2-47fa-9d5a-e64a8f5fe0ef","bundled":false,"status":"ACTIVE"},
{"createdAt":"2017-05-22T22:36:48Z","updatedAt":"2017-05-22T22:36:48Z","businessId":"db4a4f0d-d467-472d-a85b-2d08a61b57fa","appId":
"urn:aid:b326335b-ce7c-4482-80d4-109e0fe6f9d9","subscriptionId":"ac827bab-a70f-439b-971c-1ccb9637ce0e","planId":
"292771f3-acb2-47fa-9d5a-e64a8f5fe0ef","bundled":false,"status":"ACTIVE"}],"start":0,"total":4,"count":4}
~~~
<p>&nbsp;</p>

### Webhooks

The Event types supported for receiving Billing Webhooks are:<br>
<br>&nbsp;&nbsp;1)  <strong>_Subscription activation_{:.italic}</strong> ( `APPLICATION_SUBSCRIPTION_START` )
<br>&nbsp;&nbsp;2)  <strong>_Subscription cancellation/end_{:.italic}</strong> ( `APPLICATION_SUBSCRIPTION_END` )

<p>&nbsp;</p>
To Receive Billing Webhooks, please follow these steps:


#### (1) Billing Webhook Registration

Billing Webhooks can be registered with the following Event Types:

~~~
"eventTypes":[
	        "APPLICATION_SUBSCRIPTION_START",
                "APPLICATION_SUBSCRIPTION_END"]
~~~

Please refer to [Webhooks Registration](https://poynt.github.io/developer/doc/webhooks.html) section for details on webhooks.
The `businessId` value in the request corresponds to the `OrgId` value from your Developer Portal account online.

Note: For calling into Poynt services to register webhooks, the app will need an `<access-token>` to authenticate itself. Access token generation is described in the [Authentication & Authorization](https://poynt.github.io/developer/doc/authentication-authorization.html) section.

#### (2) Webhook

When a Subscription event occurs, a webhook notification is triggered and sent to the `deliveryUrl` from step (1).

~~~
Sample Webhook:
{  
   "createdAt":"2017-05-24T02:13:43Z",
   "updatedAt":"2017-05-24T02:13:43Z",
   "links":[  
      {  
         "href":"https://billing.poynt.net/apps/urn:aid:b326335b-ce7c-4482-80d4-109e0fe6f9d9/subscriptions/65f713f3-55eb-40ed-bb4a-e4f392ccc2fb",
         "rel":"resource",
         "method":"GET"
      }
   ],
   "id":"5f97f64e-f7e7-4f1b-be36-c5a9ae016410",
   "hookId":"f6c07532-2401-40ea-a569-5058a9b8d468",
   "applicationId":"urn:aid:b326335b-ce7c-4482-80d4-109e0fe6f9d9",
   "resource":"/apps/subscriptions",
   "resourceId":"65f713f3-55eb-40ed-bb4a-e4f392ccc2fb",
   "eventType":"APPLICATION_SUBSCRIPTION_START",
   "businessId":"db4a4f0d-d467-472d-a85b-2d08a61b57fa"
}
~~~

The subscription resource url returned in `href` can be used to retrieve the complete Subscription Information as described in Step (3).

Note: For receiving webhooks on multiple apps, one webhook per app needs to be registered.

#### (3) Get Subscription Information

Additional Subscription details can be obtained from the Subscription Resource Url as follows:

For eg:

~~~
Request URL - {endpoint}/apps/{appId}/subscriptions/{subscriptionId}

curl -X GET \
  https://billing.poynt.net/apps/urn:aid:b326335b-ce7c-4482-80d4-109e0fe6f9d9/subscriptions/65f713f3-55eb-40ed-bb4a-e4f392ccc2fb \
  -H 'authorization: <access-token>' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
~~~

Sample Response:

~~~
{"createdAt":"2017-05-24T02:13:43Z","updatedAt":"2017-05-24T02:13:43Z","planId":"292771f3-acb2-47fa-9d5a-e64a8f5fe0ef","bundled":false,
"businessId":"db4a4f0d-d467-472d-a85b-2d08a61b57fa","appId":"urn:aid:b326335b-ce7c-4482-80d4-109e0fe6f9d9",
"subscriptionId":"65f713f3-55eb-40ed-bb4a-e4f392ccc2fb","status":"ACTIVE"}
~~~

#### (4) Next steps

The Subscription information on activations/deletions allows you to get merchant's current subscription status, upsell services/plans or provide technical support.


<p>&nbsp;</p>

# Poynt Billing Integration Recommendations

Please review [App Billing Best Practices](https://poynt.com/poynt-billing-best-practices/).

While integrating with Poynt Billing is relatively simple and straightforward, the process of development and testing using the same package name that you would use for Live deployment would be challenging due to various things including billing plans, managing subscriptions and webhooks for test and live merchants, and managing multiple versions of your app in different states of development, testing and deployment. 

For these reasons, we recommend the following process for a seamless integration and deployment of your app using the Poynt Billing APIs (on terminal or on cloud):

* Use a **dev** variant for integration and testing. Android Studio and Gradle provide a nice and convenient way to manage multiple variants for your application. We recommend creating a new “dev” variant with package name appended by “.dev” and use it to create a test app on Poynt App Portal for your integration and testing. To create a new build variant (e.g. package name: "com.example.myapp.dev") open the build.gradle file in your project and add the following inside the **buildTypes** block:

~~~json
dev {
	initWith debug
       	applicationIdSuffix ".dev"
}
~~~

<p><div class="warning"><strong>Please note</strong> that <span style="font-style: italic">initWith debug</span> statement will ensure that the dev variant is signed with Android Studio debug keys. Unsigned apps will fail to install on Poynt. <a href="https://developer.android.com/studio/build/build-variants.html">Learn more about build variants on Android</a></div></p>

* Once you create and submit a test app using your “dev” variant, please contact Poynt dev support to enable this app to show up in Poynt Apps marketplace for “test merchants”. Please note that this will enable your test app to only show up for “test merchant” accounts used by developers.
* When you are satisfied with your integration and testing, generate a release build with your live package name (Eg. “com.example.myapp”) and submit for App Review as your final app. Note that the appId and App credentials (RSA public key pair) for your live application would be different from the test application, and you would need to create the billing plans again for the live app.
* Once your live app is reviewed and approved by our App Review team, your billing plans will be marked as live and your application can be published in the Poynt Apps marketplace.


### If you are building a brand new app:

* Create new dev variant with package name appended with “.dev” suffix.
* Create new Application on Poynt app Portal with the dev variant application.
* Create billing plans for development and testing.
* Contact Poynt Dev Support to mark the app available for testing through Poynt Apps Marketplace.
* Poynt Dev Support will approve your test billing plans and mark your app available for testing through Poynt apps Marketplace. Please note that this only enables for “Test Merchants”.
* Do your development and testing.
* When ready, generate your “release” build with your final package name.
* Create new app on Poynt app Portal with the release build apk.
* Create billing plans for Live
* Submit your app for review. Please note that you would need to complete all the formalities required for submitting an applications for review - failing so could delay your application review process.
* Poynt App review team, will review your billing plans and Application as per the Poynt App Review process, and approves for Live.
* Now your app is available for merchants in Live Poynt Apps marketplace.

### If you are updating an existing app with no prior billing plans:

* Create new dev variant with package name appended with “.dev” suffix.
* Create new Application on Poynt app Portal with the dev variant application.
* Create billing plans for development and testing.
* Contact Poynt Dev Support to mark the app available for testing through Poynt Apps Marketplace.
* Poynt Dev Support will approve your test billing plans and mark your app available for testing through Poynt apps Marketplace. Please note that this only enables for “Test Merchants”.
* Do your development and testing.
* When ready, generate your “release” build with your final package name.
* Upload your new release build apk for your existing Application on Poynt App Portal.
* Create billing plans for Live
* Submit your app for review. Please note that you would need to complete all the formalities required for submitting an applications for review - failing so could delay your application review process.
* Poynt App review team, will review your billing plans and Application as per the Poynt App Review process, and approves for Live.
* Now your app is available for merchants in Live Poynt Apps marketplace.

### If you are updating an existing app with prior billing plans:

* If you’ve integrated with Poynt Billing before without a dev variant, please follow previous two section to create a new dev variant with package name appended with “.dev” suffix.
* Create new billing plans for development and testing. Note: You can leave existing billing plans as they are or submit request to Poynt Dev Support to deprecate your old plans.
* Contact Poynt Dev Support to mark the app available for testing through Poynt Apps Marketplace.
* Poynt Dev Support will approve your test billing plans and mark your app available for testing through Poynt apps Marketplace. Please note that this only enables for “Test Merchants”.
* Do your development and testing.
* When ready, generate your “release” build with your final package name.
* Upload your new release build apk for your existing Application on Poynt App Portal.
* Create new billing plans for Live.
* Submit your app for review. Please note that you would need to complete all the formalities required for submitting an applications for review - failing so could delay your application review process. Note that if you are changing your pre-existing billing plans, you must indicate so in the app submission process for Poynt App Review team to deprecate any plans as needed.
* Poynt App review team, will review your billing plans and Application as per the Poynt App Review process, and approves for Live.
* Now your app is available for merchants in Live Poynt Apps marketplace.

<p>&nbsp;</p>

While integrating with Poynt Billing, please consider the following scenarios and make sure your application code can handle these as necessary:

1. merchant has a valid subscription but never used your app before (first time subscriber)
2. merchant has a valid subscription and has used your app before (**returning subscriber**)
3. merchant has a canceled subscription after using your app (**canceled subscriber**)
4. merchant has no subscriptions and never used your app - although this is no longer possible once you’ve integrated with Poynt Billing, we still recommend you to handle this scenario to prevent any fraud that might occur in the future. (**not a subscriber**)
5. merchant has no subscriptions and has used your app before - these are your existing merchants before you’ve switched to Poynt billing. You must make sure you grandfather these merchants to provide a more graceful upgrade process to billing. (**grandfathered subscriber**)
6. merchant has a valid subscription but wants to upgrade or downgrade (**upsell/downsell subscriber**)



