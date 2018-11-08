---
title: 'NIME - Musical Instrument at the Time of the Beta Performance'
date: 2018-11-07T22:03:18-05:00
tags: [""]
categories: [""]
classes: [""]
projects: [""]
draft: false
featuredImageResource:
    src: "images/featured"
---

This post will go through the state of my musical instrument and the prossess of getting there at the time of the beta performance.

{{<fullsizeimage src="images/commandCenter" caption="The whole system together.  I hooked up a Novation Launchcontrol XL to adjust the sound levels of each track in Ableton">}}

**The instrument now consists of:**

* An interface build in **TouchDesigner.** Multiple jars of liquid can be viewed at from a camera.   Views of these liquids are cropped from the camera feed, with sliders allowing for specifications of the crops.

TODO: gif

* Each of these views can be recorded independently and played back in the place of a live feed.  This allows me to practice different scenarios and tune the instrument without needing to mix liquids live and make a mess.

{{<image src="images/showingMultiple" caption="changing a pre-recorded video for a view">}}

Each view can be switched easily between a live feed or one of these pre-recorded videos.  

TODO: gif

For each view, the red, blue and green levels, their amount of fragmentation and horizontal distribution can all be calculated independently.


{{<image src="images/colorFiltering" caption="The controls for filtering red colors, linked to an RGBKey top which extracts an alpha max based on these red, green, and blue ranges.">}}

{{<image src="images/colorExtr" caption="The values that are extracted based on the filtered color include level, left/right distribution (pan), verticalChangeRate, and fragmentation">}}

Each of these values can be linked to knobs in the **Buchla259e Complex Waveform Generator**, using **Ableton** and **tdAbleton** to have these values linked directly to those knobs.  

{{<image src="images/allControls">}}

For each of these extracted values, the *scale,* *min,* and *max* can be set by adjusting knobs:

{{<image src="images/paramSelec">}}

In particular, the **abletonMapper** component is used and mapped directly to Softube values:

{{<fullsizeimage src="images/tdMapper">}}
{{<image src="images/tdaMapper">}}

Any of the above extracted values can be mapped directly to the panning of an ableton track, via the **abletonTrack** component. 

{{<image src="images/panning">}}

Any view can be **solod**, making the Ableton track solod and the view shown to the audience only show that component.

{{<image src="images/soloing">}}

Here is one of the views in action:
{{<vimeo 299573659>}}

And another example, just showing the view:
{{<vimeo 299562309>}}

## Fabrication

Now to step back a bit, I will go through the fabrication process.

I met with Eric Rosenthal to figure out how to properly light these liquids to pick up the colors in the best way.  He recommended getting full spectrum LEDs. I called [LEDSupply](https://www.ledsupply.com/) and right away someone answered, telling me exactly which ones to get, the [4000k Neutral White Nichia LEDs](https://www.ledsupply.com/leds/12v-led-light-nichia-757), as they are powered direclty by 12v, and do not need an LED driver.  This would allow me to also control them via PWM from an arduino, letting me programmatically turn them on and off.

{{<fullsizeimage src="images/leds.JPG" caption="4000k and 3500k neutral white leds from LEDSupply.com to illuminate the liquids from behind a translucent acrylic sheet. I also got a few different attachments for diffusing/focusing the lights to try out.">}}

{{<fullsizeimage src="images/circui" caption="The white LEDs were 12v.  A circuit controlling the brightness of leds using PWM and a TIP120 transistor, with the lights connected directly to a 12v power supply. ">}}
{{<fullsizeimage src="images/illuminating.JPG" caption="Placing the LED on an elevated platform to test out the clarity in the camera.">}} 
{{<fullsizeimage src="images/illuminating2.JPG" caption="Placing the LED on an elevated platform to test out the clarity in the camera.">}}
{{<fullsizeimage src="images/testingwithillumination" caption="Testing the visibility of the colors with the new form of illumination.  This worked well.">}}
{{<fullsizeimage src="images/cutCase" caption="I quickly designed and laser cut some black acrylic to act as a mount for the lights, with a larger size hole for the wires.">}}
{{<fullsizeimage src="images/lightattached" caption="LED mounted on standoffs.">}}
{{<fullsizeimage src="images/holders" caption="The light holders assembled. I made two of them to try out different heights of the lights.">}}
{{<fullsizeimage src="images/allpieces" caption="I made two sets of stands and light holders, to allow for two liquid containers to be performed with simultaneously.">}}

{{<fullsizeimage src="images/testingWithTwo" caption="Trying it out with two different stands and liquid containers.">}}
{{<fullsizeimage src="images/twoFromTop.JPG" caption="The camera pointing at both liquids.  Because of the sqew of the wide angle lens, they had to be angled.">}}
