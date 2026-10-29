/* Shared script for the service area pages.
   To turn on Google Analytics site-wide, paste your Measurement ID below (looks like G-XXXXXXXXXX). */
(function () {
  var GA_ID = ''; // e.g. 'G-ABC123XYZ9'

  if (GA_ID) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  // mobile menu
  var btn = document.getElementById('menuToggle');
  var header = document.querySelector('header');
  if (btn && header) {
    btn.addEventListener('click', function () {
      var open = header.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Netlify form (same "contact" form the homepage uses)
  var form = document.getElementById('areaForm');
  if (form) {
    var src = form.querySelector('input[name="source_page"]');
    if (src) src.value = location.pathname;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var body = new URLSearchParams(data).toString();
      var note = document.getElementById('formNote');
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body })
        .then(function (r) {
          if (!r.ok) throw new Error('bad');
          form.reset();
          if (note) { note.textContent = "Thanks. We got your message and will follow up soon."; note.classList.add('show'); }
          if (window.gtag) gtag('event', 'generate_lead', { page_path: location.pathname });
        })
        .catch(function () {
          if (note) { note.textContent = "Something went wrong. Please call (210) 336-7843."; note.classList.add('show'); }
        });
    });
  }

  document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
    a.addEventListener('click', function () { if (window.gtag) gtag('event', 'phone_click', { page_path: location.pathname }); });
  });
})();
