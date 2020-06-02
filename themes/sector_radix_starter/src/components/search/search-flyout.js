(function () {
  const searchBox = document.querySelector('.search--flyout');
  searchBox.setAttribute('aria-hidden', true);

  const formElements = searchBox.querySelectorAll('input');
  formElements.forEach(input => input.setAttribute('tabindex', -1));

  const input = searchBox.querySelector('input[name=query]');


  const showSearch = () => {
    input.focus();
    searchBox.setAttribute('aria-hidden', false);
    formElements.forEach(elem => elem.removeAttribute('tabindex'));
    document.body.classList.add('search-is-active');
  }

  const hideSearch = () => {
    input.blur();
    searchBox.setAttribute('aria-hidden', true);
    formElements.forEach(elem => elem.setAttribute('tabindex', -1));
    document.body.classList.remove('search-is-active');
  }


  Drupal.toggleFlyoutSearch = searchIsOpen => {
    if (searchIsOpen) {
      showSearch();
    } else {
      hideSearch();
    }
  }


  // attach a11y button
  const a11yButton = document.createElement('button');
  a11yButton.setAttribute('type', 'button');
  a11yButton.classList.add('visually-hidden', 'close', 'btn', 'button', 'focusable');
  a11yButton.appendChild(document.createTextNode('Close'));
  a11yButton.addEventListener('click', hideSearch);
  a11yButton.addEventListener('blur', hideSearch);
  const searchActions = searchBox.querySelector('.form-actions');

  searchActions.appendChild(a11yButton);

  document.addEventListener('keydown', ({ keyCode }) => {
    if (keyCode === 27) {
      hideSearch();
    }
  })
})();
