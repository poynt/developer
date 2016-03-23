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

All Poynt RESTful APIs are OAuth2.0 enabled using Json Web Tokens (JWT) as OAuth access tokens. When a new application is registered with Poynt, an Application ID (urn) and API credentials are assigned to the application. The API credentials consist of an RSA public and private key pair. To authenticate your Application in the API calls, you must generate a Json Web Token with your application ID as the issuer and subject, and sign it with the private key assigned to your application. Once the JWT is generated, you can use the OAuth 2.0 JWT assertion grant type to send your self-issued JWT and obtain a Poynt issued application JWT and a refresh token. All your APIs calls can then be authenticated using the Poynt issued JWT you’ve obtained from Poynt service.

To obtain permission to act on-behalf of a merchant (to access their data or service), you must redirect the merchant to Poynt Authorization url along with your Application ID. Poynt Authorization end point will present the necessary information to the merchant, records their approval, and redirects the merchant back to your application’s return url along with the merchant’s business information that you would need for acting on-behalf of them.

<center>![Oauth]({{site.url}}../assets/developers-oauth-token-dance.png)</center>

####Note on Refresh Tokens

As defined in OAuth2 specification, "Refresh tokens are credentials used to obtain access tokens.  Refresh tokens are issued to the client by the authorization server and are used to obtain a new access token when the current access token becomes invalid or expires, or to obtain additional access tokens with identical or narrower scope (access tokens may have a shorter lifetime and fewer permissions than authorized by the resource owner)."

It is recommended that when an application is about to make an API call, it should first check for the validity of the access token by checking it's expiry time. Note that due to clock synchronization issues, some times a token that you mark as still valid - might get rejected by Poynt Server as invalid/expired. So always handle the case when you receive a HTTP status code 401 (UnAuthorized Request) and obtain a new token using the refresh token.

####Sample API Calls

1) Obtain Access token and Refresh token using your own API Credentials. Note that the self-signed-jwt is a JWT that you would generate and sign with your Poynt API credentials.

Here is a sample on how to generate a JWT using [nimbus JWT library](http://connect2id.com/products/nimbus-jose-jwt) for Java. To use the same libraries, please add the following dependencies in your maven/gradle files.
```
    compile 'net.jcip:jcip-annotations:1.0@jar'
    compile 'com.nimbusds:nimbus-jose-jwt:3.9@jar'
    compile 'net.minidev:json-smart:1.2@jar'
```

Sample Java Code:

```
                // Create RSA-signer with the private key
                JWSSigner signer = new RSASSASigner((RSAPrivateKey) keyPair.getPrivate());

                // Audience for the cleaim set
                final List<String> aud = new ArrayList<String>();
                aud.add(cloudConfig.getPoyntAPIHost());

                // Prepare JWT with claims set
                JWTClaimsSet claimsSet = new JWTClaimsSet();
                claimsSet.setAudience(aud);
                claimsSet.setSubject(deviceMetaData.getStoreDeviceId());
                claimsSet.setIssuer(deviceMetaData.getStoreDeviceId());
                claimsSet.setIssueTime(Calendar.getInstance().getTime());
                claimsSet.setExpirationTime(fiveMinutesFromNow());
                claimsSet.setJWTID(UUID.randomUUID().toString());
                if (appSettings != null) {
                    if (appSettings.getBusinessId() != null) {
                        claimsSet.setCustomClaim(Claims.POYNT_BIZ, appSettings.getBusinessId().toString());
                    }
                    if (appSettings.getStoreId() != null) {
                        claimsSet.setCustomClaim(Claims.POYNT_STORE, appSettings.getStoreId().toString());
                    }
                    if (appSettings.getStoreDeviceId() != null) {
                        claimsSet.setCustomClaim(Claims.POYNT_DEVICE_ID, deviceMetaData.getStoreDeviceId());
                    }
                }
                if (Strings.notEmpty(issuedTo)) {
                    claimsSet.setCustomClaim(Claims.POYNT_ISSUED_TO, issuedTo);
                }

                SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.RS256), claimsSet);

                // Compute the RSA Signature
                signedJWT.sign(signer);
                return signedJWT.serialize();
```                

Sample API call to obtain Access Token and Refresh tokens:

```
HTTP POST https://services.poynt.net/token
api-version: 1.2
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Content-Length: 814
grantType=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=<self-signed-jwt>

HTTP 200 https://services.poynt.net/token
Content-Type: application/json;charset=UTF-8
Poynt-Request-Id: bdceda34-7941-449d-88a6-cc28bf738fb9

 {"expiresIn":86400,"accessToken":"<access-token>","refreshToken":"<refresh-token>","scope":"ALL","tokenType":"BEARER"}

```

2) Obtain new Access Token using Refresh token


```
HTTP POST https://services.poynt.net/token
api-version: 1.2
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Content-Length: 169
grantType=REFRESH_TOKEN&refreshToken=<your-refresh-token>

HTTP 200 https://services.poynt.net/token
Content-Type: application/json;charset=UTF-8
Poynt-Request-Id: bdceda34-7941-449d-88a6-cc28bf738fb9

 {"expiresIn":86400,"accessToken":"<access-token>","refreshToken":"<refresh-token>","scope":"ALL","tokenType":"BEARER"}

```
