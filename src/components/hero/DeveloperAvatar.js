"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { Decal } from "./FloatingTechIcons";

// Procedural, stylised developer built from primitives: no rigged GLB ships
// with the site, so head-follow, blinking and typing are driven here directly
// (head group rotation, eye scale, finger rotation) rather than by a skeleton.
// ponytail: primitives cap realism; for a sculpted character, drop in a rigged
// GLB (useGLTF) and drive its Head bone / eyeBlink morphs from the same refs.

const std = (color, o) => new THREE.MeshStandardMaterial({ color, roughness: 0.85, ...o });
const M = {
  skin: std("#c98a64", { roughness: 0.6 }),
  hair: std("#16100d", { roughness: 0.7 }),
  beard: std("#221814", { roughness: 0.9 }),
  lips: std("#9a5646", { roughness: 0.6 }),
  white: std("#f4f1ee", { roughness: 0.3 }),
  iris: std("#2a1a12", { roughness: 0.2 }),
  hoodie: std("#1c1d2c"),
  hoodieDark: std("#141522"),
  jeans: std("#1b2032"),
  shoe: std("#e8e6f0", { roughness: 0.6 }),
  frame: std("#0d0d10", { roughness: 0.3, metalness: 0.4 }),
  lens: new THREE.MeshPhysicalMaterial({ color: "#a5c8ff", transparent: true, opacity: 0.12, roughness: 0, depthWrite: false }),
  phones: std("#24242c", { roughness: 0.4, metalness: 0.3 }),
  chair: std("#2b2e26", { roughness: 0.6 }),
  desk: std("#3a3328", { roughness: 0.55 }),
  laptop: std("#5b5c66", { roughness: 0.35, metalness: 0.7 }),
  keys: std("#121219", { roughness: 0.8 }),
  screen: new THREE.MeshStandardMaterial({ color: "#0b1230", emissive: "#4f7dff", emissiveIntensity: 0.9, roughness: 0.3 }),
  mug: std("#14141c", { roughness: 0.4 }),
  coffee: std("#3b2416", { roughness: 0.2 }),
  pot: std("#e2ddd6", { roughness: 0.7 }),
  soil: std("#2a1d15"),
  leaf: std("#3f8f4a", { roughness: 0.6, side: THREE.DoubleSide }),
  leafDark: std("#2c6b38", { roughness: 0.6, side: THREE.DoubleSide }),
  led: new THREE.MeshBasicMaterial({ color: "#B49A78", toneMapped: false }),
};

/** Capsule spanning two points (limbs). */
function Limb({ from, to, r, material }) {
  const { pos, quat, len } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const d = new THREE.Vector3(...to).sub(a);
    return {
      pos: a.addScaledVector(d, 0.5),
      len: d.length(),
      quat: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from.join(), to.join()]);
  return (
    <mesh position={pos} quaternion={quat} material={material}>
      <capsuleGeometry args={[r, len, 6, 14]} />
    </mesh>
  );
}

const Ball = ({ r, material, seg = 24, ...p }) => (
  <mesh material={material} {...p}>
    <sphereGeometry args={[r, seg, seg]} />
  </mesh>
);

// ---- character ---------------------------------------------------------

const HIP = [0, 0.55, -0.6];
const LEAN = 0.12;

