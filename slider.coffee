class slider

  # variables
  collectionWrapper = '';
  navigationClass = ''

  ###
  init method
  ###
  slide: (collection) ->
    if jQuery(collection).length is 0
      return
    @collectionWrapper = collection
    @navigationClass = collection + '-nav'
    @showNavigation()
    null

  ###
  add navigation if slide contains enough elements
  ###
  showNavigation: ->
    if @checkPosition() is true
      jQuery(@collectionWrapper).before('<ul class="slider-nav ' + @navigationClass.replace('.', '') + '"><li class="prev">Prev</li><li class="next">Next</li></ul>')
      # check position again and add event handlers
      @checkPosition()

  ###
  return slider position
  ###
  getPosition: ->
    position = jQuery(@collectionWrapper).css('left')
    parseInt(position.replace('px', ''))

  ###
  return the width of the wrapper containing the elements to slide
  ###
  getWidth: ->
    width = 0;
    # we are only interested of the last elements position + the width
    # there's probably a better way to do this without the loop
    jQuery(@collectionWrapper + ' div').each ->
      width = this.offsetWidth + this.offsetLeft
      null
    width

  ###
  return the distance to slide
  ###
  getDistance: ->
    # check last element. first element can have wierd margin
    element = jQuery(@collectionWrapper + ' > div:last-child')
    width = element.width();
    width += parseInt(element.css("padding-left"), 10) + parseInt(element.css("padding-right"), 10);
    width += parseInt(element.css("margin-left"), 10) + parseInt(element.css("margin-right"), 10);
    width += parseInt(element.css("borderLeftWidth"), 10) + parseInt(element.css("borderRightWidth"), 10);
    width

  ###
  check if slide is at the end
  ###
  isEnd: ->
    if @getWidth() + @getPosition() <= jQuery(@collectionWrapper + '-wrapper').width() then true else false

  ###
  check if slide is at the start
  ###
  isStart: ->
    if @getPosition() >= 0 then true else false

  ###
  event handler
  ###
  clickHandler:(event) =>
    clicked = jQuery(event.currentTarget).attr('class')
    if clicked is 'next'
      move = @getDistance()
    if clicked is 'prev'
      move = -@getDistance()

    # doesn't have to be a div...
    jQuery(@collectionWrapper).stop(true, false).animate({left: @getPosition() - move}, =>
      @checkPosition()
    )

  ###
  check slide position and add event handlers
  ###
  checkPosition: ->
    # edge case, if there are exactly or less things to slide
    if @isStart() and @isEnd()
      # disable scroll
      return false;
    else if @isStart()
      jQuery(@navigationClass + ' .next').one('click', @clickHandler)
    else if @isEnd()
      jQuery(@navigationClass + ' .prev').one('click', @clickHandler)
    else
      jQuery(@navigationClass + ' li').one('click', @clickHandler)
    true

window.slide = (collection) ->
  slider = new slider()
  slider.slide(collection)