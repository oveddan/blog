---
title: "Designing and fabricating a 2-sided pcb, then surface mounting the parts"
date: 2018-03-22T15:23:02-04:00
draft: false
classes: ["Homemade Hardware"]
featuredImageResource: 
  src: "images/midterm_featured"
---

# Background 

This post is about my midterm for [Homemade Hardware](http://homemadehardware.com/).

Last summer, before I attended ITP, I spent countless days and nights fabricating
a 5-foot long bow full of leds that would be animated to generate an image when
spun at the right speed.  It was based on the design for [Adafruit's Supernova Poi](https://learn.adafruit.com/supernova-poi/introduction)

This circuit concisted of an [Adafruit LiPoly Backpack Add-On](https://www.adafruit.com/product/2124) connected to a
[Teensy 3.2](https://www.pjrc.com/store/teensy32.html).  Two strips of APA102 Leds were soldered onto the Teensy.
A [3.7V 2600mAh battery](https://www.amazon.com/gp/product/B003U7SUUM/)
was soldered onto pads on the LiPoly Backpack charger.

{{< image src="images/bow_circuit" >}}

After many struggles I finally got it working:

{{< fullsizeimage src="images/bow_1" >}}

{{< fullsizeimage src="images/bow_2" >}}


The chip sat at the middle of the bow, and the bow would have to be unscrewed to usb charge the battery:

{{< fullsizeimage src="images/bow_interior" >}}

{{< fullsizeimage src="images/bow_screws" caption="3d-printed screw fasteners would allow the bow to split in half and be travel friendly" >}}

This was a very delicate solution, and often broke when the wires would disconnect as a result of unscrewing.  The connections would often break,
and I'd have to resolder them, hoping that it would be fixed.  The main issues were the connection between the battery charging chip
and the Teensy.  These would often break, or short.  

Finally, one day late at night I was trying to fix some of the wires when the power and ground from the battery charging chip to the Teensy
touched each other and shorted, frying the chip and the battery:


{{< fullsizeimage src="images/battery_charging_chip" caption="The mess that was the Teensy and Battery connection.  These wires would often break and short" >}}
{{< fullsizeimage src="images/shorted_battery" caption="Eventually the battery shorted from power and ground on the LiPo charger touching each other." >}}

# New integrated two-sided circuit

I wanted to be able to make more of these, and have them durable to survive dance performances and challenging conditions at festivals.  So I decided
to design a chip that integrated both the battery charger and processor onto one board, and be as compact as possible.

I designed a two-sided PCB, with the components from the LiPo charger, and an ATMega32u4 together.  I chose the ATMega32u4 because it can be programmed over USB:

{{< image src="images/schematic" >}}

The usb port would be connected to the board.  It would only power the board's VBUS port, because it would only be used for usb programming.  The usb power would
also be routed to power the MPC73831T chip, the same one that exists on the Adafruit LiPo charger.  Most of the design from the Adafruit board remained in this schematic,
except a 10k resistor is used to drive 1A of charge to the Battery.

A JST connector would connect to the battery.  It's power would be routed both to the board through a 3.3v regulator, and directly to the LEDs.  A
switch would enable the battery's ability to power the board and LEDs to be turned on and off.

Two sets of 4 pins would be made available to the APA102 leds, and the data and ground pins for the LEDs would be routed to D15 and D16 of the
ATMega32u4 chip to enable hardware SPI, as specified in the [FastLED documentation](https://github.com/FastLED/FastLED/wiki/SPI-Hardware-or-Bit-banging).

Serial programming pins would share some of the ports with the LEDs, but would just be used in the beginnign to burn the bootloader onto the board.

I went with a two-sided design, to minimize the size of the chip.  The top of the board would contain the small parts and use a solder stencil.  The bottom
part would contain parts I could manually solder on, like the JST header and 3.3v regulator:

{{< image src="images/board_both" caption="Both sides of the board">}}
{{< image src="images/board_top" caption="The top of the board">}}
{{< image src="images/board_bottom" caption="The bottom of the board">}}

I milled this on the Othermill, and successfully had a 2-sided board:

{{< image src="images/routed_board_top">}}
{{< image src="images/routed_board_bottom">}}

I then laser etched a solder stencil, and used that to apply solder paste.  Unfortunately 
the stencil was too small. Near the edges of the board the solder paste did not really go through:

{{< fullsizeimage src="images/solder_stensil">}}

I used a pick and place to put the chips on the board.  I manually put solder paste where the legs
of the Arduino should be, and this was unreliable.  It created too much solder but I thought maybe when
reflow would happen it would bunch up only over the pads.  I used reflow to melt the solder on the
top, and then realized that this didn't happen; the legs on the ATMega32u4 were shorted, so I stopped there:

{{< fullsizeimage src="images/parts_on_board">}}

I will retry this, and make a better solder stencil, making sure that the paste is properly on the board before proceeding
to melt the solder.
