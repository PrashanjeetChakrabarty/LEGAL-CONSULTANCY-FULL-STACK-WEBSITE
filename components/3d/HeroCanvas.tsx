"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Float, Sparkles, ContactShadows, SpotLight } from "@react-three/drei";
import { LegalAbstracts } from "./LegalAbstracts";

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full bg-matte-black opacity-90">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        gl={{ antialias: true, alpha: true, toneMappingExposure: 0.8 }}
      >
        <ambientLight intensity={0.4} />
        
        {/* Main warm dramatic key light */}
        <directionalLight position={[5, 10, 5]} intensity={2.5} color="#FFECD6" castShadow />
        
        {/* Soft cool fill light */}
        <directionalLight position={[-10, -5, -5]} intensity={1} color="#A39E93" />
        
        {/* Overhead dramatic spotlight */}
        <SpotLight 
          position={[0, 15, 0]} 
          angle={0.5} 
          penumbra={1} 
          intensity={5} 
          color="#C5A059" 
          distance={20}
        />

        <Float
          speed={1} 
          rotationIntensity={0.5} 
          floatIntensity={1.5}
          floatingRange={[-0.1, 0.1]}
        >
          <LegalAbstracts />
        </Float>

        <Sparkles 
          count={80} 
          scale={15} 
          size={1.5} 
          speed={0.1} 
          opacity={0.4} 
          color="#C5A059" 
        />
        
        {/* Ground shadow plane to anchor the objects */}
        <ContactShadows 
          resolution={1024} 
          scale={20} 
          blur={2.5} 
          opacity={0.6} 
          far={10} 
          color="#000000"
        />

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
