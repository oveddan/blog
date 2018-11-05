---
title: 'Haptics'
date: 2018-11-04T18:54:21-05:00
tags: ["Arduino", "Physical Computing", "Hardware"]
categories: ["Fabrication", "Physical Computing", "Hardware"]
classes: ["Haptics"]
draft: false
---

This post goes through the work I did for the [Haptics weekend workshop](https://itp.nyu.edu/classes/haptics-fa18/).

## Hello Vibe Motors

For this [first exercise,](https://itp.nyu.edu/classes/haptics-fa18/1-hello-vibe-motors/) we experimented with connecting a few haptic motors to see how they felt.  We connected them all as you would a DC motor connected to an analog output pin, with the power going to the analog pin and ground cable going to ground: 

{{<fullsizeimage src="images/basicmotor" caption="A basic haptic motor">}}

{{<image src="images/basicanim" caption="Using the Arduinoblink sketch, the motor would vibrate on an interval">}}

{{<image src="images/mini" caption="We also tried other kinds of haptic motors, like this one here">}}


## Haptic Motor Driver

For [this exercise,](https://itp.nyu.edu/classes/haptics-fa18/2-haptic-motor-driver/) we connected a haptic motor driver to an Arduino Uno and tried out a bunch of its vibration patterns.  We then connected an audio detection level sensor, and to have it mimic the state of our day, we had it use a calm pattern, and when the audio got past a certain loudness, we had it use a more intense pattern:

{{<fullsizeimage src="images/drivercode">}}

{{<fullsizeimage src="images/soundmotor" caption="The connectivity in our mood activated haptic motor driver">}}

## Motor arrays

For [this exercise,](https://itp.nyu.edu/classes/haptics-fa18/3-motor-arrays/) we connected a series of haptic motors to feathers, and activated them one by one using PWM varying their intensity:

{{<image src="images/pulsing">}}

{{<image src="images/charts" caption="Charting the strength of each motor">}}

{{<image src="images/feathers" caption="The motors in action, pulsing like a wave one by one">}}

## Haptic Matrix

For this exercise, I collaborated with Lucas K Chung, Haiyi Huang, and, Asha Veeraswamy.  The contents of this section of the blog post is shared between our group.

{{<fullsizeimage src="images/matrixonarm">}}

### Overview: 
A wearable haptic matrix using multiple mini vibration motors that forms radio pattern to produce vibrating wave sensation on wrist.  

### Material Used: 

* Arduino Uno
* 9 mini vibration motors 
* Leather as enclosure

### Sketch: 

{{<image src="images/sketch">}}

### Diagram: 

{{<fullsizeimage src="images/buffetschem">}}

### Code:

The program pulsed waves of vibration from the center out, in a sin wave form:

```c++
const uint8_t pins [3] = {9, 10, 11};
const float maxDistance = 6;
const float distances [3] = {0, 3, 6};

void setup() {
  Serial.begin(9600);
}

float waveDuration = 3000;

void loop() {
  // oscillate between 0 and 1.
  float period = millis() / waveDuration;

  float currentDistance = maxDistance * period;

  for(uint8_t i = 0; i < 3; i++) {
    float distance = distances[i];

    float distanceFromCurrentDistance = currentDistance - distance;

    float strength = sin(distanceFromCurrentDistance / maxDistance * 3.14);

    Serial.print(strength);
    Serial.print(' ');

    uint8_t value = map(strength * 255, -255, 255, 0, 255);
    uint8_t pin = pins[i];
    analogWrite(pin, value);
  }

  Serial.println();
}
```

Plotting the vibration intensity of each layer of motors:

{{<image src="images/hapticwave">}}

### Reflection: 

The motor in the center produced the strongest vibration whereas the motors in the outer circles felt weak.
We couldn’t really experience the vibration like a wave. It was more like all the motors vibrating at the same time. 

## Bio-feedback Meditation device

For this exercise, I continued to collaborate with Lucas K Chung, Haiyi Huang, and, Asha Veeraswamy.  The contents of this section of the blog post is shared between our group.

{{<fullsizeimage src="images/biomedmmain">}}

### Overview: 

A normal human's resting heart rate is between 60-100 beats per minute. When heart rate is is > 80 bpm, the user will put on the meditation wristband which will pulse in sinusoidal waves to which they are supposed to match their breathing. When their heart rate lowers to a resting rate range of  60-75 bpm , the vibrations will stop. Relaxation achieved! 

### Materials Used:

* Arduino UNO
* 9 mini vibration motors 
* Pulse Sensor
* Transistor + Diode
* Leather as enclosure


### Fabrication Process:


{{<fullsizeimage src="images/biomeda">}}
{{<fullsizeimage src="images/oncloth">}}

### Diagram:

{{<fullsizeimage src="images/biomeditationfritzing">}}

{{<image src="images/design">}}


### Resources:

* https://www.sparkfun.com/products/11574
* https://github.com/WorldFamousElectronics/PulseSensorPlayground
* https://pdfs.semanticscholar.org/4499/b10d4a22b52a0904569b9b0551d8e8409c91.pdf
* https://learn.adafruit.com/haptic-headband/overview
