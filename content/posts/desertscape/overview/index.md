---
title: 'Desertscape - Overview and Data Gathering at Brahman'
date: 2020-02-23T14:37:21-08:00
tags: [""]
categories: [""]
classes: [""]
projects: [""]
draft: false
description: "Desertscape is platform for intelligently communicating with the surrounding environment."
featuredImageResource:
  src: "images/featured"
---

<!--show video of dropping sound sensor -->

# Overview

Desertscape is platform for intelligently communicating with the surrounding environment.  Using sensor readings and sounds gathered over time in an outdoor environment, machine learning models are trained to perceive recurring patterns in this data.  These models are then deployed onto hardware that can run on low power for extended periods of time in the environment, and integrated into installations that feed sensor readings and sounds into these models to react to what is perceived by the models, communicating with the environnment in a continuous feedback loop.  Everything is solar powered and off-grid.

The platform takes advantages of recent advances in machine learning research and hardware that allows for models to be deployed onto low-power devices such as the Arduino Nano 33 Ble Sense and Sparkfun Edge.

{{<fullsizeimage src="images/environmentalInDesert.jpg">}}

It is both a research and art project.  The research is primarily around how to build datasets from environmental sensor data and sounds recorded over an extended period of time.  How can patterns in the data be identified and labeled?  What tools can be used to gather this data?  How can machine learning models be trained with this data?  How can they be validated when deployed back into the environment where the data was gathered from?

The art will be in the form of an installation that integrates these sensor perceptions in a physical form.  It can explore themes such as invasive species, where models trained on one environemnt are deployed into an environment that it doesn't understand.  

<!--show image of charts-->

<!--show image of sounds gathered over a long period of time.-->

# Data Gathering Techniques

It's currently in a data gathering phase, where sounds, light, temperature, and other environmental signals are recorded and logged on portable devices designed to be left out for an extended period of time.

I leveraged my time at Brahman.ai to gather this data.  Brahman.ai is located in and around Bombay Beach, where sounds of the town, train, and birds and animals of the desert can be observed.  

Two pieces of hardware were built for this purpose:

## Evironmental Sensor Capture

An Arduino Nano 33 Ble Sense is used to capture many different things from the environment, including:

* temperature
* humidity  
* pressure 
* acceleration
* gyroscope
* magnetic orientation
* light color & intensity
* sound level

The Arduino is connected to a real time clock and an sd card.  Using modified code from Blah's WeatherStation #TODO Link and name, these sensors readings are gathered every 100ms.  These readings are logged to an sd card, and timestamped using the time from the real time clock.

The contents of the log file looks like:
```
1581542711,a,27.23,32.1,1025.99,g,-0.06,-0.00,0.98,r,5.13,1.95,0.79,m,100.4,54.5,-33.1,l,7,4,4,10,n,134
1581542711,a,27.23,32.1,1026.04,g,-0.06,-0.01,0.98,r,4.94,1.83,0.79,m,99.8,54.6,-32.4,l,7,5,4,10,n,131
1581542712,a,27.27,32.3,1026.08,g,-0.06,-0.01,0.97,r,5.74,1.83,0.73,m,99.8,54.4,-34.0,l,7,4,4,9,n,142
1581542712,a,27.29,32.1,1026.05,g,-0.06,-0.00,0.97,r,5.00,1.83,0.85,m,100.4,54.4,-33.7,l,7,4,4,10,n,137
1581542713,a,27.27,32.1,1026.04,g,-0.06,-0.01,0.98,r,5.49,1.89,0.92,m,99.7,53.9,-33.2,l,7,5,4,10,n,167
1581542713,a,27.29,32.2,1026.07,g,-0.06,-0.00,0.98,r,4.88,1.83,0.73,m,99.7,54.3,-32.2,l,7,5,4,10,n,139
1581542714,a,27.30,32.3,1026.07,g,-0.06,-0.01,0.97,r,5.13,2.08,0.92,m,99.4,54.9,-31.7,l,7,5,4,10,n,139
1581542714,a,27.34,32.1,1026.06,g,-0.06,-0.00,0.98,r,5.13,2.08,0.79,m,99.1,54.2,-32.1,l,7,4,4,9,n,126
```

Where the first value is the time stamp, the next 3 values are acceleration, next 3 values are gyroscope, following 3 are magnetic orientation, following 4 are light color, and last is sound level.

The code for this can be seen here #TODO - upload code and link to it.

{{<fullsizeimage src="images/environmentalLogger">}}

The power consumption of this system was tested using a multimeter.  One of the nice discoveries when using the Nano sense in this way is that the energy is so low, that it doesn't show up on the multimeter.  I attempted to leave it on all night connected to a battery pack, which would show the total mAh consumed over an extended period of time, but this failed as the battery pack detected such little power usage it shut itself off.

{{<fullsizeimage src="images/environmentalWithPowerTest" caption="Testing out power usage of the environmental logger">}}
{{<fullsizeimage src="images/environmentalPowerUsage" caption="The power usage is so small, it does not show up on the multimeter">}}

At Bombay Beach, I deployed the system connected to a 3.7v 2500 mah battery, 6w 5v solar panel, and Adafruit solar charger.  With this setup, I was please to see that the system stayed on for a week, and often the battery was full as indicated by the green indicator on the solar charger.

{{<fullsizeimage src="images/environmentalInDesertOverview.jpg">}}

