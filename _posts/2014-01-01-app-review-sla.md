---
layout: page
title: "App Review SLA"
category: appstore
date: 2014-02-11 12:35:00
---

Poynt reviews every apk submission of an app including updates and first-time submissions.
Developers need to have an app apk submitted to the [Developer portal](https://poynt.net/mc/#/developer/dashboard).
Please ensure the apk state is in **"Submitted"** state. Poynt app team does NOT review apps in **"Uploaded"** state.

### First-Time apk submission:
For first-time submission, the following App-Level Metadata is checked for validity:
```
App Information and assets:
* App Name
* App Description
* App Screenshots
* App Region
* App MCC Codes
* App Permissions (App requests Only for required implicit permissions)
* Support Email
* Website
* Privacy Policy web link
* Billing Plans
* App Tagline
* App Support Contact Info (Displayed under app in the app store)
* Featured Image
```
Additional details on [App Marketplace Design](https://d85ecz8votkqa.cloudfront.net/documents/ghost/App_Marketplace_Design.pdf)

### Subsequent apk submissions:

The following values are checked for validity with every Apk submission:

```
* Apk ChangeLog (Change details from previous submission)
* Icon Image (part of the apk submission specified within the Android manifest file)
```

Poynt App Review team expects the Developers to take care of Testing the following:

```
* Business logic
* App Functionality
* UI experience and language/localization checks
```

The scope of the Poynt app-review includes(but not limited to):

```
* Security Testing
* System Testing - Apps, Services and interoperability.
* Branding and any Poynt compliance issues
```

## App Review SLA:

#### New Apps:

With all the above requirements met, the first response from Poynt App review team will be **5 Business Days** from the date of App Submission through the Developer Portal.

The response could be any of the following:

```
* Apk Approval
* Apk Rejection (if the App does not comply with Poynt App Development guidelines)
* Email/Ticket response requesting additional details(such as Test credentials, clarifications, video walk-through or Images/snapshots)
```

Details on [Poynt App Development guidelines](app-development-guidelines.html)

The SLA will reset to **5 Business Days** for all follow-up requests and/or submissions.


#### Existing Apps:

The first response from Poynt App review team will be **5 Business Days** from the date of updated App Submission through the Developer Portal.

The response could be any of the following:

```
* Apk Approval
* Apk Rejection (if the App does not comply with Poynt App Development guidelines)
* Email/Ticket response requesting additional details(such as Test credentials, clarifications, video walk-through or Images/snapshots)
```

Details on [Poynt App Development guidelines](app-development-guidelines.html)

The SLA will reset to **5 Business Days** for all follow-up requests and/or submissions.


#### **Note**:
For critical fixes with apk updates, you may escalate via [devsupport@poynt.com]()

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>

<script language="javascript">
window.location="https://poynt.github.io/developer-docs/appStore/app-review.html"
</script>
