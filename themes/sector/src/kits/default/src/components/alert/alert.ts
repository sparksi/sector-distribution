const root = document.querySelector('.canvas')

Drupal.behaviors.alert = {
    attach: function (context, settings) {
        this.toggleInert();

        const dialogs = context.querySelectorAll('dialog.alert');

        dialogs.forEach((dialog: HTMLDialogElement) => {
            const close = dialog.querySelector('.alert__close');
            if(close) {
                close.addEventListener('click', (event:SyntheticEvent) => {
                    dialog.close();
                })
            }

            dialog.addEventListener("close", (event:Event) => {
                this.toggleInert();
            });
        });


       
    },
    toggleInert: () => {
        const openDialogs = document.querySelectorAll('.off-canvas dialog.alert[open]').length
        if(openDialogs === 0) {
            root?.removeAttribute('inert');
        }
        else {
            root?.setAttribute('inert', '');
        }
    }
};
