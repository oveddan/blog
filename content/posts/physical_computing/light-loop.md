+++
title= "Light Loop"
date= 2017-09-26
description= "Creating a light loop that repeats itself"
categories = ["Physical Computing"]
tags = ["Physical Computing"]
+++

{{<vimeo 235674020>}}


# The Features

The goal of this project is to use analog input and digital input to drive digital output.  

This is accomplished by detecting when a **photoresistor,** an **analog input,** gets a certain amount of light.
When that happens, it triggers an animation on the opposite end of the LEDS which travels through them back towards the photoresistor.
When the photoresistor picks up enough light from the animation that has reached it, it triggers the start of the animation again.  This 
essentially creates an infinite feedback loop.  

The loop can be stopped by blocking the light from the photoresistor, as demonstrated in the video.  It can be initialized by pressing the
**pushbutton** which acts as a **digital input** that turns on the last LED, placed next to the photoresistor.  This light causes the photoresistor to start the animation.

A **pentiometer,** another analog input, can be turned to speed up or slow down the animation.

The 74HC595 **Shift Register** is used to control 16 LEDs, each digital outputs, from **a single digital output** pin.  Two shift registers are chained together to control 8 LEDs each, as instructed
by Arduino's [Shifting Out guide](https://www.arduino.cc/en/Tutorial/ShiftOut).  Adafruit's [Shift Register guide](https://learn.adafruit.com/adafruit-arduino-lesson-4-eight-leds/overview) was helpful as well.

# The Code

The full code for this is available [here.](https://github.com/oveddan/physical_computing/blob/master/light_loop/light_loop.ino)