// Initial welcome page. Delete the following line to remove it.
import {World} from '../../node_modules/ecsy/build/ecsy.module.js';
import * as THREE from '../../node_modules/three/build/three.module.js';
import SceneComponent from './components/sceneComponent.js';
import CameraComponent from './components/cameraComponent.js';
import RenderComponent from './components/renderComponent.js';
import CubeComponent from './components/cubeComponent.js';
// import RotatingComponent from './components/rotatingComponent.js';
import RenderSystem from './systems/renderSystem.js';
// import RotationSystem from './systems/rotationSystem.js';
import '../../dist/CSS/main.css';

class mainProgram
{
	constructor()
	{
 		this.world = new World();
		
		this.run();
	}
	run()
	{
		this.init();
		this.animate();
	}
	init() {
			this.world.registerSystem(RenderSystem);
			this.world.createEntity()
				.addComponent(CameraComponent,CameraComponent.initCameraComponent())
				.addComponent(SceneComponent,SceneComponent.initSceneComponent())
				.addComponent(RenderComponent,RenderComponent.initRenderComponent());
				
			this.world.createEntity()
				.addComponent(CubeComponent,CubeComponent.initCubeComponent());
			
			let scen = new SceneComponent();
			console.log(this.world.entityManager._entities[1]);
			scen.add(this.world.entityManager._entities[1]._components.CubeComponent._obj);
			
			
		}
	animate() 
	{
		let time = performance.now();
		let delta = time - this.lastTime;

		this.world.entityManager._entities[1]._components.CubeComponent._obj.rotation.x += 0.01;
		this.world.entityManager._entities[1]._components.CubeComponent._obj.rotation.y += 0.02;
		// Run all the systems
		this.world.execute();

		this.lastTime = time;
		requestAnimationFrame(()=>{this.animate();});
	}
}
document.addEventListener("DOMContentLoaded",()=>{
	let prgm = new mainProgram();
});
