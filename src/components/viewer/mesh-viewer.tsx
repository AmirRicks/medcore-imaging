"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import { Eye, EyeOff, RotateCcw } from "lucide-react";

interface Organ {
  id: string;
  name: string;
  color: string;
  visible: boolean;
  opacity: number;
}

const DEFAULT_ORGANS: Organ[] = [
  { id: "heart", name: "Heart", color: "#ef4444", visible: true, opacity: 0.8 },
  { id: "lungs", name: "Lungs", color: "#f97316", visible: true, opacity: 0.6 },
  { id: "liver", name: "Liver", color: "#b91c1c", visible: true, opacity: 0.7 },
  { id: "kidneys", name: "Kidneys", color: "#fbbf24", visible: true, opacity: 0.7 },
  { id: "spleen", name: "Spleen", color: "#a855f7", visible: true, opacity: 0.7 },
  { id: "pancreas", name: "Pancreas", color: "#ec4899", visible: true, opacity: 0.7 },
  { id: "bowel", name: "Bowel", color: "#14b8a6", visible: true, opacity: 0.7 },
  { id: "bone", name: "Skeleton", color: "#e2e8f0", visible: false, opacity: 0.3 },
];

function PlaceholderScene() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1.5, 1]} />
        <meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#ef4444" transparent opacity={0.5} />
      </mesh>
      <mesh position={[-0.4, -0.2, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#f97316" transparent opacity={0.4} />
      </mesh>
      <mesh position={[0.4, -0.2, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#f97316" transparent opacity={0.4} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[0.5, 0.3, 0.3]} />
        <meshStandardMaterial color="#b91c1c" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export function MeshViewer() {
  const [organs, setOrgans] = useState<Organ[]>(DEFAULT_ORGANS);
  const [key, setKey] = useState(0);

  const toggleOrgan = (id: string) => {
    setOrgans((prev) =>
      prev.map((o) => (o.id === id ? { ...o, visible: !o.visible } : o))
    );
  };

  const setOpacity = (id: string, opacity: number) => {
    setOrgans((prev) =>
      prev.map((o) => (o.id === id ? { ...o, opacity } : o))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-muted-foreground">3D reconstruction ready</span>
        </div>
        <button
          onClick={() => setKey((k) => k + 1)}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          Reset view
        </button>
      </div>

      <div className="relative aspect-square rounded-xl bg-black/60 border border-border/50 overflow-hidden">
        <Canvas key={key} dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[4, 3, 4]} />
          <OrbitControls enableDamping dampingFactor={0.1} />
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <directionalLight position={[-5, 5, -5]} intensity={0.3} />
          <PlaceholderScene />
        </Canvas>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {organs.map((organ) => (
          <motion.button
            key={organ.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleOrgan(organ.id)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition-all ${
              organ.visible
                ? "border-border/50 bg-white/5"
                : "border-transparent bg-muted/30 opacity-50"
            }`}
          >
            <div
              className="h-3 w-3 rounded-sm shrink-0"
              style={{ backgroundColor: organ.color, opacity: organ.visible ? organ.opacity : 0.2 }}
            />
            <span className="truncate">{organ.name}</span>
            {organ.visible ? (
              <Eye className="h-3 w-3 ml-auto text-muted-foreground" />
            ) : (
              <EyeOff className="h-3 w-3 ml-auto text-muted-foreground" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
