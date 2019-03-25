---
layout: page
title: "How to Submit an apk through Developer portal"
category: appstore
date: 2013-01-06 07:05:00
---
<style>
.callout{
  width: 1000px; 
  margin: 0;
}

.image{
  width: 1000px;
}
</style>

#### 1. <a href='../setup/activate-poynt-terminal.html#installation'>Create a New developer</a> account or Sign-In to your existing one

#### 2. Create an App
<img class="shadow image" src="../assets/AppSubmit_Screenshot1.png" alt="AppSubmit_Screenshot1" style="border:20px;margin:20px">

Enter the app name as you want it displayed in Poynt Store.<br/>
<img class="shadow image" src="../assets/AppSubmit_Screenshot3.png" alt="AppSubmit_Screenshot3" style="border:20px;margin:20px">

#### 3. Download the Public-Private keypair
The private key is used to generate self-sign JWT required to obtain an access token. You need this key if you plan to use Poynt Cloud API. <br/>
<div class="warning callout">IMPORTANT! Poynt does not store your private key. If you lose your private key you will neeed to reset and download new key in Developer Portal.</div>
<img class="shadow image" src="../assets/AppSubmit_Screenshot4.png" alt="AppSubmit_Screenshot4" style="border:20px;margin:20px">

#### 4. Go to App details
<img class="shadow image" src="../assets/AppSubmit_Screenshot5.png" alt="AppSubmit_Screenshot5" style="border:20px;margin:20px">

#### 5. Edit App details
<img class="shadow image" src="../assets/AppSubmit_Screenshot6.png" alt="AppSubmit_Screenshot6" style="border:20px;margin:20px">

<img class="shadow image" src="../assets/AppSubmit_Screenshot8.png" alt="AppSubmit_Screenshot8" style="border:20px;margin:20px">

If you need to reset your API private key, you can go to `App Keys` tab:<br/>
<img class="shadow image" src="../assets/AppSubmit_Screenshot9.png" alt="AppSubmit_Screenshot9" style="border:20px;margin:20px">

#### 6. Upload an Apk
The package name of your app has to be unique in the Poynt Store. The best practice is to have the package name start with the domain name of your site (e.g. If you own domain name `awesomedeveloper.com` your apps package name should start with `com.awesomedeveloper`). Apps with package names starting with `co.poynt` or `com.poynt` will be rejected.

<div class="note callout"><strong>NOTE:</strong> Make sure that you are uploading a signed release version of your apk (If you are uploading a dev variant to test billing integration it can be signed by Android Studio debug key).</div>
<p>&nbsp;</p> 
<div class="alert callout"><strong>WARNING:</strong> Make sure you <strong>don't lose the key</strong> used to sign your apk. If you do, you will not be able to push updates to merchants who use your app and will need to create a new app with a different package name</div>

<img class="shadow image" src="../assets/AppSubmit_Screenshot10.png" alt="AppSubmit_Screenshot10" style="border:20px;margin:20px">

<img class="shadow image" src="../assets/AppSubmit_Screenshot11.png" alt="AppSubmit_Screenshot11" style="border:20px;margin:20px">

<img class="shadow image" src="../assets/AppSubmit_Screenshot12.png" alt="AppSubmit_Screenshot12" style="border:20px;margin:20px">

You are not done yet. Uploading your apk does not submit your app for review!

#### 7. Provide additional information needed for your app to be listed in Poynt Store

Select the terminal types that the app is compatible with under `Terminal Compatibility`.

<img class="shadow image" src="../assets/AppSubmit_Screenshot13.png" alt="AppSubmit_Screenshot13" style="border:20px;margin:20px">

* `Tagline` is a short description for your app when it's displayed as a recommended app. 
* `Region` determines in which country your app will be available

<img class="shadow image" src="../assets/AppSubmit_Screenshot14.png" alt="AppSubmit_Screenshot14" style="border:20px;margin:20px">

Based on the country you select you will be promted to accept the Distribution Agreement.

<img class="shadow image" src="../assets/AppSubmit_Screenshot15.png" alt="AppSubmit_Screenshot15" style="border:20px;margin:20px">

