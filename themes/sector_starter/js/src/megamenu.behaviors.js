/**
 * Megamenu javascript
 *
 * Note: This mega menu ships with Sector but is not used out-of-the-box.
 *
 * This mega menu is click based (As opposed to hover) and is designed to
 * connect 2 menu blocks together to work as a mega menu for the medium
 * breakpoint and above.
 *
 * To use this with Sectors Main menu:
 *
 * - Add this file (megamenu.behaviors.js) to you project via {PROJECTNAME}.libraries.yml
 * - Add _mega-menu.scss via global.styles.scss
 *
 * Add the '.js-mega-menu-source' class to the existing Main menu block
 * within the header region.
 *
 * In the region of your choice (Typically Post-Header) create a new
 * Main menu block.
 * Set:
 * - Initial visibility level: 1
 * - Number of levels to display: 2
 * - Tick 'Expand all menu links'
 * - Fixed parent item: 'Main menu'
 *
 * - Add the classes: navigation navigation--mega-menu js-mega-menu-target js-offclick-whitelist
 *
 */
(function ($, drupalSettings) {
  const { breakpoints, } = drupalSettings.responsive;

  /**
   * Mega menu behaviour.
   *
   * @type {{attach: attach}}
   */
  Drupal.behaviors.megaMenuInit = {
    attach: () => {
      let sourceMenu = null;
      if (breakpoints) {
        if (window.matchMedia(breakpoints['sector_starter.medium']).matches) {
          sourceMenu = $('.js-mega-menu-source');
        }
      }
      $('> .menu > li > a', sourceMenu).once().on('click', function (evt) {
        if (!$(this).hasClass('tabbed')) {
          // If link has children act as Megamenu .. otherwise simply execute link.
          const menuItemClass = $(this).parent().data('id');
          if ($(`.js-mega-menu-target > .menu > li[data-id="${menuItemClass}"]`).children('.menu').length > 0) {
            // Find out if the mega menu has already been opened.
            let showMegaMenu = true;
            if ($(this).parent().hasClass('mega-menu-is-active')) {
              showMegaMenu = false;
            }

            // Remove Classes.
            $('.mega-menu-is-active').removeClass('mega-menu-is-active');
            $('.mega-menu-is-open').removeClass('mega-menu-is-open');
            $('.mega-menu').removeClass('mega-menu');

            if (showMegaMenu) {
              // Add classes again.
              $(this).parent().addClass('mega-menu-is-active');
              const megaMenuTarget = $('.js-mega-menu-target');
              $('> .menu > li', megaMenuTarget).addClass('mega-menu-item');
              $(`> .menu > li[data-id="${menuItemClass}"]`, megaMenuTarget).addClass('mega-menu mega-menu-is-open');
              megaMenuTarget.addClass('mega-menu-is-active');
            }
            evt.preventDefault();
          } else {
            return true;
          }
        }
        evt.preventDefault();
        return false;
      });
      // Add a "tabbed" class, if someone navigates the main menu with the tab key.
      $(window).keyup(() => {
        if ($('a:focus').length > 0) {
          $('a').removeClass('tabbed');
          $('a:focus').addClass('tabbed');
        }
      });
      // Skip focus on second level menu items.
      $('.js-mega-menu-target a').attr('tabindex', '-1');

      // With the mega menu display a more link to the parent if there are > 6 menu items
      const noLinks = 6;

      $('.js-mega-menu-target .menu .menu > .expanded').each(() => {
        const self = $(this);
        const injectPos = $(`> .menu > .menu__item:nth-child(${noLinks + 1})`, self);

        if (injectPos.length) {
          const li = $('<li />').insertBefore(injectPos);

          $('<a />', {
            href: $('> .menu__link', self).attr('href'),
            class: 'more',
            text: 'More',
          }).appendTo(li);
        }
      });
    },
  };
}(jQuery, drupalSettings));
