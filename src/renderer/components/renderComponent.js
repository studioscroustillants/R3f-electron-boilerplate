import * as THREE from '../../../node_modules/three/build/three.module.js';

class RenderComponent
{
	constructor()
	{
		this._renderer = {};
		
	}
	static initRenderComponent()
	{
		let r = new THREE.WebGLRenderer( { antialias: true } );
		r.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( r.domElement );
		return { _renderer : r};
	}
}

export default RenderComponent;