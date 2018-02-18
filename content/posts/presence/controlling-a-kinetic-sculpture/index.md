---
title: "Controlling a Kinetic Sculpture With Real Time Gaze Tracking"
date: 2018-02-03T17:05:00-05:00
showPagesInSection: true
tags: ["Computer Vision", "Fabrication", "CnC"]
classes: ["Designing for Digital Fabrication", "Intro to Physical Computing"]
draft: true
---

This post will go into the implementation details and challenges for [Presence,]({{< sectionlink >}})
a kinetic sculpture that is controlled by a users gaze.  It uses a webcam and a pre-trained neural network
from the research paper [Eye Tracking for Everyone](http://gazecapture.csail.mit.edu/) to predict the location a user is looking, and moves a pattern in that direction.

## System Overview

caption:  The installation is composed of a webcam, servo motors connected to tubes, and a pc that performs the gaze prediction and motor position calculations.

It works as follows:

1. A webcam captures a video feed and sends it over usb to a computer
2. On the computer, opencv is used to extract faces and eyes from the frames of the video feed
3. A pre-trained caffe model is fed these extracted features as inputs and outputs the predicted gaze
4. The predicted gaze is sent over socket to a Processing sketch
5. The Processing sketch calculates servo positions that will reveal a pattern based on the gaze position.
6. The Processing sketch sends the servo positions over serial to a Mini-Maeastro 24-channel servo controller.
7. The servo controller rotates 21 Futaba (TODO: get model) servos into the specified positions.

The flow of data starts with a webcam attached to the installation.  This is connected
over usb to an Alienware running Ubuntu with an NVidia GTX970 graphics card, containing 4gb of gpu memory.

Show picture of pc with linux

I originally wanted to run this on my macbook pro which has an NVidia graphics card with 1gb of memory, 
but ran into issues where loading the neural network model in caffe would result in a Cuda out of memory exception, even though the size
of the model was only around 500 mb.  This is because the Caffe program itself and many of the operations take up approximately 3 gb of
memory on the graphics card.  If I had more time, I'd port the model into another framework that takes less memory and can adequately run on my macbook's GPU.  In [the research paper,](http://gazecapture.csail.mit.edu/) they were able to run it on an iphone in near real time.

## Extracting Inputs for the Neural Network 

A python program on the pc uses opencv to pull a video feed from the webcam.  Opencv is then used
to detect the positions of the faces and the eyes.  If faces and eyes are detected, then pictures of the face, the left and the right eye are extracted along with the position of the face within a 25x25 grid.  The code for detection and feature extraction can be seen in [features.py](https://github.com/oveddan/presence/blob/master/features.py).

todo: show face, left, and right eye, and 25x25 grid

To make sure that the same person is associated with the same gaze along each predition, the features are grouped
by each face, and sorted by the center x position of the face. This would give the faces consistent ordering on each frame.

## Predicting the Gaze

These features are then fed as inputs to the pre-trained caffe model.  The model is configured to have a transformer that subtracts the mean pixel from the face, left, and right eye images.  The 25x25 grid is transformed into a single-dimensional array.  The model
predicts the location of the gaze in x and y centimeters offset relative to the camera in the real-world space.

Todo: Show prediction space image from the research paper

ToDo: show dot prediction

## Scaling up the prediction space for a large installation

When I started work on this project, the biggest question for me was if this model would be able to predict the gaze across a larger format such as a kinetic installation.
The prediction space for the model was in cm relative to the camera, but the predictions were done on devices as large as the IPad, at (x cm - TODO: fill out!) 

This presented multiple challenges.  The installation was to be about 4 x 3 feet, much bigger than the prediction
space.  How could this then be translated to the breadth of a larger installation?

When I first got the model working I tested it on a computer monitor; the predicted gaze would work reasonably well when moving eyes left to right near the camera,
but would rarely reach the left and right edges of the screen and never reach the bottom corners.
This reflected the heat map of the prediction space, and I started to worry that the gaze prediction would perform even more poorly on a larger format than a computer monitor.
I started to doubt if gaze prediction would work at all for the kinetic installation, felt dejected, and wanted to abandon the project.

However, when testing on a large tv screen, the gaze estimations performed better, and would be able to reach the edges of the screen. I concluded that
this was because when looking at the edges of a wider area, the pupil positions are more pronounced, which makes the model predict a gaze at the edges of the space.

In processing, I scaled the gaze predictions from the prediction space to the full width and height in pixels of the screen:


```java
// 1080p resolution
// w and h in pixels of the screen.
int w = 1920;
int h = 1200;

float minimumXPredictionCm  = -10;
float maximumXPredictionCm  = 10;
int scaleGazeX(float predictedGazeXInCm) {
  return round(map(predictedGazeXInCm, minimumXPredictionCm, maximumXPredictionCm, 0, w));
}

/* Since the camera sits on top of the screen, is center is approximately
 * 2.5 cm above the screen, thus making the top of the prediction space -2.5 cm */
float minimumYPredictionCm = -2.5;
float maximumYPredictionCm = -20;
int scaleGazeY(float predictedGazeYInCm) {
  return round(map(predictedGazeYInCm, minimumYPredictionCm, maximumYPredictionCm, 0, h));
}
```

The result was that the predictions on a 60" tv screen reflected reasonably well where the users were gazing:

TODO: show video of dan and barak looking

## Rotating the Columns to Reflect the Gaze Position

Encouraged by this, I decided to proceed with the project.  The next step was to have the location of the gaze be reflected
in the kinetic installation.

There are 21 servos in the installation that are connected to tubes with spirals. The rotation of the servo will determine
which part of the spiral is visible.  With all 21 servos next to each other, certain servos can be rotated to reveal the spiral
to reflect a focus, which can mirror the gaze position.  

!Show spiral focus!

To do this, a processing sketch connects via socket to the python application [described above](TODO! link to above) that is predicting the gazes in real time.
It gets the gazes in x and y in real world space, and then calculates rotations of the servo motors to reflect a sin wave focused at one of the gaze positions.
Since it gets multiple gazes from the python application, it selects the gaze of the face with a center x closest to the center of the camera.

!Show spirals in processing!

These rotations are converted into a serial message that specifies in quarter microsends a target position for each servo controller; it is sent over
usb serial to the Mini-Maestro 24-channel servo controller.

!Show servo controller!

The servo controller sends pwm values to the servos, rotating them into the target positions.

## Simulating Column Positions by rotating 3d spheres

To prototype different designs for the poles and animation styles before the kinetic structure was built, in Processing I simulated what the real columns would look like when rotated
in specific positions.  This was done by rendering 3d cylinders, and applying textures of images representing what the designs were.  The cylinders were then 
rotated in 3d space to reflect the target rotations.

!Show code for 3d sphere and rotations

This made it really easy to switch back and forth between rendering a simulation and controlling the real motors.
The rotations of these cylinders mapped directly to target rotation values of the real servo motors and poles attaches to them,
so when it came time to switch it was a simple direct mapping between the values.

## Obtaining real-time performance with multithreading

Before building the kinetic installation, I prototyped the installation in Processing to test out the interaction with users.
The biggest feedback I got was that delay was noticeable, and the delay made it not as clear that the eyes were controlling
the visuals. In some cases, it would take up to **3 seconds** from the time a frame was captured to when the gaze prediction was
shown.

TODO: calculate the actual numbers

Upon investigation, I discovered that, feeding the inputs through the neural network took approximately 150ms, and the opencv face and eye detection took about 100ms. The main cause of delay was that when processing each frame of image for gaze prediction,
the **video frames would be queuing up in a buffer** until the next frame was read.  This was because of either the way OpenCV worked or the camera to USB protocol is.

| Step                           | Average Step Time |
| -------------                  | :-------------:   |
| Video capture delay            | 1-3 s             |
| OpenCV Face and Eye Detection  | 50-100 ms         |
| Feed-Forward of Neural Network | 100-120 ms        |
| **Total delay**                | **2-3.5 s**       |

I made it a priority to make the gaze prediction happen as quickly as possible.
After searching around the web I couldn't find an easy way to clear out the buffer,
but came across a wonderful guide on [Increasing webcam FPS with Python and OpenCV](https://www.pyimagesearch.com/2015/12/21/increasing-webcam-fps-with-python-and-opencv/)
using multithreading, and implemented somethign similar:

This removed 1-3 seconds of delay. The next bottleneck to tackle was the OpenCV face and eye detection.  One option would have been to try to use a neural network
instead of the built in Haar-Cascade classifiers, but I didnt have enough time to explore this.  A simpler solution was to move this detection step to its own thread.
The gaze prediction would use the latest feature extraction that was performed, without having to wait for it.
This would allow video capture, feature extraction, and gaze prediction to happen concurrently.

The result was a much more responsive and real-time feeling, and when testing it with users, they now felt the connection with the movement of their eyes
to the motion of the animation. I added a way to track the time from when a frame was taken to when the prediction was made.  On average, this was now 200ms.

In the paper they got down to around 130 ms on an IPhone.  This was because they were able to take advantage of the IPhones fast-performing face detection
framework which [leverages specialed hardware and take around 1ms](https://machinelearning.apple.com/2017/11/16/face-detection.html), and used
a compressed version of the model which they never published in the source code repository.

That being said, the performance of 200 ms my solution was sufficient; many who tested it commented on how they were pleasently surprised at its responsivenes and how well it worked.

## Smoothing the gaze detection

Since the neural network is making a prediction of the gaze, the gaze position would very slightly between each, and as a result
this would cause the installation to jitter around the area where the viewer was gazing.  

To address this, if the difference in distance between sequential gaze detections is within a threshold of 5 cm, the previous
gaze location is used.  Otherwise, the new gaze prediction is lerped from the previous one, and the lerp is weighted
based on the time since the previous gaze detection:

TODO: show cleaned up smooth outputs code

This resulted in a smoother and more calming experience for the user. 

## Making it work in an event environment - using the person in middle 

In a real event, such as our winter show, there are many people walking by that can interact with the installation.  
To prevent it from going crazy and switching to detect different people who are standing in front of it, it is configured
to only interact with the person standing in the middle; this is determined by using the face with a center x closest to the
camera center.

## Deploying it at the ITP Winter Show

For the show, I was assigned a wall in a main corridor where lots of people would walk through. I was grateful to be given 
such a busy area with high visibility but there were two main challenges:

  * The lighting was poor with a strong light shining down into the middle the corridor, which would backlight viewers making it difficult for the camera to see their faces
  * The wall was a drywall, which means it would be difficult to mount the heavy installation to the wall.

To mount it to the wall, I bought a z-bracket from home depot, and with the help of John from the shop, we
used drywall anchors to attach the bracket to the wall.  This let us mount the installation right up flush against the wall.

Todo: show z bracket, show it flush with the wall

For the lighting, I turned off the main light in the hallway and mounted two lights to the ceiling; one that would point away
from the installation and illuminate the viewers, making them easily visible from the camera, and one to illuminate the installation.
This ended up working well, as the camera could clearly see the viewers and the installation stood out to people walking by.  
The main issue in the end was that the lighting made it difficult to photograph the installation well.  The contract
was always off and the photos came out poorly in the show.

I hid the computer under a podium and covered the podium with black fabric, laying some business cards on top of it.

## Obersvations from Testing it at the ITP Winter Show

When I stood back and observed users, and didn't tell them how to interact, the most common behavior was that they
they would come up to it and wave their hands at the camera to try to get it to do something.  I would have to explain
to viewers to use their eyes to control it.  When hearing that instruction, many people's first instinct was to move their
face around.  This actually hurt the performance of the gaze detection because it would prevent the full face from being visible
to the camera, and OpenCV's face detection does not work well in that case. When they stood there and just moved their eyes
around they got it and were able to successfully interact and control the movement of the columns.  

When others standing around were watching the main person interact with it, they generally understood how it worked and
were able to come up and control it with their eyes without any instruction.

It generally did not work when people wore glasses; this was because OpenCV Haar-Cascade classifiers in general fail to
detect eyes when glasses are on the face.  I had to tell people to remove their glasses, and everyone was willing to do so.
Still I would have rather it worked without people having to do that, because it lowers the experience for people that cannot
see well without their glasses.

Children they would always move their faces around and did not understand to not move their faces but to just move their eyes.
It generally did not work with them, also because the camera would not see their face well when their faces were far away from the camera.
I would have liked for it to work with them as well.

Overall, the feedback was overwhelmingly positive.  Viewers were not accustomed to interacting with something in this way, so
they were delighted to see something new like this.  Many asked if I used a special type of camera and were blown away
when I explained how it just use a regular camera and machine learning.  A lot of people loved the aesthetic and how
clean the fabrication was.  Quite a few people said it was the favorite thing they saw at the show.

## Conclusions and Future Work

Overall I'm encouraged and feeling great about the results of the project.  It was incredibly challenging from both a technical feasibility
and fabrication standpoint, and I wanted to quit many times, such as when gaze detection didnt work well on the corners of the screen, or my system crashed I spent a few days
trying to reinstall linux and all the dependencies.  A couple faculty here had doubts if the gaze detection would really work and encouraged
me to go with a lower resolution type of sensor.  I'm glad to have persisted and overcome all the diffulties to make it work, with with 
new kinds of interaction and technology that people hadn't seen before.  

If I work to continue working on this, I would:

1. Make it more portable by letting it run on something like a Mac mini or simple laptop.  This would require porting the model from caffe into another framework that can be run easily on lower end computers and on any environment. 
2. Use a faster performing face and eye detector than the Haar-Cascade classifiers from OpenCV, and make it support faces with glasses.

While the gaze tracking here was purely for artistic purposes, I'd love to try to use it in real, more utilitily like applications.  Since the show
a few people have asked me how they can use this technology.  Right now to use it they need a linux pc with a semi-powerful GPU and a bunch of
programs installed such as caffe and compiled OpenCV from source.  If I have time I will port it into deeplearn.js, so it can be used in the browser
and developed with just an npm install.

