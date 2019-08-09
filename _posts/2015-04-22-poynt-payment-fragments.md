---
layout: page
title: "Poynt Payment Fragments"
category: overview
date: 2015-04-22 18:48:17
---


Poynt Payment Fragments provide a secure and consistent payment experience for merchants and consumers across all applications running on Poynt Smart Terminals. Payment Fragments securely process payment transactions at the PoyntOS level, so your apps do not need to worry about handling the variety of payment methods, the payment process and compliance (e.g. PCI).

Currently the Payment Fragments support the following features:

1. Payments using different payment card interfaces (MSR, EMV, NFC, etc.)
2. Payments with Cash
3. Collect Tip, Receipt options, and Signature
4. Collect secure pin for Chip and Pin cards (EMV)
5. Multi-Tenders (aka split payments)
6. Non-referenced credits and auth only transactions

{: .center}
![Payment Fragment]({{site.url}}/developer/assets/payment-fragment2.png)

## Integrating with Payment Fragments

When an application need to collect a payment, it can launch the Payment Fragments using the Poynt Payment Activity. To launch the payment activity, you will have to create a Payment object and specify the total amount that needs to be collected, the currency and an optional reference ID. The Payment activity has to be launched with the Payment object using the standard android 'startActivityForResult()' method. The Payment Activity will walk both the merchant and consumer through the payment flows (payment method entry and consumer authorization). Once a payment is successfully processed, the fragment returns an updated Payment object with the payment status and processed transaction including the redacted payment card info that you can use to display in your application.

~~~java
    Payment payment = new Payment();
    String referenceId = UUID.randomUUID().toString();
    payment.setReferenceId(referenceId);
    payment.setAmount(amount);
    payment.setCurrency(currencyCode);

    // start Payment activity for result
    try {
        Intent collectPaymentIntent = new Intent(Intents.ACTION_COLLECT_PAYMENT);
        collectPaymentIntent.putExtra(Intents.INTENT_EXTRAS_PAYMENT, payment);
        startActivityForResult(collectPaymentIntent, COLLECT_PAYMENT_REQUEST);
    } catch (ActivityNotFoundException ex) {
        Log.e(TAG, "Poynt Payment Activity not found - did you install PoyntServices?", ex);
    }
~~~

To handle the response from the Payment Fragments, you would need to override the 'onActivityResult()' method and process the response.

~~~java
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        // Check which request we're responding to
        if (requestCode == COLLECT_PAYMENT_REQUEST) {
            // Make sure the request was successful
            if (resultCode == Activity.RESULT_OK) {
                if (data != null) {
                    Payment payment = data.getParcelableExtra(Intents.INTENT_EXTRAS_PAYMENT);
                    Log.d(TAG, "Received onPaymentAction from PaymentFragment w/ Status("
                            + payment.getStatus() + ")");
                    if (payment.getStatus().equals(PaymentStatus.COMPLETED)) {
                        Toast.makeText(this, "Payment Completed", Toast.LENGTH_LONG).show();
                    } else if (payment.getStatus().equals(PaymentStatus.AUTHORIZED)) {
                        Toast.makeText(this, "Payment Authorized", Toast.LENGTH_LONG).show();
                    } else if (payment.getStatus().equals(PaymentStatus.CANCELED)) {
                        Toast.makeText(this, "Payment Canceled", Toast.LENGTH_LONG).show();
                    } else if (payment.getStatus().equals(PaymentStatus.FAILED)) {
                        Toast.makeText(this, "Payment Failed", Toast.LENGTH_LONG).show();
                    } else if (payment.getStatus().equals(PaymentStatus.REFUNDED)) {
                        Toast.makeText(this, "Payment Refunded", Toast.LENGTH_LONG).show();
                    } else if (payment.getStatus().equals(PaymentStatus.VOIDED)) {
                        Toast.makeText(this, "Payment Voided", Toast.LENGTH_LONG).show();
                    } else {
                        Toast.makeText(this, "Payment Completed", Toast.LENGTH_LONG).show();
                    }
                }
            } else if (resultCode == Activity.RESULT_CANCELED) {
                Toast.makeText(this, "Payment Canceled", Toast.LENGTH_LONG).show();
            }
        }
    }
~~~
<p>&nbsp;</p>


## Parameters

_Payment_{:.italic} object contains a number of parameters that allows developers to configure the payment experience:

**cashbackAmount**  _(long)_{:.italic} - Presets the cash back amount when customer pays by debit  

**tipAmount** _(long)_{:.italic} - Presets the tip amount. The tip selection screen will be skipped

