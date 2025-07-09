
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface OrientationProps {
  pitch: number;
  yaw: number;
  roll: number;
}

const RocketModel: React.FC<OrientationProps> = ({ pitch, yaw, roll }) => {
  const rocketRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (rocketRef.current) {
      rocketRef.current.rotation.x = THREE.MathUtils.degToRad(pitch);
      rocketRef.current.rotation.y = THREE.MathUtils.degToRad(yaw);
      rocketRef.current.rotation.z = THREE.MathUtils.degToRad(roll);
    }
  });

  return (
    <group ref={rocketRef}>
      {/* Rocket Body */}
      <Cylinder args={[0.3, 0.3, 4, 8]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#e11d48" />
      </Cylinder>
      
      {/* Nose Cone */}
      <Cylinder args={[0, 0.3, 1, 8]} position={[0, 2.5, 0]}>
        <meshStandardMaterial color="#dc2626" />
      </Cylinder>
      
      {/* Fins */}
      <Box args={[0.1, 1, 0.5]} position={[0.4, -1.5, 0]}>
        <meshStandardMaterial color="#1e40af" />
      </Box>
      <Box args={[0.1, 1, 0.5]} position={[-0.4, -1.5, 0]}>
        <meshStandardMaterial color="#1e40af" />
      </Box>
      <Box args={[0.5, 1, 0.1]} position={[0, -1.5, 0.4]}>
        <meshStandardMaterial color="#1e40af" />
      </Box>
      <Box args={[0.5, 1, 0.1]} position={[0, -1.5, -0.4]}>
        <meshStandardMaterial color="#1e40af" />
      </Box>
    </group>
  );
};

export const LiveOrientationDisplay: React.FC<{ orientation: OrientationProps }> = ({ orientation }) => {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 h-80">
      <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center">
        <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
        LIVE ORIENTATION
      </h3>
      
      <div className="h-48 bg-slate-900/50 rounded border border-slate-700">
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <RocketModel {...orientation} />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="bg-slate-800/50 p-2 rounded border border-slate-600">
          <div className="text-orange-400 font-semibold">PITCH</div>
          <div className="text-white">{orientation.pitch.toFixed(1)}°</div>
        </div>
        <div className="bg-slate-800/50 p-2 rounded border border-slate-600">
          <div className="text-orange-400 font-semibold">YAW</div>
          <div className="text-white">{orientation.yaw.toFixed(1)}°</div>
        </div>
        <div className="bg-slate-800/50 p-2 rounded border border-slate-600">
          <div className="text-orange-400 font-semibold">ROLL</div>
          <div className="text-white">{orientation.roll.toFixed(1)}°</div>
        </div>
      </div>
    </div>
  );
};
