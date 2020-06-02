(function () {
  let searchIsOpen = false;
  let navIsOpen = false;

  const SearchTrigger = document.querySelector('.js-toggle-flyout-search');
  const NavTrigger = document.querySelector('.js-toggle-navigation');


  SearchTrigger.addEventListener('click', event => {
    searchIsOpen = !searchIsOpen;

    if (searchIsOpen) {
      SearchTrigger.setAttribute('aria-pressed', true);
      Drupal.toggleFlyoutSearch(searchIsOpen);
    } else {
      SearchTrigger.setAttribute('aria-pressed', false);
      Drupal.toggleFlyoutSearch(searchIsOpen);
    }
    event.preventDefault();
  })

  NavTrigger.addEventListener('click', event => {
    event.preventDefault();
    document.body.classList.toggle('nav-is-active');
    navIsOpen = !navIsOpen;
  });


  document.addEventListener('keydown', ({ keyCode }) => {
    searchIsOpen = keyCode === 27 ? false : searchIsOpen;
  })
})();
