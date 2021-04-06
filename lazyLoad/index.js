


function getTop(e) {
  let ot = e.offsetTop;
  while (e = e.offsetParent) {
    ot += e.offsetTop
  }

  return ot
}
function lazyLoad(img) {
  let ch = document.documentElement.clientHeight;
  let st = document.documentElement.scrollTop || document.body.scrollTop;
  if (ch + st > getTop(img)) {
    img.src = img.getAttribute('data-src');
  }
}

function lazyLoad2(el) {
  let ch = window.innerHeight;
  let elementTop = el.getBoundingClientRect().top;
  if (elementTop <= ch) {
    el.src = el.getAttribute('data-src');
  }
}

window.onload = window.onscroll = function () {
  var imgs = document.querySelectorAll('img');
  lazyLoad2(imgs[0])
}