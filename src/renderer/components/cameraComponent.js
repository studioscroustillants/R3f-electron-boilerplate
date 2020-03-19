import * as THREE from '../../../node_modules/three/build/three.module.js';

class CameraComponent
{
	constructor()
	{
		this._camera = {};
	}
	static initCameraComponent()
	{
		let cam = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
		console.log(cam.position.z);
		cam.position.z = 1;
		return { _camera : cam };
	}
}

export default CameraComponent;