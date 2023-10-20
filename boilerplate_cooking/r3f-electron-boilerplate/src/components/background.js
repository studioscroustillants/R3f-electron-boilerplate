import React, { useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const Background = ()=>{
  const {scene,gl}=useThree();
  scene.background=new THREE.Color( 0x00bfff );
  gl.setClearColor(0x000000,0);
  gl.alpha = true;
  return null;
}

export default Background;