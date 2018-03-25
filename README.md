# Dan Oved's Blog

This is the repository for the content of my blog, hosted at http://danioved.com/blog.
It uses [Hugo](https://gohugo.io/) to generate a static site which is hosted by [Netlify.](https://pages.github.com/)

## Creating/Editing Content

Install hugo:

    brew install hugo

Start the hugo development server, which will live-reload the content:

    hugo server -D

Create a new post:

    hugo new posts/post-title.md

All static resources, such as images, should go into `static/`

## Deploying

All that is required to deploy is to push to github:

    git push origin master

Netlify will detect this push, build the site, and deploy the static content.
