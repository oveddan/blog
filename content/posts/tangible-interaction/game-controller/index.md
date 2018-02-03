---
title: 'Tangible Interaction Workshop - Game Controller'
date: 2018-01-30T20:28:36-05:00
tags: ["Tangible Interaction Workshop", "Interaction"]
categories: ["Tangible Interaction Workshop", "Interaction"]
draft: false
featuredImageResource: 
  src: "images/game-controller-featured.png"
---

## Design and Sketching Concepts

For this assignment, I tried about both versions of the game.  According to the instructions,
we were supposed to make the controller work for both games.

First,  I sketched out the current controls for each game:

{{< fullsizeimage title="Game Controls Concepts"  src="images/game" >}}

Then I came up with an initial design:

{{< fullsizeimage title="Initial Design" src="images/initial_design" >}}

This had a joystick on the left that would go only left and right, and a joystick on the right that would go up and down.
A toggle switch in the middle would change if the game mode is Atari or the other one.  Depending on what
the toggle was set to, the joysticks would either trigger w a s d or up down left right on the keyboard, since each
game used a different set of keys.A joystick in the top middle and a button would act as a mouse click.
A trigger on the top right would act as the spacebar.

After experimenting with the Atari game, I realized that it also worked with the arrow keys, even though not documented.  Therefore
I could trigger the same keys no matter the game, so the toggle switch is no longer needed to switch between game modes.

I redesigned without that middle button:


{{< fullsizeimage title="Redo Design" src="images/redo_design_1" >}}

I also experimented with adding the space bar on the top of the controller, as this would be easier to build:

{{< fullsizeimage title="Redo Design With Space Bar on Top" src="images/redo_design_2" >}}

Then I thought a bit - users are not accustomed to using joysticks that just go in a single axis.  They are much more used
to working with buttons.  So I should make a controller just with that.  Also I discovered there are joysticks you can also press
down to click.  This would allow both the joystick and button on my controller for the mouse to be combined into that single joystick
that can be clicked:

{{< fullsizeimage title="Design with buttons" src="images/design_with_buttons" >}}

I would etch or draw on the conroller symbols showing what the buttons do.

After emailing back and forth with Tom Igoe (the instructor), I learned that we only needed to design for one of the games, and only
needd to make controls for a specific game.  In this case, for the "other" version (not the Atari one), the only controls are
really left, right, up for the gas, and click to start. This would let me do a controller with just those 4 controls:

{{< fullsizeimage title="Focused design" src="images/focused_design" >}}

## Using a joystick to allow for adjustable thruster
When playing the game, I found it annoying that the thruster could only be fully on or off.  This made
it more challenging to ease into a smooth the landing.  I thought the ideal
situation would be to be able to control how strong the thrust is with a sort of joystick or slide mechanism,
similar to how it is controlled in airplanes or fighter jets.

I experimented with doing this by pressing rapidly on the up key; this got the desired result of the thrusters only
emitting part of their capacity.  I realized we could simulate this by having the controller repeatedly press the *up* key, and 
how far the joystick or slide potentiometer is pushed would correspond to how long the up key is pressed down for in each period.

This methodology corresponds directly to how [Pulse With Modulation](https://www.arduino.cc/en/Tutorial/PWM) works, 
where a signal is on for a specific period in an interval:

{{< figure src="https://www.arduino.cc/en/uploads/Tutorial/pwm.gif" caption="Source: https://www.arduino.cc/en/Tutorial/PWM" >}}

For the game, we could model the tapping of the *up* key just like this.

For the physical control, I did not have a slide potentiometer; I only had a joystick that could move in both axises.  Allowing
the user to move the joystick in both the x and y would be confusing, as the x is never used, and only one direction of the y is used.

{{< fullsizeimage title="Joystick in both axis" src="images/joystick" >}}

A clearer interface would be one where they can only pull the y in one direction and that would control the strenght of the thruster.
To try making this, I cut a thin slot into a piece of card-paper, and removing the knob from on top of the joystick:

{{< fullsizeimage title="Limiting to one direction" src="images/limiting_joystick_axis" >}}

I then use a button I had from a switch I removed off of a Korg mixer as this button would indicate it should be pushed in a single direction:

{{< image title="Limit switch" src="images/limit_switch" >}}

## Assembling and Coding the Controller

When it came time to assemble, I laid everything out similar to the sketch, except with the joystick on the right:

{{< fullsizeimage title="Assembled" src="images/assembled_on_breadboard" >}}

I originally attempted to have the joystick attached via pins to a small breadboard:

{{< fullsizeimage title="With Pins" src="images/joystick_on_breadboard" >}}

However, this proved unreliable, as the joystick would easily be pushed up or down, and could become slightly displaced
for a moment from the breadboard, providing inconsistent resistance rating. This caused me hours of troubleshooting and pain.

I ended up soldering wires to the pins on the joystick; this proved much more reliable:

{{< fullsizeimage title="Soldered Wires" src="images/soldered_pins" >}}

I wrote code for the controller to achieve the pulse with modulation effect on the thrust key. To calibrate the 0 on the joystick,
when the start key is pressed, the joystick y is zeroed. 

{{< gist oveddan 402a7e1302462fcc150cbba4d005fa81 >}}

## Testing it Out

I tested out the controls and they worked well.  Being able to have light thrusters instead of full strength let me get a smooth
landing:

{{< vimeo 253572510 >}}

## Assembling the Final Case

To assemble the final case, I drew some guides on a piece of black card-paper and cut them with an exacto knife. 

{{< fullsizeimage title="Lines for Case" src="images/lines_for_case" >}}

To get precise folds I cut light lines into one of the sides.

{{< fullsizeimage title="Cut Case" src="images/cut_case" >}}

To create a secure folding I used a glue gun.  I had the bottom close via a slot so that
the case can be opened in case anything goes wrong.

{{< fullsizeimage title="Glue Gun" src="images/glue_gun" >}}
{{< fullsizeimage title="Bottom Fold" src="images/bottom_fold" >}}

{{< fullsizeimage  src="images/assembled_case" caption="The fully assembled case" >}}

{{< fullsizeimage   src="images/controller_in_hands" caption="The controller felt great to hold and fun to play the game with" >}}


