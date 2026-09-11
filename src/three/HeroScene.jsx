import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import EnergyCore from "./EnergyCore";
import Particles from "./Particles";


function Scene({ scrollProgress }) {

  const sceneRef = useRef();
  const cameraRef = useRef();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setMobile(window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);
  useFrame(() => {

    if (!sceneRef.current || !cameraRef.current) {
      return;
    }

    /*
     * Get scroll progress from GSAP.
     *
     * 0 = top of Hero
     * 1 = bottom of Hero
     */

    const progress = scrollProgress.current;


    /*
     * Move entire 3D composition
     */

    sceneRef.current.position.x = THREE.MathUtils.lerp(
      0,
      1.5,
      progress
    );

    sceneRef.current.position.y = THREE.MathUtils.lerp(
      0,
      0.5,
      progress
    );

    sceneRef.current.position.z = THREE.MathUtils.lerp(
      0,
      -1,
      progress
    );


    /*
     * Rotate entire composition
     */

    sceneRef.current.rotation.x = THREE.MathUtils.lerp(
      0,
      0.5,
      progress
    );

    sceneRef.current.rotation.y = THREE.MathUtils.lerp(
      0,
      Math.PI * 0.8,
      progress
    );

    sceneRef.current.rotation.z = THREE.MathUtils.lerp(
      0,
      0.3,
      progress
    );


    /*
     * Scale composition
     */

    const scale = THREE.MathUtils.lerp(
      1,
      1.3,
      progress
    );

    sceneRef.current.scale.setScalar(scale);


    /*
     * Camera movement
     */

    cameraRef.current.position.x = THREE.MathUtils.lerp(
      0,
      0.8,
      progress
    );

    cameraRef.current.position.y = THREE.MathUtils.lerp(
      0,
      0.4,
      progress
    );

    cameraRef.current.position.z = THREE.MathUtils.lerp(
      7,
      5.5,
      progress
    );

    cameraRef.current.lookAt(0, 0, 0);

  });


  return (
    <>
      <ambientLight intensity={1} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
      />

      <pointLight
        position={[-5, -5, -5]}
        intensity={2}
      />


      <group ref={sceneRef}>

        <EnergyCore />

        <Particles mobile={mobile} />

      </group>


      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 7]}
        fov={45}
      />

    </>
  );
}


function HeroScene({ scrollProgress }) {

  return (
    <div className="hero-scene">

    <Canvas
  dpr={[1, 1.5]}
  gl={{
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  }}
>

        <Scene
          scrollProgress={scrollProgress}
        />

      </Canvas>

    </div>
  );
}


export default HeroScene;