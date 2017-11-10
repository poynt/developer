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
* If you want to the ability to install development applications (APKs) on your device <a href="/developer/tut/developer-mode.html">enable developer-mode</a> (May not be required if your unit arrived already in developer mode).

### Installation

* Go to [Developer Portal](https://poynt.net/auth/signup/developer) and register your developer account. Once you enter your email address you will receive a verification email to complete your registration.

![SignUp]({{site.url}}/developer/assets/signup1.png){:width="800px"}

![SignUp2]({{site.url}}/developer/assets/signup2.png){:width="800px"}

![SignUp3]({{site.url}}/developer/assets/signup3.png){:width="800px"}

* Once you’re registered, you will see Poynt Developer dashboard.
    - All developers by default are assigned their default developer organization so they can invite other teammates to join and access the same applications. You can try this out later after setting up your device.

* On the dashboard, go to `Test Merchants` and create a test merchant for your development activity. You can change the name, but for testing purposes we recommend to keep the default `Bank` as all transations will be going against our test environment.
![create test merchant]({{site.url}}/developer/assets/signup4.png){:width="800px"}

* After a few seconds refresh the page to see the newly created test merchant.
![test merchant created]({{site.url}}/developer/assets/signup5.png){:width="800px"}

* Click on the merchant name and scroll down until you see green `Activate` button to see the activation information.
![terminal activation]({{site.url}}/developer/assets/signup6.png){:width="800px"}

* Turn on your Poynt Developer unit.
* Go through the Poynt activation app to setup wifi and install any updates that are available.
* When you are prompted for activation credentials, scan the QR code or enter the information from the developer portal and click on Activate.
* Once you activate the device, you will be automatically logged into the device. From the Launcher screen, tap on Poynt Terminal or Register apps to try out the [default applications](overview/default-apps.html).

At this point, your device is ready for development and testing.
