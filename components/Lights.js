import React from 'react'


export default function Lights() {

  // const directionalLight = useControls('directional light', {
  //   x: { value: 39, min: -100, max: 100, step: 0.1 },
  //   y: { value: -6, min: -100, max: 100, step: 0.1 },
  //   z: { value: -6, min: -100, max: 100, step: 0.1 },
  // })


  // const pointLight = useControls('point light', {
  //   x: { value: 39, min: -1000, max: 1000, step: 0.1 },
  //   y: { value: -6, min: -1000, max: 1000, step: 0.1 },
  //   z: { value: -6, min: -1000, max: 1000, step: 0.1 },
  // })


  return (
    <>
      <ambientLight intensity={0.01} color='#fff' />
      {/* <directionalLight color={'#fff'}
        position={[39, -2, -6]} intensity={0.1} /> */}
      <directionalLight castShadow
        position={[39, -2, -6]}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-left={-30}
        shadow-camera-right={40}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-bias={-0.0001}
        intensity={0.1} />
      <pointLight position={[100, 50, -6]} />
    </>
  )
}
