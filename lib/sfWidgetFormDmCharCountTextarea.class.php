<?php

/**
 * @author TheCelavi
 */
class sfWidgetFormDmCharCountTextarea extends sfWidgetFormTextarea
{
    
    public function __construct($options = array(), $attributes = array())
    {
        $this->addOption('allowed')
            ->addOption('warning')
            ->addOption('counterText');
        
        parent::__construct($options, $attributes);
    }

    public function render($name, $value = null, $attributes = array(), $errors = array())
    {
        // Defaults first
        $defaults = sfConfig::get('dm_dmCharCountPlugin_all');
        // Override from specific settings
        $settings = sfConfig::get(sprintf('dm_dmCharCountPlugin_%s', $name), array());
        $settings = array_merge($defaults, $settings);
        // Override from options from constructor
        if (!is_null($this->getOption('allowed'))) $settings['allowed'] = $this->getOption('allowed');
        if (!is_null($this->getOption('warning'))) $settings['warning'] = $this->getOption('warning');
        if (!is_null($this->getOption('counterText'))) $settings['counterText'] = $this->getOption('counterText');
        
        // Do parse
        if (!is_numeric($settings['warning'])) {
            $settings['warning'] = (int) str_replace('%', '', $settings['warning']);
            $settings['warning'] = $settings['allowed'] - ceil((($settings['allowed'] / 100) * $settings['warning']));
        }

        $helper = dmContext::getInstance()->getServiceContainer()->getService('helper');
        $i18n = dmContext::getInstance()->getServiceContainer()->getService('i18n');
        return $helper->tag(
            'span.sfWidgetFormDmCharCountTextarea', 
            array('json' => $settings), 
            parent::render($name, $value, $attributes, $errors)
        );
    }

    public function getStylesheets()
    {
        return array_merge(parent::getStylesheets(), array(
                'dmCharCountPlugin.default' => null
            ));
    }

    public function getJavaScripts()
    {

        return array_merge(
                parent::getJavaScripts(), array(
                'dmCharCountPlugin.launch'
            ));
    }

}
