/**
 *
 * Custom javascript
 *
 */
(function ($) {
  const clickTrigger = Modernizr.touch ? 'touchstart' : 'click';

  Drupal.behaviors.scrollHelpers = {
    attach: (context) => {
      /**
      * Add classes to the body when user scolls down and is near the bottom
      * Used in CSS to hide/show the back to top link.
      * Used in CSS to hide/show 'back to table of contents link' on multipages.
      */
      const attachClassTo = $('body');
      const threshold = 1200;
      const classes = {
        down: 'you-are-going-down',
        bottom: 'you-are-near-the-bottom',
      };

      function addScrollClasses() {
        const scrollTop = $(this).scrollTop();
        (scrollTop > threshold) ? attachClassTo.addClass(classes.down) : attachClassTo.removeClass(classes.down);
        ((scrollTop + $(window).height()) > ($(document).height() - 800)) ? attachClassTo.addClass(classes.bottom) : attachClassTo.removeClass(classes.bottom);
      }

      $(window).scroll(addScrollClasses);
      $(window).resize(addScrollClasses);

      $('.action--back-to-top', context).on('click', function (evt) {
        const href = $(this).attr('href');
        $('html, body').animate({
          scrollTop: $(href).offset().top,
        }, 800);
        evt.preventDefault();
      });
    },
  };

  Drupal.behaviors.formEnhancements = {
    attach: (context) => {
      /**
       * Radios & Checkboxes.
       *
       * Add class="is-checked" to the parent element of checked inputs
       * on page load. The CSS uses this class to exaggerate checked input.
       */
      $('input:checked', context).closest('.form-type-radio, .form-type-checkbox').addClass('is-checked');

      /**
       * Radios.
       */
      $('.form-radio', context).on(clickTrigger, function () {
        $(this).closest('.fieldset-wrapper').find('.is-checked').removeClass('is-checked');
        $(this).parents('.form-type-radio').addClass('is-checked');
      });

      /**
       * Checkboxes.
       */
      $('input:checkbox', context).change(function () {
        $(this).closest('.form-type-checkbox').toggleClass('is-checked', this.checked);
      });
    },
  };
}(jQuery));
