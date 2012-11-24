<?php

/**
 * @author TheCelavi
 */
class dmCharCountPluginConfiguration extends sfPluginConfiguration
{

    /**
     * @see sfPluginConfiguration
     */
    public function initialize()
    {
        $this->dispatcher->connect('dm.form_generator.widget_subclass', array($this, 'listenToFormGeneratorWidgetSubclassEvent'));
    }

    public function listenToFormGeneratorWidgetSubclassEvent(sfEvent $e, $subclass)
    {
        if ($this->isCharCountColumn($e['column'])) {
            $subclass = 'DmCharCountTextarea';
        }
        return $subclass;
    }
    
    protected function isCharCountColumn(sfDoctrineColumn $column) {        
        return false !== strpos(dmArray::get($column->getTable()->getColumnDefinition($column->getName()), 'extra', ''), 'charcount');
    }

}
