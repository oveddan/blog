+++
title= "Doubling the Battery Power"
date= 2017-09-21
description= "Connecting batteries in parallel to double the capacity and keep the same voltage."
classes= ["Basic Analog Circuits", "Intro to Physical Computing"]
tags= ["Physical Computing", "Circuits", "Hardware"]
featuredImage= "/blog/images/pcomp/parallelbatterycircuit_featured.png"
+++

![Batteries In Parallel](/blog/images/pcomp/parallelbatterycircuit.jpg)

A project I worked on this past summer required a portable power source of 3.3 - 4 volts. 
I used the Tenergy Li-Ion 3.7v 2600 mAH rechargeable battery, connected to the Adafruit LiPoly backpack charger and a Teensy 3.2. 
In this system, the battery would be drained after only about half an hour; I wanted to increase the capacity but did not know how.

Then last week, for my [Basic Analog Circuit](http://www.basicanalogcircuits.com/Syllabus.html) course, I learned about connecting multiple batteries in parallel
to maintain the same voltage but increase the current and capacity by connecting the powers and grounds together of the batteries.  I wanted to try this out for our Intro to Physical Computing homework which
was to build a circuit that uses switches.

To design this the right way, I met with [Eric Rosenthal](http://www.basicanalogcircuits.com/Instructor_Bio.html) for his office hours and he explained me how the LiPoly chargers work by communicating with a PCB on the battery to determine how much charge to provide; only one
charger can be connected to a battery at once.  He came up with this sketch:

![Batteries In Parallel Sketch](/blog/images/pcomp/parallelbatterysketch.jpg)

In this design, a single dc power source is connected to two LiPoly chargers - each charger is connected to a battery.  The batteries' powers and grounds are connected together, and to an output which can power LEDS and be switched on and off. 

To prevent the current from one battery flowing into another in the case of uneven resistance or charge in the batteries, **diodes** are used for each battery in the power wires that connect them.  He emphasized to use **schottky** diodes which would minimize voltage drop.

## Final Design

Two batteries would have their powers and grounds connected as specified above, with a pushdown switch controlling power to some basic LEDs. 
A single LiPoly Charger, [one from Tinkersphere](http://tinkersphere.com/power/1395-micro-usb-lipo-charger-board.html), would be connected to either battery via a switch. An external power source would drive the power to the charger.  Here is the result:

{{< vimeo 235143116 >}}

This could be modified to add a second charger, removing the switch, have each charger connected to a battery, and connecting the dc power to both chargers.
