---
title: 'Movement Haiku'
date: 2018-03-29T11:59:45-04:00
tags: [""]
classes: ["Electronic Rituals, Oracles, and Fortune Telling"]
description: "We created a method for
facilitating automatic writing which uses body movement to generate Haikus.  It is an exploration of the concept
that our body movements and dance moves express our subconcious, which can be express thoughts and words we are not fully aware of."

draft: false
---

{{< image src="images/MovementHaikus_Elizabeth" >}}

This is our submission for [Electronic Rituals, Oracles and Fortune Telling](http://eroft.decontextualize.com/) [Meditation #2,](http://eroft.decontextualize.com/schedule#meditation-2-assigned) 
in which we are to:

  > Make a prototype of an electronic spirit board or other method for facilitating automatic
  > writing (communication from unconscious/subconscious/collective gesture.)
  > (You can use procedural methods like those discussed in class, or invent your own method.)
  > Questions to consider: How does your spirit board produce “coherence” (if, in fact, it
  > does produce coherence)? Who is participating?

For this I collaborated with [Elizabeth White](http://www.elizabethcarolinewhite.com/).  We created a method for
facilitating automatic writing which uses body movement to generate Haikus.  It is an exploration of the concept
that our body movements and dance moves express our subconcious, which can be express thoughts and words we are not fully aware of.

It uses code from the Processing [RiTa] [HaikuGrammar.pde](https://github.com/dhowe/RiTa/blob/master/examples/processing/HaikuGrammar/HaikuGrammar.pde) sketch,
which creates random Haikus using grammar generation.  We modified this sketch to use a connect to track where a person's body is.  At first, the Haiku that is generated
is not revealed.  Whenever the person moves it reveals more of the Haiku at the rate the person moves.

When the full Haiku is revealed, it remains on screen for a few moments before disappearing.  A new Haiku is then generated and revealed the more the person moves.

The text is projected onto the persons body, by using the Kinect to follow the person, and using the detected center spine positions x, y, and z to determine
the x and y center of the text, and scaling of the text determined by the z to match how far and close the person is to the projector.

{{< image src="images/MovementHaikus_Dan" >}}

Currently, the Haiku is completely random.  In the future, we could prompt the user with a subject, and have the text be generated to tie to that subject.
This would allow the users movements to be more of a conversation around the subject, and the generated text be more coherent with that subject.
 
