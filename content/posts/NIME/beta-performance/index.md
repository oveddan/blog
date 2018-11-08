---
title: 'NIME - Beta Performance, Retrospective and State of the Instrument'
date: 2018-11-07T16:58:05-05:00
tags: [""]
categories: [""]
classes: [""]
projects: [""]
draft: false
featuredImageResource:
    src: "images/featured"
---

Last night we did a beta performance of our musical instrument for NIME in front of guest critics:

{{<youtube SD9KPQ_yEro>}}

I intentionally wanted to perform without giving any introduction, to see if the critics would get what it was about.

Due to issues with exposure on the camera (to be discussed later), the red was not detected properly and the sounds were different than I had set up for.  Here is a video of me practicing beforehand, showing how it was supposed to sound:

{{<vimeo 299562309>}}

After the performance I showed the instrument and how it worked.

## Notes from performance

Here are the awesome notes taken on the performance and feedback by ITP Resident [Ari Melenciano:](http://www.ariciano.com/about/) 

**current stage presented in class**
Working prototype - with camera live feed, water in bowls with food dye

**Idea behind project**
(Left blank)

**How it works**
pours water into bowls/cups | live feed tracks container content | changes when content is mixed with food dye, or water physically moved | live feed changed based on keyboard control | also connected to beat pad | using modular synthesizer

**Technology/Equipment used**
bowls with water, lights, table, food dye, laptop, ableton live, camera feeding to projection, ableton live, modular synthesizer, touchdesigner

**Size of instrument**
small

**Description of sound**
electronic - computer sounds

**Feedback from Guest Critics and Class**

* What kind of prejector are you going to you use? depending on how you are situated, the projector may spill onto your instrument
* visually looks very good - hard to beat the image of food dye in water 
* would like to see more variety of sound based on color - higher amount of parameters. It is great that you have the building blocks. Now you need to build a musical system 
* these drops dont last that long and for a five minute performance - could create difficulties -- performance could be refilling the glasses 
* could be a nice performance if you have more glasses 
* super important that sound seeks up with what you are seeing - watching your performance, some things did some things didn't 
* When you swished the liquid around and mixed it, it was clear and that worked great.
* color choices? 
* the visual is so mellow and tranquil and then the sound design is kind of harsh - has teeth to it -- cool contrast, but think since your abstracting your system allows for opportunity to get the vibe you're going for
* When adjusting the audio, you shouldn't be connecting so deeply to all of those knobs.  You should abstractly connect to a few things then 

**Plans for future iterations**
* may drop alka seltzer for different effects
* Will build a sequencer that the water will be changing in.
* Will not have a computer screen, will just have buttons to do everything.

Some additional pieces of feedback I got from people is:

From Erik (the resident): I tried to do something with food coloring and had the same problem where it dissolves too quickly.  I ended up doing something different that lasted longer in a different projects.  When you said you could make it a sequencer I thought that would be cool.  The biggest thing is you have to stay organized.  Last year someone showed how his camera was picking up things.  You should consider that as well as you can easily do it in Touch.

From Hayley: The concept can be really cool.  You were a bit nervous/running around during your performance.  My suggestion is to watch it many times and practice the performance.

From Oren:  The biggest thing we learned in Algo Comp is you don't really want to reach so deeply into the instrument.  Also you can consider doing visual effects.

## My Retrospective

### What went well.

Overall, I'm glad about where the system is even the performance could have been much better.  I had a working instrument and demo and mini performance.  I have a great foundation and platform in place, and can now modify it to solve the problems and make it into a full fledged system.  The visuals are great, and when showing the platform ahead of time to friends with headphones on, they were blown away as it sounded too and was fun to interact with.

### What went wrong

Looking back at the video, I agree that the sound did not really sink up well with the visuals.  This is because of camera issue I ran into which I'll get ot in a bit.

{{<fullsizeimage src="images/settingup" caption="setting up for the performance">}}

I didn't have much time to setup for my performance, in fact it took me some time after the last person went off until I can start.  There were a few things that slowed me down:

When connecting to the projector as a second monitor, the monitors were flipped.  This meant that the presentation screen was visible on my laptop and the controls on the projector.  It took me some time to flip these.

Prior to the show, I had opened up the Logitech Game Center to set the exposure and focus manually.  I then tuned all of the image filters time to pick out red, green, and blue pixels within a range.  These tunings were dependent on the exposure level.  When I connected the camera, the **focus and exposure were off.** I opened up the Logitech Game Center to see that they were set again to auto:

{{<fullsizeimage src="images/logitechexposure" caption="Before the performance I had manually tuned the exposure (on the left).  When I opened the camera at the start of the show I saw the settings had reverted to 'auto' (on the right), resulting in overexposure and the image filters not working properly.">}}

I barely had time to adjust the exposure, and as a result, it wasn't at the same level as when I did the tunings, and was slightly **overexposed.**  This led to the color filters picking up more pixels than they should have, messing up the levels of the modulation.  

TODO: show overexposed video.

I could tell things were off when I turned on the sound and heard a noise I wasn't expecting. As you can hear in the start it is a very harsh wobble noise.  I had set it up so that the volume and modulation would be off and would only turn on when red was detected, and would go from a smooth sin sounding wave to a harsher wave as the color filled in.  Since so much red was not really there but was detected as so due to overexposure, the modulation knobs were turned in unexpected directions.

Throughout the performance, the changes in red did not have much of an impact.  The most clear thing was when I poured the water and stirred the liquid.  

Also, my own feedback is I looked too much at the screen and not the audience.  I kept changing levels abruptly, making an obvious / not smooth effect on the sounds.

Ari did not take any notes under *Idea behind project*.  This is because I didn't really explain it during my talk about the

### What I will improve on

I need to have the sound tightly controlled to the visuals, and to do this the filters need to perform accurately.  The first step is to make sure the camera can have its exposure and focus levels properly set. I posed questions on how to do this in the [touch designer forums,](https://www.derivative.ca/Forum/viewtopic.php?f=4&t=13231) [stackoverflow,](https://stackoverflow.com/questions/53191326/how-can-you-programmatically-set-the-exposure-of-a-usb-camera-on-osx) and on twitter and got a good answer:

{{<tweet 1060226028143067137>}}

I also want to explore **other methods of color filtering** that don't have to be so fine tuned.  Such as just the level or red, blue or green.  Or hsv based extraction.

The sounds must be better.  Currently I allow many things to control many things.  This creates some sounds I didn't expect live and had to tune down to not hurt peoples' ears. As Oren correctly said I'm reaching too far into the knobs and not abstracting things enough.

{{<image src="images/allControls" caption="showing part of my instrument, where all knobs of the Buchla 259e can be controlled directly by different aspects of the visuals.  Upon further thought it would be better to have fewer controls that are linked to one or two expressive control voltages.">}}

When hearing Morton Subotnick talk in class he says how he spends hours and days tuning sounds.  He also said in one class how he has so many things controlled by just a couple control voltages.  This creates a more tighter integration with modulation and sound.  Also, Todd Barton says during his videos and his demo in class that you are only as expressive as your control voltage.

{{<fullsizeimage src="images/morton" caption="Watching Morton Subotnick Patch a Buchla 200e to do a voice following control voltage">}}

I will change my approach to just have one or two control voltages affected by the each visual, and have those voltages control a bunch of things concurrently.  I will spend time crafting instruments that can be expressively controlled by a few control voltages.

I will practice the performance a lot.  The composition will be set ahead of time, with each instrument carefully thought out, but the actual performance will stil be done live.

I need to clearly explain the concept and why I'm doing this.  Do I start off with the element of randomness?