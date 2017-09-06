---
layout: page
title: "Billing App development and submission process"
category: tut
date: 2014-04-06 07:05:00
---

While integrating with Poynt Billing is relatively simple and straightforward, the process of development and testing using the same package name that you would use for Live deployment could be challenging. As an app that requires the merchants to pay for subscriptions, you would need to make sure you handle one or more billing plans (as per your monetization strategy), managing existing and new subscriptions, receive and handle webhooks for start & stop of subscriptions and payments, and above all managing multiple versions of your app in different states of development, testing and deployment.
<p>&nbsp;</p>

For these reasons, we recommend the following process for a seamless integration and deployment of your app using the Poynt Billing APIs (on terminal or on cloud).


1. [_Application Setup_](#application-setup)
2. [_Building a new App_](#if-you-are-building-a-brand-new-app)
3. [_Adding billing to existing App with no prior billing_](#if-you-are-updating-an-existing-app-with-no-prior-billing-plans)
4. [_Updating existing app with billing_](#if-you-are-updating-an-existing-app-with-prior-billing-plans)
5. [_Billing use cases_](#billing-use-cases)


<p>&nbsp;</p>

# Application setup

* Use a **dev** variant for integration and testing. Android Studio and Gradle provide a nice and convenient way to manage multiple variants for your application. We recommend creating a new “dev” variant with package name appended by “.dev” and use it to create a test app on Poynt App Portal for your integration and testing. To create a new build variant (e.g. package name: "com.example.myapp.dev") open the build.gradle file in your project and add the following inside the **buildTypes** block:

~~~json
dev {
	initWith debug
       	applicationIdSuffix ".dev"
}
~~~

<p><div class="warning"><strong>Please note</strong> that <span style="font-style: italic">initWith debug</span> statement will ensure that the dev variant is signed with Android Studio debug keys. Unsigned apps will fail to install on Poynt. <a href="https://developer.android.com/studio/build/build-variants.html">Learn more about build variants on Android</a></div></p>

* Once you create and submit a test app using your “dev” variant, please contact Poynt dev support to enable this app to show up in Poynt Apps marketplace for “test merchants”. Please note that this will enable your test app to only show up for “test merchant” accounts used by developers.
* When you are satisfied with your integration and testing, generate a release build with your live package name (Eg. “com.example.myapp”) and submit for App Review as your final app. Note that the appId and App credentials (RSA public key pair) for your live application would be different from the test application, and you would need to create the billing plans again for the live app.
* Once your live app is reviewed and approved by our App Review team, your billing plans will be marked as live and your application can be published in the Poynt Apps marketplace.


Below you'll find more detailed step by step process on how to setup your application based on in which state you are.

<p>&nbsp;</p>

## If you are building a brand new app:

1. Create new dev variant with package name appended with “.dev” suffix.
2. Create new Application on Poynt app Portal with the dev variant application.
3. Create billing plans for development and testing.
4. Contact Poynt Dev Support to mark the app available for testing through Poynt Apps Marketplace.
5. Poynt Dev Support will approve your test billing plans and mark your app available for testing through Poynt apps Marketplace. Please note that this only enables for “Test Merchants”.
6. Do your development and testing.
7. When ready, generate your “release” build with your final package name.
8. Create new app on Poynt app Portal with the release build apk.
9. Create billing plans for Live
10. Submit your app for review. Please note that you would need to complete all the formalities required for submitting an applications for review - failing so could delay your application review process.
11. Poynt App review team, will review your billing plans and Application as per the Poynt App Review process, and approves for Live.
12. Now your app will be available for merchants in Live Poynt Apps marketplace.

<p>&nbsp;</p>

## If you are updating an existing app with no prior billing plans:

1. Create new dev variant with package name appended with “.dev” suffix.
2. Create new Application on Poynt app Portal with the dev variant application.
3. Create billing plans for development and testing.
4. Contact Poynt Dev Support to mark the app available for testing through Poynt Apps Marketplace.
5. Poynt Dev Support will approve your test billing plans and mark your app available for testing through Poynt apps Marketplace. Please note that this only enables for “Test Merchants”.
6. Do your development and testing.
7. When ready, generate your “release” build with your final package name.
8. Upload your new release build apk for your existing Application on Poynt App Portal.
9. Create billing plans for Live
10. Submit your app for review. Please note that you would need to complete all the formalities required for submitting an applications for review - failing so could delay your application review process.
11. Poynt App review team, will review your billing plans and Application as per the Poynt App Review process, and approves for Live.
12. Now your app is available for merchants in Live Poynt Apps marketplace.

<p>&nbsp;</p>

## If you are updating an existing app with prior billing plans:

1. If you’ve integrated with Poynt Billing before without a dev variant, please follow previous two section to create a new dev variant with package name appended with “.dev” suffix.
2. Create new billing plans for development and testing. Note: You can leave existing billing plans as they are or submit request to Poynt Dev Support to deprecate your old plans.
3. Contact Poynt Dev Support to mark the app available for testing through Poynt Apps Marketplace.
4. Poynt Dev Support will approve your test billing plans and mark your app available for testing through Poynt apps Marketplace. Please note that this only enables for “Test Merchants”.
5. Do your development and testing.
6. When ready, generate your “release” build with your final package name.
7. Upload your new release build apk for your existing Application on Poynt App Portal.
8. Create new billing plans for Live.
9. Submit your app for review. Please note that you would need to complete all the formalities required for submitting an applications for review - failing so could delay your application review process. Note that if you are changing your pre-existing billing plans, you must indicate so in the app submission process for Poynt App Review team to deprecate any plans as needed.
10. Poynt App review team, will review your billing plans and Application as per the Poynt App Review process, and approves for Live.
11. Now your app is available for merchants in Live Poynt Apps marketplace.

<p>&nbsp;</p>

#Billing use cases

While integrating with Poynt Billing, please consider the following scenarios and make sure your application code can handle these as necessary. Please refer to [App Billing Best Practices](https://poynt.com/poynt-billing-best-practices/) to make sure your app covers all possible billing scenarios.

1. merchant has a valid subscription but never used your app before (**first time subscriber**)
2. merchant has a valid subscription and has used your app before (**returning subscriber**)
3. merchant has a canceled subscription after using your app (**canceled subscriber**)
4. merchant has no subscriptions and never used your app - although this is no longer possible once you’ve integrated with Poynt Billing, we still recommend you to handle this scenario to prevent any fraud that might occur in the future. (**not a subscriber**)
5. merchant has no subscriptions and has used your app before - these are your existing merchants before you’ve switched to Poynt billing. You must make sure you grandfather these merchants to provide a more graceful upgrade process to billing. (**grandfathered subscriber**)
6. merchant has a valid subscription but wants to upgrade or downgrade (**upsell/downsell subscriber**)
