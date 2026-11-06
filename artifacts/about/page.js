/* No cookies, storage, or same-origin access: this runs inside Abstracts' sandbox. */
(() => {
  let queued = false;

  const postHeight = () => {
    queued = false;
    parent.postMessage({ abstractsHeight: Math.ceil(document.body.getBoundingClientRect().height) }, '*');
  };

  const queueHeight = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(postHeight);
  };

  addEventListener('load', queueHeight);
  addEventListener('resize', queueHeight);
  if ('ResizeObserver' in window) new ResizeObserver(queueHeight).observe(document.body);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(queueHeight);
  queueHeight();
})();
