# <a name="v2.3"></a> Version 2.3 #
2017-03-02 

Welcome to Version 2.3 with **332 unique icons** and **support for jQuery UI 1.12.x**.  


#### What's new? ####
* 6 new icons 
* jQuery UI 1.12.x support 
* minified CSS-files 
* compressed font-files (WOFF2) 

The file `jquery-ui.icon-font.css` and the minified version are for jQuery UI 1.12.x.
For jQuery UI 1.11.x or jQuery Mobile please use the `jquery-ui-1.11.icon-font.css` or the minified
version `jquery-ui-1.11.icon-font.min.css`. 


#### New Icons ####
```css
.ui-icon-caratstop-1-e 
.ui-icon-caratstop-1-n 
.ui-icon-caratstop-1-s 
.ui-icon-caratstop-1-w 
 
.ui-icon-fullscreen 
.ui-icon-fullscreen-off 
```


#### New Aliases ####
```css
.ui-icon-caret-1-e     /* for .ui-icon-carat-1-e (jQuery UI v1.12) */ 
.ui-icon-caret-1-n     /* for .ui-icon-carat-1-n (jQuery UI v1.12) */ 
.ui-icon-caret-1-s     /* for .ui-icon-carat-1-s (jQuery UI v1.12) */ 
.ui-icon-caret-1-w     /* for .ui-icon-carat-1-w (jQuery UI v1.12) */ 
 
.ui-icon-fullscreen-on /* for .ui-icon-fullscreen */
```


#### Deleted ####
All deprecated listed icons in version 2.1 are removed now. 




# <a name="v2.2"></a> Version 2.2 #
2016-06-26 

Compatibility for jQuery Mobile (tested against 1.4.5). 
 
**Please note:** 
The pseudo elements `:before` are replaced by `:after` to make the Icon Font and the CSS compatible with jQuery Mobile. Perhabs some user defined CSS may be broken.




# <a name="v2.2"></a> Version 2.1 #
2016-05-10

Welcome to version 2 with 326 unique icons. Many icons are optimized and some are added.
Please take a note on the changes below:


#### Deleted ####
Some tests on mobile devices and hdpi screens shows me, that the css only created icons for loading animations looks not so good. These icons and their animations are deleted:
```css
.ui-busy-icon,  
.ui-busy-icon-balls,
.ui-busy-icon-circle,
.ui-busy-icon-clock,
.ui-busy-icon-comet,
.ui-busy-icon-planet,
.ui-busy-icon-radar,
.ui-busy-icon-progress,
.ui-busy-icon-square
```


#### Deprecated ####
Following classnames are deprecated.

1. Loading status

 **Old:** 
 ```css
 .ui-loading-icon.ui-icon-balls
 .ui-loading-icon.ui-icon-circle
 .ui-loading-icon.ui-icon-comet
 .ui-loading-icon.ui-icon-lines
 .ui-loading-icon.ui-icon-planet
 ```
 **New:**
 ```css
 .ui-icon-loading-status-balls
 .ui-icon-loading-status-circle
 .ui-icon-loading-status-comet
 .ui-icon-loading-status-lines
 .ui-icon-loading-status-planet
 ```
2. File icons

 **Old:** 
 ```css
 .ui-icon-file-rtf
 .ui-icon-file-spreadsheet, .ui-icon-file-xls
 .ui-icon-file-txt
 ```
 **New:**
 ```css
 .ui-icon-file-richtext
 .ui-icon-file-table
 .ui-icon-file-text
 ```

#### Replaced ####
The animations are reassigned to make usage more easier to understand.

**Old:**
```css
.ui-animate.clockwise .ui-icon,
.ui-animate.anti-clockwise .ui-icon, 
.ui-animate.bounce .ui-icon,
.ui-animate.bounce-reverse /* <-- this was useless */
```
**New:**
```css
[class^="ui-icon-"].rotate,           /* <-- clockwise */
[class*=" ui-icon-"].rotate, 
[class^="ui-icon-"].rotate-reverse,   /* <-- anti clockwise */
[class*=" ui-icon-"].rotate-reverse,
[class^="ui-icon-"].bounce,
[class*=" ui-icon-"].bounce
```
