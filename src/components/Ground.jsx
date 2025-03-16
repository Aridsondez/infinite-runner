import { usePlane } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
const Ground = () => {
  const [ref] = usePlane(() => ({
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0]
  }));

  useFrame(() => {
    ref.current.position.z -= 0.1; // Moves ground backward
    if (ref.current.position.z < -10) ref.current.position.z = 0; // Reset position
  });

  return (
    <mesh ref={ref}>
      <City/>
    </mesh>
  );
};

export default Ground;




const City = () => {
  const { scene } = useGLTF("/models/city.glb"); // Load city environment
  scene.rotation.set(Math.PI / 2, 0, 0); // Rotate 90 degrees back to upright


  return <primitive object={scene} scale={0.01} position={[0,0, -5]} />;
};