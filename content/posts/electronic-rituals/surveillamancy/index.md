---
title: 'Surveillamancy'
date: 2018-03-08T11:23:15-05:00
tags: ["Computer Vision", "Web"]
classes: ["Electronic Rituals, Oracles, and Fortune Telling"]
draft: false
---

For this week's [Electronic Rituals, Oracles, and Fortune Telling](http://eroft.decontextualize.com/)
[meditation](http://eroft.decontextualize.com/schedule/#meditation-3-assigned) we are to:

> Invent an “-omancy,” or a form of divination/prophecy based on observing and interpreting natural events. 
> Your reading of “natural” should make some reference to digital/electronic/computational media. 
> (What counts as a “natural event” on the Internet? What’s the electronic equivalent of phrenology, 
> from both a physical computing perspective and a data analysis perspective? 
> Does it count as “interpretation” if it’s being performed by a computer program?)
> I’m especially interested in responses that take the form of *purposefully inaccurate* data analysis.

I've created surveillamancy, a form of prophecy that is generated off of what is seen when surveilling
a camera somewhere in the world.  It is accessed at https://surveil.netlify.com/. 

In it the viewer selects which camera tickles their fancy:

{{< image src="images/landing" >}}

Then the viewer waits as the camera is located.

{{< image src="images/waiting" >}}

Finally, the user sees a picture captured from the camera and an interpretation of meaning derived from the picture's contents.

## How does it work?

The code can be seen at [github.com/oveddan/surveillamancy](https://github.com/oveddan/surveillamancy). 
It is written in react on the client side and node.js on the server, and is hosted on [Netlify](https://www.netlify.com/) 
and [Heroku](heroku.com).

To find a camera of the specified type, https://www.insecam.org/ is scraped by going to 
https://www.insecam.org/en/bytag/{cameraType}/ and a random camera that appears
is selected.  [Puppeteer](https://github.com/GoogleChrome/puppeteer) is used to do the scraping.
The camera is then navigated to, and a screenshot is captured of the video feed.  The code for
this can be seen in [server/insecam_scraper.js](https://github.com/oveddan/surveillamancy/blob/master/server/insecam_scraper.js).

To derive meaning from the contents of the photo, [clarifai's](https://clarifai.com/) image classification api is used
to classify what's seen in the photos.  To derive meanings from this classifications, 
Gustav Hindman Miller’s [Ten Thousand Dreams Interpreted](https://nickm.com/dreams/index.html) was scraped for
dream meanings.  The scraper can be seen at [server/scrape_dreams.js](https://github.com/oveddan/surveillamancy/blob/master/server/scrape_dreams.js)
Then, at runtime, the dream interpretations for the classifications from clarifai are looked up in these
dream interpreations.  All instances of `dream` are replaced with `see`:

```javascript
function changeToSoundLikeVision(dreamMeaning) {
  return dreamMeaning
    .replace('To dream of', 'To see')
    .replace('to dream of', 'to see')
    .replace('To dream that', 'To see that')
    .replace('to dream that', 'to see that')
    .replace('dreamer', 'voyeur')
    .replace('dreaming', 'voyeuring')
    .replace('dream of', 'see')
    .replace(' in a dream', '')
    .replace(' in your dream', '')
}
```

The first 3 interpretations are displayed to the viewer.
