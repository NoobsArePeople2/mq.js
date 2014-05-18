# mq.js
## A helper for styling responsive pages.

mq.js adds an overlay to the bottom of your HTML pages so you can see which media query is being applied to your page.

Using media queries to develop responsive designs is a great technique for achieving sites that "just work" on whatever devices your visitors happen to use but one of the costs is increased complexity for you, the developer. Implementing a responsive design is a lot of work and sometimes it's not clear which media query is currently being applied. Sure, you can inspect the page size and then compare that to the media queries in your styles but wouldn't it just be a whole lot nicer if your page told you which query is was using? That's what mq.js does for you: just set up your queries, drop it into your dev site and let it make your life just a smidge easier.

## Usage

There are two files that you must add for mq.js to function properly. Depending on how you roll you may want to use a third.

1. Add the `mq.css` file to the `head` of your page. These are the styles for the overlay.
2. Add the `mq.js` file to your page. You can add this to `head` or at the end of `body`, whichever you prefer. This adds the overlay to your page.

At this point when you load up your page you'll see the mq.js overlay fixed to the bottom. This brings us to the sorta crappy part of mq.js's setup (which you only need to do once fortunately). In order for your styles to tell mq.js about themselves we have to create some media queries. These are going to take the form:

```css
@media your-media-query-here {
    #mq-media:after {
        content: "text describing your media query";
    }
}
```

A concrete example:

```css
@media only screen and (max-width: 320px) {
    #mq-media:after {
        content: "max-width: 320px";
    }
}
```

You'll need to make a media query like this for each query in your styles. You can add these queries to `mq.css`, create a new CSS file for them, or simply add them to your existing styles. I'd recommend putting in `mq.css` to keep down on clutter in your project and to keep dev-only stuff from getting into production, but do whatever makes sense for you.

## Demo

For a complete working demo vist [this page](http://seanmonahan.org/labs/mqjs/demo/).

If you want to use for reference you can also [download it as a zip](https://dl.dropboxusercontent.com/u/63411579/seanmonahan.org/labs/mqjs/demo/mqjs-demo.zip).

## Dependencies

None! Well, I suppose you need a browser that supports media queries but you probably wouldn't be looking at this if that were an issue.

## Supported Browsers

Any browser that [supports media queries](http://caniuse.com/#feat=css-mediaqueries). More specifically that would be:

- IE9+
- Chrome
- Firefox
- Safari
- Opera

## Bugs to Reports? Features to Request?

[Open an issue](https://github.com/NoobsArePeople2/mq.js/issues).

## License

mq.js is licensed under the MIT license.