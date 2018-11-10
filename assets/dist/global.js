"use strict";

/**
 * Global scripts
 */
(function (window) {
  var _this = this;

  var document = window.document,
      location = window.location;
  var qs = document.querySelector.bind(document);
  var qsa = document.querySelectorAll.bind(document);

  function loadStyle(href) {
    var linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.type = 'text/css';
    linkElement.href = href;
    document.head.appendChild(linkElement);
  }

  function loadScript(src, callback) {
    var scriptElement = document.createElement('script');
    scriptElement.src = src;
    callback && scriptElement.addEventListener('load', callback);
    document.body.appendChild(scriptElement);
  } // // cover
  // qs('.site-cover') || document.body.classList.add('no-cover')
  // search


  var searchElement = qs('#search_input');

  if (searchElement) {
    loadScript('https://unpkg.com/ghost-search/dist/ghost-search.js', function () {
      var resultElement = document.createElement('div');
      resultElement.id = 'search_result';
      resultElement.className = 'dropdown-menu dropdown-menu-right';
      resultElement.innerHTML = "<span class=\"dropdown-item disabled\">".concat(searchElement.placeholder, "...</span>");
      searchElement.parentElement.classList.add('dropdown');
      searchElement.parentElement.appendChild(resultElement);
      /* eslint-disable no-new */

      new window.GhostSearch({
        input: '#search_input',
        results: '#search_result',
        template: function template(item) {
          return "<a class=\"dropdown-item\" href=\"".concat(item.url, "\">").concat(item.title, "</a>");
        },
        api: {
          parameters: {
            fields: ['url', 'title']
          }
        },
        on: {
          afterDisplay: function afterDisplay(results) {
            if (results.total !== 0) return false;
            if (!searchElement.value) return false;
            resultElement.innerHTML = "<span class=\"dropdown-item disabled\">No results</span>";
          }
        }
      });
    });
  } // lazyload


  if (qs('.post-card [data-src]')) {
    loadScript('https://unpkg.com/vanilla-lazyload', function () {
      window.lazyloader = new window.LazyLoad({
        elements_selector: '.post-card [data-src]'
      });
    });
  } // prismjs loader


  var codeElements = qsa('.post-content pre code');

  if (codeElements.length) {
    // code card polyfill
    codeElements.forEach(function (item) {
      if (item.classList.length) return;
      item.classList.add('language-basic');
    });
    loadStyle('https://unpkg.com/prismjs/themes/prism-okaidia.css');
    loadScript('https://unpkg.com/prismjs/prism.js');
  } // gallery flex


  qsa('.kg-gallery-image img').forEach(function (item) {
    var container = item.closest('.kg-gallery-image');
    var width = item.attributes.width.value;
    var height = item.attributes.height.value;
    var ratio = width / height;
    container.style.flex = ratio + ' 1 0%';
  }); // gallery preview

  var galleryElements = qsa('.kg-gallery-container');

  if (galleryElements.length) {
    loadStyle('https://unpkg.com/lightgallery.js/dist/css/lightgallery.min.css');
    loadScript('https://unpkg.com/lightgallery.js/dist/js/lightgallery.js', function () {
      galleryElements.forEach(function (item) {
        item.querySelectorAll('.kg-gallery-image').forEach(function (sub) {
          sub.dataset.src = sub.children[0].src;
        });
        window.lightGallery(item, {
          selector: '.kg-gallery-image'
        });
      });
    });
  } // post share


  qsa('.post-share a').forEach(function (item) {
    return item.addEventListener('click', function (e) {
      window.open(_this.href, 'share-window', 'width=640,height=360');
      e.preventDefault();
    });
  }); // subscribe form hiddens

  qsa('input[name=location]').forEach(function (item) {
    item.value = item.value || location.href;
  });
  qsa('input[name=referrer]').forEach(function (item) {
    item.value = item.value || document.referrer;
  }); // site preloader

  var loader = qs('.site-preloader');

  if (loader) {
    // loader.addEventListener('transitionend', () => {
    //   loader.parentElement.removeChild(loader)
    // })
    loader.style.opacity = 0;
    setTimeout(function () {
      return loader.parentElement.removeChild(loader);
    }, 1000);
  }
})(window);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbC5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJkb2N1bWVudCIsImxvY2F0aW9uIiwicXMiLCJxdWVyeVNlbGVjdG9yIiwiYmluZCIsInFzYSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsb2FkU3R5bGUiLCJocmVmIiwibGlua0VsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwicmVsIiwidHlwZSIsImhlYWQiLCJhcHBlbmRDaGlsZCIsImxvYWRTY3JpcHQiLCJzcmMiLCJjYWxsYmFjayIsInNjcmlwdEVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiYm9keSIsInNlYXJjaEVsZW1lbnQiLCJyZXN1bHRFbGVtZW50IiwiaWQiLCJjbGFzc05hbWUiLCJpbm5lckhUTUwiLCJwbGFjZWhvbGRlciIsInBhcmVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJHaG9zdFNlYXJjaCIsImlucHV0IiwicmVzdWx0cyIsInRlbXBsYXRlIiwiaXRlbSIsInVybCIsInRpdGxlIiwiYXBpIiwicGFyYW1ldGVycyIsImZpZWxkcyIsIm9uIiwiYWZ0ZXJEaXNwbGF5IiwidG90YWwiLCJ2YWx1ZSIsImxhenlsb2FkZXIiLCJMYXp5TG9hZCIsImVsZW1lbnRzX3NlbGVjdG9yIiwiY29kZUVsZW1lbnRzIiwibGVuZ3RoIiwiZm9yRWFjaCIsImNvbnRhaW5lciIsImNsb3Nlc3QiLCJ3aWR0aCIsImF0dHJpYnV0ZXMiLCJoZWlnaHQiLCJyYXRpbyIsInN0eWxlIiwiZmxleCIsImdhbGxlcnlFbGVtZW50cyIsInN1YiIsImRhdGFzZXQiLCJjaGlsZHJlbiIsImxpZ2h0R2FsbGVyeSIsInNlbGVjdG9yIiwiZSIsIm9wZW4iLCJwcmV2ZW50RGVmYXVsdCIsInJlZmVycmVyIiwibG9hZGVyIiwib3BhY2l0eSIsInNldFRpbWVvdXQiLCJyZW1vdmVDaGlsZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0FBSUEsQ0FBQyxVQUFVQSxNQUFWLEVBQWtCO0FBQUE7O0FBQUEsTUFDVEMsUUFE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R0FBYVQsSUFBSSxDQUFDUyxLQUFMLElBQWMxQyxRQUFRLENBQUNPLElBQXBDO0FBQTBDLEdBQXhGO0FBQ0FILEVBQUFBLEdBQUcsQ0FBQyxzQkFBRCxDQUFILENBQTRCNEMsT0FBNUIsQ0FBb0MsVUFBQWYsSUFBSSxFQUFJO0FBQUVBLElBQUFBLElBQUksQ0FBQ1MsS0FBTCxHQUFhVCxJQUFJLENBQUNTLEtBQUwsSUFBYzNDLFFBQVEsQ0FBQ21FLFFBQXBDO0FBQThDLEdBQTVGLEVBNUdpQixDQThHakI7O0FBQ0EsTUFBTUMsTUFBTSxHQUFHbEUsRUFBRSxDQUFDLGlCQUFELENBQWpCOztBQUNBLE1BQUlrRSxNQUFKLEVBQVk7QUFDVjtBQUNBO0FBQ0E7QUFDQUEsSUFBQUEsTUFBTSxDQUFDWixLQUFQLENBQWFhLE9BQWIsR0FBdUIsQ0FBdkI7QUFDQUMsSUFBQUEsVUFBVSxDQUFDO0FBQUEsYUFBTUYsTUFBTSxDQUFDekMsYUFBUCxDQUFxQjRDLFdBQXJCLENBQWlDSCxNQUFqQyxDQUFOO0FBQUEsS0FBRCxFQUFpRCxJQUFqRCxDQUFWO0FBQ0Q7QUFDRixDQXZIRCxFQXVIR3JFLE1BdkhIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBHbG9iYWwgc2NyaXB0c1xuICovXG5cbihmdW5jdGlvbiAod2luZG93KSB7XG4gIGNvbnN0IHsgZG9jdW1lbnQsIGxvY2F0aW9uIH0gPSB3aW5kb3dcbiAgY29uc3QgcXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXG4gIGNvbnN0IHFzYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwuYmluZChkb2N1bWVudClcblxuICBmdW5jdGlvbiBsb2FkU3R5bGUgKGhyZWYpIHtcbiAgICBjb25zdCBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKVxuICAgIGxpbmtFbGVtZW50LnJlbCA9ICdzdHlsZXNoZWV0J1xuICAgIGxpbmtFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnXG4gICAgbGlua0VsZW1lbnQuaHJlZiA9IGhyZWZcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmtFbGVtZW50KVxuICB9XG5cbiAgZnVuY3Rpb24gbG9hZFNjcmlwdCAoc3JjLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHNjcmlwdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuICAgIHNjcmlwdEVsZW1lbnQuc3JjID0gc3JjXG4gICAgY2FsbGJhY2sgJiYgc2NyaXB0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgY2FsbGJhY2spXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHRFbGVtZW50KVxuICB9XG5cbiAgLy8gLy8gY292ZXJcbiAgLy8gcXMoJy5zaXRlLWNvdmVyJykgfHwgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCduby1jb3ZlcicpXG5cbiAgLy8gc2VhcmNoXG4gIGNvbnN0IHNlYXJjaEVsZW1lbnQgPSBxcygnI3NlYXJjaF9pbnB1dCcpXG4gIGlmIChzZWFyY2hFbGVtZW50KSB7XG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly91bnBrZy5jb20vZ2hvc3Qtc2VhcmNoL2Rpc3QvZ2hvc3Qtc2VhcmNoLmpzJywgKCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICByZXN1bHRFbGVtZW50LmlkID0gJ3NlYXJjaF9yZXN1bHQnXG4gICAgICByZXN1bHRFbGVtZW50LmNsYXNzTmFtZSA9ICdkcm9wZG93bi1tZW51IGRyb3Bkb3duLW1lbnUtcmlnaHQnXG4gICAgICByZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW0gZGlzYWJsZWRcIj4ke3NlYXJjaEVsZW1lbnQucGxhY2Vob2xkZXJ9Li4uPC9zcGFuPmBcbiAgICAgIHNlYXJjaEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkcm9wZG93bicpXG4gICAgICBzZWFyY2hFbGVtZW50LnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQocmVzdWx0RWxlbWVudClcblxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tbmV3ICovXG4gICAgICBuZXcgd2luZG93Lkdob3N0U2VhcmNoKHtcbiAgICAgICAgaW5wdXQ6ICcjc2VhcmNoX2lucHV0JyxcbiAgICAgICAgcmVzdWx0czogJyNzZWFyY2hfcmVzdWx0JyxcbiAgICAgICAgdGVtcGxhdGU6IGl0ZW0gPT4gYDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCIke2l0ZW0udXJsfVwiPiR7aXRlbS50aXRsZX08L2E+YCxcbiAgICAgICAgYXBpOiB7XG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgZmllbGRzOiBbJ3VybCcsICd0aXRsZSddXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbjoge1xuICAgICAgICAgIGFmdGVyRGlzcGxheTogcmVzdWx0cyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0cy50b3RhbCAhPT0gMCkgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBpZiAoIXNlYXJjaEVsZW1lbnQudmFsdWUpIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgcmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJkcm9wZG93bi1pdGVtIGRpc2FibGVkXCI+Tm8gcmVzdWx0czwvc3Bhbj5gXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvLyBsYXp5bG9hZFxuICBpZiAocXMoJy5wb3N0LWNhcmQgW2RhdGEtc3JjXScpKSB7XG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly91bnBrZy5jb20vdmFuaWxsYS1sYXp5bG9hZCcsICgpID0+IHtcbiAgICAgIHdpbmRvdy5sYXp5bG9hZGVyID0gbmV3IHdpbmRvdy5MYXp5TG9hZCh7XG4gICAgICAgIGVsZW1lbnRzX3NlbGVjdG9yOiAnLnBvc3QtY2FyZCBbZGF0YS1zcmNdJ1xuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLy8gcHJpc21qcyBsb2FkZXJcbiAgY29uc3QgY29kZUVsZW1lbnRzID0gcXNhKCcucG9zdC1jb250ZW50IHByZSBjb2RlJylcbiAgaWYgKGNvZGVFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAvLyBjb2RlIGNhcmQgcG9seWZpbGxcbiAgICBjb2RlRWxlbWVudHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLmNsYXNzTGlzdC5sZW5ndGgpIHJldHVyblxuICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdsYW5ndWFnZS1iYXNpYycpXG4gICAgfSlcblxuICAgIGxvYWRTdHlsZSgnaHR0cHM6Ly91bnBrZy5jb20vcHJpc21qcy90aGVtZXMvcHJpc20tb2thaWRpYS5jc3MnKVxuICAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vdW5wa2cuY29tL3ByaXNtanMvcHJpc20uanMnKVxuICB9XG5cbiAgLy8gZ2FsbGVyeSBmbGV4XG4gIHFzYSgnLmtnLWdhbGxlcnktaW1hZ2UgaW1nJykuZm9yRWFjaChpdGVtID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBpdGVtLmNsb3Nlc3QoJy5rZy1nYWxsZXJ5LWltYWdlJylcbiAgICBjb25zdCB3aWR0aCA9IGl0ZW0uYXR0cmlidXRlcy53aWR0aC52YWx1ZVxuICAgIGNvbnN0IGhlaWdodCA9IGl0ZW0uYXR0cmlidXRlcy5oZWlnaHQudmFsdWVcbiAgICBjb25zdCByYXRpbyA9IHdpZHRoIC8gaGVpZ2h0XG4gICAgY29udGFpbmVyLnN0eWxlLmZsZXggPSByYXRpbyArICcgMSAwJSdcbiAgfSlcblxuICAvLyBnYWxsZXJ5IHByZXZpZXdcbiAgY29uc3QgZ2FsbGVyeUVsZW1lbnRzID0gcXNhKCcua2ctZ2FsbGVyeS1jb250YWluZXInKVxuICBpZiAoZ2FsbGVyeUVsZW1lbnRzLmxlbmd0aCkge1xuICAgIGxvYWRTdHlsZSgnaHR0cHM6Ly91bnBrZy5jb20vbGlnaHRnYWxsZXJ5LmpzL2Rpc3QvY3NzL2xpZ2h0Z2FsbGVyeS5taW4uY3NzJylcbiAgICBsb2FkU2NyaXB0KCdodHRwczovL3VucGtnLmNvbS9saWdodGdhbGxlcnkuanMvZGlzdC9qcy9saWdodGdhbGxlcnkuanMnLCAoKSA9PiB7XG4gICAgICBnYWxsZXJ5RWxlbWVudHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5xdWVyeVNlbGVjdG9yQWxsKCcua2ctZ2FsbGVyeS1pbWFnZScpLmZvckVhY2goc3ViID0+IHtcbiAgICAgICAgICBzdWIuZGF0YXNldC5zcmMgPSBzdWIuY2hpbGRyZW5bMF0uc3JjXG4gICAgICAgIH0pXG4gICAgICAgIHdpbmRvdy5saWdodEdhbGxlcnkoaXRlbSwgeyBzZWxlY3RvcjogJy5rZy1nYWxsZXJ5LWltYWdlJyB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLy8gcG9zdCBzaGFyZVxuICBxc2EoJy5wb3N0LXNoYXJlIGEnKS5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgIHdpbmRvdy5vcGVuKHRoaXMuaHJlZiwgJ3NoYXJlLXdpbmRvdycsICd3aWR0aD02NDAsaGVpZ2h0PTM2MCcpXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIH0pKVxuXG4gIC8vIHN1YnNjcmliZSBmb3JtIGhpZGRlbnNcbiAgcXNhKCdpbnB1dFtuYW1lPWxvY2F0aW9uXScpLmZvckVhY2goaXRlbSA9PiB7IGl0ZW0udmFsdWUgPSBpdGVtLnZhbHVlIHx8IGxvY2F0aW9uLmhyZWYgfSlcbiAgcXNhKCdpbnB1dFtuYW1lPXJlZmVycmVyXScpLmZvckVhY2goaXRlbSA9PiB7IGl0ZW0udmFsdWUgPSBpdGVtLnZhbHVlIHx8IGRvY3VtZW50LnJlZmVycmVyIH0pXG5cbiAgLy8gc2l0ZSBwcmVsb2FkZXJcbiAgY29uc3QgbG9hZGVyID0gcXMoJy5zaXRlLXByZWxvYWRlcicpXG4gIGlmIChsb2FkZXIpIHtcbiAgICAvLyBsb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsICgpID0+IHtcbiAgICAvLyAgIGxvYWRlci5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGxvYWRlcilcbiAgICAvLyB9KVxuICAgIGxvYWRlci5zdHlsZS5vcGFjaXR5ID0gMFxuICAgIHNldFRpbWVvdXQoKCkgPT4gbG9hZGVyLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQobG9hZGVyKSwgMTAwMClcbiAgfVxufSkod2luZG93KVxuIl0sImZpbGUiOiJnbG9iYWwuanMifQ==
