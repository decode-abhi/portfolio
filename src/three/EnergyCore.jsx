import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function EnergyCore() {
  const groupRef = useRef();
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    /*
     * Mouse position
     */
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    /*
     * Smooth group movement
     */
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseY * 0.35,
      0.03
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseX * 0.5,
      0.03
    );

    /*
     * Central object rotation
     */
    coreRef.current.rotation.x += delta * 0.3;
    coreRef.current.rotation.y += delta * 0.5;

    /*
     * Rings rotate independently
     */
    ring1Ref.current.rotation.x += delta * 0.4;
    ring1Ref.current.rotation.y += delta * 0.2;

    ring2Ref.current.rotation.y -= delta * 0.5;
    ring2Ref.current.rotation.z += delta * 0.25;

    ring3Ref.current.rotation.x -= delta * 0.3;
    ring3Ref.current.rotation.z += delta * 0.45;

    /*
     * Breathing / pulsing effect
     */
    const pulse = 1 + Math.sin(time * 2) * 0.05;

    coreRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={groupRef}>

      {/* Central Core */}

      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.35, 2]} />

        <meshStandardMaterial
          wireframe
          color="#ffffff"
          transparent
          opacity={0.85}
        />
      </mesh>


      {/* Inner Core */}

      <mesh scale={0.7}>
        <icosahedronGeometry args={[1.35, 1]} />

        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>


      {/* Ring 1 */}

      <mesh
        ref={ring1Ref}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[2, 0.025, 16, 100]} />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.7}
        />
      </mesh>


      {/* Ring 2 */}

      <mesh
        ref={ring2Ref}
        rotation={[0, Math.PI / 3, 0]}
      >
        <torusGeometry args={[2.3, 0.018, 16, 100]} />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.5}
        />
      </mesh>


      {/* Ring 3 */}

      <mesh
        ref={ring3Ref}
        rotation={[Math.PI / 4, 0, Math.PI / 4]}
      >
        <torusGeometry args={[2.7, 0.012, 16, 100]} />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.35}
        />
      </mesh>

    </group>
  );
}

export default EnergyCore;