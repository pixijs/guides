# PixiJS Guides
## Debugging Your Project

* Fps - https://github.com/mrdoob/stats.js - Or PixiJS integration for draw calls and textures used: https://github.com/eXponenta/gstatsjs
Easy way to see the frame rate of the game as an overlay
* Gstats shows draw calls - and at a basic level, the more draw calls made, the more rendering time is required. 1 draw call can draw multiple things… but only if from a texture in a gpu texture unit. So keep drawing from a smaller pool of base textures, and render performance is improved.
Viewing and debugging render tree - https://github.com/bfanger/pixi-inspector / https://chrome.google.com/webstore/detail/pixijs-devtools/aamddddknhcagpehecnhphigffljadon . Very useful for many reasons.
Useful to visually see the parent / child relationships, and thus understand the rendering order.
Able to easily change visual properties on the fly, which can be useful for designers!
If you have performance issues in a scene, it’s easy to find containers and turn visibility on and off. You may be able to find a certain one that is dragging performance down, which helps you narrow down where an optimisation could be made.
Take a snapshot of raw WebGL calls being made - https://chrome.google.com/webstore/detail/spectorjs/denbgaamihkadbghdceggmchnflmhpmk?hl=en -
Very useful to understand how a scene is built up, from the commands made to build each layer.
At a very rough level ‘bind’ calls and ‘draw’ calls are slow.

Learn how to use dev tools to analyse performance - https://developers.google.com/web/tools/chrome-devtools/evaluate-performance
If a scene has performance issues, it’s usually either limited by cpu performance, or gpu performance.
