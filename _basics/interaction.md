---
title: Interaction
---
# Interaction

PixiJS is primarily a rendering system, but it also includes support for interactivity.  Adding support for mouse and touch events to your project is simple and consistent. 

## Enabling Interaction

Any DisplayObject-derived object (Sprites, Containers, etc.) can become interactive simply by setting its ```interactive``` property to true.  Doing so will cause the object to emit interaction events that can be responded to in order to drive your project's behavior.

## Interaction is Events



## Use Pointer Events

PixiJS supports three types of interaction events - mouse, touch and pointer.  Mouse events are fired by mouse movement, clicks etc.  Touch events are fired for touch-capable devices.  And pointer events are fired for _both_.

What this means is that, in many cases, you can write your project to use pointer events and it will just work when used with _either_ mouse or touch input.  Given that, the only reason to use non-pointer events is to support different modes of operation based on input type or to support multi-touch interaction.  In all other cases, prefer pointer events.

## Hit Testing

DisplayObject.hitArea - customize what's clickable
Interaction.hitTest - find the interactive object at a point

## Optimization

Hit testing requires walking the full object tree, which in complex projects can become an optimization issue.  To mitigate this issue, PixiJS Container-derived objects have a property named `interactiveChildren`.  If you have Containers or other objects with complex child trees that you know will never be interactive, you can set this property to `true` and the hit testing algorithm will skip those children when checking for hover and click events.  As an example, if you were building a side-scrolling game, you would probably want to set `background.interactiveChildren = false` for your background layer with rocks, clouds, flowers, etc.  Doing so would speed up hit testing substantially due to the number of unclickable child objects the background layer would contain.

## Caveats

PixiJS's interaction system has been designed to look similar to the interaction events supported by the DOM in web development, but there are some important differences that can trip up users new to PixiJS.

First, events in PixiJS do not "bubble", meaning you cannot set an event trigger on a parent object and have it fire when a child object is clicked.  If you want to support bubbling, you'll need to re-trigger the parent object's events in your child object's code.  

Second, there is no event capture support - you can't have a single object capture all interaction events while dragging, for example.