<div class="note callout"><strong>NOTE:</strong> MCCs, or Merchant category codes, classify businesses by what they sell or the service they provide. These four-digit codes are assigned by payment card organizations — Visa, MasterCard, American Express and Discover — when the business first starts accepting these methods of payment. Please provide the <strong>(MCC)</strong> codes of merchants (in a comma-delimited format) your app is best suited for. More information on <strong>(<span style="font-style: bold">MCCs</span>)</strong> codes can be found <a href="https://www.dm.usda.gov/procurement/card/card_x/mcc.pdf">here</a> </div>

<img class="shadow image" src="../assets/AppSubmit_Screenshot16.png" alt="AppSubmit_Screenshot16" style="border:20px;margin:20px">

If you are uploading a new version of your app provide the list of changes in the Change Log.

Upload a minimum of two screenshots (for best results use 800x1280px resolution). You can also upload a video (up to 10MB).

Save the submission.

<img class="shadow image" src="../assets/AppSubmit_Screenshot17.png" alt="AppSubmit_Screenshot17" style="border:20px;margin:20px">



<!-- <img class="shadow image" src="../assets/AppSubmit_Screenshot18.png" alt="AppSubmit_Screenshot18" style="border:20px;margin:20px">

<img class="shadow image" src="../assets/AppSubmit_Screenshot19.png" alt="AppSubmit_Screenshot19" style="border:20px;margin:20px">
 -->


<!-- <img class="shadow image" src="../assets/AppSubmit_Screenshot20.png" alt="AppSubmit_Screenshot20" style="border:20px;margin:20px"> -->

#### 8. Create Billing plans
<img class="shadow image" src="../assets/AppSubmit_Screenshot21.png" alt="AppSubmit_Screenshot21" style="border:20px;margin:20px">

<!-- <img class="shadow image" src="../assets/AppSubmit_Screenshot22.png" alt="AppSubmit_Screenshot22" style="border:20px;margin:20px"> -->

`Cancelation Policy` determines if the subscription will be canceled immediatey or will remain to be active until the end of the current billing cycle.

Save and submit the plan. Plan will be in Pending state until a Poynt analyst approves it.

#### 9. Submit the apk for Poynt Review
<img class="shadow image" src="../assets/AppSubmit_Screenshot22.png" alt="AppSubmit_Screenshot22" style="border:20px;margin:20px">

<img class="shadow image" src="../assets/AppSubmit_Screenshot23.png" alt="AppSubmit_Screenshot23" style="border:20px;margin:20px">

The app has now been successfully Submitted.

<!-- <img class="shadow image" src="../assets/AppSubmit_Screenshot26.png" alt="AppSubmit_Screenshot26" style="border:20px;margin:20px"> -->

<p>&nbsp;</p>
#### 10. <a name="BetaApps">Beta Apps:</a>

The apk is reviewed within 24 hrs. If all the checks pass, the apk status changes to IN-PILOT. The app is now available under the `Beta Apps` section of the app store on the terminal.

<div class="note"><span style="font-weight:bold">IMPORTANT!</span> During the Pilot / Beta testing phase, the app can be installed on up to 10 devices for beta testing. As soon as the device limit is reached the app will not be displayed under the `Beta Apps` section of the app store.</div>

<img class="shadow image" src="../assets/AppSubmit_Screenshot24.png" alt="AppSubmit_Screenshot24" style="border:20px;margin:20px">


If the apk is rejected, the rejection reasons are displayed for that version.
<img class="shadow image" src="../assets/AppSubmit_Screenshot25.png" alt="AppSubmit_Screenshot25" style="border:20px;margin:20px">


#### 11. Plan approval & Go-Live

If the app exits the Pilot phase successfully, Poynt review analyst will change Billing plan status from `Pending` to `Approved`.
The app is also set to `Live` status and the app made available on the app store.


<img class="shadow image" src="../assets/AppSubmit_Screenshot26.png" alt="AppSubmit_Screenshot26" style="border:20px;margin:20px">


<!-- ### <a name="WhatsNew">What's New:</a>
App Compatibility with different Terminal types can now be set for every apk upload.
<img class="shadow image" src="../assets/AppSubmit_Screenshot30.png" alt="AppSubmit_Screenshot30" style="border:20px;margin:20px">

If an App gets rejected, the rejection reasons are displayed for that apk version.
<img class="shadow image" src="../assets/AppSubmit_Screenshot31.png" alt="AppSubmit_Screenshot31" style="border:20px;margin:20px">
 -->
<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>
