+++
title = "Designing for Digital Fabrication - Drawing a Real World Object in Vectorworks"
description = "Drawing the Lumenier Digital RGB Arm LED Board in Vectorworks"
date = 2017-09-20
categories = [
  "Designing for Digital Fabrication"
]
tags = [
  "Digital Fabrication",
  "Design"
]
menu = "main"
featuredImage= "/blog/images/digitalfab/vectorworks_led_featured.png"
+++

Our first homework assignment for Daniel Rozin's *Designing for Digital Fabrication* class was to draw three 2d perspectives of a real world object in Vectorworks.
I took this as an opportunity to get the exact dimensions of an object I've been eager to to incorporate into a project.

At the Armory show in 2015, I discovered and was amazed by the [low-resolution work](http://www.jimcampbell.tv/portfolio/low_resolution_works/) of Jim Campbell.

![Scattered 25X (Marathon)](/blog/images/digitalfab/jimcampbell25x.jpg)
<br/>*Jim Campbell - [Scattered 25X (Marathon)](http://www.jimcampbell.tv/portfolio/low_resolution_works/scattered_25x/)*

Ever since then, I've been particularly interested in leveraging light to detach ourselves from the move towards ultra-high definition, letting our imaginations fill in the gaps in resolution.  This could be accomplished by arranging individual LED pixels in a massive array. However, this would require a lot of soldering which would be incredibly time consuming, or custom PCB fabrication which I do not have the knowledge or tools to do.

After scouring the internet, I came across the [Lumenier Digital RGB Arm LED Board,](https://www.getfpv.com/lumenier-digital-rgb-arm-led-board.html) which are intended to be used on Drones but could be perfect for this task:

![Luminier LED Board](/blog/images/digitalfab/LuminierViews-1024x469.png)
<br/>*Images source: https://www.getfpv.com/lumenier-digital-rgb-arm-led-board.html*

With modern, digitally-driven fabrication tools, these 4-pixel long WS2812 LED boards could be arranged and spaced precisely in a way to accomplish pixelation and blurring of an image, with a quarter of the amount of soldering needed if using individual LEDs.  To model these boards in such a design, the first step would be to get the exact offset of the LEDs relative to the board, and the dimensions of the board itself.

## Drawing the LED Board in Vectorworks

The easiest way to draw this in Vectorworks would be to get an image of the board to scale, and draw vector graphics on top of that.  To do this, I downloaded the image of the LED board from getfpv.com, rotated it to be horizontally straight, and cropped it around the edges of the board.   I had already ordered a few of these boards, so I measured one of them with a caliper, and got dimensions 1.288" x 0.369".

In Vectorworks, I drew these dimensions, imported the image, then scaled the image to match the dimensions:

![LEDBarScaled](/blog/images/digitalfab/scaledfordrawing.png)
<br/>
*Red lines are the exact physical dimensions of the board, and the image was scaled to match these dimensions.*

I was then able to draw all of the shapes to match the image behind it and be to the correct scale.

For the reusable pieces, such as the LEDs, I created Symbols that would allow an edit to one of them to apply to all:

![Symbols for LEDS](/blog/images/digitalfab/LEDSymbols.png)

I used the Eyedropper tool to make the colors match as closely as possible the original image.

The final result is both accurate and tough to distinguish from the original:

![LED Bar in Vectorworks](/blog/images/digitalfab/LumenierLEDBarScaled.png)
