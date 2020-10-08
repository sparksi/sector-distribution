(function () {
  const MenuSource = document.querySelectorAll('.js-mega-menu-source');
  const MegaMenu = document.querySelector('.navigation--mega-menu');

  Drupal.behaviors.megaMenu = {
    attach: (context, drupalSettings) => {
      const { breakpoints } = drupalSettings;

      if (MegaMenu === null || breakpoints === null) {
        return;
      }

      let triggers;

      const isSmallDevice = () => (window.matchMedia(breakpoints.xs).matches || window.matchMedia(breakpoints.sm).matches || window.matchMedia(breakpoints.md).matches);

      let isMobile = isSmallDevice();

      MenuSource.forEach(sourceMenu => {
        triggers = sourceMenu.querySelectorAll('.menu__item.is-expanded > .menu__link');

        if (isMobile === false) {
          triggers.forEach(trigger => {
            trigger.addEventListener('click', Drupal.behaviors.megaMenu.toggle, false);
          })
        }
      })

      if (window.ResizeObserver === undefined) {
        return;
      }
      const resizeObserver = new ResizeObserver(() => {
        if (breakpoints && triggers) {
          if (isMobile === false && isSmallDevice()) {
            isMobile = true;
            triggers.forEach(trigger => {
              trigger.removeEventListener('click', Drupal.behaviors.megaMenu.toggle, false);
            })
          }

          if (isMobile === true && !isSmallDevice()) {
            isMobile = false;
            triggers.forEach(trigger => {
              trigger.addEventListener('click', Drupal.behaviors.megaMenu.toggle, false);
            })
          }
        }
      });

      resizeObserver.observe(document.querySelector('.site-wrapper__row'));
    },
    toggle: event => {
      const { target: trigger } = event;
      const { dataset: { drupalLinkSystemPath: id } } = trigger;
      event.preventDefault();

      trigger.classList.toggle('has-opened-mega-menu');
      MegaMenu.classList.toggle('is-active');

      const activeMenuItem = MegaMenu.querySelector(`.menu__link[data-drupal-link-system-path="${id}"]`);
      activeMenuItem.classList.add('is-open');
    }
  };
})(Drupal);
