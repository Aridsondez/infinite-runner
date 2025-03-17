import { Canvas } from "@react-three/fiber";
import { Physics, Debug, } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { useState, useCallback } from "react";
import Player from "./Player"
import Ground from "./Ground"
import UI from "./UI"
import NPC from "./Npc";
import { npcData } from "./npcData/npcDate";

const Game = () => {

    const gravity = useControls('Gravity', {
        x: { value: 0, min: -10, max: 10, step: 0.1 },
        y: { value: -9.8, min: -10, max: 10, step: 0.1 },
        z: { value: 0, min: -10, max: 10, step: 0.1 },
      })


    const [isPaused, setIsPaused] = useState(true);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = useCallback(() => {
    setIsPaused(false);
    setIsGameStarted(true);
  }, []);

  const pauseGame = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);



  return (
    <>
    <Canvas camera={{ position: [0, 5, 10] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      {/* Physics Engine */}
      <Physics gravity={[gravity.x, gravity.y, gravity.z]}>
        <Debug>
        <Ground />
        <Player />
        {npcData.map((npc, index) => (
        <NPC key={index} {...npc} />
        ))}
        </Debug>

      </Physics>

      {/* Camera Controls */}
      <OrbitControls/>
      {/* UI */}
      
      
    </Canvas>
    <UI 
        startGame={startGame} 
        pauseGame={pauseGame} 
        isPaused={isPaused} 
        isGameStarted={isGameStarted} 
      />
   
    </>
  );
};

export default Game;
