(function () {
  Drupal.behaviors.navigation = {
    attach: () => {
      // append expand buttons to all is-expanded menu__items
      const isExpandedMenuItems = document.querySelectorAll('.navigation--primary .menu__item.is-expanded');

      isExpandedMenuItems.forEach(menuItem => {
        const expandButton = document.createElement('button');
        expandButton.appendChild(document.createTextNode('Toggle'));
        expandButton.setAttribute('type', 'button');
        expandButton.classList.add('menu__toggle');
        expandButton.addEventListener('click', ({ target }) => target.parentElement.classList.toggle('is-open'));

        if (menuItem.classList.contains('active-trail')) {
          menuItem.classList.add('is-open');
        }

        menuItem.insertBefore(expandButton, menuItem.lastElementChild);
      })
    }
  };
})(Drupal);
