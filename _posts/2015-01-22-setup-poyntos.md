---
layout: page
title: "Setup PoyntOS Emulator"
category: setup
date: 2015-01-22 16:34:52
---

<img style="float: right; margin-left: 10px; margin-top: 0px; width: 300px; height: 573px;" src="../assets/poynt_emulator_300x573.png" alt="PoyntOS emulator running on AVD" />
To help speed up your development and testing, we provide a developer-edition version of PoyntOS that can be run on an Android emulator
or directly on an Android Tablet (Tegra Note 7 is recommended, but any 7" tablet would work as long as you code for multi-screen resolution including tvdpi).
Note that certain functionality will not be available in the emulator (i.e. collecting consumer input from second screen, handling card payments, only manual credit entry supported, etc.);
however, the emulator will give you enough functionality to start building and testing your apps. You'll have access to the terminal application (key in
transactions), the register (catalog-driven point of sale app), transaction data, customer data, and more.

Activating a PoyntOS virtual device on a device emulator is just like activating a physical Poynt Smart Terminal. Lets get started!

### Prerequisites

* Android SDK with API level 19 (KitKat)
* A virtual device emulator (Android Studio AVD or Genymotion) or a 7” Android Tablet (Tegra Note 7 is recommended)
* Virtual devices need configured to screen size at 800x1280 (tvdpi)
* Python (for installation scripts)

### Download and install emulator
Download and unzip the PoyntOS emulator installer here: [PoyntOS\_Emulator\_Install.zip](https://poynt-emulator.s3.amazonaws.com/v1.2.26/PoyntOS_Emulator_Install.zip). Run the installation script `setup_poynt_os.py`

### Activating your virtual Poynt terminal
1. The first time you boot up your device you'll be asked to choose a launcher. Select `Setup Wizard` to start Poynt's OOBE ("out of box experience") application. NOTE: If you're using Genymotion, enable `Use virtual keyboard for text input` option in device configuration.
2. If after selecting Language you get a crash (SecurityException in logcat), just rerun the python installer script.
3. WiFi setup - select your SSID and WiFi credentials to connect.
4. Once connected, you'll be shown the device activation screen -- keep the device running, we'll get back to this shortly.
5. From your laptop/desktop, point your browser to the Poynt HQ Developer Portal: https://poynt.net/auth/signup/developer -- register to be a Poynt developer, or sign in if you already have.
6. After signing in, click `Create a Test Merchant` from the dashboard -- this will create a mock/test business for your development activity.
7. After creating a test merchant, click `Active a Poynt Terminal` from the dashboard.
8. A test terminal with the status `Needs activation` was created for you (in step 5 above) -- click the lightning bolt icon to activate the terminal. You'll see your activation credentials that you'll use to activate your virtual Poynt terminal.
9. Go back to your Poynt emulator terminal. If the camera is active and it's looking for a QR code, click `Don't have a QR code` link. Select the acquirer, and enter the MID and TID values from your browser (in step 7 above).
10. Once you activate the device, Poynt’s OOBE app disables itself.
11. Click on the `Home` icon in your device or emulator then select `Poynt Launcher` as the launcher (select `Always` option).

At this point, your device is setup with required services and applications so it can act as a Poynt Smart Terminal. Try launching the `Poynt Terminal` app and process a cash transaction to make sure everything is working as expected. If you encounter any errors, please refer to `adb logcat`.
This is very useful to pinpoint what's failing. If you do need any assistance, head over to the Poynt developer [discussion forums](https://discuss.poynt.net/c/developers), or reach out to our [support team](https://poynt.net/support).
