---
title: "PCB Circuit Fabrication With the Othermill"
date: 2018-02-13T20:44:38-05:00
draft: true
tags: ["Homemade Hardware", "Electronics", "Fabrication"]
---

{{< fullsizeimage src="images/00-soldered-featured" >}}

For this homework assignment for [Homemade Hardware](/blog/posts/homemade-hardware/), we were to fabricate a PCB Board using the Othermill.

I continued with the [previous design](../pcb-design) of an ATTiny85 controlling
the brightness of an LED based on the reading from an HC-sr04 Ultrasonic Distance Sensor.
I modified it slightly based on the instructions from class.   A 1k resistor
connect the reset pin of the ATTiny85 to the power, and the output LED pin
would be connected via a TIP120 Transistor to the ground line of the LEDs.
I also added a debugging LED.

# Testing out the Circuit 

First I breadboarded circuit with the modifiations mentioned above:

{{< fullsizeimage src="images/01-breadboard" >}}

Then I tested it out:

{{< image src="images/testing-" >}}

{{< fullsizeimage src="images/02" >}}

{{< fullsizeimage src="images/03" >}}
{{< fullsizeimage src="images/04" >}}
{{< fullsizeimage src="images/06" >}}
{{< fullsizeimage src="images/07" >}}
{{< fullsizeimage src="images/08" >}}
{{< fullsizeimage src="images/09" >}}
{{< fullsizeimage src="images/10" >}}
{{< fullsizeimage src="images/11" >}}
{{< fullsizeimage src="images/14" >}}
{{< fullsizeimage src="images/15" >}}


