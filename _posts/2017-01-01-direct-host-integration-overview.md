---
layout: page
title: "Overview"
category: acquirer
date: 2017-01-01 07:05:00
---

Poynt has 2 ways of integrating with payment processors and gateways:

![Integraiton Options]({{site.url}}/developer/assets/host-integration-options.png){:width="800px"}

**Option A** is typically implemented by Poynt.

**Option B** can be implemented by the payment processor or a third-party ISV. Unlike building a payment application on a traditional terminal, integrating with another processing host on Poynt does not require building a payment UI or implementing low level card reader commands - this is taken care of by the Poynt Services app. Poynt providers a Transaction Service interface that you would need to implement in your service application to provide data translation and the communication between the terminal and your host.

<div class="alert"> <strong>Note:</strong> This integration option requires E2EE (end-to-end encryption) of card data. If your host does not support E2EE direct integration will not be possible.</div>
<p/>
Since Option B is a self-integration and Poynt will provide only limited support, the following is required:

* Expert knowledge of Java and Android
* Knowledge of the EMV protocol
* Ability to go through the brand certification process for your payment processor

If you would like to get additional information please contact devsupport@poynt.com.

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>
