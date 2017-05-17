---
layout: page
title: "Integration with Billing"
category: tut
date: 2017-05-11 07:05:00
---
## Overview
PoyntOS SDK provides an easy way for third party apps to provide In-App Billing services such as Subscriptions. This can be done on the terminal by implementing _IPoyntInAppBillingService_{:.italic} interface. To setup Merchant billing, you will need to first create Plans. Please reach out to Poynt developer support (dev-support@poynt.co) for this step. Poynt team will also help with initial activation of Subscriptions with the respective Plans.

<p>&nbsp;</p>

# Get Merchant Subscriptions
## Steps:
1. Modify android Manifest file (_AndroidManifest.xml_{:.italic})
2. Create a service that implements _IPoyntInAppBillingService_{:.italic}


<p>&nbsp;</p>
### Manifest file

Add the a permission `com.poynt.store.BILLING` to your manifest as follows:

~~~xml
...
<uses-permission android:name="com.poynt.store.BILLING" />
...
~~~
<p>&nbsp;</p>

### Gradle file
Add the following dependencies in your build.gradle file:
~~~xml

// Poynt SDK and Model Dependencies
compile 'co.poynt.api:android-api-model:<release-version>@jar'
compile 'co.poynt.android.sdk:poynt-sdk:<release-version>@aar'

~~~
NOTE: Please refer to [Release Notes](https://poynt.github.io/developer/ref/release-notes.html) for  most up-to-date release information.

<p>&nbsp;</p>

## Implementing IPoyntInAppBillingService interface
Your Android Service class needs to implement _IPoyntInAppBillingService_{:.italic} interface's **getSubscriptions()** method. This method returns all the Merchant subscriptions corresponding to the associated PlanID. In addition, Service class can implement **getBillingIntent()** method as well.

1. Define a Static field of type _ComponentName_{:.italic}. Create a new Service Connection.
2. Bind the Service in the _OnResume()_{:.italic} method. You may UnBind the service in the _OnPause()_{:.italic} method.


~~~java
public class MainActivity extends Activity {

    private static final String TAG = MainActivity.class.getSimpleName();
    private Button checkSubscriptionBtn;

    IPoyntInAppBillingService mBillingService;

    private static final ComponentName COMPONENT_POYNT_INAPP_BILLING_SERVICE = new ComponentName("com.poynt.store", "co.poynt.os.services.v1.IPoyntInAppBillingService");

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);




        checkSubscriptionBtn = (Button) findViewById(R.id.checkSubscriptionBtn);
        // hide it until we are connected to inapp billing service
//        checkSubscriptionBtn.setVisibility(GONE);
        checkSubscriptionBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (mBillingService != null) {
                    logReceivedMessage("Sending GetSubscriptions()");
                    checkSubscriptionStatus();
                } else {
                    Log.d(TAG, "NOT CONNECTED TO INAPP-BILLING");
                    logReceivedMessage("Not Connected to inApp Billing Service");
//                    checkSubscriptionBtn.setVisibility(GONE);
                }
            }
        });
    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == android.R.id.home) {
            finish();
        }
        return super.onOptionsItemSelected(item);
    }

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
            Log.d(TAG, "Disconnected from InAppBilling");
            mBillingService = null;
        }

        @Override
        public void onServiceConnected(ComponentName name,
                                       IBinder service) {
            Log.d(TAG, "Connected to InAppBilling");
            mBillingService = IPoyntInAppBillingService.Stub.asInterface(service);
            // enable button to test subscriptions
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    checkSubscriptionBtn.setVisibility(View.VISIBLE);
                }
            });
        }
    };

    }

    private void checkSubscriptionStatus() {
        try {
            if (mBillingService != null) {
                Log.d(TAG, "calling checkSubscriptionStatus()");
                String requestId = UUID.randomUUID().toString();
//                mBillingService.getBillingIntent()
                mBillingService.getSubscriptions(getApplicationContext().getPackageName(), requestId,
                        new IPoyntInAppBillingServiceListener.Stub() {
                            @Override
                            public void onResponse(final String resultJson, final PoyntError poyntError, String requestId)
                                    throws RemoteException {
                                Log.d(TAG, "Received response from InAppBillingService for " +
                                        "getSubscriptions(" + requestId + ")");
//                                Log.d(TAG, "response: " + resultJson);
                                if (poyntError != null) {
                                    Log.d(TAG, "poyntError: " + poyntError.toString());
                                }
                                runOnUiThread(new Runnable() {
                                    @Override
                                    public void run() {
                                        if (poyntError != null) {
                                            logReceivedMessage("Failed to obtain subscriptions: "
                                                    + poyntError.toString());
                                        } else {
                                            logReceivedMessage("Result for get subscriptions: "
                                                    + resultJson);
                                        }
                                    }
                                });
                            }
                        });

            } else {
                Log.e(TAG, "Not connected to InAppBillingService!");
            }
        } catch (RemoteException e) {
            e.printStackTrace();
        }
    }


    public void logReceivedMessage(final String message) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Log.d(TAG, "<< " + message + "\n\n");

            }
        });
    }

    private void clearLog() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {

            }
        });
    }

}

~~~
