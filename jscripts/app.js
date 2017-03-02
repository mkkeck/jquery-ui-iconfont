/**
 * Require JS App
 *
 * Copyright: (c) 2015-2017 Michael Keck
 *               (https://github.com/mkkeck/jquery-ui-icons)
 * License:   http://www.gnu.org/licenses/gpl.html
 * Modified:  Michael Keck, 2017-03-01
 */

/**
 * Gobal {object} appConfig
 * @type {object}
 */
var appConfig = appConfig || {};

/* Polyfill .String.trim(string) */
if (!String.prototype.trim) {
  (function() {
    // Make sure we trim BOM and NBSP
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    String.prototype.trim = function() {
      return this.replace(rtrim, '');
    };
  })();
}

/* app.js Init */
(function(r, c, d, l) {
  c.basePath = l.protocol+'//'+l.hostname+'/';
  c.isLocal = (l.hostname.indexOf('km-wampp.de') !== -1 || l.hostname.indexOf('localhost') !== -1 || l.protocol.indexOf('file') !== -1);
  if (typeof c.developer === 'undefined' || c.developer === null) {
    c.developer = c.isLocal;
  }
  c.useMin = !c.developer ? '.min' : '';
  if (typeof c.jquery === 'undefined' || !c.jquery) {
    c.jquery = '1.12.4';
  }
  var initStyle = function(s, e, p, n) {
    n = d.createElement('link');
    n.rel = 'stylesheet';
    n.type = 'text/css';
    n.media = 'only-x';
    n.href = s;
    e.parentNode.insertBefore(n, e.nextSibling);
    setTimeout(function() { n.media = 'all'}, 0);
  };

  var e, s, x, si = 0, sl = 0;
  s = d.getElementsByTagName('script'); x = /(.*)\/require\.(min\.)?js$/i;

  if (s.length > 0) {
    for (si=0, sl = s.length; si < sl; si++) {
      e = s[si];
      if (e.src && e.src.match(x)) {
        c.jsPath = e.src.replace(x, '$1');
        break;
      }
    }
  }

  s = d.getElementsByTagName('link'); x = /(.*)styles\/(.*)\.css/i;
  if (s.length > 0) {
    for (si=0, sl = s.length; si < sl; si++) {
      e = s[si];
      if (e.href && e.href.match(x)) {
        var a = [
          /* Removed: 2017-03-01 */
          /**
          'https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:400',
          /**/
          'styles/jquery-ui.icon-font'+c.useMin+'.css',
          'styles/jquery-ui.min.css'
        ].reverse();
        for(var i=0,m=a.length;i<m; i++) {
          initStyle(a[i], e, 'styles/');
        }
        break;
      }
    }
  }
  /* Removed: 2017-03-01 */
  /**
  var waitForWebfonts = function(fonts, callback) {
    var loadedFonts = 0;
    for(var i = 0, l = fonts.length; i < l; ++i) {
      (function(font) {
        var node = d.createElement('span');
        // Characters that vary significantly among different fonts
        node.innerHTML = 'giItT1WQy@!-/#';
        // Visible - so we can measure it - but not on the screen
        node.style.position      = 'absolute';
        node.style.left          = '-10000px';
        node.style.top           = '-10000px';
        // Large font size makes even subtle changes obvious
        node.style.fontSize      = '300px';
        // Reset any font properties
        node.style.fontFamily    = 'sans-serif';
        node.style.fontVariant   = 'normal';
        node.style.fontStyle     = 'normal';
        node.style.fontWeight    = 'normal';
        node.style.letterSpacing = '0';
        d.body.appendChild(node);

        // Remember width with no applied web font
        var width = node.offsetWidth;

        node.style.fontFamily = font;

        var interval;
        var checkFont = function() {
          // Compare current width with original width
          if (node && node.offsetWidth != width) {
            ++loadedFonts;
            node.parentNode.removeChild(node);
            node = null;
          }

          // If all fonts have been loaded
          if (loadedFonts >= fonts.length) {
            if (interval) {
              clearInterval(interval);
            }
            if (loadedFonts == fonts.length) {
              callback();
              return true;
            }
          }
        };

        if(!checkFont()) {
          interval = setInterval(checkFont, 50);
        }
      })(fonts[i]);
    }
  };
  /**/

  /* REQUIRE.JS Konfigurieren */
  r.config({
    baseUrl: c.jsPath,
    paths: {
      /* Libraries */
      'jquery':  "jquery"+(c.jquery ? "-" + c.jquery : "")+".min",
      'ui':      "jquery-ui.min",
      'custom':  ["jquery",".custom",c.useMin].join(""),
      'content': ["jquery",".content",c.useMin].join("")
    },
    shim: {
      'custom': { deps: ['jquery', 'ui'] },
      'content': { deps: ['custom'] }
    }
  });

  r(['jquery'], function($) {
    r(['ui','custom'], function() {
      /* Removed: 2017-03-01 */
      /**
      waitForWebfonts(['Roboto Condensed', 'Roboto'], function() {
        $('html').addClass('font-loaded');
      });
      /**/
      if (!(d.all && !d.addEventListener)) {
        r(['prism.min'], function() {
          r(['content']);
        })
      } else {
        r(['content']);
      }
      if (!c.isLocal && c.hasOwnProperty('ganalytic') && c['ganalytic']) {
        (function(i, s, o, g, r, a, m) {
          i['GoogleAnalyticsObject'] = r;
          i[r] = i[r] || function() {
              (i[r].q = i[r].q || []).push(arguments)
            };
          i[r].l = 1 * new Date();
          a = s.createElement(o);
          m = s.getElementsByTagName(o)[0];
          a.async = 1;
          a.src = g;
          m.parentNode.insertBefore(a, m);
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
        if ('ga' in window) {
          ga('create', c['ganalytic'], 'auto');
          ga('require', 'linkid', 'linkid.js');
          ga('send', 'pageview');
        }
      }
    });
  });
})(require, appConfig, document, location);
