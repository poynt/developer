---
layout: page
title: "Integration with Poynt Billing Services"
category: appstore
date: 2012-10-06 07:05:00
---

While integrating with Poynt Billing Services is relatively simple and straightforward, the process of development and testing will require a special setup to make sure your app can handle all possible scenarios related to billing. We recommend reading the app development process first before writing your code to integrate with Poynt Billing.


[Billing App Development Process](../appstore/billing-app-development-and-submission-process.html)

Also we highly recommend going through the [App Billing Best Practices](../appstore/app-billing-best-practices.html) to make sure your app covers all possible billing scenarios.


App integration with Poynt Billing can be performed in two steps broadly:<br>
<br>&nbsp;&nbsp;1)  [_In-App changes_](#in-app-changes)
<br>&nbsp;&nbsp;2)  [_Backend integration with Poynt Cloud_](#cloud-api-integration)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a.  [_Get subscriptions_](#get-subscriptions-api)
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b.  [_Webhooks_](#webhooks)

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

    /**
      * This method returns the current plans associated with the given packageName
      * Result will be returned in
      * {@link IPoyntInAppBillingServiceListener#onResponse}.
      *
      * @param packageName Package name of the call originator - this is verified against the
      * calling Uid provided by the android system.
      * @param requestId Request id of the call originator.
      * @param callback {@link IPoyntActivationServiceListener}
      */
    void getPlans( String packageName,
                   String requestId,
                   IPoyntInAppBillingServiceListener callback);
}
~~~


## Integration with IPoyntInAppBillingService

Integration with Poynt In-App Billing service in your application involves:

(1) Creating your subscription plans. When you upload the apk in the developer portal you will be able to create subscription plans. Once the plans are approved by Poynt App Review team they will be accessible via API. Below is a simple plan that charges $5 per month per business. You can always define multiple plans based on your needs.

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
        Bundle launchBundle = mBillingService.getBillingIntent(getPackageName(), bundle);
        if (launchBundle != null && launchBundle.containsKey("BUY_INTENT")) {
            PendingIntent intent = launchBundle.getParcelable("BUY_INTENT");
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

This API returns a list of ALL active subscriptions across ALL merchants (if **businessId** param is not present) for a specific developer appId.

e.g.:

**Request URL** - https://billing.poynt.net/apps/{appId}/subscriptions 

**Optional query params**:

 1. **businessId** - merchant business id
 2. **start** - pagination start value in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)  format
 3. **count** - pagination count 

e.g.

~~~bash
curl -X GET   https://billing.poynt.net/apps/urn:aid:24c6e3d4-19e4-45c8-8231-6af2089dc694/subscriptions?businessId=2bd73f40-60ff-4ced-aafd-66f270a2972c   
-H 'authorization: Bearer <access-token>'   
-H 'cache-control: no-cache'   
-H 'content-type: application/json'
~~~

Sample Response:

~~~
{
    "list": [
        {
            "createdAt": "2018-06-09T02:44:22Z",
            "updatedAt": "2018-06-10T02:44:23Z",
            "startAt": "2018-06-09T00:00:00Z",
            "businessId": "2bd73f40-60ff-4ced-aafd-66f270a2972c",
            "appId": "urn:aid:24c6e3d4-19e4-45c8-8231-6af2089dc694",
            "subscriptionId": "569b915f-2631-4cfb-ba36-fd23f9871e13",
            "phase": "FULL",
            "planId": "31b0f62f-da70-4bd3-880d-f98b40a05283",
            "bundleId": "a8d8af83-06fc-4136-b0c5-2064b5a22f46",
            "status": "ACTIVE"
        },
        {
            "createdAt": "2018-06-11T19:27:45Z",
            "updatedAt": "2018-06-11T19:27:45Z",
            "startAt": "2018-06-11T00:00:00Z",
            "businessId": "2bd73f40-60ff-4ced-aafd-66f270a2972c",
            "appId": "urn:aid:24c6e3d4-19e4-45c8-8231-6af2089dc694",
            "subscriptionId": "5edfded9-49fb-464c-922e-cf662734055f",
            "phase": "TRIAL",
            "planId": "eba1e538-52c8-4a4e-a73a-3650340de984",
            "bundleId": "692f9ad6-409c-4035-9e1a-a0ea2bdbdf03",
            "status": "ACTIVE"
        }
    ],
    "start": 0,
    "total": 2,
    "count": 2
}
~~~
<p>&nbsp;</p>

### Webhooks

The Event types supported for receiving Billing Webhooks are:<br>
<br>&nbsp;&nbsp;1)  <strong>_Subscription activation_{:.italic}</strong> ( `APPLICATION_SUBSCRIPTION_START` )
<br>&nbsp;&nbsp;2)  <strong>_Subscription cancellation/end_{:.italic}</strong> ( `APPLICATION_SUBSCRIPTION_END` )
<br>&nbsp;&nbsp;3)  <strong>_Subscription Payment Success_{:.italic}</strong> ( `APPLICATION_SUBSCRIPTION_PAYMENT_SUCCESS` )
<br>&nbsp;&nbsp;4)  <strong>_Subscription Payment Failure_{:.italic}</strong> ( `APPLICATION_SUBSCRIPTION_PAYMENT_FAIL` )
<br>&nbsp;&nbsp;4)  <strong>_Subscription Phase Change_{:.italic}</strong> ( `APPLICATION_SUBSCRIPTION_PHASE_CHANGE` )
<br>&nbsp;&nbsp;4)  <strong>_Subscription Refund Success_{:.italic}</strong> ( `APPLICATION_SUBSCRIPTION_REFUND_SUCCESS` )

