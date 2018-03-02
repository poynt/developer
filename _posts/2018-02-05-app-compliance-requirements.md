---
layout: page
title: "App Compliance Requirements"
category: appstore
date: 2012-04-07 07:05:00
---

Developers can build Apps on the Poynt platform to reach customers via the Poynt app store.
The apps developed should be in accordance with the Poynt's Compliance requirements as follows:

<p>&nbsp;</p>



<!-- For these reasons, we recommend the following process for a seamless integration and deployment of your app using the Poynt Billing APIs (on terminal or on cloud).


1. [_Application Setup_](#application-setup)
2. [_Building a new App_](#if-you-are-building-a-brand-new-app)
3. [_Adding billing to existing App with no prior billing_](#if-you-are-updating-an-existing-app-with-no-prior-billing-plans)
4. [_Updating existing app with billing_](#if-you-are-updating-an-existing-app-with-prior-billing-plans)
5. [_Billing use cases_](#billing-use-cases) -->


<p>&nbsp;</p>



# List of Compliance Requirements:

1. Apps should only request required permissions in their application manifest. Permission requests to write sensitive information to shared internal storage, read card data, attempt to mount/unmount file systems etc are not allowed.
2. The app cannot download Adware etc that automatically installs without user consent. Also, app cannot send spam or introduce viruses.
3. The app can only receive updates by way of an upgrade through the Poynt app store.
4. After download, an app should remain working until user manually minimizes the app or stops it. App should provide a way to seamlessly transition between screens within the app. App should include a Home Button at the top of the navigation bar  which takes user to the Launcher screen. Apps should not interrupt current workflow  of other apps(i.e. Background apps/notifications should not interfere with foreground apps).
5. For any Identity and Access management, apps should use Poynt’s Identity services to gain access to their system for  onboarding, setup and other functionality.
6. You may Not mention other app platforms in your app other than Poynt (for instance: “Also available on X!”).
7. The app must have some functionality. For instance, it can’t be just a marketing page leading to some online solution. The Only exception to this rule would be if your app is only available as a cloud app (i.e. web app).App Functionality should be in sync with functionality described in Poynt store.
8. For all Billing needs, app must always use Poynt Billing.
9. All apps must have a minimum 14-day Trial.
10. The app does not misrepresent itself as any other app or service other than as intended or advertised.
11. Applications built by developers from sanctioned countries are not allowed. Any country or entity on the [OFAC list](https://www.treasury.gov/resource-center/sanctions/Programs/Pages/Programs.aspx) list will be blocked. App should in addition honor country-specific compliance requirements including data storage and protection (e.g. GDPR in EU markets).
12. Custom payment methods such as Gift cards and/or Stored balances are allowed with  appropriate licensing and legal documentation. Open loop gift cards would require the developer to further present proof of all necessary financial, compliance and issuing requirements.
13. Data and Privacy - Developer to provide a list of all data an app collects (eg. end customer and/or merchant info, txns, order info, etc.) Also, how and where this data is transmitted and stored.


<p>&nbsp;</p>

<!-- # If you are updating an existing app with no prior billing plans:

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

# If you are updating an existing app with prior billing plans:

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

# Billing use cases

While integrating with Poynt Billing, please consider the following scenarios and make sure your application code can handle these as necessary. Please refer to [App Billing Best Practices](app-billing-best-practices.html) to make sure your app covers all possible billing scenarios.

1. merchant has a valid subscription but never used your app before (**first time subscriber**)
2. merchant has a valid subscription and has used your app before (**returning subscriber**)
3. merchant has a canceled subscription after using your app (**canceled subscriber**)
4. merchant has no subscriptions and never used your app - although this is no longer possible once you’ve integrated with Poynt Billing, we still recommend you to handle this scenario to prevent any fraud that might occur in the future. (**not a subscriber**)
5. merchant has no subscriptions and has used your app before - these are your existing merchants before you’ve switched to Poynt billing. You must make sure you grandfather these merchants to provide a more graceful upgrade process to billing. (**grandfathered subscriber**)
6. merchant has a valid subscription but wants to upgrade or downgrade (**upsell/downsell subscriber**)

<!-- feedback widget -->
