"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Icons are inline SVG data URLs: no extra requests. To use your own artwork,
// swap any value for a path under /public (e.g. "/hero/react.png").
const svg = (body) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">${body}</svg>`
  )}`;
const word = (t, fill, size = 112) =>
  `<text x="128" y="132" dominant-baseline="middle" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="${size}" fill="${fill}">${t}</text>`;

export const ICONS = {
  react: svg(
    `<g fill="none" stroke="#61DAFB" stroke-width="11"><ellipse cx="128" cy="128" rx="104" ry="40"/><ellipse cx="128" cy="128" rx="104" ry="40" transform="rotate(60 128 128)"/><ellipse cx="128" cy="128" rx="104" ry="40" transform="rotate(120 128 128)"/></g><circle cx="128" cy="128" r="20" fill="#61DAFB"/>`
  ),
  next: svg(`<circle cx="128" cy="128" r="112" fill="#0b0b0f"/><path d="M84 72h18l70 98V72h16v112h-17L100 96v88H84z" fill="#fff"/>`),
  ts: svg(`<rect width="256" height="256" rx="28" fill="#3178C6"/><text x="236" y="236" text-anchor="end" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="120" fill="#fff">TS</text>`),
  js: svg(`<rect width="256" height="256" rx="28" fill="#F7DF1E"/><text x="236" y="236" text-anchor="end" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="120" fill="#111">JS</text>`),
  node: svg(`<polygon points="128,18 224,73 224,183 128,238 32,183 32,73" fill="none" stroke="#5FA04E" stroke-width="16" stroke-linejoin="round"/>${word("JS", "#5FA04E", 90)}`),
  mongo: svg(
    `<path d="M128 14c-12 42-60 72-60 132 0 46 32 76 54 88l3 22h6l3-22c22-12 54-42 54-88 0-60-48-90-60-132z" fill="#47A248"/><path d="M128 44v196" stroke="#C3D7C4" stroke-width="6"/>`
  ),
  code: svg(word("&lt;/&gt;", "#e9e6ff", 120)),
};

const srgb = (t) => {
  t.colorSpace = THREE.SRGBColorSpace;
};

/** Flat decal (laptop stickers, mug print). */
export function Decal({ icon, size, ...props }) {
  const map = useTexture(ICONS[icon], srgb);
  return (
    <mesh {...props}>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial map={map} transparent roughness={0.5} />
    </mesh>
  );
}

// Laid out on an ellipse around the developer, like the reference shot.
const ORBIT = { x: 0.86, y: 0.72, cy: 1.28 };
const at = (deg) => [ORBIT.x * Math.cos((deg * Math.PI) / 180), ORBIT.cy + ORBIT.y * Math.sin((deg * Math.PI) / 180), -0.35];
const TECH = [
  { name: "React.js", icon: "react", pos: at(150) },
  { name: "Next.js", icon: "next", pos: at(108) },
  { name: "TypeScript", icon: "ts", pos: at(62) },
  { name: "Node.js", icon: "node", pos: at(22) },
  { name: "MongoDB", icon: "mongo", pos: at(-15) },
  { name: "JavaScript", icon: "js", pos: at(190) },
];

// Glowing border: a flat rounded-rect ring on the card face.
function roundedRect(path, s, r) {
  const h = s / 2;
  path.moveTo(-h + r, -h);
  path.lineTo(h - r, -h);
  path.quadraticCurveTo(h, -h, h, -h + r);
  path.lineTo(h, h - r);
  path.quadraticCurveTo(h, h, h - r, h);
  path.lineTo(-h + r, h);
  path.quadraticCurveTo(-h, h, -h, h - r);
  path.lineTo(-h, -h + r);
  path.quadraticCurveTo(-h, -h, -h + r, -h);
  return path;
}
const ringShape = roundedRect(new THREE.Shape(), 0.3, 0.03);
ringShape.holes.push(roundedRect(new THREE.Path(), 0.284, 0.022));
const ringGeo = new THREE.ShapeGeometry(ringShape, 6);

const glassProps = {
  transparent: true,
  opacity: 0.38,
  roughness: 0.08,
  metalness: 0.1,
  clearcoat: 1,
  clearcoatRoughness: 0.05,
  depthWrite: false,
};

function Card({ tech, animate, glow, glassMat }) {
  const group = useRef();
  const rim = useRef();
  const hovered = useRef(false);
  const map = useTexture(ICONS[tech.icon], srgb);

  useFrame((_, dt) => {
    const h = hovered.current;
    const s = THREE.MathUtils.damp(group.current.scale.x, h ? 1.18 : 1, 8, dt);
    group.current.scale.setScalar(s);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, h ? 0.35 : 0, 6, dt);
    rim.current.opacity = THREE.MathUtils.damp(rim.current.opacity, h ? 1 : 0.55, 8, dt);
  });

  const over = (e) => {
    e.stopPropagation();
    hovered.current = true;
    document.body.style.cursor = "pointer";
  };
  const out = () => {
    hovered.current = false;
    document.body.style.cursor = "";
  };

  return (
    <Float speed={animate ? 1.3 : 0} rotationIntensity={0.4} floatIntensity={0.6} position={tech.pos}>
      <group ref={group} onPointerOver={over} onPointerOut={out}>
        <RoundedBox args={[0.3, 0.3, 0.07]} radius={0.03} smoothness={3} material={glassMat} />
        <mesh geometry={ringGeo} position={[0, 0, 0.036]}>
          <meshBasicMaterial ref={rim} color={glow} transparent opacity={0.55} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, 0.037]}>
          <planeGeometry args={[0.17, 0.17]} />
          <meshBasicMaterial map={map} transparent toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

export default function FloatingTechIcons({ animate = true, theme }) {
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({ ...glassProps, color: theme.glass }), [theme.glass]);
  return (
    <group>
      {/* Thin glowing orbit the cards ride on. */}
      <mesh position={[0, ORBIT.cy, -0.4]} scale={[1, ORBIT.y / ORBIT.x, 1]} rotation={[0, 0, (-25 * Math.PI) / 180]}>
        <torusGeometry args={[ORBIT.x, 0.004, 6, 120, (235 * Math.PI) / 180]} />
        <meshBasicMaterial color={theme.glowA} transparent opacity={0.7} toneMapped={false} />
      </mesh>
      {TECH.map((t, i) => (
        <Card key={t.name} tech={t} animate={animate} glow={i % 2 ? theme.glowB : theme.glowA} glassMat={glassMat} />
      ))}
    </group>
  );
}
