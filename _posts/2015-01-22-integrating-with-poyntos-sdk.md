---
layout: page
title: "Integrating with PoyntOS SDK"
category: tut
date: 2015-01-22 17:07:40
---


Poynt OS SDK is distributed as an Android Library (aar) through our Maven repository. The maven repository is access controlled to prevent access to the public. So please do not share the credentials until we open up the access to everyone.

### Adding the Poynt OS SDK dependencies

To use the Poynt OS SDK, add the following dependencies in your build.gradle file - note that you would need to add our maven repository in your gradle file too:

```
allprojects {
  repositories {
    maven {
      url 'https://nexus.poynt.co/content/repositories/releases'
      credentials {
        username mavenUser
        password mavenPassword
      }
    }
    mavenCentral()
  }
}

dependencies {
  compile fileTree(dir: 'libs', include: ['*.jar'])

  // Poynt SDK and Model Dependencies
  compile 'co.poynt.api:android-api-model:<release-version>@jar'
  compile 'co.poynt.android.sdk:poynt-sdk:<release-version>@aar'

  // JWT dependencies - if you want to parse JWTs
  compile 'net.jcip:jcip-annotations:1.0@jar'
  compile 'com.nimbusds:nimbus-jose-jwt:2.26@jar'
  compile 'net.minidev:json-smart:1.2@jar'
}

```

NOTE: Please refer to release notes for current '<release-version>'

At this point your app should be ready to use the Poynt OS SDK. Please refer to the documentation or Poynt Sample app to start using the SDK.

### Adding Maven Credentials

As mentioned above, our maven repository is access controlled to allow access to only invited developers. Please refer to the [SDK FAQs](https://getpoynt.com/faq#poyntos) and submit your request [here](http://goo.gl/forms/dgwMwDysAv).
