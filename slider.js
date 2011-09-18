(function() {
  var slider;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  slider = (function() {
    var collectionWrapper, navigationClass;
    function slider() {
      this.clickHandler = __bind(this.clickHandler, this);
    }
    collectionWrapper = '';
    navigationClass = '';
    /*
      init method
      */
    slider.prototype.slide = function(collection) {
      if (jQuery(collection).length === 0) {
        return;
      }
      this.collectionWrapper = collection;
      this.navigationClass = collection + '-nav';
      this.showNavigation();
      return null;
    };
    /*
      add navigation if slide contains enough elements
      */
    slider.prototype.showNavigation = function() {
      if (this.checkPosition() === true) {
        jQuery(this.collectionWrapper).before('<ul class="slider-nav ' + this.navigationClass.replace('.', '') + '"><li class="prev">Prev</li><li class="next">Next</li></ul>');
        return this.checkPosition();
      }
    };
    /*
      return slider position
      */
    slider.prototype.getPosition = function() {
      var position;
      position = jQuery(this.collectionWrapper).css('left');
      return parseInt(position.replace('px', ''));
    };
    /*
      return the width of the wrapper containing the elements to slide
      */
    slider.prototype.getWidth = function() {
      var width;
      width = 0;
      jQuery(this.collectionWrapper + ' div').each(function() {
        width = this.offsetWidth + this.offsetLeft;
        return null;
      });
      return width;
    };
    /*
      return the distance to slide
      */
    slider.prototype.getDistance = function() {
      var element, width;
      element = jQuery(this.collectionWrapper + ' > div:last-child');
      width = element.width();
      width += parseInt(element.css("padding-left"), 10) + parseInt(element.css("padding-right"), 10);
      width += parseInt(element.css("margin-left"), 10) + parseInt(element.css("margin-right"), 10);
      width += parseInt(element.css("borderLeftWidth"), 10) + parseInt(element.css("borderRightWidth"), 10);
      return width;
    };
    /*
      check if slide is at the end
      */
    slider.prototype.isEnd = function() {
      if (this.getWidth() + this.getPosition() <= jQuery(this.collectionWrapper + '-wrapper').width()) {
        return true;
      } else {
        return false;
      }
    };
    /*
      check if slide is at the start
      */
    slider.prototype.isStart = function() {
      if (this.getPosition() >= 0) {
        return true;
      } else {
        return false;
      }
    };
    /*
      event handler
      */
    slider.prototype.clickHandler = function(event) {
      var clicked, move;
      clicked = jQuery(event.currentTarget).attr('class');
      if (clicked === 'next') {
        move = this.getDistance();
      }
      if (clicked === 'prev') {
        move = -this.getDistance();
      }
      return jQuery(this.collectionWrapper).stop(true, false).animate({
        left: this.getPosition() - move
      }, __bind(function() {
        return this.checkPosition();
      }, this));
    };
    /*
      check slide position and add event handlers
      */
    slider.prototype.checkPosition = function() {
      if (this.isStart() && this.isEnd()) {
        return false;
      } else if (this.isStart()) {
        jQuery(this.navigationClass + ' .next').one('click', this.clickHandler);
      } else if (this.isEnd()) {
        jQuery(this.navigationClass + ' .prev').one('click', this.clickHandler);
      } else {
        jQuery(this.navigationClass + ' li').one('click', this.clickHandler);
      }
      return true;
    };
    return slider;
  })();
  window.slide = function(collection) {
    slider = new slider();
    return slider.slide(collection);
  };
}).call(this);
