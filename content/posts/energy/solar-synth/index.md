---
title: 'Solar Powered Analog Synthezier - Circuit Prototype and Power Budget'
date: 2018-02-26T22:38:26-05:00
tags: ["Hardware", "Fabrication", "Analog"]
classes: ["Energy", "Homemade Hardware"]
draft: false
featuredImageResource: 
  src: "images/synth_featured"

---

{{< image src="images/triangle_wave" >}}

For this assigment for [Energy](http://www.fddrsn.net/teaching/energy), we are to power computation
with solar power.  I am collaborating with Fanni Fazakas, and we are going to create a
solar powered analog synthesizer.  This will take energy from the sun and convert it directly
into sound waves via a low-power analog circuit.

## Generating Sine, Square, and Triangle Waves

We got a circuit design from [Eric Rosenthal](http://www.basicanalogcircuits.com/Syllabus.html)
that can produce a sine, square and triangle wave:

{{< image src="images/eric_synth_schematic" caption="Eric Rosenthal's circuit for a function generator using LM358 op-amps.  It can generate sine, square, and triangle waves." >}}

First we wanted to breadboard it to see how it worked. This was super challenging, and took an entire day, but we finally got it to work.  In the circuit diagram,
there is a 1 Megaohm potentiometer that can modify the frequency of the wave.  We replaced it with 5 buttons that
each set a discreet resistance in the range of 100k to 1M Ohm:

{{< image src="images/breadboard_with_buttons_scaled" caption="The breadboarded circuit with two LM358 opamps, and 3 function outputs from left to right: sine, square, and triangle">}}

To be honest we don't understand what the circuit is doing, all we know is how to assemble it and that it works.
We tested each wave type with an oscilloscope:

{{< fullsizeimage src="images/sin-wave" caption="Sine wave output">}}
{{< fullsizeimage src="images/square-wave"  caption="Square wave output">}}
{{< fullsizeimage src="images/triangle-wave"  caption="Triangle wave output">}} 

Varying the frequency worked by altering the resistance with each button:

{{< image src="images/sin_wave" caption="Different resistances produce different frequencied sine waves" >}}

## Listening to the Produced Sound

To hear the sounds it generated, we connected headphone via a breadboardable headphone jack.  Nothing was audible, however.
We asked our friend Amitabh to help us troubleshoot.  He showed us on the Oscilloscope how the waves were oscillating above 0,
which would prevent the proper vibration from occuring in the headphones for the sound to be audible:

{{< fullsizeimage src="images/waves-above-zero" caption="With the waves oscillating above 0, nothing could be heard in the headphones" >}}

Per his suggestion, we added a 100 nf capacitor to the output:

{{< fullsizeimage src="images/capacitor-output" caption="100nf capacitor added in series to output to make it oscillate around 0">}}

This smoothed it out and the wave oscillated around 0:

{{< fullsizeimage src="images/oscillating-zero" >}}

We could successfully now hear sounds tones from the headhpones when listening to sine, square, and triangle waves.

## Power Budget

The circuit is designed to work optimally at 12V, and the waves decayed as we lowered the voltage.  Around 6v is the minimum voltage.
It worked at to 19V, but we didn't want to turn the voltage up higher for fear of burning something out.

{{< fullsizeimage src="images/minmax" caption="The circuit operating at the max and min voltage of 19 and 6 correspondingly.  Anything lower and the wave totally loses its shape" >}}

We put a multimeter in series with the power supply's power and the board.  With the headphones and key pressed, and a sound decently audible, the draw was
only about **8ma**.  If we want to connect speakers we would need some sort of an OpAmp.

Assuming that the output wave is 7V as depicted in the oscilloscope, here are a few
speakers and what we would need to power them:

| Speaker                                                    | Watts           | Ohms   | Amps at 7V |
| -------------                                              | :-------------: | -----: | -----:     |
| [Adafruit 4 Ohm 3W](https://www.adafruit.com/product/1314) | 3               | 4      | 0.43       |
| [Adafruit 8 Ohm 1W](https://www.adafruit.com/product/1313) | 1               | 8      | 0.143      |

Since the circuit itself only draws 8 ma, we can leave that out of the total since it's insegnificant. We
would just need more current for the opamps to power the speakers.
