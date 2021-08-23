---
template: blog-post
title: How to scale a SVG with CSS only
slug: how-to-scale-a-svg-with-css-only
date: 2021-08-23 12:25
description: Learn how to automatically scale a SVG with CSS.
featuredImage: /assets/css.png
---
In this post you can see how easy is to scale a SVG with CSS only.

You have to set a class on your HTML and just add the `viewBox` attribute on the `<svg>` element, like so:

```html
<div class="scaling-svg">
  <svg viewBox="0 0 60 55">
    <path d="M30,50 C45,50 55,45 55,35  
             Q 55,27 50,25 C55,22 53,15 45,20
             S 23,25 15,20 S5,22 10,25
             Q 5,27 5,35 C5,45 15,50 30,50Z"
          />
  </svg>
</div>
```

Then add the respective CSS for the HTML class:

```CSS
.scaling-svg {
  position: relative; 
  height:0; 
  width: 100%; 
  padding: 0;
  padding-bottom: 100%; 
}
```


##Here is the result!
(you can resize your browser's window to see the magic happening)

<iframe src="https://codepen.io/ositaka/full/MWmwWeP" frameborder="0" allowfullscreen="false" width="100%" height="600px"> </iframe>