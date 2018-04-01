
/**
 *  Logic:
 *  - BG script knows all domains to work on: it can replace images using
 *   webRequest API and compile css to be injected in pages.
 *  - Injected script on document start sends a msg to BG for css and favicons, and on
 *   DOMContentLoaded injects it
 *
 * BG:
 *  - sets up url filters
 *  - listens for messages from pages
 *  - on message: see domain, pick CSS from dzieShto, send response
 *
 *
 *  INJECTED:
 *  - on doc_start send msg for css
 *  - on DOMContentLoaded inject response
 *
 * */


var Sciah = function() {

  var self = this;
  self.dzieShto = [];

  function res (file) {
    if (chrome && chrome.extension && chrome.extension.getURL) {
      return chrome.extension.getURL('res/'+ file );
    }
    else {
      return '../res/' + file;
    }
  }

  /**
   * Return flag as a CSS background-image property
   * @param params Params that get passed to the flagURL function
   * @param important boolean Appends !important to the rule if it is true
   * @returns {string}
   */
  flagBGI = (params, important) =>
    `background-image: url("${flagURL(params)}") ${ important ? '!important' : '' };`;

  /**
   *
   * @param params
   *   Parameters for the generated image. If it's a string - it will be passed on as the URL of new image.
   *   If params is an object it will be passed to getSVGFlagURL to generate a necessary image.
   * @returns {string}
   */
  function flagURL (params) {
    var newImg = '';

    if (params && params.replacer) {
      newImg = params.replacer;
    }
    else {
      newImg = getSVGFlagURL(params);
    }

    return newImg;
  }


  /**
   * @param img Object Parameters for the replacer image
   *
   * img properties:
   *
   * @property {number} img.w
   * @property {number} img.h
   * @property {number} img.r
   * @property {number} img.canvasW
   * @property {number} img.canvasH
   * @property {number|string} img.outline
   * @property {boolean} img.gradient
   * @property {boolean|number} img.emboss
   * @property {string} img.red
   *
   * @returns {string}
   */
  function getSVGFlagURL (img) {
    img = img || { w: 'auto'};
    img.w = img.w || 32; // default image width
    img.h = img.h || 16; // default image height


//<filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">\n\
//<feGaussianBlur id="shadowBlur" result="blurOut" in="offOut" stdDeviation="30"/>\n\
//<feOffset id="shadowOffset" result="offOut" in="SourceAlpha" dx="10" dy="20"/>\n\
//<feBlend in="SourceAlpha" in2="blurOut" mode="normal"/>\n\
//<feFlood id="shadowColor" flood-color="#000" flood-opacity="100"/>\n\
//<feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur"/>\n\
//</filter>\n\

    var flagTpl = `
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <clipPath id="clip">
        <rect id="clipRect" class="shape" fill="none" width="100%" height="100%" rx="0"/>
      </clipPath>
      <radialGradient gradientUnits="objectBoundingBox" id="gradient-simple" fx="22%" fy="14%" r="80%">
        <stop offset="0" style="stop-color: #000; stop-opacity:0"/>
        <stop offset="0.2" style="stop-color: #000; stop-opacity:0"/>
        <stop offset="0.6" style="stop-color: #000; stop-opacity:0.06"/>
        <stop offset="1" style="stop-color: #000; stop-opacity:0.10"/>
      </radialGradient>
      <linearGradient id="gradient-wave" gradientUnits="objectBoundingBox" x1="0" y1="0" y2="0">
        <stop offset="0"    style="stop-color: #000; stop-opacity:0.15"/>
        <stop offset="0.21" style="stop-color: #000; stop-opacity:0"/>
        <stop offset="0.26" style="stop-color: #000; stop-opacity:0"/>
        <stop offset="0.48" style="stop-color: #000; stop-opacity:0.15"/>
        <stop offset="0.76" style="stop-color: #000; stop-opacity:0"/>
        <stop offset="0.79" style="stop-color: #000; stop-opacity:0"/>
        <stop offset="0.96" style="stop-color: #000; stop-opacity:0.15"/>
      </linearGradient>
      <rect id="canvasBg" width="100%" height="100%" fill="none"></rect>
      <g id="flag">
        <g id="flagBase" clip-path="url(#clip)">
          <rect id="white" class="shape" fill="#fff" width="100%" height="100%"/>
          <rect id="red" fill="#E21313" y="33.3333333%" width="100%" height="33.3333333%"/>
          <line id="emboss" opacity="0.18" stroke-width="4" stroke="#fff" x1="0" y1="0" x2="0" y2="100%" vector-effect="non-scaling-stroke"/>
          <rect id="outline" class="shape" opacity="0.1" stroke-width="2" stroke="#000" fill="none" width="100%" height="100%" vector-effect="non-scaling-stroke"/>
          <rect id="overlayGradient" class="shape" fill="none" width="100%" height="100%"></rect>
        </g>
      </g>
    </svg>
    `;

    var SVGParent = window.document.createElement('div');
    SVGParent.innerHTML = flagTpl;
    var SVG = SVGParent.firstElementChild;
    var clipRect = SVG.querySelector('#clipRect');
    var flag = SVG.querySelector('#flag');
    var flagBase = SVG.querySelector('#flagBase');
    var canvasBg = SVG.querySelector('#canvasBg');
    var shadowOffset = SVG.querySelector('#shadowOffset');
    var shadowBlur = SVG.querySelector('#shadowBlur');
    var white = SVG.querySelector('#white');
    var red = SVG.querySelector('#red');
    var emboss = SVG.querySelector('#emboss');
    var gradientSimple = SVG.querySelector('#gradient-simple');
    var gradientWave = SVG.querySelector('#gradient-wave');
    var outline = SVG.querySelector('#outline');
    var overlayGradient = SVG.querySelector('#overlayGradient');
    var shape = SVG.getElementsByClassName('shape');

    // Set size
    // --------
    if (img.w === 'auto') {
      // stretch to full width
      SVG.setAttribute('viewBox', '0 0 32 16');
      SVG.setAttribute('width', '100%');
    }
    else {
      // set dimensions if needed
      SVG.setAttribute('viewBox', '0 0 ' + img.w + ' ' + img.h);
      SVG.setAttribute( 'width', img.w);
      SVG.setAttribute( 'height', img.h);
    }

    // Offset flag on canvas
    // ---------------------
    if (img.canvasW && img.canvasH && img.w && img.h) {

      [].forEach.call(shape, function(el){
        el.setAttribute( 'width', img.w);
        el.setAttribute( 'height', img.h);
      });

      red.setAttribute('width', img.w);
      red.setAttribute('height', img.h / 3);
      red.setAttribute('y', img.h / 3);

      // center flag on canvas
      flag.setAttribute('transform', 'translate(' + (img.canvasW - img.w) / 2  + ',' + (img.canvasH - img.h) / 2  + ')');

      SVG.setAttribute('viewBox', '0 0 ' + img.canvasW + ' ' + img.canvasH);
      SVG.setAttribute( 'width', img.canvasW);
      SVG.setAttribute( 'height', img.canvasH);
    }
    else {
      canvasBg.remove();
    }

    // Set flag drop shadow
    // ------------------------
    //if (img.shadowX || img.shadowY || img.shadowBlur) {
    //
    //  //if (img.shadowX !== undefined) {
    //  //  shadowOffset.setAttribute('dx', img.shadowX);
    //  //}
    //  //if (img.shadowY !== undefined) {
    //  //  shadowOffset.setAttribute('dy', img.shadowY);
    //  //}
    //  if (img.shadowBlur !== undefined) {
    //    shadowBlur.setAttribute('stdDeviation', img.shadowBlur);
    //  }
    //  flag.setAttribute('filter', 'url("#shadow")');
    //}
    //else {
    //  // remove filter from DOM
    //}

    // Set flag radius
    // ---------------
    if (img.r) {
      [].forEach.call(shape, function(el){
        el.setAttribute('rx', img.r);
      });
    }

    // Set outline darkness
    // --------------------
    if (img.hasOwnProperty('outline')) {
      if (img.outline === 'none') {
        outline.style.display = 'none';
      }
      if (typeof img.outline === 'number') {
        outline.setAttribute('opacity', img.outline);
      }
      if (typeof img.outline === 'string') {
        outline.setAttribute('opacity', 1);
        outline.setAttribute('stroke', img.outline);
      }
    }

    // Show/hide gradient
    // ------------------
    if (!img.gradient){
      gradientSimple.remove();
      gradientWave.remove();
    }
    else if (img.gradient === true || img.gradient === 'simple') {
      overlayGradient.setAttribute('fill', 'url(#gradient-simple)');
      gradientWave.remove();
    }
    else if (img.gradient === 'wave'){
      var deg = 25;

      function toRadians (angle) {
        return angle * (Math.PI / 180);
      }
      var gX2 = (Math.cos(toRadians(90 - deg)) * img.h + Math.cos( toRadians(deg) ) * img.w) / img.w;

      gradientWave.setAttribute('gradientTransform', 'rotate('+ deg +')');
      gradientWave.setAttribute('x2', gX2);
      overlayGradient.setAttribute('fill', 'url(#gradient-wave)');
      gradientSimple.remove();
    }

    // Emboss effect
    // -------------
    if (img.emboss === false || img.emboss === 0) {
      emboss.setAttribute('opacity', 0);
    }
    else if (typeof img.emboss === 'number') {
      emboss.setAttribute('opacity', img.emboss);
    }

    // Set red color
    // -------------
    if (img.red) {
      red.setAttribute('fill', img.red);
    }
    if (img.white) {
      white.setAttribute('fill', img.white);
    }

    if ( img.gradient === true ) {
      //console.log(SVG.outerHTML);
    }

    return 'data:image/svg+xml,' + encodeURIComponent(SVG.outerHTML);
  }

  function setupFilters (dzieShto){

    var il = dzieShto.length;
    var completed = 0;
    for (var i = 0, site; i < il, site = dzieShto[i]; i++ ) {

      if (site.sample) {completed ++ }

      if (site.images) {

        site.images.forEach(function (img) {

          // turn image into URL pattern if it's not a URL already
          img.globs = [];

          // if it's filename without protocol
          if (img.i.indexOf('://') === -1) {
            img.globs.push('*://'+ site.addr +'/*' + img.i + '*');
            img.globs.push('*://*.'+ site.addr +'/*' + img.i + '*'); // www and subdomains
          }
          // if it's a glob or url
          else {
            img.globs.push(img.i);
          }

          //onBeforeRequest || onBeforeSendHeaders
          chrome.webRequest.onBeforeRequest.addListener(
              function() {
                var url = flagURL(img);
                return {redirectUrl: url}
              },
              {types: ['image'], urls: img.globs },
              ['blocking']
          );
        });
      }
    }
    //console.log('DONE ' + completed + ' of ' + il +', ' + completed/il*100 + '%');
  }

  function serveFixes (dzieShto) {
    // Listen for CSS requests
    chrome.runtime.onMessage.addListener(
        function(message, sender, cb) {
          if (typeof message === 'object' && message.domain) {
            var css = '';
            var favicon = '';
            dzieShto.forEach(function (site) {
              if (site.addr && message.domain && message.domain.match(urlToRegex(site.addr))) {
                if (site.css) {
                  css += site.css + '\n\n';
                }
                favicon = site.favicon;
              }
            });

            if (css || favicon) {
              cb({css: css, favicon: favicon});
            }
          }
        }
    );
  }

  function urlToRegex (url) {
    // if it doesn't contain \ * ( | then it's simple url
    if (!url.match(new RegExp('[\\\*\(\|]'))) {
      // escape dots
      url = url.replace(/\./g, '\\.');
    }
    return url;
  }

  this.cssHelpers = {
    res: res,
    pahoniaURL: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Coat_of_arms_of_Belarus_%281918%2C_1991-1995%29.svg',
    flagCSS: flagBGI() + '\nbackground-position: 0 0 !important; \nbackground-size: cover;',
    flagBGI: flagBGI,
    flagURL: flagURL,
  };

  var getDataSource = function (src) {
    //var data = 'https://raw.githubusercontent.com/SpadarShut/Correct_flag/master/source/sciah-data.json';
    var data = 'sciah-data.json';
    return src ? src : data;
  };


  this.getSiteData = function (src) {
    return fetch(getDataSource(src))
      .then(function (response) {
        if (response.ok) {
          return response.json().then(function (data) {
            // remember last data
            localStorage.setItem('sciah-data', JSON.stringify(data));
            return data;
          });
        }
        else {
          throw new Error(response.statusText);
        }
      })
      .catch(function (err) {
        data = localStorage.getItem('sciah-data');
        if (data) {
          return JSON.parse(data);
        }
        else {
          return fetch('sciah-data.json').then(function (response) {
              return response.json();
            });
        }
      });
  };

  function getReplacerFnResult (fn, args) {
    var out = '';
    // call without arguments if none were provided
    if (typeof args === 'undefined'){
      out = self.cssHelpers[fn]();
    }
    else {
      // put a single object into array to call .apply with
      if (!(args instanceof Array)) {
        args = [args];
      }

      out = self.cssHelpers[fn].apply(null, args);
    }
    return out;
  }

  replaceCSSPlaceholders = function (site) {

    // Replace custom placeholders for this site
    if (site.cssReplace && site.cssReplace instanceof Array) {
      site.cssReplace.forEach(function (replacer) {
        Object.keys(replacer).forEach(function (key) {
          site.css = site.css.replace(new RegExp(key, 'g'), function () {
            if (replacer[key]['f']){
              return getReplacerFnResult(replacer[key]['f'], replacer[key]['arg']);
            }
          });
        });
      });
    }

    // If there are still unreplaced tokens in CSS
    if (site.css && site.css.indexOf('%') >-1) {
      // Replace global replacers
      site.css = site.css.replace(/%(pahoniaURL|flagCSS)%/g, function (fullMatch, inBrackets) {
        return self.cssHelpers[inBrackets]
      });
    }
  }

  this.prepareDzieShto = function (data) {

    var out = data.map(function (site) {

      // Join CSS array into a string
      if (site.css && site.css instanceof Array) {
        site.css = site.css.join('\n');
      }

      replaceCSSPlaceholders(site)

      if (site.images) {
        site.images = site.images.map(function (img) {

          // If img has replacer key and it a string that starts with %
          if (img.replacer && typeof img.replacer === 'string' && img.replacer.indexOf('%')>-1) {
            img.replacer = self.cssHelpers[img.replacer.replace(/%/g, '')];
          }

          // if replacer is an object with fn prop
          if (img.replacer && img.replacer.f){
            img.replacer = getReplacerFnResult(img.replacer.f, img.replacer.arg);
          }
          return img
        });
      }

      if (site.favicon) {
        site.favicon = getReplacerFnResult(site.favicon.f, site.favicon.arg);
      }

      return site;
    });
    return out;
  };

  listenUpdateRequest = function () {

    chrome.runtime.onMessage.addListener(
      function(message) {
        if (message === 'go-reload-yourself') {
          // reloading extension to reset old image request filters and
          // replace them with new ones
          chrome.runtime.reload();
        }
      }
    );
  };

  this.init = function () {
    self.getSiteData().then(function (data) {
        self.dzieShto = self.prepareDzieShto(data);
        setupFilters(data);
        serveFixes(data);
        listenUpdateRequest();
      })
  }
};