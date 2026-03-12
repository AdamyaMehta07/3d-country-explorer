import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { TextureLoader } from "three";
import { useRef, useState } from "react";
import Marker from "./Marker";
import SearchBar from "./SearchBar";
import CameraController from "./CameraController";

function latLngToVector3(lat, lng, radius = 2) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
}

function Earth({ markerPosition }) {

  const earthRef = useRef();
  const cloudRef = useRef();

  const earthTexture = useLoader(TextureLoader, "/textures/earth.jpg");
  const cloudTexture = useLoader(TextureLoader, "/textures/clouds.png");

  useFrame(() => {
    earthRef.current.rotation.y += 0.0015;
    cloudRef.current.rotation.y += 0.0018;
  });

  return (
    <group ref={earthRef}>

      {/* Earth */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>

      {/* Clouds */}
      <mesh ref={cloudRef}>
        <sphereGeometry args={[2.03, 64, 64]} />
        <meshStandardMaterial
          map={cloudTexture}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Marker */}
      {markerPosition && <Marker position={markerPosition} />}

    </group>
  );
}

function Globe() {

  const [countryPosition, setCountryPosition] = useState(null);

  let markerPosition = null;

  if (countryPosition) {
    markerPosition = latLngToVector3(
      countryPosition.lat,
      countryPosition.lng
    );
  }

  return (
    <>
      <SearchBar setCountryPosition={setCountryPosition} />

      <Canvas camera={{ position: [0, 0, 6] }}>

        {/* Lights */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} />

        {/* Stars */}
        <Stars radius={100} depth={50} count={6000} factor={4} />

        {/* Earth */}
        <Earth markerPosition={markerPosition} />

        {/* Camera */}
        <CameraController target={markerPosition} />

        {/* Controls */}
        <OrbitControls enableZoom />

      </Canvas>
    </>
  );
}

export default Globe;