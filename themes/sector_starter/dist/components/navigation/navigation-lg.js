window.addEventListener("DOMContentLoaded",t=>{document.querySelectorAll(".navigation__toggle").forEach(n=>{n.addEventListener("click",({target:e})=>{e&&e.setAttribute("aria-expanded",e.getAttribute("aria-expanded")==="false"?"true":"false")})}),document.querySelectorAll(".menu__toggle").forEach(n=>{n.addEventListener("click",({target:e})=>{e&&(e==null||e.classList.toggle("is-open"))})})});
