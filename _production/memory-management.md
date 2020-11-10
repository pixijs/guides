---
title: Memory Management
---
# Memory Management


GPU memory usage in mb can be roughly calculated by (baseTexture.realWidth * baseTexture.realHeight * 4) / 1024 / 1024. 
Therefore, it’s base textures that are ‘heavy’ and need to be worried about; textures are ‘light’ and essentially just rectangles mapping onto base textures. So take a look at PIXI.utils.BaseTextureCache to see what is there.

Use different asset resolutions to help performance on different levels of device. It’s one of the easiest wins.

When a texture needs to be used by the GPU, it is uploaded from RAM to the GPU. This is an intensive operation and can harm the fps if too much uploading is done in a single frame.
You can manually upload a texture via the upload plugin -  `renderer.plugins.prepare.upload( container ). You can upload just a base texture to upload the the GPU, for example, after it has loaded via the loader, or you could upload a container, and all base textures for sprites within it are searched for and uploaded.

By default, PixiJS will periodically check to see if each uploaded base texture is still being used (PIXI.settings.GC_MODE). By default, it does this check every minute (PIXI.settings.GC_MAX_CHECK_COUNT) and removes base textures from the GPU that haven’t been used in the last 5 minutes (PIXI.settings.GC_MAX_IDLE).

This default setting is good in most circumstances, as it’s removing unused textures from the GPU, leaving room for new ones that are required. However, in certain circumstances, you may want to take control of this yourself via PIXI.settings.GC_MODE = PIXI.GC_MODES.MANUAL. You have large base textures rarely used, but when they are used you want to guarantee they render without any hiccups. You can always manually unload an individual base texture via renderertextureManager.destroyTexture(baseTexture), or a container and it’s children via renderer.textureGC.unload(container). If you have a very large application, like a game, with many game screens, then it might be a good strategy to manage texture manually; unload old textures that are no longer required, then load new textures in via a loading screen, also uploading them to the GPU at the end of the loading screen.
