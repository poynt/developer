---
layout: page
title: "On-Cloud Apps"
category: cloud
date: 2017-01-22 16:26:03
---


All Poynt managed services and data are accessible through RESTful APIs in the cloud. These APIs can be used to build applications in the cloud that can sync or process data, create and manage various resources (orders, customers, products, etc.) on-behalf of the merchant, build mobile applications for consumers that connect back to the merchant’s Poynt Terminal, and many more.

{: .center}
![Cloud Apps]({{ site.url }}/developer/assets/developers-poyntos-apis.png)

At a high level consuming Poynt APIs on behalf of a merchant involves the following steps:

1. Register an Application with the resources your application would like to access on behalf of the merchant and obtain API Credentials

2. Obtain Access Token from the Poynt OAuth2.0 end point

3. Make authenticated API calls passing the Access Token in the Authorization header.

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>

<script language="javascript">
window.location="https://poynt.github.io/developer-docs/cloudApps/"
</script>
