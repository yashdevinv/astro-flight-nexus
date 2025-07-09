
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
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
      {/* Rocket Body - Saffron color */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 4, 8]} />
        <meshStandardMaterial color="#ff9933" />
      </mesh>
      
      {/* Nose Cone - White */}
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0, 0.3, 1, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Fins - Green */}
      <mesh position={[0.4, -1.5, 0]}>
        <boxGeometry args={[0.1, 1, 0.5]} />
        <meshStandardMaterial color="#138808" />
      </mesh>
      <mesh position={[-0.4, -1.5, 0]}>
        <boxGeometry args={[0.1, 1, 0.5]} />
        <meshStandardMaterial color="#138808" />
      </mesh>
      <mesh position={[0, -1.5, 0.4]}>
        <boxGeometry args={[0.5, 1, 0.1]} />
        <meshStandardMaterial color="#138808" />
      </mesh>
      <mesh position={[0, -1.5, -0.4]}>
        <boxGeometry args={[0.5, 1, 0.1]} />
        <meshStandardMaterial color="#138808" />
      </mesh>
    </group>
  );
};

export const LiveOrientationDisplay: React.FC<{ orientation: OrientationProps }> = ({ orientation }) => {
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-orange-400/30 rounded-lg p-4 h-80 shadow-lg">
      <h3 className="text-lg font-bold text-orange-400 mb-4 flex items-center">
        <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
        LIVE ORIENTATION
      </h3>
      
      <div className="h-48 bg-slate-900/60 rounded border border-orange-400/20 shadow-inner">
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#ff9933" />
          <RocketModel {...orientation} />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="bg-slate-700/60 p-2 rounded border border-orange-400/20">
          <div className="text-orange-400 font-semibold">PITCH</div>
          <div className="text-white font-mono">{orientation.pitch.toFixed(1)}°</div>
        </div>
        <div className="bg-slate-700/60 p-2 rounded border border-orange-400/20">
          <div className="text-orange-400 font-semibold">YAW</div>
          <div className="text-white font-mono">{orientation.yaw.toFixed(1)}°</div>
        </div>
        <div className="bg-slate-700/60 p-2 rounded border border-orange-400/20">
          <div className="text-orange-400 font-semibold">ROLL</div>
          <div className="text-white font-mono">{orientation.roll.toFixed(1)}°</div>
        </div>
      </div>
    </div>
  );
};
