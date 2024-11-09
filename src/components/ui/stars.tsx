"use client";
import React, { useState, useRef, useMemo, useCallback } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import * as random from "maath/random";

interface StarBackgroundProps {
  count?: number;
  radius?: number;
}

const TEDxStarBackground: React.FC<StarBackgroundProps> = ({
  count = 5000,
  radius = 1.5,
}) => {
  const ref = useRef<THREE.Points>(null);

  const [sphere] = useState(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    random.inSphere(positions, { radius });

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Mix of red and white stars
      if (Math.random() > 0.8) {
        colors[i3] = 1;
        colors[i3 + 1] = 1;
        colors[i3 + 2] = 1;
      } else {
        colors[i3] = 1;
        colors[i3 + 1] = Math.random() * 0.2;
        colors[i3 + 2] = Math.random() * 0.2;
      }
      sizes[i] = Math.random() * 0.003 + 0.001;
    }

    return { positions, colors, sizes };
  });

  const updatePositions = useCallback((delta: number) => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.0002 * delta;
        positions[i + 1] += Math.cos(Date.now() * 0.002 + i) * 0.0002 * delta;
        positions[i + 2] += Math.sin(Date.now() * 0.001 + i) * 0.0002 * delta;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  }, []);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.05;
      ref.current.rotation.y -= delta * 0.075;
    }
    updatePositions(delta);
  });

  const particlesProps = useMemo(
    () => ({
      ref,
      positions: sphere.positions,
      colors: sphere.colors,
      sizes: sphere.sizes,
      stride: 3,
      frustumCulled: false,
    }),
    [sphere],
  );

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points {...particlesProps}>
        <PointMaterial
          transparent
          vertexColors
          size={0.002}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

export const TEDxStarsCanvas: React.FC = () => (
  <div className="w-full h-full fixed inset-0 -z-10">
    <Canvas
      camera={{ position: [0, 1, 0] }}
      style={{
        background: "radial-gradient(circle, #1a1a1a 0%, #000000 100%)",
      }}
    >
      <TEDxStarBackground />
    </Canvas>
  </div>
);

export default TEDxStarsCanvas;
