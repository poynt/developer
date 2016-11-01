---
layout: page
title: "Create and Assign catalog to Poynt Register"
category: tut
date: 2015-02-11 16:03:40
---

Assigning a product catalog to a Poynt Register can be done through https://poynt.net
portal. Usually this involves creating a catalog (either through a csv file upload or
  manually entry), and assigning it to a terminal registered with your business.


### Pre-Reqs

1. Register as a Poynt Developer
2. Setup PoyntOS on a Poynt Terminal or an Android device/emulator
3. Activate Poynt Terminal through the 'SetUp Wizard'

### Create a Catalog (using bulk upload method)

1. Login to https://poynt.net with your developer account

2. Select the test business that you want to add the Catalog for.<br />
![Login Account Chooser]({{site.url}}/developer/assets/poynt_net_login_choose_account_screen.png)

3. Click on `PRODUCTS` in the top navigation bar <br />
![Top Nav]({{site.url}}/developer/assets/poynt_net_top_nav.png)

4. Click on `BULK UPLOAD` button <br />
![Products]({{site.url}}/developer/assets/poynt_net_products.png)

5. Download the sample csv file (either the simple catalog or the one with variants),
update it to with your products and categories
  * NOTE: You must maintain the format of each line to match the header inside the file
  * Here is a sample with famous Girl Scout Cookies: [GSCookies.csv]({{site.url}}/developer/assets/GSCookies.csv)
![Bulk Upload]({{site.url}}/developer/assets/poynt_net_bulk_upload.png)

6. Drag and drop your catalog csv file to begin your catalog upload
  * wait until you see the upload as complete (green check mark) <br />
![Bulk Upload Status]({{site.url}}/developer/assets/poynt_net_bulk_upload_complete.png)

7. Click on `PRODUCTS` in the left navigation to confirm the products you've uploaded.

### Assign Catalog to Register

1. Click on `TERMINALS & APPS` in the top navigation bar <br />
![Top Nav]({{site.url}}/developer/assets/poynt_net_top_nav.png)

2. You should see the terminal that you've activate (either on Poynt Terminal or an Android device/emulator) <br />
![Terminals]({{site.url}}/developer/assets/poynt_net_terminals.png)

3. Click on `Edit` under actions to open Terminal info page.

4. Click on `Select Catalog` to open Catalog selection dialog <br />
![Select Catalog]({{site.url}}/developer/assets/poynt_net_select_catalog.png)

5. Once a catalog is selected, it will be assigned to the terminal. <br />
![Terminal Info]({{site.url}}/developer/assets/poynt_net_terminal_with_catalog.png)

6. At this point your terminal is configured with your catalog, and the Poynt Register
would load the Catalog when it's started next time.
  * NOTE: If you do not see the Catalog loaded in to the Poynt Register, try restarting your device/emulator.
  This will happen if the new Catalog message to the device is lost. This is a known issue and we have a fix
  for this in the next version.
