/*
 * parthdev.in cinematic scroll: stacked section transitions, parallax/zoom
 * and morphing background shapes, driven by GSAP ScrollTrigger.
 *
 * Loaded ONLY on parthdev.in (nginx injects it with parthdev-theme.css);
 * ezcods.com never loads it. GSAP is self-hosted in /parthdev-vendor/ and only
 * fetched when the homepage is shown.
 *
 * Natural scrolling: nothing hijacks the wheel; every effect is a transform,
 * opacity or clip-path scrubbed to scroll position, so layout never changes.
 * - Bands (homepage sections after the hero) start as a rounded card inside
 *   the content width and open out to full bleed as they scroll in.
 * - Section content drifts with gentle parallax; the about photo zooms.
 * - Desktop: Services -> How we work -> Tech stack play as a horizontal
 *   sequence (panels slide in from the right / out to the left) with no
 *   pinning, so scrolling stays native. Touch / narrow screens stay vertical.
 * - Hero text lifts and fades on the way out, the portrait slightly zooms.
 *   (The hero <section> itself is never transformed: the opening curtain is
 *   position:fixed inside it.)
 * - Soft pink shapes (fixed layer) morph continuously and travel between
 *   sections as the page scrolls.
 * Re-initialises after client-side navigation back to the homepage.
 */
