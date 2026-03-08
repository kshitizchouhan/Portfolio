import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FloatingGeometry = () => {
  const group = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);
  const coneRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.3;
      torusRef.current.rotation.z = t * 0.2;
      torusRef.current.position.y = Math.sin(t * 0.4) * 0.5 + 2;
    }
    if (octaRef.current) {
      octaRef.current.rotation.y = t * 0.4;
      octaRef.current.position.y = Math.cos(t * 0.3) * 0.5 - 3;
    }
    if (coneRef.current) {
      coneRef.current.rotation.x = t * 0.2;
      coneRef.current.rotation.z = t * 0.3;
      coneRef.current.position.x = Math.sin(t * 0.2) * 0.5 - 6;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={torusRef} position={[-5, 2, -8]}>
        <torusGeometry args={[0.8, 0.3, 16, 32]} />
        <meshStandardMaterial color="#c4b5fd" emissive="#a78bfa" emissiveIntensity={0.05} roughness={0.3} metalness={0.3} wireframe />
      </mesh>
      <mesh ref={octaRef} position={[6, -3, -6]}>
        <octahedronGeometry args={[0.7]} />
        <meshStandardMaterial color="#99f6e4" emissive="#5eead4" emissiveIntensity={0.05} roughness={0.2} metalness={0.3} wireframe />
      </mesh>
      <mesh ref={coneRef} position={[-6, -1, -10]}>
        <coneGeometry args={[0.5, 1.2, 4]} />
        <meshStandardMaterial color="#fecdd3" emissive="#fda4af" emissiveIntensity={0.05} roughness={0.3} metalness={0.2} wireframe />
      </mesh>
    </group>
  );
};

export default FloatingGeometry;
