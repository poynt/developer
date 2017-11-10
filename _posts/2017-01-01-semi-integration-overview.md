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
3. Implementing your own communication protocol leveraging [Poynt Cloud API](cloud/integrating-with-poynt-cloud-apis.html). This is the most flexible option but requires more integration effort from the developer.

### Local Network

[POS Bridge](pos-bridge.html) is a free app that can be downloaded by merchants via Poynt Store. The POS app will need to use either Poynt iOS or Windows SDK to connect to the terminal.

### Other

Since PoyntOS is based on Android, developers have a wide array of options and can implement their own connector using USB, Bluetooth, web sockets, etc.
