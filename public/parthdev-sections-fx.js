/*
 * parthdev.in interactions. Loaded ONLY on parthdev.in (nginx injects it with
 * parthdev-theme.css, where the matching styles live); ezcods.com never loads it.
 *
 * Deliberately no scroll-driven effects: nothing here listens to scroll or
 * animates as sections enter the screen. What remains is interaction only:
 *  - Services cards: 3D tilt toward the pointer on hover (brief press on tap).
 *  - Tech stack: 3D flip cards (hover / click / tap / Enter flips).
 *  - Tech workspace (.pd-ws) and contact phone (.pd-cp): mouse-follow parallax.
 *  - Contact envelope: stays open after its first opening (until reload).
 *  - Performance only: ambient loops (hero glass, workspace, phone) pause
 *    while they are off screen (IntersectionObserver toggles a class).
 * Re-applies itself after client-side navigation (MutationObserver).
 */
(function () {
  // ---- Contact envelope: once opened it stays open until the page reloads ----
  // Opening: mouse hover, keyboard focus, or a click/tap (touch never opens it
  // just by a finger passing over while scrolling). The flag lives in memory,
  // so it survives client-side navigation and resets on a real reload.
  var envOpened = false;
  function setupEnvelope(el) {
    var t = el.querySelector(".pd-ce-toggle");
    if (!t) return;
    if (envOpened) {
      // Returning to the page in-app: show it open straight away, no replay.
      el.classList.add("pd-ce-instant");
      t.checked = true;
      requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.remove("pd-ce-instant"); }); });
    } else t.checked = false; // never trust a browser-restored checkbox after reload
    function open() { t.checked = true; envOpened = true; }
    el.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") open(); });
    el.addEventListener("focusin", open);
    el.addEventListener("click", open);
    t.addEventListener("change", function () { if (!t.checked && envOpened) t.checked = true; });
  }
  function scanEnvelope() {
    var el = document.querySelector(".pd-ce");
    if (el && !el._pdEnv) { el._pdEnv = true; setupEnvelope(el); }
  }
  new MutationObserver(scanEnvelope).observe(document.body, { childList: true, subtree: true });
  scanEnvelope();

  if (!window.matchMedia || matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("pd-fx");

  var COARSE = matchMedia("(hover: none), (pointer: coarse)").matches;
  var MAX_TILT = 7; // degrees

  // ---- Pause ambient loops while off screen (no visual effect on scroll) ----
  var heroVis = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { e.target.classList.toggle("pd-hero-off", !e.isIntersecting); });
  });

  // ---- Tech stack flip cards ----
  // The card element stays still (stable hover target); its two faces
  // (title = front, list = back) rotate in opposite directions in CSS.
  var ICONS = [
    [/program/i, "code"], [/web/i, "web"], [/app/i, "app"], [/software|desktop/i, "desktop"],
    [/data/i, "db"], [/erp|business/i, "layers"], [/commerce|shop/i, "cart"], [/secur|optim/i, "shield"],
  ];
  function setupFlip(grid) {
    var cards = [].slice.call(grid.children);
    cards.forEach(function (card) {
      var title = card.querySelector("h4"), list = title && title.nextElementSibling;
      if (!list) return;
      var name = title.textContent.trim();
      var icon = (ICONS.filter(function (x) { return x[0].test(name); })[0] || [0, "code"])[1];
      card.classList.add("pd-flip");
      title.dataset.icon = icon;
      list.dataset.title = name;
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-pressed", "false");
      card.setAttribute("aria-label", name + ": show technologies");
    });
    function toggle(card) {
      var on = !card.classList.contains("pd-flipped");
      cards.forEach(function (c) { c.classList.remove("pd-flipped"); c.setAttribute("aria-pressed", "false"); });
      if (on) { card.classList.add("pd-flipped"); card.setAttribute("aria-pressed", "true"); }
    }
    grid.addEventListener("click", function (e) {
      var card = e.target.closest(".pd-flip");
      if (card) toggle(card);
    });
    grid.addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("pd-flip")) { e.preventDefault(); toggle(e.target); }
    });
    // One shared height: the tallest back face at the current width, so no
    // list is ever cut off. Measured from layout offsets (unaffected by the
    // 3D transforms). Re-fit on resize and when web fonts arrive.
    function fit() {
      var need = 0;
      cards.forEach(function (c) {
        var back = c.children[1], last = back && back.lastElementChild;
        if (!last) return;
        var cs = getComputedStyle(back);
        need = Math.max(need, last.offsetTop + last.offsetHeight + parseFloat(cs.paddingBottom) + parseFloat(cs.borderBottomWidth) * 2);
      });
      if (need) grid.style.setProperty("--pd-flip-h", Math.ceil(need + 4) + "px");
    }
    fit();
    var fitT;
    function refit() { clearTimeout(fitT); fitT = setTimeout(fit, 120); }
    addEventListener("resize", refit, { passive: true });
    addEventListener("load", refit);
    if (document.fonts) document.fonts.addEventListener("loadingdone", refit);
  }

  // ---- Workspace / phone: mouse-follow parallax + pause off screen ----
  function setupParallax(el, offClass) {
    var visible = false, tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      el.classList.toggle(offClass, !visible);
    }).observe(el);
    if (COARSE) return;
    function tick() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--mx", cx.toFixed(3));
      el.style.setProperty("--my", cy.toFixed(3));
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(tick) : 0;
    }
    document.addEventListener("pointermove", function (e) {
      if (!visible) return;
      var r = el.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (innerWidth / 2)));
      ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (innerHeight / 2)));
      if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: true });
  }

  function scan() {
    var hero = document.querySelector(".pd-hero");
    if (hero && !hero._pdVis) { hero._pdVis = true; heroVis.observe(hero); }
    var ws = document.querySelector(".pd-ws");
    if (ws && !ws._pdPx) { ws._pdPx = true; setupParallax(ws, "pd-ws-off"); }
    var cp = document.querySelector(".pd-cp");
    if (cp && !cp._pdPx) { cp._pdPx = true; setupParallax(cp, "pd-cp-off"); }
    var tech = document.querySelector("#skills .auto-rows-min");
    if (tech && !tech._pdTech) { tech._pdTech = true; setupFlip(tech); }
    [].forEach.call(document.querySelectorAll("#services .group"), function (c) { c.classList.add("pd-card"); });
  }

  // React may render after this script; rescan on DOM changes (batched per frame).
  var queued = false;
  new MutationObserver(function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; scan(); });
  }).observe(document.body, { childList: true, subtree: true });
  scan();

  // ---- Services cards: 3D tilt ----
  function reset(card) {
    card.style.transform = "";
    card.classList.remove("pd-hover");
  }
  function tilt(card, e, amount, lift) {
    var r = card.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5; // -0.5 .. 0.5
    var y = (e.clientY - r.top) / r.height - 0.5;
    card.classList.add("pd-hover");
    card.style.transform =
      "perspective(900px) rotateX(" + (-y * amount).toFixed(2) + "deg) rotateY(" + (x * amount).toFixed(2) + "deg) translateY(" + lift + "px)";
  }

  if (COARSE) {
    // Touch: no hover, so a tap gives a brief 3D press toward the finger.
    document.addEventListener("pointerdown", function (e) {
      var card = e.target.closest && e.target.closest(".pd-card");
      if (!card) return;
      tilt(card, e, MAX_TILT * 0.8, -4);
      clearTimeout(card._pdT);
      card._pdT = setTimeout(function () { reset(card); }, 550);
    }, { passive: true });
    ["pointerup", "pointercancel"].forEach(function (t) {
      document.addEventListener(t, function (e) {
        var card = e.target.closest && e.target.closest(".pd-card");
        if (!card) return;
        clearTimeout(card._pdT);
        card._pdT = setTimeout(function () { reset(card); }, 220);
      }, { passive: true });
    });
    return;
  }

  // Fine pointers: tilt follows the cursor while hovering.
  var active = null;
  document.addEventListener("pointermove", function (e) {
    var card = e.target.closest && e.target.closest(".pd-card");
    if (active && active !== card) reset(active);
    active = card;
    if (!card) return;
    tilt(card, e, MAX_TILT, -6);
  }, { passive: true });
  document.addEventListener("pointerleave", function () { if (active) reset(active); active = null; });
})();
