# Icons for jQuery-UI #
* All icons are complete drawn by hand and optimized for a minimal size of 14×14 pixels.
* Resizable and mobile friendly icons.
* Change the color of icons without generating graphic files.
* Works with all jQuery UI themes (versions: 1.11.2, 1.11.3 & 1.11.4).
* Easy to use, no extra plugins or hacks needed.
* Included CSS3 animation for e.g. AJAX loading status.
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

To display an icon is really simple:
```html
  <p class="ui-widget-content
    ui-state-default ui-helper-clearfix">
    <span style="float: left; margin-right: 0.5em;"
      class="ui-icon ui-icon-jquery">icon</span>
    ui-icon-jquery
  </p>
```

### Bugs, features and feedback ###
Please report bugs or feature requests on the [issue-tracker](https://github.com/mkkeck/jquery-ui-iconfont/issues).


### Demo ###
Take a look at the demo under [http://mkkeck.github.io/jquery-ui-iconfont/](http://mkkeck.github.io/jquery-ui-iconfont/)

### Screenshot ###
![Screenshot](https://raw.githubusercontent.com/mkkeck/jquery-ui-iconfont/master/screen.png)