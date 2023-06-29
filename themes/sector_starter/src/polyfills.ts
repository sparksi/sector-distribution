
// browser lacks :has() support
if (!CSS.supports('selector(:has(*))')) {
    // empty region containers
    document.querySelectorAll('.region__container').forEach((container:HTMLElement) => {
        if(container.childElementCount === 0) {
            container.classList.add('hidden')
        }
    })
}