function Head({ eyes }) {
  return (
    <group>
      <Ball r={0.13} material={M.skin} position={[0, 0.14, 0]} scale={[0.92, 1.08, 1]} seg={32} />
      {/* ears */}
      {[-1, 1].map((s) => (
        <Ball key={s} r={0.03} material={M.skin} position={[s * 0.12, 0.135, -0.005]} scale={[0.5, 1, 0.8]} />
      ))}
      {/* beard, moustache, lips */}
      <Ball r={0.115} material={M.beard} position={[0, 0.058, 0.016]} scale={[0.9, 0.6, 1]} seg={28} />
      <mesh material={M.beard} position={[0, 0.1, 0.126]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.011, 0.045, 4, 8]} />
      </mesh>
      <mesh material={M.lips} position={[0, 0.082, 0.132]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.007, 0.028, 4, 8]} />
      </mesh>
      <Ball r={0.02} material={M.skin} position={[0, 0.125, 0.128]} scale={[0.85, 1.1, 1]} />
      {/* eyes: the groups are scaled in Y to blink */}
      {[-1, 1].map((s, i) => (
        <group key={s} ref={(el) => { eyes.current[i] = el; }} position={[s * 0.045, 0.155, 0.108]}>
          <Ball r={0.022} material={M.white} seg={16} />
          <Ball r={0.011} material={M.iris} position={[0, 0, 0.018]} seg={12} />
        </group>
      ))}
      {[-1, 1].map((s) => (
        <mesh key={s} material={M.hair} position={[s * 0.047, 0.192, 0.12]} rotation={[0, 0, s * -0.12]}>
          <boxGeometry args={[0.048, 0.01, 0.012]} />
        </mesh>
      ))}
      {/* hair: back shell + top cap + swept quiff */}
      <mesh material={M.hair} position={[0, 0.15, -0.006]} scale={[0.97, 1.1, 1.04]}>
        <sphereGeometry args={[0.134, 28, 20, Math.PI, Math.PI]} />
      </mesh>
      <mesh material={M.hair} position={[0, 0.165, 0]} scale={[0.98, 1.06, 1.06]}>
        <sphereGeometry args={[0.136, 28, 14, 0, Math.PI * 2, 0, Math.PI * 0.42]} />
      </mesh>
      <Ball r={0.07} material={M.hair} position={[0.025, 0.275, 0.055]} scale={[1.45, 0.62, 1.05]} rotation={[0.3, 0, -0.15]} />
      <Ball r={0.06} material={M.hair} position={[-0.055, 0.265, 0.035]} scale={[1.3, 0.6, 1.1]} rotation={[0.2, 0, 0.25]} />
      {[-1, 1].map((s) => (
        <mesh key={s} material={M.hair} position={[s * 0.113, 0.13, 0.03]}>
          <boxGeometry args={[0.012, 0.07, 0.04]} />
        </mesh>
      ))}
      {/* glasses */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.047, 0.155, 0.138]}>
          <mesh material={M.frame}>
            <torusGeometry args={[0.031, 0.0045, 8, 28]} />
          </mesh>
          <mesh material={M.lens}>
            <circleGeometry args={[0.03, 24]} />
          </mesh>
          <mesh material={M.frame} position={[s * 0.07, 0.004, -0.065]}>
            <boxGeometry args={[0.005, 0.007, 0.13]} />
          </mesh>
        </group>
      ))}
      <mesh material={M.frame} position={[0, 0.16, 0.14]}>
        <boxGeometry args={[0.03, 0.005, 0.005]} />
      </mesh>
    </group>
  );
}

function Hand({ side, fingers }) {
  const s = side;
  return (
    <group position={[s * 0.13, 0.81, -0.19]} rotation={[0.08, -s * 0.57, 0]}>
      <mesh material={M.skin} position={[0, 0, 0.03]}>
        <boxGeometry args={[0.068, 0.024, 0.07]} />
      </mesh>
      {[-0.024, -0.008, 0.008, 0.024].map((x, i) => (
        <group key={x} ref={(el) => { fingers.current[(s > 0 ? 4 : 0) + i] = el; }} position={[x, -0.002, 0.064]} rotation={[0.5, 0, 0]}>
          <mesh material={M.skin} position={[0, 0, 0.018]} rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.0075, 0.028, 4, 8]} />
          </mesh>
        </group>
      ))}
      <mesh material={M.skin} position={[-s * 0.04, -0.004, 0.05]} rotation={[Math.PI / 2, 0, -s * 0.6]}>
        <capsuleGeometry args={[0.009, 0.03, 4, 8]} />
      </mesh>
      {/* sleeve cuff */}
      <mesh material={M.hoodieDark} position={[0, 0, -0.012]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.042, 0.045, 0.03, 16]} />
      </mesh>
    </group>
  );
}

