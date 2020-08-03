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

Bob
: This is a bob

Jim
: We don't like jim

Help!
: I need help on this stuff :-)

For advanced users looking for more information about the various parts of the system, and how to modify and extend them, check out the [PixiJS Core guide](pixijs-core.md)
