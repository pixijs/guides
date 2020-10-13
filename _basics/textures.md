---
title: Textures
---
# Textures

We're slowly working our way down from the high level to the low.  We've talked about the scene graph, and in general about display objects that live in it.  We're about to get to sprites and other simple display objects.  But before we do, we need to talk about textures.

In PixiJS, textures are one of the core resources used by display objects.  A texture, broadly speaking, represents a set of pixels used to fill in a shape on the screen.  The simplest example is a sprite - a rectangle that is completely filled with a single texture.  But things can get much more complex.

## Life-cycle of a Texture

Let's examine how textures really work, by following the path your image data travels on its way to the screen.  

Here's the flow we're going to follow:  Source Image > Loader > Resource > BaseTexture > Texture

### Serving the Image

To start with, you have the image you want to display.  The first step is to make it available on your server.  This may seem obvious, but if you're coming to PixiJS from other game development systems, it's worth remembering that everything has to be loaded over the network.

### Loading the Image

To work with the image, the first step is to pull the image file from your webserver into the user's web browser.  To do this, we can use `PIXI.Texture.from()`, which works for quick demos, but in production you'll use the [PIXI.Loader]({{ site.data.links.api-loader }}) class.  A Loader  wraps and manages using an IMG element to tell the browser to fetch the image, and then notifies you when that has been completed.  This process is *asynchronous* - you request the load, then time passes, then an event fires to let you know the load is completed.  We'll go into the loader in a lot more depth in a later guide.

### Wrapping the Resource

Once the Loader has done its work, the loaded IMG element is wrapped in a [PIXI.ImageResource]({{ site.data.links.api-imageresource }}).  Resources are the internal objects that manage a raw pixel source.  They provide tools to take an IMG element, or VIDEO element, etc., and upload its pixel data to the WebGL system for rendering.  You won't work with them directly.

### Building a BaseTexture

Now that the system has a handle on the the raw data, it's time to build the real workhorse of the PixiJS texture system - the [PIXI.BaseTexture]({{ site.data.links.api-basetexture }}) object.  Each PIXI.BaseTexture manages a single resource, and allows PixiJS to use that image data in rendering.  It also manages settings that control how the texture data is rendered, such as the wrap mode and scale mode.

BaseTextures are automatically cached, so that calling `PIXI.Texture.from()` repeatedly for the same URL returns the same BaseTexture each time.

### Textures are a View on BaseTextures

Finally, we get to the PIXI.Texture class itself!  At this point, you may be wondering what the Texture object *does*.  After all, the Resource manages the raw data, the BaseTexture has all the settings and behavior.  And the answer is, it doesn't do very much.  Textures are light-weight views on an underlying BaseTexture.  Their main attribute is the source rectangle within the BaseTexture from which to pull.  

If all PixiJS drew were sprites, that would be pretty redundant.  But consider SpriteSheets.  A SpriteSheet is a single image that contains multiple sprite images arranged within.  In a PIXI.SpriteSheet object, a single BaseTexture is referenced by a set of Textures, one for each source image in the original sprite sheet.  By sharing a single BaseTexture, the browser only downloads one file, and our batching renderer can blaze through drawing sprites since they all share the same underlying pixel data.  The SpriteSheet's Textures pull out just the rectangle of pixels needed by each sprite.

[TODO: Image showing sprite sheet base texture, plus each sprite's texture]

That is why we have both Textures and BaseTextures - to allow sprite sheets, animations, button states, etc to be loaded as a single image, while only displaying the part of the master image that is needed.

## Loading Textures

We will discuss resource loading in a later guide, but one of the most common issues new users face when building a PixiJS project is how best to load their textures.  Using `PIXI.Texture.from()` as we do in our demo snippets will work, but will result in pop-in as each texture is loaded while your objects are already being rendered in the scene graph.

Instead, here's a quick cheat sheet of one good solution:

1. Show a loading image
2. Create a [PIXI.Loader]({{ site.data.links.api-loader }})
3. Run all texture-based objects, add their textures to the loader
4. Start the loader, and optionally update your loading image based on progress callbacks
5. On loader completion, run all objects and use `PIXI.Texture.from()` to pull the loaded textures out of the texture cache

Using this workflow ensures that your textures are pre-loaded, to prevent the pop-in, and is relatively easy to code.

One final advanced note - even after you've loaded your textures, the pixels still need to be pushed to the GPU and decoded.  Doing this for a large number of BaseTextures can be slow and cause lag spikes when your project first loads.  To solve this, you can use the [PIXI.Prepare]({{ site.data.links.api-prepare }}) plugin, which allows you to pre-load textures in a final step before displaying your project.

## Unloading Textures

TODO: clearTextureCache vs destroyTextureClass in PIXI.utils
