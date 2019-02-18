let QuoteFormController = {
    _vm: null,
    init: function() {
        this._vm = new Vue({
            el: ".section.contact-section",
            delimiters: ['${', '}'],
            data: {
                ajaxError: false,
                submitting: false,
                submitted: false,
                name: null,
                email: null,
                phone: null,
                budget: 'none',
                message: null,
            },
            methods: {
                onSubmit() {
                    this.submitting = true;
                    this.submitted = false;

                    this.$validator.validateAll().then(valid => {
                        if (valid) {
                            this.$http.post('/', this.getData(), {
                                responseType: 'json',
                                emulateJSON: true,
                            })
                            .then((res) => {
                                this.submitting = false;
                                this.submitted = true;

                                if (ga) {
                                    ga('send', 'event', 'Forms', 'Quote Submission', 'Quote form submitted');
                                }
                            }, (err) => {
                                this.submitting = false;
                                console.log(err);
                            });
                        } else {
                            this.submitting = false;
                        }
                    });
                },
                getData() {
                    let data = {
                        action: 'contact-form/send',
                        'fromName': this.name,
                        'fromEmail': this.email,
                        'message[Budget]': this.budget,
                        'message[body]': this.message
                    };

                    data[csrfTokenName] = csrfTokenValue;

                    // add optional fields
                    if (this.phone) {
                        data['message[Phone]'] = this.phone;
                    }

                    return data;
                }
            }
        });
    },
    destroy: function() {
        this._vm.$destroy(true);
        this._vm = null;
    }
};

(function () {

})();