function Developer({ pointer, animate }) {
  const body = useRef();
  const head = useRef();
  const eyes = useRef([]);
  const fingers = useRef([]);
  const blink = useRef({ next: 1.5, start: -1 });

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;

    // Breathing.
    body.current.scale.y = 1 + Math.sin(t * 1.6) * 0.006;

    // Head follows the cursor, damped (frame-rate independent lerp).
    const p = pointer.current;
    const h = head.current.rotation;
    h.y = THREE.MathUtils.damp(h.y, 0.15 + p.x * 0.55, 3, dt);
    h.x = THREE.MathUtils.damp(h.x, 0.14 - p.y * 0.28, 3, dt);
    h.z = THREE.MathUtils.damp(h.z, -p.x * 0.05, 3, dt);

    // Blink at random 2.5–6s intervals; sometimes a quick double blink.
    const b = blink.current;
    if (t >= b.next) {
      b.start = t;
      b.next = t + (Math.random() < 0.18 ? 0.3 : 2.5 + Math.random() * 3.5);
    }
    const k = (t - b.start) / 0.16;
    const open = k >= 0 && k <= 1 ? 1 - Math.sin(k * Math.PI) * 0.92 : 1;
    eyes.current.forEach((e) => e && (e.scale.y = open));

    // Typing in bursts with natural pauses.
    const burst = THREE.MathUtils.smoothstep(Math.sin(t * 0.55) + Math.sin(t * 1.3) * 0.3, -0.35, 0.15);
    fingers.current.forEach((f, i) => {
      if (!f) return;
      const press = Math.max(0, Math.sin(t * 13 + i * 2.39 + (i % 3) * 0.7)) ** 3;
      f.rotation.x = 0.5 + press * 0.4 * burst;
    });
  });

  return (
    <group>
      {/* chair */}
      <RoundedBox args={[0.5, 0.08, 0.48]} radius={0.03} position={[0, 0.46, -0.64]} material={M.chair} />
      <RoundedBox args={[0.54, 0.82, 0.09]} radius={0.04} position={[0, 0.98, -0.92]} rotation={[-0.12, 0, 0]} material={M.chair} />
      <mesh material={M.phones} position={[0, 0.25, -0.64]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 12]} />
      </mesh>
      <mesh material={M.chair} position={[0, 0.04, -0.64]}>
        <cylinderGeometry args={[0.3, 0.3, 0.035, 5]} />
      </mesh>

      {/* legs */}
      {[-1, 1].map((s) => (
        <group key={s}>
          <Limb from={[s * 0.1, 0.53, -0.62]} to={[s * 0.13, 0.54, -0.26]} r={0.075} material={M.jeans} />
          <Limb from={[s * 0.13, 0.54, -0.26]} to={[s * 0.13, 0.1, -0.24]} r={0.062} material={M.jeans} />
          <RoundedBox args={[0.1, 0.07, 0.2]} radius={0.03} position={[s * 0.13, 0.04, -0.2]} material={M.shoe} />
        </group>
      ))}

      {/* upper body: torso, hood, headphones, head */}
      <group ref={body} position={HIP} rotation={[LEAN, 0, 0]}>
        <mesh material={M.hoodie} position={[0, 0.3, 0]} scale={[1.3, 1, 0.82]}>
          <capsuleGeometry args={[0.17, 0.28, 8, 20]} />
        </mesh>
        {[-1, 1].map((s) => (
          <Ball key={s} r={0.085} material={M.hoodie} position={[s * 0.21, 0.5, 0]} />
        ))}
        <mesh material={M.hoodieDark} position={[0, 0.55, -0.02]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.1, 0.048, 10, 24, Math.PI]} />
        </mesh>
        {[-1, 1].map((s) => (
          <mesh key={s} material={M.white} position={[s * 0.04, 0.42, 0.135]} rotation={[0.25, 0, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.14, 6]} />
          </mesh>
        ))}
        <mesh material={M.skin} position={[0, 0.61, 0]}>
          <cylinderGeometry args={[0.05, 0.055, 0.12, 16]} />
        </mesh>
        {/* headphones resting around the neck */}
        <mesh material={M.phones} position={[0, 0.57, 0.02]} rotation={[Math.PI / 2 - 0.25, 0, 0]}>
          <torusGeometry args={[0.105, 0.014, 8, 32]} />
        </mesh>
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 0.11, 0.55, 0.06]} rotation={[0, 0, Math.PI / 2]}>
            <mesh material={M.phones}>
              <cylinderGeometry args={[0.052, 0.052, 0.04, 24]} />
            </mesh>
            <mesh material={M.led} position={[0, s * 0.021, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.04, 0.003, 6, 24]} />
            </mesh>
          </group>
        ))}
        <group ref={head} position={[0, 0.66, 0]}>
          <Head eyes={eyes} />
        </group>
      </group>

      {/* arms (static), hands animate */}
      {[-1, 1].map((s) => (
        <group key={s}>
          <Limb from={[s * 0.22, 1.04, -0.54]} to={[s * 0.27, 0.86, -0.4]} r={0.068} material={M.hoodie} />
          <Limb from={[s * 0.27, 0.86, -0.4]} to={[s * 0.135, 0.815, -0.2]} r={0.058} material={M.hoodie} />
          <Hand side={s} fingers={fingers} />
        </group>
      ))}
    </group>
  );
}

// ---- desk & props --------------------------------------------------------

