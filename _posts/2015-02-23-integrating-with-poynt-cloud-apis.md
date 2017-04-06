---
layout: page
title: "Integrating with Poynt Cloud APIs"
category: tut
date: 2015-02-23 17:20:24
---

<style>
.alert{
  position: relative;
  margin: 0 auto;
  padding: 15px;
  font-size: 12px;
  color: #264c72;
  border: 1px solid #97c1da;
  border-radius: 3px;
  background-color: #d8ebf8;
  background: -moz-linear-gradient(#d8ebf8, #d0e3ef);
  background: -webkit-linear-gradient(#d8ebf8, #d0e3ef);
  -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#d8ebf8', endColorstr='#d0e3ef')";
  box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
  text-shadow: 0 1px 0 rgba(255, 255, 255, .8)
}
.warning{
  position: relative;
  margin: 0 auto;
  padding: 15px;
  font-size: 12px;
  color: #000000;
  border: 1px solid #999999;
  border-radius: 3px;
  background-color: #f8fba8;
  background: -moz-linear-gradient(#f8fba8, #F0F3Af);
  background: -webkit-linear-gradient(#f8fba8, #F0F3Af);
  -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#f8fba8', endColorstr='#F0F3Af')";
  box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
  text-shadow: 0 1px 0 rgba(255, 255, 255, .8)
}
</style>

Poynt Cloud APIs can be used to build applications in the cloud that can sync or process data, create and manage various resources (orders, customers, products, etc.) on-behalf of the merchant, build mobile applications for consumers that connect back to the merchant’s Poynt Terminal, and many more.

All Poynt APIs are built with commonly used RESTful design patterns in the industry. All APIs using the standard OAuth2.0 authentication & authorization framework and uses Json Web Tokens (aka JWTs) as bearer tokens.

<div class="alert">
<p>
  <strong>Note:</strong> If you already have an on-terminal app you can use it's appId to make cloud API calls without additional authorization from the merchant as long as the app is installed on their terminal.
</p>
</div>
<p></p>

To consume Poynt APIs you must:

1. Signup on [Poynt Developer Portal](https://poynt.net/auth/signup/developer)
2. After you’re registered, you will see Poynt Developer dashboard.
    - All developers by default are assigned their default developer organization so they can invite other teammates to join and access the same applications. You can try this out later after setting up your device.
3. On the dashboard, click on "COMPLETE YOUR PROFILE”, enter any missing information (eg. Website Url) and click on Save.
4. On the dashboard, click on “CREATE A TEST MERCHANT” to create a test merchant for your development activity.
![Create Cloud Application]({{site.url}}/developer/assets/poynt_net_create_new_app2.png)
5. Once a test merchant is created, go to  "DEVELOPMENT" > "Cloud apps" and   click on "CREATE A CLOUD APPLICATION", to create an application to integrate with Poynt APIs.
6. Fill in all the required fields and submit.
![Create Cloud Application]({{site.url}}/developer/assets/poynt_net_new_app2.png){:height="800px" width="600px"}
7. Save your newly created application credentials.
![Create Cloud Application]({{site.url}}/developer/assets/poynt_net_app_created_credentials2.png){:height="350" width="600"}

8. Obtain merchant's permission to access Poynt APIs on behalf of them (access their data)
    1. Construct Poynt Authorization url to redirect the merchant to:
        - e.g. [https://poynt.net/applications/authorize?redirect_uri=http%3A%2F%2Fgetdemoapp.com%2Freturn_from_poynt&client_id=urn%3Aaid%3A5b4e9993-c815-4070-9859-35f48e492b4f&context=python-test-script](https://poynt.net/applications/authorize?redirect_uri=http%3A%2F%2Fgetdemoapp.com%2Freturn_from_poynt&client_id=urn%3Aaid%3A5b4e9993-c815-4070-9859-35f48e492b4f&context=python-test-script)
        - where `redirect_uri` is an HTTPS page hosted on your own site that will be called with the OAuth authorization code. (Note that this should match the url you've configured in your application settings)
        - `client_id` is your newly created application id starting with urn:aid:
        - `context` is any string value that you would like passed to your callback URL, e.g. a session ID or a user ID on your side so you can match it with the authenticated merchant. This is optional.
    2. Redirect the merchant to Poynt Authorization url to obtain the necessary permission. The merchant will be prompted to allow access to the resources you specified for your app. If the merchant has already given you permission, the page will automatically redirect to the next step.
        - Note for development you can use your own test merchant account to give permission and experiment with the APIs.
        ![Authorization Page]({{site.url}}/developer/assets/authorize_screenshot.png){:height="390" width="600"}
    3. Merchant gets redirected back to your redirect_uri with `code`, `status`, `context` (optional) and merchant's `businessId`.
        - Note that `businessId` is a deprecated parameter that has been temporarily kept for backwards compatibility.
        - `status` provides you info on whether your request has been authorized by the merchant or not.
9. From your server make a HTTP POST request to `https://services.poynt.net/token` and include the following headers and arguments:
    1. **Header:** Accept: application/json
    2. **Header:** Authorization: Bearer {self-signed-JWT}
    3. **HTTP param:** grant_type=authorization_code
    4. **HTTP param:** redirect_uri={redirect_uri}
    5. **HTTP param:** client_id={appId}
    6. **HTTP param:** code={code} <br>

Example request:
    {% highlight curl %}
    curl -XPOST 'https://services.poynt.net/token' \
    -H "Accept: application/json" \
    -H "Authorization: Bearer  <self-signed-jwt>  \
    -d 'grant_type=authorization_code&code={CODE}&client_id={APP_ID}&redirect_uri={OAUTH CALLBACK URL}'
    {% endhighlight %}

Example response:
{% highlight json linenos %}
{
    "expiresIn": 86400,
    "accessToken": "eyJhbGciOiJSUzI1NiJ9.eyJwb3ludC51aWQiOjE1MjYzNzgsInN1YiI6InVy...",
    "refreshToken": "1:1:1:2:emjXrINpTMI7aLvMZfdPHEH/OTtSZlI+BqfmBi+iJ0aRS40BJrYWvqU04I...",
    "scope": "ALL",
    "tokenType": "BEARER"
}
{% endhighlight %}

The accessToken is an encoded JWT (https://jwt.io) containing a poynt.biz attribute representing the authenticated merchant's business ID:
{% highlight json linenos %}
{
  "poynt.uid": 1526378,
  "sub": "{YOUR_APP_ID}",
  "aud": "{YOUR_APP_ID}",
  "poynt.aur": "{APP_PACKAGE_NAME}",
  "poynt.sct": "J",
  "poynt.org": "c4f29c0d-f818-4521-9ae1-21f385628c25",
  "poynt.biz": "{MERCHANT_BUSINESS_ID}",
  "iss": "https://services.poynt.net",
  "poynt.kid": 6957716317166682000,
  "exp": 1463519061,
  "iat": 1463432661,
  "jti": "c374c9f8-87bd-4705-b3d0-e6d078fd17af"
}
{% endhighlight %}

At this point your app has all the necessary permissions to make API calls on behalf of the merchant.
<div class="warning">
  <p><strong>Warning:</strong> Your private key cannot be recovered, so please save them it a safe location. If you lose your private key you will be able to reset the public/private keypair for your appId</p>
</div>
<p>&nbsp;</p><p>&nbsp;</p>



## Making the first API call

As mentioned above, all Poynt APIs are secured with OAuth2.0 authentication and authorization framework. Before you make an API call on-behalf of a merchant, you must obtain the merchant's permission to access their data and call Poynt APIs on their behalf as mentioned in the section above. Once you've obtain the merchant's permission, follow the steps below to make your first API call:

#### Step 1
The first and foremost thing we need to do is to obtain an access token. We do that by generating a self-signed JWT using the private-key obtained from the Poynt Developer Portal and POST it to token API to obtain Poynt granted AccessToken, TokenType and RefreshToken. Below is a snippet from our [python sample hosted on github](https://github.com/poynt/python-sample).
{% highlight python linenos %}
  def getAccessToken(self):
          poyntTokenUrl = self.apiHost + "/token"
          currentDatetime = datetime.utcnow()
          expiryDatetime = datetime.utcnow() + timedelta(seconds=300)
          payload = {
              'exp': expiryDatetime,
              'iat': currentDatetime,
              'iss': self.applicationId,
              'sub': self.applicationId,
              'aud': 'https://services.poynt.net',
              'jti': str(uuid.uuid4())
          }
          encodedJWT = jwt.encode(payload, self.rsaPrivateKey, algorithm='RS256')
          payload = {'grantType':'urn:ietf:params:oauth:grant-type:jwt-bearer', 'assertion':encodedJWT}
          print "Obtaining AccessToken using self-signed JWT:"
          code, jsonObj = self._sendFormPostRequest(poyntTokenUrl, payload, {})
          if code == requests.codes.ok:
              self.accessToken = jsonObj['accessToken']
              self.tokenType = jsonObj['tokenType']
              self.refreshToken = jsonObj['refreshToken']
              return True
          else:
              print "*** FAILED TO OBTAIN ACCESS TOKEN ***"
              return False
  {% endhighlight %}

  This will generate a HTTP POST API call to /token API to obtain an Access Token (JWT). Below is a sample raw HTTP request - note that your self-signed JWT must be passed as the 'assertion' parameter:

  {% highlight lineos %}
  POST https://services.poynt.net/token
  api-version: 1.2
  Content-Type: application/x-www-form-urlencoded
  Content-Length: 749
  Poynt-Request-Id: 54d6c99a-7520-46dc-814d-1793c086bc5c
  grantType=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=eyJhbGciOiJSUzI1NiIsInR5cCI...
  {% endhighlight %}

#### Step 2
Retrieve the access and refresh tokens from the Poynt's /token API response. Sample response:

{% highlight json lineos %}
{
    "accessToken": "eyJhbGciOiJSUzI1NiJ9.eyJleHA...",
    "expiresIn": 86400,
    "refreshToken": "1:1:1:1:+XSWRztWqmZP7AC55IK...",
    "scope": "ALL",
    "tokenType": "BEARER"
}
{% endhighlight %}

#### Step 3
At this point you can make any Poynt API calls by passing the access token as part of the Authorization header. Note that the 'Authorization' header consists of token type 'BEARER' and the the actual token value.

{% highlight lineos %}
GET https://services.poynt.net/businesses/411c9612-2079-45ba-9a9d-a7b36140b0f1/catalogs
api-version: 1.2
Authorization: BEARER eyJhbGciOiJSUzI1NiJ9.eyJl...
{% endhighlight %}

A functional [sample in Python](https://github.com/poynt/python-sample) has been provided on github as a reference. Please give it a try to understand how to make API calls and their behavior. Please refer to the [Poynt API reference](https://poynt.com/docs/api/) for more information on the API resources available.
