---
title: 'Game Controller'
date: 2018-01-27T20:28:36-05:00
tags: ["tangible interaction workshop", "interaction"]
categories: [""]
draft: true
---


For this assignment, I tried about both versions of the game.  According to the instructions,
we were supposed to make the controller work for both games.

First,  I sketched out the current controls for each game:

Then I came up with an initial design:

This had a joystick on the left that would go only left and right, and a joystick on the right that would go up and down.
A toggle switch in the middle would change if the game mode is Atari or the other one.  Depending on what
the toggle was set to, the joysticks would either trigger w a s d or up down left right on the keyboard, since each
game used a different set of keys.A joystick in the top middle and a button would act as a mouse click.
A trigger on the top right would act as the spacebar.



After experimenting with the Atari game, I realized that it also worked with the arrow keys, even though not documented.  Therefore
I could trigger the same keys no matter the game, so the toggle switch is no longer needed to switch between game modes.

I redesigned without that middle button:

I also experimented with adding the space bar on the top of the controller, as this would be easier to build:

Then I thought a bit - users are not accustomed to using joysticks that just go in a single axis.  They are much more used
to working with buttons.  So I should make a controller just with that.  Also I discovered there are joysticks you can also press
down to click.  This would allow both the joystick and button on my controller for the mouse to be combined into that single joystick
that can be clicked.

My final design was as such:

I would etch or draw on the conroller symbols showing what the buttons do.
