---
layout: page
title: "Integrating Payment Bridge API"
category: semi
date: 2016-04-01 13:05:00
---

Payment Bridge API provides a way for external systems (e.g. web-based point-of-sale systems) to start a transaction flow on Poynt Terminal without requiring to build any apps/services that have to run on the terminal itself.

Here is how it works:

1. External System [sends a Poynt Cloud Message](../onterminal/poynt-cloud-messages.html) with a payment request containing business id, store id and optionally terminal id of the merchant
2. Poynt Cloud authorizes the caller and routes the message to the corresponding merchant terminal(s)
3. Poynt Payment Bridge receives the incoming message and starts the necessary payment flows on the device.

### Prerequites:

1. [Create a developer account and activate your developer terminal](../setup/activate-poynt-terminal.html). (Note: if you don't have a developer unit you can use [emulator](../setup/setup-poyntos.html))
2. Create an app and make sure it has "Cloud Messages" WRITE permission
3. Use "Merchant Login Url" of your app to [Authorize one of your test merchants](../cloud/integrating-with-poynt-cloud-apis.html)

### Payment Bridge Sequence Diagram

![PaymentBridgeSequenceDiagram]({{site.url}}/developer/assets/PaymentBridgeAPI.png)

### Poynt Message format

e.g. `{"ttl": 500, "businessId": "d9f90edd-53d0-49ed-9589-22d92b9bfda4", "storeId": "8a545d2b-e5d8-4cf0-b766-0fe32870813b", "deviceId": "urn:tid:9a645d2b-e3c8-7cf0-d766-9fe32870813b", "data": "{\"action\":\"sale\", \"purchaseAmount\": 1000, \"tipAmount\": 100, \"currency\":\"USD\", \"referenceId\":\"ABC1234\"}"}`

* **storeId** and **businessId** of the merchant (and optionally **deviceId**. If not included the payment request will be sent to all terminals in the store).
* data is the actual payload:
  * Format: `{"action":"sale", "purchaseAmount": 1000, "tipAmount": 100, "currency":"USD", "referenceId":”ABC1234”, “callbackUrl”: “-urlencoded-url-"}`
  * **action**: authorize, sale, void, refund, non-referenced-credit
  * **purchaseAmount**: transaction amount (excluding tip)
  * **tipAmount**: tip amount if enabled for merchant
  * **currency**: 3 digit currency value (e.g. "USD")
  * **referenceId**: external referenceId that you can use to correlate transactions across systems
  * **orderId**: order id of a previously created order or order that will be created after the payment
  * **callbackUrl**: where you will receive a callback (HTTP POST) with [Poynt Payment object](http://poynt.github.io/developer/javadoc/co/poynt/os/model/Payment.html)
  * **transactionId**: transactionId to use for void, refund operations
  * **custom-http-header**: Custom HTTP header name and value that will be set by Poynt in the callback request
  * **skipReceiptScreen**: value of `true` will force the receipt options screen to be skipped
  * **debit**: value of `true` will default payment method to debit


### Callback

Callback allows the external system to get notified when the payment transaction requested is processed. The terminal will use the callback url provided in the request to POST the following json payload:

`{"referenceId”:”<your-reference-id>","status":”CANCELED or PROCESSED”, “transactions”:[{<processed-transaction>}]}`

Example response posted back to the callback url:

~~~
POST /callback HTTP/1.1
Content-Type: application/json; charset=utf-8
Content-Length: 1510
Host: myserver.com:8080
Connection: Keep-Alive
Accept-Encoding: gzip
User-Agent: okhttp/2.5.0

{
  "readCardDataOnly": false,
  "transactions": [
    {
      "authOnly": false,
      "status": "AUTHORIZED",
      "customerLanguage": "en",
      "updatedAt": "2018-09-06T01:23:23Z",
      "id": "f24bc381-adb7-481c-9ae9-761275bb0c0a",
      "references": [
        {
          "type": "CUSTOM",
          "id": "b6c9f791-c3e8-4b8a-8eee-5567c2d7956c",
          "customType": "referenceId"
        }
      ],
      "customerUserId": 60731166,
      "amounts": {
        "tipAmount": 0,
        "transactionAmount": 4500,
        "orderAmount": 4500,
        "cashbackAmount": 0,
        "currency": "USD"
      },
      "createdAt": "2018-09-06T01:23:21Z",
      "signatureRequired": false,
      "context": {
        "storeDeviceId": "urn:tid:e9e65b1b-1a58-3e55-a828-3f49096cc661",
        "source": "INSTORE",
        "storeAddressTerritory": "California",
        "mcc": "5812",
        "storeAddressCity": "Palo Alto",
        "sourceApp": "co.poynt.services",
        "employeeUserId": 26835234,
        "businessType": "TEST_MERCHANT",
        "businessId": "803833b1-cb97-434d-b158-30db6973173b",
        "storeTimezone": "America/Los_Angeles",
        "storeId": "b4c4d6e6-6a1e-4ca9-86ee-a086ff2fc9c9",
        "transmissionAtLocal": "2018-09-06T01:23:21Z"
      },
      "action": "AUTHORIZE",
      "processorResponse": {
        "statusCode": "1",
        "transactionId": "0eb6c86b-73b1-e811-bc5d-0050569277e2",
        "avsResult": {
          
        },
        "status": "Successful",
        "emvTags": {
          "0x9F02": "000000004500"
        },
        "acquirer": "CHASE_PAYMENTECH",
        "approvedAmount": 4500,
        "approvalCode": "6A4FEE",
        "processor": "CREDITCALL"
      },
      "fundingSource": {
        "card": {
          "numberMasked": "370123******1111",
          "cardId": "daa2dbe1-0b61-423a-a46c-73647e1e58de",
          "numberFirst6": "370123",
          "cardHolderFullName": "VALUED CUSTOMER      00304",
          "expirationDate": 31,
          "cardHolderLastName": "VALUED CUSTOMER      00304",
          "type": "AMERICAN_EXPRESS",
          "id": 59070137,
          "encrypted": false,
          "expirationYear": 2022,
          "expirationMonth": 7,
          "serviceCode": "728",
          "numberLast4": "1111",
          "cardHolderFirstName": ""
        },
        "debit": false,
        "type": "CREDIT_DEBIT",
        "entryDetails": {
          "entryMode": "CONTACTLESS_MAGSTRIPE",
          "customerPresenceStatus": "PRESENT"
        },
        "emvData": {
          "emvTags": {
            "0x5F24": "220731",
            "0x95": "8000001000",
            "0x1F815D": "3C",
            "0x5F20": "56414C55454420435553544F4145522020202020203030333034",
            "0x1F8104": "33313131",
            "0x1F8103": "333731323935",
            "0x1F815F": "04",
            "0x1F8102": "FFFF9876541210E00062",
            "0x1F815E": "25",
            "0x5F30": "728F",
            "0x9F34": "1F0002",
            "0x9F35": "22",
            "0x9F06": "A000000025010901",
            "0x1F8160": "03",
            "0x1F8161": "00",
            "0x1F8162": "00",
            "0x57": "37F8DBB4289118DC0707827101BB3E7D0A4DAF62AA38DED4192FCDBFEA6E5AB78E1351E27A993E15",
            "0x9F39": "91",
            "0x56": "6881AE9183767E18358A391DB1D74914DC212BD7744BB160D1C16AF5BE490028143BAB50F4B9EEF103A6EE255E8028B4C975C74FCAEBDF6798DD15883CB2C38E"
          }
        }
      }
    }
  ],
  "disableManual": false,
  "authzOnly": false,
  "disableOther": false,
  "multiTender": true,
  "disableCheck": false,
  "nonReferencedCredit": false,
  "applicationIndex": -1,
  "currency": "USD",
  "disableDebit": false,
  "amount": 4500,
  "tipAmount": 0,
  "isBalanceInquiry": false,
  "creditOnly": false,
  "disableEbtVoucher": false,
  "disableMSR": false,
  "cashOnly": false,
  "disableEbtCashBenefits": false,
  "manualEntry": false,
  "disableChangeAmount": false,
  "skipReceiptScreen": false,
  "disableDebitCards": false,
  "disableEMVCL": false,
  "status": "PROCESSED",
  "disableCash": false,
  "callerPackageName": "co.poynt.services",
  "referenceId": "b6c9179b-c3e8-4b8a-8eee-5567c2d7956c",
  "disableTip": false,
  "debitOnly": false,
  "skipPaymentConfirmationScreen": false,
  "adjustToAddCharges": false,
  "disableEbtFoodStamps": false,
  "disableEMVCT": false,
  "disablePaymentOptions": false,
  "skipSignatureScreen": false,
  "voucher": false,
  "offlineAuth": false,
  "cashbackAmount": 0
}
~~~

<div class="alert"><span style='font-weight: bold'>IMPORTANT!</span> Since the postback payload is a serialized version of the Payment object and from time to time we may add new parameters, it is important that you do not use strict validation while parsing the payload, which means ignoring unknown parameters.</div>

### FAQ
**Q: The body in the callback request is gzip compressed. How can I disable the compression?**<br>
A: Go to Developer Preferences > Poynt API. Toggle the switch for ENABLE HTTP COMPRESSION and tap SAVE. Check [Dev FAQ](overview/developer-faqs.html) page for instructions on accessing Developer Preferences. 

**Q: My request fails with HTTP 401**<br>
A: This indicates that your appId does not have permission to send cloud messages to the merchant's terminals. Please refer to Step 3 of **Prerequires**.

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>
