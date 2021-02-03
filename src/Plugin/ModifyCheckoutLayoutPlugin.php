<?php

namespace Rubic\CleanCheckoutTheme\Plugin;

use Magento\Checkout\Block\Checkout\LayoutProcessor;
use Magento\Framework\App\ObjectManager;

class ModifyCheckoutLayoutPlugin
{
    /**
     * @return array|null
     */
    public function getRecaptchaSettings()
    {
        try {
            return ObjectManager::getInstance()
                ->create('Magento\ReCaptchaUi\Model\UiConfigResolverInterface')
                ->get('customer_login');
        } catch (\Exception $e) {
            return null;
        }
    }

    public function aroundProcess(LayoutProcessor $layoutProcessor, callable $proceed, ...$args)
    {
        $jsLayout = $proceed(...$args);
        $settings = $this->getRecaptchaSettings();

        if (!is_array($settings)) {
            return $jsLayout;
        }

        $additionalFormFields =& $jsLayout['components']['checkout']['children']
            ['steps']['children']
            ['email-step']['children']
            ['customer-email']['children']
            ['additional-login-form-fields']['children'];

        $additionalFormFields['recaptcha'] = [
            'component'   => 'Magento_ReCaptchaFrontendUi/js/reCaptcha',
            'displayArea' => 'additional-login-form-fields',
            'reCaptchaId' => 'recaptcha-popup-login',
            'settings'    => $settings
        ];

        return $jsLayout;
    }
}