{{<fullsizeimage src="images/fully" caption="The solar charge controller's green light indicates that the battery is fully charged.  This would usually happen within an hour after the sunrise occured in the morning.">}}

I left the circuit deployed outside overnight, in different areas around Bombay Beach:

{{<fullsizeimage src="images/environmentalAtChatsubo" caption="the yard of Chatsubo for a few nights.">}}

{{<fullsizeimage src="images/environmentalInDesert.jpg" caption="the desert area right outside the border of Bombay Beach.">}}

{{<fullsizeimage src="images/environmentalOnMars.jpg">}}
{{<fullsizeimage src="images/environmentalOnMars2.jpg" caption="A tire on Mars, where it at for 4 days without turning off.">}}

{{<fullsizeimage src="images/environmentalAtJoshuaTree.jpg" caption="A rock ledge in Joshua Tree overnight.">}}

{{<fullsizeimage src="images/environmentalInCar" caption="In the car as I drove around, both on normal roads and 4x4ing offroad.">}}

I have not looked at the data yet, but am curious to see what sort of repeatable patterns emerge:

* Can a sunrise/sunset be predicted using purely light color readings?  What about determining if it is indoors in an artificially lit environment?
* Can someone approaching the device be detected using sound level from footsteps?
* Can a car approaching be detected from sound level?  What about a unicycle?
* Can driving/not driving/walking be classified using accelerometer/gyroscope data?
* Can picking up/putting down be classified using accelerometer/gyroscope data?

-- show some image of potential use case

## Sound Capture

The Teensy 4.0 and Audio Shield are used to capture environmental sounds from a microphone.  The Teensy is chosen for this task because of it's fast CPU, and libraries and corresponding examples that make it easy to record from line input onto an SD card.  I could not find examples for doing the same task using the Nano Ble Sense's built in I2C microphone.  

{{<fullsizeimage src="images/audioZoomed">}}

Additionally, being able to connect any microphone to the input pins with the Teensy Audio shield allows for different microphones to be tried and experimented with.  The microphone I found worked the easiest was the Adafruit xxx with Autogain.  Autogain is preferrable as the recording can be turned on in different types of environments, and the gain is automatically adjusted to pick up faint/distant sounds when there is a quiet environment, and loud sounds in other cases. The built-in microphone is Omnidirectional, which is also ideal for the task when we don't know exactly which sounds are to be captured and where they come from.

{{<fullsizeimage src="images/teensyRecorder">}}

The circuit consists of two buttons; clicking on the record button, the one on the right, begins recording audio onto the micro sd card, and clicking it again stops recording.  The button on the left is the play button. Clicking on that begins playing the last audio clip that was recorded, and this can be listened to using the headphone jack.

The code for this [can be seen here.](https://github.com/oveddan/EnvironmentLogger)

{{<fullsizeimage src="images/testingOutSounds" caption="Listening to the recorded audio.">}}

A real time clock component is used to get the time that an audio recording started.  When an audio recording is created, the time that it was created is logged onto the sd card.  This way we can know when the audio was recorded and associate it with a context.

{{<fullsizeimage src="images/soundPowerUsage" caption="The field audio recorder uses 0.14A" >}}

When connected to a standard battery pack, the circuit consumes 0.14 amps of energy.  I was able to leave the device recording all night using a  battery pack, and by the morning the pack still had most of its capacity left.  Eventually I could have the whole system solar powereable, but didn't get to doing this.

{{<fullsizeimage src="images/soundWithBatteryPack" caption="Powering the field audio recorder with an Ankler 10000 mAh battery pack.  At 0.14a of usage, this can stay on for a long time!  The limiting factor would be storage on the 32 gb micro sd card.">}}

I deployed this device into a few locations:

{{<fullsizeimage src="images/soundInDesert" caption="The desert area right outside bombay beach;  in this location, a train can be heard in the distance, different types of birds can be heard, as well as cars approaching.">}}

{{<fullsizeimage src="images/soundInJoshuaTree2">}}
{{<fullsizeimage src="images/soundJoshuaTree.jpg" caption="A remote area of Joshua tree;  although it was pretty quiet, I'm curious to hear what was captured overnight.">}}

In the car when it was started, driving around, and turned off.  In this location, maybe we can detect starting and stopping a car.

{{<fullsizeimage src="images/soundOnTrainTracks" caption="Right by train tracks.  I'm curious to hear what the recording sounded like when the train rolls by.">}}

{{<fullsizeimage src="images/audioInDesertProtected" caption="Audio recorder protected by some found broken porcelain.">}}



Generally, there were not many natural sounds in these environments as they were mostly desert with few animals.  Maybe coyotes or birds can occasionally be heard.   Most of the sounds heard are human created.  There's something to explore here but I'm not sure yet until I go through the audio recordings.


## Inspirations
* Jakob Kudsk Steensen & Matt McCorkle - Catharsis "an immersive digital simulation of a re-imagined old-growth forest, which has developed undisturbed over hundreds of years. Based on field work undertaken by the artist and his primary collaborator, sound artist Matt McCorkle, the work’s virtual ecosystem and synchronised audio comprise 3D textures and sounds gathered from several North American forests."
* Dr Gershon's research on automatic wildlife and environmental sensing.  Research paper here.
* Bernard Krause's Wildlife Sanctuary "Since 1968, Wild Sanctuary has traveled the globe to record, archive, research, and express the voice of the natural world - its soundscape. These increasingly rare sounds of the wild inform and enrich our specialized efforts from the field to public performance."