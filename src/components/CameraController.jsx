import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

function CameraController({ target }) {

  const { camera } = useThree();

  useEffect(() => {
    if (!target) return;

    camera.position.set(target[0] * 2, target[1] * 2, target[2] * 2);
    camera.lookAt(target[0], target[1], target[2]);

  }, [target, camera]);

  return null;
}

export default CameraController;