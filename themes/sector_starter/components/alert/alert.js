Drupal.behaviors.alert={attach:(l,s)=>{l.querySelectorAll(".alert--dismissible").forEach(e=>{const t=e.querySelector(".alert__close");t&&t.addEventListener("click",a=>{e.remove()})})}};
