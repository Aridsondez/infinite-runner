import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import * as THREE from "three";
import { useControlsStore } from "./useControls/useControlsStore";

const Player = () => {
  const { scene, animations } = useGLTF("/models/extrabullshits.glb");
  const { camera } = useThree();
  const { actions, names } = useAnimations(animations, scene);
  const group = useRef(); 

  // Physics Body (Cannon.js)
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 2, 0], // Start slightly above ground
    args: [0.5], // Sphere collider radius
    linearDamping: 0.99, // Prevents sliding
    angularDamping: 1.0, // Prevents spinning issues
    fixedRotation: true, // Prevents unwanted tilting
  }),group);

  // Animated Model (Three.js)

  const speed = 6; // Walking speed
  const runSpeed = 10; // Running speed
  const jumpForce = 6; // Jump force
  const velocity = useRef(new THREE.Vector3()); // Store the velocity
  const position = useRef(new THREE.Vector3()); // Store the position
  const activeKeys = useRef(new Set());
  const rotationEuler = new THREE.Euler(0, 0, 0, "XYZ");


  const [currentAction, setCurrentAction] = useState(names[names.length - 1]); // Default to Idle
  const prevAction = useRef(null);
  const isJumping = useRef(false);
  const isRunning = useRef(false);

  // Sync velocity & position from physics engine
  useEffect(() => {
    const unsubscribeVelocity = api.velocity.subscribe((v) => {
      velocity.current.set(v[0], v[1], v[2]); // Convert velocity to a Vector3
    });

    const unsubscribePosition = api.position.subscribe((p) => {
      position.current.set(p[0], p[1], p[2]); // Convert position to a Vector3
    });

    return () => {
      unsubscribeVelocity();
      unsubscribePosition();
    };
  }, [api.velocity, api.position]);

  // Handle Animation Transitions
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
        api.applyImpulse([0, jumpForce, 0], [0, 0, 0]); 
        setCurrentAction(names[0]); // Jump animation
        console.log("Jump Triggered");
  
        setTimeout(() => (isJumping.current = false), 600); // Allow jumping again after animation
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

  // Movement & Camera
  useFrame(() => {
    const {direction} = useControlsStore.getState();
    if (ref.current && group.current) {
      let moveX = 0;
      let moveZ = 0;
      let movementApplied = false;
      let currentSpeed = isRunning.current ? runSpeed : speed;

      // Movement logic - apply force to physics body
      if (activeKeys.current.has("ArrowUp") || activeKeys.current.has("KeyW") || direction === "forward") {
        moveZ = -currentSpeed;
        movementApplied = true;
      }
      if (activeKeys.current.has("ArrowDown") || activeKeys.current.has("KeyS") || direction === "backward") {
        moveZ = currentSpeed;
        movementApplied = true;
      }
      if (activeKeys.current.has("ArrowLeft") || activeKeys.current.has("KeyA") || direction === "left") {
        moveX = -currentSpeed;
        movementApplied = true;
      }
      if (activeKeys.current.has("ArrowRight") || activeKeys.current.has("KeyD")|| direction === "right") {
        moveX = currentSpeed;
        movementApplied = true;
      }
      

      // Apply movement to physics body
      api.velocity.set(moveX, velocity.current.y, moveZ);

      // **Now Correctly Sync the Model to the Physics Body**
      if (position.current) {
        group.current.position.lerp(position.current, 0.5); // Smoothly follow physics body
      }

      // Handle Idle Animation
      if (!movementApplied) {
        setCurrentAction(names[names.length - 1] || "idle");
      } else {
        setCurrentAction(isRunning.current ? names[1] || "run" : names[2] || "walk");
      }

      // Rotate player to face movement direction
      if (movementApplied) {
        const angle = Math.atan2(moveX, moveZ); // Calculate rotation angle
        rotationEuler.set(0, angle, 0); // Set rotation in Euler angles
        api.rotation.set(rotationEuler.x, rotationEuler.y, rotationEuler.z);
      }

      // Fix Camera to Follow Model (not the physics body)
      const targetPosition = new THREE.Vector3(
        group.current.position.x,
        group.current.position.y + 3,
        group.current.position.z + 5
      );
      camera.position.lerp(targetPosition, 0.02);
      camera.lookAt(group.current.position);
    }
  });

  return <primitive object={scene} ref={group} />;
};

export default Player;
