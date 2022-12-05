/**
 * Copyright © 2018 Rubic. All rights reserved.
 * See LICENSE.txt for license details.
 */
define([

], function () {
    'use strict';

    /**
     * Override progress bar template so we can style the step icons.
     */
    return function (target) {
        return target.extend({
            // We have disabled this component and no validation should take place
            validatePickupInformation: function () {
                return true;
            }
        });
    }
});
