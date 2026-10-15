(function () {
  'use strict';
  var ORG = 'Bey0ndStack';
  var SVGNS = 'http://www.w3.org/2000/svg';
  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  function svgEl(name, attrs) {
    var el = document.createElementNS(SVGNS, name);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }
  function debounce(fn, ms) {
    var t;
    return function () { clearTimeout(t); t = setTimeout(fn, ms); };
  }

  // ---------------------------------------------------------------------------
  // Full-page neural background: drifting nodes, "brain lines" between close
  // neighbours and occasional signals travelling along them.
  // ---------------------------------------------------------------------------
  (function neural() {
    var canvas = document.querySelector('.neural-bg');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var w, h, pts = [], sparks = [], linkDist, mouse = { x: -9999, y: -9999 }, running = true;
    var COLORS = ['51,214,197', '108,140,255'];

    function resize() {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      linkDist = w < 700 ? 105 : 140;
      var count = Math.round(Math.min(130, Math.max(44, (w * h) / 11500)));
      pts = [];
      for (var i = 0; i < count; i++) {
        pts.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.4 + 0.6, c: COLORS[Math.random() < 0.65 ? 0 : 1]
        });
      }
      sparks = [];
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      var i, j, a, b, dx, dy, d, alpha;
      for (i = 0; i < pts.length; i++) {
        a = pts[i];
        if (!reduceMotion) {
          a.x += a.vx; a.y += a.vy;
          if (a.x < -20) a.x = w + 20; else if (a.x > w + 20) a.x = -20;
          if (a.y < -20) a.y = h + 20; else if (a.y > h + 20) a.y = -20;
        }
      }
      ctx.lineWidth = 1;
      for (i = 0; i < pts.length; i++) {
        a = pts[i];
        for (j = i + 1; j < pts.length; j++) {
          b = pts[j]; dx = a.x - b.x; dy = a.y - b.y;
          if (Math.abs(dx) > linkDist || Math.abs(dy) > linkDist) continue;
          d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkDist) {
            alpha = (1 - d / linkDist) * 0.42;
            ctx.strokeStyle = 'rgba(' + a.c + ',' + alpha + ')';
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            if (!reduceMotion && sparks.length < 14 && Math.random() < 0.0009) sparks.push({ a: a, b: b, t: 0, c: a.c });
          }
        }
        dx = a.x - mouse.x; dy = a.y - mouse.y; d = Math.sqrt(dx * dx + dy * dy);
        if (d < 190) {
          ctx.strokeStyle = 'rgba(51,214,197,' + (1 - d / 190) * 0.45 + ')';
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      for (i = 0; i < pts.length; i++) {
        a = pts[i];
        ctx.fillStyle = 'rgba(' + a.c + ',.95)';
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.2832); ctx.fill();
      }
      for (i = sparks.length - 1; i >= 0; i--) {
        var s = sparks[i];
        s.t += 0.018;
        if (s.t >= 1) { sparks.splice(i, 1); continue; }
        var x = s.a.x + (s.b.x - s.a.x) * s.t, y = s.a.y + (s.b.y - s.a.y) * s.t;
        var g = ctx.createRadialGradient(x, y, 0, x, y, 7);
        g.addColorStop(0, 'rgba(255,255,255,.95)');
        g.addColorStop(0.35, 'rgba(' + s.c + ',.7)');
        g.addColorStop(1, 'rgba(' + s.c + ',0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, 7, 0, 6.2832); ctx.fill();
      }
      if (running && !reduceMotion) requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', debounce(function () { resize(); if (reduceMotion) frame(); }, 150));
    if (finePointer) {
      window.addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
      document.addEventListener('pointerleave', function () { mouse.x = mouse.y = -9999; });
    }
    document.addEventListener('visibilitychange', function () {
      var was = running;
      running = !document.hidden;
      if (running && !was && !reduceMotion) requestAnimationFrame(frame);
    });
    frame();
  })();

  // footer year
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  // reveal on scroll
  var items = [].slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // ---------------------------------------------------------------------------
  // Stack brain: an interactive network built from the lobe lists in the HTML.
  // ---------------------------------------------------------------------------
  (function brain() {
    var root = document.querySelector('[data-brain]');
    if (!root) return;
    var src = root.querySelector('.brain-source');
    var LOBE_COLORS = { cloud: '#6C8CFF', devops: '#B18CFF', observability: '#33D6C5', development: '#FFB86B' };
    var LOBE_SHORT = { cloud: 'Cloud', devops: 'DevOps', observability: 'Observe', development: 'Dev' };
    // Quadrant of each lobe: [x side, y side]
    var LOBE_POS = { cloud: [-1, -1], devops: [1, -1], observability: [1, 1], development: [-1, 1] };

    var lobes = [].map.call(src.querySelectorAll('.lobe'), function (l) {
      return {
        id: l.getAttribute('data-lobe'), title: l.getAttribute('data-title'), info: l.getAttribute('data-info'),
        items: [].map.call(l.querySelectorAll('li'), function (li) {
          return {
            id: li.getAttribute('data-id'), name: li.textContent.trim(), icon: li.getAttribute('data-icon'),
            info: li.getAttribute('data-info'), links: (li.getAttribute('data-links') || '').split(/\s+/).filter(Boolean),
            lobe: l.getAttribute('data-lobe')
          };
        })
      };
    });
    var core = { id: 'core', name: src.getAttribute('data-core'), info: src.getAttribute('data-core-info') };

    // DOM
    var stageEl = document.createElement('div');
    stageEl.className = 'brain-stage';
    var svg = svgEl('svg', { 'class': 'brain-lines', 'aria-hidden': 'true' });
    var edgeLayer = svgEl('g', {});
    var pulseLayer = svgEl('g', {});
    svg.appendChild(edgeLayer); svg.appendChild(pulseLayer);
    stageEl.appendChild(svg);

    var info = document.createElement('div');
    info.className = 'brain-info';
    info.setAttribute('aria-live', 'polite');
    info.innerHTML = '<span class="brain-info-icon"><img alt=""></span><h3><span></span><small></small></h3><p></p>';

    var nodes = {}, edges = [];

    function addNode(id, kind, data, lobeId) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'brain-node' + (kind === 'hub' ? ' brain-hub' : kind === 'core' ? ' brain-core' : '');
      if (lobeId) b.setAttribute('data-lobe', lobeId);
      if (kind === 'tech') {
        b.innerHTML = '<img src="assets/technologies/' + data.icon + '.svg" alt=""><span class="brain-label">' + data.name + '</span>';
        b.setAttribute('aria-label', data.name + ': ' + data.info);
      } else if (kind === 'hub') {
        b.innerHTML = '<span><b class="hub-full">' + data.title + '</b><b class="hub-short">' + LOBE_SHORT[lobeId] + '</b><small>' + data.items.length + ' tools</small></span>';
        b.setAttribute('aria-label', data.title + ': ' + data.info);
      } else {
        b.innerHTML = '<img src="assets/icons/beyondstack-symbol-dark.svg" alt="">';
        b.setAttribute('aria-label', data.name + ': ' + data.info);
      }
      stageEl.appendChild(b);
      nodes[id] = { id: id, kind: kind, data: data, lobe: lobeId, el: b, x: 0, y: 0, edges: [] };
      return nodes[id];
    }
    function addEdge(a, b, type) {
      var na = nodes[a], nb = nodes[b];
      if (!na || !nb || a === b) return;
      for (var i = 0; i < edges.length; i++) {
        var e = edges[i];
        if ((e.a === na && e.b === nb) || (e.a === nb && e.b === na)) return;
      }
      var color = LOBE_COLORS[na.lobe || nb.lobe] || '#33D6C5';
      var path = svgEl('path', { 'class': 'brain-edge edge-' + type, style: '--edge:' + color });
      edgeLayer.appendChild(path);
      var edge = { a: na, b: nb, type: type, el: path, color: color, len: 0, bend: 0 };
      edges.push(edge); na.edges.push(edge); nb.edges.push(edge);
    }

    addNode('core', 'core', core, null);
    lobes.forEach(function (l) {
      addNode('hub-' + l.id, 'hub', l, l.id);
      l.items.forEach(function (it) { addNode(it.id, 'tech', it, l.id); });
    });
    lobes.forEach(function (l) {
      addEdge('core', 'hub-' + l.id, 'core');
      l.items.forEach(function (it) { addEdge('hub-' + l.id, it.id, 'hub'); });
    });
    lobes.forEach(function (l) {
      l.items.forEach(function (it) { it.links.forEach(function (to) { addEdge(it.id, to, 'cross'); }); });
    });
    // Alternate the bend of cross links so they read as organic "synapses".
    edges.forEach(function (e, i) { e.bend = e.type === 'cross' ? (i % 2 ? 0.22 : -0.22) : e.type === 'core' ? 0.12 : 0.04; });

    root.appendChild(stageEl);
    root.appendChild(info);
    root.classList.add('is-live');

    // Layout
    var W = 0, H = 0;
    function layout() {
      W = stageEl.clientWidth;
      var cfg;
      if (W >= 900) cfg = { node: 48, hub: 98, core: 112, r1: 94, r2: 150, hubX: 0.2, H: 780, labels: true };
      else if (W >= 600) cfg = { node: 40, hub: 80, core: 92, r1: 70, r2: 112, hubX: 0.22, H: 620, labels: false };
      else cfg = { node: 30, hub: 50, core: 64, r1: Math.round(W * 0.135), r2: Math.round(W * 0.205), hubX: 0.25, H: Math.round(W * 1.12), labels: false };
      H = cfg.H;
      stageEl.style.height = H + 'px';
      stageEl.classList.toggle('is-compact', W < 600);
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

      var cx = W / 2, cy = H / 2;
      place(nodes.core, cx, cy, cfg.core);
      lobes.forEach(function (l) {
        var p = LOBE_POS[l.id];
        var hx = cx + p[0] * (0.5 - cfg.hubX) * W;
        var hy = cy + p[1] * H * 0.245;
        place(nodes['hub-' + l.id], hx, hy, cfg.hub);
        // Arc around the hub with a gap facing the core; alternate two radii.
        var out = Math.atan2(hy - cy, hx - cx);
        var gap = (W >= 600 ? 90 : 70) * Math.PI / 180;
        var span = 2 * Math.PI - gap;
        var n = l.items.length;
        l.items.forEach(function (it, i) {
          var ang = out - span / 2 + span * (n === 1 ? 0.5 : i / (n - 1));
          var r = i % 2 ? cfg.r2 : cfg.r1;
          place(nodes[it.id], hx + Math.cos(ang) * r, hy + Math.sin(ang) * r, cfg.node);
        });
      });
      edges.forEach(function (e) {
        var x1 = e.a.x, y1 = e.a.y, x2 = e.b.x, y2 = e.b.y;
        var mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        var qx = mx - (y2 - y1) * e.bend, qy = my + (x2 - x1) * e.bend;
        e.el.setAttribute('d', 'M' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' Q' + qx.toFixed(1) + ' ' + qy.toFixed(1) + ' ' + x2.toFixed(1) + ' ' + y2.toFixed(1));
        e.len = e.el.getTotalLength();
      });
      stageEl.classList.toggle('no-labels', !cfg.labels);
    }
    function place(n, x, y, size) {
      n.x = x; n.y = y;
      n.el.style.left = x + 'px'; n.el.style.top = y + 'px';
      n.el.style.setProperty('--size', size + 'px');
    }

    // Interaction state
    var filter = 'all', active = null, pinned = false;

    function showInfo(n) {
      var icon = info.querySelector('img'), title = info.querySelector('h3 span'), tag = info.querySelector('h3 small'), text = info.querySelector('p');
      if (!n || n.kind === 'core') {
        icon.src = 'assets/icons/beyondstack-symbol-dark.svg';
        title.textContent = core.name; tag.textContent = 'Core'; text.textContent = core.info;
        info.style.removeProperty('--lobe-color');
        return;
      }
      var lobe = lobes.filter(function (l) { return l.id === n.lobe; })[0];
      info.style.setProperty('--lobe-color', LOBE_COLORS[n.lobe]);
      if (n.kind === 'hub') {
        icon.src = 'assets/icons/beyondstack-symbol-dark.svg';
        title.textContent = lobe.title; tag.textContent = lobe.items.length + ' tools'; text.textContent = lobe.info;
      } else {
        icon.src = 'assets/technologies/' + n.data.icon + '.svg';
        title.textContent = n.data.name; tag.textContent = lobe.title; text.textContent = n.data.info;
      }
    }

    function render() {
      var focus = active || (filter !== 'all' ? nodes['hub-' + filter] : null);
      var hot = {}, linked = {};
      if (active) {
        linked[active.id] = true;
        active.edges.forEach(function (e) { hot[edges.indexOf(e)] = true; linked[e.a.id] = linked[e.b.id] = true; });
        // A hub or the core lights up its whole neighbourhood.
      } else if (filter !== 'all') {
        edges.forEach(function (e, i) {
          if (e.a.lobe === filter || e.b.lobe === filter) { hot[i] = true; linked[e.a.id] = linked[e.b.id] = true; }
        });
      }
      var anyFocus = !!focus;
      edges.forEach(function (e, i) {
        e.el.classList.toggle('is-hot', !!hot[i]);
        e.el.classList.toggle('is-dim', anyFocus && !hot[i]);
      });
      Object.keys(nodes).forEach(function (id) {
        var n = nodes[id];
        n.el.classList.toggle('is-active', n === active);
        n.el.classList.toggle('is-linked', anyFocus && !!linked[id] && n !== active);
        n.el.classList.toggle('is-dim', anyFocus && !linked[id]);
      });
      showInfo(focus);
    }

    Object.keys(nodes).forEach(function (id) {
      var n = nodes[id];
      n.el.addEventListener('pointerenter', function (e) {
        if (e.pointerType !== 'mouse' || pinned) return;
        active = n; render();
      });
      n.el.addEventListener('focus', function () { if (!pinned) { active = n; render(); } });
      n.el.addEventListener('click', function () {
        if (pinned && active === n) { pinned = false; active = null; }
        else { pinned = true; active = n; }
        render();
      });
    });
    stageEl.addEventListener('pointerleave', function () { if (!pinned) { active = null; render(); } });
    stageEl.addEventListener('focusout', function (e) {
      if (!stageEl.contains(e.relatedTarget) && !pinned) { active = null; render(); }
    });
    stageEl.addEventListener('click', function (e) {
      if (e.target === stageEl || e.target === svg) { pinned = false; active = null; render(); }
    });

    [].forEach.call(root.querySelectorAll('[data-filter]'), function (btn) {
      btn.addEventListener('click', function () {
        filter = btn.getAttribute('data-filter');
        pinned = false; active = null;
        [].forEach.call(root.querySelectorAll('[data-filter]'), function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        render();
      });
    });

    // Pulses travelling along the network
    var pulses = [], visible = false, last = 0, spawnAcc = 0;
    function spawn() {
      var pool = edges;
      if (active) pool = active.edges;
      else if (filter !== 'all') pool = edges.filter(function (e) { return e.a.lobe === filter || e.b.lobe === filter; });
      if (!pool.length) return;
      var e = pool[Math.floor(Math.random() * pool.length)];
      var c = svgEl('circle', { r: e.type === 'core' ? 3.4 : 2.6, 'class': 'brain-pulse', style: '--pulse:' + e.color });
      pulseLayer.appendChild(c);
      pulses.push({ e: e, el: c, t: 0, dir: Math.random() < 0.5 ? 1 : -1, dur: Math.max(700, e.len * 7) });
    }
    function tick(now) {
      var dt = last ? Math.min(64, now - last) : 16; last = now;
      spawnAcc += dt;
      var every = active || filter !== 'all' ? 110 : 170;
      while (spawnAcc > every) { spawnAcc -= every; if (pulses.length < 46) spawn(); }
      for (var i = pulses.length - 1; i >= 0; i--) {
        var p = pulses[i];
        p.t += dt / p.dur;
        if (p.t >= 1) { pulseLayer.removeChild(p.el); pulses.splice(i, 1); continue; }
        var at = p.e.el.getPointAtLength(p.e.len * (p.dir > 0 ? p.t : 1 - p.t));
        p.el.setAttribute('cx', at.x.toFixed(1)); p.el.setAttribute('cy', at.y.toFixed(1));
        p.el.setAttribute('opacity', Math.sin(p.t * Math.PI).toFixed(2));
      }
      if (visible && !document.hidden) requestAnimationFrame(tick); else last = 0;
    }
    function start() { if (!reduceMotion) requestAnimationFrame(tick); }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        var was = visible; visible = en[0].isIntersecting;
        if (visible && !was) start();
      }).observe(stageEl);
    } else { visible = true; start(); }
    document.addEventListener('visibilitychange', function () { if (!document.hidden && visible) start(); });

    layout(); render();
    var lastW = W;
    window.addEventListener('resize', debounce(function () {
      if (stageEl.clientWidth !== lastW) { layout(); lastW = W; }
    }, 120));
  })();

  // ---------------------------------------------------------------------------
  // Observability flow: connector lines drawn between the rendered boxes.
  // ---------------------------------------------------------------------------
  (function flow() {
    var root = document.querySelector('[data-flow]');
    if (!root) return;
    var svg = root.querySelector('.flow-lines');
    var PAIRS = [['f-app', 'f-otel'], ['f-k8s', 'f-otel'], ['f-cloud', 'f-otel'], ['f-otel', 'f-prom'], ['f-otel', 'f-jaeger'], ['f-otel', 'f-elastic'],
      ['f-prom', 'f-grafana'], ['f-jaeger', 'f-grafana'], ['f-elastic', 'f-grafana'], ['f-prom', 'f-pager'], ['f-grafana', 'f-pager']];
    function draw() {
      var box = root.getBoundingClientRect();
      var w = box.width, h = box.height;
      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      var out = '';
      PAIRS.forEach(function (p) {
        var stage = p[1] === 'f-otel' ? 'fl-in' : p[0] === 'f-otel' ? 'fl-mid' : 'fl-out';
        var a = document.getElementById(p[0]).getBoundingClientRect();
        var b = document.getElementById(p[1]).getBoundingClientRect();
        var d;
        if (b.left >= a.right - 2) {
          var x1 = a.right - box.left, y1 = a.top + a.height / 2 - box.top, x2 = b.left - box.left, y2 = b.top + b.height / 2 - box.top, k = (x2 - x1) / 2;
          d = 'M' + x1 + ' ' + y1 + ' C' + (x1 + k) + ' ' + y1 + ' ' + (x2 - k) + ' ' + y2 + ' ' + x2 + ' ' + y2;
        } else {
          var X1 = a.left + a.width / 2 - box.left, Y1 = a.bottom - box.top, X2 = b.left + b.width / 2 - box.left, Y2 = b.top - box.top, m = (Y2 - Y1) / 2;
          d = 'M' + X1 + ' ' + Y1 + ' C' + X1 + ' ' + (Y1 + m) + ' ' + X2 + ' ' + (Y2 - m) + ' ' + X2 + ' ' + Y2;
        }
        out += '<path class="flow-line ' + stage + '" d="' + d + '"/>';
      });
      svg.innerHTML = out;
    }
    draw();
    if ('ResizeObserver' in window) new ResizeObserver(debounce(draw, 60)).observe(root);
    else window.addEventListener('resize', debounce(draw, 120));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
  })();

  // ---------------------------------------------------------------------------
  // Contact: service shortcuts preselect the form, and the form composes an email.
  // ---------------------------------------------------------------------------
  (function contact() {
    var form = document.querySelector('.contact-form');
    if (!form) return;
    var select = form.querySelector('select[name="service"]');
    [].forEach.call(document.querySelectorAll('[data-service]'), function (a) {
      a.addEventListener('click', function () {
        var want = a.getAttribute('data-service');
        [].forEach.call(select.options, function (o) { if (o.text === want) select.value = o.value; });
      });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements;
      var subject = 'Project enquiry: ' + f.service.value + ' (' + f.name.value + ')';
      var body = 'Name: ' + f.name.value + '\nEmail: ' + f.email.value +
        (f.company.value ? '\nCompany: ' + f.company.value : '') +
        '\nService: ' + f.service.value + '\n\n' + f.message.value;
      window.location.href = 'mailto:' + form.getAttribute('data-mailto') +
        '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  })();

  // ---------------------------------------------------------------------------
  // Live repositories from the GitHub organization
  // ---------------------------------------------------------------------------
  var box = document.getElementById('repos');
  if (!box) return;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function ago(iso) {
    var d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
    if (d < 1) return 'today'; if (d < 31) return d + 'd ago';
    if (d < 365) return Math.floor(d / 30) + 'mo ago'; return Math.floor(d / 365) + 'y ago';
  }
  function empty(msg) {
    box.innerHTML = '<p class="state">' + msg + ' Follow <a href="https://github.com/' + ORG +
      '" target="_blank" rel="noopener">github.com/' + ORG + '</a> to see new work as it lands.</p>';
  }

  fetch('https://api.github.com/orgs/' + ORG + '/repos?sort=updated&per_page=12&type=public', { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (repos) {
      repos = repos.filter(function (r) { return !r.fork && !r.archived && r.name.toLowerCase() !== ORG.toLowerCase() + '.github.io'; }).slice(0, 6);
      if (!repos.length) { empty('The first public projects are on their way.'); return; }
      box.innerHTML = repos.map(function (r) {
        return '<a class="repo reveal in" href="' + esc(r.html_url) + '" target="_blank" rel="noopener">' +
          '<h3>' + esc(r.name) + '</h3><p>' + esc(r.description || 'No description yet.') + '</p>' +
          '<div class="meta">' + (r.language ? '<span><i class="dot"></i>' + esc(r.language) + '</span>' : '') +
          '<span>' + r.stargazers_count + ' stars</span><span>updated ' + ago(r.pushed_at || r.updated_at) + '</span></div></a>';
      }).join('');
    })
    .catch(function () { empty('Projects could not be loaded right now.'); });
})();
