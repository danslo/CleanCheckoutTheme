/**
 * Copyright © 2018 Rubic. All rights reserved.
 * See LICENSE.txt for license details.
 */
define([
    'ko',
    'Magento_Checkout/js/model/quote',
    'Magento_Customer/js/model/customer'
], function (ko, quote, customer) {
    'use strict';

    return function (target) {
        return target.extend({
            /**
             * Remove email step in payment template for virtual quotes.
             */
            defaults: {
                template: 'Rubic_CleanCheckoutTheme/payment',
                activeMethod: ''
            },

            /**
             * Disable visibility on billing, since it's no longer the first step.
             */
            isVisible: ko.observable(customer.isLoggedIn() && quote.isVirtual())
        });
    };
});