---
layout: page
title: "On-Cloud Apps"
category: doc
date: 2015-01-22 16:26:03
---


All Poynt managed services and data are accessible through RESTful APIs in the cloud. These APIs can be used to build applications in the cloud that can sync or process data, create and manage various resources (orders, customers, products, etc.) on-behalf of the merchant, build mobile applications for consumers that connect back to the merchant’s Poynt Terminal, and many more.

{: .center}
![Cloud Apps]({{ site.url }}../assets/developers-poyntos-apis.png)

At a high level consuming Poynt APIs on behalf of a merchant involves the following steps:

1. Register an Application with the resources your application would like to access on behalf of the merchant and obtain API Credentials

2. Obtain Access Token from the Poynt OAuth2.0 end point

3. Make authenticated API calls passing the Access Token in the Authorization header.
