/**
 * jQuery Preview for jQuery Ui Icons
 *
 * Copyright (c) 2015 Michael Keck
 *               (https://github.com/mkkeck/jquery-ui-icons)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Modified: Michael Keck, 2015-06-20
 */

(function($, document, undefined) {
  "use strict";

  if (!$.fn) {
    $.fn = {};
  }

  /**
   * jQuery Cookie Plugin
   * https://github.com/carhartl/jquery-cookie
   *
   * Copyright 2011, Klaus Hartl
   * Dual licensed under the MIT or GPL Version 2 licenses.
   * http://www.opensource.org/licenses/mit-license.php
   * http://www.opensource.org/licenses/GPL-2.0
   */
  $.cookie = function(key, value, options) {
    // key and at least value given, set cookie...
    if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
      options = $.extend({}, options);
      if (value === null || value === undefined) {
        options.expires = -1;
      }
      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setDate(t.getDate() + days);
      }
      value = String(value);
      return (document.cookie = [
        encodeURIComponent(key), '=', (options.hasOwnProperty('raw') && options['raw']) ? value : encodeURIComponent(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path    ? '; path=' + options.path : '',
        options.domain  ? '; domain=' + options.domain : '',
        (options.hasOwnProperty('secure') && options['secure'])  ? '; secure' : ''
      ].join(''));
    }
    // key and possibly options given, get cookie...
    options = value || {};
    var decode = function(s) { return (options.hasOwnProperty('raw') && options['raw']) ? s : decodeURIComponent(s);}, pairs = document.cookie.split('; ');
    for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
      if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
    }
    return null;
  };

  /**
   * Escape Widget
   * @param options
   * @returns {*}
   */
  $.fn.escape = function(options) {
    options =  $.extend({ 'id': null , 'run': null }, options);
    return this.each(function() {
      var that = $(this), id = (!options.id ? 'escapekey' : ''+options.id), run = function(that) { if (typeof(options.run) !== 'function') { that.hide(); return; } options.run(that); };
      $(document).on('keyup.'+id, function(e) { e = e || window.event; if (e.keyCode === 27) { run(that); } }).on('click.'+id, function(e) { e = e || window.event; if (e.target.tagName.toLowerCase() === 'body') { run(that); }});
    });
  };

  /**
   * jQuery Theme Switch Plugin
   *
   * Copyright (c) 2015 Michael Keck
   *               (https://github.com/mkkeck/jquery-ui-icons)
   * Dual licensed under the MIT and GPL licenses:
   * http://www.opensource.org/licenses/mit-license.php
   * http://www.gnu.org/licenses/gpl.html
   *
   * Modified: Michael Keck, 2015-06-20
   */
  $.themeswitch = function(param, value) {
    param = param || null;
    value = value || null;
    var that = this, head  = $('head'),
        orgcss = (($('link[href$="jquery-ui.css"]', head).length > 0)
            ? $('link[href$="jquery-ui.css"]', head).last() : null
        );
    that.cookiename = null;
    /* Default theme */
    that.theme = 'smoothness';
    /* Available original themes */
    that.themes = [
      { title: 'Black Tie', name: 'black-tie' },
      { title: 'Blitzer', name: 'blitzer' },
      { title: 'Cupertino', name: 'cupertino' },
      { title: 'Dark Hive', name: 'dark-hive' },
      { title: 'Dot Luv', name: 'dot-luv' },
      { title: 'Eggplant', name: 'eggplant' },
      { title: 'Excite Bike', name: 'excite-bike' },
      { title: 'Flick', name: 'flick' },
      { title: 'Hot Sneaks', name: 'hot-sneaks' },
      { title: 'Humanity', name: 'humanity' },
      { title: 'Le Frog', name: 'le-frog' },
      { title: 'Mint Choc', name: 'mint-choc' },
      { title: 'Overcast', name: 'overcast' },
      { title: 'Pepper Grinder', name: 'pepper-grinder' },
      { title: 'Redmond', name: 'redmond' },
      { title: 'Smoothness', name: 'smoothness' },
      { title: 'South Street', name: 'south-street' },
      { title: 'Start', name: 'start' },
      { title: 'Sunny', name: 'sunny' },
      { title: 'Swanky Purse', name: 'swanky-purse' },
      { title: 'Trontastic', name: 'trontastic' },
      { title: 'UI Darkness', name: 'ui-darkness' },
      { title: 'UI Lightness', name: 'ui-lightness' },
      { title: 'Vader', name: 'vader' }
    ];
    /* Path / URI where to load themes from */
    that.path = 'https://ajax.googleapis.com/ajax/libs/jqueryui/';
    /* Version */
    that.version = '1.11.3';

    that.load = function(val) {
      var newcss = null, url;
      var check = function() {
        var r = null, d = (that.theme && that.theme !== '') ? that.theme : that.themes[0], v = (''+val).toLowerCase();
        $.each(that.themes, function(k, t) {
          if ((''+t['name']).toLowerCase() === v || (''+t['title']).toLowerCase() === v) {
            r = t; return false;
          }
        });
        return (!r ? d : r);
      };
      var attach = function(n, o) {
        if (o) { o.after(n); return; }
        n.prependTo(head);
      };
      val = check();
      url = (val.hasOwnProperty('url') ? val['url'] : '');
      url += ((url !== '') ? '' : that.path + that.version + '/themes/' + val['name'] + '/jquery-ui.css');
      if ($('link[href="'+url+'"]', head).length > 0) {
        newcss = $('link[href="'+url+'"]', head).first();
      }
      if (!newcss) {
        newcss = $('<link href="'+url+'" rel="stylesheet" type="text/css">');
      }
      attach(newcss, orgcss);
      if (!orgcss) {
        orgcss = newcss;
      }
    };

    that.property = function(param, value) {
      value = value || null;
      if (param === 'default') {
        param = 'theme';
      }
      switch (param) {
        case 'cookie':
        case 'path':
        case 'theme':
        case 'version':
          if (value) {
            that[param] = value;
          }
          return that[param];
        case 'themes':
          if (value) {
            that.themes = $.extend(that.themes, value);
          }
          return that.themes;
        case 'load':
          if (!value) {
            value = that.theme;
          }
          that.load(value);
          return this;
      }
    };
    if (typeof(param) !== 'string') {
      for(var key in param) {
        if (param.hasOwnProperty(key)) {
          that.property(key, param[key]);
        }
      }
    }
    else {
      return that.property(param, value);
    }
    if (!that.initiated) {
      value = '';
      if (typeof($.cookie) === 'function' && that.cookiename && that.cookiename !== '') {
        value = $.cookie(that.cookiename);
      }
      if (value === '') {
        if (that.theme && that.theme !== '') {
          value = that.theme;
        }
      }
      if (value !== '') {
        that.load(value);
      }
      that.initiated = true;
    }
    return this;
  };

  /**
   * jQuery Theme Switch Widget
   *
   * Copyright (c) 2015 Michael Keck
   *               (https://github.com/mkkeck/jquery-ui-icons)
   * Dual licensed under the MIT and GPL licenses:
   * http://www.opensource.org/licenses/mit-license.php
   * http://www.gnu.org/licenses/gpl.html
   *
   * Modified: Michael Keck, 2015-06-20
   */
  $.fn.themeswitch = function(options) {
    options = $.extend({
      /* Cookie Settings */
      cookie: {
        expires: 365,
        name: 'jquery-ui-theme',
        path: '/'
      },
      onselect: null,
      onclose: null,
      onopen: null,
      /* Default theme */
      theme: '',
      /* Available original themes */
      themes: [
        { title: 'Black Tie', name: 'black-tie' },
        { title: 'Blitzer', name: 'blitzer' },
        { title: 'Cupertino', name: 'cupertino' },
        { title: 'Dark Hive', name: 'dark-hive' },
        { title: 'Dot Luv', name: 'dot-luv' },
        { title: 'Eggplant', name: 'eggplant' },
        { title: 'Excite Bike', name: 'excite-bike' },
        { title: 'Flick', name: 'flick' },
        { title: 'Hot Sneaks', name: 'hot-sneaks' },
        { title: 'Humanity', name: 'humanity' },
        { title: 'Le Frog', name: 'le-frog' },
        { title: 'Mint Choc', name: 'mint-choc' },
        { title: 'Overcast', name: 'overcast' },
        { title: 'Pepper Grinder', name: 'pepper-grinder' },
        { title: 'Redmond', name: 'redmond' },
        { title: 'Smoothness', name: 'smoothness' },
        { title: 'South Street', name: 'south-street' },
        { title: 'Start', name: 'start' },
        { title: 'Sunny', name: 'sunny' },
        { title: 'Swanky Purse', name: 'swanky-purse' },
        { title: 'Trontastic', name: 'trontastic' },
        { title: 'UI Darkness', name: 'ui-darkness' },
        { title: 'UI Lightness', name: 'ui-lightness' },
        { title: 'Vader', name: 'vader' }
      ],
      themeicon: {
        path: '',
        width: '',
        height: '',
        type: '.png'
      },
      /* Path / URI where to load themes from */
      themepath: 'https://ajax.googleapis.com/ajax/libs/jqueryui/',
      themeversion: '1.11.3',
      title: 'Please select',
      userthemes: []
    }, options);
    if (options.userthemes && options.userthemes.length > 0) {
      $.extend(options.themes, options.userthemes);
    }
    $.themeswitch({
      'cookiename': options.cookie.name,
      'themes': options.themes, 'path': options.themepath, 'version': options.themeversion
    });
    var that = this;
    that._run = function(v) {
      if (typeof options[v] === 'function') {
        options[v]();
      }
    };
    that._load = function(v) {
      $.themeswitch({'load' : (v.hasOwnProperty('url') ? v['url'] : v['name']) });
      if (typeof($.cookie) === 'function' && options.cookie.name && options.cookie.name !== '') {
        $.cookie(options.cookie.name, v['name'], {expires: options.cookie.expires, path: options.cookie.path});
      }
      that.btntext.text(v['title']);
      that._hide();
      that._run('onselect');
    };
    that._hide = function() {
      that.btn.removeClass('ui-state-focus');
      that.btnicon.removeClass('ui-icon-triangle-1-n').addClass('ui-icon-triangle-1-s');
      that.menu.hide();
    };
    that._show = function() {
      that.btn.addClass('ui-state-focus');
      that.btnicon.removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-n');
      that.menu.show();
    };
    that._current = function() {
      var c = $('link[href$="jquery-ui.css"]', $('head'));
      if (c.length > 0) {
        c = c.last().attr('href');
        c = c.substr(c.lastIndexOf('/themes/') + 8);
        c = c.substr(0, c.indexOf('/'));
        for (var k in options.themes) {
          if (options.themes.hasOwnProperty(k)) {
            if (options.themes[k]['name'] === c) {
              return options.themes[k]['title'];
            }
          }
        }
      }
      return options.title;
    };

    that.btn = $('<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-secondary"></button>')
      .on('mouseover', function() { $(this).addClass('ui-state-hover')})
      .on('mouseout', function() { $(this).removeClass('ui-state-hover')})
      .on('focus', function() { $(this).addClass('ui-state-focus')})
      .on('blur', function() { $(this).removeClass('ui-state-focus')})
      .on('click', function() {
        if (that.menu.is(':visible')) {
          that._hide();
          return;
        }
        that._show();
      });
    that.btntext = $('<span class="ui-button-text">'+that._current('title')+'</span>');
    that.btnicon = $('<span class="ui-button-icon-secondary ui-icon ui-icon-triangle-1-s"></span>');
    that.btn.append(that.btntext, that.btnicon);
    that.menu = $(''
      + '<ul class="ui-widget ui-widget-content ui-corner-all" style="'
        + 'display:none;'
        + 'list-style:none outside none;'
        + 'margin:1px 0 -1px 0;padding:0;'
        + 'max-height:300px;min-height:180px;overflow:auto;width:300px;overflow-x:hidden;'
        + 'position:absolute;z-index:999"'
      +'><\/ul>');
    that.switch = $('<span style="position:relative;display:inline-block;"></span>').append(that.btn, that.menu);

    $.each(options.themes, function(key, theme) {
      var item, link;
      item = $('<li></li>');
      link = $('<a href="#" class="ui-widget-content ui-helper-clearfix" style="display:block;margin:-1px;padding:0;text-decoration:none"></a>');
      link.data(theme);
      link
        .html(''
          + '<img'
          + ' src="'+options.themeicon.path+theme['name']+options.themeicon.type+'"'
          + ' style="float: left; margin: 5px" />'
          + '<strong style="float: left;margin:5px;">'+theme['title']+'</strong>'
        );
      item.append(link);
      that.menu.append(item);
    });
    that.menu
      .on('mouseover', 'a', function() { $(this).addClass('ui-state-hover')})
      .on('mouseout', 'a', function() { $(this).removeClass('ui-state-hover')})
      .on('click', 'a', function() {
        that._load($(this).data());
        that._hide();
        return false;
      });
    $(this).escape({'id':'themeswitch', 'run':function(){that._hide();} });
    $(this).append(that.switch);
    return this;
  };

  /* Init Theme Switch Plugin */
  $.themeswitch();

})(jQuery, document, 'undefined');
