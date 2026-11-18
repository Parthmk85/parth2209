"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import DeveloperAvatar from "./DeveloperAvatar";
import FloatingTechIcons from "./FloatingTechIcons";

const LOOK_AT = new THREE.Vector3(0, 1.2, 0);

// Accent colours come from CSS variables (parthdev.in's theme stylesheet,
// public/parthdev-theme.css), so a re-theme needs no rebuild. Read once.
function readTheme() {
  const cs = getComputedStyle(document.documentElement);
  const v = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
  return {
    glowA: v("--hero-3d-a", "#B49A78"),
    glowB: v("--hero-3d-b", "#3E493B"),
    glass: v("--hero-3d-glass", "#D8CBB8"),
    desk: v("--hero-3d-desk", "#3a3328"),
    lightA: v("--hero-3d-light-a", "#b49a78"),
    lightB: v("--hero-3d-light-b", "#8fa07f"),
    ambient: v("--hero-3d-ambient", "#f5f1e8"),
  };
}

/** Keeps the whole set in frame on narrow (portrait) canvases. */
function Framing() {
  const { camera, size } = useThree();
  useEffect(() => {
    camera.position.set(0, 1.4, 3.2 / Math.min(1, size.width / size.height));
    camera.lookAt(LOOK_AT);
  }, [camera, size]);
  return null;
}

/** Subtle mouse parallax: the room turns a little, icons drift a little more. */
function Parallax({ pointer, children, icons }) {
  const room = useRef();
  const orbit = useRef();
  useFrame((_, dt) => {
    const p = pointer.current;
    const d = THREE.MathUtils.damp;
    room.current.rotation.y = d(room.current.rotation.y, -0.5 + p.x * 0.08, 2.5, dt);
    room.current.rotation.x = d(room.current.rotation.x, -p.y * 0.03, 2.5, dt);
    orbit.current.position.x = d(orbit.current.position.x, p.x * 0.07, 2, dt);
    orbit.current.position.y = d(orbit.current.position.y, p.y * 0.05, 2, dt);
  });
  return (
    <>
      {/* -0.5 rad turns the desk into the 3/4 view of the reference */}
      <group ref={room} position={[-0.08, 0, 0.1]} rotation={[0, -0.5, 0]}>
        {children}
      </group>
      <group ref={orbit}>{icons}</group>
    </>
  );
}

export default function DeveloperScene() {
  const wrap = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [inView, setInView] = useState(true);
  // Client-only module (ssr: false), so matchMedia is safe here.
  const [{ reduced, mobile, theme }] = useState(() => ({
    theme: readTheme(),
    reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    mobile: window.matchMedia("(max-width: 767px)").matches,
  }));

  useEffect(() => {
    // Track the cursor over the whole page, relative to the canvas centre.
    const move = (e) => {
      const r = wrap.current.getBoundingClientRect();
      const c = THREE.MathUtils.clamp;
      pointer.current.x = c(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
      pointer.current.y = c(-((e.clientY - r.top) / r.height) * 2 + 1, -1, 1);
    };
    // Stop rendering entirely while the hero is scrolled out of view.
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(wrap.current);
    if (!reduced) window.addEventListener("pointermove", move, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", move);
    };
  }, [reduced]);

  return (
    <div ref={wrap} className="h-full w-full" aria-label="Animated 3D illustration of a developer at a desk" role="img">
      <Canvas
        // Reduced motion: render once, no animation loop.
        frameloop={reduced ? "demand" : inView ? "always" : "never"}
        dpr={[1, mobile ? 1.5 : 2]}
        camera={{ fov: 36, near: 0.1, far: 30, position: [0, 1.4, 3.2] }}
        gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
        fallback={<div className="h-full w-full bg-[radial-gradient(circle_at_55%_45%,rgba(180,154,120,.25),transparent_60%)]" />}
      >
        <Framing />
        <ambientLight intensity={0.85} color={theme.ambient} />
        <directionalLight position={[1.5, 2.5, 4]} intensity={2.2} color="#fff8ec" />
        <directionalLight position={[-3, 1.5, 2]} intensity={0.8} color={theme.glass} />
        <pointLight position={[-1.8, 2.2, -1.2]} intensity={10} color={theme.lightA} distance={7} />
        <pointLight position={[1.8, 1.9, -1.0]} intensity={8} color={theme.lightB} distance={7} />
        <pointLight position={[1.4, 1.3, 0.9]} intensity={3} color="#ffb36b" distance={4} />

        <Suspense fallback={null}>
          {/* Local light rig for reflections; no HDR download. */}
          <Environment resolution={64} frames={1}>
            <Lightformer intensity={2} color={theme.glass} position={[0, 3, 2]} scale={[6, 1, 1]} />
            <Lightformer intensity={1.5} color={theme.glowA} position={[4, 1, 0]} rotation-y={-Math.PI / 2} scale={[3, 2, 1]} />
            <Lightformer intensity={1} color="#ffffff" position={[-4, 1, 1]} rotation-y={Math.PI / 2} scale={[3, 2, 1]} />
          </Environment>

          <Parallax pointer={pointer} icons={<FloatingTechIcons animate={!reduced} theme={theme} />}>
            <DeveloperAvatar pointer={pointer} animate={!reduced} theme={theme} />
          </Parallax>

          <Sparkles count={mobile ? 30 : 90} scale={[4.5, 3, 2.5]} position={[0, 1.3, -0.4]} size={2.2} speed={reduced ? 0 : 0.3} opacity={0.8} color={theme.glowA} />
        </Suspense>
      </Canvas>
    </div>
  );
}
