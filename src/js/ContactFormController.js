import Vue from 'vue';
import VueResource from 'vue-resource';
import VeeValidate from 'vee-validate';

class ContactFormController {
    constructor() {
        Vue.use(VueResource);
        Vue.use(VeeValidate, {
            classes: true
        });

        VeeValidate.Validator.extend('minLength', {
            getMessage (field, [length]) {
                return `At least ${length} items must be selected.`;
            },
            validate (value, [length]) {
                    return value.length >= length;
            }
        });

        this._vm = null;
    }

    init() {
        this._vm = new Vue({
            el: ".contact-form-container form.contact-form",
            delimiters: ['${', '}'],
            data: {
                ajaxError: false,
                submitting: false,
                submitted: false,
                buttonLabel: 'SEND MESSAGE',
                name: '',
                email: '',
                phone: '',
                organization: '',
                message: ''
            },
            methods: {
                onSubmit() {
                    this.submitting = true;
                    this.submitted = false;
                    this.ajaxError = false;
                    this.buttonLabel = 'SENDING...';

                    this.$validator.validateAll().then(valid => {
                        if (valid) {
                            this.$http.post('/', this.getData(), {
                                responseType: 'json',
                                emulateJSON: true,
                            })
                            .then((res) => {
                                this.submitting = false;
                                this.submitted = true;
                                this.buttonLabel = 'MESSAGE SENT!';
                                try {
                                    if (typeof(ga) !== undefined) {
                                        ga('send', 'event', 'Forms', 'Contact Submission', 'Contact form submitted');
                                    }
                                } catch (e) {
                                    console.log(e);
                                }
                            }, (err) => {
                                this.buttonLabel = 'SEND MESSAGE';
                                this.submitting = false;
                                this.ajaxError = true;
                                console.log(err);
                            });
                        } else {
                            this.buttonLabel = 'SEND MESSAGE';
                            this.submitting = false;
                        }
                    });
                },
                getData() {
                    let data = {
                        'fromName': this.name,
                        'fromEmail': this.email,
                        'message[Phone]': this.phone,
                        'message[Organization]': this.organization,
                        'message[body]': this.message
                    };

                    data[csrfTokenName] = csrfTokenValue;
                    data['action'] = 'contact-form/send';

                    return data;
                }
            }
        });
    }

    destroy() {
        this._vm.$destroy(true);
        this._vm = null;
    }
}

export default ContactFormController;