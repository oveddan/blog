---
title: 'Weather Diorama'
date: 2017-10-29T20:33:47-04:00
tags: ["Hardware", "Fabrication"]
classes: ["Intro to Physical Computing"]
featuredImage: "/blog/images/pcomp/diorama/diorama_featured.jpg"
description: "How we built a diorama based on Japanese art that has lights which change the appearance of the scene depend on the time of day or weather."
images: ["/blog/images/pcomp/diorama/sunset.jpg"]
draft: false 
---

<img src="/blog/images/pcomp/diorama/transitions.gif" />

# Background / Motivation

This was my teams' project for our Intro to Physical Computing midterm, where we were encouraged to use serial communication.  [Barak Chamo](http://www.barakchamo.com/) and [Mai Arakida Izsak](http://www.maispace.space/) were the other team members, and contributed to this post.

After seeing Barak create his initial [Fuji Diorama](http://www.barakchamo.com/the-low-poly-bonzai-mixed-material-fabrication/):

<img src="/blog/images/pcomp/diorama/barak_diorama.jpg" />

We thought it would be interesting to insert lights between the layers that could change the appearance of the scene depend on the time of day or weather. 
We had the idea to connect it to an api through a serial connection that would provide the current weather for the location the scene was taken, and we'd make the lights in the scene reflect the weather and time of day of the real location.  This would provide a deeper connection to the real location for the observer.

For this project chose to convert Meditating Samurai, by Bacht:

{{<figure src="/blog/images/pcomp/diorama/meditating-samurai-canvas.jpg" link="https://society6.com/product/meditating-samurai_stretched-canvas" caption="Meditating Samurai by Bacht">}}

We figured this diorama would be ideal because:

* It would be easy to trace vectors for laser cutting the layers.
* We could insert addressable leds between the layers and alter each layers colors independently.
* We could make the sun also behave as a moon by backlighting it and altering its color.

# Fabrication

We cut these layers both on white paper and on colored paper, to see how the scene would look under different lighting:

{{<figure src="/blog/images/pcomp/diorama/white_papers_2.jpg" caption="White papers with sunrise colors">}}
{{<figure src="/blog/images/pcomp/diorama/white_papers_sunset.jpg" caption="White papers with sunset colors">}}
{{<figure src="/blog/images/pcomp/diorama/colored_papers.jpg" caption="Colored papers with daytime colors">}}

We decided to go with colored papers because they would more closely resemble the original.  We put 5 strips of 10 *WS2812* leds each between each layer.

{{<figure src="/blog/images/pcomp/diorama/barak_mai_building.jpg" caption="Barak and Mai wiring up the layers">}}
{{<figure src="/blog/images/pcomp/diorama/built_2.jpg" caption="The layers">}}
{{<figure src="/blog/images/pcomp/diorama/do_testing.jpg" caption="Me (Dan) testing out the buttons">}}
{{<figure src="/blog/images/pcomp/diorama/built.jpg" caption="With leds connected and turned on">}}

We used a single *WS2812* neopixel to represent the sun, and diffused it with some frosted paper.

{{<figure src="/blog/images/pcomp/diorama/built_with_sunset.jpg" caption="Sunset">}}
{{<figure src="/blog/images/pcomp/diorama/daytime.jpg" caption="Middday with clear skies">}}
{{<figure src="/blog/images/pcomp/diorama/sunrise.jpg" caption="Sunrise">}}
{{<figure src="/blog/images/pcomp/diorama/sunset_2.jpg" caption="Sunset">}}
{{<figure src="/blog/images/pcomp/diorama/night_2.jpg" caption="Nighttime" >}}

# The Hardware and Code

The system was built using Arduino, WS2812 addressable leds, and a lightweight node.js app that would fetch the weather via an api and provide it via serial to the Arduino.
We created a simple physical computing interface with three buttons that would:

* toggle the time of the day (sunrise, midday, sunset, nighttime)
* change weather (clear skies, cloudy, rain)
* request the current weather and time of day at Mt Fuji via serial communication

**[See the gist for The Arduino and Node.js code here.](https://gist.github.com/oveddan/4fddf79bc2a030d2bfaeab27a04242e8)**

When transitioning between conditions, the colors would fade to the new colors.  This was done using the FastLED library's `blend` function to lerp between colors.
At nighttime, the sky would simulate stars sparkling by animating them to white or dark blue.

{{<vimeo 240558802>}}
