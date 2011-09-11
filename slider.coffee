class slider

  # variables
  collection = '';
  wrapper = '.page-wrapper'
  distance = 240

  ###
  init method
  ###
  slide: (collection) ->
    if jQuery(collection).length is 0
      return
    @collection = collection
    @showNavigation()
    null

  ###
  add navigation if slide contains enough elements
  ###
  showNavigation: ->
    if @checkPosition() is true
      jQuery('<ul class="nav"><li class="prev">Prev</li><li class="next">Next</li></ul>').appendTo(@collection)
      # check position again and add event handlers
      @checkPosition()

  ###
  return slider position
  ###
  getPosition: ->
    position = jQuery(@collection + ' div').css('left')
    parseInt(position.replace('px', ''))

  ###
  return the width of the wrapper containing the elements to slide
  ###
  getWidth: ->
    width = 0;
    # we are only interested of the last elements position + the width
    # there's probably a better way to do this without the loop
    jQuery(@collection + ' div').each ->
      width = this.offsetWidth + this.offsetLeft
      null
    width

  ###
  return the distance to slide
  ###
  getDistance: ->
    distance

  ###
  check if slide is at the end
  ###
  isEnd: ->
    if @getWidth() + @getPosition() <= jQuery(@collection).width() then true else false

  ###
  check if slide is at the start
  ###
  isStart: ->
    if @getPosition() >= 0 then true else false

  ###
  event handler
  ###
  clickHandler:(event) =>
    clicked = event.srcElement.className
    if clicked is 'next'
      move = @getDistance()
    if clicked is 'prev'
      move = -@getDistance()

    # doesn't have to be a div...
    jQuery('.featured-products > div').stop(true, false).animate({left: @getPosition() - move}, =>
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
      jQuery(@collection + ' .nav .next').one('click', @clickHandler)
    else if @isEnd()
      jQuery(@collection + ' .nav .prev').one('click', @clickHandler)
    else
      jQuery(@collection + ' .nav li').one('click', @clickHandler)
    true

window.slide = (collection) ->
  slider = new slider()
  slider.slide(collection)