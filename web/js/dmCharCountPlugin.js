;
(function($) {
    var defaults = {
        allowed: 255,
        warning: 229,
        counterText: 'Characters left:'
    };
    
    var countEventHandler = function() {
        var $this = $(this).closest('.sfWidgetFormDmCharCountTextarea');        
        methods['count'].apply($this,[]);
    };
    
    var methods = {
        init: function() {
            var $this = $(this), data = $this.data('dmCharCountPlugin');
            if (data) return;
            var settings = $.extend({}, defaults, $this.metadata());
            
            settings.charCountNumber = $('<span class="char-count-number"></span>');
            settings.charCountText = $('<span class="char-count-text">' + settings.counterText + ' </span>').append(settings.charCountNumber);
            settings.formField = $this.find('textarea').bind('keydown', countEventHandler).bind('keyup', countEventHandler);
            
            $this.append(settings.charCountText);
            
            $this.data('dmCharCountPlugin', settings);
            
            methods['count'].apply($this,[]); // Initial calculation...
        },
        count: function() {
            var $this = $(this), data = $this.data('dmCharCountPlugin');
            if (!data) methods['init'].apply($this,[]);
            
            var currentCount = data.formField.val().length;
            
            if (currentCount < data.warning) {                
                data.charCountText.removeClass('warning').removeClass('exceeded'); 
                data.charCountNumber.text(data.allowed - currentCount);
                return; 
            } else if (currentCount < data.allowed) {
                data.charCountText.addClass('warning').removeClass('exceeded'); 
                data.charCountNumber.text(data.allowed - currentCount);
                return;
            } else {
                data.charCountText.addClass('warning').addClass('exceeded'); 
                data.charCountNumber.text(0);
                data.formField.val(data.formField.val().substr(0, data.allowed));
                return;
            };
        },
        destroy: function() {
            var $this = $(this), data = $this.data('dmCharCountPlugin');
            if (data) return;
            data.charCountText.remove();
            data.formField.unbind('keydown', countEventHandler).unbind('keyup', countEventHandler);
            $this.data('dmCharCountPlugin', null);
        }
    };
    
    $.fn.dmCharCountPlugin = function(method) {
        return this.each(function(){
            if ( methods[method] ) {
                return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
            } else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( this, arguments );
            } else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.dmCharCountPlugin' );
            }; 
        });
    };
     
})(jQuery);


(function($) {
    
    if ($('#dm_admin_content').length) {
        $('#dm_admin_content').find('.sfWidgetFormDmCharCountTextarea').dmCharCountPlugin();
    };
    
    $('#dm_page div.dm_widget').bind('dmWidgetLaunch', function() {
        $(this).find('.sfWidgetFormDmCharCountTextarea').dmCharCountPlugin();
    });
    
    $('div.dm.dm_widget_edit_dialog_wrap').live('dmAjaxResponse', function() {
        $(this).find('.sfWidgetFormDmCharCountTextarea').dmCharCountPlugin();
    });
    
})(jQuery);