---
layout: page
title: "Plug and Pay (PnP) <span class='fakeSuper'>BETA</span>"
category: semi
date: 2015-04-01 13:05:00
---

## Overview

Plug and Pay is a simple embeddable Javascript snippet that allows you to add a CHARGE button to a web page to initiate a transaction on a Poynt terminal with a single click.

## Get Started Guide

To create a button that charges a specified amount to a device, simply insert
the snippet below where you want the button to appear.

```javascript
    <script
      id='poynt-script'
      src='https://poynt.net/snippet/pnp/script.js'
      data-purchase-amount=1200
    </script>
```

![CHARGE button]({{site.url}}/developer/assets/pnp1.png)
<div class="note"><strong>Note: </strong>If no serial number or device ID is specified, the payment will be initiated on all the devices belonging to the merchant store that authorizes this transaction. </div>
<p>&nbsp;</p>
The first time you the merchant clicks the button they will be prompted to log in to their account to authorize initiating payments on their terminal.

![PnP Login]({{site.url}}/developer/assets/pnp2.png){:height="510px"}
![PnP Login]({{site.url}}/developer/assets/pnp4.png){:height="510px"}
![PnP Login]({{site.url}}/developer/assets/pnp3.png){:height="510px"}

All subsequent clicks will provide a visual indicator while the payment is in progress,

![Waiting for Payment]({{site.url}}/developer/assets/pnp5.png){:height="510px"}

and when payment is completed or failed/canceled.

![Payment Approved]({{site.url}}/developer/assets/pnp6.png){:height="510px"}

### Script Attributes

#### Required params

* `data-purchase-amount` (Number) - The amount to charge (excluding tip)

#### Optional params

* `data-device-id` (String) - The device ID
* `data-serial-number` (String) - The serial number of the device (not needed if `data-device-id` was provided and vice versa)
* `data-currency` (String) - 3 digit currency value (e.g. "USD")
* `data-tip-amount` (Number) - Tip amount (if enabled for merchant)
* `data-order-id` (String) - Order ID to associate this transaction to

#### Other customizations

* `data-custom-handler` (Boolean) - By default, a Poynt terminal status indicator appears on the bottom left corner of the page. Set data-custom-handler to true to hide this status indicator.

To handle the payment status, implement the following code:

```javascript
window.addEventListener('message', function (e) {
  var data = e.data;
  var eventName = data.eventName;
  var payload = data.payload;	// contains transactions data

  if (eventName === 'CHARGE_BEGIN') {
      // Transaction initiated
  } else if (eventName === 'CHARGE_COMPLETE') {
      // Transaction complete
  } else if { eventName === 'CHARGE_TIMEOUT') {
      // Request timed out
    }
});
```

In the above javascript `payload` will contain a JSON object with an array of one of more transaction:

```json
{
  "referenceId": "d9eeb461-870c-4b9b-aa10-2e57510ab781",
  "status": "PROCESSED",
  "transactions": [
    {
      "action": "SALE",
      "amounts": {
        "cashbackAmount": 0,
        "currency": "USD",
        "orderAmount": 1200,
        "tipAmount": 0,
        "transactionAmount": 1200
      },
      "authOnly": false,
      "context": {
        "businessId": "2ac806d1-73e7-40c3-94ec-be2bb401a2df",
        "businessType": "TEST_MERCHANT",
        "employeeUserId": 17371213,
        "mcc": "5812",
        "mid": "e10zu3b7xs",
        "source": "INSTORE",
        "sourceApp": "co.poynt.services",
        "storeAddressCity": "Palo Alto",
        "storeAddressTerritory": "California",
        "storeId": "992e7a4e-65e6-4919-825e-8b0f2f63a592",
        "storeTimezone": "America/Los_Angeles",
        "tid": "56uw"
      },
      "customerLanguage": "en",
      "fundingSource": {
        "card": {
          "cardHolderFirstName": "TESTCARD",
          "cardHolderFullName": "ELAVONTEST/TESTCARD",
          "cardHolderLastName": "ELAVONTEST",
          "encrypted": true,
          "expirationDate": 31,
          "expirationMonth": 12,
          "expirationYear": 2019,
          "keySerialNumber": "FFFF9876543210E000D9",
          "numberFirst6": "412493",
          "numberLast4": "9990",
          "track1data": "4ED7DFCDF6123B91CC4AE7EF904BBCF8173A5553EAA29544FCF10C17B64099E5B08F5EEDDF8B21BAF72F913F65E400CDBD37E523C3F3797D23096D2C9C6B4BDE2F0D75C815146A82A475BE744C8B1955",
          "track2data": "32DFBBC8BB70E1CBB3BD8DFFD70423CC33FC2976C10235753D492C0CC05C0369B5EA9328CCA20740",
          "type": "VISA"
        },
        "emvData": {
          "emvTags": {
            "0x5F24": "191231",
            "0x1F815D": "49",
            "0x5F20": "454C41564F4E544553542F5445535443415244",
            "0x1F8104": "39393930",
            "0x1F815F": "07",
            "0x1F8103": "343132343933",
            "0x5F2A": "0840",
            "0x1F815E": "26",
            "0x1F8102": "FFFF9876543210E000D9",
            "0x5F30": "901F",
            "0x1F8160": "02",
            "0x1F8161": "00",
            "0x1F8162": "00",
            "0x5F36": "02",
            "0x57": "32DFBBC8BB70E1CBB3BD8DFFD70423CC33FC2976C10235753D492C0CC05C0369B5EA9328CCA20740",
            "0x58": "",
            "0x9F39": "02",
            "0x1F8153": "263897F9",
            "0x56": "4ED7DFCDF6123B91CC4AE7EF904BBCF8173A5553EAA29544FCF10C17B64099E5B08F5EEDDF8B21BAF72F913F65E400CDBD37E523C3F3797D23096D2C9C6B4BDE2F0D75C815146A82A475BE744C8B1955"
          }
        },
        "entryDetails": {
          "customerPresenceStatus": "PRESENT",
          "entryMode": "TRACK_DATA_FROM_MAGSTRIPE"
        },
        "type": "CREDIT_DEBIT"
      },
      "id": "77462c66-a32e-452f-9e9d-53269e9bef30",
      "processorResponse": {
        "acquirer": "ELAVON",
        "approvalCode": "066923",
        "approvedAmount": 1200,
        "processor": "ELAVON",
        "status": "Successful",
        "statusCode": "0",
        "transactionId": "101117A15-29F0CAE6-C9B0-4293-BDE6-574007BD7B95"
      },
      "references": [
        {
          "customType": "referenceId",
          "id": "d9eeb461-870c-4b9b-aa10-2e57510ab781",
          "type": "CUSTOM"
        }
      ],
      "signatureCaptured": true,
      "signatureRequired": true,
      "status": "CAPTURED"
    }
  ]
}
```

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>

<script language="javascript">
window.location="https://poynt.github.io/developer-docs/semiIntegration/plug-n-pay.html"
</script>
