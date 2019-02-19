import Barba from 'barba';
import ScrollMonitor from 'scrollmonitor';

import RevealerTransition from './RevealerTransition';

class BarbaViews {
    constructor() {
        this.scrollMonitor = ScrollMonitor;
    }
    
    init() {
        /* -- Common View -- */
        // Methodology from https://github.com/luruke/barba.js/issues/146
        let CommonView = Barba.BaseView.extend({
            namespace: 'common',
            scrollWatchers: [],

            onEnterCompleted: function () {
                try {
                    $('body').addClass('animations-enabled');
                    window.scrollTo(0, 0);
                    var _instance = this;

                    if (typeof ga === 'function') {
                        ga('send', 'pageview', location.pathname);
                    }

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
        
        // initialize views
        CommonView.init();
        HomeView.init();

        // initialize barba
        Barba.Pjax.init();
        Barba.Pjax.getTransition = function () {
            return RevealerTransition;
        };

        // hide preloader 
        $('.revealer').removeClass('show').addClass('animate-out');
        setTimeout(function () {
            $('.revealer').removeClass('animate-out');
        }, 600);
    }
}

export { BarbaViews };