Drupal.behaviors.search = {
  attach: (context) => {
    const searchToggle = context.querySelector('.region--header.header .search__toggle');

    if (!searchToggle) {
      return;
    }

    searchToggle.addEventListener('click', ({ target }: MouseEvent) => {
      if (!target) {
        return;
      }
      target.setAttribute('aria-expanded', target.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
      );
    });
  },
};
