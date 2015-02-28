---
layout: page
title: "Integrating with Poynt Cloud APIs"
category: tut
date: 2015-02-23 17:20:24
---

Poynt Cloud APIs can be used to build applications in the cloud that can sync or process data, create and manage various resources (orders, customers, products, etc.) on-behalf of the merchant, build mobile applications for consumers that connect back to the merchant’s Poynt Terminal, and many more.

All Poynt APIs are built with commonly used RESTful design patterns in the industry. All APIs using the standard OAuth2.0 authentication & authorization framework and uses Json Web Tokens (aka JWTs) as bearer tokens.

To consume Poynt APIs you must:

1. Signup on Poynt Developer Portal: https://poynt.net/auth/signup/developer
2. After you’re registered, you will see Poynt Developer dashboard.
    - All developers by default are assigned their default developer organization so they can invite other teammates to join and access the same applications. You can try this out later after setting up your device.
3. On the dashboard, click on "COMPLETE YOUR PROFILE”, enter any missing information (eg. Website Url) and click on Save.
4. On the dashboard, click on “CREATE A TEST MERCHANT” to create a test merchant for your development activity.
5. Once a test merchant is created, click on "CREATE A CLOUD APPLICATION", to create an application to integrate with Poynt APIs.
![Create Cloud Application]({{site.url}}../assets/poynt_net_create_new_app.png)
6. Fill in all the required fields and submit.
![Create Cloud Application]({{site.url}}../assets/poynt_net_new_app.png)
7. Save your newly created application credentials. Please note that these API credentials cannot be recovered, so please save them in a safe location.
![Create Cloud Application]({{site.url}}../assets/poynt_net_app_created_credentials.png)
8. Obtain merchant's permission to access Poynt APIs on behalf of them (access their data)
    1. Construct Poynt Authorization url to redirect the merchant to:
        - ex. https://poynt.net/applications/authorize?callback=http%3A%2F%2Fgetdemoapp.com%2Freturn_from_poynt&applicationId=urn%3Aaid%3A5b4e9993-c815-4070-9859-35f48e492b4f&context=python-test-script
        - where, 'callback' is where you would want the merchant to be redirect back to. Note that this should match the url you've configured in your application settings
        - 'applicationId' is your newly created application Id
        - 'context' is any url safe value that you would like the Poynt Authorization url to return back in the redirect to your callback.
    2. Redirect the merchant to Poynt Authorization url to obtain the necessary permission.
        - Note for development you can use your own test merchant account to give permission and experiment with the APIs.
    3. Merchant gets redirected back to your callback with merchant's 'businessId' and 'status'.
        - You would need the 'businessId' to access Poynt APIs on behalf of the merchant
        - 'status' provides you info on whether your request has been authorized by the merchant or not.
8. At this point your app has all the necessary permissions to make API calls on behalf of the merchant.



## Making the first API call

As mentioned above, all Poynt APIS are secured with OAuth2.0 authentication and authorization framework. Before you make an API call on-behalf of a merchant, you must obtain the merchant's permission to access their data and call Poynt APIs on their behalf as mentioned in the section above. Once you've obtain the merchant's permission, follow the steps below to make your first API call:

1) The first and foremost thing we need to do is to obtain an access token. We do that by generating a self-signed JWT using the private-key obtained from the Poynt Developer Portal and POST it to token API to obtain Poynt granted AccessToken, TokenType and RefreshToken. Below is a snippet from our [python sample hosted on github](https://github.com/poynt/python-sample).

  ```
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
  ```
  This will generate a HTTP POST API call to /token API to obtain an Access Token (JWT). Below is a sample raw HTTP request - note that your self-signed JWT must be passed as the 'assertion' parameter:

  ```
  POST https://services.poynt.net/token
  api-version: 1.2
  Content-Type: application/x-www-form-urlencoded
  Content-Length: 749
  Poynt-Request-Id: 54d6c99a-7520-46dc-814d-1793c086bc5c
  grantType=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1cm46YWlkOmIzMmZiNTQwLWU3MzAtNDJiOS05YjFkLWMxMzEwODdkMWRjZCIsImlzcyI6InVybjphaWQ6YjMyZmI1NDAtZTczMC00MmI5LTliMWQtYzEzMTA4N2QxZGNkIiwianRpIjoiZmM5YWYwMGMtZDYxYS00YmM0LWFhNTEtMGQ0Njk0ZjJkNTg4IiwiZXhwIjoxNDI1MTA3NjQ5LCJpYXQiOjE0MjUxMDczNDksImF1ZCI6Imh0dHBzOi8vc2VydmljZXMucG95bnQubmV0In0.ffBbujoeDfm8U5rCPxeuwGCjNWhco3EN5jfHOJgonIBIpmdh0QOTUrArb7tPOrNAiSCq-fYNJUz9AeJl0YAGXNeWgWjv3jbEOzx5Ym3KWX-_n66nWzg1nXUC5vn2BxaVNxt9vdjdiQEPB0gKE4RxSQ45lURhKqs1bMdR5tWQ1y4Oo7jfbIxen-3JFYqz0kfTvjDAPL9qmXxXcCgKgXh94Z4Pw3hAjhVjTMSXS03dhIhvwHr7EmdnP3l5aQJDUDkFj1LS-Pt2wr9MUnqP2yWoo_JKYMg36bWIuLStKNYWSESRQKLN12g-P0o-gfBxNuNmqOskanf5qrjKO8BpZCwNPg
  ```

2) Retrieve the access and refresh tokens from the Poynt's /token API response. Sample response:

