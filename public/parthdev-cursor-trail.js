/*
 * parthdev.in comet trail behind the custom cursor.
 *
 * Loaded ONLY on parthdev.in: nginx (/etc/nginx/sites-available/parthdev)
 * injects the <script> next to parthdev-theme.css; ezcods.com never loads it.
 *
 * A "head" point eases toward the pointer every frame, so the trail curves
 * smoothly even when mouse events are jerky. Recent head positions are drawn
 * as a tapering, fading burgundy stroke. The rAF loop only runs while there
 * is something to draw, so an idle page costs nothing.
 */
(function () {
  if (!window.matchMedia || matchMedia("(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;

  var RGB = "74, 26, 42"; // #4A1A2A
  var LIFE = 200; // ms a trail point stays visible (shorter tail)
  var MAX_W = 4; // stroke width at the head (CSS px)
  var EASE = 0.32; // per-frame catch-up at 60fps

  var canvas, ctx, dpr = 1, running = false, last = 0;
  var target = null, head = null, pts = [];
  var dirty = null; // area drawn last frame, the only part that needs clearing

  function setup() {
    canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    // Hidden whenever there's no trail: a blended full-screen layer would
    // otherwise be composited over the page on every scroll frame.
    canvas.style.cssText = "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9998;mix-blend-mode:multiply;display:none";
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    resize();
    addEventListener("resize", resize, { passive: true });
  }

  function resize() {
    // The trail is a soft glow: cap the backing store (~2400px wide) so 2K/4K
    // screens don't pay for a huge canvas.
    dpr = Math.max(0.75, Math.min(devicePixelRatio || 1, 1.5, 2400 / innerWidth));
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
  }

  function frame(now) {
    var dt = Math.min(now - (last || now), 50);
    last = now;

    // Ease the head toward the pointer (frame-rate independent).
    var k = 1 - Math.pow(1 - EASE, dt / 16.67);
    head.x += (target.x - head.x) * k;
    head.y += (target.y - head.y) * k;
    var moving = Math.abs(target.x - head.x) + Math.abs(target.y - head.y) > 0.3;
    if (moving) pts.push({ x: head.x, y: head.y, t: now });
    while (pts.length && now - pts[0].t > LIFE) pts.shift();

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (dirty) ctx.clearRect(dirty[0], dirty[1], dirty[2] - dirty[0], dirty[3] - dirty[1]);
    var pad = MAX_W * 2.4 + 4, x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (var n = 0; n < pts.length; n++) {
      var q = pts[n];
      if (q.x < x0) x0 = q.x; if (q.x > x1) x1 = q.x; if (q.y < y0) y0 = q.y; if (q.y > y1) y1 = q.y;
    }
    dirty = pts.length ? [x0 - pad, y0 - pad, x1 + pad, y1 + pad] : null;
    ctx.lineCap = "butt"; // round caps overlap at joints and look beaded
    ctx.lineJoin = "round";

    // Smooth curve through midpoints; each segment tapers and fades with age.
    for (var i = 1; i < pts.length - 1; i++) {
      var a = pts[i - 1], b = pts[i], c = pts[i + 1];
      var life = 1 - (now - b.t) / LIFE; // 1 at head, 0 when expired
      var pos = i / (pts.length - 1); // 0 at tail, 1 at head
      var f = life * pos;
      if (f <= 0) continue;
      ctx.beginPath();
      ctx.moveTo((a.x + b.x) / 2, (a.y + b.y) / 2);
      ctx.quadraticCurveTo(b.x, b.y, (b.x + c.x) / 2, (b.y + c.y) / 2);
      // soft outer glow, then a finer bright core
      ctx.strokeStyle = "rgba(" + RGB + "," + (0.1 * f).toFixed(3) + ")";
      ctx.lineWidth = MAX_W * 2.4 * f + 1;
      ctx.stroke();
      ctx.strokeStyle = "rgba(" + RGB + "," + (0.45 * f).toFixed(3) + ")";
      ctx.lineWidth = MAX_W * f + 0.5;
      ctx.stroke();
    }

    if (moving || pts.length) requestAnimationFrame(frame);
    else {
      running = false;
      canvas.style.display = "none";
    }
  }

  addEventListener(
    "pointermove",
    function (e) {
      if (e.pointerType && e.pointerType !== "mouse") return;
      if (!canvas) setup();
      target = { x: e.clientX, y: e.clientY };
      if (!head) head = { x: target.x, y: target.y };
      if (!running) {
        running = true;
        last = 0;
        canvas.style.display = "";
        requestAnimationFrame(frame);
      }
    },
    { passive: true }
  );
  // Link/button hover flag for the cursor glow (cheaper than a body:has(:hover)
  // selector, which re-checks styles page-wide whenever hover changes).
  var root = document.documentElement, onLink = false;
  document.addEventListener("pointerover", function (e) {
    var hit = !!(e.target.closest && e.target.closest('a, button, [role="button"]'));
    if (hit !== onLink) { onLink = hit; root.classList.toggle("pd-link-hover", hit); }
  }, { passive: true });

  // Leaving the window: let the trail fade out where it is.
  document.addEventListener("mouseleave", function () { if (head) target = { x: head.x, y: head.y }; });
})();
