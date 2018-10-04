(function() {
  /* -- Common View -- */
  // Methodology from https://github.com/luruke/barba.js/issues/146
  let CommonView = Barba.BaseView.extend({
    namespace: 'common',

    onEnterCompleted: function () {
      MainNavController.init();
    },

    /* Clean up scripts */
    onLeave: function() {
      MainNavController.destroy();
    }
  });

  /* -- Home View -- */
  let HomeView = CommonView.extend({
    namespace: 'home',
  });
  
  // import common view requirements and initialize views
  // other pages can load these later.
  loadjs(assetsBaseUrl + 'js/main-nav-controller.min.js', 'main-nav', function() {
    CommonView.init();
    HomeView.init();

    // initialize barba
    Barba.Pjax.init();
  });
})();
