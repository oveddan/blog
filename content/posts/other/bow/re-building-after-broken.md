---
title: 'Re Building After Broken'
date: 2018-01-26T19:19:51-05:00
tags: [""]
categories: [""]
draft: true
---

The bow wonderully made it through a few shows, but it ended up breaking after a few charges.

Shoko brought it to me with some of the wires broken.  The way it had been built was always unreliable,
since to charge it, the middle needed to be unscrewed, exposing the fragile connections to the Teensy
that had been twisted upon screwing/unscrewing the middle, and the soldered connectiong of the thin wires
to the Teensy itself.  Unscrewing this left these all exposed to the air, letting them easily be broken.

I got the bow back with a few of these connections broken.  I spent an entire day trying to re-solder some of these
connections, but the bow would only turn on when connected via usb power; the battery would never support the leds.
Even when I disconnected the battery and tried to power the bow directly from a dc power source connected to the wall
where the battery was connected, it would not work.  When the power switch was turned on, and the battery connected,
I would do a multimeter connectivity test between power and ground on the backpack charger and detect continuity.
There was a short somewhere.  I believe it was where the wires ran up the side of the bars holding the LEDs, but the way
it was built it was impossible to remove the battery and the led bar.

Rather than continuing to try to fix this, it's better to rebuild this in a more sturdy way.  I will use what I learn in Homemade hardware to make a better version.

The better solution is to have the Teensy at one end, and the battery at the other; a washer would provide the counter balance.
