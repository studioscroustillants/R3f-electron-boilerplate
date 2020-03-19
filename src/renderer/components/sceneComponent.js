import * as THREE from '../../../node_modules/three/build/three.module.js';

class SceneComponent
{
	constructor()
	{
		if(!SceneComponent._instance)
		{
			this._scene = {};
			SceneComponent._instance = this;
		}
		return SceneComponent._instance;
	}
	static initSceneComponent()
	{
		return {_scene : new THREE.Scene() };
	}
	add(objectToAdd)
	{
		this._scene.add(objectToAdd);
	}
}

export default SceneComponent;