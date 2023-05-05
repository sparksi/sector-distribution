const root = document.querySelector('.canvas')

Drupal.behaviors.alert = {
    attach: (context, settings) => {

        const dialogs = context.querySelectorAll('dialog.alert');

        dialogs.forEach((dialog: HTMLDialogElement) => {
            dialog.showModal();
        });

        dialogs.forEach((dialog: HTMLDialogElement) => {
            const close = dialog.querySelector('.alert__close');
            if(close) {
                close.addEventListener('click', (event: Event) => {
                    dialog.close();
                })
            }

            dialog.addEventListener("close", (event:Event) => {
                this.toggleInert();
            });
        });
    }    
};
