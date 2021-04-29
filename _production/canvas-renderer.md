# PixiJS Guides
## Rendering with Canvas


What is it
Why use it
What's missing vs regular renderer
How to enable it


Although WebGL is now widely available, https://caniuse.com/#feat=webgl - canvas rendering may still be useful as a fallback via the pixi-legacy package. Browsers each have their own ‘blacklist’ of GPUs, and ‘blacklist’ of certain driver versions that power them. Sometimes certain hardware features get disabled for a browser, which means the browser may report a ‘major performance caveat’ and render very slowly (worked around via https://pixijs.download/dev/docs/PIXI.settings.html#.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT). It’s not common, and usually only for older devices, but sometimes WebGL is just disabled altogether. If it’s important to support the widest available list of devices, canvas support ensures you can reach _everyone_. If you have canvas support in place, then  if you find your own issues with a certain device, you can direct them to the canvas version manually via the ‘forceCanvas’ setting. https://pixijs.download/dev/docs/PIXI.Application.html

For the most part, everything ‘just works’, so supporting the Canvas rendered usually isn’t much of an extra burden. However, there is no sprite masking support (use Graphic masks instead) and no filters (no fallback for this).

Be wary of ‘tint’ usage - it’s almost ‘free’ in the way WebGL handles it, but for Canvas it creates a new tinted canvas internally. For one off tinting to and from a certain value, it’ll be fine, but if rapidly changing tints may cause performance issues.

I advise limiting base textures to 2048x2048, and limit rendering of the canvas to a max of this resolution too. For my games, the canvas render means “I don’t mind that it doesn’t look brilliant, I just want to guarantee it works”.
