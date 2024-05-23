'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, Line, Resize, OrbitControls, Billboard, Text, Html, Box } from '@react-three/drei'
import * as THREE from 'three'
import { Perf } from 'r3f-perf'
import Scene from '@/components/canvas/Scene'

const Stars = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Stars), { ssr: false })
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-white' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})

function Annotation({ children, position, ...props }: { children: React.ReactNode; position: number[] }) {
  return (
    <Html
      as='div'
      className='w-64 mt-2 -ml-8 flex '
      position={[position[0], position[1], position[2]]}
      {...props}
      distanceFactor={4}
    >
      <div>{children}</div>
    </Html>
  )
}

function Node({
  idx,
  position,
  onHover,
  onUnhover,
  hovered,
  explained,
  emotion,
}: {
  idx: number
  position: number[]
  onHover: () => void
  onUnhover: () => void
  hovered: boolean
  explained: boolean
  emotion: string[]
}) {
  useEffect(() => {
    hovered ? (document.body.style.cursor = 'pointer') : (document.body.style.cursor = 'auto')
  }, [hovered])

  return (
    <>
      {explained && (
        <Annotation position={position}>
          <div className='px-2 w-fit text-white backdrop-blur-sm rounded-full'>{emotion[0]}</div>
        </Annotation>
      )}

      <Sphere
        scale={explained ? 1 : 0.5}
        args={[1, 8, 8]}
        position={[position[0], position[1], position[2]]}
        onPointerOver={onHover}
        onPointerOut={onUnhover}
      >
        <meshBasicMaterial attach='material' color={explained ? emotion[1] : 'white'} />
      </Sphere>
    </>
  )
}

function Edge({ points, lineWidth }: { points: any; lineWidth: number }) {
  return <Line points={points} color='skyblue' lineWidth={lineWidth} />
}

function Network({
  length,
  isEmotion,
  radiusSensitivity,
  lineWidth,
}: {
  length?: number
  isEmotion?: boolean
  radiusSensitivity?: number
  lineWidth?: number
}) {
  const emotions = [
    ['분노 😡', 'red'],
    ['기쁨 😊', 'yellow'],
    ['슬픔 😢', 'blue'],
    ['놀람 😲', 'green'],
    ['불안 😨', 'purple'],
    ['혐오 😖', 'black'],
    ['기대 😍', 'pink'],
    ['행복 😁', 'orange'],
    ['평온 😌', 'gray'],
    ['무표정 😐', 'black'],
  ]

  const [hoveredNode, setHoveredNode] = useState(null)
  const [explainedNode, setExplainedNode] = useState([])

  const nodes = useMemo(() => {
    const nodes = []
    const baseRadius = 100 // 기본 반경
    const maxVariation = 50 // 최대 변동 반경

    for (let i = 0; i < length; i++) {
      const alpha = Math.random() * Math.PI * 2
      const beta = Math.random() * Math.PI - Math.PI / 2
      const variation = Math.random() * maxVariation * radiusSensitivity
      const radius = baseRadius + variation // 슬라이더 값에 따라 반경 설정
      const x = radius * Math.sin(alpha) * Math.cos(beta)
      const y = radius * Math.sin(alpha) * Math.sin(beta)
      const z = radius * Math.cos(alpha)

      nodes.push(new THREE.Vector3(x, y, z))
    }
    return nodes
  }, [length, radiusSensitivity]) // radiusSensitivity 의존성 추가

  const edges = useMemo(() => {
    const edges = []
    const threshold = 700
    nodes.forEach((node, i) => {
      nodes.forEach((other, j) => {
        if (i !== j && node.distanceToSquared(other) < threshold) {
          edges.push([node, other])
        }
      })
    })
    return edges
  }, [nodes])

  useEffect(() => {
    const minDistance = 50 // 노드들 사이의 최소 거리
    const maxSelectedNodes = 20 // 선택할 최대 노드 수
    let selectedNodes = []

    // 노드 배열을 셔플합니다.
    const shuffleNodes = [...nodes]
    shuffleNodes.sort(() => 0.5 - Math.random())

    for (let node of shuffleNodes) {
      let isFarEnough = true

      for (let selected of selectedNodes) {
        const distance = node.distanceTo(selected)
        if (distance < minDistance) {
          isFarEnough = false
          break
        }
      }

      if (isFarEnough) {
        selectedNodes.push(node)
        if (selectedNodes.length === maxSelectedNodes) break
      }
    }

    setExplainedNode(selectedNodes)
  }, [nodes])

  return (
    <>
      {nodes.map((node, index) => (
        <Node
          key={index}
          idx={index}
          position={node.toArray()}
          hovered={index === hoveredNode}
          onHover={() => setHoveredNode(index)}
          onUnhover={() => setHoveredNode(null)}
          explained={isEmotion && explainedNode.includes(node)}
          emotion={emotions[index % 10]}
        />
      ))}
      {edges.map((edge, index) => (
        <Edge key={index} lineWidth={lineWidth} points={edge.map((node: { toArray: () => any }) => node.toArray())} />
      ))}
    </>
  )
}

function CameraControls() {
  const {
    camera,
    gl: { domElement },
  } = useThree()
  return (
    <OrbitControls args={[camera, domElement]} autoRotate autoRotateSpeed={0.5} enableDamping dampingFactor={0.1} />
  )
}

export default function Web() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const [isPerf, setIsPerf] = useState(true)
  const [length, setLength] = useState(240)
  const [isEmotion, setIsEmotion] = useState(true)
  const [randomRadius, setRandomRadius] = useState(false) // 반경 랜덤 모드 토글
  const [lineWidth, setLineWidth] = useState(false)
  const [radiusSensitivity, setRadiusSensitivity] = useState(0) // 반경 감도 초기값 설정

  return (
    <>
      <div className='flex h-full w-full bg-black '>
        {/* 
          //@ts-ignore */}
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
          <OrbitControls />
        </Canvas>
      </div>
    </>
  )
}
