"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, RotateCcw, Sliders, Info } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface Organ {
  id: string;
  name: string;
  color: string;
  visible: boolean;
  opacity: number;
}

const DEFAULT_ORGANS: Organ[] = [
  { id: "heart", name: "Heart", color: "#ef4444", visible: true, opacity: 0.8 },
  { id: "lungs", name: "Lungs", color: "#f97316", visible: true, opacity: 0.5 },
  { id: "liver", name: "Liver", color: "#b91c1c", visible: true, opacity: 0.7 },
  { id: "kidneys", name: "Kidneys", color: "#fbbf24", visible: true, opacity: 0.7 },
  { id: "bowel", name: "Bowel", color: "#14b8a6", visible: true, opacity: 0.6 },
  { id: "bone", name: "Skeleton", color: "#e2e8f0", visible: false, opacity: 0.2 },
];

function ModelScene({ organs }: { organs: Organ[] }) {
  const getOrgan = (id: string) => organs.find((o) => o.id === id) || { visible: false, opacity: 0, color: "#ffffff" };

  const heart = getOrgan("heart");
  const lungs = getOrgan("lungs");
  const liver = getOrgan("liver");
  const kidneys = getOrgan("kidneys");
  const bowel = getOrgan("bowel");
  const bone = getOrgan("bone");

  return (
    <group position={[0, -0.5, 0]}>
      {/* 1. Spine / Skeleton */}
      {bone.visible && (
        <group>
          {/* Spine vertical segment */}
          <mesh position={[0, 0.4, -0.6]}>
            <cylinderGeometry args={[0.08, 0.08, 2.2, 12]} />
            <meshStandardMaterial color={bone.color} transparent opacity={bone.opacity} roughness={0.8} />
          </mesh>
          {/* Mock ribs */}
          {[-0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1.0].map((y, idx) => (
            <mesh key={idx} position={[0, y + 0.2, 0]} rotation={[0, 0, 0]}>
              <torusGeometry args={[0.7, 0.03, 8, 24, Math.PI]} />
              <meshStandardMaterial color={bone.color} transparent opacity={bone.opacity} roughness={0.9} />
            </mesh>
          ))}
        </group>
      )}

      {/* 2. Heart */}
      {heart.visible && (
        <mesh position={[-0.15, 0.6, 0.1]}>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color={heart.color} transparent opacity={heart.opacity} roughness={0.3} metalness={0.1} />
        </mesh>
      )}

      {/* 3. Lungs */}
      {lungs.visible && (
        <group>
          {/* Left Lung */}
          <mesh position={[-0.38, 0.55, -0.05]}>
            <sphereGeometry args={[0.26, 24, 24]} />
            <meshStandardMaterial color={lungs.color} transparent opacity={lungs.opacity} roughness={0.6} />
          </mesh>
          {/* Right Lung */}
          <mesh position={[0.38, 0.55, -0.05]}>
            <sphereGeometry args={[0.26, 24, 24]} />
            <meshStandardMaterial color={lungs.color} transparent opacity={lungs.opacity} roughness={0.6} />
          </mesh>
        </group>
      )}

      {/* 4. Liver */}
      {liver.visible && (
        <mesh position={[0.22, 0.1, 0.1]} rotation={[0.2, 0, -0.1]}>
          <coneGeometry args={[0.35, 0.45, 4]} />
          <meshStandardMaterial color={liver.color} transparent opacity={liver.opacity} roughness={0.4} />
        </mesh>
      )}

      {/* 5. Kidneys */}
      {kidneys.visible && (
        <group>
          {/* Left Kidney */}
          <mesh position={[-0.28, -0.15, -0.3]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color={kidneys.color} transparent opacity={kidneys.opacity} roughness={0.5} />
          </mesh>
          {/* Right Kidney */}
          <mesh position={[0.28, -0.15, -0.3]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color={kidneys.color} transparent opacity={kidneys.opacity} roughness={0.5} />
          </mesh>
        </group>
      )}

      {/* 6. Bowel / Intestines */}
      {bowel.visible && (
        <group position={[0, -0.4, 0.05]}>
          {/* Large loops simulated using toruses */}
          <mesh position={[0, 0.08, 0]}>
            <torusGeometry args={[0.32, 0.08, 12, 32]} />
            <meshStandardMaterial color={bowel.color} transparent opacity={bowel.opacity} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.08, 0]}>
            <torusGeometry args={[0.28, 0.08, 12, 32]} />
            <meshStandardMaterial color={bowel.color} transparent opacity={bowel.opacity} roughness={0.7} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export function MeshViewer() {
  const [organs, setOrgans] = useState<Organ[]>(DEFAULT_ORGANS);
  const [activeOrganId, setActiveOrganId] = useState<string>("heart");
  const [key, setKey] = useState(0);

  const toggleOrgan = (id: string) => {
    setOrgans((prev) =>
      prev.map((o) => (o.id === id ? { ...o, visible: !o.visible } : o))
    );
  };

  const handleOpacityChange = (id: string, value: number[]) => {
    setOrgans((prev) =>
      prev.map((o) => (o.id === id ? { ...o, opacity: value[0] } : o))
    );
  };

  const resetView = () => {
    setKey((k) => k + 1);
    setOrgans(DEFAULT_ORGANS);
  };

  const activeOrgan = organs.find((o) => o.id === activeOrganId) || organs[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs text-muted-foreground font-mono">3D Mesh Viewport (WebGL)</span>
        </div>
        <button
          onClick={resetView}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 border border-border/50 transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          Reset View & Visibility
        </button>
      </div>

      <div className="relative aspect-[4/3] rounded-xl bg-black/60 border border-border/50 overflow-hidden">
        <Canvas key={key} dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 1.2, 2.5]} />
          <OrbitControls enableDamping dampingFactor={0.08} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 6} />
          <Environment preset="city" />
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 5, 4]} intensity={0.8} />
          <directionalLight position={[-4, 5, -4]} intensity={0.2} />
          <ModelScene organs={organs} />
        </Canvas>
        <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur border border-border/50 rounded-lg px-2.5 py-1.5 text-[10px] text-muted-foreground font-mono flex items-center gap-1.5 pointer-events-none">
          <Info className="h-3.5 w-3.5 text-cyan-400" />
          <span>Left-Click + Drag to rotate. Right-Click to pan. Scroll to zoom.</span>
        </div>
      </div>

      {/* Grid of organ controllers */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Organ Toggles */}
        <div className="glass-card rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-semibold text-white flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-cyan-400" />
            Organ Layers
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {organs.map((organ) => (
              <div
                key={organ.id}
                onClick={() => setActiveOrganId(organ.id)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition-all cursor-pointer ${
                  organ.id === activeOrganId
                    ? "border-cyan-500/40 bg-cyan-500/5 shadow-md shadow-cyan-500/[0.03]"
                    : "border-border/50 hover:bg-white/[0.02]"
                }`}
              >
                <div
                  className="h-3.5 w-3.5 rounded-sm shrink-0 flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: organ.visible ? organ.color : "transparent",
                    border: `1.5px solid ${organ.color}`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOrgan(organ.id);
                  }}
                >
                  {organ.visible && (
                    <div className="h-1 w-1 bg-white rounded-full" />
                  )}
                </div>
                <span className="truncate flex-1 font-medium text-foreground">{organ.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOrgan(organ.id);
                  }}
                  className="text-muted-foreground hover:text-foreground ml-auto"
                >
                  {organ.visible ? (
                    <Eye className="h-3.5 w-3.5 text-cyan-400" />
                  ) : (
                    <EyeOff className="h-3.5 w-3.5 text-muted-foreground/60" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Organ Sliders */}
        <div className="glass-card rounded-xl p-4 flex flex-col justify-between space-y-3">
          <div>
            <h4 className="text-xs font-semibold text-white flex items-center gap-1.5 mb-3">
              <Sliders className="h-3.5 w-3.5 text-cyan-400" />
              Adjust Density & Opacity
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: activeOrgan.color }} />
                  {activeOrgan.name} Opacity
                </span>
                <span className="font-mono text-cyan-400">{(activeOrgan.opacity * 100).toFixed(0)}%</span>
              </div>
              <Slider
                min={0}
                max={1}
                step={0.05}
                disabled={!activeOrgan.visible}
                value={activeOrgan.opacity}
                onChange={(e) => handleOpacityChange(activeOrgan.id, [parseFloat(e.target.value)])}
              />
            </div>
          </div>

          <div className="rounded bg-muted/40 border border-border/50 p-2.5 text-[10px] text-muted-foreground leading-normal">
            Select an organ to modify its opacity. Set opacity to 0% to review internal anatomy. Enable the <span className="text-foreground font-medium">Skeleton</span> overlay to visual sagittal bone landmarks.
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple placeholder helper
function Layers({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.5 12h-15m15 0a5 5 0 11-10 0 5 5 0 0110 0z" />
    </svg>
  );
}
