---
title: 'The Interaction of Tarots'
date: 2018-02-20T17:38:51-05:00
tags: [""]
classes: ["Electonic Ritual, Oracles, and Fortune Telling"]
featuredImageResource: 
  src: "images/tarot-featured"
description: 'My original idea for an electronic "oracle deck" would be a tarot reader that explores the interaction between tarot cards using concepts from The Interaction of Color by Josef Albers'
draft: false
---

{{< image src="images/tarot-feature" >}}

This is my submission for [Electronic Rituals, Oracles and Fortune Telling](http://eroft.decontextualize.com/) [Meditation #2,](http://eroft.decontextualize.com/schedule#meditation-2-assigned) 
in which we are to:

  > Invent your own “oracle deck.”  Keeping in mind the formal characteristics of cleromancy..., 
  > consider how digital media can complicate/diminish/augment the parts and processes of a reading.

## Concept

My original idea for an electronic "oracle deck" would be a tarot reader that explores the interaction
between cards using concepts from [The Interaction of Color](https://yalebooks.yale.edu/book/9780300179354/interaction-color) 
by Josef Albers.  In this book, he says:

> Our concern is the interaction of color, that is, seeing what happens between colors.
>
> We are able to hear a single tone.
> But we almost never (that is, without special devices) see a single color
> unconnected and unrelated to other colors. 
> Colors present themselves in continuous flux, constantly related to
> changing neighbors and changing conditions.

{{< image src="images/albers-violets" caption="From the Interaction of Color - both the inner violets are the same color, but their perceived color is different because of the colors next to them" >}}

Similary, in the Celtic Cross tarot reading, the cards are laid out in a way that the dynamic between the cards
can be as important as the interpretation of each card.

From [Biddy Tarot's guide](https://www.biddytarot.com/how-to-read-the-celtic-cross-tarot-spread/) on how to read the Celtic Cross spread:

> The Circle/Cross shows what is going on in the querent’s life at the time of the reading. This section is made up of two crosses – a central one (Cards 1 and 2) nested within a larger cross (Cards 3 to 6). The smaller cross represents the heart of the matter – what is most central to the querent at the time of the reading.

> The larger cross consists of two lines that overlay the smaller cross. The horizontal line (Cards 1, 3 and 4) shows time moving from the past on the left into the future on the right. The vertical line (Cards 1, 5 and 6) is the querent’s consciousness moving from unconscious on the bottom to conscious mind on the top.

![Celtic Cross Tarot](http://www.tarottotes.com/images/celticcross1BW.jpg)

If the cards are read this way, then the relation between the cards tell a story.  My concept was to represent the cards in colors,
and have the cards laid out next to each other so that the interaction between their colors would reveal the dynamic between the cards.

I would build a single-page react app that rendered svgs to represent the tarot deck, card colors, symbols and readings.
Each card would have its own color, and when laid on top of another card, its slight transparency would let the colors
mix, indicating the interplay between the two cards.  When a card is drawn, the background color of the reading would be
in the color of that card.  All the other colors, with their slight transparency, would absorb some of the background color
of the screen to represent the mix and interplay between the current card and the rest of the cards.


## Failed Execution

I started to build a prototype, and ultimately abandoned it before completion.
It can be accessed in its current state at **http://www.danioved.com/tarot/** and its code can be seen [here](https://github.com/oveddan/tarot).
To reveal the tarots, click anywhere or hit the space key.

I used the [Tarot Interpretations in JSON format](https://github.com/dariusk/corpora/blob/master/data/divination/tarot_interpretations.json) for the tarot cards, and icons from 
[The Nounproject](https://thenounproject.com/) for the symbols on the cards.  Color schemes from Alber's [Homage to the Square](https://g.co/kgs/oqVa3x) were used for the card colors.

I decided to stop working on it for the following reasons: 

* I started building the UI without sketching it out first.  This lead to a not truly thought out experience and confusion for me when trying to use the application.  I tried to wedge the concept of comparing card colors into the format of the celtic cross formation.  A simpler approach would have been just to select a couple cards and arrange their corresponding colors next to each other in an Alber's inspired way for comparison.
* Albers chose his colors based on variation of specific values in the color, and laid them next to each other. When he laid colors on top of each other with transparency, it was meant to demonstrate how one appears in front of the other, not to compare them. In my protoype, using opacity to mix colors laid on top of each other is not an effective way to demonstrate their interactivity.
* I spent way too much time trying to design 72 cards.
* Even when trying to demo the work in progress to friends, the user interface didn't really show cards and their colors interacting with each other and they didn't get it.

If I were to do this again, I would have treated this more like a prototype instead of trying to build a full tarot card reader.
I would have thought of this more like an interaction of color experiment, and design the tarot reading to look more like Josef Alber's demonstrations on these interactions,
integrating the tarot cards into the colors, instead of the other way around where it was wedged into the Celtic-Cross format.
I would have sketched out more of the UI and seen how these color experiments would look before building the interface.
It would have been better to just experiment with a few cards, and make sure I got the interaction right before building the full fledged 72-card reader.

I take this as a learning on how to better design and prototype experiments in a short period.

