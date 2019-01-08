/*!
 * creative v0.1.0-alpha.0 (https://github.com/zce/creative#readme)
 * Copyright 2019 zce <w@zce.me> (https://zce.me)
 * Licensed under MIT
 */"use strict";var setup=function(){var e=document.querySelector.bind(document),n=document.querySelectorAll.bind(document);function t(e,n){var t=document.createElement("script");t.src=e,n&&t.addEventListener("load",n),document.body.appendChild(t)}var o=e("#search_input");o&&t("https://unpkg.com/ghost-search",function(){var n=document.createElement("div");n.id="search_result",n.className="dropdown-menu dropdown-menu-right",n.innerHTML='<span class="dropdown-item disabled">'.concat(o.placeholder,"</span>"),o.parentElement.classList.add("dropdown"),o.parentElement.appendChild(n),new window.GhostSearch({input:"#search_input",results:"#search_result",template:function(e){return'<a class="dropdown-item" href="'.concat(e.url,'">').concat(e.title,"</a>")},api:{parameters:{fields:["url","title"]}},on:{afterDisplay:function(e){return 0===e.total&&(!!o.value&&void(n.innerHTML='<span class="dropdown-item disabled">'.concat(o.dataset.empty,"</span>")))}}})}),e(".post-card [data-src]")&&t("https://unpkg.com/vanilla-lazyload@8.17.0/dist/lazyload.min.js",function(){window.lazyloader=new window.LazyLoad({elements_selector:".post-card [data-src]"})}),n(".post-content pre code").length&&t("https://unpkg.com/prismjs@1.15.0/prism.js"),n(".kg-gallery-image > img").forEach(function(e){var n=e.closest(".kg-gallery-image"),t=e.attributes.width.value/e.attributes.height.value;n.style.flex=t+" 1 0%"}),n(".kg-gallery-container").length&&t("https://unpkg.com/medium-zoom@1.0.2/dist/medium-zoom.min.js",function(){window.mediumZoom(".kg-gallery-image > img",{margin:20,background:"#000"})}),n(".post-share a").forEach(function(e){return e.addEventListener("click",function(e){var n=void 0!==window.screenLeft?window.screenLeft:window.screenX,t=void 0!==window.screenTop?window.screenTop:window.screenY,o=(window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:window.screen.width)/2-320+n,i=(window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:window.screen.height)/2-200+t,r=window.open(e.currentTarget.href,"share-window","scrollbars=yes, width=".concat(640,", height=").concat(400,", top=").concat(i,", left=").concat(o));window.focus&&r.focus(),e.preventDefault()})}),n("input[name=location]").forEach(function(e){e.value=e.value||window.location.href}),n("input[name=referrer]").forEach(function(e){e.value=e.value||document.referrer});var i=e(".site-spinner");i&&(i.style.opacity=0,setTimeout(function(){return i.parentElement.removeChild(i)},500))};window.addEventListener("load",setup);