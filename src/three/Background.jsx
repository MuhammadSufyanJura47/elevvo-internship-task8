import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function Goo() {
  const matRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#7c3aed") },
      uColorB: { value: new THREE.Color("#06b6d4") },
      uColorC: { value: new THREE.Color("#f472b6") },
    }),
    []
  );

  useFrame((_, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh position={[0, 0, -2]}>
      <planeGeometry args={[12, 12, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          uniform vec3 uColorC;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }

          float noise(vec2 p){
            vec2 i = floor(p);
            vec2 f = fract(p);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            vec2 u = f*f*(3.0-2.0*f);
            return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
          }

          void main() {
            vec2 uv = vUv;
            float t = uTime * 0.08;

            float n1 = noise(uv*3.0 + t);
            float n2 = noise(uv*6.0 - t*1.2);
            float n = smoothstep(0.2, 0.9, (n1*0.65 + n2*0.35));

            vec3 col = mix(uColorA, uColorB, uv.x);
            col = mix(col, uColorC, uv.y);

            float vignette = smoothstep(0.95, 0.35, distance(uv, vec2(0.5)));
            float alpha = 0.22 * vignette;

            gl_FragColor = vec4(col * (0.6 + 0.6*n), alpha);
          }
        `}
      />
    </mesh>
  );
}

function Orbs() {
  return (
    <group position={[0, 0, 0]}>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
        <Sphere args={[0.7, 48, 48]} position={[-1.8, 0.4, -1]}>
          <meshStandardMaterial
            color="#a78bfa"
            roughness={0.4}
            metalness={0.2}
            transparent
            opacity={0.22}
          />
        </Sphere>
      </Float>

      <Float speed={1.0} rotationIntensity={0.5} floatIntensity={0.9}>
        <Sphere args={[0.55, 48, 48]} position={[1.6, -0.3, -1.2]}>
          <meshStandardMaterial
            color="#22d3ee"
            roughness={0.35}
            metalness={0.25}
            transparent
            opacity={0.18}
          />
        </Sphere>
      </Float>

      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.75}>
        <Sphere args={[0.45, 48, 48]} position={[0.2, 1.1, -1.4]}>
          <meshStandardMaterial
            color="#fb7185"
            roughness={0.45}
            metalness={0.2}
            transparent
            opacity={0.16}
          />
        </Sphere>
      </Float>
    </group>
  );
}

export default function Background() {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 3.2], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 2]} intensity={0.7} />
        <Goo />
        <Orbs />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}