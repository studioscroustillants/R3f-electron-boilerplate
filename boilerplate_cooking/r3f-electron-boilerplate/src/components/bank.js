import React, { useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber'
import { EffectComposer, Outline} from '@react-three/postprocessing'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from 'three'
import path from 'path';
import isDev from 'electron-is-dev';

const Bank = (props) => {
	const [outlineBankFocused,setOutlineBankFocused] = useState(false)
	const groupref = useRef()
	let arrayOfRefs = [];
	// console.log(selected);
	const isMounted=true;
	// setOutlineFocused
	// ref
	
  const gltf = useLoader(GLTFLoader, (isDev?'http://localhost:8082':path.resolve('.'))+'/assets/3d/banque.glb',(loader) => {
	  const dracoLoader = new DRACOLoader();
	  dracoLoader.setDecoderPath("/draco-gltf/");
	  loader.setDRACOLoader(dracoLoader);
	})
  
   return (
     <group {...gltf.scene.children[0]} onClick={props.onClick} position={[40,9,-16]} ref={groupref} onPointerOver={(e)=>{if(groupref.current) {props.onHover(arrayOfRefs);console.log("onhoverworked");}}} onPointerOut={()=>{props.onHover(null)}} >
	   {Object.values(gltf.nodes).filter(m=>{return (m instanceof THREE.Mesh)}).map(m => {return <mesh material={m.material} geometry={m.geometry} key={m.name} ref={(()=>{arrayOfRefs.push(useRef());return arrayOfRefs[arrayOfRefs.length-1]})()}/>})}
     </group>
   );
}

		 // {(outlineBankFocused===true)&&(arrayOfRefs.current.length>0)&&<Outline selection={arrayOfRefs.current} visibleEdgeColor="violet" edgeStrength={100} blur={true} />}
     // <group {...gltf.scene.children[0]} onClick={props.onClick} position={[40,9,-16]} onPointerOver={(e)=>{if(isMounted) setOutlineBankFocused(true)}} onPointerOut={()=>{if(isMounted) setOutlineBankFocused(false)}} >
export default Bank;