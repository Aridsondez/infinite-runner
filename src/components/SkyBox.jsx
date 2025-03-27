import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function Skybox() {
  const { scene } = useThree();

  useEffect(() => {
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      '/textures/px.png',
      '/textures/nx.png',
      '/textures/py.png',
      '/textures/ny.png',
      '/textures/pz.png',
      '/textures/nz.png',
    ]);
    scene.background = texture;
  }, [scene]);

  return null;
}
