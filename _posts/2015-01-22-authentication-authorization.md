---
layout: page
title: "Authentication & Authorization"
category: doc
date: 2015-01-22 15:36:03
---

### On-Terminal Apps

Every merchant’s business has business users (aka employees) that login to the terminal using their secure user id and passcode. Poynt Terminal maintains the authenticated sessions and enforces the session timeouts based on the user’s activity on the device. Application running on the device can request an access token (Json Web Token - JWT) that corresponds to the current user and use the token to authenticate their own requests to their servers (we recommend using Authorization header with token type as BEARER). Application servers can validate the JWT using Poynt’s public key and extract the authenticated business user and business information from the token. This information can be used to establish identity federation link between 3rd party services and Poynt identities.

In case of on-terminal applications (which are typical Android apps), permissions are enforced through the usage of declarations in their AndroidManifest file. The merchant must authorize the application for the permissions that the app is requesting during the time of the install.


### On-Cloud Apps

All Poynt RESTful APIs are OAuth2.0 enabled using Json Web Tokens (JWT) as OAuth access tokens. When a new application is registered with Poynt, an Application ID (urn) and API credentials are assigned to the application. The API credentials consist of an RSA public and private key pair. To authenticate your Application in the API calls, you must generate a Json Web Token with your application ID as the issuer and subject, and sign it with the private key assigned to your application. Once the JWT is generated, you can use the OAuth 2.0 JWT assertion grant type to send your self-issued JWT and obtain a Poynt issued application JWT. All your APIs calls can then be authenticated using the Poynt issued JWT you’ve obtained from Poynt service.

To obtain permission to act on-behalf of a merchant (to access their data or service), you must redirect the merchant to Poynt Authorization url along with your Application ID. Poynt Authorization end point will present the necessary information to the merchant, records their approval, and redirects the merchant back to your application’s return url along with the merchant’s business information that you would need for acting on-behalf of them.

<center>![Oauth]({{site.url}}assets/developers-oauth-token-dance.png)</center>
