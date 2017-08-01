---
layout: page
title: "Enabling Developer Mode"
category: tut
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
Open a command prompt with Administrator privileges. Navigate to the directory that contains the **fastboot.exe** executable. If you installed the Android SDK, this will usually be located in  `C:\Users\{username}\AppData\Local\Android\sdk\platform-tools\`.

Verify that your Poynt Terminal is in _fastboot mode_{:.italic} and is being seen by **fastboot** by issuing the command `fastboot devices`. The output should show your device's serial number:

**C:\Users\\{username}\AppData\Local\Android\sdk\platform-tools>** _fastboot devices_{:.italic}

`TERMINALSERIALNUMBER fastboot`

<p><div class="note">
<strong>Tip: </strong>If fastboot is not showing your device's serial number, please see the "Troubleshooting fastboot" section <a href="http://wiki.cyanogenmod.org/w/Doc:_fastboot_intro" target="_blank">here</a>.
</div></p>

Add the following configuration block to the **[Google.NTamd64]** and **[Google.NTx86]** sections of   _C:\Users\\{username}\AppData\Local\Android\sdk\extras\google\usb_driver\android_winusb.inf_{:.italic}:

~~~
;Poynt
%SingleAdbInterface% = USB_Install, USB\VID_2BF9&PID_3302
%CompositeAdbInterface% = USB_Install, USB\VID_2BF9&PID_3302&MI_01
;Poynt Fastboot
%SingleAdbInterface% = USB_Install, USB\VID_0955&PID_CF01
%CompositeAdbInterface% = USB_Install, USB\VID_0955&PID_CF01&MI_01
~~~

<p><div class="note">
<strong>Note: </strong>If the <span style="font-style: italic">google</span> directory does not have <span style="font-style: italic">usb_drive</span> you may need to download Google USB drivers from <a href="http://developer.android.com/sdk/win-usb.html" target="_blank">Android Developer Site</a>.
</div></p>

In addition, update _adb_usb.ini_{:.italic} config file to include the following:

~~~
# ANDROID 3RD PARTY USB VENDOR ID LIST -- DO NOT EDIT.
# USE 'android update adb' TO GENERATE.
# 1 USB VENDOR ID PER LINE.
0x2BF9
0x0955
~~~


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

4. <a href="/developer/tut/activate-poynt-terminal.html">Activate your Poynt terminal</a>. Note: If you've previously activated your device, you can reuse your test MID and TIDs to reactivate.
<p>&nbsp;</p>

## Unlocking Poynt5

1. shutdown the device
2. start by holding barcode button (left side key) + pull down power switch at the same time until you see the bootloader menu.
3. on screen select fastboot by using the barcode button and home button to select `unlock on fastboot: you need adb version >= 1.0.36`
4. execute `fastboot flashing unlock`
5. select OK, with Barcode button (button, on the left side of the terminal)
6. After unlock process finished execute `fastboot reboot`
7. If reboot does not get initiated just use the power switch to initiate reboot
