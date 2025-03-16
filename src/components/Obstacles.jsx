import { useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

const Obstacles = () => {
  const [obstacles, setObstacles] = useState([]);

  const addObstacle = () => {
    setObstacles((prev) => [
      ...prev,
      { id: Date.now(), position: [Math.random() * 4 - 2, 1, 10] }
    ]);
  };

  useFrame(() => {
    setObstacles((prev) =>
      prev.map((obs) => ({ ...obs, position: [obs.position[0], obs.position[1], obs.position[2] - 0.1] }))
    );
  });

  return (
    <>
      {obstacles.map((obs) => (
        <mesh key={obs.id} position={obs.position}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))}
    </>
  );
};

export default Obstacles;
