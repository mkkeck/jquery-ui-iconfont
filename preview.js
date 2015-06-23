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


/**
 * evol.colorpicker 3.2.1
 * ColorPicker widget for jQuery UI
 *
 * https://github.com/evoluteur/colorpicker
 * (c) 2015 Olivier Giulieri
 *
 * Modified: 2015-06-21 by Michael Keck
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 */
!function(a){var e,f,g,h,i,j,k,l,m,c=0,d=window.navigator.userAgent;e=d.indexOf("MSIE ")>0,f=e?"-ie":"",g=e?!1:/mozilla/.test(d.toLowerCase())&&!/webkit/.test(d.toLowerCase()),h=[],i=["ffffff","000000","eeece1","1f497d","4f81bd","c0504d","9bbb59","8064a2","4bacc6","f79646"],j=["f2f2f2","7f7f7f","ddd9c3","c6d9f0","dbe5f1","f2dcdb","ebf1dd","e5e0ec","dbeef3","fdeada","d8d8d8","595959","c4bd97","8db3e2","b8cce4","e5b9b7","d7e3bc","ccc1d9","b7dde8","fbd5b5","bfbfbf","3f3f3f","938953","548dd4","95b3d7","d99694","c3d69b","b2a2c7","92cddc","fac08f","a5a5a5","262626","494429","17365d","366092","953734","76923c","5f497a","31859b","e36c09","7f7f7f","0c0c0c","1d1b10","0f243e","244061","632423","4f6128","3f3151","205867","974806"],k=["c00000","ff0000","ffc000","ffff00","92d050","00b050","00b0f0","0070c0","002060","7030a0"],l=[["003366","336699","3366cc","003399","000099","0000cc","000066"],["006666","006699","0099cc","0066cc","0033cc","0000ff","3333ff","333399"],["669999","009999","33cccc","00ccff","0099ff","0066ff","3366ff","3333cc","666699"],["339966","00cc99","00ffcc","00ffff","33ccff","3399ff","6699ff","6666ff","6600ff","6600cc"],["339933","00cc66","00ff99","66ffcc","66ffff","66ccff","99ccff","9999ff","9966ff","9933ff","9900ff"],["006600","00cc00","00ff00","66ff99","99ffcc","ccffff","ccccff","cc99ff","cc66ff","cc33ff","cc00ff","9900cc"],["003300","009933","33cc33","66ff66","99ff99","ccffcc","ffffff","ffccff","ff99ff","ff66ff","ff00ff","cc00cc","660066"],["333300","009900","66ff33","99ff66","ccff99","ffffcc","ffcccc","ff99cc","ff66cc","ff33cc","cc0099","993399"],["336600","669900","99ff33","ccff66","ffff99","ffcc99","ff9999","ff6699","ff3399","cc3399","990099"],["666633","99cc00","ccff33","ffff66","ffcc66","ff9966","ff6666","ff0066","d60094","993366"],["a58800","cccc00","ffff00","ffcc00","ff9933","ff6600","ff0033","cc0066","660033"],["996633","cc9900","ff9900","cc6600","ff3300","ff0000","cc0000","990033"],["663300","996600","cc3300","993300","990000","800000","993333"]],m="#0000ffff";var n=function(a){var b=a.toString(16);return 1==b.length&&(b="0"+b),b},o=function(a){return n(Number(a))},p=function(a){var b=n(a);return b+b+b},q=function(a){if(a.length>10){var b=1+a.indexOf("("),c=a.indexOf(")"),d=a.substring(b,c).split(",");return["#",o(d[0]),o(d[1]),o(d[2])].join("")}return a};a.widget("evol.colorpicker",{version:"3.2.1",options:{color:"",showOn:"both",hideButton:!1,displayIndicator:!0,transparentColor:!1,history:!0,defaultPalette:"theme",strings:"Theme Colors,Standard Colors,Web Colors,Theme Colors,Back to Palette,History,No history yet."},_active:!1,_create:function(){var b=this;switch(this._paletteIdx="theme"==this.options.defaultPalette?1:2,this._id="evo-cp"+c++,this._enabled=!0,this.options.showOn=this.options.hideButton?"focus":this.options.showOn,this.element.get(0).tagName){case"INPUT":var d=("focus"===this.options.showOn?"":"evo-pointer ")+"evo-colorind"+(g?"-ff":f)+(this.options.hideButton?" evo-hidden-button":""),h=this.options.color,i=this.element,j="";if(this._isPopup=!0,this._palette=null,""!==h)i.val(h);else{var k=i.val();""!==k&&(h=this.options.color=k)}h===m?d+=" evo-transparent":j=""!==h?"background-color:"+h:"",this.element.width(this.options.hideButton?this.element.width():this.element.width()-32),i.addClass("colorPicker "+this._id).wrap('<div class="evo-color-picker"style="'+(e?"margin-bottom:-21px;":"")+(g?"padding:1px 0;":"")+'"></div>').after('<span class="'+d+'" style="'+j+'"></span>').on("keyup onpaste",function(){var c=a(this).val();c!=b.options.color&&b._setValue(c,!0)});var l=this.options.showOn;("both"===l||"focus"===l)&&i.on("focus",function(){b.showPalette()}),("both"===l||"button"===l)&&i.next().on("click",function(a){a.stopPropagation(),b.showPalette()});break;default:this._isPopup=!1,this._palette=this.element.html(this._paletteHTML()).attr("aria-haspopup","true"),this._bindColors()}h&&this.options.history&&this._add2History(h)},_paletteHTML:function(){var a=this._paletteIdx=Math.abs(this._paletteIdx),b=this.options,c=b.strings.split(",");return'<div class="evo-pop'+f+' ui-widget ui-widget-content ui-corner-all"'+(this._isPopup?' style="position:absolute"':"")+">"+"<span>"+this["_paletteHTML"+a]()+"</span>"+'<div class="evo-more">'+'<a href="javascript:void(0)">'+c[1+a]+"</a>"+(b.history?'<a href="javascript:void(0)" class="evo-hist">'+c[5]+"</a>":"")+"</div>"+(b.displayIndicator?this._colorIndHTML(this.options.color)+this._colorIndHTML(""):"")+"</div>"},_colorIndHTML:function(a){var b=e?"evo-colorbox-ie ":"",c="";return a?a===m?b+="evo-transparent":c="background-color:"+a:c="display:none",'<div class="evo-color" style="float:left"><div style="'+c+'" class="'+b+'"></div>'+"<span>"+(a?a:"")+"</span>"+"</div>"},_paletteHTML1:function(){var a,b=this.options,c=b.strings.split(","),d='<td style="background-color:#',g=e?'"><div style="width:2px;"></div></td>':'"><span></span></td>',h='<tr><th colspan="10" class="ui-widget-content">',l='<table class="evo-palette'+f+'">'+h+c[0]+"</th></tr><tr>";for(a=0;10>a;a++)l+=d+i[a]+g;for(l+="</tr>"+(e?"":'<tr><th colspan="10"></th></tr>')+'<tr class="top">',a=0;10>a;a++)l+=d+j[a]+g;for(var m=1;4>m;m++)for(l+='</tr><tr class="in">',a=0;10>a;a++)l+=d+j[10*m+a]+g;for(l+='</tr><tr class="bottom">',a=40;50>a;a++)l+=d+j[a]+g;for(l+="</tr>"+h,b.transparentColor&&(l+='<div class="evo-transparent evo-tr-box"></div>'),l+=c[1]+"</th></tr><tr>",a=0;10>a;a++)l+=d+k[a]+g;return l+="</tr></table>"},_paletteHTML2:function(){var a,b,c,d,g,h='<td style="background-color:#',i=e?'"><div style="width:5px;"></div></td>':'"><span></span></td>',j='<table class="evo-palette2'+f+'"><tr>',k="</tr></table>";for(a='<div class="evo-palcenter">',d=0,g=l.length;g>d;d++){var m=l[d];for(b=0,c=m.length,a+=j;c>b;b++)a+=h+m[b]+i;a+=k}a+='<div class="evo-sep"/>';var n="";for(a+=j,b=255;b>10;b-=10)a+=h+p(b)+i,b-=10,n+=h+p(b)+i;return a+=k+j+n+k+"</div>"},_switchPalette:function(b){if(this._enabled){var c,d,e,f=this.options.strings.split(",");if(a(b).hasClass("evo-hist")){var g=['<table class="evo-palette"><tr><th class="ui-widget-content">',f[5],"</th></tr></tr></table>",'<div class="evo-cHist">'];if(0===h.length)g.push("<p>&nbsp;",f[6],"</p>");else for(var i=h.length-1;i>-1;i--)9===h[i].length?g.push('<div class="evo-transparent"></div>'):g.push('<div style="background-color:',h[i],'"></div>');g.push("</div>"),c=-this._paletteIdx,d=g.join(""),e=f[4]}else this._paletteIdx<0?(c=-this._paletteIdx,this._palette.find(".evo-hist").show()):c=2==this._paletteIdx?1:2,d=this["_paletteHTML"+c](),e=f[c+1],this._paletteIdx=c;this._paletteIdx=c;var j=this._palette.find(".evo-more").prev().html(d).end().children().eq(0).html(e);0>c&&j.next().hide()}},showPalette:function(){if(this._enabled&&(this._active=!0,a(".colorPicker").not("."+this._id).colorpicker("hidePalette"),null===this._palette)){this._palette=this.element.next().after(this._paletteHTML()).next().on("click",function(a){a.stopPropagation()}),this._bindColors();var b=this;this._isPopup&&a(document.body).on("click."+b._id,function(a){a.target!=b.element.get(0)&&b.hidePalette()}).on("keyup."+b._id,function(a){27===a.keyCode&&b.hidePalette()})}return this},hidePalette:function(){if(this._isPopup&&this._palette){a(document.body).off("click."+this._id);var b=this;this._palette.off("mouseover click","td,.evo-transparent").fadeOut(function(){b._palette.remove(),b._palette=b._cTxt=null}).find(".evo-more a").off("click")}return this},_bindColors:function(){var b=this,c=this.options,d=this._palette.find("div.evo-color"),e=c.history?"td,.evo-cHist>div":"td";c.transparentColor&&(e+=",.evo-transparent"),b._cTxt1=d.eq(0).children().eq(0),b._cTxt2=d.eq(1).children().eq(0),this._palette.on("click",e,function(){if(b._enabled){var c=a(this);b._setValue(c.hasClass("evo-transparent")?m:q(c.attr("style").substring(17))),b._active=!1}}).on("mouseover",e,function(){if(b._enabled){var c=a(this),d=c.hasClass("evo-transparent")?m:q(c.attr("style").substring(17));b.options.displayIndicator&&b._setColorInd(d,2),b._active&&b.element.trigger("mouseover.color",d)}}).find(".evo-more a").on("click",function(){b._switchPalette(this)})},val:function(a){return"undefined"==typeof a?this.options.color:(this._setValue(a),this)},_setValue:function(a,b){a=a.replace(/\s/g,""),this.options.color=a,this._isPopup?(b||this.hidePalette(),this._setBoxColor(this.element.val(a).next(),a)):this._setColorInd(a,1),this.options.history&&this._paletteIdx>0&&this._add2History(a),this.element.trigger("change.color",a)},_setColorInd:function(a,b){var c=this["_cTxt"+b];this._setBoxColor(c,a),c.next().html(a)},_setBoxColor:function(a,b){b===m?a.addClass("evo-transparent").removeAttr("style"):a.removeClass("evo-transparent").attr("style","background-color:"+b)},_setOption:function(a,b){"color"==a?this._setValue(b,!0):this.options[a]=b},_add2History:function(a){var b,c=h.length;for(b=0;c>b;b++)if(a==h[b])return;c>27&&h.shift(),h.push(a)},clear:function(){this.hidePalette().val("")},enable:function(){var a=this.element;return this._isPopup?a.removeAttr("disabled"):a.css({opacity:"1","pointer-events":"auto"}),"focus"!==this.options.showOn&&this.element.next().addClass("evo-pointer"),a.removeAttr("aria-disabled"),this._enabled=!0,this},disable:function(){var a=this.element;return this._isPopup?a.attr("disabled","disabled"):(this.hidePalette(),a.css({opacity:"0.3","pointer-events":"none"})),"focus"!==this.options.showOn&&this.element.next().removeClass("evo-pointer"),a.attr("aria-disabled","true"),this._enabled=!1,this},isDisabled:function(){return!this._enabled},destroy:function(){a(document.body).off("click."+this._id),this._palette&&(this._palette.off("mouseover click","td,.evo-cHist>div,.evo-transparent").find(".evo-more a").off("click"),this._isPopup&&this._palette.remove(),this._palette=this._cTxt=null),this._isPopup&&this.element.next().off("click").remove().end().off("focus").unwrap(),this.element.removeClass("colorPicker "+this.id).empty(),a.Widget.prototype.destroy.call(this)}})}(jQuery);

