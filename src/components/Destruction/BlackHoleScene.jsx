import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTranslation } from 'react-i18next';

const BlackHoleMaterial = shaderMaterial(
  { time: 0, opacity: 0.8 },
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
  `,
  `
  uniform float time;
  uniform float opacity;
  varying vec2 vUv;

  void main() {
    float offset = time * 0.3;
    float t = fract(vUv.x * 3.0 + offset);

    vec3 purple = vec3(0.45, 0.0, 0.6);
    vec3 red = vec3(0.8, 0.0, 0.1);
    vec3 blue = vec3(0.0, 0.4, 0.85);

    vec3 color;

    if (t < 0.33) {
      color = mix(purple, red, smoothstep(0.0, 0.33, t));
    } else if (t < 0.66) {
      color = mix(red, blue, smoothstep(0.33, 0.66, t));
    } else {
      color = mix(blue, purple, smoothstep(0.66, 1.0, t));
    }

    float alpha = opacity * (1.0 - smoothstep(0.8, 1.0, length(vUv - 0.5)));
    gl_FragColor = vec4(color, alpha);
  }
  `
);

extend({ BlackHoleMaterial });

const DistortionMaterial = shaderMaterial(
  {
    time: 0,
    intensity: 2.0,
    blackHolePos: new THREE.Vector3(0, 0, 0),
    aspect: 1.0,
  },
  `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  `
  uniform float time;
  uniform float intensity;
  uniform vec3 blackHolePos;
  uniform float aspect;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vec2 uv = vUv;
    uv.x *= aspect;

    vec2 center = vec2(0.5 * aspect, 0.5);
    vec2 dir = uv - center;
    float dist = length(dir);

    float distortion = intensity * 0.2 / (dist + 0.05);
    vec2 distortedUV = uv + normalize(dir) * distortion;
    distortedUV.x /= aspect;

    if (dist > 0.2 && dist < 0.3) {
      distortedUV = uv + dir * (0.25 - dist) * 10.0;
      distortedUV.x /= aspect;
    }

    if (dist < 0.15) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }

    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
  }
  `
);

extend({ DistortionMaterial });

function Stars() {
  const count = 10000;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const radius = 5 + Math.random() * 1000;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.5}
        sizeAttenuation={true}
        color="#ffffff"
        transparent
        alphaTest={0.01}
        depthWrite={false}
      />
    </points>
  );
}

function BlackHole() {
  const groupRef = useRef();
  const distortionRef = useRef();
  const { size } = useThree();
  const accretionRefs = [useRef(), useRef(), useRef()];

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    accretionRefs.forEach((ref, i) => {
      if (ref.current) {
        ref.current.rotation.z = elapsed * (0.1 + i * 0.05);
        ref.current.material.uniforms.time.value = elapsed * (0.5 + i * 0.1);
      }
    });

    if (distortionRef.current) {
      distortionRef.current.material.uniforms.time.value = elapsed;
      distortionRef.current.material.uniforms.aspect.value = size.width / size.height;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.3, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {[1.8, 2.5, 3.2].map((radius, i) => (
        <mesh key={i} ref={accretionRefs[i]} rotation-x={Math.PI / 2} position={[0, 0, 0]}>
          <torusGeometry args={[radius, 0.15, 32, 100]} />
          <blackHoleMaterial
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}

      <mesh ref={distortionRef} position={[0, 0, -1.5]}>
        <planeGeometry args={[10, 10]} />
        <distortionMaterial transparent intensity={2.0} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      <ambientLight intensity={0.1} />
      <pointLight color="#7300b3" intensity={2} position={[5, 3, 5]} distance={20} decay={2} />
      <pointLight color="#cc0000" intensity={1.5} position={[-5, -3, 5]} distance={20} decay={2} />
      <pointLight color="#0066cc" intensity={1.5} position={[0, 5, -5]} distance={20} decay={2} />
    </group>
  );
}

export default function BlackHoleScene() {
  const { t } = useTranslation();
  const [showRestoreButton, setShowRestoreButton] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowRestoreButton(true);
    }, 30000);

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleRestoreClick = () => {
    window.location.href = '/';
  };

  const cameraPosition = windowSize.width < 600 ? [0, 0, 7] : [0, 0, 5];
  const cameraFov = windowSize.width < 600 ? 70 : 50;

  const fontSize = windowSize.width < 600 ? '12px' : '16px';

  const restoreButtonWrapperStyle = {
    position: 'fixed',
    bottom: windowSize.width < 400 ? 20 : 40,
    right: windowSize.width < 400 ? '50%' : 20,
    transform: windowSize.width < 400 ? 'translateX(50%)' : 'none',
    zIndex: 10001,
    pointerEvents: 'auto',
    userSelect: 'none',
    width: windowSize.width < 400 ? '90vw' : 'auto',
    maxWidth: 320,
    boxSizing: 'border-box',
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 15,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10000,
          color: 'white',
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: '700',
          textShadow:
            '0 0 5px #7300b3, 0 0 10px #7300b3, 0 0 15px #cc0000, 0 0 20px #0066cc',
          userSelect: 'none',
          pointerEvents: 'none',
          fontSize,
          textAlign: 'center',
          padding: '6px 12px',
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: '6px',
          maxWidth: '90vw',
          lineHeight: 1.2,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          boxSizing: 'border-box',
        }}
      >
        {t(
          'blackHole.interactMessage',
          'Puedes interactuar con el agujero negro / You can interact with the black hole'
        )}
      </div>

      {showRestoreButton && (
        <div style={restoreButtonWrapperStyle}>
          <button
            onClick={handleRestoreClick}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #7b2ff7, #f107a3)',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '16px',
              boxShadow:
                '0 0 8px #f107a3, 0 0 15px #7b2ff7, 0 0 20px #f107a3, 0 0 30px #7b2ff7',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textShadow: '0 0 5px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'brightness(1.2)';
              e.currentTarget.style.boxShadow =
                '0 0 12px #f107a3, 0 0 20px #7b2ff7, 0 0 25px #f107a3, 0 0 40px #7b2ff7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'brightness(1)';
              e.currentTarget.style.boxShadow =
                '0 0 8px #f107a3, 0 0 15px #7b2ff7, 0 0 20px #f107a3, 0 0 30px #7b2ff7';
            }}
            aria-label={t('blackHole.restoreButton', 'Restaurar página / Restore Page')}
          >
            {t('blackHole.restoreButton', 'Restaurar página / Restore Page')}
          </button>
        </div>
      )}

      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas
          camera={{ position: cameraPosition, fov: cameraFov }}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color('#000000'));
          }}
        >
          <Stars />
          <BlackHole />
          <OrbitControls enableZoom enablePan={false} maxDistance={10} minDistance={3} />
        </Canvas>
      </div>
    </>
  );
}