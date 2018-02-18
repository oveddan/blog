---
title: 'Turning Muscle Power into Usable Electricity'
date: 2018-02-12T18:30:08-05:00
tags: ["Hardware", "Fabrication"]
classes: ["Energy"]
draft: false
showPagesInSection: true
featuredImageResource: 
  src: "images/kinetic_featured"
imageResources: ["images/kinetic_wheel_og", "images/circuit_on_wheel", "images/kinetic_board_and_fabricated_scaled", "images/on_the_floor"]
description: It was time to build something that would turn muscle power into usable electricity.  To power the lights, we would force a dc gear motor to turn and tap into the electricty it generates. We would make a wheel attached to the end of a rod, and lights attached around the wheel.

---

{{< image src="images/full_kinetic_demo" >}}

For our [Kinetic Energy assignment](http://www.fddrsn.net/teaching/energy/2018-energy-project-briefs/), with which
I collaborated with Arnav Wagh, it was time to build something that would turn muscle power into usable electricity.

# Selecting the Motor

To power the lights, we would force a dc gear motor to turn and tap into the electricty it generates. We chose a [127 RPM Mini Econ Gear Motor](https://www.servocity.com/127-rpm-mini-econ-gear-motor) from ServoCity,
because it had optimal RPM and a low torque of 9,602 kgf-cm. 

{{< figure src="https://www.servocity.com/media/catalog/product/cache/1/image/438x280/602f0fa2c1f0d1ba5e241f914e856ff9/m/i/mini-econ_163-508-rpm-main-2-600px_7.jpg" caption="The 127 RPM Mini Econ Gear Motor from ServoCity.com" caption="The 127 RPM dc gear motor we used from Servo City" >}}

We would use a [.770" Pattern Clamping Hub](https://www.servocity.com/770-clamping-hubs) which would attach to the shaft and rotate to generate torque:

![The clamping hub](https://www.servocity.com/media/catalog/product/cache/1/image/438x280/602f0fa2c1f0d1ba5e241f914e856ff9/7/7/770-clamping-hubs-main-1500px.jpg) 

# Prototyping the Circuit

Next it was time to build a circuit that would simulate the power generation.  We used 4 diodes as a bridge rectifier
so that no matter which way the motor was turned, the current would flow through the circuit in the same direction.
We used a bunch of capacitors in parallel to smooth out the current and store energy when the wheel stopped turning, enabling the lights
to stay on.  We used a 12v white analog LED strip since it has the same voltage rating as the DC Gear Motor.

{{< fullsizeimage src="images/breadboard_circuit"  caption="The prototyped circuit with a bridge rectifier" >}}

We were able to test the circuit successfully.  Turning the motor in either direction generated power to turn on the lights:
{{< image src="images/testing_motor.gif" >}}

# Fabricating the Device

Our original plan was to swing a rope with a weight attached to the end around the motor, causing it to turn.  However,
this proved to not be enough torque to turn the shaft, causing the rope to tangle.  Arnav came up with another design,
a wheel attached to the end of a rod, and lights attached around the wheel. The shaft would be coupled to the rod,
and the motor itself would be located inside the wheel; this would enable the output power lines of the motor to be connected
to the circuit without a slip ring.

<script src="https://embed.github.com/view/3d/oveddan/blog/master/static/models/kinetic_energy_wheel.stl"></script>

We converted this 3d model into slices, and cut it on the CNC Router:

{{< image src="images/cnc_wheel.gif" >}}


{{< fullsizeimage src="images/cnc_wheel.jpg" >}}

Then we glued it all together and let it sit overnight:

{{< fullsizeimage src="images/glueing_wheel.jpg" >}}

{{< fullsizeimage src="images/glueing_motor_wheel.jpg" caption="The engine mounted to the wheel. This would allow the circuit to rotate with the wheel without the need for a slipring.">}}

{{< fullsizeimage src="images/clamping_wheel.jpg" >}}

{{< fullsizeimage src="images/glued_wheel.jpg" >}}

# Fabricating the Circuit

Next it was time to build the circuit that could withstand a series of rapid rotational turns.  We designed
something simple in EagleCad:

{{< image src="images/kinetic_schema" caption="The circuit with the bridge rectifying diodes and 47uF capacitors in series">}}

Then fabricated it on the Othermill:
{{< image src="images/milling_circuit" >}}

This created a compact, durable circuit that could fit many capacitors and be easily mounted to the wheel.
A hole was left in the middle for the wires that would go to the motor to pass through.
{{< image src="images/kinetic_board_and_fabricated_scaled" >}}

{{< fullsizeimage src="images/soldered_bottom" >}}

{{< fullsizeimage src="images/fabricated_with_parts" caption="The circuit with the capacitors in parallel and bridge rectifying diodes.  Yellow wires would go to the motor and accept either polarity, and red and black wires would be power and ground for the lights." >}}

We tested the circuit with an external 12v power supply, and also tested reversing the polarity of the power supply to see
if the bridge rectification worked, and were glad to see that it did.
{{< fullsizeimage src="images/circuit_working" >}}

# Putting it All Together

After coating the wheel with black spraypaint, it was time to assemble everything and test it all.

{{< fullsizeimage src="images/all_together" caption="The spraypainted wheel with circuit attached" >}}

{{< fullsizeimage src="images/circuit_on_wheel" caption="The circuit attached to the wheel.  Yellow wires pass through the center and are attached to the dc gear motor's power and ground." >}}

{{< fullsizeimage src="images/joint_for_pole" caption="The shaft of the motor coupled to the rod; when rolling the wheel the torque would cause the engine to generate power.">}}

{{< fullsizeimage src="images/on_the_floor" caption="Getting ready to test everything">}}

{{< fullsizeimage src="images/rolling_for_light_2" caption="Testing it out - it worked!">}}

{{< image src="images/kinetic_demo" >}}

{{< fullsizeimage src="images/lit_up_in_dark" >}}

