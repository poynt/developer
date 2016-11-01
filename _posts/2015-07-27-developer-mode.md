---
layout: page
title: "Enabling Developer Mode"
category: tut
date: 2015-05-19 11:21:25
---
**WARNING: This change is irreversible! Putting a production terminal into developer mode will disable terminal's ability to process real payments.**

Once you receive your Poynt Developer Unit, you'll want to put your Poynt device into `Developer-Mode`.
This puts the device into a state that allows you to install your development APKs on the device.

### Pre-requisites

* Android SDK with android-api 19 (Kitkat) installed on your development machine
* Poynt Developer Unit

### Installation

1. Put your device into fastboot mode by holding the power and volume up button while the device is powered off. For more information about what fastboot does, see: http://elinux.org/Android_Fastboot
	<div>
	<img src="{{site.url}}/developer/assets/fastboot0.png" alt="fastboot0" width="600">
	</div>

2. Select "Fastboot Protocol" from the fastboot menu (press volume down button then power button). Screen will flicker and return to fastboot menu.
	<div>
	<img src="{{site.url}}/developer/assets/fastboot_screen1.jpg" alt="fastbootscreen1" width="300">
	</div>
3. Make sure you have the <a href="https://developer.android.com/sdk/installing/index.html?pkg=tools">Android SDK tools</a> installed on your computer. You're going to need the `fastboot` command. Ensure your device is properly connected via a micro USB cable.
<h4>For Windows:</h4>
Open a command prompt with Administrator privileges. Navigate to the directory that contains the fastboot command. If you installed the Android SDK, this will usually be located in <path to SDK>\sdk\platform-tools\fastboot.exe
<p>Example of path for Android SDK installed in root C: directory - `C:\adt-bundle-windows-x86_64-2013xxxx\sdk\platform-tools`</p>
<p>Verify that your Poynt Terminal is in fastboot mode and is being seen by fastboot by issuing fastboot devices. The output should show your device's serial number:</p>
<p>`C:\adt-bundle-windows-x86_64-2013xxxx\sdk\platform-tools>fastboot devices`</p>
<p>`YOURSERIALNUMBER fastboot`</p>
<p>If fastboot is not showing your device's serial number, please see the "Troubleshooting fastboot" section here: http://wiki.cyanogenmod.org/w/Doc:_fastboot_intro. If you are using Windows you may need to install the USB driver by following instructions at http://www.teamandroid.com/2012/07/30/how-to-set-up-adb-fastboot-with-android-sdk/3/.</p>
<p>
Add this section to the [Google.NTamd64] and [Google.NTx86] section of android_winusb.inf in Android\sdk\extras\google\usb_driver\ (**Note**: if the "google" directory does not have "usb_driver" you may need to download Google USB drivers from http://developer.android.com/sdk/win-usb.html):</p>
<p>`;Poynt`<br>
`%SingleAdbInterface% = USB_Install, USB\VID_2BF9&PID_3302`<br>
`%CompositeAdbInterface% = USB_Install, USB\VID_2BF9&PID_3302&MI_01`<br>
`;Poynt Fastboot`<br>
`%SingleAdbInterface% = USB_Install, USB\VID_0955&PID_CF01`<br>
`%CompositeAdbInterface% = USB_Install, USB\VID_0955&PID_CF01&MI_01`<br>
</p>
<p>In addition, update adb_usb.ini file to include the following:
<p>
`# ANDROID 3RD PARTY USB VENDOR ID LIST -- DO NOT EDIT.`<br>
`# USE 'android update adb' TO GENERATE.`<br>
`# 1 USB VENDOR ID PER LINE.`<br>
`0x2BF9`<br>
`0x0955`<br>
</p>
</p>
<h4>For Mac OS X/Linux:</h4>
Add `<SDK_LOCATION>\sdk\platform-tools` to your PATH.
On some linux distributions, you may be able to install SDK tools with apt-get:
<p>`apt-get install android-tools-adb android-tools-fastboot`</p>
<p>Ensure your device is properly connected via USB by running `fastboot devices` command on your host machine.</p>
<p>If your host machine runs on Linux and does not recognize the device please follow the instructions at http://developer.android.com/tools/device.html#setting-up (Step 3). You can find out the vendor id, by running `lsusb` in the Terminal window.</p>
<p>We have changed our USB vendor ids in build #222 and later. If your are unable to see the device after following the steps above, run the following command:</p>
<p>`echo "0x2BF9" >> ~/.android/adb_usb.ini`</p>
<p>Additional step for **Linux**:</p>
<p>Add line:</p>
<p>`SUBSYSTEM=="usb", ATTR{idVendor}=="2bf9", MODE="0664", GROUP="plugdev" # Poynt`</p>
<p>to /etc/udev/rules.d/51-android.rules</p>

4. Run the command to initiate the developer mode process: `fastboot oem developer`
	<div>
	<img src="{{site.url}}/developer/assets/fastboot_developer_mode.png" alt="fastbootscreen1" width="600">
	</div>

5. Read the instructions on the Poynt Terminal, press the volume down button to move selection to `Enter developer mode` and Press the Power button to select. At this point your device will clear its cache and the device state in the bootloader screen should show `Unlocked` or `Developer mode`.

6. Reboot your device.
	<div>
	<img src="{{site.url}}/developer/assets/terminal_fastboot2.png" alt="fastboot2" width="600">
	</div>

7. <a href="/developer/tut/activate-poynt-terminal.html">Activate your Poynt terminal</a>. Note: If you've previously activated your device, you can reuse your test MID and TIDs to reactivate.
