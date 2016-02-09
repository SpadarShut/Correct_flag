(function () {

  function addCSS(CSS) {
    var styleEl = window.document.createElement('style');
    var styles  = window.document.createTextNode(CSS);
    styleEl.className = 'Correct Flag';
    styleEl.appendChild(styles);
    window.document.head && window.document.head.appendChild(styleEl);
  }

  function setFavicon(icon) {
    var faviconEl = document.querySelector('link[rel=icon]');

    if (!faviconEl) {
      faviconEl = document.createElement('link');
      faviconEl.setAttribute('rel', 'icon');
      document.head.appendChild(faviconEl);
    }
    faviconEl.setAttribute('href', icon );
  }

  chrome.runtime.sendMessage({'domain': location.host}, function(fixes){
    if (fixes && (fixes.css || fixes.favicon)) {
      window.addEventListener('DOMContentLoaded', function() {
        fixes.css && addCSS(fixes.css);
        fixes.favicon && setFavicon(fixes.favicon);
      })
    }
  });

})();
