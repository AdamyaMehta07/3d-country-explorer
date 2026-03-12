function Marker({ position }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

export default Marker;