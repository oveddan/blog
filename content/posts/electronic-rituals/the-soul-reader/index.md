---
title: 'The Soul Reader'
date: 2018-05-01T22:05:18-04:00
tags: ["generative", "randomness", "computer vision", "AI", "subconscious"]
categories: [""]
classes: ["Electronic Rituals, Oracles, and Fortune Telling"]
draft: false
featuredImageResource:
    src: "images/soul_reader_featured"
description: "The Soul Reader is my final for Electronic Rituals, Oracles, and Storytelling. It is a generative system for visuals that is driven by a viewer's gaze and subconscious. It shows the viewer different colors, text, shapes, and scenes, and uses recent advances in machine learning to determine which of these elements the viewer's gaze is focused on. It uses this information to continuously generating new patterns, colors, and shapes similar to what the viewer was fixated on, and renders them away from the center of the gaze. This way, the scene is constantly changing out of the field of view."


---

The Soul Reader is my final for [Electronic Rituals, Oracles, and Storytelling](blog/classes/electronic-rituals-oracles-and-fortune-telling).  It is a generative system for visuals that is driven by a viewer's gaze and subconscious.

{{< vimeo 267715929 >}}

It is a screen based experience which uses the focus of a viewer's gaze to continuously generate imagery. It shows the viewer different colors, text, shapes, and scenes, and uses recent advances in machine learning to determine which of these elements the viewer's gaze is focused on. It uses this information to continuously generating new patterns, colors, and shapes similar to what the viewer was fixated on, and renders them away from the center of the gaze. This way, the scene is constantly changing out of the field of view.

It’s like a choose your own adventure driven by your subconscious with no ending. It is both continuous and infinite. One person who continues where the another left off will start with the imagery generated by that other person, resulting in an experience shaped by all the people that used it before.

## Background

