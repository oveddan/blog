+++
title= "Batteries in Parallel"
date= 2017-09-21
draft= true
description= "Doubling the capacity while maintaining the same voltage"
categories= ["Basic Analog Circuits", "Physical Computing"]
tags= ["Physical Computing", "Circuits"]
+++

![Batteries In Parallel](/blog/images/pcomp/parallelbatterycircuit.jpg)

A project I worked on this past summer required a portable power source of 3.3 - 4 volts. 
I used the Tenergy Li-Ion 3.7v 2600 mAH rechargeable battery, connected to the Adafruit LiPoly backpack charger. 
In this system, the battery would be drained after only about half an hour; I wanted to increase the capacity but did not know how.

Then last week, for my [Basic Analog Circuit](http://www.basicanalogcircuits.com/Syllabus.html) course, I learned about connecting multiple batteries in parallel
to maintain the same voltage but increase the current and capacity by connecting the powers and grounds together of the batteries.  I wanted to try this out for our Intro to Physical Computing homework which
was to build a circuit that uses switches.

To do this the right way, I met with [Eric Rosenthal](http://www.basicanalogcircuits.com/Instructor_Bio.html) for his office hours and he explained me how the LiPoly chargers work by communicating with a PCB on the battery to determine how much charge to provide; only one
charger can be connected to a battery at once.  He drew this sketch:

![Batteries In Parallel Sketch](/blog/images/pcomp/parallelbatterysketch.jpg)

In this design, a single power source is connected to two LiPoly chargers - each charger is connected to a battery.  The batteries' powers and grounds are connected together, and to an output which can power LEDS and be switched on and off. 

To prevent the current from one battery flowing into another in the case of uneven resistance or charge in the batteries, **diodes** are used for each battery in the power wires that connect them.  He emphasized to use **schottky** diodes which would minimize voltage drop.

## Final Design

Two batteries would have their powers and grounds connected as specified above, with a pushdown switch controlling power to some basic LEDs. 
A single LiPoly Charger, [one from Tinkersphere](http://tinkersphere.com/power/1395-micro-usb-lipo-charger-board.html), would be connected to either battery via a switch. An external power source would drive the power to the charger.  Here is the result:

{{< vimeo 235143116 >}}
