$(function() {
  /* -- Overlay Toggle -- */
  let button = $('button.nav-overlay-toggle');
  let navOverlay = $('.nav-overlay');
  let activeClass = 'is-active';

  let navOverlayItems = navOverlay.find('.links a');
  let navOverlayBackgroundItems = navOverlay.find('.menu-background');

  button.on('click', function() {
    button.toggleClass(activeClass);
    navOverlay.toggleClass(activeClass);
  });

  navOverlayItems.on('mouseover', function() {
    console.log(navOverlayBackgroundItems);
    navOverlayBackgroundItems.removeClass(activeClass);
    navOverlayBackgroundItems.filter('.' + $(this).data('target')).addClass(activeClass);
  });

  navOverlayItems.on('mouseout', function() {
    navOverlayBackgroundItems.filter('.' + $(this).data('target')).removeClass(activeClass);
  });
});

$(function() {
  /* -- Color Change in Dark Sections -- */
  let navbar = $('nav.main-nav');
  let darkElements = $('.section.is-dark:not(.nav-overlay), .section.is-grey:not(.nav-overlay)');
   
  darkElements.each(function(index) {
    let elementWatcher = scrollMonitor.create($(this).get(0));

    elementWatcher.stateChange(function() {
      navbar.toggleClass('is-light', this.isInViewport && this.isAboveViewport || $(document).scrollTop() === this.top);
    });

    // if this is the first element, check if we're overlapping on page load
    if (index === 0) {
      elementWatcher.update();
      navbar.toggleClass('is-light', elementWatcher.isInViewport && elementWatcher.isAboveViewport || $(document).scrollTop() == elementWatcher.top);
    }
  });

});