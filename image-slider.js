/**
 * jQuery image slider plugin
 *
 * Author: David Ajnered
 */

(function($) {
    /**
     * jQuery object for sliderWrapper.
     */
    var $sliderWrapper;

    /**
     * Slider navigation jQuery object.
     */
    var $sliderNavigation;

    /**
     * Global object containing user settings.
     *
     * Currently not used
     */
    var options = {};

    /**
     * jQuery object for slider.
     */
    var $slider;

    /**
     * Plugin starts here
     */
    $.fn.slide = function(userOptions) {
        options = {}
        $slider = $(this.selector);

        // If list, remove list style.
        if ($slider.prop('tagName') == 'UL') {
            $slider.css({'list-style': 'none', padding: 0});
        }

        if (typeof options == 'object') {
            options = userOptions;
        }

        // Wait for load so everything is loaded before we start modifying DOM.
        $(window).load(function() {
            init();
        });
    }

    /**
     * Init function.
     */
    function init() {
        var sliderWrapperClass = 'slider-wrapper';

        $slider.wrap('<div class="' + sliderWrapperClass + '"></div>');
        $sliderWrapper = $('.' + sliderWrapperClass).css({position: 'relative'});

        rearrangeElements();
        showNavigation();
    }

    /**
     * Rearranges the elements so the slider works as it should.
     * Just adds some CSS so nothing to obstrusive.
     */
    function rearrangeElements() {
        var sliderWrapperWidth = $sliderWrapper.parent().width(),
            sliderWrapperHeight = 0;

        $slider.children().each(function(index, element) {
            if ($(element).height() > sliderWrapperHeight) {
                sliderWrapperHeight = $(element).height();
            }
        });

        $sliderWrapper.css({width: sliderWrapperWidth, height: sliderWrapperHeight, overflow: 'hidden'});

        $slider.css({width: '9999px', position: 'absolute', left: 0});
        $slider.children().each(function(index, element) {
            $(element).css({float: 'left'});
        });
    }

    /**
     * Add slider navigation to DOM.
     */
    function showNavigation() {
        var sliderNavigationClass = 'slider-nav';

        $sliderWrapper.before(
            '<ul class="' + sliderNavigationClass + '">' +
              '<li class="prev"><a href="#" class="prev">Prev</a></li>' +
              '<li class="next"><a href="#" class="next">Next</a></li>' +
            '</ul>'
          );

        $('ul.slider-nav').css({'list-style': 'none', padding: 0});

        $sliderNavigation = $('.' + sliderNavigationClass);

        // Add event handlers
        addNavigationEventHandlers();
    }

    /**
     * Add event handlers to slider navigation
     */
    function addNavigationEventHandlers() {
        $sliderNavigation.find('a').click(function(event) {
            event.preventDefault();
            animateSlide(event);
        });
    }

    /**
     * Perform slide if possible. This function disables event handlers for smooth behaviour.
     * @param object event
     */
    function animateSlide(event) {
        var direction = $(event.target).attr('class'),
            distance = getDistanceToSlide(direction);

        if ((direction == 'next' && !isEnd()) || (direction == 'prev' && !isStart())) {
            // Remove click event to precent more clicks during animation
            $sliderNavigation.find('a').off('click');

            var newLeftPosition = -getSlidedDistance() - distance;
            $slider.stop(true, false).animate({left: newLeftPosition}, function() {
                // Enable click again after animation has finished
                addNavigationEventHandlers();
            });
        }
    }

    /**
     * Calculates the distance to slide so next image becomes fully visible.
     * @param string direction
     * @return int elementOffset the distance to slide
     */
    function getDistanceToSlide(direction) {
        if (direction == 'next') {
            elementOffset = getNextElementOffset();

        } else if (direction == 'prev') {
            elementOffset = getPreviousElementOffset();
        }

        return elementOffset;
    }

    /**
     * Get next element scrolling offset.
     */
    function getNextElementOffset() {
        var elementOffset = 0,
            sliderRightEdge = getSlidedDistance() + $sliderWrapper.width();

        $slider.children().each(function(index, element) {
            var $element = $(element);

            elementRightEdge = $(element).position().left + $(element).outerWidth(true);
            if (elementRightEdge > sliderRightEdge) {
                elementOffset = elementRightEdge - sliderRightEdge;
                return false;
            }
        });

        return elementOffset;
    }

    /**
     * Get previous element scrolling offset.
     */
    function getPreviousElementOffset() {
        var sliderChildren = $slider.children().get().reverse(),
            elementOffset = 0,
            sliderLeftEdge = getSlidedDistance();


        $slider.children().each(function(index, element) {
            var $element = $(element),
                elementLeftEdge = $(element).position().left;

            if (elementLeftEdge < sliderLeftEdge) {
                elementOffset = -(sliderLeftEdge - elementLeftEdge);
            }
        });

        return elementOffset;
    }

    /**
     * Get the slided distance.
     * @return int distance
     */
    function getSlidedDistance() {
        distance = $slider.css('left');
        distance = parseInt(distance.replace('px', ''));

        return -distance; // Return a positive value
    }

    /**
     * Check if slider is at the end.
     * @return bool
     */
    function isEnd() {
        if ($slider.children().last().width() + getSlidedDistance() >= $sliderWrapper.width()) {
          return true;
        } else {
          return false;
        }
    }

    /**
     * Check if slider is at the start.
     * @return bool
     */
    function isStart() {
        if (getSlidedDistance() <= 0) {
          return true;
        } else {
          return false;
        }
    }
})(jQuery);