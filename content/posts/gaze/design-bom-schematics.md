---
title: 'The Gaze Project - Physical Design, Bill of Materials and Schematics'
date: 2017-11-14T15:38:22-05:00
tags: ["The Gaze Project", "Digital Fabrication", "Physical Computing", "Design"]
categories: ["Digital Fabrication", "Physical Computing"]

draft: false 
---

After [doing play testing]({{<relref "concepts-and-play-testing.md">}}) for [The Gaze Project](/blog/tags/the-gaze-project), I concluded that:

* Trying to make this a meditative experience would be challenging.  It will be difficult enough to get the interation and gaze tracking right, so just create a experience that simply reacts to the users gaze.
* There should be, near-instantaneous, clear visuals showing where the user is gazing, instead of making a column and its surroundings turn blank gradually.
* Having the gaze represented in the y-axis when just rotating columns in the x-axis can be achieved with a spiral design similar to Daniel Rozin's [Twisted Strips](https://vimeo.com/61924239)

I came up with this design:

<img src="/blog/images/gaze/schematics/x_y_column.gif" />

Here the columns can be rotated to create a wavy effect, and represent both on the x and y axis where the user is gazing.

## Dowels & Form Factor 

Based on the above design, there would be twenty wooden dowels oriented vertically.  A servo motor connected 
to each dowel would rotate it 180 degrees.The question is - how big of a dowel should be used and what length should it be?  

Costs are a big factor.  I went through all of the **hardwood round dowels** that are at least 1" in diameter to get their cost per inch:

