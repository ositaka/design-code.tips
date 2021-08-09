---
template: blog-post
title: How to add an intro to website with JS
slug: how-to-add-an-intro-with-js
date: 2021-08-09 14:55
description: How to add an intro to website with JS
featuredImage: /assets/js.png
---
I am using a `sessionStorage` item to set a cookie, in case the intro has been already played or in case you are not visiting the `home` page.

```js
<!-- intro -->
<div id="intro__placeholder"></div>

<script>
    setTimeout(() => {
        sessionStorage.setItem("intro_shown", "yes");
    }, 10000);
    
    const home = document.querySelector(".home");
    const intro = document.querySelector(".intro");
    const introKey = sessionStorage.getItem("intro_shown");
    
    if (introKey === null || home) {
        document.getElementById("intro__placeholder").innerHTML = '<style>Your CSS here</style><div class="intro">Your HTML code here</div>';
    }
</script>
```