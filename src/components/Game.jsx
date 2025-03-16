import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import Player from "./Player"
import Ground from "./Ground"
import Obstacles from "./Obstacles"


const Game = () => {
  return (
    <Canvas camera={{ position: [0, 5, 10] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      {/* Physics Engine */}
      <Physics>
        <Ground />
        <Player />

      </Physics>

      {/* Camera Controls */}
      <OrbitControls />

      {/* UI */}
    </Canvas>
  );
};

export default Game;
