---
title: Interaction
---
# Interaction

PixiJS is primarily a rendering system, but it also includes support for interactivity.  Adding support for mouse and touch events to your project is simple and consistent. 

## Enabling Interaction

Any DisplayObject-derived object (Sprites, Containers, etc.) can become interactive simply by setting its ```interactive``` property to true.  Doing so will cause the object to emit interaction events that can be responded to in order to drive your project's behavior.

## Hit Testing

DisplayObject.hitArea - customize what's clickable
Interaction.hitTest - find the interactive object at a point

## Interaction is Events


## Use Pointer Events

PixiJS supports three types of interaction events - mouse, touch and pointer.  Mouse events are fired by mouse movement, clicks etc.  Touch events are fired for touch-capable devices.  And pointer events are fired for _both_.

## Optimization



## Caveats

It's not the DOM:
- no bubbling
- no capture