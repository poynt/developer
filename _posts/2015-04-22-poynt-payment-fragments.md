---
layout: page
title: "Poynt Payment Fragments"
category: tut
date: 2015-04-22 18:48:17
---


Poynt Payment Fragments provide a secure and consistent payment experience for merchants and consumers across all applications running on Poynt Smart Terminals. Payment Fragments securely process payment transactions at the PoyntOS level, so your apps do not need to worry about handling the variety of payment methods, the payment process and compliance (e.g. PCI).

Currently the Payment Fragments support the following features:

1. Payments using different payment card interfaces (MSR, EMV, NFC, etc.)
2. Payments with Cash
3. Collect Tip, Receipt options, and Signature
4. Collect secure pin for Chip and Pin cards (EMV)
5. Multi-Tenders (aka split payments)
6. Keyed-in (manual) transactions.
7. Various payment actions - AUTHORIZE, CAPTURE, VOID, and REFUND
8. Non-referenced credits and auth only transactions

<center>
![Payment Fragment]({{site.url}}../assets/payment-fragment.png)
</center>

## Integrating with Payment Fragments

When an application need to collect a payment, it can launch the Payment Fragments using the Poynt Payment Activity. To launch the payment activity, you will have to create a simple Payment object and specify the total amount that needs to be collected, the currency and a reference ID. The Payment activity can be launched with the Payment object using the standard android 'startActivityForResult()' method. The Payment Activity will walk both the merchant and consumer through the payment flows (payment method entry and consumer authorization). Once a payment is successfully processed, the fragment returns an updated Payment object with the payment status and processed transaction including the redacted payment card info that you can use to display in your application.

```
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
```

To handle the response from the Payment Fragments, you would need to override the 'onActivityResult()' method and process the response.

```
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
```
