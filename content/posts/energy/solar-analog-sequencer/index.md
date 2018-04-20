---
title: 'Energy and Homemade Hardware final - Solar-powered analog sequencer and synthesizer'
date: 2018-04-18T15:48:40-04:00
tags: ["Hardware, Analog, Solar"]
classes: ["Energy, Basic Analog Circuits, Homemade Hardware"]
description: "We wanted to take the solar powered synthesizer we made for the midterm and turn it to a step-sequencer, which would loop through playing a sequence of tones at a timed interval, completely powered by and controlled by the sun." 

draft: false
featuredImageResource: 
  src: "images/seq_featured"
---

{{<fullsizeimage src="images/SolarSequencer" caption="The fabricated solar powered sequencer.  Each step has photoresistors that control the frequency of a tone in the sequence">}}

This is our final project for [Energy,](http://www.fddrsn.net/teaching/energy)
and my personal final project for [Homemade Hardware](http://homemadehardware.com/) and it ended up acting as a final for [Basic Analog Circuits](http://basicanalogcircuits.com/) which I took last semester. I collaborated with [Fanni Fazakas](https://rumexinaction.com/) and [Sam Chasan.](http://www.samuelchasan.com/)

We wanted to take the [solar powered synthesizer]({{< relref "solar-synth" >}}) we made for the midterm and turn it to a step-sequencer, which would loop through playing a sequence of tones at a timed interval, completely powered by and controlled by the sun.  

{{<image src="images/00_solar" caption="6v 90ma mini solar panels would power it">}}

One of the nice things about our midterm was that because it was all analog, it didn't require much power to run, and it just worked when it got that power without needing to do any computation.  We wanted to make the final analog as well to make it reliable and energy efficient. We also wanted to make everything modular, allowing us to swap in and out components that provided certain functionality at will.

We wanted everything to be controlled by light:

* The power would be all solar.
* The frequency of each step would be controlled by photoresistors which the user could aim at light.
* The speed of the step interval would be controlled by photoresistors which the user could aim at light.

{{<fullsizeimage src="images/PhotoResistor" caption="The photoresistors connected in series at the end of a stem.  Each set of photoresistors would control the frequency of a tone in the sequence. Additionally, a set of photoresistors would affect the speed/frequency of the sequence.">}}


## Fabricating the Function Generator

To create the sounds, we wanted to use the [same function generator]({{< relref "solar-synth" >}}) from the midterm which generates sin, square and triangle waves that have frequency determined by a resistance value.  As a change to the design, we replaced the 1 Mohm Logarithmic Potentiometer with an open header, allowing any type of resistor to be inserted here and affect the frequency.  I modified the schema to have this design:

{{< fullsizeimage src="images/01_function_gen_schema" caption="Eric Rosenthal's function generator, with headers available to attach variable resistors">}}

I created a 2-sided board design, and decided to go with through-hole for the parts because it was easier and less prone to failure than surface mount:

{{< image src="images/01_function_gen_board" caption="Two-sided function generator board design." >}}

I fabricated it using the othermill:

{{<fullsizeimage src="images/00_fabricated" >}}

Then soldered on all the components:

{{<fullsizeimage src="images/00_Bottom" >}}
{{<fullsizeimage src="images/00_PartsSold" caption="The fabricated analog function generator composed of two LM386 op-amps based on Eric Rosenthal's design. The top left two pins are input 12v power and ground.  The middle left two pins take a resistor and affect the frequency of the waves generated.  The right 3 top middle and bottom pins are square, triangle, and square wave outputs correspondingly.  This board worked until late at night I accidentally reversed the polarity."  >}}

I tested it using a 12v power supply and it was able to generate square ans sin waves.  Unfortunately I did not take any videos of it, and after reversing the polarity by accident and frying it, I did not have any documentation of it once working.

## First try - 555 timer to Decade Counter to Function Generator

We met with Eric Rosenthal for his office hours, and he told us how we could make a seqeuencer with just a few off the shelf components components.

A [cd4017 Decade Counter](http://www.ti.com/lit/ds/symlink/cd4017b.pdf) could be used to iterate through its 10 outputs whenever it gets a high signal into CLK pin.  To test the decade counter, I breadboarded a 4017 with pushbutton as a pullup that would trigger a high when pressed connected to the input,
with LEDs showing the counter incrementing the high:

{{<image src="images/02_pushbutton_4017" caption="Testing out a 4017 decade counter triggered by a push button." >}}

An 8-step sequence is ideal for music, as most musical sequences are 4 or 8-steps. To get the decade counter to do only 8-steps, the 9th output pin would be connected to the reset:

{{<image src="images/02_4017_button" caption="A bush button triggers a 4017 decade counter setup to work like an 8-step sequencer" >}}

A 555 timer, which we learned about in [basic analog circuits,](http://www.basicanalogcircuits.com/Session_5.html) would be used to [create a square wave](http://www.electronicecircuits.com/electronic-circuits/555-variable-frequency-square-wave-generator) that oscillates between high and low at a set interval, and be fed as an input to the CLK pin of the 4017 decade counter ot have it step through its sequence at that interval.

<!-- ToDo: show square wave -->

{{<fullsizeimage src="images/03_555" caption="Connecting a 555 to a 4017 decade counter that resets after 8 steps">}}

I then tested this setup, first with a potentiometer controlling the resistance and speed, then with photoresistors connected in series:

{{<image src="images/03_potentiometer" caption="The variable resistance from a potentiometer affects the frequency of the square wave genereated by a 555.  This square wave triggers a 4017 decade counter to increment.">}}

{{<image src="images/04_light" caption="The potentiometer is replaced by photoresistors connected in series.  The amount of light they get affects their resistance and correspondingly the speed of the 555 and seqence.  The oscilloscope shows the affect that visible light has on the frequency of the wave emitted from the 555.">}}

The next thought was to connect the output of this counter to a set of resistors that could have their circuits closed with the function generator when the transistor receives a high, thus allowing them to change the frequence of the function generator.

We used N-Channel Power Mosfets they had at the ITP shop. We tested this out, but could never get it to work as desired.   I realized after a bit that I had reversed the polarity by accident on the function generator :( - it was never producing any oscillation at all.

The next day to try to salvage the function generator I removed the LM386 opamps and replaced them with new ones to try to get the oscillation working.  It did not; the Oscilloscope always showed 0.

## Plan b - using the 555 to generate square waves for the output.

I gave up after a while on the function generator, and wanted to give a shot at using the 555 to generate the oscillations for the output sound wave.  This is what the circuit would look like:

{{<fullsizeimage src="images/05_555_Sequencer_555">}}

First we tested out just using the 555 to generate square waves in an audible frequency:

However, when testing this out, it for some reason always stuck with the resistor that had the lowest resistance,
and the frequency of oscillation would be constant.

<!-- ToDo: show pics here. -->

I spoke with Eric Rosenthal and he told us what were doing wasn't possible with the type of transistor we were using.  We were using power Mosfets, which are meant to allow lots of power through on a high signal. In our case, we just needed to allow oscillations through.  So it would not be possible to do what we were trying to do with the materials available in the shop.

## Plan c - AtTiny85 for output square waves.

I decided in the end we would use an Arduino to generate the output sound waves, since its analog input could easily be connected to the outputs of the decade counter, by just having each output connected to its own resistor and
in turn to a single input in the Arduino. 

```c
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

int minTone = 200;
int maxTone = 20000;

void loop() {
  // Read value generate by resistor connected to the current output
  // of the decade counter.
  int sensorValue = analogRead(A1);

  // convert that to a tone frequency
  int toneValue = map(sensorValue, 0, 1023, minTone, maxTone);

  // play the tone
  tone(0, toneValue);
}
```

We would use an AtTiny85 because it is small and consumes minimal power compared to a regular Arduino. 

{{<fullsizeimage src="images/05_555_Sequencer_AT" caption="The design for having an ATTiny85 generate the square waves for the sound output.  Each of the outputs of the decade counter has its own resistor which affects the freqency of the wave generated by the ATTiny85.  All of the power in is regulated by a 7805 5V voltage regulator.">}}

I tested this out with an Arduino first, using a few of the outputs connected to fix resistances:

{{<image src="images/06_arduino" caption="An Arduino Uno generating square waves based on values from resistors connected to the outputs of a 4017b decade counter.">}}

Then we tested using photoresistors, and allowing the hand blocking light to change the frequency.  The sound wave this generated wasn't too pleasent, but knew we could eventually tune how it sounded.

{{<youtube X0KcatfnHqU>}}

I decided to go with this design to generate sound waves and fabricate a board to make it durable and compact.

### Solar-powered amplifier to Drive a small Speaker

Eric Rosenthal had given me us [LM4889 breakout board](), which is an amplifier to drive a small speaker.  It accepts
a sound signal and power at 5 volts and amplifies the current, thus increasing the volume.  This decide is described as "an efficient system that increases the total amount of power available to the speaker." 

{{<fullsizeimage src="images/07_LM4889">}}

 We would connect the power into this to drive a small speaker with the output from our sound generating circuit. I designed a circuit and board that would take the output of our sound board and the solar power to the input of this board and connect the output of this board to a mono-headphone jack:

{{<fullsizeimage src="images/08_ampschema">}}

{{<fullsizeimage src="images/08_ampboard" caption="The designs for the audio amplifier to heaphone jack module.">}}

### Fabricating and testing the boards.

I felt confident that these design would hold for our needs.  I designed a board for the ATTiny85 based sound wave generator, then fabricated both boards on the othermill:

{{<image src="images/09_sequencer">}}

{{<fullsizeimage src="images/10_sequencer_othermill">}}
{{<fullsizeimage src="images/10_sequencer_cut">}}

{{<fullsizeimage src="images/10_fabricated_sequencer.jpg" caption="The fabricated sequencer and synthesizer">}}
{{<fullsizeimage src="images/10_fabricated_sequencer_bottom">}}

I connected the circuit to a power supply and Oscilloscope.  The oscilloscope read high-frequency, unpredictable
waves. I tried a bunch of things on the circuit board all day to try to get it to work, like adding solder,
swapping capacitors, doing beep tests for continuity but no matter what could not fix the oscillation issues of the
first timer.  The AtTiny85's output was always noise as well, never able to produce an audible sound.

{{<fullsizeimage src="images/11_testing_circuit">}}

After this failed on the circuit I tried to revisit things on the breadboard.  Unfortunately I had taken everything
apart on the breadboard before.  I could not get a setup that worked again.  

{{<fullsizeimage src="images/12_testing_breadboard">}}

I realized it would take too much effort to fix everything and I was exhausted.  At the end, the Monday night before our energy class where this project was due, I decided to call it quits for a bit.  My body was in a lot of pain but I learned so much along the way from all of these failures.  I hope we can continue this project and make it successful.  We are very close! We have all the parts together now just need to give it another stab.  Our failures will be our learnings :)