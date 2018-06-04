---
layout: page
title: "GDPR guidelines for App Developers"
category: appstore
date: 2013-04-06 07:05:00
---

The GDPR stands for the General Data Protection Regulation. This regulation change was voted into place by the European Union Parliament in April of 2016, and has effect from May 25, 2018. Please note that these Guidelines are not intended to provide you with legal advice and we recommend that you seek independent legal advice to fully understand and comply with your obligations under the GDPR.

<p>&nbsp;</p>
<p>&nbsp;</p>

## Who needs to follow GDPR?

The regulation applies to any company or organization that:
(a) has an establishment in the EU; or
(b) offers goods and services to EU residents; or
(c) monitors the behavior of EU residents.
And collects, uses and/or processes Personal Data. In this particular case, it applies to all Poynt developer apps registered for Europe. It is also applicable to Poynt developer apps that service European customers (merchants) even though they are not registered for Europe.

<p>&nbsp;</p>

Please be aware that, personal data under EU law is wider in scope that personally identifiable information (PII). It includes any information relating to an identified or identifiable natural person who can be identified directly or indirectly, including online identifiers (such as an IP address, device ID), location data and identification numbers.

<p>&nbsp;</p>
<p>&nbsp;</p>

## GDPR resources
1.  **[Official European Union Law website](https://eur-lex.europa.eu/content/news/general-data-protection-regulation-GDPR-applies-from-25-May-2018.html)**

2.  **[GDPR Objectives and Articles](https://gdpr-info.eu/art-1-gdpr/)**

<p>&nbsp;</p>
<p>&nbsp;</p>

## GDPR guidelines

To help you address your App's compliance with the GDPR we have set out the following guidelines which you may want to consider.

#### -What does your app need to do under the GDPR?

**Allow users access to view, edit or update data** - Apps should provide an easy and intuitive way for users to view and fix/update all data about them, including data collected from other 3rd party sources. Any user specific data should be editable via the UI. Although it is preferable to provide these features as a self-serve method such as through the app settings or a preference center,  you should also provide users with information on how they can exercise these rights by requesting such changes be made. This often means providing a dedicated email address for users to send such requests. When such a method is used you  should clearly indicate the expectations, timelines and process involved.

**Forget user feature** - The app should have a way to take specific user identifiable information and delete all personal data about that user, when the user requests it. This applies to all data collected on the basis of consent or based on the valid interests of the controller (The data controller (“controller”) is the entity which, alone or jointly with others, determines the purposes and means of the processing of personal data). In this case, the controller is the app and the developer organization. Similarly to the above, you should also provide users with information on how they can exercise this right by contacting the controller directly. Again, users should be presented with information which clearly details the expectations, timelines and process involved.

**Inform 3rd parties of Erasure** - In addition to deleting data and controls from the app backend, it is a requirement to inform all third parties the app has shared the data. If the app has shared user data with any 3rd party service providers such as Salesforce, Facebook, Twitter etc. you should call an API of theirs that allows for the deletion of personal data. If your app functions as a service provider, it should expose an API endpoint (or support other means) for data deletion.

**Data Portability** - The app should provide a way to export user data. When invoked, the user should receive all the data the app holds about them in an accessible and machine readable format. When porting this data, it should be appropriately secured. Some examples of methods may include:

  1. **Single Sign-On** - Protocols for single sign-on such as OAUTH allow users to securely share data with another account. It also ensures that no
  personal user data other than the authentication ID from the original service is stored.

  2. **Poynt Tokens** - For any On-Terminal Apps on Poynt, please use the Poynt access tokens to maintain authenticated sessions and for enforcing session
  timeouts. More details [here](https://poynt.github.io/developer/overview/authentication-authorization.html).

  **Give Notice and update your Privacy Policy** - You must provide clear notice (in compliance with the GDPR's requirements in Articles 13 and 14) to users of your App as to the collection and use of their data. In addition, you should direct them to your Privacy Policy and encourage them to read it in full to understand how data is collected and used. The Privacy Policy should be updated to include detailed information on the collection and use of data.

  **Legal basis** – You must have a legal basis for collecting and processing the information. This legal basis must be documented and users should be able to obtain information on the legal basis for processing on request. Where you rely on legitimate interests you must have evidence to demonstrate the analysis considered and how you reached the conclusion to rely on this ground. Consent also has stricter requirements as detailed below.

  **Consent/Opt-In** - Where you rely on consent for any part of your App but in particular for marketing communications you should ensure that you are obtaining consent to the standard of the GDPR. This means that the consent must be "informed, freely given and unambiguous". Where there are a number of decisions granular opt in should be implemented to provide for separate consent for each particular activity. When relying on consent under the GDPR such consent must be auditable, so you must be able to demonstrate when and how the user consented, including what information they were presented with at the time. You must also provide users with an option to "opt-out" and provide an easy and clear way to exercise that right.   
  Data Processing Agreements (DPAs) with third party processors – Under the GDPR data controllers and data processors should enter into a data processing agreement which covers responsibilities and obligations under the GDPR with respect to the processing of data. The DPAs should mirror the requirements set out in Article 28 of the GDPR. This also includes the requirement to have an international data transfer mechanism in place where data is being transferred outside of the EEA, such as entering into EU Standard Contractual Clauses.

  **Policies for data breach** - GDPR enforces mandatory data breach notifications. Data Protection authorities must be notified of data leaks within 72 hours, and in some cases controllers are also required to inform affected individuals of such a breach. The app developer organization is responsible if there’s a data breach in one of the 3rd parties (e.g. “processors”) to which the app sends personal data. The DPA in place with these processors should detail their obligations in the event of an actual or suspected breach and place notification requirements and cooperation requirements on the processor to inform and assist the controller in such circumstances.

  **Data minimization and retention**  – Under the GDPR data personal data should only be kept as long as is necessary to fulfil the purpose for which it was collected. You should determine whether the app really needs all the requested personal data and delete or anonymize the data when it is no longer required. You should also have a clear data retention policy in place.

  **Age checks** - Apps should request the user’s age, and if the user is a minor (below 16), it should request parent’s permission. One potential way to do this is by introducing a flow, where the minor specifies the email of a parent, who can then confirm. You should ensure there is a mechanism in place should you find that you have collected data from a minor without the necessary permissions.

  **Update your cookie policies** - The cookies that allow you to identify users via their devices are considered as personal data under the GDPR. They include cookies for advertising, analytics, and functional cookies that allow mobile websites to remember user preferences. You should provide granular detail on the cookies and tracking technologies used and provide detail on how users can manage their cookie preferences and opt out. Where you are dropping cookies, you must be using a cookie banner/notification and cookies should not be dropped before a user consents to your use of such cookies.

  **Security** – Under the GDPR you are required to implement appropriate technical and organizational measures to protect the data that you process. Such measures include encryption. You should therefore ensure you are applying such security to data collected through your app, in transit and at rest.  Poynt stipulates that this should include taking the following steps:
  1. **Encrypt all personal data** - If an application needs to save personal information, the data should be encrypted with strong and appropriate encryption algorithms that includes hashing where required.
  2. **Encrypt data in transit** - Communication between your application and your host/database should be over TLS. Poynt further requires all communication over http using only TLS1.2 or higher versions.
  3. **Encrypt the data at rest** - This includes stored data and any other data that is backed up or archived.


  **Data Integrity** - Implement authentication mechanisms to check for data validity using techniques such as checksums and/or Hashing. These methods help in avoiding any form of data extraction and potential exposure in case of a data breach.

  **Logs** - For accountability purposes, maintain a logging mechanism of user activity. Keep logs that contain user information in a secure location (in encrypted form) and inform users about how they are stored and how long are they retained. Only keep logs of data that is required and avoid the log of personal data where possible. If you do need to keep logs, then you should inform the user of this and provide further detail in the privacy policy. Do not log personal data or passwords. If your App logs IP addresses, let the user know as well as how long the logs will be saved in the system via your privacy notice.

  **Data sharing** - Do not use the data for any purpose the user has not agreed with. Do not track user activity for business intelligence. Do not show ads based on user behavior or sell user data to a 3rd party without the explicit consent of the user. Avoid security questions that disclose personal information.

  **Data Transfers** – if your App transfers any personal data from the European Economic Area to another non-EEA country, ensure that the transfer of this data is protected in accordance with the GDPR (most typically via the deployment of Standard Contractual Clauses or the Privacy Shield).
