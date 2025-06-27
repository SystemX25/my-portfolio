import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Fragments() {
    const group = useRef();
    const count = 200;
    const meshRefs = useRef([]);
    const { viewport } = useThree();
    const [exploded, setExploded] = useState(false);

    useEffect(() => {
        const explosionForce = 0.3;
        
        meshRefs.current.forEach((ref) => {
            if (ref) {
                ref.position.set(
                    THREE.MathUtils.randFloatSpread(viewport.width * 0.5),
                    THREE.MathUtils.randFloatSpread(viewport.height * 0.5),
                    THREE.MathUtils.randFloatSpread(5)
                );
                
                ref.rotation.set(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                );
                
                ref.userData = {
                    velocity: new THREE.Vector3(
                        THREE.MathUtils.randFloatSpread(0.5),
                        THREE.MathUtils.randFloatSpread(0.5),
                        THREE.MathUtils.randFloatSpread(0.5)
                    ),
                    rotationSpeed: new THREE.Vector3(
                        Math.random() * 0.02,
                        Math.random() * 0.02,
                        Math.random() * 0.02
                    ),
                    gravity: -0.005
                };
            }
        });
        
        const timer = setTimeout(() => setExploded(true), 500);
        return () => clearTimeout(timer);
    }, [viewport]);

    useFrame(() => {
        if (!exploded) return;
        
        meshRefs.current.forEach((ref) => {
            if (ref && ref.userData) {
                ref.userData.velocity.y += ref.userData.gravity;
                ref.position.add(ref.userData.velocity);
                ref.rotation.x += ref.userData.rotationSpeed.x;
                ref.rotation.y += ref.userData.rotationSpeed.y;
                ref.rotation.z += ref.userData.rotationSpeed.z;
            }
        });
    });

    return (
        <group ref={group}>
            {[...Array(count)].map((_, i) => (
                <mesh
                    key={i}
                    ref={(el) => (meshRefs.current[i] = el)}
                    scale={0.1 + Math.random() * 0.3}
                >
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial 
                        color="#888" 
                        roughness={0.6} 
                        metalness={0.2} 
                        emissive="#333"
                        emissiveIntensity={0.2}
                    />
                </mesh>
            ))}
        </group>
    );
}

function EnergyRays() {
    const colors = ['#ff0000', '#ff6600', '#ffcc00', '#6600ff'];
    const group = useRef();

    useFrame(({ clock }) => {
        if (group.current) {
            group.current.rotation.y = clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <group ref={group}>
            {[...Array(15)].map((_, i) => (
                <mesh
                    key={i}
                    position={[
                        (Math.random() - 0.5) * 8,
                        (Math.random() - 0.5) * 8,
                        (Math.random() - 0.5) * 8
                    ]}
                    rotation={[
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        Math.random() * Math.PI
                    ]}
                >
                    <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
                    <meshBasicMaterial
                        color={colors[i % colors.length]}
                        transparent
                        opacity={0.5}
                    />
                </mesh>
            ))}
        </group>
    );
}

export default function DestroyScene({ onComplete }) {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
        const duration = 10000;
        const interval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + 100 / (duration / 100);
                if (newProgress >= 100) {
                    clearInterval(interval);
                    onComplete();
                    return 100;
                }
                return newProgress;
            });
        }, 100);
        
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[9999] bg-black">
            <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} intensity={1} color="#ff6600" />
                <pointLight position={[-5, -5, -5]} intensity={0.5} color="#0066ff" />
                
                <Fragments />
                <EnergyRays />
            </Canvas>
            
            <div className="absolute inset-0 pointer-events-none" style={{
                background: `radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.7) 100%)`,
                opacity: progress / 100
            }} />
        </div>
    );
}