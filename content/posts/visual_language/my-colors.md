+++
title= "My Colors and Compositions"
description= "Picking a color scheme that represents me and creating six compositions using it"
date= 2017-10-04
tags = ["Visual Language"]
categories = ["Visual Language"]
+++

For this Visual Language [homework assignment](https://itp.nyu.edu/~kd49/design/?page_id=1256), I was tasked to pick a color scheme that represents me,
and create six compositions using those colors.

# The Color Scheme

I chose the theme inspired by *Tame Impala 'Currents'* from [The Day's Color](http://thedayscolor.com/):

{{<figure src="/blog/images/visual_language/colors/colortheme.png">}}

This colors in this theme theme are both vibrant and diverse.  To me, this represents how I'm always learning
different things, and using them in innovative ways to create something exciting.  The red in this theme
matches the color of my favorite pieces of clothing.

# The Compositions

{{<figure src="/blog/images/visual_language/colors/breadth.png" caption="Breadth">}}
Each leaf of this tree represents somethign I've discovered and pursued.  My path has not gone in a particular
direction, but everything I've learned is connected, and can be combined and built upon.

---

{{<figure src="/blog/images/visual_language/colors/monet.png" caption="Monet - Sunset in Venice">}}
Monet's Sunset in Venice painting in my color scheme.

---

{{<figure src="/blog/images/visual_language/colors/cornucopia.png" caption="Cornucopia">}}
Technology provides an infinite supply of possibilities.

---

{{<figure src="/blog/images/visual_language/colors/solarclock.png" caption="Solar Flare">}}
A vector version of an LED clock I build with a friend.

---

{{<figure src="/blog/images/visual_language/colors/danharvs.png" caption="Harvey Dan">}}
My eyes and glasses on Harvey, the best cat ever.

---

{{<figure src="/blog/images/visual_language/colors/pathways.png" caption="Now">}}
The present is what matters.

# The technique

These were all made using *Adobe Illustrator,* with the exception of *Cornucopia,* which
was made with *Processing.*  *Adobe Photoshop* was used for some pre-processing of images.

I created an illustrator file with six artboards.

For **Breadth,** I used the *Pathfinder Divide* tool to have the rotated rectangle cut the pieces it overlaps 
and to color those pieces a different color.

For **Monet - Sunset in Venice** I opened an image with the original painting in *Photoshop,* then set the image
mode to indexed color with six colors.  

{{<figure src="/blog/images/visual_language/colors/sunset-in-venice-colors.png" caption="The six color conversion in Photoshop">}}

I then opened the six-color image in *Illustrator,* and used the *Pen* tool to
draw polygons with fills of colors from the theme on top of the image.

For **Cornucopia** I used processing to recursively draw ellipses that shrank as they drifted off the screen, giving the illusion of a horn.

The code:

```Java
int screenHeight = 1024;
int screenWidth =1024;
int margin = 10;

color bg1 = color(9, 9, 22);
color[] colors = { color(213, 68, 68), color(216, 116, 162), color(151, 131, 183) };

int maxDepth = 100;

void setup() {
 size(1024, 1024);
 background(bg1);
}

float firstCircleSize = screenHeight * 0.8;

void draw() { 
  stroke(0, 0);
  float circleHeight = firstCircleSize * 1.1;
  drawCircle(firstCircleSize / 2 + margin, margin + circleHeight / 2, firstCircleSize, circleHeight, 0);
}

void drawCircle(float x, float y, float width, float height, int depth) {
  if (depth >= maxDepth) return;
  fill(colors[depth % colors.length]);
  ellipse(x, y, width, height);

  drawCircle(pow(x, 1.002), pow(y, 1.002), width * 0.95, height * (0.96), depth + 1);    
}
```

For **Solar Flare** I drew a shape using the *Curvature* tool, and like in *Breadth* used the *Pathfinder Divide* tool to have it cut the arms of the flare
and color the cut pieces.

For **Harvey Dan** I took a picture of Harvey, my brother's cat, and put my eyes and glasses on it using *Photoshop.*  
{{<figure src="/blog/images/visual_language/colors/DanHarvsSource.png">}}

I then exported this into *Illustrator* and used the *Curvature* tool to draw shapes over this image.

**Now** was created quickly in *Illustrator* using squares.
