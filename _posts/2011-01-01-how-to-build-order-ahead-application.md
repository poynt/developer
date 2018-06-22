---
layout: page
title: "How to Build an Order Ahead application"
category: appstore
date: 2012-04-06 07:05:00
---
<p>&nbsp;</p>
### Account Setup

#### 1. Under App details, navigate to the Cloud Permissions
<img src="{{site.url}}/developer/assets/CloudPermissions1.png" alt="CloudPermissions1" width="500" style="border:20px;margin:20px">

#### 2. Select appropriate permissions that Merchant needs to grant to developer
In this case, developer needs access to Merchant's 'Orders' and 'Customers' resources for the order-ahead application.

<img src="{{site.url}}/developer/assets/CloudPermissions2.png" alt="CloudPermissions2" width="700" style="border:20px;margin:20px">

#### 3. Select the correct test merchant and Save settings
<img src="{{site.url}}/developer/assets/CloudPermissions3.png" alt="CloudPermissions3" width="700" style="border:20px;margin:20px">

#### 4. Merchant completes the web-flow using the Merchant Login URL to grant permissions to developer
For a details on the web flow, refer to the section on [Integrating with Cloud APIs](https://poynt.github.io/developer/cloud/integrating-with-poynt-cloud-apis.html).
<img src="{{site.url}}/developer/assets/CloudPermissions4.png" alt="CloudPermissions4" width="700" style="border:20px;margin:20px">


<p>&nbsp;</p>

#### Create a Customer

Sample Request:
~~~

curl -X POST \
  https://services.poynt.net/businesses/{businessId}/customers \
  -H 'Authorization: Bearer <access-token>' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'api-version: 1.2' \
  -d '{
          
            "cards": [
                {
                    "expirationMonth": 12,
                    "expirationYear": 2020,
                    "number": "4111111111111111",
                    "cardHolderFirstName": "Satya",
                    "cardHolderLastName": "Vedule"
                }
            ],
            "emails": {
                "PERSONAL": {
                "emailAddress": "satya+test@poynt.com"
                }
            },
            "firstName": "Satya",
            "lastName": "Vedule",
            "attributes": {"imageUrl": "https://bit.ly/2IjahBz"}
        }'
~~~

Response:

{% highlight json linenos %}
{
   "createdAt":"2018-06-21T21:12:57Z",
   "updatedAt":"2018-06-22T18:15:38Z",
   "businessPreferences":{
      "useCardOnFile":false,
      "emailReceipt":false,
      "printPaperReceipt":false,
      "preferredCardId":0
   },
   "insights":{
      "since":"2018-06-21T21:12:57Z",
      "lifetimeSpend":[
         {
            "amount":5000,
            "currency":"USD"
         }
      ],
      "scores":[
         {
            "score":7.49,
            "type":"OVERALL"
         }
      ],
      "topItems":[
         {
            "count":10.000,
            "firstPurchasedAt":1529616438,
            "lastPurchasedAt":1529622086,
            "name":"Coffee",
            "countUnit":"EACH"
         },
         {
            "count":10.000,
            "firstPurchasedAt":1529616438,
            "lastPurchasedAt":1529622086,
            "name":"Cream Cheese",
            "countUnit":"EACH"
         },
         {
            "count":10.000,
            "firstPurchasedAt":1529616438,
            "lastPurchasedAt":1529622086,
            "name":"Bagel",
            "countUnit":"EACH"
         }
      ],
      "totalOrders":10
   },
   "cards":[
      {
         "type":"VISA",
         "status":"ACTIVE",
         "expirationMonth":12,
         "expirationYear":2019,
         "id":43860799,
         "numberFirst6":"411111",
         "numberLast4":"1111",
         "cardHolderFirstName":"Satya",
         "cardHolderLastName":"Vedule",
         "cardId":"47b09e3d-a209-44bd-b21a-0c0928b795a7"
      }
   ],
   "loyaltyCustomers":[

   ],
   "id":45494460,
   "emails":{
      "PERSONAL":{
         "primary":false,
         "createdAt":"2018-06-21T21:12:57Z",
         "updatedAt":"2018-06-21T21:12:57Z",
         "status":"ADDED",
         "type":"PERSONAL",
         "id":821179,
         "emailAddress":"satya+test@poynt.com"
      }
   },
   "phones":{

   },
   "attributes":{

   },
   "firstName":"Satya",
   "lastName":"Vedule",
   "businessId":"02b4e3b7-f630-440c-a42c-93005ecc54f0"
}
{% endhighlight %}

