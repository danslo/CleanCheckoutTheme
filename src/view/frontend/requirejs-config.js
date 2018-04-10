/**
 * Copyright © 2018 Rubic. All rights reserved.
 * See LICENSE.txt for license details.
 */
var config = {
    config: {
        mixins: {
            'Magento_Checkout/js/model/step-navigator': {
                'Rubic_CleanCheckoutTheme/js/mixin/navigator-mixin': true
            },
            'Magento_Checkout/js/view/progress-bar': {
                'Rubic_CleanCheckoutTheme/js/mixin/progress-bar-mixin': true
            },
            'Magento_Checkout/js/view/shipping': {
                'Rubic_CleanCheckoutTheme/js/mixin/shipping-mixin': true
            },
            'Magento_Checkout/js/view/payment': {
                'Rubic_CleanCheckoutTheme/js/mixin/payment-mixin': true
            }
        }
    }
};