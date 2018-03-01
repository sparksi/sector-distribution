(function ($, Drupal) {

    'use strict';

    Drupal.behaviors.admin_ui_toggle = {
        attach: function (context, settings) {
            $("button",".admin-ui-toggle").on('click', function(evt){
                $("body").toggleClass("admin-ui-hide");
                if ($("body").hasClass('admin-ui-hide')) {
                    $('.admin-ui-toggle').addClass('ui-is-hidden');
                } else {
                    $('.admin-ui-toggle').removeClass('ui-is-hidden');
                }
                evt.preventDefault();
            });
        }
    };
})(jQuery, Drupal);