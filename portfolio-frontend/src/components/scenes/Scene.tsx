import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import Particles from "./Particles";
import HeroSphere from "./HeroSphere";
import FloatingGeometry from "./FloatingGeometry";
import ParallaxCamera from "./ParallaxCamera";

const Scene = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#f5f7fa"]} />
          <fog attach="fog" args={["#f5f7fa", 15, 60]} />

          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#7c8ef5" />
          <pointLight position={[-10, -10, -5]} intensity={0.3} color="#a78bfa" />
          <pointLight position={[0, 5, 5]} intensity={0.3} color="#7c8ef5" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.2}
            color="#7c8ef5"
          />

          <Particles count={400} />
          <HeroSphere />
          <FloatingGeometry />
          <ParallaxCamera />

          <EffectComposer>
            <Bloom
              luminanceThreshold={0.6}
              luminanceSmoothing={0.9}
              intensity={0.4}
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={[0.0002, 0.0002] as any}
              radialModulation={false}
              modulationOffset={0}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
