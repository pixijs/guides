---
title: DisplayObject
---
# What Is a DisplayObject?

[PIXI.DisplayObject]({{ site.data.links.api-displayobject }}) is the core class for anything that can be rendered by the engine.  It's the base class for sprites, text, complex graphics, containers, etc., and provides much of the common functionality for those objects.  As you're learning PixiJS, it's important to [read through the documentation for this class]({{ site.data.links.api-displayobject }}) to understand how to move, scale, rotate and compose the visual elements of your project.

Be aware that you won't use DisplayObject directly - you'll use its functions and attributes in derived classes.

## Commonly Used Attributes

The most common attributes you'll use when laying out and animating content in PixiJS are provided by the DisplayObject class:

Position
: X- and Y-position are given in pixels and change the position of the object relative to its parent

Rotation
: Rotation is specified in radians, and turns an object clockwise (0.0 - 2 * Math.PI)

Pivot
: Point the object rotates around, in pixels - also sets origin for child objects

Angle
: Angle is an alias for rotation that is specified in degrees instead of radians (0.0 - 360.0)

Alpha
: Opacity from 0.0 (fully transparent) to 1.0 (fully opaque)

Scale
: Scale is specified as a percent with 1.0 being unchanged, and can be set independently for the x and y axis

Skew
: Skew transforms the object in x and y similar to the CSS skew() function, and is specified in radians

Visible
: Whether the object is visible or not, as a boolean value


(TODO: This feels thin, but for the life of me, not sure what else to add here...)