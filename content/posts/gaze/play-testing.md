---
title: "The Gaze Project - Play Testing"
date: 2017-11-07T20:16:51-05:00
tags: ["The Gaze Project", "Digital Fabrication", "Physical Computing", "Usability Testing"]
categories: ["Digital Fabrication", "Physical Computing"]
description: "Findings from testing the assumptions and user experience."
draft: false
---

For Intro to Physical Computing this week, we were to play test our final project with our classmates.

For the Gaze Project, I set up the following for the test:

## Assumptions

* Initially - people will try to follow the animation with their eyes,  but they will notice that doing that causes it to go away. They will eventually learn to focus on one point and see the animation grow with their peripherals.
* The visuals will be engaging enough to keep them looking at the same point over an extended period of time.
* The animations do not distract to the point of losing focus - in fact they encourage the meditative state.

## Instruction for the User

Look at this sketch, and see if you notice anything.  The goal here was to see if they could figure out how to interact
with the installation without any instruction.

## Questions for the User

* Which animation did you prefer? Why?
* How did the experience make you feel?
* How long is an ideal experience?
* Were you aware that staring at a point made a difference in the experience?
* Tell us about your mindfullness practice, and if you felt any of that while gazing.

## Experiment Setup

I created a sketch in Processing that simulated a few of the animations.  It rendered the physical
animation as graphics, so that we could easily prototype different visuals.  We has the user look at this on a wide screen monitor.
To simulate it reacting to their gaze, we observed their eyes, and physically controlled a potentiometer that would send the faked gaze x coordinate to the processing sketch over serial.

## Results

We tested it without about 7 classmates, and recorded our conversations on index cards:

<img src="/blog/images/play_testing/indexcards.jpg"/>

Unfortunately I can't seem to find the rest of the index cards.  A lot of this is from memory, and likely some of the things said are attributed to the wrong person.

For the first one to test, Nick Wallace, I told him to just look at the screen and see if he notices anything.
He was trying to figure out what was going on.  When he moved his eyes sharply I'd turn the potentiometer to follow
to simulate the visuals resetting.  After a bit I told him what the idea was.  He said he kinda got it.  He liked the idea
of eye tracking, but it wasnt clear to him that it was following his eyes.  I asked him about his meditation practice, and he told me
he has a slight one. I asked him if this felt meditative at all and he said no, because his practice is more about his breathing.

The next test was Simon.  Jim sat down next to him.  He was staring for a bit, he was able to not move his eyes to the side.   He was saying how
he noticed the visuals were slightly moving but couldnt exactly tell why.  Then I told him he was suppose to gaze at a certain point.
He would, then after a while he moved his eyes and I forced them to reset.  After the experience, he said he really liked the idea of tracking his eyes,
but for it to be effective it would need to be accurate and quick.  He also said how it could be an interesting effect if the tracking was following his eyes. He also
said that where you look something should appear rather than blankness, because that would more clearly show the indicator.

I asked Simon and Jim how they would feel if it was done with multiple people.  They both didn't seem to understand how that could work.  I told them how it could follow
multiple peoples' gazes, but they thought it would be wierd if one person was canceling out the other.  I attempted to explain to them how it be colloborative and a bigger
effect, but found it challenging to visualize this or depict it with words.

They also weren't clear that this was physical.  I had to explain how it would be built.

From this point on I figured the visuals and animations were not clear enough to not give the users any instruction, so I told them to gaze at a point on the screen.

With Erin, I noticed she was moving her eyes rapidly.  She told me after it felt like it was intentionally distracting her, and when she looked away it was trying to punish her.
It did not feel calming.  She did not get a sense that it was growing. She said that with the prompt she was resisting the temptation of distraction.  I asked her how
she would feel about doing this with multiple people.  She said she wasn't sure - the other people could possibly be distracting.

With Terrick, the interaction didnt seem to work at all.  He kept looking around, and I would reset it.  I had to explain to him what it was about in detail.  
He suggested maybe using diagonal lines, and adding more variation.  He was bored with the visuals and wanted more, maybe some color and features.  I showed him all of the animations
and he liked the ones with the nearly vertical, diagonal lines the most.

With Martin, he knew how how to interact and he gazed at one point.  It was because he heard that it was about computer vision and gazing before, and he liked that.
He thought a really cool app would be something you use on the web with a webcam and computer.  He like the jagged lines version 2nd best, and the one with rectangles
in the middle being his favorite.  He said there should be more on it to make it more insteresting, like if you look at different sides, more is revealed. He said
it would be awesome if it worked well, and it would have to quickly respond to the gaze for it to feel good.

Some of the best feedback came from the teacher, Daniel Rozin.  He said maybe its better if the point you are looking at is more pronounced, and that the visuals
are rippling towards the point.  He asked - what is the contour of the interaction vs our emotions?  
Maybe when we start there is a sort of bewilderment, then comes total understanding.  What is the total cycle?
He said you have to imagine what you want the user to get after a few minutes, and their state of mind.
He said it should be clearer where you are gazing.  I asked him what did he think about having multiple people look at it and he didn't realy understand how that would work.
I found it challenging to explain how I thought it would work clearly.

When asking him about how we could simulate the y-axis when we just are rotating around the x-axis, he told me to look at:

{{< vimeo 61924239 >}}

## Conclusions

This was a wonderful experience, and I'm glad that they make it part of the process.  Practicing and getting better at user testing has
been a desire of mine since my startup, [Tapactive,](https://techcrunch.com/2013/09/25/heres-what-we-saw-at-eras-summer-2013-demo-day/),
with was based on untempted assumptions, failed.  I also enjoyed checking out others projects and giving them feedback.  The tests provided a lot of greats information.
I hope we continue doing this in the future.

My personal thoughts on the installation:

* I should add a bit to the visuals, make them vary on different sides.
* I should highlight quickly where the user is looking to make the gesture more clear and gratifying.
* Since I have a tough time explaning how it would work, maybe multiple users is overcomplicating things.  It will be challenging
enough to get the interaction and technology right for just one person, so lets focus on that first, and if we get it right, we can
explore multiple people.  This would also scale down the physical size and complexity.
* Most people did not get the mindfullness aspect of it.  Question - can we really make this a meditative experience if we are limited
to such a small change in visuals?  Maybe it should be simplified to just follow a users' gaze and making that as good as possible?
* It would be interested to explore the y axis by using spirals
