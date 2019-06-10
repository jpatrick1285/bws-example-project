import Vue from 'vue';
import VueResource from 'vue-resource';
import VeeValidate from 'vee-validate';

class OrderFormController {
    constructor() {
        Vue.use(VueResource);
        Vue.use(VeeValidate, {
            classes: true
        });

        VeeValidate.Validator.extend('minLength', {
            getMessage(field, [length]) {
                return `At least ${length} items must be selected.`;
            },
            validate(value, [length]) {
                return value.length >= length;
            }
        });

        this._vm = null;
    }

    init() {
        this._vm = new Vue({
            el: ".section.order-form-section .section-content-container",
            delimiters: ['${', '}'],
            data: {
                ajaxError: false,
                submitting: false,
                submitted: false,
                name: '',
                email: '',
                phone: '',
                company: '',
                products: [],
                message: ''
            },
            methods: {
                onSubmit() {
                    this.submitting = true;
                    this.submitted = false;
                    this.ajaxError = false;

                    this.$validator.validateAll().then(valid => {
                        if (valid) {
                            this.$http.post('/', this.getData(), {
                                responseType: 'json',
                                emulateJSON: true,
                            })
                                .then((res) => {
                                    this.submitting = false;
                                    this.submitted = true;
                                    try {
                                        if (typeof (ga) !== undefined) {
                                            ga('send', 'event', 'Forms', 'Quote Submission', 'Quote form submitted');
                                        }
                                    } catch (e) {
                                        console.log(e);
                                    }
                                }, (err) => {
                                    this.submitting = false;
                                    this.ajaxError = true;
                                    console.log(err);
                                });
                        } else {
                            this.submitting = false;
                        }
                    });
                },
                getData() {
                    let data = {
                        'fromName': this.name,
                        'fromEmail': this.email,
                        'message[Phone]': this.phone,
                        'message[Products]': this.products,
                        'message[Company]': this.company,
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

export default OrderFormController;