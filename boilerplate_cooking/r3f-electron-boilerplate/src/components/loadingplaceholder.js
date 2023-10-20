import React, { useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber'

const Loading = (props) => {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

export default Loading;