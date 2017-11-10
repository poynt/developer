---
layout: page
title: "Integrating Payment Bridge API"
category: semi
date: 2016-04-01 13:05:00
---

Payment Bridge API provides a way for external systems (e.g. web-based point-of-sale systems) to start a transaction flow on Poynt Terminal without requiring to build any apps/services that have to run on the terminal itself.

Here is how it works:

1. External System [sends a Poynt Cloud Message](http://poynt.github.io/developer/tut/poynt-cloud-messages.html) with a payment request containing business id, store id and optionally terminal id of the merchant
2. Poynt Cloud authorizes the caller and routes the message to the corresponding merchant terminal(s)
3. Poynt Payment Bridge receives the incoming message and starts the necessary payment flows on the device.

### Prerequites:

1. [Create a developer account and activate your developer terminal](http://poynt.github.io/developer/tut/activate-poynt-terminal.html). (Note: if you don't have a developer unit you can use [emulator](http://poynt.github.io/developer/tut/setup-poyntos.html))
2. Create an app and make sure it has "Cloud Messages" WRITE permission
3. Use "Merchant Login Url" of your app to [Authorize one of your test merchants](http://poynt.github.io/developer/tut/integrating-with-poynt-cloud-apis.html)

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
    "referenceId": "ABC1234",
    "status": "PROCESSED",
    "transactions": [
        {
            "action": "AUTHORIZE",
            "amounts": {
                "cashbackAmount": 0,
                "currency": "USD",
                "orderAmount": 1000,
                "tipAmount": 0,
                "transactionAmount": 1000
            },
            "authOnly": true,
            "context": {
                "businessId": "469e957c-57a7-4d54-a72a-9e8f3296adad",
                "businessType": "TEST_MERCHANT",
                "employeeUserId": 1526454,
                "mcc": "5812",
                "source": "INSTORE",
                "storeDeviceId": "urn:tid:daba88b0-8851-35d7-b706-353a4f82ae34",
                "storeId": "c2855b41-1dd5-4ecc-8258-f0c89ae40338",
                "transmissionAtLocal": "2015-11-18T18:24:07Z"
            },
            "createdAt": "2015-11-18T18:24:07Z",
            "customerUserId": 1526568,
            "fundingSource": {
                "card": {
                    "cardHolderFirstName": "JOHN",
                    "cardHolderFullName": "SMITH/JOHN",
                    "cardHolderLastName": "SMITH",
                    "encrypted": false,
                    "expirationMonth": 3,
                    "expirationYear": 2017,
                    "id": 18359,
                    "keySerialNumber": "9876543210E00002",
                    "numberFirst6": "438857",
                    "numberLast4": "5963",
                    "numberMasked": "438857******5963",
                    "type": "VISA"
                },
                "emvData": {
                    "emvTags": {
                        "0x5F20": "4E41544F4348592F445A49414E495320"
                    }
                },
                "entryDetails": {
                    "customerPresenceStatus": "PRESENT",
                    "entryMode": "TRACK_DATA_FROM_MAGSTRIPE"
                },
                "type": "CREDIT_DEBIT"
            },
            "id": "c8efe854-75b0-4b01-b584-f36e8be5b309",
            "processorResponse": {
                "acquirer": "CHASE_PAYMENTECH",
                "approvalCode": "EEA3D4",
                "approvedAmount": 1000,
                "avsResult": {},
                "emvTags": {},
                "processor": "CREDITCALL",
                "status": "Successful",
                "statusCode": "1",
                "transactionId": "5e09f08d-218e-e511-a032-0050569228c2"
            },
            "references": [
                {
                    "customType": "referenceId",
                    "id": "ABC1234",
                    "type": "CUSTOM"
                }
            ],
            "status": "AUTHORIZED",
            "updatedAt": "2015-11-18T18:24:07Z"
        }
    ]
}
~~~
