---
title: Architecture Overview
---
# Architecture Overview

OK, now that you've gotten a feel for how easy it is to build a PixiJS application, let's get into the specifics.  For the rest of the Basics section, we're going to work from the high level down to the details.  We'll start with an overview of how PixiJS is put together.

## The Code

Before we get into how the code is layed out, let's talk about where it lives.  PixiJS is an open source product hosted on [GitHub]({{ site.data.links.pixi-github }}).  Like any GitHub repo, you can browse and download the raw source files for each PixiJS class, as well as search existing issues & bugs, and even submit your own.  PixiJS is written in a JavaScript variant called [TypeScript]({{ site.data.links.tool-typescript }}), which enables type-checking in JavaScript via a pre-compile step.  (If you're interested in using PixiJS in a TypeScript-based project, check out the guide on [Working with Bundlers](working-with-bundlers.md).)

## The Components

PixiJS is a modular rendering engine.  Each task required for generating, updating and displaying content is broken out into its own component.  Not only does this make the code cleaner, it allows for greater extensibility.  Additionally, with the use of the [PixiJS Customize tool]({{ site.data.links.pixi-customize }}), it's possible to build a custom PixiJS file containing only the subset of features your project needs, saving download size.

Here's a list of the major components that make up PixiJS.  Note that this list isn't exhaustive.  Additionally, don't worry too much about how each component works.  The goal here is to give you a feel for what's under the hood as we start exploring the engine.

### Major Components:

Scene Graph
: The scene graph is the tree of renderable objects to be displayed.

Renderer
: The core of the PixiJS system is the renderer, which runs the scene graph and draws it to the screen.  PixiJS supports two renderers that can be used more-or-less interchangeably: a WebGL-based renderer which is faster and supports all PixiJS features, and a Canvas-based renderer which is compatible with older hardware and software, but cannot use advanced features like filters.  (For more information about the various parts of the renderer, and how to modify and extend them, check out the [PixiJS Core guide](pixijs-core.md).)

Loader
: The loader system provides tools for asynchronously loading resources such as images, fonts and audio files.

Ticker
: Tickers provide periodic callbacks based on a clock.  Your game update logic will generally be run in response to a tick once per frame.  You can have multiple tickers in use at one time.

InteractionManager
: PixiJS supports both touch and mouse-based interaction - making objects clickable, firing hover events, etc.  The InteractionManager provides the services under the hood required to capture and process these events.

Application
: The Application is a helper that wraps a loader, ticker and renderer into a single easy-to-use object.  Great for prototyping and learning, but you will likely want to build your own application equivalent in production.


