"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Sphere, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function OrganMesh() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Core glowing organ simulation */}
        <Sphere args={[1.5, 64, 64]}>
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={1.5}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.2}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#06b6d4"
            transmission={0.9}
            roughness={0.2}
            ior={1.5}
          />
        </Sphere>
        
        {/* Inner core */}
        <Sphere args={[0.8, 32, 32]}>
          <meshStandardMaterial 
            color="#2dd4bf" 
            emissive="#06b6d4" 
            emissiveIntensity={2} 
            wireframe 
            transparent 
            opacity={0.3} 
          />
        </Sphere>

        {/* Orbiting particles to simulate data points */}
        <group rotation={[Math.PI / 4, 0, 0]}>
          <mesh position={[2, 0, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-1.5, 1.5, 0]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color="#2dd4bf" />
          </mesh>
          <mesh position={[0, -2, 0.5]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full opacity-60 mix-blend-screen pointer-events-none">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
        <spotLight position={[-10, -10, -10]} intensity={0.5} color="#2dd4bf" />
        <Environment preset="city" />
        <OrganMesh />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
