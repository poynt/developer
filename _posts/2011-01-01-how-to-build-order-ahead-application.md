---
layout: page
title: "How to Build an Order Ahead application"
category: onterminal
date: 2009-04-06 07:05:00
---
<p>&nbsp;</p>

Order Ahead App can be built to work with Poynt in two ways broadly:<br>
<br>&nbsp;&nbsp;1)  [_Poynt Register App Integration_](#poynt-register-app-integration)
<br>&nbsp;&nbsp;2)  [_Native Order Ahead App Integration_](#native-order-ahead-app-integration)


### Poynt-Register-App-Integration

An Order Ahead application can be built to work with the on-terminal [Poynt Register](https://poynt.zendesk.com/hc/en-us/articles/223240747-Register-App-Training-PDF-) application. Here are the steps:

#### 1. Merchant authorizes the App
Authorization flow is described under the [Poynt Cloud API](https://poynt.github.io/developer/cloud/integrating-with-poynt-cloud-apis.html) section. In this particular case, merchant authorizes access to 'Orders' and 'Customers' resources as shown below.

<img src="{{site.url}}/developer/assets/CloudPermissions2.png" alt="CloudPermissions2" width="700" style="border:20px;margin:20px">


#### 2. Merchant completes the web-flow using the Merchant Login URL to grant permissions to the App
The web flow is further described under [Integrating with Cloud APIs](https://poynt.github.io/developer/cloud/integrating-with-poynt-cloud-apis.html).

<p>&nbsp;</p>

#### 3. Create a Customer

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
                    "number": "xxxxxxxxxxxxxxxx",
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

      .....

   },
   "cards":[
      {
         "type":"VISA",
         "status":"ACTIVE",
         "expirationMonth":12,
         "expirationYear":2019,
         "id":xxxxxxxx,
         "numberFirst6":"xxxxxx",
         "numberLast4":"xxxx",
         "cardHolderFirstName":"Satya",
         "cardHolderLastName":"Vedule",
         "cardId":"xxxxx"
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
   "businessId":"{businessId}"
}
{% endhighlight %}

The <strong>`id`</strong> value (in this case `45494460`) corresponds to the `customerId`. This value can be passed to the Order for displaying the customer details. 

<p>&nbsp;</p>

#### 4. Create an Order

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
      "businessId":"{businessId}", 			                               // businessId of the merchant
      "storeId":"{storeId}",				                               // storeId of the business
      "storeDeviceId":"{appId}"	                                                       // AppId of the developer app
   },
   "customerUserId": 45494460,			                                   //customerId from the Create Customer call.
   "statuses": {
      "status":"OPENED"
   }
}'
~~~

Order object Request 
Response:

{% highlight json linenos %}
{
    "createdAt": "2018-06-22T19:45:41Z",
    "updatedAt": "2018-06-22T19:45:41Z",
    "context": {
        "employeeUserId": 0,
        "storeDeviceId": "{appId}",
        "transactionInstruction": "EXTERNALLY_PROCESSED",
        "source": "WEB",
        "businessId": "{businessId}",
        "storeId": "{storeId}"
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
    "id": "xxxxxxx"
}
{% endhighlight %}

### The Order has been successfully created.
### A Poynt Cloud Message is sent to the terminal for the newly created order.
<img src="{{site.url}}/developer/assets/OrderAhead1.jpg" alt="OrderAhead1" width="400" style="border:20px;margin:20px">

### Order can be viewed from Order Inbox in the Register app.
<img src="{{site.url}}/developer/assets/OrderAhead2.jpg" alt="OrderAhead2" width="400" style="border:20px;margin:20px">


### Native-Order-Ahead-App-Integration

A Native Order Ahead app can be built to work with Poynt. Here are the steps involved:

#### 1. Implicit Authorization

Following permissions should be included in the app Android manifest: 

<strong>Order Service:</strong> `poynt.permission.ORDER_SERVICE`

<strong>Customer Service:</strong> `poynt.permission.CUSTOMER_SERVICE`

When a merchant subscribes to the App, these permissions are <strong>Implicitly</strong> granted to the app.


#### 2. Create Customer and Create Order


Create a Customer followed by an Order as described in the previous article of Order ahead integration using Register app(Steps 3 and 4).



#### 2. Implement the Appropriate Intent

When the user taps on the Order Notification on the terminal, the `Intents.ACTION_GO_TO_ORDER_DETAILS` can be handled to create a custom Order details view and provide a native app experience.

<img src="{{site.url}}/developer/assets/OrderAhead3.jpg" alt="OrderAhead3" width="400" style="border:20px;margin:20px">

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>
