/**
 * Custom javascript
 *
 */
(function ($) {

  const component = $(".comment-form");
  const first_element_in_first_field = $("> .form-group:first-child > .form-item:first-child .form-control", component);
  const toggle_class = 'is-focused';

  Drupal.behaviors.blog_comments = {
    attach: () => {
      
      // when the first element is focused, give the component the toggle_class
      first_element_in_first_field.on('focus', function(){
        component.addClass(toggle_class);
      });
    },
    detach: () => {
      first_element_in_first_field.unbind();
    }
  };

})(jQuery);
