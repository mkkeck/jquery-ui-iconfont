# Icons for jQuery-UI #
* Complete new redesigned icons for jQuery UI as font
* Support mobile devices
* Clear and resizable icons
* Changeable color of icons without the need to export new graphic files
* Supported by many browsers (tested on Firefox 36, Chrome 42, Internet-Explorer 8-10)
* Works with all jQuery UI Themes (see "Sample Components")
* Icon License [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)

The perfect (pixel-)size of the icons is 14 pixels.


**Note:**
Please only use the class names in the CSS-file to display the required icon and never the unicode value (e.g. "\e601"). I could not guarantee that the entered unicode will show the requested glyph on future releases.

### Example Usage ###
```html
    <head>
    <!-- ... -->
    <link href="jquery/smoothness/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="jquery/jquery-ui.icon-font.css" rel="stylesheet" type="text/css" />
    <script src="jquery/jquery.min.js" type="text/javascript"></script>  
    <script src="jquery/jquery-ui.min.js" type="text/javascript"></script>
    <!-- ... -->
    </head>
```

### Bugs, features and feedback ###
Please report bugs or feature requests on the [issue-tracker](https://github.com/mkkeck/jquery-ui-iconfont/issues).

### Please note for feature releases ###
Some CSS classnames are renamed, deleted or replaced in future release.
The goal is, to make usage for you much easier and better quality.
Please take look at [issue #8](https://github.com/mkkeck/jquery-ui-iconfont/issues/8)
  
  
### Demo ###
Take a look at the demo under http://mkkeck.github.io/jquery-ui-iconfont/ 
  
  
### Changelog ###
* 2015-07-26
  First official release: 
  https://github.com/mkkeck/jquery-ui-iconfont/releases


* 2015-07-18
  * Font Version 1.4:
    * **New** icon 'ui-icon-window-minimize'
    * For loading-animation some glyphs in font are optimized
  * Styles Updated:
    * **New:**
      ui-busy-icon-balls,
      ui-busy-icon-line,
      ui-busy-icon-square
    * **Updated:**
      ui-busy-icon-progress
  
* 2015-07-12 
 * Font Version 1.2: 
   Descent set to 0 (zero) / baseline 0. 
   This should remove problems descripted in Issue [#2](https://github.com/mkkeck/jquery-ui-iconfont/issues/2) & [#3](https://github.com/mkkeck/jquery-ui-iconfont/issues/3). 
 * New CSS-Animated loaders 
 * Improved icon picker 


