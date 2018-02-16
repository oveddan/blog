---
title: 'Presence - Proposal'
date: 2017-10-31T22:55:41-04:00
tags: ["Presence", "Digital Fabrication", "Physical Computing", "Computer Vision"]
classes: ["Design for Digital Fabrication", "Intro to Physical Computing"]
featuredImage: "/blog/images/gaze/proposal/proposal_featured.jpg"
description:  "The proposal for an art installation that is activated the longer and the more people gaze directly at it.  It would encourage being present and engaged, and connect the fellow participants with each other over moments of mindfulness.  This will be my final project for Intro to Physical Computing and Design for Digital Fabrication."
showPagesInSection: true
draft: false
---

This is the proposal for Presence, an art piece that is activated the longer and the more people gaze directly at it.  It would encourage
being present and engaged, and connect the fellow participants with each other over moments of mindfulness.  This will be
my final project for [Intro to Physical Computing](/blog/tags/physical-computing) and [Design for Digital Fabrication](digital-fabrication).

I will use small cameras and computer vision to detect the quantify of people present and how many of them are gazing at a specific point,
and reveal parts of the piece using motors and other physical controls.

For me this addresses a personal issue I've had since I was a kid - my mother has told me that when we went to theme parks,
I already wanted to get on the next ride before the current one was finished. This urge to jump from one thing to the other has stayed with me since then, and hasn't been helped
the least bit by push notifications and rapid-fire content consumption.  I also notice quite often at museums my mind is elsewhere, and I look at everything for a few seconds before moving on.

It would be interesting to challenge the user to remain in front of a piece and be present with it.

## Eye Tracking
Much of the implementation will be based on incredible research from 2016 called [Eye Tracking for Everyone](http://gazecapture.csail.mit.edu/) by Kyle Krafk, A. Khosla, et. al at MIT and Univerity of Georgia,
where they were able to train a convolutional neural network to detect where a user is gazing on an IPhone or tablet using just the stock camera with 1.71 cm accuracy.  They were able to compress the
network to run in real-time (10-15fps) on a mobile device.

They built an impressive and massive database to train and test this network - 1,450 people and almost 2.5M frames by using Mechanical Turk to source participants and an app that recorded
where a user was looking when a red dot was moved on the screen.

{{<figure src="/blog/images/gaze/proposal/testdata.png" caption="Some of the images they used to train the network">}}

{{<figure src="/blog/images/gaze/proposal/convnet.png" caption="The convolution neural network architecture.  See the research paper for details." link="http://gazecapture.csail.mit.edu/cvpr2016_gazecapture.pdf">}}

They've provided the pre-trained models - I will attempt to run these models in real time to determine if a user is looking at a specific point.

This model takes as inputs: a picture of the face, a picture of each eye, and the position of the face within the picture.  The network learns to triangulate
this data and determine where the eyes are gazing.

As the first step of our implementation, Ie need to extract the face and eye positions.  The paper says they did it using Apple's [Core Image face detection](https://developer.apple.com/library/content/documentation/GraphicsImaging/Conceptual/CoreImaging/ci_detect_faces/ci_detect_faces.html).

I don't want to necessarily be bound to apple to build this, but could resort to using a mac mini if we see other methods are not working well.  For now, I prototyped
extracting face and eye positions using processing and opencv.  It works decently well - there are some bugs in how I place the eye boxes.

{{<figure src="/blog/images/gaze/proposal/face_detect.gif" caption="First stab at face and eye detection with OpenCV">}}
