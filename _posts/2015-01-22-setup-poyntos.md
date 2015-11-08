---
layout: page
title: "Setup PoyntOS Emulator"
category: tut
date: 2015-01-22 16:34:52
---

Poynt OS apps can be built using any 7" android tablet (Tegra Note 7 is recommended but any 7" tablet would work as long as you code for multi-screen resolution including tvdpi) or even an android emulator. But do note that certain functionality will not be available unless you run on Poynt Smart Terminal (eg. Collecting consumer input from second screen and handling payment methods like MSR, NFC, EMV, etc.).  Please follow the steps below to set up your emulator or tablet with PoyntOS.

### Pre-requisites

* Android SDK with android-api 19 (Kitkat)
* A 7” Android Tablet (Tegra Note 7 is recommended) or an emulator (Genymotion is recommended)
** Update your tablet to run Android 4.4.4 (Kitkat) or install your favorite Android emulator
** Make sure you configure your virtual device to use android-19 (Kitkat 4.4.4) with screen size as 800x1280 (tvdpi).
*** We recommend using Genymotion emulator with virtual device for Nexus 7 1280x800.
* Python to run the installation script.

### Installation

1. Download the install script from: https://s3-us-west-1.amazonaws.com/poynt-apks/v1.2.8/setup_poynt_os.py
    - $ wget https://s3-us-west-1.amazonaws.com/poynt-apks/v1.2.8/setup_poynt_os.py
2. Change the permissions for the downloaded script so you can execute it.
    - $ chmod +x setup_poynt_os.py
3. Connect your android tablet or start your emulator.
    - Make sure you can connect with your device or emulator via adb.
    - running "adb devices” should show the connected android devices
4. Run the script from your command line so it can download the required apks and install them on your device:
    - ```$ ./setup_poynt_os.py```
    - *NOTE*: the script tries to uninstall existing Poynt OS apps and services, if they do not exist, you will notice some uninstall “Failures" and they are completely ok to ignore.
5. Wait until you see installation complete message.
    - ```*** install complete***```
6. As the script installs the requires services and applications, your device will ask you to choose which launcher to use. You’ll see 3 options, the default Android Launcher, Poynt Launcher and Setup Wizard.
7. Select Setup Wizard to start Poynt’s OOBE application.
8. You’ll be asked to configure your wifi - select your SSID and enter wifi credentials to connect.
9. Once connected, you’ll see a device activation screen asking for MID, TID, Acquirer, etc.
10. At this point, keep the device aside, we will get back to it after setting up the required activation credentials from Poynt developer portal.
11. In your web browser on your laptop/desktop, signup on Poynt Developer Portal: https://poynt.net/auth/signup/developer
12. After you’re registered, you will see Poynt Developer dashboard.
    - All developers by default are assigned their default developer organization so they can invite other teammates to join and access the same applications. You can try this out later after setting up your device.
13. On the dashboard, click on "COMPLETE YOUR PROFILE”, enter any missing information (eg. Website Url) and click on Save.
14. On the dashboard, click on “CREATE A TEST MERCHANT” to create a test merchant for your development activity.
15. On the dashboard, click on “ACTIVATE A POYNT TERMINAL”, and you’ll see a list of terminals and their status.
    - You should see a terminal with status as “Needs Activation"
16. Click on the Action to activate your terminal - you’ll see your activation credentials (MID, TID and Acquirer).
    - Keep the page open so you can enter the credentials on the device.
17. Go back to your device or emulator that you’ve setup (step 10)
18. Enter your activation credentials from the developer portal and click on Activate.
19. Once you activate the device, Poynt’s OOBE app disables itself so you won’t see it anymore in the future.
20. Click on the “Home” icon in your device or emulator navigation bar and select "Poynt Launcher” as the launcher (Select “Always” option).


At this point, your device is setup with required services and applications so it can act as a Poynt Smart Terminal that you can use to build your applications. You can try launching the “Poynt Terminal” app, and process a CASH transaction to make sure everything is working as expected. If you encounter any errors, please refer to adb logcat to see what’s failing, and please include that information in your email so we can troubleshoot the problems more easily.