| Dowel                                                                                                             | Price  | Diamaeter | Height    | Price per Inch |
| -----------------------                                                                                           | ------ | -----     | --------- | ------         |
| [3/4x48](https://www.homedepot.com/p/6412U-3-4-in-x-3-4-in-x-48-in-Hardwood-Round-Dowel-10001806/203334066)       | $2.98  | 0.75      | 48        | $0.06          |
| [1x72](https://www.homedepot.com/p/Waddell-1-in-x-72-in-Hardwood-Round-Dowel-6422U/204397043)                     | $6.37  | 1         | 72        | $0.09          |
| [1x96](https://www.homedepot.com/p/Waddell-1-in-x-96-in-Hardwood-Round-Dowel-6426U/204397057)                     | $10.03 | 1         | 96        | $0.10          |
| [1x48](https://www.homedepot.com/p/6416U-1-in-x-1-in-x-48-in-Hardwood-Round-Dowel-10001808/203334068)             | $4.38  | 1         | 48        | $0.09          |
| [1-1/8x96](https://www.homedepot.com/p/Waddell-1-1-8-in-x-96-in-Hardwood-Round-Dowel-6428U/204397058)             | $10.52 | 1.125     | 96        | $0.11          |
| [1-1/8x72](https://www.homedepot.com/p/Waddell-1-1-8-in-x-72-in-Round-Hardwood-Dowel-6423U/204397054)             | $7.40  | 1.125     | 72        | $0.10          |
| [1-1/8x48](https://www.homedepot.com/p/6418U-1-1-8-in-x-1-1-8-in-x-48-in-Hardwood-Round-Dowel-10001810/203334070) | $4.93  | 1.125     | 48        | $0.10          |
| [1-3/8x36](https://www.homedepot.com/p/Waddell-1-3-8-in-x-36-in-Round-Hardwood-Dowel-6350U/203706845)             | $6.17  | 1.125     | 36        | $0.17          |
| [1-1/4x48](https://www.homedepot.com/p/6420U-1-1-4-in-x-1-1-4-in-x-48-in-Hardwood-Round-Dowel-10001811/203334072) | $5.48  | 1.25      | 48        | $0.11          |
| [1-1/4x72](https://www.homedepot.com/p/Waddell-1-1-4-in-x-72-in-Hardwood-Round-Dowel-6424U/204397055)             | $9.49  | 1.25      | 72        | $0.13          |
| [1-1/4x96](https://www.homedepot.com/p/Waddell-1-1-4-in-x-96-in-Hardwood-Round-Dowel-6430U/204397059)             | $13.34 | 1.25      | 96        | $0.14          |
| [1-3/8x48](https://www.homedepot.com/p/Waddell-1-3-8-in-x-48-in-Round-Hardwood-Dowel-6450U/203706859)             | $8.49  | 1.375     | 48        | $0.18          |
| [1-1/2x36](https://www.homedepot.com/p/Waddell-1-1-2-in-x-36-in-Round-Hardwood-Dowel-6352U/203706846)             | $7.28  | 1.5       | 36        | $0.20          |
| [1-1/2x36](https://www.homedepot.com/p/Waddell-1-1-2-in-x-36-in-Round-Hardwood-Dowel-6352U/203706846)             | $7.28  | 1.5       | 36        | $0.20          |
| [1-1/2x48](https://www.homedepot.com/p/Waddell-1-1-2-in-x-48-in-Round-Hardwood-6452U/203706860)                   | $9.08  | 1.5       | 45        | $0.20          |
| [2x48](https://www.homedepot.com/p/6456U-2-in-x-2-in-x-48-in-Hardwood-Round-Dowel-10001813/203334076)             | $9.88  | 2         | 48        | $0.21          |

I would want the design to be an even square.  The best tradeoff of size vs cost would be to use the **1-1/4"x96** dowels.  These could be broken into 3, to each yield
32" height.  At 20 dowels, to get 32" width (even with the height) there would be 7" of free space.  Taking 19 gaps between tubes and a gap at each end this gives 
7/21 or a **1/3" gap** between tubes.  **A camera would be embeded into the top of the frame.** I rendered this in Vectorworks with the design as a texture:

<img src="/blog/images/gaze/schematics/3d-rendering-face-on.png" />

<script src="https://embed.github.com/view/3d/oveddan/blog/master/static/models/tubes_with_frame.stl"></script>

## Schematics

Here is a wiring schematic.  It's format is based largely on [examples from Daniel Rozin](https://docs.google.com/document/d/11QbVGa3TRsxxnRebFqY91nC2fCozVcoa7H2XK_ffzJc/edit).

{{<figure src="/blog/images/gaze/schematics/wiring_schematic.jpg" caption="click to enlarge" link="/blog/images/gaze/schematics/wiring_schematic.jpg">}}

In the current setup it would use a desktop with linux and a decent
gpu to read from the camera and [predict the gaze with a neural network.]({{<relref "predicting-gaze-with-the-model.md">}})  This camera would communicate
over serial with an Arduino which would in turn send serial instructions to the servo controller.

Ideally this would work with an NVidia Jetson TX2 which would replace the the desktop, and be seamlesslly embedded into the installation.
In this case, the Jetson could be connected directly to the servo controller via serial and not need an Arduino.

## Bill of Materials

7 of those dowels are needed, broken into 3, to get 20 columns of 32".  With 20 servos, 
20 ball bearings to support the weight at the other end. Here is a preliminary bill of materials:

| Item                                                                                            | Quantity | Price  | Total   |
| ---                                                                                             | ---      | ---    | ---     |
| [1.25x96" Dowels](https://thd.co/2AENNIs)                                                       | 7        | $13.34 | $93.38  |
| [Standard Servo](https://www.adafruit.com/product/155)                                          | 20       | $12.00 | $240.00 |
| [Servo City 24-channel servo controller](https://www.servocity.com/mini-maestro-24-channel-usb) | 1        | $49.99 | $49.99  |
| [Ball Bearings](https://www.mcmaster.com/#60355k851/=1a94lfz)                                   | 20       | $3.12  | $62.40  |
| Plywood for frame (TBD)                                                                         |          |        |         |
| White Paint (TBD)                                                                               |          |        |         |
| Black Paint (TBD)                                                                               |          |        |         |
| Stenciling Material for Spiral (TBD)                                                            |          |        |         |
| Total                                                                                           |          |        | $445.75 |

I'd like to bring the cost down if possible.

## Prototyping Accuracy

Before buying all the materials for the real size installation, it's important to know how well the [neural network model]({{<relref "predicting-gaze-with-the-model.md">}})
for predicting gaze performs on a larger physical scale.  

I will build a python script that connects to a webcam, detects gaze in real time using the model, and renders a dot exactly where a user is gazing on a bigger screen.

If the accuracy suffers significantly at bigger distance, the camera may have to be placed in the middle to minimize
the distance between it and any point in the insallation.  This is a less ideal situation as it would deter from the purity
of the design and columns.
