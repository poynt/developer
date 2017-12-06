---
layout: page
title: "Enabling Developer Mode"
category: setup
date: 2015-05-19 11:21:25
---
<p>
	<div class="alert"><strong>WARNING:</strong> This change is irreversible! Putting a production terminal into developer mode will disable terminal's ability to process real payments.
	</div>
</p>

Once you receive your Poynt Developer Unit, you'll want to put your Poynt device into `Developer-Mode`.
This puts the device into a state that allows you to install your development APKs on the device.

## Pre-requisites

1. Android SDK with android-api 19 (Kitkat) installed on your development machine
2. Poynt Developer Unit

## Installation

1. Put your device into fastboot mode by holding the **power** and **volume up** button while the device is powered off. For more information about what fastboot does, see: [http://elinux.org/Android_Fastboot](http://elinux.org/Android_Fastboot)
	<div>
	<img src="{{site.url}}/developer/assets/fastboot0.png" alt="fastboot0" width="600">
	</div>

2. Select **Fastboot Protocol** from the fastboot menu (press **volume down** button then **power** button). Screen will flicker and return to fastboot menu.
	<div>
	<img src="{{site.url}}/developer/assets/fastboot_screen1.jpg" alt="fastbootscreen1" width="300">
	</div>
3. Make sure you have the <a href="https://developer.android.com/sdk/installing/index.html?pkg=tools">Android SDK tools</a> installed on your computer. You're going to need the `fastboot` command. Ensure your device is properly connected via a micro USB cable.

### For Windows Users

In Android Studio go to SDK Manager and install Google USB Driver.

![](../assets/1.SDKManager.png)

![](../assets/2.GoogleUSBDriver.png)

Open android_winusb.inf in Notepad

![](../assets/3.NotepadCmd.png)

Add the following configuration block to the **[Google.NTamd64]** and **[Google.NTx86]** sections and save the file.

~~~
;Poynt
%SingleAdbInterface% = USB_Install, USB\VID_2BF9&PID_3302
%CompositeAdbInterface% = USB_Install, USB\VID_2BF9&PID_3302&MI_01

;Poynt Fastboot
%SingleAdbInterface% = USB_Install, USB\VID_0955&PID_CF01
%CompositeAdbInterface% = USB_Install, USB\VID_0955&PID_CF01&MI_01
~~~

![](../assets/4.NotepadEdit.png)

Connect Poynt to your PC using a micro-USB cable (not included with the devkit), open Device Manager, right click on Poynt and select **Update Driver Software**.

![](../assets/6.UpdateDriver.png)

Select **Browse my computer..**

![](../assets/7.BrowseMyComputer.png)

Browse to **C:\Users\\{username}\AppData\Local\Android\sdk\extras\google\usb_driver\\** and click Next.

![](../assets/8.BrowserForDriver.png)

Poynt driver is unsigned, so Windows will display a warning, select **Install this driver software anyway**.

![](../assets/9.InstallAnyway.png)

You should see a success confirmation on the next screen, and Device Manager will show a new **Android Composite ADB Interface**

![](../assets/10.Success.png)

![](../assets/11.AndroidComposite.png)

You should be able to see Poynt by running `adb devices` in command line (Note: `adb` and `fastboot` executables are located in `C:\Users\{username}\AppData\Local\Android\sdk\platform-tools\`).


<p><div class="note"><span style="font-weight: bold">Note:</span> the same steps may need to be repeated for Windows to recognize when the terminal is the <span style="font-style: italic">fastboot mode</span>.</div></p>

### Windows 10 Users

If are on Windows 10 you may encounter the following error:

<span style="font-weight: bold; color: #FF0000">Windows encountered a problem installing the driver software for your device.
Windows found driver software for your device but encoutered an error while attempting to install it.
The hash for the file is not present in the specified catalog file. The file is likely corrupt or the victim of tampering.</span>


To proceed you will need to disable Device Driver Signing (please refer to [this](https://www.maketecheasier.com/install-unsigned-drivers-windows10/)) and re-do the steps above.

### For Mac OS X/Linux Users
Add `{SDK_LOCATION}\sdk\platform-tools` to your PATH environmental variable. To find out your Android SDK location, open Android Studio, Go to Android Studio->Preference->System Settings->Android SDK.

On some Linux distributions, you may be able to install Android SDK tools with _apt-get_{:.italic} command:
`apt-get install android-tools-adb android-tools-fastboot`

Ensure your device is properly connected via USB by running `fastboot devices` command on your host machine.

If your host machine runs on Linux and does not recognize the device please follow the instructions starting at Step 3 in this [Android User Guide](http://developer.android.com/tools/device.html#setting-up). You can find out the **vendor id**, by running `lsusb` in the Terminal window.

If your are unable to see the device after following the steps above, run the following command:

`echo "0x2BF9" >> ~/.android/adb_usb.ini`

#### Additional step for Linux
Add line:

`SUBSYSTEM=="usb", ATTR{idVendor}=="2bf9", MODE="0664", GROUP="plugdev" # Poynt`

to _/etc/udev/rules.d/51-android.rules_{:.italic}

## Continue Installation

1. Run the command to initiate the developer mode process: `fastboot oem developer`
	<div>
	<img src="{{site.url}}/developer/assets/fastboot_developer_mode.png" alt="fastbootscreen1" width="600">
	</div>

2. Read the instructions on the Poynt Terminal, press the volume down button to move selection to `Enter developer mode` and Press the Power button to select. At this point your device will clear its cache and the device state in the bootloader screen should show `Unlocked` or `Developer mode`.

3. Reboot your device.
	<div>
	<img src="{{site.url}}/developer/assets/terminal_fastboot2.png" alt="fastboot2" width="600">
	</div>

4. <a href="/developer/setup/activate-poynt-terminal.html">Activate your Poynt terminal</a>. Note: If you've previously activated your device, you can reuse your test MID and TIDs to reactivate.
<p>&nbsp;</p>

## Unlocking Poynt5

1. shutdown the device
2. start by holding barcode button (left side key) + pull down power switch at the same time until you see the bootloader menu.
3. on screen select fastboot by using the barcode button and home button to select `unlock on fastboot: you need adb version >= 1.0.36`
4. execute `fastboot flashing unlock`
5. select OK, with Barcode button (button, on the left side of the terminal)
6. After unlock process finished execute `fastboot reboot`
7. If reboot does not get initiated just use the power switch to initiate reboot

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>
