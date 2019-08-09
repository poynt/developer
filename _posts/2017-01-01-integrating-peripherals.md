---
layout: page
title: "Integrating Peripherals"
category: peripherals
date: 2017-01-01 13:05:00
---

## Overview
There is a [number of external peripherals](https://poynt.zendesk.com/hc/en-us/articles/115005423568-Supported-Peripherals) that are supported on Poynt by default. However there is a wide number of other peripherals (or accessories) or models that merchants may want to connect to their terminal and to ensure that developers can connect new devices we have provided an API to do that.

An Accessory Provider is a android app that manages one of the accessories connected to Poynt device. Example of accessories are Cash Drawer, Cash Register, Scale etc. Once implemented, merchants can connect to the new accessory using [Poynt Accessory Manager](https://poynt.zendesk.com/hc/en-us/articles/115012962708-Connect-a-USB-Accessory). 

In order to create a accessory provider you need to perform the following steps:

1. Register your app with accessory manager by providing an xml definition in your **AndroidManifest** file.
2. Create a Accessory Broadcast Receiver class to handle **ACCESSORY\_ATTACHED** and **ACCESSORY\_DETACHED** intent action.
3. Create a Accessory Service class that will initialize and talk to the actual accessory when the events mentioned above are received.
4. Expose Accessory functionality to rest of the system by implementing standard service interface.

## Details

### Registering accessory provider with Accessory Manager.

First step of providing a support and managing an accessory is to register your app with Accessory Manager.

Registering is done via an XML defined in AndroidManifest.xml

```xml
<application>
    <!-- meta-data defines the list of accessories this app supports -->
    <!-- Poynt Accessory Manager will look for meta-data with name
    "co.poynt.accessory.resources" to get the list of supported accessories by this app.-->
    <meta-data
        android:name="co.poynt.accessory.resources"
        android:resource="@xml/accessory" />

    <receiver
        android:name=".AccessoryReceiver"
        android:enabled="true"
        android:exported="true">
        <intent-filter>
            <action android:name="co.poynt.accessory.manager.action.ACCESSORY_ATTACHED" />
            <action android:name="co.poynt.accessory.manager.action.ACCESSORY_DETACHED" />
        </intent-filter>
    </receiver>
</application>
```

You will also need to register your BroadcastReceiver class and the Intents *ACCESSORY_DETACHED* and *ACCESSORY_ATTACHED* as you see above.

Define the information of the accessory in an xml file. You will need to know the vendor id and product id of your accessory device.

```xml
<accessories xmlns:android="http://schemas.android.com/apk/res/android">
 <!-- model-name: Name of accessory as understood by user.
     This name should match the model name defined by manufacturer -->
 <!-- category: Defines the category of the device been supported -->
 <!-- package: name of the package designated to handle this accessory -->
 <!-- service_class: name of the service class that will expose interface for this accessory
      this service class could be different that actual accessory service.-->
 <!-- Please refer to AccessoryProvider and AccessoryType in Poynt SDK -->
 <!-- For example in order to expose CashDrawer function to rest of the system accessory
      provider service needs to implement ICashDrawerService interface. -->

 <!-- REQUIRED: application id of this app
      this appid is issued by poynt web portal
      IMPORTANT: Replace this appid with your appid.-->
 <!--<appid>urn:aid:0f39b7a3-b9db-41f1-9cdb-9f04a3620ade</appid>-->
 <appid>urn:aid:d3462a56-737b-4419-b54c-39a59f4dc8d6</appid>

<!--
Supported categories:
- "Printer"
- "Cash Drawer"
- "Scanner"
-->
  <accessory
       category="Cash Drawer"
       model-name="Generic"
       version="1.0"
       service_class="co.poynt.accessory.CashDrawerService"
       type="usb" >
       <usb-device
           product-id="12345"
           vendor-id="1234" />
   </accessory>
</accessories>
```

### Implement Broadcast receiver for receiving Accessory events.


```java
public class AccessoryReceiver extends BroadcastReceiver {
    public static final String TAG = "AccessoryReceiver";
    public static final String ACCESSORY_ATTACHED = "co.poynt.accessory.manager.action.ACCESSORY_ATTACHED";
    public static final String ACCESSORY_DETACHED = "co.poynt.accessory.manager.action.ACCESSORY_DETACHED";
    public static final String EXTRA_USB_DEVICE = "co.poynt.accessory.manager.extra.USB_DEVICE";
    public static final String EXTRA_MODEL_NAME = "co.poynt.accessory.manager.extra.MODEL_NAME";
    public static final String EXTRA_MODEL_CATEGORY = "co.poynt.accessory.manager.extra.MODEL_CATEGORY";
    public static final String EXTRA_MODEL_VERSION = "co.poynt.accessory.manager.extra.MODEL_VERSION";
    public static final String CATEGORY_CASH_REGISTER = "Cash Register";

    @Override
    public void onReceive(Context context, Intent intent) {
        if (ACCESSORY_ATTACHED.equals(intent.getAction())) {
            UsbDevice device = (UsbDevice) intent.getParcelableExtra(EXTRA_USB_DEVICE);
            String category = intent.getStringExtra(EXTRA_MODEL_CATEGORY);
            if (device != null) {
                Intent service_intent = null;
                if (CATEGORY_CASH_REGISTER.equals(category)) {
                    service_intent = new Intent(context, CashRegisterService.class);
                } // other device type if supported.
                if (service_intent != null){
                    service_intent.setAction(UsbManager.ACTION_USB_DEVICE_ATTACHED);
                    service_intent.putExtra(EXTRA_MODEL_NAME, intent.getStringExtra(EXTRA_MODEL_NAME));
                    service_intent.putExtra(EXTRA_MODEL_CATEGORY, intent.getStringExtra(EXTRA_MODEL_CATEGORY));
                    service_intent.putExtra(UsbManager.EXTRA_DEVICE, device);
                    context.startService(service_intent);
                }
            }

        } else if (ACCESSORY_DETACHED.equals(intent.getAction())) {
            UsbDevice device = (UsbDevice) intent.getParcelableExtra(EXTRA_USB_DEVICE);
            if (device != null) {
                String category = intent.getStringExtra(EXTRA_MODEL_CATEGORY);
                Intent service_intent = null;
                if (CATEGORY_CASH_REGISTER.equals(category)) {
                    service_intent = new Intent(context, CashRegisterService.class);
                }// other device type if supported.
                if (service_intent != null){
                    service_intent.setAction(UsbManager.ACTION_USB_DEVICE_DETACHED);
                    service_intent.putExtra(EXTRA_MODEL_NAME, intent.getStringExtra(EXTRA_MODEL_NAME));
                    service_intent.putExtra(EXTRA_MODEL_CATEGORY, intent.getStringExtra(EXTRA_MODEL_CATEGORY));
                    service_intent.putExtra(UsbManager.EXTRA_DEVICE, device);
                    context.startService(service_intent);
                }
            }
        }
    }
}
```

Implement Accessory Service that will initialize the accessory and will implement a accessory service interface to expose the functionality of its accessory to rest of the system.

```java
public class CashDrawerService extends Service {
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        lastAccessoryModelName = intent.getStringExtra(AccessoryReceiver.EXTRA_MODEL_NAME);
        lastAccessoryCategory = intent.getStringExtra(AccessoryReceiver.EXTRA_MODEL_CATEGORY);
        if (UsbManager.ACTION_USB_DEVICE_ATTACHED.equals(intent.getAction())) {
            lastAttachedUsbDevice = (UsbDevice) intent.getParcelableExtra(UsbManager.EXTRA_DEVICE);
            onCashDrawerAttached(lastAttachedUsbDevice,
                    lastAccessoryModelName, lastAccessoryCategory);
        } else if (UsbManager.ACTION_USB_DEVICE_DETACHED.equals(intent.getAction())) {
            UsbDevice device = (UsbDevice) intent.getParcelableExtra(UsbManager.EXTRA_DEVICE);
            onCashDrawerDetached(device, lastAccessoryModelName,
                    lastAccessoryCategory);
            if (device.getProductId() == lastAttachedUsbDevice.getProductId()
                    && device.getVendorId() == lastAttachedUsbDevice.getVendorId()) {
                lastAttachedUsbDevice = null;
            }
        }
        return START_STICKY;
    }
    /**
     * Implements interface to provide draw open command to the client via service api.
     */
    private final IPoyntCashDrawerService.Stub mBinder = new IPoyntCashDrawerService.Stub() {
        @Override
        public void openDrawer(String referenceId, IPoyntCashDrawerServiceListener callback) throws RemoteException {
            Log.d("openDrawer()");
            if(open()){
                CashDrawerStatus drawerStatus = new CashDrawerStatus(CashDrawerStatus.Code.OPENED, "Cash Drawer opened");
                callback.onResponse(drawerStatus, requestId);
            }else{
                CashDrawerStatus drawerStatus = new CashDrawerStatus(CashDrawerStatus.Code.ERROR, "Failed to open cash drawer");
                callback.onResponse(drawerStatus, requestId);
            }
        }

        public void getDrawerStatus(String referenceId, IPoyntCashDrawerServiceListener callback) throws RemoteException{
             //TODO handle
        }

        public void getDrawerStatusByName(String name, String referenceId, IPoyntCashDrawerServiceListener callback) throws RemoteException{
            //TODO handle
        }

        public void openDrawerByName(String name, String referenceId, IPoyntCashDrawerServiceListener callback) throws RemoteException{
            //TODO handle
        }

    };

    public boolean open(){
        //TODO Implement your "open()" method that communicates with the cash drawer
    }
}
```

Once you install your accessory app and connect the peripheral you should get a notification from Poynt Accessory Manager. This notification will only show once.

![Accessory Manager Notification]({{site.url}}/developer/assets/accessory1.png)

If you go to Settings > Accessory menu you will should see your accessory there and you can always remove or disable it if needed.

![Accessory Activity]({{site.url}}/developer/assets/accessory2.png)

To create an accessory app for a printer you need to implement [IPoyntPrinterService](https://poynt.github.io/developer/javadoc/co/poynt/os/services/v1/IPoyntPrinterService.html), and [IPoyntScannerService](https://poynt.github.io/developer/javadoc/co/poynt/os/services/v1/IPoyntScannerService.html) for a scanner.

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>

<script language="javascript">
window.location="https://poynt.github.io/developer-docs/terminalApps/integrating-peripherals.html"
</script>

