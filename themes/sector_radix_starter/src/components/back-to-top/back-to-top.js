(function () {
  const elementsThatTriggerButtonVisibility = ['.page-header'];
  const backToTop = document.querySelector('.back-to-top',);
  const backToTopAction = document.querySelector('.back-to-top .action',);

  backToTopAction.setAttribute('tabindex', -1,);

  Drupal.behaviors.backToTop = {
    attach: () => {
      if (window.IntersectionObserver === undefined) {
        return;
      }

      const observer = new IntersectionObserver(entry => {
        const singleEntry = entry.find((e,) => e,);
        if (singleEntry.isIntersecting) {
          backToTop.classList.remove('is-visible',)
          backToTopAction.removeAttribute('tabindex',);
        } else {
          backToTop.classList.add('is-visible',)
          backToTopAction.setAttribute('tabindex', -1,);
        }
      },);

      elementsThatTriggerButtonVisibility.forEach(cssClass => {
        const elem = document.querySelector(cssClass);

        observer.observe(elem,);
      });
    },
  };
})(Drupal);
