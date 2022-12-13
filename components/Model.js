
import { useGLTF } from '@react-three/drei';
import { useGraph } from '@react-three/fiber';

export function Model({ name, ...props }) {

  const { scene } = useGLTF("/NMM_3D_v3.gltf")
  const { nodes } = useGraph(scene)
  return <mesh
    castShadow geometry={nodes[name].geometry} material={nodes[name].material} material-roughness={1} {...props} dispose={null} >
  </mesh>
}
useGLTF.preload("/NMM_3D_v3.gltf");