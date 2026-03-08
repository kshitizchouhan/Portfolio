import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const HeroSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[3, 0, -2]} scale={1.8}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color="#b4c6fc"
        emissive="#7c8ef5"
        emissiveIntensity={0.1}
        roughness={0.2}
        metalness={0.3}
        distort={0.3}
        speed={2}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
};

export default HeroSphere;