function Laptop() {
  return (
    <group position={[0, 0.765, -0.14]}>
      <RoundedBox args={[0.44, 0.018, 0.29]} radius={0.008} position={[0, 0.009, 0]} material={M.laptop} />
      <mesh material={M.keys} position={[0, 0.0185, -0.03]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.38, 0.13]} />
      </mesh>
      {/* lid hinges at the far edge and tilts toward the camera; stickers on its back */}
      <group position={[0, 0.018, 0.145]} rotation={[0.22, 0, 0]}>
        <RoundedBox args={[0.44, 0.29, 0.012]} radius={0.006} position={[0, 0.145, 0]} material={M.laptop} />
        <mesh material={M.screen} position={[0, 0.145, -0.0065]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.41, 0.26]} />
        </mesh>
        <Decal icon="react" size={0.075} position={[-0.12, 0.2, 0.0065]} rotation={[0, 0, 0.15]} />
        <Decal icon="next" size={0.07} position={[0.11, 0.21, 0.0065]} />
        <Decal icon="ts" size={0.06} position={[0.12, 0.08, 0.0065]} rotation={[0, 0, -0.1]} />
        <Decal icon="node" size={0.065} position={[-0.13, 0.07, 0.0065]} rotation={[0, 0, 0.08]} />
      </group>
    </group>
  );
}

function Plant({ animate }) {
  const leaves = useRef();
  useFrame(({ clock }) => {
    if (animate) leaves.current.rotation.z = Math.sin(clock.elapsedTime * 0.8) * 0.03;
  });
  return (
    <group position={[-0.55, 0.885, -0.05]}>
      <mesh material={M.pot} position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.065, 0.05, 0.1, 20]} />
      </mesh>
      <mesh material={M.soil} position={[0, 0.098, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.06, 20]} />
      </mesh>
      <group ref={leaves} position={[0, 0.1, 0]}>
        {Array.from({ length: 9 }, (_, i) => {
          const a = (i / 9) * Math.PI * 2;
          const tilt = 0.45 + (i % 3) * 0.18;
          return (
            <group key={i} rotation={[0, a, 0]}>
              <Ball r={0.06} material={i % 2 ? M.leaf : M.leafDark} seg={10} position={[0, 0.07, 0.035]} rotation={[tilt, 0, 0]} scale={[0.32, 1.25, 0.08]} />
            </group>
          );
        })}
      </group>
    </group>
  );
}

function Desk({ animate, theme }) {
  return (
    <group>
      <RoundedBox args={[1.9, 0.05, 0.85]} radius={0.015} position={[0, 0.74, 0]} material={M.desk} />
      {/* purple LED strip along the front edge */}
      <mesh material={M.led} position={[0, 0.717, 0.426]}>
        <boxGeometry args={[1.86, 0.006, 0.004]} />
      </mesh>
      {[-1, 1].map((x) =>
        [-1, 1].map((z) => (
          <mesh key={`${x}${z}`} material={M.desk} position={[x * 0.88, 0.36, z * 0.36]}>
            <boxGeometry args={[0.05, 0.72, 0.05]} />
          </mesh>
        ))
      )}
      <Laptop />

      {/* books + plant */}
      {[
        [theme.glowB, 0.04],
        [theme.glowA, -0.06],
        ["#efe6dc", 0.1],
      ].map(([c, r], i) => (
        <RoundedBox key={i} args={[0.27, 0.04, 0.19]} radius={0.006} position={[-0.55, 0.785 + i * 0.04, -0.05]} rotation={[0, r, 0]}>
          <meshStandardMaterial color={c} roughness={0.7} />
        </RoundedBox>
      ))}
      <Plant animate={animate} />

      {/* mug with </> print */}
      <group position={[0.5, 0.765, 0.1]}>
        <mesh material={M.mug} position={[0, 0.055, 0]}>
          <cylinderGeometry args={[0.045, 0.042, 0.11, 24]} />
        </mesh>
        <mesh material={M.coffee} position={[0, 0.105, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.04, 20]} />
        </mesh>
        <mesh material={M.mug} position={[0.05, 0.055, 0]}>
          <torusGeometry args={[0.028, 0.008, 8, 20]} />
        </mesh>
        <Decal icon="code" size={0.06} position={[0, 0.055, 0.0455]} />
      </group>
    </group>
  );
}

export default function DeveloperAvatar({ pointer, animate = true, theme }) {
  const invalidate = useThree((st) => st.invalidate);
  useEffect(() => {
    M.desk.color.set(theme.desk);
    M.led.color.set(theme.glowA);
    invalidate(); // reduced-motion renders on demand only
  }, [theme, invalidate]);
  return (
    <group>
      <Desk animate={animate} theme={theme} />
      <Developer pointer={pointer} animate={animate} />
      {/* screen glow on the face */}
      <pointLight position={[0, 1.0, -0.25]} color="#d9dccf" intensity={0.9} distance={1.2} decay={2} />
    </group>
  );
}
