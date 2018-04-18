---
title: 'Solar Analog Sequencer'
date: 2018-04-18T15:48:40-04:00
tags: ["Hardware, Analog, Solar"]
classes: ["Energy, Basic Analog Circuits, Homemade Hardware"]
draft: true
---

# Solar Powered Analog Sequencer

ToDo: add links!
This is our final project for energy,
and my personal final project for Homemade Hardware as well as Basic Analog Circuits which I took last semester.

We wanted to take the [solar powered synthesizer]({{< relref "solar-synth" >}}) we made for the midterm and turn it to a step-sequencer, which would loop through playing a sequence of tones at a timed interval, completely powered by the sun.  

One of the nice things about our midterm was that because it was all analog, it didn't require much power to run, and it just worked when it got that power without needing to do any computation.  We wanted to make the final analog as well to make it reliable and energy efficient. We also wanted to make everything modular, allowing us to swap in and out components that provided certain functionality at will.

## Fabricating the Function Generator

To create the sounds, we wanted to use the [same function generator]({{< relref "solar-synth" >}}) from the midterm which generates sin, square and triangle waves that have frequency determined by a resistance value.  As a change to the design, we replaced the 1 Mohm Logarithmic Potentiometer with an open header, allowing any type of resistor to be inserted here and affect the frequency.  I modified the schema to have this design:

{{< fullsizeimage src="images/01_function_gen_schema" >}}

## First try - 555 timer to Decade Counter to Function Generator

After meeting up with Eric Rosenthal for his office hours, he told us how we could make a seqeuencer with just a few off the shelf components components.

A 555 timer, which we learned about in [basic analog circuits,](http://www.basicanalogcircuits.com/Session_5.html) could be used to [create a square wave](http://www.electronicecircuits.com/electronic-circuits/555-variable-frequency-square-wave-generator) that oscillates between high and low at a set interval.  

ToDo: show square wave

The output of the 555 timer would be connected to the input of a [cd4017 Decade Counter](http://www.ti.com/lit/ds/symlink/cd4017b.pdf), which iterates through its 10 outputs whenever it gets a high on its input and sets the current output to high.