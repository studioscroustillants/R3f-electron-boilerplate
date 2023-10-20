import React, { useRef, useState, useMemo, forwardRef, useImperativeHandle, useEffect, memo } from 'react'
import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
//import path from 'path'
import * as THREE from 'three'

const Threes = memo(forwardRef((props,ref) => {
	let [treeAmountState,setTreeAmountState] = useState(500)
	let listOfRefs = [];
	// const meshRef=useRef();
	const tempObject = new THREE.Object3D();
	let treeTypes = ["three_white_1"];
	let loadedTrees = [];
	let trees = [];
	
	useImperativeHandle(ref,()=>(
		{
			setTreeAmountState
		}
	))
	
	console.log("tree comp : ",treeAmountState)
	
	// const mapWithRef = (arr)=>{
		// for(let cur of arr)
		// {
			// listOfRefs.push(useRef());
			// cur.ref=listOfRefs[listOfRefs.length-1];
		// }
		// return arr;
	// }

	for(let cur of treeTypes)
	{
		console.log(Object.values(useLoader(GLTFLoader, 'http://localhost:3000/3d/'+cur+'.glb',(loader) => {
		  const dracoLoader = new DRACOLoader();
		  dracoLoader.setDecoderPath("/draco-gltf/");
		  loader.setDRACOLoader(dracoLoader);
		}).nodes)[0].material);
		loadedTrees.push(Object.values(useLoader(GLTFLoader, 'http://localhost:3000/3d/'+cur+'.glb',(loader) => {
		  const dracoLoader = new DRACOLoader();
		  dracoLoader.setDecoderPath("/draco-gltf/");
		  loader.setDRACOLoader(dracoLoader);
		}).nodes).filter(m=>{return (m instanceof THREE.Mesh)})
		.map(m=>{return (<instancedMesh material={m.material} 
										geometry={m.geometry} 
										key={cur+""+Math.floor(Math.random()*10000)} 
										count={treeAmountState}
										// ref={meshRef}
										ref={(()=>{
												listOfRefs.push(useRef()); 
												return listOfRefs[listOfRefs.length-1];
												})()}
										args={[null,null,treeAmountState]} />)}));
										
		// loadedTrees[loadedTrees.length-1] = mapWithRef(loadedTrees[loadedTrees.length-1]);
	}

	
		
	// console.log(loadedTrees);
	
	useEffect(()=>{
		if (listOfRefs.length < 1) return;
		
		// console.log(localStorage.getItem("treelocation"));
		let treeLocation = (localStorage.getItem("treelocation")&&(localStorage.getItem("treelocation")!="undefined"))?JSON.parse(localStorage.getItem("treelocation")):[];
		// if (meshRef == null) return;
		// if (meshRef.current == null) return;
		
		// mapWithParentRef(loadedTrees[0])
		// console.log(listOfRefs);
		
		// if(treeLocation.length<1)
		// {
			let i = 0;
			for(let c = 0;c<treeAmountState;c++)
			{
				let currentPosition = treeLocation[c]?.pos || [	Math.round(Math.round(Math.random())?(Math.random()*props.halfSize):-(Math.random()*props.halfSize)),
										13.75 , 
										Math.round( Math.round(Math.random())?(Math.random()*props.halfSize):-(Math.random()*props.halfSize))];
				let currentRotation = treeLocation[c]?.rot || [0,(Math.round(Math.random())*Math.PI/2),0]
				
				if(!treeLocation[c]) treeLocation.push({pos:currentPosition,rot:currentRotation});
				
				for(let curRef of listOfRefs) {
					const id = i++;
					tempObject.position.set(currentPosition[0],currentPosition[1],currentPosition[2])
					tempObject.rotation.set(currentRotation[0],currentRotation[1],currentRotation[2]);
					// tempObject.scale.set(1, 0.5, 1.5);
					tempObject.updateMatrix();
					// tempObject.geometry.computeTangents();
					curRef.current.setMatrixAt(id, tempObject.matrix);
					// meshRef.current.setMatrixAt(id, tempObject.matrix);
					// console.log(tempObject);
				}
			}
			for(let curRef of listOfRefs)
				curRef.current.instanceMatrix.needsUpdate = true;
			// meshRef.current.instanceMatrix.needsUpdate = true;
			if((treeLocation.length>0)&&(!localStorage.getItem("treelocation")||(localStorage.getItem("treelocation")=="undefined"))) localStorage.setItem("treelocation",JSON.stringify(treeLocation));
		// }
		// else{
			// let i = 0;
			// for(let c = 0;c<props.amount;c++)
			// {
				// for(let curRef of listOfRefs) {
					// const id = i++;
					// tempObject.position.set(treeLocation.pos[0],treeLocation.pos[1],treeLocation.pos[2])
					// tempObject.rotation.set(treeLocation.rot[0],treeLocation.rot[1],treeLocation.rot[2]);
					// tempObject.updateMatrix();
					// curRef.current.setMatrixAt(id, tempObject.matrix);
				// }
			// }
			// for(let curRef of listOfRefs)
				// curRef.current.instanceMatrix.needsUpdate = true;
			// if((treeLocation.length>0)&&(!localStorage.getItem("treelocation")||(localStorage.getItem("treelocation")=="undefined"))) localStorage.setItem("treelocation",JSON.stringify(treeLocation));
		// }
		
	},[treeAmountState])
	
	// for(let i = 0;i<props.amount;i++)
	// {
		// let randomVector = [	Math.round(Math.random())?(Math.random()*props.halfSize):-(Math.random()*props.halfSize),
								// 0.5 , 
								// Math.round(Math.random())?(Math.random()*props.halfSize):-(Math.random()*props.halfSize)];
		// let randomRotation = [0,(Math.round(Math.random())*Math.PI/2),0];
		// for(let cur of loadedTrees[Math.floor(Math.random()*loadedTrees.length)])
		// {
			// let ob = cur;
			// ob.position=randomVector;
			// ob.rotation = randomRotation;
			// ob.key="tree"+i;
			
			
			// trees.push( (<group position={[	Math.round(Math.random())?(Math.random()*props.halfSize):-(Math.random()*props.halfSize),
											// 13.75 , 
											// Math.round(Math.random())?(Math.random()*props.halfSize):-(Math.random()*props.halfSize)]} 
						// rotation={[0,(Math.round(Math.random())*Math.PI/2),0]} 
						// key={"tree"+i}>
							// {loadedTrees[Math.floor(Math.random()*loadedTrees.length)]}
						// </group>))
						

			// trees.push(	loadedTrees.map(m=>{return <mesh
						// material={m.material} geometry={m.geometry}
						// position={[	Math.round(Math.random())?(Math.random()*props.halfSize):-(Math.random()*props.halfSize),
						// 0.5 , 
						// Math.round(Math.random())?(Math.random()*props.halfSize):-(Math.random()*props.halfSize)]}
						// rotation={[0,(Math.round(Math.random())*Math.PI/2),0]}
		// key={"tree"+i}/>}));
		// }
	// }
	// console.log(trees);
   return (
		<group>
			{loadedTrees[Math.floor(Math.random()*loadedTrees.length)]}
		</group>
   );
}))
export default Threes;