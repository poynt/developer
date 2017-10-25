---
layout: page
title: "Integrating Gift Cards and Custom Tenders"
category: tut
date: 2014-04-07 07:09:00
---

## Overview

PoyntOS architecture provides an extensible way to add new payment methods (custom tenders). This document describes how a developer can build a custom transaction processor by implemeting [IPoyntTransactionService](https://poynt.github.io/developer/javadoc/co/poynt/os/services/v1/IPoyntTransactionService.html) interface to create a gift card app for Poynt. While the scope of this document is to address integration with gift card providers this interface can be used to implement Loyalty, Discount or any other type of service that can create a custom tender transaction.

[PoyntSamples app](https://github.com/poynt/PoyntSamples) has a sample implementation of a custom transaction processor.

On a traditional terminal, a merchant would need to select a gift card option before swiping a gift card. Poynt Payment Fragment automatically determines whether or not the swiped card is a gift card based on it's BIN range and routes the transaction to the custom transaction processor. In addition, based on the configuration of the custom transaction processor you can add a button in the payment options screen of the payment fragment to process a non-swipe input (e.g. scan QR code, manually input gift card number, coupon code, etc).

## Integration Steps
1. Create a service that implements [IPoyntTransactionService](https://poynt.github.io/developer/javadoc/co/poynt/os/services/v1/IPoyntTransactionService.html)
2. Specify configuration in *giftcard_transaction_capabilities.xml*{:.italic}
3. Updating card reader configuration on the terminal.
<div class="note"> <strong>Note:</strong> By default Poynt card reader encrypts all track data irrespective of card BIN range. To turn off encrypting track data, please refer to <a href="https://github.com/poynt/PoyntSamples/blob/master/samplegiftcardprocessor/src/main/java/co/poynt/samplegiftcardprocessor/MainActivity.java#L60">this code example</a>. Please note that this setting will not apply to cards that start with BIN ranges reserved by <a href="https://en.wikipedia.org/wiki/Payment_card_number#Issuer_identification_number_.28IIN.29">payment card brands</a>.</div>
<p>&nbsp;</p><p>&nbsp;</p>

## Transaction Capabilities Configuration
This configuration file specifies entry methods and the BIN range of the payment cards supported by your application.

{% highlight xml lineos %}
<!-- giftcard_transaction_capabilities.xml -->
<?xml version="1.0" encoding="utf-8"?>
<capability>
    <!-- Special App ID for Transaction Processing-->
    <!-- has to match your app's package name -->
    <appid>co.poynt.samplegiftcardprocessor</appid>

    <!-- required element, do not remove -->
    <type>TRANSACTION</type>

    <!-- descriptive name of this capability -->
    <!-- this is how your option will show up in Payment Fragment payment options -->
    <provider>My Gift Card</provider>

    <!-- currently not used -->
    <logo>@drawable/ic_launcher</logo>

    <!-- entry method could be one of the following
        CARDREAD -> to support card swipe. card data will be directly passed to this capability provider.
        CUSTOM -> allows your app to launch its own Activity from the Payment Flow to support other entry methods such as
                  manual input form, scanning QR code, etc.
    -->

    <!-- value is a first6 digits of card number also referred to as binrange.
        value >=601056 && value <= 601056 -->
    <!-- for eval expression definition please refer to https://github.com/uklimaschewski/EvalEx -->

    <!-- Any card swiped on the terminal which has the first 6 digits fall between 700000 and 736014
        will be processed by your application. All standard payment cards will still be processed by the default
        transaction service irrespective of this BIN range
    -->
    <entry_method
        eval="value &lt;= 736014 &amp;&amp; value &gt;=  700000"
        type="CARDREAD" />
    <!-- declaring support for "CUSTOM" will add a button in payment options of the Payment Fragment
         pressing the button will call your transaction service directly.
    -->
    <entry_method type="CUSTOM" />
</capability>
{% endhighlight %}

This config file should be located in _res/xml_{:.italic} directory of your app and referenced from your app's manifest:

{% highlight xml lineos %}
<!-- snippet of AndroidManifest.xml -->
...
  <service
      android:name=".MyGiftCardTransactionProcessorService"
      android:exported="true">
      <intent-filter>
          <action android:name="co.poynt.os.services.v1.IPoyntTransactionService" />
      </intent-filter>

      <!-- additional configuration -->
      <meta-data
          android:name="co.poynt.os.service.capability"
          android:resource="@xml/giftcard_transaction_capabilities" />
  </service>
...
{% endhighlight %}

**Note:** The value of _\<provider\>_{:.italic} element shows in payment options:<br/>
![Create Cloud Application]({{site.url}}/developer/assets/giftcardpaymentoption.png){:height="460" width="500"}

## Implementing IPoyntTransactionService interface
IPoyntTransactionService has a number of methods. The only ones that need to be implemented are in bold below:

1. Create a Service class that implements _IPoyntTransactionService.Stub_{:.italic} class and returns it from _onBind_{:.italic}
2. Override **processTransaction()** to handle SALE, and REFUND (referenced and non-referenced) requests.  Please note that the Transaction object you receive here will carry unencrypted track data.  
3. Override **captureTransaction()** to capture an AUTH. If your backend API does not follow auth/capture paradigm, this method does not need to be implemented.
4. Override **voidTransaction()** to void an AUTH. If your backend API does not follow auth/capture paradigm, this method does not need to be implemented.
5. Override **reverseTransaction()** to void/reverse any transaction (SALE, CAPTURE, REFUND or even an AUTH).  Note: reverseTransaction() on an AUTH is the same as voidTransaction() on an AUTH.  A reverseTransaction() gets called when the Poynt Payment Fragment/Card Reader is unable to complete the transaction. This could happen:
    - when an Online Authorization request (processTransaction) has timed out
    - merchant hit CANCEL button in the payment fragment before transaction got processed
6. Override **updateTransaction()** to adjust an AUTH or SALE transactions (e.g. to add tip or even adjust the base amount). If your service does not support auth/sale adjustment, return a PoyntError.
7. Override **getTransaction()** to return the details about the transactions
8. _captureEMVData()_{:.italic} is not used.
9. _checkCard()_{:.italic} should not be used.
10. _captureAllTransactions()_{:.italic} is currently not used in the Terminal but will be used in the future to request capturing all previously authorized (and still valid) transactions.
11. _createTransaction()_{:.italic} is not currently used
12. _saveTransaction()_{:.italic} is not currently used

<p><div class="warning"><strong>Please note</strong> that all API calls MUST respond with the corresponding callbacks - not doing so could cause bad user experiences with Payment Fragment waiting for a response from your processor for ever</div></p>

 _IPoyntTransactionServiceListener_{:.italic} callbacks:

1. **onResponse(Transaction, RequestId, PoyntError)** - processed transaction object otherwise an error indicating why the transaction couldn't be processed. See below for information on what must be loaded in the processed Transaction object. Note that a processed transaction could be approved or declined.
2. **onLoginRequired()** - if your transaction processor determines that the merchant session has timed out. This usually happens when your JWT expires.
3. **onLaunchActivity(Intent, requestId)** - use this callback when you need to collect additional information that is not collected by Poynt Payment Fragments - eg. zip code or cvv. The Intent must carry whatever information you would need to handle UI/UX based on your needs. This intent will be launched as an Activity with result. So it is important that you return a result with 3 Parcelable extras containing "transaction", "payment" and "error". The "transaction" object contains the processed transaction as you would otherwise return in onResponse() callback, "payment" object if you've update the payment object based on additional data that you've collected, and "error" if the transaction has failed. Use this callback to implement support for manual entry.
<p><div class="note"><strong>Tip:</strong> Setting <span style="font-style: italic">Transaction.setSignatureCaptured(false)</span> will skip the signature screen if you don't need to collect signature.</div></p>

### Handling SALE Request
When a gift card is swiped on a Poynt terminal, PoyntOS will call **processTransaction()** of your transaction service and pass a Transaction object like the one below:

{% highlight json lineos %}
{
    "action": "SALE",
    "amounts": {
        "currency": "USD",
        "orderAmount": 5200,
        "tipAmount": 0,
        "transactionAmount": 5200
    },
    "authOnly": false,
    "fundingSource": {
        "card": {
            "numberFirst6": "197610",
            "numberLast4": "8554",
            "track1data": "B1976100999009668554^GETI^10010000000000000",
            "track2data": "1976100999009668554=10010000000000000",
            "track3data": ""
        },
        "emvData": {
            "emvTags": {
                "0xD3": "",
                "0xD2": "313937363130303939393030393636383535343d3130303130303030303030303030303030",
                "0xD1": "42313937363130303939393030393636383535345e474554495e3130303130303030303030303030303030"
            }
        },
        "entryDetails": {
            "customerPresenceStatus": "PRESENT",
            "entryMode": "TRACK_DATA_FROM_MAGSTRIPE"
        },
        "type": "CUSTOM_FUNDING_SOURCE"
    },
    "references": [
        {
            "customType": "referenceId",
            "id": "65422c59-0158-1000-ca4c-d43b0932f8ff",
            "type": "CUSTOM"
        }
    ],
    "signatureCaptured": true
}
{% endhighlight %}

Here's the logic you should use to determine if a merchant swiped a card:
{% highlight java lineos %}
@Override
public void processTransaction(final Transaction transaction, final String requestId,
  final IPoyntTransactionServiceListener listener) throws RemoteException {
    if (transaction.getAction() == TransactionAction.SALE && transaction.getFundingSource().getCard() != null){
        // this is a card swipe
    }
    //...
}
{% endhighlight %}

Returning the response to Payment Fragment:

{% highlight java lineos %}
// Updating Transaction object inside processTransaction

      // your code to call the gift card processor
      // always make sure we set ID, created_at and updated_at time stamps

      // This is the id used to identify this transaction in the Poynt system
      // It is always a UUID.
      if (transaction.getId() == null) {
          transaction.setId(UUID.randomUUID());
      }
      if (transaction.getCreatedAt() == null) {
          transaction.setCreatedAt(Calendar.getInstance());
      }
      if (transaction.getUpdatedAt() == null) {
          transaction.setUpdatedAt(Calendar.getInstance());
      }


      ProcessorResponse processorResponse = new ProcessorResponse();

      // SALE transactions should have status CAPTURED
      transaction.setStatus(TransactionStatus.CAPTURED);
      // This is the processor's transaction id
      processorResponse.setTransactionId(processorTransactionId);
      // If you would like processor transaction id (or any other field) be returned in refund requests
      // you should set it as a transaction reference
      // make sure you don't store any sensitive information as a reference (like gift card number, etc.)
      TransactionReference processorTxnIdReference = new TransactionReference();
      processorTxnIdReference.setType(TransactionReferenceType.CUSTOM);
      processorTxnIdReference.setCustomType("processorTransactionId");
      processorTxnIdReference.setId(processorTransactionId);
      transaction.setReferences(Collections.singletonList(processorTxnIdReference));
      CustomFundingSource customFundingSource = transaction.getFundingSource().getCustomFundingSource();
      if (customFundingSource == null) {
          customFundingSource = new CustomFundingSource();
      }
      // set the type of the custom funding source
      customFundingSource.setType(CustomFundingSourceType.GIFT_CARD);
      // This is the tender name that will show up in Transaction List on the terminal
      customFundingSource.setName("GIFT CARD");
      // optional processor's account identifier
      customFundingSource.setAccountId("1234567890");
      // it's important to set this to your app's package name
      // if not set, refund requests will not be routed to your transaction service and will fail
      customFundingSource.setProcessor("co.poynt.samplegiftcardprocessor");
      // processorName is the name of the gift card provider
      customFundingSource.setProvider(processorName);
      customFundingSource.setDescription("My giftcard");
      transaction.getFundingSource().setCustomFundingSource(customFundingSource);

      processorResponse.setStatus(ProcessorStatus.Successful);
      // processor internal approval code and status code (if applicable)
      processorResponse.setApprovalCode("123456");
      processorResponse.setStatusCode("200");

      // if transaction is fully approved
      long approvedAmount = transaction.getAmounts().getTransactionAmount();
      processorResponse.setApprovedAmount(approvedAmount);
      // if the remaining balance is provided it will be printed on the receipt.
      processorResponse.setRemainingBalance(200L);
      transaction.getAmounts().setOrderAmount(approvedAmount);
      transaction.getAmounts().setTransactionAmount(approvedAmount);

      processorResponse.setStatusMessage("Approved");
      transaction.setProcessorResponse(processorResponse);

      // if you don't need to capture signature for this transaction
      transaction.setSignatureCaptured(false);

      try {
          // return transaction to Payment Fragment
          listener.onResponse(transaction, requestId, null);
      } catch (RemoteException e) {
          e.printStackTrace();
          PoyntError poyntError = new PoyntError();
          poyntError.setCode(PoyntError.CARD_DECLINE);
          try {
              listener.onResponse(transaction, requestId, poyntError);
          } catch (RemoteException e1) {
              e1.printStackTrace();
          }
      }

{% endhighlight %}

#### Implementing Partial Approval
Implementing partial approval requires only changing a few lines of code:
{% highlight java lineos %}

// This will approve half of the requested amount
long approvedAmount = transaction.getAmounts().getTransactionAmount()/2;
processorResponse.setApprovedAmount(approvedAmount);
transaction.getAmounts().setOrderAmount(approvedAmount);
transaction.getAmounts().setTransactionAmount(approvedAmount);
{% endhighlight %}

### Handling Refund Request
To determine if the merchant has performed a refund action you need to perform the following check:
{% highlight java lineos %}
@Override
public void processTransaction(final Transaction transaction, final String requestId,
  final IPoyntTransactionServiceListener listener) throws RemoteException {
    if (transaction.getAction() == TransactionAction.REFUND) {
        // this is a refund request
    }
    // ...
}
{% endhighlight %}

Here's an example Transaction object passed as an argument to **processTransaction** in a refund use case.

{% highlight json lineos %}
{
    "action": "REFUND",
    "amounts": {
        "cashbackAmount": 0,
        "currency": "USD",
        "orderAmount": 2000,
        "tipAmount": 0,
        "transactionAmount": 2000
    },
    "createdAt": {
        "year": 2016,
        "month": 10,
        "dayOfMonth": 8,
        "hourOfDay": 13,
        "minute": 39,
        "second": 18
    },
    "fundingSource": {
        "card": {
            "numberFirst6": "197610",
            "numberLast4": "1505"
        },
        "customFundingSource": {
            "accountId": "1234567890",
            "processor": "co.poynt.samplegiftcardprocessor",
            "provider": "My Gift Card Provider",
            "type": "GIFT_CARD"
        },
        "type": "CUSTOM_FUNDING_SOURCE"
    },
    "id": "45e17262-0158-1000-444f-3876cfd6af03",
    "parentId": "69b65396-3994-4ec4-bc87-89b3a4b88939",
    "processorResponse": {
        "status": "Successful",
        "statusCode": "1",
        "transactionId": "45e17262-0158-1000-444f-3876cfd6af03"
    },
    "references": [
        {
            "customType": "processorTransactionId",
            "id": "d430d1c8-d960-4c3f-b645-4df7e5bb1957",
            "type": "CUSTOM"
        }
    ],
    "status": "REFUNDED",
    "updatedAt": {
        "year": 2016,
        "month": 10,
        "dayOfMonth": 8,
        "hourOfDay": 13,
        "minute": 39,
        "second": 18
    }
}
{% endhighlight %}

<p><div class="note"><strong>Note</strong> that this is <strong>not</strong> the original sale transaction, but rather a Transaction object that needs to be updated by your transaction service once the refund is processed. Poynt transaction id of the original sale is referenced as the value of <strong>parentId</strong> in the Transaction object.</div></p>

As you can see, the Refund transaction object contains all references (i.e. <strong>processorTransactionId</strong>) set during processing the SALE transaction. You can use that id to look up which transaction needs to be refunded on your backend.

After you perform the refund by calling your backend, you need to create ProcessorResponse, updating the Transaction object and return it using **listener.onResponse** callback.

{% highlight java lineos %}
// add processor response
transaction.setStatus(TransactionStatus.REFUNDED);
// refund transaction id used by gift card provider's backend.
processorResponse.setTransactionId("1234567890");
processorResponse.setStatus(ProcessorStatus.Successful);
processorResponse.setApprovalCode("123456");
processorResponse.setStatusCode("200");
processorResponse.setApprovedAmount(transaction.getAmounts().getTransactionAmount());
processorResponse.setStatusMessage("Approved");
transaction.setProcessorResponse(processorResponse);
{% endhighlight %}

#### Linking Refund request to Original Sale
If you need to store a reference id (e.g. processor transaction id, invoice id, etc.) to facilitate linking the refund REFUND to the original SALE you can do that by adding your own reference id to the Transaction object when processing the SALE:
{% highlight java lineos %}
// 'transaction' is the Transaction object passed into processTransaction() of your transaction service during the sale
List<TransactionReference> references = transaction.getReferences();
if (references == null) { references = new ArrayList<>(); }
TransactionReference reference = new TransactionReference();
reference.setType(TransactionReferenceType.CUSTOM);
// set the name of your custom value
reference.setCustomType("my_processor_transaction_id");
reference.setId("1234567890");
references.add(reference);
{% endhighlight %}

#### Partial Refund
Payment Fragment UI allows merchant to specify a partial refund amount. <br/>
![Partial Refund Flow]({{site.url}}/developer/assets/partialRefundFlow.png){:height="312" width="800"}<br/>
If your gift card service does not support partial refunds and you determine that the amount passed in the refund request does not match the sale amount, you will need to return a PoyntError to the listener.

### Manual Entry
In addition, to a card swipe entry method, you may need to support other entry methods like scanning QR code or entering card number manually. This can be accomplished by adding "CUSTOM" entry method in the capabilities configuration file (please refer to the Transaction Capabilities Configuration section of this document). Adding this entry method will add a new payment option button in the Payment Fragment payment options menu.

When that button is pressed, Payment Fragment will call **processTransaction** of your transaction service and pass a Transaction object:
{% highlight json lineos %}
{
    "action": "SALE",
    "amounts": {
        "currency": "USD",
        "orderAmount": 5000,
        "tipAmount": 0,
        "transactionAmount": 5000
    },
    "fundingSource": {
        "customFundingSource": {
            "accountId": "6642d2c7-0158-1000-5c07-6753468a5859",
            "provider": "Poynt",
            "type": "OTHER"
        },
        "type": "CUSTOM_FUNDING_SOURCE"
    },
    "id": "6642d2c7-0158-1000-5c07-6753468a5859",
    "references": [
        {
            "customType": "referenceId",
            "id": "6642c34c-0158-1000-5c07-6753468a5859",
            "type": "CUSTOM"
        }
    ],
}
{% endhighlight %}
<p>
  <div class="note"><strong>Note</strong> that the Transaction object does not have a nested Card object inside it's FundingSource.
  </div>
</p>

Here's how you can determine if the merchant initiated the transaction by pressing your custom button in payment options menu of the Payment Fragment:
{% highlight java lineos %}
@Override
public void processTransaction(final Transaction transaction, final String requestId,
  final IPoyntTransactionServiceListener listener) throws RemoteException {
    if (transaction.getAction() == TransactionAction.SALE && transaction.getFundingSource().getCard() == null) {
        // this is a sale request initiated by pressing the custom button in payment options menu of the Payment Fragment

        // Instruct the Payment Fragment to launch your custom activity.
        // Assuming your app has a PaymentActivity class that listens to the following intent
        Intent paymentActivity = new Intent("COLLECT_CUSTOM_PAYMENT");
        paymentActivity.setComponent(new ComponentName(getPackageName(), PaymentActivity.class.getName()));
        paymentActivity.putExtra("transaction", transaction);
        listener.onLaunchActivity(paymentActivity, requestId);
    }
    // ...
}
{% endhighlight %}

Once your activity finished collecting additional information it should call your transaction service to process the request and get the updated Transaction object back. Your Activity should finish by creating the following intent:
{% highlight java lineos %}
Intent result = new Intent(Intents.ACTION_COLLECT_PAYMENT_RESULT);
result.putExtra("transaction", transaction);
result.putExtra("error", error);
setResult(Activity.RESULT_OK, result);
finish();
{% endhighlight %}
<p>&nbsp;</p>
This sequence diagram explains the manual entry flow from start to finish:<br/>
![Manual Entry Sequence Diagram]({{site.url}}/developer/assets/giftcard_manual_entry.png)<br/>
<p>&nbsp;</p>

## Activating, Reloading, Checking Balance of a Card
In order to be able to activate, reload or check balance of a gift card your application needs to be able to read card's track data. This can be accomplished by launching the Payment Fragment with a _readCardData_{:.italic} only flag.

You need to include the following code in your Activity:
{% highlight java lineos %}
private void launchPoyntPayment() {
    Locale locale = new Locale("en", "US");
    String currencyCode = NumberFormat.getCurrencyInstance(locale).getCurrency().getCurrencyCode();

    Payment payment = new Payment();
    String referenceId = UUID.randomUUID().toString();
    payment.setReferenceId(referenceId);
    payment.setCurrency(currencyCode);
    // the flag that tells Payment Fragment to read card data only and not attempt a transaction
    payment.setReadCardDataOnly(true);

    // start Payment activity for result
    try {
        Intent collectPaymentIntent = new Intent(Intents.ACTION_COLLECT_PAYMENT);
        collectPaymentIntent.putExtra(Intents.INTENT_EXTRAS_PAYMENT, payment);
        startActivityForResult(collectPaymentIntent, COLLECT_PAYMENT_REQUEST);
    } catch (ActivityNotFoundException ex) {
        Log.e("ConfigurationTest", "Poynt Payment Activity not found - did you install PoyntServices?", ex);
    }
}

@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (resultCode == Activity.RESULT_OK) {
        if (data != null) {
            Payment payment = data.getParcelableExtra(Intents.INTENT_EXTRAS_PAYMENT);
            Log.d("ConfigurationTest", "Received onPaymentAction from PaymentFragment w/ Status:" + payment.getStatus());

            if (payment.getTransactions() != null && payment.getTransactions().size() > 0) {
                Transaction transaction = payment.getTransactions().get(0);
                Log.d(TAG, "READ CARD DATA: " + new Gson().toJson(transaction, transactionType));
            }
        }
    } else if (resultCode == Activity.RESULT_CANCELED) {
        // prompt merchant to re-swipe
    }
}
{% endhighlight %}

Note that when Payment Fragment comes up and it has no amount and operation type is displayed as READ CARD.<br/>
![READ CARD Operation]({{site.url}}/developer/assets/READCARD1.png){:height="640" width="400"}<br/>

Transaction Object returned after readCardOnly operation:
{% highlight json lineos %}
{
    "action": "SALE",
    "amounts": {
        "currency": "USD",
        "orderAmount": 0,
        "tipAmount": 0,
        "transactionAmount": 0
    },
    "authOnly": false,
    "fundingSource": {
        "card": {
            "numberFirst6": "197610",
            "numberLast4": "8554",
            "track1data": "B1976100999009668554^GETI^10010000000000000",
            "track2data": "1976100999009668554=10010000000000000"
            "track3data": ""
        },
        "emvData": {
            "emvTags": {
                "0xD3": "",
                "0xD2": "313937363130303939393030393636383535343d3130303130303030303030303030303030",
                "0xD1": "42313937363130303939393030393636383535345e474554495e3130303130303030303030303030303030"
            }
        },
        "entryDetails": {
            "customerPresenceStatus": "PRESENT",
            "entryMode": "TRACK_DATA_FROM_MAGSTRIPE"
        },
        "type": "CUSTOM_FUNDING_SOURCE"
    },
    "references": [
        {
            "customType": "referenceId",
            "id": "7a7b98a2-efc6-4623-8e85-39a0ab7aeb07",
            "type": "CUSTOM"
        }
    ]
}
{% endhighlight %}

## Error Handling
In case of a failure other than processor decline, your transaction should return a PoyntError to the listener. Below is a list of applicable error codes that can be set by your application.

~~~
CODE_NETWORK_UNAVAILABLE
CODE_NETWORK_ERROR
CODE_NETWORK_CONNECTION_TIMEOUT
CODE_NETWORK_READ_TIMEOUT
CODE_UNAUTHORIZED
CODE_API_ERROR
CODE_API_SERVICE_NOT_AVAILABLE
CODE_LOST_CONNECTION_WITH_SERVICE
CODE_BAD_PARAMETER_PASSED
CARD_DECLINE
CARD_CANCELED
CODE_UNEXPECTED_EXCEPTION
~~~
