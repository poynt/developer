---
layout: page
title: "Activate Poynt Terminal"
category: tut
date: 2015-05-19 11:21:25
---

Once you receive your Poynt Developer Unit, following the instructions below to set it up with a test merchant that you can use to simulate a merchant and start integrating with our PoyntOS SDK and Cloud APIs.

### Pre-requisites

* Android SDK with android-api 19 (Kitkat) installed on your development machine
* Poynt Developer Unit
* Developer SignUp email from Poynt
** Note that this email is sent only when you purchase a Poynt Terminal. If you've already purchased a developer unit but never received your signup email, please check your spam folders to see if it's in there. Otherwise just contact us and we will resend.

### Installation

1. From the Poynt developer email that you've received, click on the signup link to register your developer account.
![SignUp]({{site.url}}../assets/poynt-signup-2.png)
2. Once you’re registered, you will see Poynt Developer dashboard.
    - All developers by default are assigned their default developer organization so they can invite other teammates to join and access the same applications. You can try this out later after setting up your device.
3. On the dashboard, click on "COMPLETE YOUR PROFILE”, enter any missing information (eg. Website Url) and click on Save.
![complete profile]({{site.url}}../assets/poynt-signup-3.png)
![profile]({{site.url}}../assets/poynt-signup-4.png)
4. On the dashboard, click on “CREATE A TEST MERCHANT” to create a test merchant for your development activity.
![create test merchant]({{site.url}}../assets/poynt-signup-5.png)
5. On the dashboard, click on “ACTIVATE A POYNT TERMINAL”, and you’ll see a list of terminals and their status.
    - You should see a terminal with status as “Needs Activation"
    ![activate]({{site.url}}../assets/poynt-signup-6.png)
    ![needs activation]({{site.url}}../assets/poynt-signup-7.png)
6. Click on the Action to activate your terminal - you’ll see your activation credentials (MID, TID and Acquirer).
    - Keep the page open so you can enter the credentials on the device.
    ![activation credentials]({{site.url}}../assets/poynt-signup-8.png)
7. Turn on your Poynt Developer unit.
8. Go through the Poynt activation app to setup wifi and install any updates that are available.
8. When you are prompted for activation credentials, enter the information from the developer portal (step 6) and click on Activate.
9. Once you activate the device, you will be automatically logged into the device. From the Launcher screen, tap on Poynt Terminal or Register apps to try out the default applications.


At this point, your device is ready for development and testing. Refer to <a href="/developer/tut/assign-catalog-to-poynt-register.html">Create and Assign catalog to Poynt Register</a> for information on how you can setup a catalog for the Register app.
