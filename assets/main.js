/* shared behaviour: mobile nav, scroll reveal, gallery lightbox, pub filter */
(function () {
  // ---- mobile nav ----
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // ---- scroll reveal ----
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // ---- publication filter ----
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
      // hide empty year groups
      document.querySelectorAll('[data-yeargroup]').forEach(function (g) {
        var any = g.querySelector('.pub:not(.hidden)');
        g.classList.toggle('hidden', !any);
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
        if (!img) return;               // placeholder tiles have no image yet
        lbImg.src = img.src;
        lbCap.textContent = g.dataset.caption || '';
        lb.classList.add('open');
      });
    });
    function closeLb() { lb.classList.remove('open'); lbImg.src = ''; }
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('close')) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
  }

  // ---- footer year ----
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