```
{
    "accessToken": "eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE0MjUxOTM3NDUsInN1YiI6InVybjphaWQ6YjMyZmI1NDAtZTczMC00MmI5LTliMWQtYzEzMTA4N2QxZGNkIiwicG95bnQuc2N0IjoiSiIsImF1ZCI6WyJ1cm46YWlkOmIzMmZiNTQwLWU3MzAtNDJiOS05YjFkLWMxMzEwODdkMWRjZCJdLCJpc3MiOiJodHRwczpcL1wvc2VydmljZXMucG95bnQubmV0IiwicG95bnQuYXVyIjoidXJuOmFpZDo0YTkzMTc3MC1hMGViLTExZTQtOGFmYy0wNzZiYzcwYjkwNTEiLCJqdGkiOiIwYmFhNTMyOC03ZmEzLTQ0MTEtYWE0Mi1hM2FhMTdmNTUxNTEiLCJpYXQiOjE0MjUxMDczNDUsInBveW50Lm9yZyI6e319.OaoOuuiYJ8dnq_690HHPwNjQPNaq372pgPY2TQ4F-72OQDStylFY9CB2tpCbHQViT8IcQGMgcKJiXdKkrt7Rqo3DUAkGNRaqNAZR-8kQ_hZ3-n2zhvwM0XbkyH7wD2DPw2JYx-wjcccRifypr3R_BSWkqyUB-LW9-dsXXuDbveYHO6WwYQacaISl-r6FACQBeKZEqVr_gx4P9tUpq6Q8LFyNOrtEpbWbdkqHdMFVK_O3e1gbrI1X7XSiC8tIDGB0zX_8MMdciZYTRbSCJKYkgjf6_SkNe7PF6hVCZPRZzVNFlybbdf7p2G1eVMi-YT4o6zZQcJkht_UDA2YmjMt_Cw",
    "expiresIn": 86400,
    "refreshToken": "1:1:1:1:+XSWRztWqmZP7AC55IK6MDJNLgo45eIDVQiG0LADuA9QhCTD1i0ZkfsRXGulDCfFQoug9QIk0xKpvahieVos0LubRJmM/wwghVn8YdFc6s4=",
    "scope": "ALL",
    "tokenType": "BEARER"
}
```

3) At this point you can make any Poynt API calls by passing the access token as part of the Authorization header. Note that the 'Authorization' header consists of token type 'BEARER' and the the actual token value.

```
GET https://services.poynt.net/businesses/411c9612-2079-45ba-9a9d-a7b36140b0f1/catalogs
api-version: 1.2
Authorization: BEARER eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE0MjUxOTM3NDUsInN1YiI6InVybjphaWQ6YjMyZmI1NDAtZTczMC00MmI5LTliMWQtYzEzMTA4N2QxZGNkIiwicG95bnQuc2N0IjoiSiIsImF1ZCI6WyJ1cm46YWlkOmIzMmZiNTQwLWU3MzAtNDJiOS05YjFkLWMxMzEwODdkMWRjZCJdLCJpc3MiOiJodHRwczpcL1wvc2VydmljZXMucG95bnQubmV0IiwicG95bnQuYXVyIjoidXJuOmFpZDo0YTkzMTc3MC1hMGViLTExZTQtOGFmYy0wNzZiYzcwYjkwNTEiLCJqdGkiOiIwYmFhNTMyOC03ZmEzLTQ0MTEtYWE0Mi1hM2FhMTdmNTUxNTEiLCJpYXQiOjE0MjUxMDczNDUsInBveW50Lm9yZyI6e319.OaoOuuiYJ8dnq_690HHPwNjQPNaq372pgPY2TQ4F-72OQDStylFY9CB2tpCbHQViT8IcQGMgcKJiXdKkrt7Rqo3DUAkGNRaqNAZR-8kQ_hZ3-n2zhvwM0XbkyH7wD2DPw2JYx-wjcccRifypr3R_BSWkqyUB-LW9-dsXXuDbveYHO6WwYQacaISl-r6FACQBeKZEqVr_gx4P9tUpq6Q8LFyNOrtEpbWbdkqHdMFVK_O3e1gbrI1X7XSiC8tIDGB0zX_8MMdciZYTRbSCJKYkgjf6_SkNe7PF6hVCZPRZzVNFlybbdf7p2G1eVMi-YT4o6zZQcJkht_UDA2YmjMt_Cw
```

A functional [sample in Python](https://github.com/poynt/python-sample) has been provided on github as a reference. Please give it a try to understand how to make API calls and their behavior. Please refer to the [Poynt API reference](https://getpoynt.com/docs/api/) for more information on the API resources available.
