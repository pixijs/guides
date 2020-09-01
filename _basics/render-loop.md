---
title: Render Loop
---
# The Render Loop

Now that you understand the major parts of the system, let's look at how these parts work together to get your project onto the screen.  Unlike a web page, PixiJS is constantly updating and re-drawing itself, over and over.  You update your objects, then PixiJS renders them to the screen, then the process repeats.  We call this cycle the render loop.

The majority of any PixiJS project is contained in this update + render cycle.  You code the updates, PixiJS handles the rendering.

## Updating State Ticker



## Updating the Scene Graph

We'll talk a *lot* more about what a scene graph is and what it's made of in the next guide, but for now, all you need to know is that it contains the things you're drawing - sprites, text, etc. - and that these objects are in a tree-like hierarchy.  After you've updated your game objects by moving, rotating and so forth, PixiJS needs to calculate the new positions and state of every object in the scene, before it can start drawing.

## Rendering the Scene Graph

Now that our game's state has been updated, it's time to draw it to the screen.  The rendering system starts with the root of the scene graph (`app.stage`), and starts rendering each object and its children, until all objects have been drawn.

## Frame Rate

A note about frame rates.  The render loop can't be run infinitely fast - drawing things to the screen takes time.

## Custom Render Loops

What we've just covered is the default render loop provided out of the box by the Application helper class.  There are many other ways of creating a render loop that may be helpful for advanced users looking to solve a given problem.  You can read more about that in the [Custom Render Loop guide](tbd).  While you're prototyping and learning PixiJS, sticking with the Application's provided system is the easiest option.
