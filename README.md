# Dan Oved's Blog

This is the repository for the content of my blog, hosted at http://oveddan.github.io/blog.
It uses [Hugo](https://gohugo.io/) to generate a static site which is hosted by [Github Pages.](https://pages.github.com/)

## Creating/Editing Content

Install hugo:

    brew install hugo

Start the hugo development server, which will live-reload the content:

    hugo server -D

Create a new post:

    hugo new posts/post-title.md

All static resources, such as images, should go into `static/`

To generate the static site:

    hugo

This will create the html files and content in the docs folder.

To update the site on github pages, run the command `hugo` to generate the static site, commit the changes, then push to `master`.
