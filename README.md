Right now, all this extension does is listen for timeline panel events and console.logs the paint durations per frame.

## Goal
- Discover what CSS properties are contributing to long paint times.

This is a 'paint time' chrome extension inspired by [this comment](http://updates.html5rocks.com/2013/02/Profiling-Long-Paint-Times-with-DevTools-Continuous-Painting-Mode#comment-805190745).

This repo is unlikely to be commited to regularly by myself, it exists mainly to serve as inspiration to other developers and/or developer tools committers. Ideally, this would be handled in developer tools itself rather than having to install a custom extension.

### TODO
- Find a way to continuiously repaint the page in JavaScript, the current "Enable continuous page repainting" in Developer Tools seems to handle this in [C++](https://github.com/WebKit/webkit/blob/7c79f6f8f1f145871068894db8d0903351c55f28/Source/WebCore/inspector/InspectorPageAgent.cpp#L778). If the Remote Debugging Protocol made this available, that would even better and eliminate the need to repaint in JavaScript.
- Find a smart way to get user defined CSS on elements possibly through `document.styleSheets`. Should there be a whitelist of likely poor performing properties? E.g. `['boxShadow', 'borderRadius']` whose properties are toggled to their defaults? This avoids toggling every single property (which could be a lot) if a reset.css was used for example.
- How can we reset a style to its default? Use the [user agent stylesheet](https://github.com/WebKit/webkit/blob/e7c35fc5ddbfd060ab47b7da7e8f242277f6f897/Source/WebCore/css/html.css)? Alternatively, `document.styleSheets[0].rules[0].style.color = null` seems to work.