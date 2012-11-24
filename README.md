dmCharCountPlugin for Diem Extended
===============================

Author: [TheCelavi](http://www.runopencode.com/about/thecelavi)  
Version: 1.0.0  
Stability: Stable  
Date: November 10th, 2012  
Courtesy of [Run Open Code](http://www.runopencode.com)   
License: [Free for all](http://www.runopencode.com/terms-and-conditions/free-for-all)

dmCharCountPlugin turns your textarea into char countable field.

You can use this widget in booth Admin, Front and for your forms:

- To have this field in admin, for your field, add in schema.yml:  `extra: charcount`

Example: 

    Testobj: 
      actAs: 
        DmSortable:
      columns:
        title:            { type: string(255), notnull: true }      
        is_active:        { type: boolean, notnull: true, default: false }     
        meta_keywords:    { type: string(255), notnull: true } 
        meta_description: { type: string(255), notnull: true, extra: charcount }

In base form of your class the form widget will be used: 
`new sfWidgetFormDmCharCountTextarea()`.

You can configure this widget on several different ways, via `config.yml` and in
constructor of the class passing the options.

Available options for configuration
------------------------------

- `allowed`, int, default 255, maximum allowed chars.
- `warning`, int or percentage, default is 10%, on which number of chars to warn 
about possible exceeding of maximum number of chars. You can enter exact number
of chars when you want for user to be warn.
- `counterText`, string, default is 'Characters left:'. The string is translated 
before it is rendered.

In `config.yml` are default settings for the widget:

    default:
      dmCharCountPlugin:
        all:
          allowed: 255
          warning: 10%
          counterText: 'Characters left:'


`all` is for all form widgets - the default configuration. You can add the name 
of the form field for extra configuration options. 

Example for `config.yml`:

    default:
      dmCharCountPlugin:
        all:
          allowed: 255
          warning: 10%
          counterText: 'Characters left:'
        my_form[my_field]:
          allowed: 500

Of course, you can pass options into constructor of the widget as well:

    new sfWidgetFormDmCharCountTextarea(array(
        'allowed' => 255,
        'warning' => '10%',
        'counterText' => 'Characters left:'
    ))

Importance of configuration:
-------------------------

1. Constructor
2. Config for specific form widget by its name
3. Config for all form widgets