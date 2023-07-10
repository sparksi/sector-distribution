Drupal.behaviors.alert = {
  attach: (context, settings) => {
    const dialogs = context.querySelectorAll('.alert--dismissible');

    dialogs.forEach((dialog: HTMLElement) => {
      const close = dialog.querySelector('.alert__close');
      if (close) {
        close.addEventListener('click', (event: Event) => {
          //dialog.close();
          dialog.remove();
        });
      }
    });
  },
};
