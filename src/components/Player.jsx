import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import * as THREE from "three";

const Player = () => {
  const { scene, animations } = useGLTF("/models/extrabullshits.glb");
  const group = useRef();
  const { actions, names } = useAnimations(animations, group);
  const { camera } = useThree();

  

  const speed = 0.1; // Walking speed
  const runSpeed = 0.2; // Running speed
  const jumpHeight = 0.1; // Jump height
  const gravity = 0
  const velocity = useRef(new THREE.Vector3());
  const direction = new THREE.Vector3();
  const targetQuaternion = new THREE.Quaternion();
  const activeKeys = useRef(new Set());

  const [currentAction, setCurrentAction] = useState(names[names.length - 1]); // Default to Idle
  const prevAction = useRef(null);
  const isJumping = useRef(false);
  const isRunning = useRef(false);

  // Handle Animation Switching with Smooth Transitions
  useEffect(() => {
    if (actions && names.length > 0) {
      if (prevAction.current && prevAction.current !== actions[currentAction]) {
        prevAction.current.fadeOut(0.3);
      }
      actions[currentAction]?.reset().fadeIn(0.3).play();
      actions[currentAction]?.setLoop(THREE.LoopRepeat, Infinity);
      prevAction.current = actions[currentAction];
    }
  }, [actions, currentAction]);

  // Handle Key Events
  useEffect(() => {
    const handleKeyDown = (e) => {
      activeKeys.current.add(e.code);

      if (e.code === "Space" && !isJumping.current) {
        isJumping.current = true;
        setCurrentAction(names[0]); // Jump animation
        setTimeout(() => {
          isJumping.current = false;
        }, 600); // Adjust time based on animation duration
      }

      if (e.code === "ShiftLeft") {
        isRunning.current = true;
      }
    };

    const handleKeyUp = (e) => {
      activeKeys.current.delete(e.code);

      if (e.code === "ShiftLeft") {
        isRunning.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Apply Movement & Camera Follow
  useFrame(() => {
    if (group.current) {
      velocity.current.set(0, 0, 0); // Reset movement vector
      let currentSpeed = isRunning.current ? runSpeed : speed;

      //removing jump ability
      if (!isJumping.current) {
        if (activeKeys.current.has("ArrowUp") || activeKeys.current.has("KeyW")) {
          velocity.current.z = -currentSpeed;
        }
        if (activeKeys.current.has("ArrowDown") || activeKeys.current.has("KeyS")) {
          velocity.current.z = currentSpeed;
        }
        if (activeKeys.current.has("ArrowLeft") || activeKeys.current.has("KeyA")) {
          velocity.current.x = -currentSpeed;
        }
        if (activeKeys.current.has("ArrowRight") || activeKeys.current.has("KeyD")) {
          velocity.current.x = currentSpeed;
        }
      }

      /**
      if (isJumping.current) {
        velocity.current.y = jumpHeight;
      } else {
        velocity.current.y += gravity // Apply gravity when not jumping
      }
       */
      // Determine the correct animation state
      if (isJumping.current) {
        setCurrentAction(names[0]); // Jump animation
      } else if (velocity.current.length() > 0) {
        setCurrentAction(isRunning.current ? names[1] : names[2]); // Run or Walk
      } else {
        setCurrentAction(names[names.length - 1]); // Idle
      }

      // Move the player
      group.current.position.add(velocity.current);

      // Rotate player to face movement direction
      if (velocity.current.length() > 0) {
        direction.copy(velocity.current).normalize();
        targetQuaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);
        group.current.quaternion.slerp(targetQuaternion, 0.1);
      }

      // Smooth Camera Follow
      const targetPosition = new THREE.Vector3(
        group.current.position.x,
        group.current.position.y + 3,
        group.current.position.z + 5
      );
      camera.position.lerp(targetPosition, 0.1);
      camera.lookAt(group.current.position);
    }
  });

  return <primitive object={scene} ref={group} />;
};

export default Player;