I became interested in gaze tracking first through discovering the research paper Eye Tracking for Everyone, which allowed for eye gaze tracking with just a webcam and a neural network. I used the pre-trained model from this research paper for my installation [Presence](http://www.danioved.com/portfolio/presence/) at the last ITP Winter Show, which was a kinetic sculpture that reacted to a users gaze.

{{< vimeo 259512916 >}}

After realizing that the technology works, I got excited about the possiblities and this and it lead me on a search for how it can be used; I discovered that it has been extensively researched, and there plenty of insight into how it connects to the psyche, the mind, and commumication.  I realized that there is a connection between the gaze and the subconcious, and it would be interesting to create an experience that explores this concept.

## Relevant Research

First I came on a great research, which I really recommend checking out, paper called [Eye Tracking in Advanced Interface Design](http://www.cs.tufts.edu/~jacob/papers/barfield.pdf) by Robert J.K. Jacob:

> Because eye movements are so different from conventional computer inputs, our overall
approach in designing interaction techniques is, wherever possible, **to obtain information from
a user’s natural eye movements** while viewing the screen, **rather than requiring the user to
make specific trained eye movements** to actuate the system.    

This made me think back to my winter show project, where the user was required to control the installation with the gaze, which is not really the way humans.  A better use of gaze is to let it work naturally and respond base on that.

Additionally in that research paper it is said:

> The fovea, located near the center of the retina, is densely covered with receptors, and provides much higher acuity vision
than the surrounding areas. The **fovea covers** approximately **one degree field of view**, that is, a
one-degree angle with its vertex at the eye, extending outward into space. **Outside the fovea**,
acuity ranges from **15 to 50 percent** of that of the fovea. 

{{< image src="images/fovea" >}}

This was corroborated in the fascinating John M. Handerson's [Human Gaze Control during Real-World Perception](https://www.sciencedirect.com/science/article/pii/S1364661303002481):

> During human scene perception, **high quality visual
information** is acquired only from a **limited spatial region
surrounding the center of gaze (the fovea).** Visual quality
falls off rapidly and continuously from the center of gaze
into a low-resolution visual surround. **We move our eyes
about three times each second** via rapid eye movements
(saccades) to reorient the fovea through the scene. **Pattern
information** is only acquired during periods of **relative
gaze stability** (fixations) owing to ‘saccadic suppression’
during the saccades themselves. Gaze control is the
process of directing fixation through a scene in real time in
the service of ongoing perceptual, cognitive and behavioral
activity

{{< image src="images/time_of_focus" caption="From John M. Handerson's research paper, showing scan patterns during visual search. The cirlces represent fixations (scaled to the size of their durations) in ms." >}}

I wanted to conduct similar types of experiments with the gaze tracking technology, where viewers would be shown imagery and patterns, and the points and duration of fixation would be analyzed.  This could help guide the timing during the experience and the types of visuals shown.  I did not have a chance to do this howerver as I did not get the gaze tracking working in time. 

Additionally, in that research paper he concludes:

> Human eye movement control is ‘smart’ in the sense that it **draws** not only on currently available visual input, but also
on several cognitive systems, including **short-term memory** for previously attended information in the current scene, **stored long-term visual, spatial and semantic information** about other similar scenes, and the **goals and plans of the viewer.** In fact, fixation sites are less strongly tied to visual saliency when meaningful scenes are viewed during active tasks. The **modulation** or replacement **of visual saliency** by knowledge driven control can increase over time within a sceneviewing episode as more knowledge is acquired about the identities and meanings of previously fixated objects and their relationships to each other and to the scene.

This reminded me of the readings we did for class [The Language of Mediums and Psychics: The Social Organization of Everyday Miracles](https://ebookcentral.proquest.com/lib/nyulibrary-ebooks/detail.action?docID=4817155around) and [How Ouija Boards Work. (Hint: It’s Not Ghosts.)](https://www.vox.com/2016/10/29/13301590/how-ouija-boards-work-debunked-ideomotor-effect) which both concuded that mediums, psychics and Oija boards in a way are a way of bringing out the subconcious.  Similarly, our eye gaze movements when scanning a scene are affected by our memories, emotions, and experience.  I wanted to build something that explored this connection.

## How The Experience Works

The application is built in C++ OpenFrameworks. This was chosen because I wanted to be able to convey the stream of concious aspect of the gaze by blending different rendered elements together; OpenFrameworks makes this easy by giving access to computer graphics shaders and providing a framework to render them into each other via buffers.

**The OpenFrameworks code can be seen [here](https://github.com/oveddan/the-soul-reader/tree/master/src), and the shader that does the focus blur [here](https://github.com/oveddan/the-soul-reader/blob/master/bin/data/shaders/focusBlur.frag).**

The experience starts with a few random bits of text and colors shown to the viewer.  When the viewer focuses on something, a ripple effect begins to appear around the focal point.  After a period of time, around 600 ms, which is the time researches have concluded it takes to scan a picture, the application determines that the this particular area of focus has drawn the attention of the user.  It then generates similar shapes or text away from where the center of focus is.

### The Color System

For the color of new elements, the Hue Saturation and Brightness system is used because it provides a computational method for picking similar or complimentary colors.  

{{< image src="images/hsb_wheel" caption="THe HSB system is used to find similar colors.  Both the hue and the brightness values are modified by a small, random amount to get a similar color. Modifying the hue goes around the wheel, while modifying the saturation goes outside from inside of the wheel." >}}

The first sets of colors that are chosen are complimentary to each other, which allows for the viewer to follow the different paths that each color would take them.   With the HSB system, these compliments are easily calculatable by evenly moving around the color wheel in a proportion to the number of complimentary colors:

```c++
int randomHue = std::round(ofRandom(0, 255));
int randomSaturation =std::round(ofRandom(100, 255));
ofColor baseColor = ofColor::fromHsb(randomHue, randomSaturation, 255);

vector<ColorElement> elements;
int numberOfColors = 2;
// there are 255 possible values for hue.
int changePerColor = 255 / numberOfColors;

for(int i = 0; i < numberOfColors; i++) {
    int newHue = randomHue + changePerColor * i;
    // move back to the start of the wheel
    if (newHue > 255) { newHue = newHue - 255; }
    ofColor color = ofColor::fromHsb(newHue, randomSaturation, 255);
    
    // get random geometry for element
    int randomWidth = ofRandom(0, ofGetWidth() / 4);
    int randomHeight = ofRandom(0, ofGetHeight() / 4);
    int randomX = ofRandom(0, ofGetWidth());
    int randomY =  ofRandom(0, ofGetHeight());
    
    ColorElement element(color, randomX, randomY, randomWidth, randomHeight);
    
    elements.push_back(element);
}
```

When a new element is created, its colors are generated by changing the hue and saturation values of the focused on element by a random value:

```c++
ofColor getSimilarColor(ofColor color) {
    float newSaturation = round(ofClamp(ofRandom(-20, 20) + color.getSaturation(), 0., 255.));
    float newHue = round(ofClamp(ofRandom(-20, 20) + color.getHue(), 0., 255.));
    float newBrightness = color.getBrightness();
    
    return ofColor::fromHsb(newHue, newSaturation, newBrightness);
}
```

This produces similar colors:

{{< image src="images/similar_colors" caption="Words in the same region of the Wordnet synonym graph.">}}

### The Text

When a user focuses on a piece of text, another word is rendered away from area of focus.  The system almost always chooses the word to be similar to the currently focused on word.  To find similar words, Princeton's Wordnet in json form is used to look up words that are in the same family along a graph.  This allows different paths of words to be followed.  Occasionally, a random word is chosen instead of one within the family, to avoid being infinitely stuck in a loop with words families that don't branch out.

```c++
float probabilityDifferentWord = 0.1;

bool shouldGetSomethingDifferent() {
    float randomValue = ofRandom(0., 1.);
    
    return randomValue <= probabilityDifferentWord;
}

void WordElement::loadWord() {
    font.load("fonts/NewsCycle-Bold.ttf", 40);
    
    if (synsetKey == "" || shouldGetSomethingDifferent()) {
        loadRandomWord();
    } else {
        loadSimilarWord();
    }
}

```

View the code in its entirery [here.](https://github.com/oveddan/the-soul-reader/blob/e3955f71b126d5860bb586147bd4cf85be792963/src/element.cpp#L154)


The OpenFrameworks app requests a similar word from a python app that looks the words in the Wordnet json file.  This word part of the system is written in python because of its ease with working with json data, which is a pain in c++.  It is hosted in a flask server, and the OpenFrameworks app requests the words via get requests.  

```python
import json
import random

# load wordnet json
words_data=json.load(open('./wordnet.json'))

# load the synonyms.
synset = words_data['synset']
synset_keys = list(synset.keys())
num_words = len(synset_keys)

def random_word_key():
  random_key_index = random.randint(0, num_words)
  return synset_keys[random_key_index]

def get_word(key):
  return synset[key]

def get_random_word_key(key):
  words_for_key = get_word(key)['word']
  return random.choice(words_for_key)

# convert into a key:word which is parceable in c++
def to_key_word(key, word):
  return key + ':'+word.replace('_', ' ')

def random_word():
  key = random_word_key()
  word = get_random_word_key(key)
  return to_key_word(key, word)

def similar_word(word_key):
  word = synset[word_key]

  pointers = word['pointer']
  random_pointer = random.choice(pointers)
  key = random_pointer['synset']
  word = get_random_word_key(key)

  return to_key_word(key, word)
 ```

 This produces words that are for the most part similar:

{{< fullsizeimage src="images/similar_words" >}}

## How does this fit into the class?

This experience ties into a few of the themes in the class.

* [Prophecy and Prediction](http://eroft.decontextualize.com/schedule/#session-05-prophecy-and-prediction) - this application  would qualify as an "-omancy" that we learned about in class, as it generates "a form of divination...based on observation and interpreting [of] natrual events".  In this it is a gazeomancy, and the natural event is the movement of the eye.   
* [Mediums and Messages](http://eroft.decontextualize.com/schedule/#session-07-mediums-and-messages) - similar to how mediums bring out an expression of the subconsious of a sitter through vague questions and answers, the Soul Reader's visuals are generated based on movements of the eye in response to vague colors, texts and imagery.
* [The aesthetics of randomness](http://eroft.decontextualize.com/schedule/#session-09-the-aesthetics-of-randomness) - This experience is built very much on randomness.  The elements that are shown are chosen using built-in random functions in c++ and python.   The randomness is controlled by the areas of focus, creating a normally distributed result.

## The Gaze Tracking

To do gaze estimation, the pre-trained convolutional network model [Eye Tracking for Everyone](http://gazecapture.csail.mit.edu/cvpr2016_gazecapture.pdf) is used. This model can estimate gaze position using just an image.  It is device and screen invariant as it's output is in centimeters.

{{< fullsizeimage src="images/eye_tracking" caption="From the research paper.  The neural network architecture">}}

**View the colaboratory notebook with this working [here](https://colab.research.google.com/drive/11s5IQkI8H-kIn00Kg6Sqp-dD3RwsICdE).**

The model takes as inputs:

* an image of the left eye, (224x224)
* an image of the right eye (224x224)
* an image of the fafce (224x224)
* a 625 array representing where in a 25x25 grid the face is

It returns:

* Estimated gaze position in centimeters in xy coordinates relative to the camera.

For Presence, I had gotten this to work using my Alienware gaming pc and a linux operating sytem.  

To make a long story short, which I will write about in another blog posts, I spent about 2 weeks trying to migrate this into a more portable and accessible solution.  I'm close on a few different options.  

This is where I am right now:

{{< fullsizeimage src="images/system-diagram" >}}

**The code for the python gaze detection server can be found [here](https://github.com/oveddan/runwayml-gazecapture)**

OpenFrameworks does the video capture, and streams it to a python application that extracts the features with opencv and feeds them through the Caffe model.  The python application streams the estimated gaze positions back to the client. 

On my last go around with gaze detection, some of the biggest feedback I got was that they wanted it be very responsive to their gaze.  Getting real-time performance here is key.

The way I set it up on the python side is that both the opencv feature extraction and the feed forwarding of the neural network happen concurrently using multithreading.  This means that both the faces are being detected and the neural network is feeding forward at the same time.  When the neural network is done being fed forward, there are already features from the next frame ready to be fed forward through the network.

The communication is fully duplex and concurrent, meaning the python application can receive multiple frames while it is processing a previous frame.  It will always process the most recent frame received. It sends the gaze positions back as soon as they are processed.  This allows for the OpenFrameworks client to get gaze estimations for previous frames without having to wait for the current frame to be processed, providing a more real-time experience.

The current communication protocol is using ZeroMq.  Unfortunately I spent a day trying to get ZeroMq working with openframeworks and xcode, with no luck.  

{{< fullsizeimage src="images/zmq_woes" caption="Incredibly frustrated with the awful development environment that is XCode.">}}

This is where it stands now - the last bit that I neeed to get working for gaze estimation is this communication channel.  I will look into other things like UDP and posssibly migrating the UI to TouchDesigner and python.