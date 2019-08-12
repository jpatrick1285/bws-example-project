import ScrollMonitor from 'scrollmonitor';
import { Foundation } from 'foundation-sites/js/foundation.core';

import NavigationController from './NavigationController';

class MainController {
    // main class initialization - runs once on site load
    constructor() {
        this.scrollMonitor = ScrollMonitor;
        Foundation.addToJquery($);

        this.scrollWatchers = [];
        this.navigationController = null;

        // hide preloader 
        $('.revealer').removeClass('show').addClass('animate-out');
        setTimeout(function () {
            $('.revealer').removeClass('animate-out');
        }, 600);
    }

    init() {
        try {
            $(document).foundation();
            $('body').addClass('animations-enabled');
            var _instance = this;

            if (typeof ga === 'function') {
                ga('send', 'pageview', location.pathname);
            }

            // initialize navigation controller
            // this.navigationController = new NavigationController();
            // this.navigationController.init();

            // run element animations when in viewport
            $('.animatable').each(function (index) {
                // create two watchers - one with an offset for enter events, and one without an offset for exit events
                // lets us add visibility classes with an offset, and remove them when the element is completely outside the visible viewport
                let enterScrollWatcher = scrollMonitor.create($(this).get(0), -100);
                let exitScrollWatcher = scrollMonitor.create($(this).get(0), 100);
                _instance.scrollWatchers.push(enterScrollWatcher);
                _instance.scrollWatchers.push(exitScrollWatcher);


                enterScrollWatcher.enterViewport(function () {
                    $(this.watchItem).addClass('is-active');
                });

                exitScrollWatcher.exitViewport(function () {
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
        } catch (e) {
            console.log(e);
        }
    }

    destroy() {
        try {
            // destroy navigation controller
            // this.navigationController.destroy();
            // this.navigationController = null;

            // destroy element animation scroll watchers 
            for (let i = 0; i < this.scrollWatchers.length; i++) {
                this.scrollWatchers[i].destroy();
            }

            this.scrollWatchers = [];
            //$(document).foundation('destroy');
        } catch (e) {
            console.log(e);
        }
    }
}

export default MainController;