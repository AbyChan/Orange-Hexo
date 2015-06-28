;
(function($, window, document, undefined) {
    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.
    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in your plugin).
    // Create the defaults once
    var pluginName = 'stickNav',
        defaults = {
            header: "header"
        };
    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype.init = function() {
        // Place initialization logic here
        // You already have access to the DOM element and
        // the options via the instance, e.g. this.element
        // and this.options
      var header = $(this.options.header),

        nav = $(this.element),
        headerHeight = parseFloat(header.parent().css('height')) + 2 * parseFloat(header.parent().css('padding-top')),

        navHeight = parseFloat(nav.css('height')) + 2 * parseFloat(nav.css('padding-top')),
        navInitTop = nav.offset().top,
        windowOffset;
      console.log("header.css('padding-top') = ", header.css('padding'));
      console.log("header.css('padding-top') = ", header.css('margin'));
      console.log("navInitTop = ", navInitTop);
      console.log("headerHeight = ", headerHeight);
      console.log("navHeight = ", navHeight);
      console.log(header.parent());
      //nav start thin point at header
      var navSThinPoint = headerHeight  / 3,

        //nav final padding value
        navFPadding = 16,
        navFHeight = nav.height() + 2 * navFPadding,
        navCalcLHeight =  (headerHeight) * 2 / 3  - navHeight,
        navIPadding = parseFloat(nav.css('padding-top'));


      var navIWidth = parseFloat(nav.css('width')) + 2 * parseFloat(nav.css('padding-left'));

      $(window).scroll(function(){


        //操，难调得一逼
        var offsetY  = $(window).scrollTop();
        var navOffset = nav.offset();
        var relNavWinOff = offsetY - navSThinPoint;



        if(offsetY > navSThinPoint && offsetY < (headerHeight - navFHeight)) {
          console.log('hi');
          nav.css('padding-top', navIPadding -  (navFPadding * relNavWinOff / navCalcLHeight) * 1.4);
          nav.css('padding-bottom', navIPadding -  (navFPadding * relNavWinOff / navCalcLHeight) * 1.4);
        }

        if(offsetY > (headerHeight - navFHeight - 8 )) {
          // if(nav.css('width') === 'auto') {
          //   nav.css('width', parseFloat(navIWidth / $(window)) + '%');
          // }
          nav.addClass('full-width');
          //nav.animate({'min-width': '100%'});
        }

        if(offsetY < (headerHeight - navFHeight - 8 )) {

          nav.removeClass('full-width');
        }

        if(offsetY < navSThinPoint) {
          nav.css('padding-top', navIPadding);
          nav.css('padding-bottom', navIPadding);
        }


        if(offsetY > (headerHeight - navFHeight) ) {
          nav.css('padding-top', 11);
          nav.css('padding-bottom', 11);
        }


        if(offsetY > navInitTop + 1) {
          nav.addClass('fixed');
        }


        if(offsetY < navInitTop + 1) {
          nav.removeClass('fixed');
        }




      });




    };
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
    }
})(jQuery, window, document);
