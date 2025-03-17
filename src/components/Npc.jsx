

import { useState } from "react";
import { useGLTF, Html } from "@react-three/drei";

const NPC = ({ position, name, dialogue, path }) => {
  const { scene } = useGLTF(path);
  const [isTalking, setIsTalking] = useState(false);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const question = dialogue[currentDialogueIndex]?.question || "No more questions!";
  const correctAnswer = dialogue[currentDialogueIndex]?.correctAnswer || "";

  const checkAnswer = () => {
    if (answer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
      setFeedback("✅ ¡Correcto!");
      setTimeout(() => {
        setAnswer("");
        setFeedback("");
        setCurrentDialogueIndex((prev) => (prev + 1 < dialogue.length ? prev + 1 : 0)); // Move to next question
      }, 1000);
    } else {
      setFeedback("❌ Incorrecto. Intenta otra vez.");
    }
  };

  return (
    <group position={position} onClick={() => setIsTalking(!isTalking)}>
      <primitive object={scene} />
      
      {/* Attach UI inside the canvas using Drei's Html */}
      {!isTalking ? <Html position={[0, 2, 0]} center>
        <p className="font-bold">{name}</p>
      </Html> :
        <Html position={[0, 2, 0]} center>
          <div className="bg-white w-full flex-col text-black rounded-md items-center justify-center flex">
            <p className="p-2 font-bold"><strong>{name}:</strong> {question}</p>
            <input
                className="text-black bg-blue-300 text-center p-2"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="ENTER YOUR RESPONSE HERE."
            />
            <button className="!bg-blue-400 m-2"onClick={checkAnswer}>Enviar</button>
            <p>{feedback}</p>
            <button  className="!bg-red-500 text-white m-2"onClick={() => setIsTalking(false)}>Cerrar(EXIT)</button>
          </div>
        </Html>
      }
    </group>
  );
};

export default NPC;
