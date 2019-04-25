---
layout: page
title: "Integrating with Poynt Cloud APIs"
category: cloud
date: 2016-02-23 17:20:24
---


Poynt Cloud APIs can be used to build applications in the cloud that can sync or process data, create and manage various resources (orders, customers, products, etc.) on-behalf of the merchant, build mobile applications for consumers that connect back to the merchant’s Poynt Terminal, and many more.

All Poynt APIs are built with commonly used RESTful design patterns in the industry. All APIs using the standard OAuth2.0 authentication & authorization framework and uses Json Web Tokens (aka JWTs) as bearer tokens.

<div class="note">
<p>
  <strong>Note:</strong> If you already have an on-terminal app you can use it's appId to make cloud API calls without additional authorization from the merchant as long as the app is installed on their terminal.
</p>
</div>
<p></p>

To consume Poynt APIs you must:

1. Signup on [Poynt Developer Portal](https://poynt.net/auth/signup/developer)
2. After you’re registered, you will see Poynt Developer dashboard.
      - All developers by default are assigned their default developer organization so they can invite other teammates to join and access the same applications. You can try this out later after setting up your device.
3. On the dashboard, click on “MERCHANTS” tab. To create a test merchant for your development activity, enter the Merchant Name and Bank and click "Submit".<br/>
<img class="shadow"  src="../assets/poynt_net_create_test_merchant.png" alt="Create Test Merchant" width="800"/>

1. Once a test merchant is created, go to  "DEVELOPMENT" -> click on "Create an app".<br/>
<img class="shadow"  src="../assets/poynt_net_create_new_app.png" alt="Create New Application" width="800"/>

5. <a name="create-app"></a>Enter the App name and click on "Submit" button.<br/>
<img class="shadow"  src="../assets/poynt_net_create_new_app2.png" alt="Create New Application" width="800"/>

1. Click on "Download keypair" to save your newly created application credentials and click on "Go to app".<br/>
<img class="shadow"  src="../assets/poynt_net_create_new_app3.png" alt="Create New Application" width="800"/><br/>
    <div class="warning"><p><strong>Warning:</strong> Your private key cannot be recovered, so please save them it a safe location. If you lose your private key you will be able to reset the public/private keypair for your appId</p></div><p>&nbsp;</p>

7. You should now be able to see the newly created application.<br/>
  <img class="shadow"  src="../assets/poynt_net_create_new_app_success.png" alt="New Application Created" width="800"/><br/>

8. Complete the application information by clicking on "Edit app details" and filling the required fields. Click on "Save" button.<br/>
<img class="shadow"  src="../assets/poynt_net_create_new_app_info.png" alt="Fill Application Info" width="800"/><br/>

9. Click on "Cloud Permissions", enter the OAuth callback URL and edit the permissions. Click on "Save" button.<br/>
<img class="shadow"  src="../assets/poynt_net_create_app_permissions.png" alt="Fill Application Info" width="800"/><br/>

10. <a name="authorize-merchant"></a>Obtain merchant's permission to access Poynt APIs on behalf of them (access their data)
    1. Construct Poynt Authorization url to redirect the merchant to:
        - e.g. [https://poynt.net/applications/authorize?redirect_uri=http%3A%2F%2Fgetdemoapp.com%2Freturn_from_poynt&client_id=urn%3Aaid%3A5b4e9993-c815-4070-9859-35f48e492b4f&context=python-test-script](https://poynt.net/applications/authorize?redirect_uri=http%3A%2F%2Fgetdemoapp.com%2Freturn_from_poynt&client_id=urn%3Aaid%3A5b4e9993-c815-4070-9859-35f48e492b4f&context=python-test-script)
        - where `redirect_uri` is an HTTPS page hosted on your own site that will be called with the OAuth authorization code. (Note that this should match the url you've configured in your application settings)
        - `client_id` is your newly created application id starting with urn:aid:
        - `context` is any string value that you would like passed to your callback URL, e.g. a session ID or a user ID on your side so you can match it with the authenticated merchant. This is optional.
    1. Redirect the merchant to Poynt Authorization url to obtain the necessary permission. The merchant needs to login to authorize.<br/>
      <div class="note">Note for development you can use your own test merchant account to give permission and experiment with the APIs. <br/>  </div>
      <img class="shadow"  src="../assets/poynt_net_login_developer.png" alt="Merchant Sign In" width="800"/><br/>
      
11.  The merchant will be prompted to allow access to the resources you specified for your app.  If the merchant has already given you permission, the page will automatically redirect to the next step. <br/>
      <div class="note">Note for developers, you need to login with your developer account credentials to see the next steps.<br/>  </div>
        
     1.  Select the test merchant<br/>
        <img class="shadow"  src="../assets/poynt_net_login_choose_account_screen.png" alt="Authorization Page" width="800"/>
        
     2.   Authorize by clicking on "Authorize Access"<br/>
       <img class="shadow"  src="../assets/poynt_net_authorize.png" alt="Authorization Page" width="800"/><br/>
12. Merchant gets redirected back to your redirect_uri with `code`, `status`, `context` (optional) and merchant's `businessId`.<br/>               
   - Note that `businessId` is a deprecated parameter that has been temporarily kept for backwards compatibility.<br/>
   - `status` provides you info on whether your request has been authorized by the merchant or not.

13. From your server make a HTTP POST request to `https://services.poynt.net/token` and include the following headers and arguments:<br/>  
    - **Header:** Accept: application/json<br/>  
    - **Header:** Authorization: Bearer {self-signed-JWT}<br/>  
    - **HTTP param:** grant_type=authorization_code<br/>  
    - **HTTP param:** redirect_uri={redirect_uri}<br/>  
    - **HTTP param:** client_id={appId}<br/>  
    - **HTTP param:** code={code} <br>

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

14. To terminal merchant's login session redirect merchant to `https://poynt.net/auth/signout?redirect={URL_TO_REDIRECT_MERCHANT}`. </br>

At this point your app has all the necessary permissions to make API calls on behalf of the merchant.


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

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>
