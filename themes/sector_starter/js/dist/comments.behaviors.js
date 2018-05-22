"use strict";

/**
 * Custom javascript
 *
 */
(function ($) {

  var component = $(".comment-form");
  var first_element_in_first_field = $("> .form-group:first-child > .form-item:first-child .form-control", component);
  var toggle_class = 'is-focused';

  Drupal.behaviors.blog_comments = {
    attach: function attach() {

      // when the first element is focused, give the component the toggle_class
      first_element_in_first_field.on('focus', function () {
        component.addClass(toggle_class);
      });
    },
    detach: function detach() {
      first_element_in_first_field.unbind();
    }
  };
})(jQuery);