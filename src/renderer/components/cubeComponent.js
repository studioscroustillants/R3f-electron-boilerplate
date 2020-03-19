import * as THREE from '../../../node_modules/three/build/three.module.js';

class CubeComponent
{
	constructor()
	{
		this._obj = {};
	}
	static initCubeComponent()
	{
		return { _obj : new THREE.Mesh( new THREE.BoxGeometry(0.2,0.2,0.2),new THREE.MeshNormalMaterial()) };
	}
}

export default CubeComponent;