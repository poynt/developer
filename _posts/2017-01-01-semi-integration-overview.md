---
layout: page
title: "Overview"
category: semi
date: 2017-01-22 16:26:03
---

Poynt provides several ways for external systems to integrate with the terminal.

### Poynt Cloud.

There are several way of integrating an external POS with Poynt:

1. [Payment Bridge API](integrating-payment-bridge-api.html). This API provides support for basic sale, void and refund operations.
2. Using [PnP button](plug-and-pay.html) which requires no API integration. Payment button can be embed in your web-based POS using our javascript snippet.
3. Implementing your own communication protocol leveraging [Poynt Cloud API](../cloud/integrating-with-poynt-cloud-apis.html). This is the most flexible option but requires more integration effort from the developer.

### Local Network

[POS Bridge](pos-bridge.html) is a free app that can be downloaded by merchants via Poynt Store. The POS app will need to use either Poynt iOS or Windows SDK to connect to the terminal.

### Other

Since PoyntOS is based on Android, developers have a wide array of options and can implement their own connector using USB, Bluetooth, web sockets, etc.

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>

<script language="javascript">
window.location="https://poynt.github.io/developer-docs/semiIntegration/"
</script>
