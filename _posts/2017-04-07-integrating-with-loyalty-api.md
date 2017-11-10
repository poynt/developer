---
layout: page
title: "Building Loyalty Apps"
category: onterminal
date: 2011-04-07 07:05:00
---
## Overview
PoyntOS SDK provides an easy way for third party apps to register as a loyalty service on the terminal by implementing _IPoyntLoyaltyService_{:.italic} interface. The solution will work with any POS application that integrations with [Poynt Order API](https://poynt.com/docs/api/#orders-index) and/or [Poynt Order Service](https://poynt.github.io/developer/javadoc/co/poynt/os/services/v1/IPoyntOrderService.html) which is part of PoyntOS SDK.


## Integration Steps
1. Provide configuration (_loyalty_capability.xml_{:.italic})
2. Create a service that implements [IPoyntLoyaltyService](https://poynt.github.io/developer/javadoc/co/poynt/os/services/v1/IPoyntLoyaltyService.html)

## Loyalty Capability Configuration
This configuration file provides the necessary information for PoyntOS to discover and register this application as a loyalty provider when the app gets installed on the terminal.
{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<capability>
    <!-- app's package name serves as the identifier use by Poynt Capability
        manager to discover loyalty providers on the terminal-->
    <appid>com.sampleloyaltyapp</appid>
    <!-- capability supported by this app -->
    <type>LOYALTY</type>

    <!-- descriptive name of this capability. This name will show in Payment
      Fragment options menu-->
    <provider>Sample Loyalty</provider>
    <!-- not used currently -->
    <logo>@mipmap/ic_launcher</logo>

    <!--
        CUSTOM -> custom entry mode managed by capability
    -->
    <entry_method type="CUSTOM" />
</capability>
{% endhighlight %}

<p>&nbsp;</p>

This config file should be located in _res/xml_{:.italic} directory of your app and referenced from your app's manifest:

~~~xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.sampleloyaltyapp">

    <application
        android:name=".SampleLoyaltyApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
...
        <service
            android:name=".SampleLoyaltyService"
            android:enabled="true"
            android:exported="true">
            <!-- REQUIRED intent filter -->
            <intent-filter>
                <action android:name="co.poynt.os.services.v1.IPoyntLoyaltyService" />
            </intent-filter>

            <!-- REQUIRED to provide the location of the capability config file -->
            <meta-data
                android:name="co.poynt.os.service.capability"
                android:resource="@xml/loyalty_capability" />
            <!-- Optional: Provide a logo that will appear on screen (not implemented yet) -->
            <meta-data
                android:name="co.poynt.os.service.logo"
                android:resource="@mipmap/ic_launcher" />
        </service>
...
    </application>

</manifest>
~~~
<p>&nbsp;</p>

## Implementing IPoyntLoyaltyService interface
Your Android Service class needs to implement _IPoyntLoyaltyService_{:.italic} interface's **process()** method and after verifying that the **Payment** object has an **Order** perform one of the following steps:

1. Create a **Discount** object, update the **Order** object and call _loyaltyApplied(payment, requestId)_{:.italic} on the listener to return control back to the Payment Fragment
2. If discount cannot be applied call _noLoyaltyApplied(requestId)_{:.italic} on the listener
3. If additional input from merchant or customer is required (e.g. customer needs to check in, etc.), create an **Intent** and return it to the Payment Fragment using listener's _onLaunchActivity(intent, requestId)_{:.italic} callback. Payment Fragment will launch your activity using the intent provided.

~~~java
public class SampleLoyaltyService extends Service {
    private static final String TAG = SampleLoyaltyService.class.getSimpleName();

    public SampleLoyaltyService() {
    }

    @Override
    public IBinder onBind(Intent intent) {
        return mBinder;
    }

    private final IPoyntLoyaltyService.Stub mBinder = new IPoyntLoyaltyService.Stub() {

        @Override
        public void process(Payment payment,
                            String requestId,
                            IPoyntLoyaltyServiceListener iPoyntLoyaltyServiceListener)
                throws RemoteException {
            Log.d(TAG, "process(): " + payment);
            // add a discount to the order
            Order order = payment.getOrder();
            if (order != null) {


/*
                // uncomment this block if you want to apply discount without launching an activity
                // to collect additional input

                List<Discount> discounts = order.getDiscounts();
                if (discounts == null) {
                    discounts = new ArrayList<>();
                }
                Discount discount = new Discount();
                // add one dollar discount at order level
                // NOTE: discount amount is always negative
                discount.setAmount(-100l);
                discount.setCustomName("Loyalty Discount");
                discount.setProcessor(getPackageName());
                discounts.add(discount);
                order.setDiscounts(discounts);
                // discount total should be updated
                long discountTotal = order.getAmounts().getDiscountTotal() + discount.getAmount();
                order.getAmounts().setDiscountTotal(discountTotal);
                // update the over all total
                long orderTotal = order.getAmounts().getNetTotal();
                order.getAmounts().setNetTotal(orderTotal - 100l);
                payment.setAmount(orderTotal - 100l);
                Log.d(TAG, "Discount added to order: " + payment);
                iPoyntLoyaltyServiceListener.loyaltyApplied(payment, requestId);

*/

                // if you want to collect additional info before processing
                Intent intent = new Intent(Intents.ACTION_PROCESS_LOYALTY);
                intent.setComponent(new ComponentName(getPackageName(), MainActivity.class.getName()));
                intent.putExtra("payment", payment);
                iPoyntLoyaltyServiceListener.onLaunchActivity(intent, requestId);
            } else {
                Log.d(TAG, "No Discount added - order is required to add discounts");
                iPoyntLoyaltyServiceListener.noLoyaltyApplied(requestId);
            }


        }
    };
}
~~~

### Launching Activity to Collect Additional Input
If your loyalty app needs to perform an additional action such as collecting additional input from the customer or merchant, allowing merchant to select specific reward, etc, your service class should create an explicit **Intent** for Payment Fragment to launch your activity. You have to make sure you also pass the **Payment** object as an extra in the intent.

Below is a sample Activity which is launched by the Payment Fragment and just presents a button which applies a "$1 Discount" to the order.

<p>
 <div class="note"><strong>Important!</strong> You always have to set the result before exiting and activity and in the case when you apply a discount create <strong>Intent</strong> with the action <span style="font-style: italic">Intents.ACTION_PROCESS_LOYALTY_RESULT</span>
 </div>
</p>

~~~java
public class MainActivity extends Activity {

    private static final String TAG = MainActivity.class.getSimpleName();

    Payment payment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button addDiscount = (Button) findViewById(R.id.addDiscount);
        addDiscount.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                long discountAmount = 100l;
                List<Discount> discounts = payment.getOrder().getDiscounts();
                if (discounts == null) {
                    discounts = new ArrayList<>();
                }
                Discount discount = new Discount();
                // add one dollar discount at order level
                // NOTE: discount amount is always negative
                discount.setAmount(-1l * discountAmount);
                discount.setCustomName("Loyalty Discount");
                discount.setProcessor(getPackageName());
                discounts.add(discount);
                payment.getOrder().setDiscounts(discounts);
                // discount total should be updated
                long discountTotal = payment.getOrder().getAmounts().getDiscountTotal() + discount.getAmount();
                payment.getOrder().getAmounts().setDiscountTotal(discountTotal);
                // update the over all total
                long orderTotal = payment.getOrder().getAmounts().getNetTotal();
                if (orderTotal >= discountAmount) {
                    payment.getOrder().getAmounts().setNetTotal(orderTotal - discountAmount);
                    payment.setAmount(orderTotal - discountAmount);
                    Log.d(TAG, "Discount added to order: " + payment);
                    Intent result = new Intent(Intents.ACTION_PROCESS_LOYALTY_RESULT);
                    result.putExtra("payment", payment);
                    setResult(Activity.RESULT_OK, result);
                    finish();
                }else{
                    Toast.makeText(MainActivity.this, "Discount amount is larger than total", Toast.LENGTH_SHORT).show();
                    // It is important to set activity result before exiting
                    setResult(Activity.RESULT_CANCELED);
                    finish();
                }
            }
        });

        // Get the intent that started this activity
        Intent intent = getIntent();
        if (intent != null) {
            handleIntent(intent);
        } else {
            Log.e(TAG, "Loyalty activity launched with no intent!");
            setResult(Activity.RESULT_CANCELED);
            finish();
        }

        // If the customer is not checked in the activity can call IPoyntSecondScreenService
        // to display collect phone number, email or scan QR code screen to allow customer
        // to check in.
    }

    private void handleIntent(Intent intent) {
        String action = intent.getAction();

        if (Intents.ACTION_PROCESS_LOYALTY.equals(action)) {
            payment = intent.getParcelableExtra("payment");
            if (payment == null) {
                Log.e(TAG, "launched with no payment object");
                Intent result = new Intent(Intents.ACTION_PROCESS_LOYALTY_RESULT);
                setResult(Activity.RESULT_CANCELED, result);
                finish();
            } else {
                // add a discount to the order
                if (payment.getOrder() == null) {
                    Log.e(TAG, "launched with no order object");
                    Intent result = new Intent(Intents.ACTION_PROCESS_LOYALTY_RESULT);
                    setResult(Activity.RESULT_CANCELED, result);
                    finish();
                } else {
                    // wait till the Add discount is clicked
                }
            }
        } else {
            Log.e(TAG, "launched with unknown intent action");
            Intent result = new Intent(Intents.ACTION_PROCESS_LOYALTY_RESULT);
            setResult(Activity.RESULT_CANCELED, result);
            finish();
        }
    }
}
~~~

To review the the working sample loyalty app please refer to [PoyntSamples](https://github.com/poynt/PoyntSamples/tree/master/sampleloyaltyapp).


### Additional Info

If your loyalty application needs to get notified if the transactions was completed or canceled you can create a BroadcastReceiver and register to listen to `Intents.ACTION_TRANSACTION_COMPLETED` and `Intents.ACTION_PAYMENT_CANCELED`. The sample is available on [github](https://github.com/poynt/PoyntSamples/blob/develop/codesamples/src/main/java/co/poynt/samples/codesamples/receivers/MyBroadcastReceiver.java).
