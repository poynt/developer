---
layout: page
title: "App Review Process"
category: appstore
date: 2015-02-11 12:35:00
---


<!-- ![](https://d347164ulyc57y.cloudfront.net/2017/07/Final-Developer-flow--3-.png -->
  ![](../assets/Developer_flow_10232018.png)



## Pre-Requisites

1) To maintain app adoption and continued merchant interest, the app review process considers the following factors:

```
* The app should be solving a specific merchant need or pain point or targetting a specific merchant vertical. The app should offer functionality that differentiates it from other apps available.
* The app developer is responsible for finding merchant/reseller who wants to use/distribute their app.
```

2) Developers sign up for a Developer account ([US](https://poynt.net/auth/signup/developer) \| [EU](https://eu.poynt.net/auth/signup/developer)).

3) Developers submit an app for review through the [Developer portal](https://poynt.net/terminalapps).

### Step 1:
Developer verifies whether the app follows the general guidelines as described in the [Poynt App Development Guidelines](../appstore/app-development-guidelines.html).

### Step 2:
Should any changes be required, developer updates their app.

### Step 3:
When the app is created, Poynt generates 2048 bit RSA private key that the developer needs to download to securely communicate with their app. Poynt does not store the private key, so if the developer loses the key the will need to generate a new one on poynt.net.

The apk submission form requires the developer to provide a short application summary, detailed description, change log information, app screenshots and the country of distribution. This information will be used by the app review team and it will be displayed in the app marketplace (`Poynt Store`) once the app has been approved.

### Step 4:
Upon submission, app status changes to `Submitted` in Poynt developer portal.
Once the app is submitted an automated ticket is generated in the Poynt ticketing system. App review team gets notified via email that the app has been submitted for review. You should receive an email confirmation as well with the next steps.

### Step 5 and 6:
Access the following [Onboarding forms](https://poynt.net/mc/#/account/docs) within the developer portal:
```
* App support form
* Infrastructure readiness
* Distribution agreement
* In-App billing details(Plan names, descriptions, amounts etc, see step 11.)
* Test credentials(for app review)
* Marketing collateral(Images, write-ups etc for post go-live marketing)
```


### Step 7:
Developer returns completed and signed forms to the Poynt app team by sending the documents directly to `app-reviews@poynt.co`.


### Step 8:
When an app is submitted, the app is reviewed within 24 hours. If any issues, app is rejected and the rejection reasons are displayed within developer portal. Developer can update the app and resubmit a new version for further consideration. The app is placed back in the queue(Step 2) if rejected.

If the app passes all checks, the app advances to the next step.

### Step 9:
If the app passes all the necessary checks, it is signed.

### Step 10:
After the app is signed, the app is set to show up under the `Beta Apps` section of the app store on the terminal. Details provided under <a href="https://poynt.github.io/developer/appstore/how-to-submit-apk.html#BetaApps">Step 10 - Beta Apps</a>.
<div class="note"><span style="font-weight:bold">IMPORTANT!</span> During the Pilot / Beta testing phase, the app can be installed on up to 10 devices for beta testing. As soon as the device limit is reached the app will not be displayed under the `Beta Apps` section of the app store.</div>
<p>&nbsp;</p>
<p>
</p>


### Step 11:
Billing plans can be created under your app within the [App Dashboard](https://poynt.net/mc/#/developer/dashboard). Please follow the [**Billing Best practices**](../appstore/app-billing-best-practices.html) when requesting plans creation and through the app billing lifecycle. Plan information should be requested in the following format (Example below):

```
"name": "Basic plan",
"description": "Basic services plan with 30-day trial",
"country": "US",
"currency": "USD",
"value": 3999
"interval": "MONTH",
"scope": "STORE",
"trialPeriodDays": 30
```

```
Note:
"value" should be in cents
"interval" can have any one of these values "DAY | WEEK | MONTH | YEAR"
"scope" can have any one of these values "BUSINESS | STORE | DEVICE"

```

The Poynt app team creates the plan and will respond with plan information. Sample plan information below:

```
{
    "description": "Basic services plan with 30-day trial",
    "scope": "STORE",
    "createdAt": "2017-08-17T23:10:52.430Z",
    "updatedAt": "2017-08-17T23:10:52.430Z",
    "amounts": [
        {
            "country": "US",
            "currency": "USD",
            "value": 3999
        }
    ],
    "interval": "MONTH",
    "trialPeriodDays": 30,
    "amount": 3999,
    "planId": "d6d4894a-84dc-4f29-8d7d-d1e8f6b62b2d",
    "appId": "urn:aid:3f74d6f1-f489-45a0-ba54-3284dc6387bc",
    "status": "INACTIVE",
    "name": "Basic Plan"
}
```

 The developer uses the **planId** to integrate the billing flow in the app by invoking the billing fragment through the SDK. Please see [**Integration with Poynt Billing Services**](../appstore/integrating-with-billing.html) for integration details.

Once the app integration is complete, developer informs the Poynt app team. App team Activates (*"status": "ACTIVE"*) the plan. At this point the plan shows up in the Poynt App Store.

Additional plans can be requested in a similar way or all at once initially.

### Step 12:
The app Billing plans are approved and the app is set to **LIVE** by the app review analyst. The app shows up on the Poynt app store. Merchants can now find the app and Subscribe to the App's plans(as described in Step 11) by downloading and installing the app on their terminal.

### Step 13:
Poynt developer marketing team may reach out to the developer contact for details on setting up webinars, distribution strategy, etc.

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>

<script language="javascript">
window.location="https://poynt.github.io/developer-docs/appStore/app-review.html"
</script>
