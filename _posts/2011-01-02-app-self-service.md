---
layout: page
title: "App Self Service"
category: appstore
date: 2013-01-06 12:35:00
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

## Overview 

App Self-Service feature allows developers to push app apk updates to merchants who are beta testing their app. This eliminates the need to contact Poynt developer support each time they need to push an apk update, which may also require coordinating with the merchant to install the update outside of normal business hours to avoid any disruption.Therefore, this feature enables developers to be able to push such updates by themselves. 

## Solution 
Beta apps section will be exposed in Poynt Store (on the terminal) that will allow merchants to discover and download beta apps. Upon the download, merchant's terminal will be added to a beta app terminal group owned by the developer's organization. We will allow developers to see all live terminals (which are part of the beta app group) on the groups page and allow creating a job to do apk install and uninstall. Developers would not be able to access terminal timeline to prevent them from taking any other actions that could interfere with the normal operation of the merchant's terminal.

Below is an illustration of the App Self-Service flow:

#### 1. Switching from Developer Portal to Mission Control
Navigate to the Account section
<img class="shadow image" src="../assets/app_self_service_1.png" alt="AppSelfService_Screenshot1" style="border:20px;margin:20px">

Click on `Mission Control` to switch views. <br/>
If you do not see the `Mission Control` link, please contact `devsupport@poynt.co` for assistance.
<img class="shadow image" src="../assets/app_self_service_2.png" alt="AppSelfService_Screenshot2" style="border:20px;margin:20px">

#### 2. Navigate to Terminal Groups
Go to Terminal->Groups from the menu and select the group. 
<div class="note"><span style="font-weight:bold">IMPORTANT!</span> When a new apk is uploaded a terminal group is automatically created for beta testing.
The group is used to track terminals that have installed the app during beta testing phase. When an app is installed/uninstalled on a merchant terminal, serial number are added/removed from the beta testing terminal group </div>
<img class="shadow image" src="../assets/app_self_service_3.png" alt="AppSelfService_Screenshot3" style="border:20px;margin:20px">
<img class="shadow image" src="../assets/app_self_service_6.png" alt="AppSelfService_Screenshot6" style="border:20px;margin:20px">
<!-- <img class="shadow image" src="../assets/app_self_service_4.png" alt="AppSelfService_Screenshot4" style="border:20px;margin:20px"> -->

#### 3. Create Jobs 
You may Install and Uninstall apps on terminals
<!-- <img class="shadow image" src="../assets/app_self_service_5.png" alt="AppSelfService_Screenshot5" style="border:20px;margin:20px"> -->
<img class="shadow image" src="../assets/app_self_service_6_1.png" alt="AppSelfService_Screenshot6_1" style="border:20px;margin:20px">
<img class="shadow image" src="../assets/app_self_service_7.png" alt="AppSelfService_Screenshot7" style="border:20px;margin:20px">
<!-- <img class="shadow image" src="../assets/app_self_service_8.png" alt="AppSelfService_Screenshot8" style="border:20px;margin:20px"> -->
<img class="shadow image" src="../assets/app_self_service_9.png" alt="AppSelfService_Screenshot9" style="border:20px;margin:20px">

To create a job on specific terminals, use the terminal search box to filter on the required terminals(as comma-separated values).
<img class="shadow image" src="../assets/app_self_service_10.png" alt="AppSelfService_Screenshot10" style="border:20px;margin:20px">

#### 4. Swithing back to Developer Portal
Click on the `Skip` button under the hamburger menu to go back to the Developer view.
<img class="shadow image" src="../assets/app_self_service_11.png" alt="AppSelfService_Screenshot11" style="border:20px;margin:20px">


<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>
