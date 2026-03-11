import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Earth() {
  const meshRef = useRef();

  // rotate globe
  useFrame(() => {
    meshRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

function Globe() {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      {/* Lights */}
      <ambientLight intensity={1} />
      <directionalLight position={[5, 3, 5]} />

      {/* Stars background */}
      <Stars />

      {/* Earth */}
      <Earth />

      {/* Controls */}
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
}

export default Globe;