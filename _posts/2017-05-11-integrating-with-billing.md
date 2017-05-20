---
layout: page
title: "Integration with Billing"
category: tut
date: 2014-04-06 07:05:00
---

<p>&nbsp;</p>
#  Integration
In-App Billing integration steps include:<br><br>
1) Poynt SDK implementation.<br>
2) Reaching out to Poynt support (dev-support@poynt.co) to define your Plans. If applicable, pick a default App subscription.<br>
3) Upload your completed app with the following changes:<br>
    &nbsp;&nbsp;3.1: Add Permissions to your Manifest file.<br>
    &nbsp;&nbsp;3.2: Check existing merchant subscriptions.<br>
    &nbsp;&nbsp;3.3: (Optional) - Launch Billing Fragment for Subscription upgrade, e.g: Freemium to a Paid plan, Zero-dollar/Trial subscription to a Paid plan.<br>

### 3.1: Manifest file

Add the a permission `com.poynt.store.BILLING` to your manifest as follows:

~~~xml
...
<uses-permission android:name="com.poynt.store.BILLING" />
...
~~~
<p>&nbsp;</p>

### 3.2: Get Merchant Subscriptions


Your Android Service class needs to consume _IPoyntInAppBillingService_{:.italic} interface's **getSubscriptions()** method. This method returns all the Merchant subscriptions associated with a Plan.

1. Define a Static field of type _ComponentName_{:.italic}. Create a new Service Connection.
2. Bind the Service in the _OnResume()_{:.italic} method. You need to UnBind the service in the _OnPause()_{:.italic} method.


~~~java

    IPoyntInAppBillingService mBillingService;

    private static final ComponentName COMPONENT_POYNT_INAPP_BILLING_SERVICE = new ComponentName("com.poynt.store", "co.poynt.os.services.v1.IPoyntInAppBillingService");


        checkSubscriptionBtn = (Button) findViewById(R.id.checkSubscriptionBtn);
        checkSubscriptionBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (mBillingService != null) {
                  mBillingService.getSubscriptions(getApplicationContext().getPackageName(), requestId,
                          new IPoyntInAppBillingServiceListener.Stub() {
                              @Override
                              public void onResponse(final String resultJson, final PoyntError poyntError, String requestId)
                                      throws RemoteException {
                                  Log.d(TAG, "Received response from InAppBillingService for " +
                                          "getSubscriptions(" + requestId + ")");
                                  if (poyntError != null) {
                                      Log.d(TAG, "poyntError: " + poyntError.toString());
                                  }
                }
            }
        });



    @Override
    protected void onResume() {
        super.onResume();
        Intent serviceIntent =
                new Intent("com.poynt.store.PoyntInAppBillingService.BIND");
        serviceIntent.setPackage("com.poynt.store");
        bindService(serviceIntent, mServiceConn, Context.BIND_AUTO_CREATE);
    }


    @Override
    public void onPause() {
        super.onPause();
        if (mBillingService != null) {
            unbindService(mServiceConn);
        }
    }

    private ServiceConnection mServiceConn = new ServiceConnection() {
        @Override
        public void onServiceDisconnected(ComponentName name) {
            mBillingService = null;
        }

        @Override
        public void onServiceConnected(ComponentName name,
                                       IBinder service) {
            mBillingService = IPoyntInAppBillingService.Stub.asInterface(service);
            // enable button to test subscriptions
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    checkSubscriptionBtn.setVisibility(View.VISIBLE);
                }
            });
        }


~~~

<p>&nbsp;</p>

### 3.3: (_Optional_{:.italic}) Launch Merchant Billing Fragment

Implement getBillingIntent() method as follows:

~~~java

launchBillingFragment = (Button) findViewById(R.id.launchBillingFragment);
launchBillingFragment.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        if (mBillingService != null) {

            try {
                Bundle bundle = getBillingFragmentIntent();
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
                            logReceivedMessage("Failed to launch billing fragment!");
                        }
                    } else {
                        logReceivedMessage("Did not receive buy intent!");
                    }
                } else {
                    logReceivedMessage("Failed to obtain billing fragment intent!");
                }

            } catch (RemoteException e) {
                e.printStackTrace();
            }

        } else {
            Log.d(TAG, "NOT CONNECTED TO INAPP-BILLING");

        }
    }
});


    private Bundle getBillingFragmentIntent() throws RemoteException {
        Bundle bundle = new Bundle();
        // add plan Id
        // e.g: following uses a planID for a $5 plan
        bundle.putString("plan_id", "f636522e-d8a5-4be1-9d66-f6df6fada4a0");
        //e.g: following uses a planID for a $0 plan
        //bundle.putString("plan_id", "a36c8629-a252-496f-b431-e9301b8acda2");
        return mBillingService.getBillingIntent(getPackageName(), bundle);
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        // Check which request we're responding to
        if (requestCode == BUY_INTENT_REQUEST_CODE) {
            // Make sure the request was successful
            if (resultCode == RESULT_OK) {
                logReceivedMessage("Subscription request was successful - run Check Subscription to confirm!");
            } else if (resultCode == RESULT_CANCELED) {
                Log.d(TAG, "Result canceled");
                logReceivedMessage("Subscription request failed!");
            }
        }
    }

~~~


<p>&nbsp;</p>
## Billing flow sample (screenshots):
The base subscription below is a $0 plan. The "Check Subscription" initial call returns the plan for $0. When the merchant launches the Billing fragment through the "Launch Billing" flow, they are presented with an option to subscribe to a $5.00 plan. Towards the end, the merchant is able to validate both the $0 and $5 subscriptions.
<div>
<img src="{{site.url}}/developer/assets/InAppBilling1.jpg" alt="InAppBilling1" width="300" style="border:20px;margin:20px"><img src="{{site.url}}/developer/assets/InAppBilling2.jpg" alt="InAppBilling2" width="300" style="border:20px;margin:20px"><img src="{{site.url}}/developer/assets/InAppBilling3.jpg" alt="InAppBilling3" width="300" style="border:20px;margin:20px"><img src="{{site.url}}/developer/assets/InAppBilling8.jpg" alt="InAppBilling8" width="300" style="border:20px;margin:20px"><img src="{{site.url}}/developer/assets/InAppBilling7.jpg" alt="InAppBilling7" width="300" style="border:20px;margin:20px"><img src="{{site.url}}/developer/assets/InAppBilling5.jpg" alt="InAppBilling5" width="300" style="border:20px;margin:20px"><img src="{{site.url}}/developer/assets/InAppBilling6.jpg" alt="InAppBilling6" width="300" style="border:20px;margin:20px">
</div>
