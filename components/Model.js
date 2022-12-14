
import { useGLTF } from '@react-three/drei';
import { useGraph, useFrame } from '@react-three/fiber';
import { useState, useCallback, useRef } from 'react';
import * as THREE from 'three'
import { useSpring } from '@react-spring/three';
import { animated } from '@react-spring/three';

const color = new THREE.Color()
export function Model({ name, onClick, ...props }) {
  const ref = useRef()
  const { nodes } = useGLTF("/NMM_3D_v3.gltf")
  // const { nodes } = useGraph(scene)
  // const [modelHovered, modelHover] = useState(false)

  // const hoverColor = useSpring({ color: modelHovered ? "#b2954d" : "#fff" });

  // const over = useCallback((e) => (e.stopPropagation(), modelHover(true), console.log(e)), [])
  // const out = useCallback((e) => (e.stopPropagation(), modelHover(false)), [])

  return <mesh ref={ref}
    castShadow geometry={nodes[name].geometry} material={nodes[name].material} {...props} material-roughness={1} dispose={null} onClick={onClick}>
    {/* <animated.meshStandardMaterial color={hoverColor.color} /> */}
  </mesh>
}
useGLTF.preload("/NMM_3D_v3.gltf");