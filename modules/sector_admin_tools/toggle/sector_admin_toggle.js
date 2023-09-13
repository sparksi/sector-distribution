  window.addEventListener("load", (event) => {
    const btn = document.createElement('button')
    btn.setAttribute('type', 'button')
    btn.classList.add('toggle-admin-ui')
    btn.appendChild(document.createTextNode('Toggle admin ui'));
    document.body.appendChild(btn);

    btn.addEventListener('click', (e) => {
        document.body.classList.toggle('admin-ui-hidden');
    })
  });