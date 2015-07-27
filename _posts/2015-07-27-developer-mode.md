---
layout: page
title: "Enabling Developer Mode"
category: tut
date: 2015-05-19 11:21:25
---

Once you receive your Poynt Developer Unit, you'll want to put your Poynt device into `Developer-Mode`.
This puts the device into a state that allows you to install your development APKs on the device.

### Pre-requisites

* Android SDK with android-api 19 (Kitkat) installed on your development machine
* Poynt Developer Unit

### Installation

1. Put your device into fastboot mode by holding the power and volume up button while the device is powered off. For more information about what fastboot does, see: http://elinux.org/Android_Fastboot
	<div>
	<img src="{{site.url}}../assets/fastboot0.png" alt="fastboot0" width="600">
	</div>

2. Select "Fastboot Protocol" from the fastboot menu (press volume down button then power button). Screen will flicker and return to fastboot menu.
	<div>
	<img src="{{site.url}}../assets/fastboot_screen1.jpg" alt="fastbootscreen1" width="300">
	</div>
3. Ensure your device is properly connected via USB by running `fastboot devices` command on your host machine.
4. Run the command to initiate the developer mode process: `fastboot oem developer`
	<div>
	<img src="{{site.url}}../assets/fastboot_developer_mode.png" alt="fastbootscreen1" width="600">
	</div>

5. Read the instructions on the screen, press the volume down button to move selection to `Enter developer mode` and Press the Power button to select. At this point your device will clear its cache and the device state in the bootloader screen should show `Unlocked` or `Developer mode`.

6. Reboot your device.
	<div>
	<img src="{{site.url}}../assets/terminal_fastboot2.png" alt="fastboot2" width="600">
	</div>

7. <a href="/developer/tut/activate-poynt-terminal.html">Activate your Poynt terminal</a>. Note: If you've previously activated your device, you can reuse your test MID and TIDs to reactivate.