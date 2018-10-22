(function() {
  /* -- Common View -- */
  // Methodology from https://github.com/luruke/barba.js/issues/146
  let CommonView = Barba.BaseView.extend({
    namespace: 'common',
    scrollWatchers: [],

    onEnterCompleted: function () {
      try {
        $('body').addClass('animations-enabled');
        MainNavController.init();
        window.scrollTo(0, 0);
        var _instance = this;

        // run element animations when in viewport
        $('.animatable').each(function (index) {
          let scrollWatcher = scrollMonitor.create($(this).get(0));
          _instance.scrollWatchers.push(scrollWatcher);

          $(this).addClass('will-animate');

          scrollWatcher.stateChange(function() {
            if (this.isInViewport) {
              $(this.watchItem).toggleClass('is-active', true);
            } else {
              $(this.watchItem).toggleClass('is-active', false);
            }
          });

          // If any of the elements are visible, add the active class (after an initial delay, to facilitate page transition animation)
          if (scrollWatcher.isInViewport) {
            setTimeout(() => {
              $(scrollWatcher.watchItem).toggleClass('is-active', true);
            }, 50);
          }
        });
      } catch(e) {
        console.log(e);
      }
    },

    /* Clean up scripts */
    onLeave: function() {
      try {
        MainNavController.destroy();

        // destroy element animation scroll watchers 
        for (let i = 0; i < this.scrollWatchers.length; i++) {
          this.scrollWatchers[i].destroy();
        }

        this.scrollWatchers = [];
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
  loadjs([assetsBaseUrl + 'js/main-nav-controller.min.js', assetsBaseUrl + 'js/page-transitions.min.js'], 'main-nav', function() {
    CommonView.init();
    HomeView.init();
    AboutView.init();
    ServicesView.init();
    ContactView.init();
    CaseStudyView.init();

    // initialize barba
    Barba.Pjax.init();
    Barba.Pjax.getTransition = function () {
      return RevealerTransition;
    };
  });
})();
