---
layout: page
title: "Integration with In-App Billing Service"
category: tut
date: 2014-04-06 07:05:00
---
# Client-Side changes
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

(5) (Optional) Launch In-App billing fragment for additional subscriptions (Eg. upsell, additional services). This involves two steps, first to request a launch intent from PoyntInAppBillingService and then launching the billing fragment using 'startIntentSenderForResult()'. Please make

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

## Sample App

[PoyntSamples](https://github.com/poynt/PoyntSamples) repository on github contains a working sample of PoyntInAppBillingService. Please refer to [InAppBillingActivity.java](https://github.com/poynt/PoyntSamples/blob/develop/codesamples/src/main/java/co/poynt/samples/codesamples/InAppBillingActivity.java) for billing service specific code. Below are some screenshots of what you would see when you run the PoyntSamples application with your own packageName and Plans.

<div>
<img src="{{site.url}}/developer/assets/InAppBilling1.jpg" alt="InAppBilling1" width="300" style="border:20px;margin:20px"><img src="{{site.url}}/developer/assets/InAppBilling2.jpg" alt="InAppBilling2" width="300" style="border:20px;margin:20px"><img src="{{site.url}}/developer/assets/InAppBilling3.jpg" alt="InAppBilling3" width="300" style="border:20px;margin:20px"><img src="{{site.url}}/developer/assets/InAppBilling8.jpg" alt="InAppBilling8" width="300" style="border:20px;margin:20px"><img src="{{site.url}}/developer/assets/InAppBilling7.jpg" alt="InAppBilling7" width="300" style="border:20px;margin:20px"><img src="{{site.url}}/developer/assets/InAppBilling5.jpg" alt="InAppBilling5" width="300" style="border:20px;margin:20px"><img src="{{site.url}}/developer/assets/InAppBilling6.jpg" alt="InAppBilling6" width="300" style="border:20px;margin:20px">
</div>


<p>&nbsp;</p>
# Server-Side changes


## Webhook for Billings

For Billing integrations, webhooks provide a way for you to verify postback notifications for billing events such as Subscription activation and removal. Here are the steps to setup and receive these webhooks:


### (1) Get Access Token

~~~
Sample Jwt REQUEST:

curl -X POST \
  https://services.poynt.net/testing/jwt \
  -H 'api-version: 1.2' \
  -H 'cache-control: no-cache' \
  -H 'content-type: text/plain' \
  -d '{
    "privateKey": "<app-private-key>",
    "aud": [
        "https://services.poynt.net"
    ],
    "iss": "<applicationId>",
    "sub": "<applicationId>",
    "iat": 1403747463,
    "jti": "30467c0e-1c41-428d-85ba-aa56c5983861",
    "exp": 2269382400
}'

RESPONSE:

{"jwt":"<jwt-token>"}
~~~

~~~
Access Token REQUEST:
curl -X POST \
  https://services.poynt.net/token \
  -H 'api-version: 1.2' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'grantType=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=<jwt-token>'

  RESPONSE:

  {"expiresIn":3600,"accessToken":"<access-token>","refreshToken":"<refresh-token>","scope":"ALL","tokenType":"BEARER"}
~~~


### (2) Billing Webhook Registration

Billing Webhooks can be registered with the following Event Types:
~~~
"eventTypes":[
	        "APPLICATION_SUBSCRIPTION_START",
                "APPLICATION_SUBSCRIPTION_END"]
~~~
Please refer to [Webhooks Registration](https://poynt.github.io/developer/doc/webhooks.html) section for additional details.
The `businessId` value corresponds to the `OrgId` value from your Developer Portal account.

### (3) Webhook Response

When a Subscription event occurs, a webhook notification is triggered and sent to the `deliveryUrl`.
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


### (3) Get Subscription Information

Once you receive the Webhook, you may use the `href` value from the response to issue a HTTP GET request for fetching the subscription details.
For eg:
~~~
curl -X GET \
  https://billing.poynt.net/apps/urn:aid:b326335b-ce7c-4482-80d4-109e0fe6f9d9/subscriptions/65f713f3-55eb-40ed-bb4a-e4f392ccc2fb \
  -H 'authorization: <access-token>' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
~~~
