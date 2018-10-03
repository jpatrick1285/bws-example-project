$(function() {
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
  })
});