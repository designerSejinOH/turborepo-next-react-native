'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { MarchingCubes, MarchingCube, MeshTransmissionMaterial, Environment, Bounds, Text } from '@react-three/drei'
import { Physics, RigidBody, BallCollider } from '@react-three/rapier'

function MetaBall({ color, vec = new THREE.Vector3(), ...props }) {
  const api = useRef(null)
  useFrame((state, delta) => {
    delta = Math.min(delta, 0.1)
    api.current.applyImpulse(
      vec
        .copy(api.current.translation())
        .normalize()
        .multiplyScalar(delta * -0.05),
    )
  })
  return (
    <RigidBody ref={api} colliders={false} linearDamping={4} angularDamping={0.95} {...props}>
      <MarchingCube strength={0.35} subtract={6} color={color} />
      <BallCollider args={[0.1]} />
    </RigidBody>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef(null)
  useFrame(({ pointer, viewport }) => {
    const { width, height } = viewport.getCurrentViewport()
    vec.set(pointer.x * (width / 2), pointer.y * (height / 2), 0)
    ref.current.setNextKinematicTranslation(vec)
  })
  return (
    <RigidBody type='kinematicPosition' colliders={false} ref={ref}>
      <MarchingCube strength={0.5} subtract={10} color={new THREE.Color('orange')} />
      <BallCollider args={[0.1]} />
    </RigidBody>
  )
}

export function QShape() {
  return (
    <>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 25 }}
        //transparent background
        gl={{ alpha: true, antialias: true, logarithmicDepthBuffer: true }}
      >
        <ambientLight intensity={1} />
        <Physics gravity={[0, 2, 0]}>
          <MarchingCubes resolution={80} maxPolyCount={20000} enableUvs={false} enableColors>
            <meshStandardMaterial vertexColors roughness={0} />
            <MetaBall color='indianred' position={[1, 1, 0.5]} />
            <MetaBall color='skyblue' position={[-1, -1, -0.5]} />
            <MetaBall color='teal' position={[2, 2, 0.5]} />
            <MetaBall color='orange' position={[-2, -2, -0.5]} />
            <MetaBall color='hotpink' position={[3, 3, 0.5]} />
            <MetaBall color='aquamarine' position={[-3, -3, -0.5]} />
            <Pointer />
          </MarchingCubes>
        </Physics>
        <Environment files='https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr' />
        {/* Zoom to fit a 1/1/1 box to match the marching cubes */}
        <Bounds fit clip observe margin={1}>
          <mesh visible={false}>
            <boxGeometry />
          </mesh>
        </Bounds>
      </Canvas>
    </>
  )
}
