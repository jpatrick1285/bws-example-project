class NavigationController {
    constructor() {
        this.navigationContainer = null;
        this.mobileNavToggle = null;
        this.scrollTimeout = null;

        this.tolerance = 5; // the amount scrolled in one event before triggering pinning, used to stop flickering navbar on smooth scroll
        this.pinnedOffset = 50; // vertical offset in px before element is first unpinned
        this.topClass = 'is-top'; // class added to element when above offset
        this.notTopClass = 'is-not-top'; // class added to element when below offset
        this.pinnedClass = 'is-pinned'; // class added to element when pinned
        this.unpinnedClass = 'is-unpinned'; // class added to element when unpinned
        this.frozen = false; // freezes pin and unpin class changes

        this.isMobileNavOpen = false;
        this.lastKnownScrollY = 0; // holds last known scroll position, used for pinning or unpinning the element
    }

    init() {
        // this.navigationContainer = $('.main-nav-container');
        // this.mobileNavToggle = $('button.mobile-nav-toggle', this.navigationContainer);

        // $(window).on('scroll.bws-navigation-controller', (event) => this.onScroll(event));
        // this.mobileNavToggle.on('click.bws-navigation-controller', (event) => this.toggleMobileNav(event));

        // this.onScroll(null); // trigger event once to add initial classes
    }

    onScroll(event) {
        // If there's a scroll timer already existing, cancel it
        if (this.scrollTimeout) {
            window.cancelAnimationFrame(this.scrollTimeout);
        }

        // Setup the new requestAnimationFrame
        this.scrollTimeout = window.requestAnimationFrame(() => {
            let currentScrollY = $(document).scrollTop();
            let scrollDirection = currentScrollY > this.lastKnownScrollY ? 'down' : 'up';

            // set top or not top based on current scroll position and offset
            if (currentScrollY >= this.pinnedOffset) {
                this.setNotTop();
            } else {
                this.setTop();
            }

            // set pinned or not based on distance scrolled and direction
            if (scrollDirection === 'down' && currentScrollY >= this.lastKnownScrollY && Math.abs(currentScrollY - this.lastKnownScrollY) >= this.tolerance) {
                this.setUnpinned();
            } else if (scrollDirection === 'up' && currentScrollY <= this.lastKnownScrollY && Math.abs(currentScrollY - this.lastKnownScrollY) >= this.tolerance) {
                this.setPinned();
            }

            this.lastKnownScrollY = currentScrollY;
        });
    }

    toggleMobileNav(event) {
        if (this.isMobileNavOpen) {
            // this.mobileNavToggle.removeClass('is-active');
            // $('.page-wrapper').removeClass('mobile-nav-active');
            // $('ul.menu', this.navigationContainer).removeClass('is-active');

            // $('ul.menu .menu-item a', this.navigationContainer).off('click.bws-navigation-controller');
            // this.frozen = false;
        } else {
            // this.mobileNavToggle.addClass('is-active');
            // $('.page-wrapper').addClass('mobile-nav-active');
            // $('ul.menu', this.navigationContainer).addClass('is-active');

            // $('ul.menu .menu-item a', this.navigationContainer).on('click.bws-navigation-controller', (event) => this.toggleMobileNav(event));
            // this.frozen = true;
        }

        this.isMobileNavOpen = !this.isMobileNavOpen;
    }

    freezePinning() {
        this.frozen = true;
    }

    unfreezePinning() {
        this.frozen = false;
    }

    setTop() {
        if (this.navigationContainer.hasClass(this.notTopClass)) {
            this.navigationContainer.removeClass(this.notTopClass);
        }

        if (!this.navigationContainer.hasClass(this.topClass)) {
            this.navigationContainer.addClass(this.topClass);
        }
    }

    setNotTop() {
        if (this.navigationContainer.hasClass(this.topClass)) {
            this.navigationContainer.removeClass(this.topClass);
        }

        if (!this.navigationContainer.hasClass(this.notTopClass)) {
            this.navigationContainer.addClass(this.notTopClass);
        }
    }

    setPinned() {
        if (!this.frozen) {
            if (this.navigationContainer.hasClass(this.unpinnedClass)) {
                this.navigationContainer.removeClass(this.unpinnedClass);
            }

            if (!this.navigationContainer.hasClass(this.pinnedClass)) {
                this.navigationContainer.addClass(this.pinnedClass);
            }
        }
    }

    setUnpinned() {
        if (!this.frozen) {
            if (this.navigationContainer.hasClass(this.pinnedClass)) {
                this.navigationContainer.removeClass(this.pinnedClass);
            }

            if (!this.navigationContainer.hasClass(this.unpinnedClass)) {
                this.navigationContainer.addClass(this.unpinnedClass);
            }
        }
    }

    destroy() {
        window.removeEventListener('scroll', this.onScroll);
        this.mobileNavToggle.off('click.bws-navigation-controller');
        //$('ul.menu .menu-item a', this.navigationContainer).off('click.bws-navigation-controller');

        this.mobileNavToggle = null;
        this.scrollTimeout = null;
        this.navigationContainer = null;
        this.lastKnownScrollY = 0;
    }
}

export default NavigationController;