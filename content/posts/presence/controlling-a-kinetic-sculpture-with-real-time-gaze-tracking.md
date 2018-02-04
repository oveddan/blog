---
title: "Controlling a Kinetic Sculpture With Real Time Gaze Tracking"
date: 2018-02-03T17:05:00-05:00
showPagesInSection: true
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
4. The predicted gaze is sent over socket to a processing sketch
5. The processing sketch calculates servo positions that will reveal a pattern based on the gaze position.
6. The processing sketch sends the servo positions over serial to a Mini-Maeastro 24-channel servo controller.
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

The biggest question for me was if this would be able to predict the gaze across a larger format such as a kinetic installation.
The prediction space for the model was in cm relative to the camera, but the predictions were done on devices as large as the IPad, at (x cm - TODO: fill out!) 

This presented multiple challenges.  The installation was to be about 4 x 3 feet, much bigger than the prediction
space.  How could this then be translated?

When testing on a computer monitor, the predicted gaze would work reasonably well when moving eyes left to right near the camera,
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

This made it really easy to switch to control the real motors.  The rotations of these cylinders mapped directly to target rotation values of the real servo motors and poles attaches to them,
so when it came time to switch it was a simple direct conversion between the values.

## Obtaining real-time performance with multithreading

Before building the kinetic installation, I prototyped the installation in processing to test out the interaction with users.
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

That being siad, the performance of 200 ms in my installation was sufficient; many who tested it commented on how they were pleasently surprised at its responsivenes and how well it worked.

## Smoothing the gaze detection

## Making work in an event environment - using person in middle 

