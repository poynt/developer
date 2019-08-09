---
layout: page
title: "POS Bridge"
category: semi
date: 2013-04-01 13:05:00
---


POS Bridge is an Android service that allows allows a point-of-sale application running on an external system (i.e. client) like an iPad or Windows PC to connect to the Poynt terminal over a local network connection (TCP port 55555) using [Poynt iOS SDK](https://github.com/poynt/pos-connector-ios-sdk-sample) or [Windows SDK](https://github.com/poynt/pos-connector-windows-sdk).

POS Bridge can be downloaded and installed from the the Poynt Store.

When POS Bridge app is launched it starts advertising its IP and port using [network service discovery](https://developer.android.com/training/connect-devices-wirelessly/nsd.html). **CONNECT MANUALLY** button can be used to display terminal's IP address and pairing code if the system connecting to the terminal does not support network service discovery.

![POS Bridge home screen](../assets/posbridge1.png){:width="600px"}

Once a pairing request is initiated by the client the POS Bridge will display a confirmation dialog:

![POS Bridge pairing confirmation dialog](../assets/posbridge2.png){:width="600px"}

<p><div class="warning"><span style="font-weight: bold">Note:</span> the confirmation dialog timeout is set to 30 seconds.</div></p>
<p>&nbsp;</p>

After the pairing request is confirmed the POS Bridge will display the name of the connected client. Pairing can be terminated by tapping on **X** button.

![POS Bridge with paired client](../assets/posbridge3.png){:width="600px"}

POS Bridge will remain running in the background and does not need to be open to accept payment requests from the client.

![POS Bridge with Payment Fragment](../assets/posbridge4.png){:width="600px"}

<p><div class="note"><span style="font-weight: bold">Note:</span> At the moment the terminal can be paired with only one client (POS) using POS Bridge.</div></p>
<p>&nbsp;</p>

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>

<script language="javascript">
window.location="https://poynt.github.io/developer-docs/semiIntegration/pos-bridge.html"
</script>
