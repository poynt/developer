---
layout: page
title: "Create and Assign catalog to Terminal"
category: setup
date: 2012-02-11 16:03:40
---

Assigning a product catalog to a Poynt Register can be done through https://poynt.net
portal. Usually this involves creating a catalog (either through a csv file upload or
  manually entry), and assigning it to a terminal registered with your business.


### Pre-Reqs

1. Register as a Poynt Developer
2. Setup PoyntOS on a Poynt Terminal or an Android device/emulator
3. Activate Poynt Terminal through the 'SetUp Wizard'

### Create a Catalog (using bulk upload method)

1. Login to [Developer Portal](https://poynt.net) with your developer account

2. Select the test business that you want to add the Catalog for.<br />
![Login Account Chooser](../assets/assign-catalog1.png){:width="800px"}<br/>
![Login Account Chooser 2](../assets/assign-catalog2.png){:width="800px"}

3. Click on `PRODUCTS` in the top navigation bar <br />
![Top Nav]({{site.url}}/developer/assets/poynt_net_top_nav.png)

4. Click on `BULK UPLOAD` button <br />
![Products](../assets/poynt_net_products.png)

5. Download the sample csv file (either the simple catalog or the one with variants),
update it to with your products and categories
  * NOTE: You must maintain the format of each line to match the header inside the file
  * Here is a sample with famous Girl Scout Cookies: [GSCookies.csv]({{site.url}}/developer/assets/GSCookies.csv)<br/>
![Bulk Upload]({../assets/poynt_net_bulk_upload.png)

6. Drag and drop your catalog csv file to begin your catalog upload
  * Wait until you see the upload as complete (green check mark) <br />
![Bulk Upload Status]({{site.url}}/developer/assets/poynt_net_bulk_upload_complete.png)

7. Click on `PRODUCTS` in the left navigation to confirm the products you've uploaded.

### Assign Catalog to Register

1. Click on `TERMINALS & APPS` in the top navigation bar <br />
![Top Nav]({{site.url}}/developer/assets/poynt_net_top_nav.png)

2. You should see the terminal that you've activated (either on Poynt Terminal or an Android device/emulator) <br />
![Terminals]({{site.url}}/developer/assets/poynt_net_terminals.png)

3. Click on `Edit` under actions to open Terminal info page.

4. Click on `Select Catalog` to open Catalog selection dialog <br />
![Select Catalog]({{site.url}}/developer/assets/poynt_net_select_catalog.png)

5. Once a catalog is selected, it will be assigned to the terminal. <br />
![Terminal Info]({{site.url}}/developer/assets/poynt_net_terminal_with_catalog.png)

6. At this point your terminal is configured with your catalog, and the Poynt Register
would load the Catalog when it's started next time.

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>
