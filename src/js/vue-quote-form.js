let QuoteFormController = {
    _vm: null,
    init: function() {
        this._vm = new Vue({
            el: ".section.quote-section",
            delimiters: ['${', '}'],
            data: {
                ajaxError: false,
                submitting: false,
                submitted: false,
                contactType: 'Quote',
                name: null,
                company: null,
                email: null,
                phone: null,
                timeframe: null,
                budget: null,
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
                        'message[Company]': this.company,
                        'message[Timeframe]': this.timeframe,
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