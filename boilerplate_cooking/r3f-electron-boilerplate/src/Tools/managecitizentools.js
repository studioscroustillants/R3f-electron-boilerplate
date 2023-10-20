import * as THREE from 'three'
import listOfObjects from '../components/data/recipedatas'
import * as BagesTools from './badgetools'

const interest = 0.5;

const initObjectifs=(listOfCitizens,objectif,type=false)=>{
	for(let cur of listOfCitizens)
		if(objectif&&Math.floor(Math.random()/interest))
		{
			cur.objectif=new THREE.Vector3(objectif.x,0.75,objectif.z);
			cur.objectifType=type;
			if(type=="stand") setNeed(cur);
			console.log("objectifType : ",cur.objectifType)
			console.log("Objectif pos : ", cur.objectif)
		}
		else
			cur.objectif=new THREE.Vector3(Math.floor(Math.random()*(Math.floor(Math.random()*2)?2500:-2500)),0.75,
			Math.floor(Math.random()*(Math.floor(Math.random()*2)?2500:-2500)));
	return listOfCitizens;
}

const setNeed = (cit)=>{
	const listOfUsablesObjects = listOfObjects.filter(object=>BagesTools.contains(object.badges))
	cit.needs=[]
	cit.needs.push(listOfUsablesObjects[Math.floor(Math.random()*listOfUsablesObjects.length)]);
}

export {initObjectifs,setNeed}