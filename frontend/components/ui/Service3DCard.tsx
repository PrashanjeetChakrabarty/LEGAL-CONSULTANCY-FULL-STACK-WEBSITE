"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

export default function Service3DCard({ title, index }: { title: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const transform = useMotionTemplate`rotateX(${mouseXSpring}deg) rotateY(${mouseYSpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = (e.clientX - rect.left) * 32;
    const mouseY = (e.clientY - rect.top) * 32;
    // Calculate rotation (-15deg to 15deg max)
    const rX = (mouseY / height - 16) * -1;
    const rY = mouseX / width - 16;
    
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative glass-panel p-10 hover:border-gold-accent/50 transition-colors group flex flex-col justify-between h-80 rounded-sm cursor-pointer"
    >
      <div 
        style={{ transform: "translateZ(50px)" }} 
        className="absolute inset-0 z-0 pointer-events-none opacity-30 group-hover:opacity-100 transition-opacity duration-700"
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            {index === 0 && (
              <group scale={1.2}>
                <mesh position={[0, -0.2, 0]}>
                  <boxGeometry args={[1.6, 1.2, 0.4]} />
                  <MeshDistortMaterial color="#D4AF37" distort={0} roughness={0.2} metalness={0.8} />
                </mesh>
                <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
                  <torusGeometry args={[0.3, 0.05, 16, 32, Math.PI]} />
                  <MeshDistortMaterial color="#D4AF37" distort={0} roughness={0.2} metalness={0.8} />
                </mesh>
              </group>
            )}
            
            {index === 1 && (
              <group scale={1.2} rotation={[0, 0, Math.PI / 4]}>
                <mesh position={[0, 0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.2, 0.2, 0.8, 32]} />
                  <MeshDistortMaterial color="#D4AF37" distort={0} roughness={0.2} metalness={0.8} />
                </mesh>
                <mesh position={[0, -0.2, 0]}>
                  <cylinderGeometry args={[0.08, 0.08, 1.2, 32]} />
                  <MeshDistortMaterial color="#D4AF37" distort={0} roughness={0.2} metalness={0.8} />
                </mesh>
              </group>
            )}
            
            {index === 2 && (
              <group scale={1.2}>
                <mesh position={[0, 0.3, 0]}>
                  <sphereGeometry args={[0.5, 32, 32]} />
                  <MeshDistortMaterial color="#D4AF37" distort={0.2} speed={3} roughness={0.2} metalness={0.8} />
                </mesh>
                <mesh position={[0, -0.3, 0]}>
                  <cylinderGeometry args={[0.2, 0.15, 0.4, 32]} />
                  <MeshDistortMaterial color="#C0C0C0" distort={0} roughness={0.5} metalness={0.8} />
                </mesh>
              </group>
            )}
          </Float>
        </Canvas>
      </div>

      <div style={{ transform: "translateZ(75px)" }} className="relative z-10 flex flex-col h-full pointer-events-none">
        <h3 className="text-2xl font-serif text-white group-hover:text-gold-accent transition-colors drop-shadow-lg">{title}</h3>
        <div className="w-12 h-[1px] bg-white/20 group-hover:bg-gold-accent transition-colors mt-auto mb-6"></div>
      </div>
      
      <Link 
        href="/services" 
        style={{ transform: "translateZ(90px)" }} 
        className="relative z-20 text-sm text-white/50 tracking-widest uppercase group-hover:text-white transition-colors block w-fit"
      >
        View Details
      </Link>
    </motion.div>
  );
}