The <strong>`id`</strong> value (in this case `45494460`) corresponds to the `customerId`. This value can be passed to the Order for displaying the customer details. 

<p>&nbsp;</p>

#### Create an Order

Sample Request:
~~~
curl -X POST \
  https://services.poynt.net/businesses/{businessId}/orders \
  -H 'Authorization: Bearer <access-token>' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'api-version: 1.2' \
  -d '{
   "items":[
      {
         "status":"ORDERED",
         "fulfillmentInstruction":"PICKUP_INSTORE",
         "clientNotes":"to be picked from store# 121",
         "code":"Cr",
         "name":"Croissant",
         "unitOfMeasure":"EACH",
         "popular":true,
         "unitPrice":195,
         "tax":32,
         "quantity":2.0
      }
   ],
   "amounts": {
      "taxTotal":32,
      "discountTotal":0,
      "subTotal":390,
      "currency":"USD"
   },
   "context": {
      "source":"WEB",
      "transactionInstruction":"EXTERNALLY_PROCESSED",
      "businessId":"02b4e3b7-f630-440c-a42c-93005ecc54f0", 			// businessId of the merchant
      "storeId":"a935eae2-f67c-4f93-a56c-4dbb20d3a5ba",				// storeId of the business
      "storeDeviceId":"urn:aid:035f4833-b350-44f7-9a53-d8127ebfe34b"		// AppId of the developer app
   },
   "customerUserId": 45494460,			//customerId from the Create Customer call.
   "statuses": {
      "status":"OPENED"
   }
}'
~~~

Response:

{% highlight json linenos %}
{
    "createdAt": "2018-06-22T19:45:41Z",
    "updatedAt": "2018-06-22T19:45:41Z",
    "context": {
        "employeeUserId": 0,
        "storeDeviceId": "urn:aid:035f4833-b350-44f7-9a53-d8127ebfe34b",
        "transactionInstruction": "EXTERNALLY_PROCESSED",
        "source": "WEB",
        "businessId": "02b4e3b7-f630-440c-a42c-93005ecc54f0",
        "storeId": "a935eae2-f67c-4f93-a56c-4dbb20d3a5ba"
    },
    "items": [
        {
            "createdAt": "2018-06-22T19:45:41Z",
            "updatedAt": "2018-06-22T19:45:41Z",
            "quantity": 2,
            "fulfillmentInstruction": "PICKUP_INSTORE",
            "id": 1,
            "unitPrice": 195,
            "discount": 0,
            "fee": 0,
            "tax": 32,
            "status": "FULFILLED",
            "name": "Croissant",
            "clientNotes": "to be picked from store# 121",
            "unitOfMeasure": "EACH"
        }
    ],
    "customerUserId": 45494460,
    "amounts": {
        "subTotal": 390,
        "discountTotal": 0,
        "taxTotal": 32,
        "netTotal": 422,
        "currency": "USD"
    },
    "statuses": {
        "fulfillmentStatus": "FULFILLED",
        "status": "OPENED",
        "transactionStatusSummary": "EXTERNALLY_PROCESSED"
    },
    "id": "a40c77a5-6799-45a0-8e7a-363be39e5073"
}
{% endhighlight %}

#### The Order has been successfully created.
### A Poynt Cloud Message is sent to the terminal for the newly created order.
<img src="{{site.url}}/developer/assets/OrderAhead1.jpg" alt="OrderAhead1" width="400" style="border:20px;margin:20px">

### Order can be viewed from Order Inbox in the Register app.
<img src="{{site.url}}/developer/assets/OrderAhead2.jpg" alt="OrderAhead2" width="400" style="border:20px;margin:20px">
<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>
