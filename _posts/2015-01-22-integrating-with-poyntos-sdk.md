---
layout: page
title: "Integrating with PoyntOS SDK"
category: tut
date: 2015-01-22 17:07:40
---


Poynt OS SDK is distributed as an Android Library (aar) through our Maven repository. 

### Adding the Poynt OS SDK dependencies

To use the Poynt OS SDK, add the following dependencies in your build.gradle file - note that you would need to add our maven repository in your gradle file too:

```
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
  compile 'com.google.code.gson:gson:2.2.4@jar'

  // JWT dependencies - if you want to parse JWTs
  compile 'net.jcip:jcip-annotations:1.0@jar'
  compile 'com.nimbusds:nimbus-jose-jwt:2.26@jar'
  compile 'net.minidev:json-smart:1.2@jar'
}

```

NOTE: Please refer to release notes for current '<release-version>'

At this point your app should be ready to use the Poynt OS SDK. Please refer to the documentation or Poynt Sample app to start using the SDK.

