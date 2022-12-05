/**
 * Copyright © 2018 Rubic. All rights reserved.
 * See LICENSE.txt for license details.
 */
define([
    'ko',
    'Magento_Customer/js/model/customer',
    'Magento_Checkout/js/model/address-converter',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/action/select-shipping-address',
    'mage/translate'
], function (ko, customer, addressConverter, quote, selectShippingAddress, $t) {
    'use strict';

    return function (target) {
        return target.extend({
            /**
             * Disable visibility on shipping, since it's no longer the first step.
             */
            visible: ko.observable(customer.isLoggedIn() && !quote.isVirtual()),

            /**
             * Backport of fix MAGETWO-83272, allow navigation between steps.
             */
            navigate: function (step) {
                step && step.isVisible(true);
            },

            /**
             * Removed email validation as we do that in a previous step.
             */
            validateShippingInformation: function () {
                var shippingAddress,
                    addressData,
                    field;

                if (!quote.shippingMethod()) {
                    this.errorValidationMessage($t('Please specify a shipping method.'));

                    return false;
                }

                if (this.isFormInline) {
                    this.source.set('params.invalid', false);

                    if (typeof this.triggerShippingDataValidateEvent !== 'undefined') {
                        this.triggerShippingDataValidateEvent();
                    }

                    if (this.source.get('params.invalid') ||
                        !quote.shippingMethod()['method_code'] ||
                        !quote.shippingMethod()['carrier_code']
                    ) {
                        this.focusInvalid();

                        return false;
                    }

                    shippingAddress = quote.shippingAddress();
                    addressData = addressConverter.formAddressDataToQuoteAddress(
                        this.source.get('shippingAddress')
                    );

                    //Copy form data to quote shipping address object
                    for (field in addressData) {
                        if (addressData.hasOwnProperty(field) && //eslint-disable-line max-depth
                            shippingAddress.hasOwnProperty(field) &&
                            typeof addressData[field] != 'function' &&
                            _.isEqual(shippingAddress[field], addressData[field])
                        ) {
                            shippingAddress[field] = addressData[field];
                        } else if (typeof addressData[field] != 'function' &&
                            !_.isEqual(shippingAddress[field], addressData[field])) {
                            shippingAddress = addressData;
                            break;
                        }
                    }

                    if (customer.isLoggedIn()) {
                        shippingAddress['save_in_address_book'] = 1;
                    }
                    selectShippingAddress(shippingAddress);
                }
                return true;
            }
        });
    }
});