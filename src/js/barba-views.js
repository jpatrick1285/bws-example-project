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
                    // create two watchers - one with an offset for enter events, and one without an offset for exit events
                    // lets us add visibility classes with an offset, and remove them when the element is completely outside the visible viewport
                    let enterScrollWatcher = scrollMonitor.create($(this).get(0), -100);
                    let exitScrollWatcher = scrollMonitor.create($(this).get(0), 100);
                    _instance.scrollWatchers.push(enterScrollWatcher);
                    _instance.scrollWatchers.push(exitScrollWatcher);


                    enterScrollWatcher.enterViewport(function() {
                        $(this.watchItem).addClass('is-active');
                    });

                    exitScrollWatcher.exitViewport(function() {
                        $(this.watchItem).removeClass('is-active');
                    });

                    // If any of the elements are visible, add the active class (after an initial delay, to facilitate page transition animation)
                    $(this).addClass('will-animate');
                    $(this).removeClass('is-active');

                    if (exitScrollWatcher.isInViewport) {
                        setTimeout(() => {
                            $(exitScrollWatcher.watchItem).addClass('is-active');
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
        teamSlider: null,
        onEnterCompleted: function () {
            CommonView.onEnterCompleted.apply(this);
            loadjs(assetsBaseUrl + 'js/flickity.pkgd.min.js', () => {
                this.teamSlider = new Flickity('.team-slider.slider .track', {
                    freeScroll: true,
                    prevNextButtons: false,
                    contain: true,
                    friction: 0.3,
                    //pageDots: false
                });
            });
        },
        onLeave: function() {
            CommonView.onLeave.apply(this);
            if (this.teamSlider) {
                this.teamSlider.destroy();
                this.teamSlider = null;
            }
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
            loadjs(assetsBaseUrl + 'js/vue-quote-form.min.js', () => {
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
    loadjs([assetsBaseUrl + 'js/main-nav-controller.min.js', assetsBaseUrl + 'js/page-transitions.min.js'], 'main-nav', () => {
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
