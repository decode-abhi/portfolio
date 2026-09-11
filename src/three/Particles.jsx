import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

function Particles({ mobile = false }) { 
  const particlesRef = useRef();

  const count = mobile ? 350 : 900;

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 5;
      const angle = Math.random() * Math.PI * 2;

      array[i * 3] = Math.cos(angle) * radius;
      array[i * 3 + 1] = (Math.random() - 0.5) * 6;
      array[i * 3 + 2] = Math.sin(angle) * radius;
    }

    return array;
  }, []);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    particlesRef.current.rotation.y += delta * 0.015;
    particlesRef.current.rotation.x += delta * 0.005;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.018}
        transparent
        opacity={0.6}
      />
    </points>
  );
}

export default Particles;