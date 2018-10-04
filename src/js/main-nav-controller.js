let MainNavController = {
  elementWatchers: [],
  init: function() {
    /* -- Overlay Toggle -- */
    let _instance = this;

    let button = $('button.nav-overlay-toggle');
    let navOverlay = $('.nav-overlay');

    let navOverlayItems = navOverlay.find('.links a');
    let navOverlayBackgroundItems = navOverlay.find('.menu-background');

    let navbar = $('nav.main-nav');
    let darkElements = $('.section.is-dark:not(.nav-overlay), .section.is-grey:not(.nav-overlay)');

    button.on('click', function() {
      button.toggleClass('is-active');
      navOverlay.toggleClass('is-active');
    });

    navOverlayItems.on('mouseover', function() {
      navOverlayBackgroundItems.removeClass('is-active');
      navOverlayBackgroundItems.filter('.' + $(this).data('target')).addClass('is-active');
    });

    navOverlayItems.on('mouseout', function() {
      navOverlayBackgroundItems.filter('.' + $(this).data('target')).removeClass('is-active');
    });

    /* -- Color Change in Dark Sections -- */
    let isInitiallyLight = false;
    
    darkElements.each(function(index) {
      let elementWatcher = scrollMonitor.create($(this).get(0));
      _instance.elementWatchers.push(elementWatcher);

      elementWatcher.stateChange(function() {
        if (this.isAboveViewport || $(document).scrollTop() === this.top) {
          navbar.toggleClass('is-light', this.isInViewport && this.isAboveViewport || $(document).scrollTop() === this.top);
        }
      });

      // If any of the elements are overlapping, add the is-light class
      // don't remove it, since elements farther down the page will incorrectly remove it
      if (elementWatcher.isInViewport && elementWatcher.isAboveViewport || $(document).scrollTop() == elementWatcher.top) {
        isInitiallyLight = true;
      }
    });

    navbar.toggleClass('is-light', isInitiallyLight);
  },
  destroy: function() {
    for (let i=0; i< this.elementWatchers.length; i++){
      this.elementWatchers[i].destroy();
    }

    this.elementWatchers = [];
  },
}