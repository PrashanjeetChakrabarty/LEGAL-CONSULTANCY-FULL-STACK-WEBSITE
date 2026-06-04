"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export function LegalAbstracts() {
  const statueRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (statueRef.current) {
       // Slow, majestic rotation of the single statue
       statueRef.current.rotation.y = t * 0.15;
       // Slight breathing/floating effect on the y-axis
       statueRef.current.position.y = -2 + Math.sin(t * 0.5) * 0.1;
    }
  });

  // Matte Bronze material for the statue's body
  const bronzeMaterial = (
    <meshStandardMaterial 
      color="#A67B5B" 
      metalness={0.8} 
      roughness={0.3} 
    />
  );

  // Matte Gold for the scales, sword, and accents
  const goldMaterial = (
    <meshStandardMaterial 
      color="#C5A059" 
      metalness={0.9} 
      roughness={0.2} 
    />
  );

  // Deep Espresso for the base and blindfold
  const espressoMaterial = (
    <meshStandardMaterial 
      color="#161412" 
      metalness={0.2} 
      roughness={0.9} 
    />
  );

  return (
    <group>
      {/* Majestic Rotating Scales of Justice */}
      <group ref={statueRef} position={[0, -0.5, 0]} scale={1.1}>
        {/* Tiered Base */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[1.5, 1.8, 0.4, 64]} />
          {espressoMaterial}
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[1.2, 1.4, 0.2, 64]} />
          {goldMaterial}
        </mesh>
        
        {/* Main Stand */}
        <mesh position={[0, 2, 0]}>
          <cylinderGeometry args={[0.08, 0.15, 4.5, 32]} />
          {espressoMaterial}
        </mesh>
        <mesh position={[0, 4.3, 0]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          {goldMaterial}
        </mesh>
        
        {/* Crossbeam */}
        <mesh position={[0, 3.8, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 4, 32]} />
          {goldMaterial}
        </mesh>

        {/* Left Pan */}
        <group position={[-1.9, 3.8, 0]}>
          <mesh position={[-0.4, -1.2, 0]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.02, 0.02, 2.4, 16]} />
            {goldMaterial}
          </mesh>
          <mesh position={[0.4, -1.2, 0]} rotation={[0, 0, 0.3]}>
            <cylinderGeometry args={[0.02, 0.02, 2.4, 16]} />
            {goldMaterial}
          </mesh>
          <mesh position={[0, -2.4, 0]}>
            <cylinderGeometry args={[0.7, 0.1, 0.15, 32]} />
            {goldMaterial}
          </mesh>
        </group>

        {/* Right Pan */}
        <group position={[1.9, 3.8, 0]}>
          <mesh position={[-0.4, -1.2, 0]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.02, 0.02, 2.4, 16]} />
            {goldMaterial}
          </mesh>
          <mesh position={[0.4, -1.2, 0]} rotation={[0, 0, 0.3]}>
            <cylinderGeometry args={[0.02, 0.02, 2.4, 16]} />
            {goldMaterial}
          </mesh>
          <mesh position={[0, -2.4, 0]}>
            <cylinderGeometry args={[0.7, 0.1, 0.15, 32]} />
            {goldMaterial}
          </mesh>
        </group>
      </group>
    </group>
  );
}
