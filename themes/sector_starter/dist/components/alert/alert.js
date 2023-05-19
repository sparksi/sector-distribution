const root = document.querySelector(".canvas");
Drupal.behaviors.alert = {
  attach: (context, settings) => {
    const dialogs = context.querySelectorAll(".alert--dismissible");
    dialogs.forEach((dialog) => {
      const close = dialog.querySelector(".alert__close");
      if (close) {
        close.addEventListener("click", (event) => {
          dialog.remove();
        });
      }
    });
  }
};
//# sourceMappingURL=alert.js.map