**tipAmounts** _(Map)_{:.italic} - set by the Payment Fragment and contains the mapping between transactionId and tip amount. In case of a multi-tender transaction, tip can be left on more than one transaction. You should always look at the tipAmount in `Transaction.amounts.tipAmount` and use `tipAmounts` map as a fall back.

**references** _(List\<TransactionReferences\>)_{:.italic} - Allows the application to pass custom reference information, such as custom order id and other metadata. This list is returned inside Transaction object once the payment is completed

**multiTender** _(boolean)_{:.italic} - starts the payment fragment in the multiTender mode which allows the buyer to pay using 2 or more tenders

**authzOnly** _(boolean)_{:.italic} - indicates that this is a pre-auth transaction that will not be part of the open settlement batch until it is captured;

**orderId** _(String)_{:.italic} - the id of the Order object which has already been created or will be created after the payment. Having an Order object allow Payment Fragment to display item details and sends the itemized email receipt if the customer chooses to get an email receipt.

**order** _(Order)_{:.italic} - including Order object allows Payment Fragment to print itemized receipt if the customer chooses paper receipt option

**nonReferencedCredit** _(boolean)_{:.italic} - setting this flag will allow merchant to issue a credit to a card without having a prior sale. This is a high risk permission and typically merchant has to be enabled by the acquirer to issue non-refeenced credits.

**disableDebit** _(boolean)_{:.italic} - disables debit card option

**disableCheck** _(boolean)_{:.italic} - disables check option

**disableOther** _(boolean)_{:.italic} - disables "other" option

**disableManual** _(boolean)_{:.italic} - disables manual entry

**disableEMVCT** _(boolean)_{:.italic} - disables EMV (chip card) payment

**disableEMVCL** _(boolean)_{:.italic} - disables contactless payments

**disableMSR** _(boolean)_{:.italic} - disables payments with magstripe cards

**disableCash** _(boolean)_{:.italic} - disables cash option

**disableTip** _(boolean)_{:.italic} - disables tip if the merchant account is configured to present tip screen.

**disableChangeAmount** _(boolean)_{:.italic} - if the payment fragment is invoked to perform refund or capture, setting this flag to "true" will not allow the merchant to edit the amount, i.e. no partial capture or partial refund.

**notes** _(String)_{:.italic} - custom note which will be added to the transaction

**cashOnly** _(boolean)_{:.italic} - launches Payment Fragment directly into the cash flow

**debitOnly** _(boolean)_{:.italic} - only allow debit card payment

**creditOnly** _(boolean)_{:.italic} - only allow payment by credit

**skipReceiptScreen** _(boolean)_{:.italic} - do not show the receipt screen

**skipSignatureScreen** _(boolean)_{:.italic} - do not show signature screen

**skipPaymentConfirmationScreen** _(boolean)_{:.italic} - Displays processing screen as opposed to Thank you screen after a payment is complete.

**manualEntry** _(boolean)_{:.italic} - launch Payment Fragment into manual card entry flow

**readCardDataOnly** _(boolean)_{:.italic} - do not process transaction just return some information about the card (e.g. last 4, first 6, name)

**offlineAuth** _(boolean)_{:.italic} - process offline transaction. Can be used if there is no network connectivity. Merchant will be prompted to provide an approval code they obtained from the issuing bank.

**offlineApprovalCode** _(String)_{:.italic} - optionally the approval code can be passed in the request to launch Payment Fragment.

**disablePaymentOptions** _(boolean)_{:.italic} - hide the "Summary", "Notes" and "Receipt" options from the Payment Fragment.

<p>&nbsp;</p>

## <a name="post-payment-actions"></a>Post-Payment Actions

Once a payment has been processed often times it's required to provide the merchants ability to execute different actions on the processed payments. These include payment actions like void, capture, refund, and get details, which are provided by Payment Fragments through "DISPLAY_PAYMENT" intent.

~~~java
    // start Payment activity to display transaction details
    try {
        Intent displayPaymentIntent = new Intent(Intents.ACTION_DISPLAY_PAYMENT);
        displayPaymentIntent.putExtra(Intents.INTENT_EXTRAS_TRANSACTION_ID, transactionId);
        startActivityForResult(displayPaymentIntent, DISPLAY_PAYMENT_REQUEST);
    } catch (ActivityNotFoundException ex) {
        Log.e(TAG, "Poynt Payment Activity not found - did you install PoyntServices?", ex);
    }
~~~

This will launch Poynt Payment Activity to display the details of the payment along with allowed actions (void, capture, refund) based on it's current status.

{: .center}
![Payment Fragment]({{site.url}}/developer/assets/payment-details.png)

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>

<script language="javascript">
window.location="https://poynt.github.io/developer-docs/terminalApps/payment-fragment.html#overview"
</script>
