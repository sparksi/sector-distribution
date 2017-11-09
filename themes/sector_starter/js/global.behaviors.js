"use strict";

/*
 * == SECTOR == 
 * This is a transpiled file, please make changes to src/filename.js
 * and transpile with `yarn run gulp run babel`
 */

/**
 * Custom javascript
 *
 */
(function ($) {

  Drupal.behaviors.scrollHelpers = {
    attach: function attach(context, settings) {
      /**
      * Add classes to the body when user scolls down and is near the bottom
      * Used in CSS to hide/show the back to top link.
      * Used in CSS to hide/show 'back to table of contents link' on multipages.
      *
      */
      var attachClassTo = $('body');
      var threshold = 1200;
      var classes = {
        down: "you-are-going-down",
        bottom: "you-are-near-the-bottom"
      };
      $(window).scroll(_addScrollClasses);
      $(window).resize(_addScrollClasses);

      function _addScrollClasses() {
        var _scrollTop = $(this).scrollTop();
        _scrollTop > threshold ? attachClassTo.addClass(classes.down) : attachClassTo.removeClass(classes.down);
        _scrollTop + $(window).height() > $(document).height() - 800 ? attachClassTo.addClass(classes.bottom) : attachClassTo.removeClass(classes.bottom);
      }
    }
  };

  Drupal.behaviors.formEnhancements = {
    attach: function attach(context, settings) {

      /**
      * Radios & Checkboxes
      * Add class="is-checked" to the parent element of checked inputs
      * on page load. The CSS uses this class to exaggerate checked input.
      * 
      */

      /**
      * Radios
      */
      $("input:checked", context).parent('.form-type-radio, .form-type-checkbox').addClass('is-checked');

      $('input.form-radio', context).change(function () {
        if ($(this).prop('checked')) {
          $('input.form-radio').parent('.form-type-radio').removeClass('is-checked');
          $(this).parent('.form-type-radio').addClass('is-checked');
        }
      }).change();

      /**
      * Checkboxes
      */
      $("input:checkbox").change(function () {
        $(this).closest(".form-type-checkbox").toggleClass('is-checked', this.checked);
      });

      /**
      * Move focus to search block input when mobile search toggle is touched.
      *
      */
      $('.js-toggle-search', context).on({
        click: function click() {
          $('.search__input').focus(); // Custom search API
          $('#edit-keys--2').focus(); // Core search
          return false;
        }
      });
    }
  };

  Drupal.behaviors.flyoutSearch = {
    attach: function attach(context, settings) {

      var flyout = $('.search--flyout', context);
      var toggle = $('.js-toggle-flyout-search', context);

      // Functions for tidyness
      function toggleFlyoutSearch() {
        flyout.toggleClass('search-is-active');
      }

      function hideFlyoutSearch() {
        flyout.removeClass('search-is-active');
        toggle.removeClass('active');
      }

      toggle.on({
        click: function click() {
          $(this).toggleClass('active');
          toggleFlyoutSearch();
          $('.search__input').focus(); // Custom search API
          $('#edit-keys').focus(); // Core search
          return false;
        }
      });

      // Detect a click outside the element and hide.
      // https://css-tricks.com/dangers-stopping-event-propagation/
      $(document).on('click', function (event) {
        if (!$(event.target).closest('.search--flyout').length) {
          hideFlyoutSearch();
        }
      });
    }
  };
})(jQuery);