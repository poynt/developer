---
layout: page
title: "Activate Poynt Terminal"
category: setup
date: 2017-05-19 11:21:25
---

Once you receive your Poynt Developer Unit, following the instructions below to set it up with a test merchant that you can use to simulate a merchant and start integrating with our PoyntOS SDK and Cloud APIs.

### Pre-requisites

* Android SDK with android-api 19 (Kitkat) installed on your development machine
* Poynt Developer Unit
* If you want to have the ability to install development applications (APKs) on your device <a href="/developer/setup/developer-mode.html">enable developer-mode</a> (May not be required if your unit arrived already in developer mode).

### <a name="installation">Installation</a>

* Go to [Developer Portal](https://poynt.net/auth/signup/developer) and register your developer account. Once you enter your email address you will receive a verification email to complete your registration.
<p>
<div class="note"><span style="font-weight: bold">Note:</span> If you are developing applications for Europe region, sign up at  <a href="https://eu.poynt.net/auth/signup/developer" target="_blank">EU Developer Portal</a>.</div>
</p>

![SignUp](../assets/signup1.png){:width="800px"}

![SignUp2](../assets/signup2.png){:width="800px"}

![SignUp3](../assets/signup3.png){:width="800px"}

* Once you’re registered, you will see Poynt Developer dashboard.
    - All developers by default are assigned their default developer organization so they can invite other teammates to join and access the same applications. You can try this out later after setting up your device.

* On the dashboard, go to `Test Merchants` and create a test merchant for your development activity. You can change the name, but for testing purposes we recommend to keep the default `Bank` as all transations will be going against our test environment.<br/>
![create test merchant](../assets/signup4.png){:width="800px"}

* After a few seconds refresh the page to see the newly created test merchant.<br/>
![test merchant created](../assets/signup5.png){:width="800px"}

* Click on the merchant name and scroll down until you see green `Activate` button to see the activation information.<br/>
![terminal activation](../assets/signup6.png){:width="800px"}

* Turn on your Poynt Developer unit.
* Go through the Poynt activation app to setup wifi and install any updates that are available.
* When you are prompted for activation credentials, scan the QR code or enter the information from the developer portal and click on Activate.
* Once you activate the device, you will be automatically logged into the device. From the Launcher screen, tap on Poynt Terminal or Register apps to try out the [default applications](../overview/default-apps.html).

At this point, your device is ready for development and testing.

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>

<script language="javascript">
window.location="https://poynt.github.io/developer-docs/setupTerminal/activate-terminal.html"
</script>
