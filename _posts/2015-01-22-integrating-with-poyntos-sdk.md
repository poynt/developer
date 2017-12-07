---
layout: page
title: "PoyntOS SDK"
category: onterminal
date: 2016-01-22 17:07:40
---


Poynt OS SDK is distributed as an Android Library (aar) through our Maven repository.

<div class="alert"><strong>IMPORTANT NOTE:</strong> If you are using Android Studio 3.x please make sure you disable aapt2 by updating your gradle properties file (<span style="font-style: italic">~/.gradle/gradle.properties</span>) and adding <span style="font-style: italic">android.enableAapt2=false</span>. </div>

### Adding the Poynt OS SDK dependencies

To use the Poynt OS SDK, add the following dependencies in your build.gradle file - note that you would need to add our maven repository in your gradle file too:

~~~groovy
allprojects {
  repositories {
    maven {
      url 'https://nexus.poynt.com/content/repositories/releases'
    }
    mavenCentral()
  }
}

dependencies {
  compile fileTree(dir: 'libs', include: ['*.jar'])

  // Poynt SDK and Model Dependencies
  compile 'co.poynt.api:android-api-model:<release-version>@jar'
  compile 'co.poynt.android.sdk:poynt-sdk:<release-version>@aar'

  // Gson dependency
  compile 'com.google.code.gson:gson:2.8.0@jar'

  // JWT dependencies - if you want to parse JWTs
  compile 'net.jcip:jcip-annotations:1.0@jar'
  compile 'com.nimbusds:nimbus-jose-jwt:2.26@jar'
  compile 'net.minidev:json-smart:1.2@jar'
}

~~~

NOTE: Please refer to [release notes](https://poynt.github.io/developer/ref/release-notes.html) for current <release-version>

At this point your app should be ready to use the Poynt OS SDK. Please refer to the documentation or [Poynt Sample app](https://github.com/poynt/PoyntSamples) to start using the SDK.

<!-- feedback widget -->
<SCRIPT type="text/javascript">window.doorbellOptions = { appKey: 'eDRWq9iHMZLMyue0tGGchA7bvMGCFBeaHm8XBDUSkdBFcv0cYCi9eDTRBEIekznx' };(function(w, d, t) { var hasLoaded = false; function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/6657?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); } if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); } if (d.readyState == 'complete') { l(); } }(window, document, 'SCRIPT')); </SCRIPT>
