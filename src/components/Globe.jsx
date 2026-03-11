import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { TextureLoader } from "three";
import { useRef } from "react";

function Earth() {
  const meshRef = useRef();

  const earthTexture = useLoader(TextureLoader, "/textures/earth.jpg");

  useFrame(() => {
    meshRef.current.rotation.y += 0.0015;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
}

function Globe() {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      {/* Lights */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 3, 5]} />

      {/* Stars background */}
      <Stars radius={100} depth={50} count={5000} factor={4} />

      {/* Earth */}
      <Earth />

      {/* Controls */}
      <OrbitControls enableZoom />
    </Canvas>
  );
}

export default Globe;