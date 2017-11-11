---
layout: page
title: "Working with Multi-MID"
category: onterminal
date: 2010-04-07 07:05:00
---

##Overview

Multi-MID feature allows a single physical terminal to be associated with multiple merchant accounts. This is used for businesses like salons where each stylist has their own business and a unique Merchant ID. Merchants can easily swap between MIDs by switching the user on the device.

##Setting up a developer terminal/emulator as a multi-MID device
1. Create two test merchants with the same acquirer (Note: if the merchant accounts do not use the same acquirer multi-MID activation will fail)
2. Activate the terminal using the first test merchant account by either [scanning the QR code or entering MID and TID information manually](https://poynt.github.io/developer/tut/activate-poynt-terminal.html).
3. Once the terminal is activated unlock Poynt Developer settings. (Please note, that most of these settings should not be modified as changing some of them could render the terminal unusable)

 * go to Settings
 * go to About
 * Tap 10 times on Poynt OS. You should get a Toast message that the Developer Preferences have been enabled
 * Go back to the Settings screen
 * Tap on Developer Preferences
 * Tap on Payments/Add Merchant Terminal Id
 * Make sure the right Acquirer is selected in the drop-down and enter the MID and TID associated with your second test account and Tap on Add button

![](https://d347164ulyc57y.cloudfront.net/2017/10/addMerchantTerminalId-1.png)

You can find the MID and TID for the second test merchant in Poynt HQ.

<img src="https://d347164ulyc57y.cloudfront.net/2017/10/testAccount.png" width="800">

If the activation was successful you should see a Select User screen which will now contain the list of terminal users from the second test merchant. If you don't see this screen check the device logcat and search for "/activate". The log lines surrounding this will have an error message explaining the failure reason.
<img src="https://d347164ulyc57y.cloudfront.net/2017/09/Screenshot-2017-09-19-21.04.30.png" width="800">

To change context between test merchant #1 and test merchant #2 use the Switch User button on the terminal home screen. **Note**: *we recommend that you use descriptive names when creating terminal users in each of the test merchant accounts that would allow you to easily tell which test merchant you are logging in as*.

##Integration

### Recognizing if your application is running on a multi-MID terminal

To determine if your application is running on a multi-MID device call [IPoyntBusinessService.getAllBusinesses()](https://poynt.github.io/developer/javadoc/co/poynt/os/services/v1/IPoyntBusinessService.html#getAllBusinesses-co.poynt.os.services.v1.IPoyntAllBusinessReadListener-).
 In your callback's [onResponse()](https://poynt.github.io/developer/javadoc/co/poynt/os/services/v1/IPoyntAllBusinessReadListener.html#onResponse-java.util.List-co.poynt.os.model.PoyntError-) check if the List of Business objects contains more than 1 element, and if it does, the terminal is set up as a multi-MID device.

When a terminal user switch occurs, Poynt broadcasts an event `poynt.intent.action.ACCOUNT_LOGIN`. Your application should have a BroastcastReceiver class listening to this event and triggering  [IPoyntBusinessService.getBusiness()](https://poynt.github.io/developer/javadoc/co/poynt/os/services/v1/IPoyntBusinessService.html#getBusiness-co.poynt.os.services.v1.IPoyntBusinessReadListener-) call to determine if the merchant switch has occurred and subsequently updating your application's state.

```xml
<receiver
  android:name=".LoginReceiver"
  android:exported="true">
  <intent-filter>
    <action
      android:name="poynt.intent.action.ACCOUNT_LOGIN"/>
  </intent-filter>
</receiver>
```

For example, let's say merchant A installed a gift card application and used it to reload a customer's card. When merchant B logs in, the gift card app should receive the `ACCOUNT_LOGIN` event, check if the other merchant is logged in now and present a sign in screen (assuming merchant B also uses the same gift card application) or a registration screen. When merchant A logs back in, the app should recognize that this merchant was already logged in.

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>
