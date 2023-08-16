
window.addEventListener("DOMContentLoaded", (event) => {

    document.querySelectorAll('.navigation__toggle').forEach((toggleBtn:HTMLButtonElement) => {
        toggleBtn.addEventListener('click', ({ target }: MouseEvent) => {
            if(!target) {
                return;
            }
            target.setAttribute('aria-expanded', target.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
        })
    })

    document.querySelectorAll('.menu__toggle').forEach((toggleBtn:HTMLButtonElement) => {
        toggleBtn.addEventListener('click', ({ target }: MouseEvent) => {
            if(!target) {
                return;
            }
            target?.classList.toggle('is-open');
        })
    })
});