(function () {
  if (!window.matchMedia || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var VENDOR = "/parthdev-vendor/";
  var HOME = "div:has(> section#services)";
  var loading = null, root = null, ctx = null, shapes = null, mm = null;
  // Sections that play as one horizontal sequence on desktop (in page order).
  var HGROUP = ["services", "process", "skills"];
  var HDESK = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";
  var HOTHER = "(max-width: 1023.98px), (hover: none), (pointer: coarse)";

  function load(src) {
    return new Promise(function (ok, fail) {
      var s = document.createElement("script");
      s.src = VENDOR + src;
      s.onload = ok;
      s.onerror = fail;
      document.head.appendChild(s);
    });
  }
  function gsapReady() {
    if (window.ScrollTrigger) return Promise.resolve();
    return (loading = loading || load("gsap.min.js?v=3.13.0").then(function () { return load("ScrollTrigger.min.js?v=3.13.0"); }));
  }

  function makeShapes() {
    var layer = document.createElement("div");
    layer.className = "pd-shapes";
    layer.setAttribute("aria-hidden", "true");
    layer.innerHTML = '<i class="pd-shape pd-shape-a"></i><i class="pd-shape pd-shape-b"></i><i class="pd-shape pd-shape-c"></i>';
    document.body.appendChild(layer);
    return layer;
  }

  function init(container) {
    var gsap = window.gsap, ST = window.ScrollTrigger;
    gsap.registerPlugin(ST);
    // Mobile browsers resize the viewport as the address bar shows/hides;
    // don't recalculate (and jump) on those, only on real resizes.
    ST.config({ ignoreMobileResize: true });
    // GSAP's default force3D:"auto" is deliberate here: elements are GPU layers
    // only while their scrubbed tween is active, so off-screen sections release
    // their (large, at 2K/4K) GPU textures instead of all staying resident.
    if (!shapes) shapes = makeShapes();
    shapes.style.display = "";

    ctx = gsap.context(function () {
      var mobile = innerWidth < 768;
      var sections = container.querySelectorAll(":scope > section");
      var hero = sections[0];

      // Hero exit: text lifts and fades, portrait zooms gently.
      var heroText = hero.querySelector(".hero-in");
      var heroArt = heroText && heroText.nextElementSibling;
      var heroOut = { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 };
      if (heroText) gsap.to(heroText, { yPercent: -18, opacity: 0.15, ease: "none", scrollTrigger: heroOut });
      if (heroArt) gsap.to(heroArt, { yPercent: -8, scale: 1.06, ease: "none", scrollTrigger: heroOut });

      // Stacked band: rounded card inside the content -> full-bleed band.
      // Same units (px) at both ends so GSAP can interpolate; the start
      // leaves slack so card borders and parallaxed content aren't clipped.
      // The end matches the CSS band clip (-4rem vertical, full-bleed sides).
      function cardReveal(sec) {
        gsap.fromTo(
          sec,
          { clipPath: "inset(-24px -24px -96px -24px round 36px)" },
          {
            clipPath: function () { return "inset(-64px -" + innerWidth + "px -64px -" + innerWidth + "px round 0px)"; },
            ease: "power2.out",
            scrollTrigger: { trigger: sec, start: "top 92%", end: "top 35%", scrub: 0.5, invalidateOnRefresh: true },
          }
        );
      }

      // Horizontal sequence members (must be consecutive sections).
      var panels = HGROUP.map(function (id) { return container.querySelector(":scope > section#" + id); }).filter(Boolean);
      var consecutive = panels.length > 1 && panels.every(function (p, k) {
        if (!k) return true;
        var e = panels[k - 1].nextElementSibling;
        while (e && e.tagName !== "SECTION") e = e.nextElementSibling;
        return e === p;
      });
      if (!consecutive) panels = [];

      for (var i = 1; i < sections.length; i++) {
        var sec = sections[i];
        if (panels.indexOf(sec) < 0) cardReveal(sec);

        // Parallax: content enters lower and drifts up past the viewport.
        var kids = sec.querySelectorAll(":scope > *");
        gsap.fromTo(
          kids,
          { y: mobile ? 36 : 70 },
          { y: mobile ? -12 : -30, ease: "none", stagger: 0.04, scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: 0.8 } }
        );
        // Section titles settle in with a slight zoom.
        var title = sec.querySelector("h2");
        if (title)
          gsap.fromTo(title, { scale: 0.9, opacity: 0.4, transformOrigin: "left center" }, { scale: 1, opacity: 1, ease: "power2.out", scrollTrigger: { trigger: sec, start: "top 90%", end: "top 55%", scrub: 0.5 } });
      }

      // ---- Horizontal scroll transformation (desktop, mouse/trackpad) ----
      // No pinning and no DOM changes, so page height and natural scrolling
      // are untouched. Every section is (at least) one screen tall; while the
      // next panel scrolls up into view it is held at the top of the screen
      // (y cancels the scroll exactly, linear) and slides in from the right,
      // while the current panel is held bottom-aligned and slides out left
      // (x, eased). Taller panels scroll normally between transitions.
      // Timing comes from layout offsets, which transforms don't affect.
      if (panels.length) {
        var absTop = function (el) { var t = 0; while (el) { t += el.offsetTop; el = el.offsetParent; } return t; };
        mm = gsap.matchMedia();
        mm.add(HDESK, function () {
          // Each panel's band is clipped to exactly the viewport width (so
          // neighbours sit edge to edge) and reaches down to the next panel.
          // The last panel's band only reaches down to the next section while
          // it is sliding in (that section isn't on screen yet); at rest it
          // returns to the normal 4rem so the following section looks unchanged.
          var lastSliding = false;
          function bleed() {
            panels.forEach(function (p, k) {
              var x = Math.ceil((innerWidth - p.offsetWidth) / 2) + 2;
              var bottom = k < panels.length - 1 || lastSliding ? -128 : -64;
              p.style.clipPath = "inset(-64px -" + x + "px " + bottom + "px -" + x + "px)";
            });
          }
          bleed();
          ST.addEventListener("refresh", bleed);
          for (var k = 0; k < panels.length - 1; k++) (function (a, b) {
            var range = {
              start: function () { return absTop(b) - innerHeight; }, // b's top reaches the screen bottom
              end: function () { return absTop(b); },                  // ... and the screen top
              invalidateOnRefresh: true,
            };
            var hold = Object.assign({ scrub: true }, range);   // exact: no vertical drift
            if (b === panels[panels.length - 1]) hold.onUpdate = function (self) {
              var sliding = self.progress > 0 && self.progress < 0.999;
              if (sliding !== lastSliding) { lastSliding = sliding; bleed(); }
            };
            var slide = Object.assign({ scrub: 0.7 }, range);   // smoothed: cinematic
            gsap.fromTo(b, { y: function () { return -innerHeight; } }, { y: 0, ease: "none", scrollTrigger: hold });
            gsap.fromTo(a, { y: 0 }, { y: function () { return innerHeight; }, ease: "none", immediateRender: false, scrollTrigger: hold });
            gsap.fromTo(b, { x: function () { return innerWidth; } }, { x: 0, ease: "power2.inOut", scrollTrigger: slide });
            gsap.fromTo(a, { x: 0 }, { x: function () { return -innerWidth; }, ease: "power2.inOut", immediateRender: false, scrollTrigger: slide });
          })(panels[k], panels[k + 1]);
          return function () {
            ST.removeEventListener("refresh", bleed);
            panels.forEach(function (p) { p.style.clipPath = ""; });
          };
        });
        // Phones / tablets / touch: normal vertical flow with the card reveal.
        mm.add(HOTHER, function () { panels.forEach(cardReveal); });
      }

      // About photo: slow zoom-out inside its frame.
      var photo = container.querySelector("#about-me img");
      if (photo) {
        photo.parentElement.style.overflow = "hidden";
        gsap.fromTo(photo, { scale: 1.14 }, { scale: 1, ease: "none", scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: 0.8 } });
      }

      // Morphing shapes: hidden over the hero, then travel down the page.
      var a = shapes.querySelector(".pd-shape-a"), b = shapes.querySelector(".pd-shape-b"), c = shapes.querySelector(".pd-shape-c");
      gsap.fromTo(shapes, { opacity: 0 }, { opacity: 1, ease: "none", scrollTrigger: { trigger: hero, start: "60% top", end: "bottom top", scrub: true } });
      var page = { trigger: container, start: "top top", end: "bottom bottom", scrub: 1.2 };
      gsap.fromTo(a, { xPercent: 0, yPercent: 0, scale: 0.8, rotate: 0 }, { xPercent: -160, yPercent: 120, scale: 1.25, rotate: 140, ease: "none", scrollTrigger: page });
      gsap.fromTo(b, { xPercent: 0, yPercent: 0, scale: 1.1, rotate: 0 }, { xPercent: 150, yPercent: -90, scale: 0.75, rotate: -120, ease: "none", scrollTrigger: page });
      gsap.fromTo(c, { xPercent: 0, yPercent: 0, scale: 0.6, rotate: 0 }, { xPercent: -60, yPercent: -140, scale: 1.15, rotate: 200, ease: "none", scrollTrigger: page });
    }, container);

    // Images/fonts can change page height after load.
    addEventListener("load", function () { ST.refresh(); }, { once: true });
  }

  function teardown() {
    if (mm) mm.revert();
    mm = null;
    if (ctx) ctx.revert(); // kills triggers and restores inline styles
    ctx = null;
    root = null;
    if (shapes) shapes.style.display = "none";
  }

  function check() {
    var container = document.querySelector(HOME);
    if (container === root) return;
    teardown();
    if (!container) return;
    root = container;
    gsapReady().then(function () { if (root === container) init(container); });
  }

  var queued = false;
  new MutationObserver(function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; check(); });
  }).observe(document.body, { childList: true, subtree: true });
  check();
})();
