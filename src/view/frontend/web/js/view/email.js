/**
 * Copyright © 2018 Rubic. All rights reserved.
 * See LICENSE.txt for license details.
 */
define([
    'jquery',
    'ko',
    'uiComponent',
    'underscore',
    'Magento_Checkout/js/model/step-navigator',
    'Magento_Customer/js/customer-data',
    'Magento_Customer/js/model/customer',
    'mage/translate',
    'Rubic_CleanCheckoutTheme/js/bindings/transitions'
], function ($, ko, Component, _, stepNavigator, customerData, customer, $t) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Rubic_CleanCheckoutTheme/email'
        },

        loginFormSelector: 'form[data-role=email-with-possible-login]',

        isVisible: ko.observable(!customer.isLoggedIn()),

        initialize: function () {
            this._super();
            stepNavigator.registerStep('email', null, $t('Login'), this.isVisible, _.bind(this.navigate, this), 5);
            return this;
        },

        navigate: function () {
            if (customer.isLoggedIn()) {
                this.navigateToNextStep();
            } else {
                this.isVisible(true);
            }
        },

        validateEmail: function () {
            var emailValidationResult = customer.isLoggedIn();

            if (!customer.isLoggedIn()) {
                $(this.loginFormSelector).validation();
                emailValidationResult = Boolean($(this.loginFormSelector + ' input[name=username]').valid());
            }
            return emailValidationResult;
        }
    });
});
