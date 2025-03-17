import { usePlane } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

const Ground = () => {
  const [ref] = usePlane(() => ({
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
    type: "Static", // Static ground
  }),useRef());

  return (
    <mesh ref={ref}>
      <planeGeometry args={[25, 15]} />
      <meshStandardMaterial />
    <City/>
    </mesh>
  );
};

export default Ground;

const City = () => {
  const { scene } = useGLTF("/models/city.glb");
  scene.rotation.set(Math.PI / 2, 0, 0);
  return <primitive object={scene} scale={0.01} position={[0, 0, -5]} />;
};