<p>&nbsp;</p>
To Receive Billing Webhooks, please follow these steps:


#### (1) Billing Webhook Registration

Billing Webhooks can be registered with the following Event Types:

~~~
"eventTypes":[
	        "APPLICATION_SUBSCRIPTION_START",
                "APPLICATION_SUBSCRIPTION_END",
                "APPLICATION_SUBSCRIPTION_PAYMENT_SUCCESS",
                "APPLICATION_SUBSCRIPTION_PAYMENT_FAIL",
                "APPLICATION_SUBSCRIPTION_PHASE_CHANGE",
                "APPLICATION_SUBSCRIPTION_REFUND_SUCCESS"]
~~~
~~~

APPLICATION_SUBSCRIPTION_START              - Subscription Start
APPLICATION_SUBSCRIPTION_END                - Subscription End
APPLICATION_SUBSCRIPTION_PAYMENT_SUCCESS    - Payment made successfully on the account
APPLICATION_SUBSCRIPTION_PAYMENT_FAIL       - Payment on the account failed
APPLICATION_SUBSCRIPTION_PHASE_CHANGE       - Subscription moved from a Trial to a Paid phase
APPLICATION_SUBSCRIPTION_REFUND_SUCCESS     - Refund from the Gateway succeeded

~~~
Please refer to [Webhooks Registration](https://poynt.github.io/developer/overview/webhooks.html) section for details on webhooks.

<div class="note"><span style="font-weight: bold">Note:</span> The <span style="font-weight: bold">businessId</span>  value in the web hook registration request corresponds to the <span style="font-weight: bold">OrgId</span> value from your Developer Portal account online.</div>

#### (2) Webhook

When a Subscription event occurs, a webhook notification is triggered and sent to the `deliveryUrl` from step (1). This event gets triggered regardless of whether the subscription has a free trial.

Sample Webhook for Subscription Start:

~~~
{
  "createdAt": "2018-06-11T19:27:46Z",
  "updatedAt": "2018-06-11T19:27:46Z",
  "links": [
    {
      "href": "https://billing.poynt.net/apps/urn:aid:24c6e3d4-19e4-45c8-8231-6af2089dc694/subscriptions/5edfded9-49fb-464c-922e-cf662734055f",
      "rel": "resource",
      "method": "GET"
    }
  ],
  "id": "ff32460f-a0b6-4c17-b945-6649b8df2095", // id of this event
  "hookId": "21f4a4da-6c10-43f0-bd23-3875067d2031", // id of the web hook that generated this event
  "applicationId": "urn:aid:24c6e3d4-19e4-45c8-8231-6af2089dc694",  // appId of your application
  "resource": "/apps/subscriptions",
  "resourceId": "5edfded9-49fb-464c-922e-cf662734055f", // subscription id for this merchant
  "eventType": "APPLICATION_SUBSCRIPTION_START",
  "merchantType": "TEST_MERCHANT",  // TEST_MERCHANT for test merchants and MERCHANT for merchants in Production environment
  "businessId": "2bd73f40-60ff-4ced-aafd-66f270a2972c"  // merchant's business id
}
~~~

To get the details of the merchant (i.e. business name, email, phone, etc.) who purchased/installed the app you can make a HTTP GET request to https://services.poynt.net/businesses/{businessId}.  Please refer to [API reference](https://poynt.com/docs/api/#model-business) to see the type of information contained in the response.

Sample Webhook for Payment Success:

~~~
{  
   "createdAt":"2017-05-24T02:15:43Z",
   "updatedAt":"2017-05-24T02:15:43Z",
   "links":[  
      {  
         "href":"https://billing.poynt.net/apps/urn:aid:b326335b-ce7c-4482-80d4-109e0fe6f9d9/subscriptions/65f713f3-55eb-40ed-bb4a-e4f392ccc2fb",
         "rel":"resource",
         "method":"GET"
      },
      {
         "href": "https://billing.poynt.net/businesses/db4a4f0d-d467-472d-a85b-2d08a61b57fa/invoices/d47e96f3-ef63-4190-8e52-b1acd2d625df",
         "rel": "resource",
         "method": "GET"
      }
   ],
   "id":"a0b9acd8-5332-438f-9765-5d94c31487ca",
   "hookId":"f6c07532-2401-40ea-a569-5058a9b8d468",
   "applicationId":"urn:aid:b326335b-ce7c-4482-80d4-109e0fe6f9d9",
   "resource":"/apps/subscriptions",
   "resourceId":"65f713f3-55eb-40ed-bb4a-e4f392ccc2fb",
   "eventType":"APPLICATION_SUBSCRIPTION_PAYMENT_SUCCESS",
   "merchantType":"TEST_MERCHANT",
   "businessId":"db4a4f0d-d467-472d-a85b-2d08a61b57fa"
}
~~~



Sample Webhook for Subscription Phase Change (from Trial to Paid subscription):

~~~
{
  "createdAt": "2018-06-12T19:27:46Z",
  "updatedAt": "2018-06-12T19:27:46Z",
  "links": [
    {
      "href": "https://billing.poynt.net/apps/urn:aid:24c6e3d4-19e4-45c8-8231-6af2089dc694/subscriptions/5edfded9-49fb-464c-922e-cf662734055f",
      "rel": "resource",
      "method": "GET"
    }
  ],
  "id": "d223114f-2f18-401c-a8a0-04d9f8d356e8",
  "hookId": "21f4a4da-6c10-43f0-bd23-3875067d2031",
  "applicationId": "urn:aid:24c6e3d4-19e4-45c8-8231-6af2089dc694",
  "resource": "/apps/subscriptions",
  "resourceId": "5edfded9-49fb-464c-922e-cf662734055f",
  "eventType": "APPLICATION_SUBSCRIPTION_PHASE_CHANGE",
  "merchantType": "TEST_MERCHANT",
  "businessId": "2bd73f40-60ff-4ced-aafd-66f270a2972c"
}
~~~


Sample Webhook for Successful Refund:

~~~
{
  "createdAt": "2018-06-12T21:47:53Z",
  "updatedAt": "2018-06-12T21:47:53Z",
  "links": [
    {
      "href": "https://billing.poynt.net/apps/urn:aid:24c6e3d4-19e4-45c8-8231-6af2089dc694/subscriptions/569b915f-2631-4cfb-ba36-fd23f9871e13",
      "rel": "resource",
      "method": "GET"
    },
    {
      "href": "https://billing.poynt.net/businesses/2bd73f40-60ff-4ced-aafd-66f270a2972c/invoices/9101b739-f9eb-4400-8aa3-f10aca1bc7bb",
      "rel": "resource",
      "method": "GET"
    }
  ],
  "id": "8b262b17-ba1f-4f6d-979a-52e75213a5cb",
  "hookId": "21f4a4da-6c10-43f0-bd23-3875067d2031",
  "applicationId": "urn:aid:24c6e3d4-19e4-45c8-8231-6af2089dc694",
  "resource": "/apps/subscriptions",
  "resourceId": "569b915f-2631-4cfb-ba36-fd23f9871e13",
  "eventType": "APPLICATION_SUBSCRIPTION_REFUND_SUCCESS",
  "merchantType": "TEST_MERCHANT",
  "businessId": "2bd73f40-60ff-4ced-aafd-66f270a2972c"
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
  https://billing.poynt.net/apps/urn:aid:24c6e3d4-19e4-45c8-8231-6af2089dc694/subscriptions/5edfded9-49fb-464c-922e-cf662734055f \
  -H 'authorization: Bearer <access-token>' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
~~~

Sample Response:

~~~
{
    "createdAt": "2018-06-11T19:27:45Z",
    "updatedAt": "2018-06-11T19:27:45Z",
    "startAt": "2018-06-11T00:00:00Z",
    "businessId": "2bd73f40-60ff-4ced-aafd-66f270a2972c",
    "appId": "urn:aid:24c6e3d4-19e4-45c8-8231-6af2089dc694",
    "subscriptionId": "5edfded9-49fb-464c-922e-cf662734055f",
    "phase": "TRIAL",
    "planId": "eba1e538-52c8-4a4e-a73a-3650340de984",
    "bundleId": "692f9ad6-409c-4035-9e1a-a0ea2bdbdf03",
    "status": "ACTIVE"
}
~~~

#### (4) Get Plan Information

All Plan details for a particular app(using appId) can be obtained as follows:

For eg:

~~~
Request URL - {endpoint}/apps/{appId}/plans

curl -X GET \
  https://billing.poynt.net/apps/urn:aid:24c6e3d4-19e4-45c8-8231-6af2089dc694/plans \
  -H 'authorization: Bearer <access-token>' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
~~~

Sample Response:

~~~
{
    "list": [
        {
            "createdAt": "2018-06-08T18:28:12Z",
            "updatedAt": "2018-06-08T18:28:12Z",
            "amounts": [
                {
                    "country": "US",
                    "currency": "USD",
                    "value": 100
                }
            ],
            "interval": "DAY",
            "trialPeriodDays": 0,
            "startPolicy": "IMMEDIATE",
            "cancelPolicy": "IMMEDIATE",
            "appId": "urn:aid:24c6e3d4-19e4-45c8-8231-6af2089dc694",
            "amount": 100,
            "planId": "2ed4c39f-ddf7-4294-9c10-aab16e8710b8",
            "scope": "BUSINESS",
            "description": "BillingTestDev $1",
            "status": "ACTIVE",
            "name": "BillingTestDev $1"
        },
        {
            "createdAt": "2018-06-09T02:43:32Z",
            "updatedAt": "2018-06-09T02:43:32Z",
            "amounts": [
                {
                    "country": "US",
                    "currency": "USD",
                    "value": 200
                }
            ],
            "interval": "DAY",
            "trialPeriodDays": 1,
            "startPolicy": "IMMEDIATE",
            "cancelPolicy": "IMMEDIATE",
            "appId": "urn:aid:24c6e3d4-19e4-45c8-8231-6af2089dc694",
            "amount": 200,
            "planId": "31b0f62f-da70-4bd3-880d-f98b40a05283",
            "scope": "BUSINESS",
            "description": "BillingTest Dev $2 with Trial 1 day",
            "status": "ACTIVE",
            "name": "BillingTest Dev $2 with Trial 1 day"
        },
        {
            "createdAt": "2018-06-11T19:10:33Z",
            "updatedAt": "2018-06-11T19:10:33Z",
            "amounts": [
                {
                    "country": "US",
                    "currency": "USD",
                    "value": 10000
                }
            ],
            "interval": "DAY",
            "trialPeriodDays": 1,
            "startPolicy": "IMMEDIATE",
            "cancelPolicy": "IMMEDIATE",
            "appId": "urn:aid:24c6e3d4-19e4-45c8-8231-6af2089dc694",
            "amount": 10000,
            "planId": "eba1e538-52c8-4a4e-a73a-3650340de984",
            "scope": "BUSINESS",
            "description": "BillingTest Dev $100 with Trial 1 day",
            "status": "ACTIVE",
            "name": "BillingTest Dev $100 with Trial 1 day"
        }
    ],
    "start": 0,
    "total": 3,
    "count": 3
}
~~~


#### (5) Next steps

The Subscription information on activations/deletions allows you to get merchant's current subscription status, upsell services/plans or provide technical support.


<p>&nbsp;</p>

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>

<script language="javascript">
window.location="https://poynt.github.io/developer-docs/appStore/integrating-with-billing.html"
</script>

