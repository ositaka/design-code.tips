---
template: blog-post
title: Custom Scrollbar with CSS (WebKit)
slug: custom-scrollbar-with-css-webkit
date: 2021-06-19 14:29
description: How to customise the Scrollbar with CSS (WebKit)
featuredImage: /assets/css.png
---

```CSS
::-webkit-scrollbar {
    width: .625rem;
}

::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 100);
}

::-webkit-scrollbar-track {
    background: rgba(241, 241, 241, 100);
}
```