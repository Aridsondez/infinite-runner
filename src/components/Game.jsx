import { Canvas } from "@react-three/fiber";
import { Physics, Debug, } from "@react-three/cannon";
import { OrbitControls, Sky } from "@react-three/drei";
import { useControls } from "leva";
import { useState, useCallback } from "react";
import Player from "./Player"
import Ground from "./Ground"
import UI from "./UI"
import NPC from "./Npc";
import { npcData } from "./npcData/npcDate";
import Skybox from "./SkyBox";
import MobileControls from "./MobileControlsUI";
import LoadingScreen from "./LoadingScreen";


const Game = () => {

    


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
      <LoadingScreen />

    <Canvas camera={{ position: [0, 5, 10] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <Skybox/>

      {/* Physics Engine */}
      <Physics>
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
      <MobileControls/>
   
    </>
  );
};

export default Game;
