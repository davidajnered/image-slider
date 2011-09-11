(function() {
  var slider;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  slider = (function() {
    var collection, distance, wrapper;
    function slider() {
      this.clickHandler = __bind(this.clickHandler, this);
    }
    collection = '';
    wrapper = '.page-wrapper';
    distance = 240;
    /*
      init method
      */
    slider.prototype.slide = function(collection) {
      if (jQuery(collection).length === 0) {
        return;
      }
      this.collection = collection;
      this.showNavigation();
      return null;
    };
    /*
      add navigation if slide contains enough elements
      */
    slider.prototype.showNavigation = function() {
      if (this.checkPosition() === true) {
        jQuery('<ul class="nav"><li class="prev">Prev</li><li class="next">Next</li></ul>').appendTo(this.collection);
        return this.checkPosition();
      }
    };
    /*
      return slider position
      */
    slider.prototype.getPosition = function() {
      var position;
      position = jQuery(this.collection + ' div').css('left');
      return parseInt(position.replace('px', ''));
    };
    /*
      return the width of the wrapper containing the elements to slide
      */
    slider.prototype.getWidth = function() {
      var width;
      width = 0;
      jQuery(this.collection + ' div').each(function() {
        width = this.offsetWidth + this.offsetLeft;
        return null;
      });
      return width;
    };
    /*
      return the distance to slide
      */
    slider.prototype.getDistance = function() {
      return distance;
    };
    /*
      check if slide is at the end
      */
    slider.prototype.isEnd = function() {
      if (this.getWidth() + this.getPosition() <= jQuery(this.collection).width()) {
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
      clicked = event.srcElement.className;
      if (clicked === 'next') {
        move = this.getDistance();
      }
      if (clicked === 'prev') {
        move = -this.getDistance();
      }
      return jQuery('.featured-products > div').stop(true, false).animate({
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
        jQuery(this.collection + ' .nav .next').one('click', this.clickHandler);
      } else if (this.isEnd()) {
        jQuery(this.collection + ' .nav .prev').one('click', this.clickHandler);
      } else {
        jQuery(this.collection + ' .nav li').one('click', this.clickHandler);
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
