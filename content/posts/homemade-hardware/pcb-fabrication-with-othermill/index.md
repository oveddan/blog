---
title: "PCB Circuit Fabrication With the Othermill"
date: 2018-02-13T20:44:38-05:00
draft: false
tags: ["Hardware", "Fabrication"]
classes: ["Homemade Hardware"]
featuredImageResource:
  src: "images/pcb_fab_featured"
  fillPosition: "Center"
description: "The process of designing circuits in Eaglecad and then fabricating the boards on the Othermill."
---

{{<fullsizeimage src="images/00-soldered-featured">}}

For this homework assignment for [Homemade Hardware](/blog/posts/homemade-hardware/), we were to fabricate a PCB Board using the Othermill.

I continued with the [previous design](../pcb-design) of an ATTiny85 controlling
the brightness of an LED based on the reading from an HC-sr04 Ultrasonic Distance Sensor.
I modified it slightly based on the instructions from class.   A 1k resistor
connect the reset pin of the ATTiny85 to the power, and the output LED pin
would be connected via a TIP120 Transistor to the ground line of the LEDs.
I also added a debugging LED.

## Testing out the Circuit 

First I breadboarded circuit with the modifications mentioned above:

{{<fullsizeimage src="images/01-breadboard">}}

Then I tested it out:

{{<image src="images/testing-">}}

## Designing and the Boards

Then it was time to desing the circuit in EagleCad.

{{< image src="images/sensor_board_schema" caption="The schema for the board with the sensor" >}}

For the board, I made sure that the ground pin for the sensor was on the left side; This would ensure
that when the [HC-SR04](https://www.sparkfun.com/products/13959) was placed on the board, it would be oriented
to be protuding off of the board and not overlapping it, enabling the parts below to be accessible:

{{<image src="images/sensor_board_design" caption="The design for the board with the sensor; 4 pins were made available for the HC-SR04 ultrasonic distance sensor and oriented so that the sensor would not overlap onto the board.">}}

We were also to create a circuit for a letter with LEDs that would have its brightness be controlled by
the reading from the sensor.  I was assigned the letter `T`.

{{< image src="images/letter_t_design" caption="The design for a letter T made of leds. The red route indicates where a wire would need to be attached" >}}

## Fabricating the Boards

Now it was time to fabricate the circuit using the Othermill.  In bantamTools, I managed to fit both boards onto the bed
by rotating the T slightly.

{{<fullsizeimage src="images/layout_on_othermill">}}

For the bits, I set bantamTools to use 1/32" and 1/16" flat end mill bits.
Then I watched in awe as the Othermill effortlessly and accurately milled the board:

{{<image src="images/othermill_1">}}
{{<image src="images/othermill_2">}}


{{<fullsizeimage src="images/02">}}

{{<fullsizeimage src="images/03">}}
{{<fullsizeimage src="images/04">}}

## Assembling the Boards

Then it was time to put the components onto the boards and solder them.

{{<fullsizeimage src="images/06">}}
{{<fullsizeimage src="images/07">}}
{{<fullsizeimage src="images/09">}}

{{<fullsizeimage src="images/10" caption="With the power connected via jumpers.  The debugging light showed it was being powered correctly">}}

{{<image src="images/testing_simple_light" caption="Testing the output of the sensor with a basic LED light before putting together the letter T board">}}

{{<fullsizeimage src="images/11" caption="Assembling the letter board">}}
{{<fullsizeimage src="images/14">}}
{{<fullsizeimage src="images/15">}}
{{<fullsizeimage src="images/16">}}
{{<fullsizeimage src="images/17" caption="The assembled boards.">}}

And finally, testing that the sensor board can control the brightness of the leds on the letter board:

{{<image src="images/testing_all_together" caption="The assembled boards.">}}


