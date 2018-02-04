---
title: "Controlling a Kinetic Sculpture With Real Time Gaze Tracking"
date: 2018-02-03T17:05:00-05:00
showPagesInSection: true
draft: true
---

This post will go into the implementation details of [Presence,]({{< sectionlink >>}}),
a kinetic sculpture that is controlled by a users gaze.  It uses a webcam and a pre-trained neural network
from the research paper [Eye Tracking for Everyone](http://gazecapture.csail.mit.edu/) to predict the location a user is looking, and moves a pattern in that direction.

## System Overview

!!Image showing the system components

yo:

1. A webcam captures a video feed and sends it over usb to a pc running linux
2. Opencv is used to extract faces and eyes from the frames of the video feed
3. A pre-trained caffe model is fed these extracted features as inputs and outputs the predicted gaze
4. The predicted gaze is sent over socket to a processing sketch
5. The processing sketch calculates servo positions that will reveal a pattern based on the gaze position.
6. The processing sketch sends the servo positions over serial to a Mini-Maeastro 24-channel servo controller.
7. The servo controller rotates 21 Futaba (TODO: get model) servos into the specified positions.

The flow of data starts with a webcam attached to the installation.  This is connected
over usb to an Alienware running Ubuntu with an NVidia GTX970 graphics card, containing 4gb of gpu memory.

I originally wanted to run this on my macbook pro which has an NVidia graphics card with 1gb of memory, 
but ran into issues where loading the neural network model in caffe would result in a Cuda out of memory exception, even though the size
of the model was only around 500 mb.  This is because the Caffe program itself and many of the operations take up approximately 3 gb of
memory on the graphics card.  If I had more time, I'd port the model into another framework that takes less memory and can adequately run on my macbook's GPU.  In [the research paper,](http://gazecapture.csail.mit.edu/) they were able to run it on an iphone in near real time.

## Extracting Inputs for the Neural Network 

A python program on the pc uses opencv to pull a video feed from the webcam.  Opencv is then used
to detect the positions of the faces and the eyes.  If faces and eyes are detected, then pictures of the face, the left and the right eye are extracted along with the position of the face within a 25x25 grid.  The code for detection and feature extraction can be seen in [features.py](https://github.com/oveddan/presence/blob/master/features.py).

todo: show face, left, and right eye, and 25x25 grid

## Predicting the Gaze

These features are then fed as inputs to the pre-trained caffe model.  The model is configured to have a transformer that subtracts the mean pixel from the face, left, and right eye images.  The 25x25 grid is transformed into a single-dimensional array.  The model
predicts the location of the gaze in x and y centimeters offset relative to the camera in the real-world space.

Todo: Show prediction space image from the research paper

ToDo: show dot prediction

## Rotating the Columns to Reflect the Gaze Position

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

This made it really easy to switch to power the real motors.  The rotations of these cylinders mapped directly to target rotation values of the real servo motors and poles attaches to them,
so when it came time to switch it was a simple direct conversion between the values.

## Obtaining real-time performance with multithreading

Tested pieces together with user.  Biggest feedback was that delay was noticeable
and it wasnt responsive.

* Problems existing where delay in processing each image frame
would cause camera feed to back up and buffer.  
This would result in extra delay
* Instead we only want to get current frame, and discard previous.
* So we use multithreading - create a thread that just captures images
from video feed and sets the current image
Tested this out with users.  

They noticed improvement, but there was still a delay

Moved face and eye detection to its own thread.

Tracked time from when frame was taken to when the result sent to user

## Smoothing the gaze detection

## Making work in an event environment - using person in middle 

