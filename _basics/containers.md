---
title: Containers
---
# Working with Containers

The [PIXI.Container]({{ site.data.links.api-container }}) class provides a simple display object that does what its name implies - collect a set of child objects together.  But beyond grouping objects, containers have a few uses that you should be aware of.

## Containers as Groups

Almost every type of display object is also derived from PIXI.Container - even Sprites!  This means that in many cases you can create a parent-child hierarchy with the objects you want to render.  

However, it's a good idea _not_ to do this.  Standalone Container objects are **very** cheap to render, and having a proper hierarchy of Container objects, each containing one or more renderable objects, provides flexibility in rendering order.  It also future-proofs your code, as when you need to add an additional object to a branch of the tree, your animation logic doesn't need to change - just drop the new object into the proper Container, and your logic moves the Container with no changes to your code.

So that's the primary use for Containers - as groups of renderable objects in a hierarchy.

## Masking

Another common use for Container objects is as hosts for masked content.  "Masking" is a technique where parts of your scene graph are only visible within a given area.

Think of a pop-up window.  It has a frame made of one or more Sprites, then has a scrollable content area.  A container plus a mask makes that scrollable area easy to implement.  Add the Container, set its `mask` property to a PIXI.Rect, and add the text, images, etc. content you want to display as children of the Container.  Any content that extends beyond the rectangle mask will simply not be drawn.  Move the contents of the Container to scroll as desired.

(TODO: demo of a scrollable window)

There are a number of supported mask types.  This is an advanced topic, but in summary, here are your options:

Rect
: Uses a scissor rect internally - the fastest option

Graphics
: Use a PIXI.Graphics object to create a mask with an arbitrary shape - powerful, but doesn't support anti-aliasing

Sprite
: Use the alpha channel from a Sprite as your mask, providing anti-aliased edging - _not_ supported on the Canvas renderer

## Filtering

The final common use for Container objects is as hosts for filtered content.  Filters are an advanced, WebGL-only feature that allows PixiJS to perform per-pixel effects like blurring and displacements.

(TODO: better description here of how this works - not enough history w/ filters to write this properly as yet...)

