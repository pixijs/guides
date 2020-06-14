# PixiJS Basics - What PixiJS Is

So what exactly *is* PixiJS?  At its heart, PixiJS is a rendering system that uses WebGL (or optionally Canvas) to display images and other visual content.  It provides a full scene graph (a hierarchy of objects to render), and provides interaction support to enable handling click and touch events.  It is a natural replacement for Flash in the modern HTML5 world, but provides better performance and pixel-level effects that go beyond what Flash could achieve.  It is perfect for online games, educational content, interactive ads, data visualization... any web-based application where complex graphics are important.  And with technology such as Cordova and Electron, PixiJS apps can be distributed beyond the browser as mobile and desktop applications.

## PixiJS Is Fast

One of the major features that distinguishes PixiJS from other web-based rendering solutions is *speed*.  From the core up, the render pipeline has been built to get the most performance possible out of your users' browsers.  Automatic sprite and geometry batching, careful use of WebGL resources, a tight scene graph - no matter your application, speed is always valuable, and PixiJS has it to spare.

## PixiJS Is More Than Just Sprites

Drawing images on a page can be handled with HTML5 and the DOM, so why use Pixijs?  The answer is that PixiJS goes well beyond simple images.  Draw trails and tracks with [PIXI.SimpleRope]({{ site.data.links.api-simplerope }}).  Draw polygons, lines, circles and other primitives with [PIXI.Graphics]({{ site.data.links.api-graphics }}).  PIXI.Text provides full text rendering support that's just as performant as sprites.  And even for drawing simple images, PixiJS supports spritesheets for efficient loading and ease of development.

