---
layout: page
title: "Integration with In-App Billing Service"
category: tut
date: 2017-05-20 07:05:00
---

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
