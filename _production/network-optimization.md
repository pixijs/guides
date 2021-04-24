# Network Optimization

Since PixiJS is a browser-based rendering system, making your project load quickly over the network is key to having a good user experience.  In this guide, we're going to talk about how to ensure that the resources your project needs are ready as quickly as possible.

__Loading speed means two things - minimize total file size, and minimize file count.__

## Minimizing Size

The first part of fast downloads is pretty obvious.  It will take roughly twice as long to download a project with twice as many megabytes of images and other resources.

This means that you should minify your javascript, use proper audio compression settings, use tools like TinyPNG or PNG Crush to reduce image size, etc.

## Minimizing File Count

This one is less obvious.  We're used to thinking of bandwidth, so total project size makes sense.  Why does the number of files matter?

The answer is that browsers are limited in the number of files they can download at one time.  As of this writing, Chrome is limited to 10 parallel downloads, while Firefox is capped at 17.  If you have, say 100 files to download, your user's browser will start downloading the first 10, then wait until those files complete to kick off the next download.  This means that the latency on round-tripping to the server, and any processing time to find and serve the file, gets added to your download time.  It also increases your chances of a stall or hiccup while downloading, as networks aren't perfect pipes for data flow.  The less files you request, the better.

So what should you do?  The answer is to combine multiple files into one file where possible.

Image files can be combined by using [SpriteSheet objects]({% link _basics/sprite-sheets.md %}).  You use a 3rd party texture packer utility to combine many images into one, then use PixiJS's texture system to pull out each image's pixels as needed.

Audio clips can similarly be combined when using audio libraries like [Howler.js]({{ site.data.links.tool-howler }}) or the [PixiJS Sound plugin]({{ site.data.links.plugin-sound }}).  You pack a set of audio files together into a single audio file, and the libraries seek to the start of the appropriate part of the file on playback.

Finally, you'll want to use some type of JavaScript bundler like [webpack]({{ site.data.links.tool-webpack }}) to serve a single JavaScript file containing all your code.  You may even want to combine and compress JSON data files, depending on your project.

Each of these techniques requires a bit of setup, but the reduction in loading times can be significant.

## On-Demand Downloading

For larger projects, there's one final trick that can be very powerful - on-demand loading.  The basic idea is to download only immediately required resources at first, then load any further resources as they're needed.  For example, imagine you're building a dungeon-crawler.  You may have ~100 sprites needed for each level, and dozens of audio clips.  Load level 1's content immediately, then wait to start downloading level 2 until all of level 1 is loaded.  Your game can start as soon as level 1 is loaded - no need to wait for art and sounds your user won't see for a while - they can download in the background as your user is happily playing.

Doing this type of delayed loading requires carefully structuring your code and assets, but can pay off in a much quicker start time.  Be aware that if you want to use this approach, you will want to spin up a new PIXI.Loader for each set of files.  You can't re-use a loader once it has been started!
