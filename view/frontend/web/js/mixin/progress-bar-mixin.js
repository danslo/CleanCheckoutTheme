/**
 * Copyright © 2018 Rubic. All rights reserved.
 * See LICENSE.txt for license details.
 */
define([
    'ko',
    'Magento_Customer/js/model/customer'
], function (
    ko,
    customer
) {
    'use strict';

    /**
     * Override progress bar template so we can style the step icons.
     */
    return function (target) {
        return target.extend({
            defaults: {
                template: 'Rubic_CleanCheckoutTheme/progress-bar',
                visible: true
            },
            isCustomerLoggedIn: ko.observable(customer.isLoggedIn())
        });
    }
});
