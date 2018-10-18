var RevealerTransition = Barba.BaseTransition.extend({
    start: function() {
        Promise.all([this.newContainerLoading, this.animateIn()])
        .then(this.animateOut.bind(this));
    },

    animateIn: function() {        
        $('.revealer').addClass('animate-in');
        // TODO: show preloader animation after transition finishes. 
        return new Promise(function(resolve, reject) {
            var newResolve = resolve;
            setTimeout(function() {
                resolve();
            }, 600);
        });
    },

    animateOut: function() {
        let _this = this;
        _this.done(); // remove old container before transitioning in.

        $('.revealer').removeClass('animate-in').addClass('animate-out');

        // TODO: show preloader animation after transition finishes. 
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                $('.revealer').removeClass('animate-out');
                resolve();
            }, 600);
        });
    }
});