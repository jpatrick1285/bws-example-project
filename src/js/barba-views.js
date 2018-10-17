(function() {
  /* -- Common View -- */
  // Methodology from https://github.com/luruke/barba.js/issues/146
  let CommonView = Barba.BaseView.extend({
    namespace: 'common',

    onEnterCompleted: function () {
      try {
        MainNavController.init();
        window.scrollTo(0, 0);
      } catch(e) {
        console.log(e);
      }
    },

    /* Clean up scripts */
    onLeave: function() {
      try {
        MainNavController.destroy();
      } catch(e) {
        console.log(e);
      }
    }
  });

  /* -- Home View -- */
  let HomeView = CommonView.extend({
    namespace: 'home'
  });

  /* -- About View -- */
  let AboutView = CommonView.extend({
    namespace: 'about',
    onEnterCompleted: function () {
      CommonView.onEnterCompleted.apply(this);
    },
    onLeave: function() {
      CommonView.onLeave.apply(this);
    }
  });

  /* -- Services View -- */
  let ServicesView = CommonView.extend({
    namespace: 'services'
  });

  /* -- Contact View -- */
  let ContactView = CommonView.extend({
    namespace: 'contact',
    onEnterCompleted: function () {
      CommonView.onEnterCompleted.apply(this);
      loadjs(assetsBaseUrl + 'js/vue-quote-form.min.js', function() {
        if (QuoteFormController) {
          QuoteFormController.init();
        }
      });
    },
    onLeave: function () {
      CommonView.onLeave.apply(this);
      if (QuoteFormController) {
        QuoteFormController.destroy();
      }
    }
  });

  /* -- Case Study View -- */
  let CaseStudyView = CommonView.extend({
    namespace: 'projects'
  });
  
  // import common view requirements and initialize views
  // other pages can load these later.
  loadjs(assetsBaseUrl + 'js/main-nav-controller.min.js', 'main-nav', function() {
    CommonView.init();
    HomeView.init();
    AboutView.init();
    ServicesView.init();
    ContactView.init();
    CaseStudyView.init();

    // initialize barba
    Barba.Pjax.init();
  });
})();
