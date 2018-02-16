---
title: 'Homemade Hardware - PCB Design'
date: 2018-02-07T12:33:03-05:00
tags: ["Homemade Hardware", "Electronics", "Hardware"]
classes: ["Homemade Hardware"]
draft: false
featuredImageResource:
  src: "images/board_design"
  fillPosition: "BottomLeft"
---

For this homework assigment of [Homemade Hardware](/blog/posts/homemade-hardware/), we were to "Create Eagle files for ATtiny85 sensor + LED."

I decided to design a PCB for the [Ultrasonic Distance Sensor breadboarded prototype](../ultrasonic-distance-sensor/) from the previous week.

{{< image src="images/hw1-input" caption="The schematic design for connecting an HC-SR04 to an ATTiny85" >}}

Based on this design and our tutorial from the previous class, I created this schematic:

{{< fullsizeimage src="images/schema" title="PCB Schema" >}}

When it came time to design the board, I wanted to be sure that the HC-SR04 Ultrasonic Distance sensor
would be facing the outside of the board so that none of the board components would interfere
with its signal. When arranging the `HC-SR04` pins on the board, I made sure the `VCC` and `Ground` pins would
be oriented to make it face outside.

{{< image src="images/hc-sr" caption="The HC-SR04.  The pins would be oriented to have it face outside" >}}

For the board design, I got everything to be arranged compactly.  As per the [instructor's tutorial](https://vimeo.com/253974848), 
I made the connection routes 1mm wide:

{{< fullsizeimage src="images/board_design" title="The Board Design" caption="The PCB Board Design" >}}
