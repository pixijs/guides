---
title: Graphics
---
# What is PIXI.Graphics?

[PIXI.Graphics]({{ site.data.links.api-graphics }}) is a complex and much misunderstood tool in the PixiJS toolbox.  At first glance, it looks like a tool for drawing shapes.  And it is!  But it can also be used to generate masks, or to make complex click areas on other objects.  How does that work?

In this guide, we're going to de-mystify the Graphics object, starting with how to think about what it does.

## Graphics Is About Building - Not Drawing

First-time users of the PIXI.Graphics class often struggle with how it works.  Let's look at an example snippet that creates a Graphics object and draws a rectangle:

```javascript
// Create a Graphics object, set a fill color, draw a rectangle
let obj = new PIXI.Graphics();
obj.beginFill(0xff0000);
obj.drawRect(0, 0, 200, 100);

// Add it to the stage to render
app.stage.addChild(obj);
```

That code will work - you'll end up with a red rectangle on the screen.  But it's pretty confusing when you start to think about it.  Why am I drawing a rectangle when *constructing* the object?  Isn't drawing something a one-time action?  How does the rectangle get drawn the *second* frame?  And it gets even weirder when you create a Graphics object with a bunch of drawThis and drawThat calls, and then you use it as a *mask*.  What???

The problem is that the function names are centered around *drawing*, which is an action that puts pixels on the screen.  But in spite of that, the Graphics object is really about *building*.

Let's look a bit deeper at that `drawRect()` call.  When you call `drawRect()`, PixiJS doesn't actually draw anything.  Instead, it stores the rectangle you "drew" into a list of geometry for later use.  If you then add the Graphics object to the scene, the renderer will come along, and ask the Graphics object to render itself.  At that point, your rectangle actually gets drawn - along with any other shapes, lines, etc. that you've added to the geometry list.

Once you understand what's going on, things start to make a lot more sense.  When you use a Graphics object as a hitArea, for example, the interaction system uses that list of graphics primitives in the geometry list to do hit tests.  The parent object is "hit" if the interaction event (say, a mouse click) happened inside that rectangle you built using your `drawRect()` call.  There's literally zero drawing involved.

That's why it helps to think of the Graphics class not as a drawing tool, but as a geometry building tool.

## Types of Primitives

Line
Circle
Rect
RoundRect
Ellipse
Arc
Bezier/Quadratic Curves
Star

GraphicsExtras
Torus
Funky rectangles
Regular Polygons

## The Geometry List

Inside every Graphics object is a GraphicsGeometry object.  The [PIXI.GraphicsGeometry]({{ site.data.links.api-graphicsgeometry }}) class manages the list of geometry primitives created by the Graphics parent object.  For the most part, you will not work directly with this object.  The owning Graphics object creates and manages it.  However, there are two related cases where you *do* work with the list.

First, you can re-use geometry from one Graphics object in another.  No matter whether you're re-drawing the same shape over and over, or re-using it as a hit test over and over, it's more efficient to share identical GraphicsGeometry.  You can do this like so:

```javascript
// Create a master graphics object
let template = new PIXI.Graphics();
// Add a circle
template.drawCircle(100, 100, 50);

// Create 5 duplicate objects
for (let i = 0; i < 5; i++) {
  // Initialize the duplicate using our template's pre-built geometry
  let duplicate = new PIXI.Graphics(template.geometry);
}
```

This leads to the second time you need to be aware of the underlying GraphicsGeometry object - avoiding memory leaks.  Because Graphics objects can share geometry, you *must* call `delete()` when you no longer need them.  Failure to do so will prevent the GraphicsGeometry object it owns from being properly de-referenced, and will lead to memory leaks.

## Graphics For Display

OK, so now that we've covered how the PIXI.Graphics class works, let's look at how you use it.  The most obvious use of a Graphics object is to draw dynamically generated shapes to the screen.

Doing so is simple.  Create the object, call the various builder functions to add your custom primitives, then add the object to the scene graph.  Each frame, the renderer will come along, ask the Graphics object to render itself, and each primitive, with associated line and fill styles, will be drawn to the screen.

## Graphics as a Mask

You can also use a Graphics object as a complex mask.  To do so, build your object and primitives as usual.  Next create a PIXI.Container object that will contain the masked content, and set its `mask` property to your Graphics object.  The children of the container will now be clipped to only show through inside the geometry you've created.  This technique works for both WebGL and Canvas-based rendering.

## Graphics as a Click Target

The third use for a Graphics object is as a hit test object for use in interactivity (handling click/touch events, etc).  Create your Graphics object and geometry, then take the object or container you want to be clickable and set its `hitArea` property to your new Graphics object.  The PIXI.Graphics class implements the `hitTest()` function based on the shapes in its geometry list.  

This technique is very useful in conjunction with masking or displaying, to allow you to make only the visible parts of your object clickable - rather than approximating the hit area with a rectangle or ellipse.

## Caveats and Gotchas

The PIXI.Graphics class is a complex beast, and so there are a number of things to be aware of when using it.

Memory Leaks
: The first has already been mentioned - call `destroy()` on any Graphics object you no longer need to avoid memory leaks.

Holes
: Holes you create have to be contained in the shape (TODO: primitive shapes not working on canvas?)

Changing Geometry
: If you want to change the shape of a Graphics object, you don't need to delete and recreate it.  Instead you can use the `clear()` function to reset the contents of the geometry list, then add new primitives as desired.  Be careful of performance.

Performance
: Generally good.  Prefer many smaller objects.  Complexity of graphic is key driver, once over a given threshhold, won't be batched, which can impact performance

Transparency
: Because the Graphics object renders its primitives sequentially, be careful when using blend modes or partial transparency with overlapping geometry.  Blend modes like ADD and MULTIPLY will work *on each primitive*, not on the final composite image.  Similarly, partially transparent Graphics objects will look wrong if your geometry primitives overlap.  Workaround: set filter = AlphaFilter, or use render texture

## Baking Into Texture

TODO: Advantages vs disadvantages of pre-rendering to a texture, using render texture: https://jsfiddle.net/bigtimebuddy/6tzyv91j/