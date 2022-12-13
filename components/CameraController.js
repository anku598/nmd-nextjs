import React from 'react'
import { OrbitControls } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring } from '@react-spring/three';
import * as THREE from 'three'



function CameraController(props) {

  const orbitControlsRef = useRef(null)
  const [vec] = useState(() => new THREE.Vector3())

  useFrame((state, delta) => {
    const { x } = state.mouse

    if (!!orbitControlsRef.current) {
      state.camera.position.lerp({ x: props.zoom ? 0 : 350, y: props.zoom ? 0 : 250, z: props.zoom ? 420 : 20 }, 0.02)

      // if (props.zoom === true) {
      //   orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(10))
      //   orbitControlsRef.current.update()
      // }
      state.camera.lookAt(0, 0, 0)
    }






  })



  return (
    <>
      <OrbitControls ref={orbitControlsRef} enableRotate={false} />
      {/* <FrameLimiter /> */}
    </>
  )
}



// minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2}

export default CameraController


function FrameLimiter({ limit = 30 }) {
  const { invalidate, clock, advance } = useThree();
  useEffect(() => {
    let delta = 0;
    const interval = 1 / limit;
    const update = () => {
      requestAnimationFrame(update);
      delta += clock.getDelta();

      if (delta > interval) {
        invalidate();
        delta = delta % interval;
      }
    }

    update();
  }, [])

  return null;
}


