---
title: "Multi-Sensor Z Patch"
date: 2018-10-08T22:34:50-04:00
draft: false
classes: ["Soft Sensing"]
featuredImageResource:
  src: "images/featured"
---

For our "Beautiful Sensor" assignment for soft sensing, I wanted to take the Z-Patch my group made in the previous class
and take it a step further, to make one of the examples that they showed in the [research paper](https://zpatch.github.io/zPatch.github.io/TEI2018_zPatch.pdf) 
that has multiple sensors on the top, allowing for multi-directional control in addition to the z-axis depth ability of the sensor:

{{<image src="images/multi-sensor">}}

I wanted to build the version with 4-pads, because I thought it would provide an interesting new way to control sound synthesize, both with x, y, z, and pressure on different buttons.

The challenge was that there was no documentation for how to do this.  I [posted a question](https://github.com/zPatch/zPatch.github.io/issues/1) on how to do it on the gitub page, and got a decent answer.

## Fabrication

I created a design in Vectorworks, to cut on the lasercutter:

{{<fullsizeimage src="images/design" caption="The design of the sensor parts that were to be lasercut.  The conductive material on the top and bottom would be Ripstop.  The resistive material would be Bremen.  For the bottom part, the connector would be folded up over the top.  All 5 connectors would be soldered to a header.  The decision to try to solder the headers to the fabric ended up proving costly.">}}

{{<fullsizeimage src="images/material" caption="Ripstop, the conductive fabric">}}

To lasercut the fabric, I attached it with double sided tape to a piece of scrap acrylic.  I then lasercut in on the 60W epilog on 35% speed, 50% power, and 5000hz:

{{<fullsizeimage src="images/lasercut">}}

Then I lasercut the resistive material that would be sandwitched by the conductive fabric:

{{<fullsizeimage src="images/lasercut2">}}

I ironed on a layer of double sided adhesive to the bottom piece of thick, non conductive fabric that would sit between the circuit and the skin, and placed
the bottom conductive fabric on top:

{{<fullsizeimage src="images/onpad">}}

Then I placed the rest of the layers in order: resistive fabric, followed by conductive fabric:

{{<fullsizeimage src="images/onpadlayered">}}

I decided to switch to another piece of fabric for the base piece, because I wanted it to be able to wrap all the way around my arm like an armband:

{{<fullsizeimage src="images/onsecondpad">}}

I then ironed on another piece of double-sided adhesive:

{{<fullsizeimage src="images/withglue">}}

Finally, I cut a piece of mesh polyester fabric and ironed it to the top, having it stick using the adhesive:

{{<fullsizeimage src="images/ironing">}}

I then attempted to solder on the header to the pins I created.  This was super tricky as the conductive fabric wasn't really meant to be soldered, it would 
burn off and often not stick to the solder.  

{{<fullsizeimage src="images/headers" caption="With the headers soldered on.  This wasn't the best idea for connecting this circuit, because the fabric isn't meant to be soldered, it burns at contact with the iron.  This later ended up coming apart.">}}

Next time I will follow what the guide says to do and get female headers and crimp them.

I connected the pins to 5 analog inputs on an Arduino UNO, with A0 connecting to the bottom conductive material and the rest connecting to the top:

{{<fullsizeimage src="images/onwrist">}}
{{<fullsizeimage src="images/attached">}}

I attached velcro to the band:

{{<fullsizeimage src="images/withvelcro">}}

And wore it on the arm:

{{<fullsizeimage src="images/onarm">}}

## Code / Testing

I struggled for a while to figure out how the code works, and eventually partially got it.  I had a very hard time getting the distance/z-axis part to work.
I asked a [few questions on the github issue page](https://github.com/zPatch/zPatch.github.io/issues/1).  

I finally figured out after trying a bunch of things some code that worked:

```c
const int BOTTOM_SENSOR = A0;
const int TOP_SENSORS[] = {A1, A2, A3, A4};
const int numSensors = 4;
float k = 0.2; // this adjusts the low-pass filter: 
               // 0 == no signal
               // 0.001 == very aggressive (slow but steady) 
               // 0.999 == not aggressive at all (fast but noisy)
               // 1 == no filter

int sensorValues[4];
int baseline;
int prevCapValues;

void setup() {

  Serial.begin(9600);
  delay(50);
    //set top four pads as output and pull them high
  for (int i = 0; i< 4; i++) {
    pinMode(TOP_SENSORS[i], OUTPUT);
    digitalWrite(TOP_SENSORS[i], HIGH);
  }
  baseline = capacitiveRead(10); //set the baseline for capacitive readings
  delay(50);
}

void loop() {

  // sequentially read the push strength from each pad
  for (int i = 0; i< numSensors; i++) {
    int sensorValue = pushRead(TOP_SENSORS[i], 3);  
    Serial.print(sensorValue); 
    Serial.print(" ");
  }

  // get single capacitance value which represents the hover effect
  int rawCapacitance = capacitiveRead(10);
  rawCapacitance = (rawCapacitance - baseline); //baseline capacitance value 
  int capValues = prevCapValues + (k * (rawCapacitance - prevCapValues)); //filter capacitive value
  prevCapValues = capValues; //for filtering

  Serial.println(capValues);

  delay(5); // (so as not to completely flood the serial port)
}

void resetTopPads() {
  for(int i = 0; i < numSensors; i++) {
    pinMode(TOP_SENSORS[i], INPUT);
  }
}

int pushRead(int pin, int numSamples) {
  int resistance;
  pinMode(pin, OUTPUT);

  for (int i = 0; i < numSamples; i++) {
    digitalWrite(pin, LOW);
    pinMode(BOTTOM_SENSOR, INPUT_PULLUP);
    resistance += analogRead(BOTTOM_SENSOR);
    digitalWrite(pin, HIGH);
  }
  return resistance / numSamples;
}

int capacitiveRead(int number) {
  resetTopPads();

  int pinA = A0;
  int pinB = A1;
  int capacitanceA = 0;
  int capacitanceB = 0;
  int capacitance = 0;

  for (int i = 0; i < number; i++) {
    pinMode(pinA, INPUT);
    pinMode(pinB, INPUT_PULLUP);
    ADMUX |=  0b11111;
    ADCSRA |= (1 << ADSC); //start conversion
    while (!(ADCSRA & (1 << ADIF))); //wait for conversion to finish
    ADCSRA |= (1 << ADIF); //reset the flag
    pinMode(pinB, INPUT);
    capacitanceB = analogRead(pinB);

    pinMode(pinB, INPUT);
    pinMode(pinA, INPUT_PULLUP);
    ADMUX |=   0b11111;
    ADCSRA |= (1 << ADSC); //start conversion
    while (!(ADCSRA & (1 << ADIF))); //wait for conversion to finish
    ADCSRA |= (1 << ADIF); //reset the flag
    pinMode(pinA, INPUT);
    capacitanceA = analogRead(pinA);

    capacitance = capacitance + capacitanceA + capacitanceB;

  }
  return capacitance;
}
```

However, after a while of pressing the buttons and moving my arm around, I noticed some of the connectors start to break.  I tried soldering them back on but more fabric burnt away to the point of the connections not being salvageable:

{{<fullsizeimage src="images/badheaders" caption="The decision to solder onto fabric proved fragile and ended up breaking.">}}

Unfortunately I never recorded the thing working before the connections broke.  As time was running out, I called it a night.  I decided to record what was sort of working at the time.

I used TouchDesigner to debug/visualise the outputs from the sensor.  Here is what I recorded after things stopped to work.  It appears as if only one of the pads works, and as of now the distance via capacitance sensor functionality is broken:

{{<youtube k-AzAXZkU-w>}}


Next time, I will use better connectors, and record things when they are working.