---
layout: page
title: "Working with Second Screen"
category: onterminal
date: 2013-04-12 15:05:00
---

## Overview

Poynt Smart Terminal has a customer facing screen (a.k.a. second screen) that allows developers to build apps that can interface with both merchants and consumers. We at Poynt frequently get questions from developers if they can fully customize the UI on the second screen. As Poynt Smart Terminal is a PCI PTS certified device it allows customers to enter their payment card PIN directly on the second screen. Therefore we are required by PCI to have a strict control over the second screen.

While direct access is not allowed PoyntOS SDK provides a variety of templates for the second screen via [IPoyntSecondScreenService](https://poynt.github.io/developer/javadoc/co/poynt/os/services/v1/IPoyntSecondScreenService.html) and [IPoyntSecondScreenService v2](https://poynt.github.io/developer/javadoc/co/poynt/os/services/v2/IPoyntSecondScreenService.html).

To see various configuration options for these screens please refer to *SecondScreenServiceActivity* and *SecondScreenService2Activity* of [PoyntSamples](https://github.com/poynt/PoyntSamples/tree/master/codesamples/src/main/java/co/poynt/samples/codesamples).

## IPoyntSecondScreenService

### showWelcome

This template simply changes the second screen to the default background image. You may want to use this API to reset the second screen to its default state once your application goes to the background or after customer provides some input like phone number and a confirmation message has been displayed. While **showWelcome** allows for optional parameters to display an action button, our recommendation is to use a more robust **displayMessage** API described later in this guide.

![](https://d347164ulyc57y.cloudfront.net/2017/07/_showWelcome.png)

### capturePhone

Allows application to collect phone number from the customer. The labels can be updated to one of the following:

* QR CODE
* EMAIL
* PHONE
* OK
* ENTER
* CONFIRM
* SEND
* CANCEL

Once the customer taps on either of the buttons the client application receives a callback. Please refer to [IPoyntSecondScreenPhoneEntryListener](https://poynt.github.io/developer/javadoc/co/poynt/os/services/v1/IPoyntSecondScreenPhoneEntryListener.html) for details.

![](https://d347164ulyc57y.cloudfront.net/2017/07/_capturePhone.png)


### captureEmailAddress

The client application can collect email input from the customer. Application can optionally pre-fill the email address field and change the action button label to CONFIRM or one of the other values mentioned above.

![](https://d347164ulyc57y.cloudfront.net/2017/07/_captureEmail.png)

### collectTextEntry

API to collect simple text input, e.g. discount code.

![](https://d347164ulyc57y.cloudfront.net/2017/07/_textEntry.png)

### captureCode

**captureCode** API displays a scanner screen and uses the customer facing camera to scan a bar code or QR code.

![](https://d347164ulyc57y.cloudfront.net/2017/07/_scanCode.png)

### showItem

This API takes an list of OrderItem objects to display the cart contents and running total.

![](https://d347164ulyc57y.cloudfront.net/2017/07/_showCart.png)

### showCheckIn

The application can pass a background image, button image and button label to customize the screen.

![](https://d347164ulyc57y.cloudfront.net/2017/07/_displayMessageV1.png)


## IPoyntSecondScreenService V2

### captureTip

If a merchant is configured to do tip adjust Payment Fragment by default includes the tip screen in the payment flow. If the application wants to have greater control over the payment experience it can suppress the tip screen as part of the Payment Fragment flow by setting `Payment.disableTip(true)` and call **captureTip** API to collect the tip amount before the transaction, for example. The text prompt on the template and the tip amounts/percentages are configurable.

![](https://d347164ulyc57y.cloudfront.net/2017/07/_captureTipV2.png)


### captureSignature

**captureSignature** returns a bitmap of customer's autograph. Both text prompts and the label on the right button are configurable by the client app.

![](https://d347164ulyc57y.cloudfront.net/2017/07/_captureSignatureV2.png)

### captureReceiptChoice

This API allows presenting up to 4 receipt choices:

* No receipt
* Paper
* Email
* SMS

If the email or phone number are passed as parameters, they will be displayed as part of the button label and enable one tap receipt selection for email and phone  options. The text prompt and the footer text are configurable.

![](https://d347164ulyc57y.cloudfront.net/2017/07/_captureReceiptChoiceV2.png)

### displayMessage

This template can be used to display general confirmation messages to the customer. The message is centered on the screen and can be styled using RGB font color and simple HTML tags (e.g. **H1**, **P**). The background image is also customizable. The message text is optional so this API can be used as a building block to enable rotating ad images.

![](https://d347164ulyc57y.cloudfront.net/2017/07/_displayMessageV2.png)

### captureAgreement

This API can be called by passing either text content, HTML or a URL. The labels of the buttons are configurable.

![](https://d347164ulyc57y.cloudfront.net/2017/07/_captureAgreementV2.png)

### scanCode

Similar for **captureCode** API. The text prompt and button labels are configurable.

![](https://d347164ulyc57y.cloudfront.net/2017/07/_scanCodeV2.png)

### showCartConfirmation

While similar to **showItem** API this template has action buttons to allow for additional functionality like allowing customer to confirm the cart contents or to add tip. Text prompt ("CONFIRM" in the screenshot) and button labels are configurable.

![](https://d347164ulyc57y.cloudfront.net/2017/07/_showCartConfirmation.V2.png)

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>

<script language="javascript">
window.location="https://poynt.github.io/developer-docs/terminalApps/second-screen.html"
</script>

