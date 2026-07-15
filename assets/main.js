/* =========================================================
   Shared chrome (header + footer) and site behaviours
   ========================================================= */
(function () {

  // ---- navigation model (single source of truth) ----
  var NAV = [
    { label: 'About', href: 'index.html' },
    { label: 'Publications', href: 'publications.html' },
    { label: 'Portfolio', match: 'portfolio', children: [
        { label: 'My Work', href: 'portfolio-persona.html' },
        { label: 'Student Work', href: 'portfolio-students.html' }
    ]},
    { label: 'Projects & Grants', href: 'projects.html' },
    { label: 'GenAI Training', href: 'training.html' },
    { label: 'Awards', href: 'awards.html' },
    { label: 'Blog', href: 'blog.html', match: 'blog' },
    { label: 'Contact', href: 'contact.html' }
  ];

  var current = (location.pathname.split('/').pop() || 'index.html');
  if (current === '') current = 'index.html';

  function isActive(item) {
    if (item.href && item.href === current) return true;
    if (item.match && current.indexOf(item.match) === 0) return true;
    if (item.children) return item.children.some(function (c) { return c.href === current; });
    return false;
  }

  function buildNav() {
    var links = NAV.map(function (item) {
      var active = isActive(item) ? ' active' : '';
      if (item.children) {
        var sub = item.children.map(function (c) {
          var a = (c.href === current) ? ' class="active"' : '';
          return '<a href="' + c.href + '"' + a + '>' + c.label + '</a>';
        }).join('');
        return '<div class="nav-item has-drop">' +
                 '<button class="drop-toggle' + active + '" aria-haspopup="true" aria-expanded="false">' +
                   item.label + '<span class="caret" aria-hidden="true">▾</span>' +
                 '</button>' +
                 '<div class="drop-menu">' + sub + '</div>' +
               '</div>';
      }
      return '<a href="' + item.href + '" class="nav-a' + active + '">' + item.label + '</a>';
    }).join('');

    return '' +
      '<nav class="nav">' +
        '<div class="nav-inner">' +
          '<a class="brand" href="index.html"><span class="dot"></span>Dr. Mohamad Izani</a>' +
          '<button class="nav-toggle" aria-label="Menu">☰</button>' +
          '<div class="nav-links">' + links + '</div>' +
        '</div>' +
      '</nav>';
  }

  function buildFooter() {
    var y = new Date().getFullYear();
    return '' +
      '<footer>' +
        '<div class="foot-inner">' +
          '<div class="brand" style="color:#fff">Dr. Mohamad Izani Zainal Abidin, PhD</div>' +
          '<div class="foot-links">' +
            '<a href="https://scholar.google.com/citations?user=4yNI14cAAAAJ&hl=en" target="_blank" rel="noopener">Scholar</a>' +
            '<a href="https://orcid.org/0000-0002-8254-1219" target="_blank" rel="noopener">ORCID</a>' +
            '<a href="https://www.linkedin.com/in/izanizainal/" target="_blank" rel="noopener">LinkedIn</a>' +
            '<a href="mailto:mohamadizanizainal@gmail.com">Email</a>' +
          '</div>' +
          '<div class="copy">© ' + y + ' Dr. Mohamad Izani · Abu Dhabi, UAE · www.izanizainal.com</div>' +
        '</div>' +
      '</footer>';
  }

  // ---- inject chrome ----
  var navMount = document.getElementById('site-nav');
  if (navMount) navMount.outerHTML = buildNav();
  var footMount = document.getElementById('site-footer');
  if (footMount) footMount.outerHTML = buildFooter();

  // ---- mobile nav toggle ----
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
  }

  // ---- dropdown (click = mobile; hover handled by CSS on desktop) ----
  document.querySelectorAll('.drop-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var menu = btn.parentElement;
      menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', menu.classList.contains('open'));
    });
  });

  // ---- scroll reveal (with fallback so content never stays hidden) ----
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- publication / gallery filter (generic) ----
  var filter = document.querySelector('.pub-filter');
  if (filter) {
    filter.addEventListener('click', function (e) {
      var btn = e.target.closest('button'); if (!btn) return;
      filter.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.dataset.filter;
      document.querySelectorAll('[data-cat]').forEach(function (item) {
        item.classList.toggle('hidden', !(f === 'all' || item.dataset.cat === f));
      });
      document.querySelectorAll('[data-yeargroup]').forEach(function (g) {
        g.classList.toggle('hidden', !g.querySelector('.pub:not(.hidden)'));
      });
    });
  }

  // ---- gallery lightbox ----
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.cap');
    document.querySelectorAll('.gitem').forEach(function (g) {
      g.addEventListener('click', function () {
        var img = g.querySelector('img');
        if (!img) return;
        lbImg.src = img.src;
        lbCap.textContent = g.dataset.caption || '';
        lb.classList.add('open');
      });
    });
    function closeLb() { lb.classList.remove('open'); lbImg.src = ''; }
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('close')) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
  }

})();
