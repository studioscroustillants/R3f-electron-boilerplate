import RenderComponent from '../components/renderComponent.js';
import SceneComponent from '../components/sceneComponent.js';
import CameraComponent from '../components/cameraComponent.js';
import {System} from '../../../node_modules/ecsy/build/ecsy.module.js';

class RenderSystem extends System
{
	execute()
	{
		this.queries.rendering.results.forEach(
		entity=>{
			entity.getComponent(RenderComponent)._renderer.render(entity.getComponent(SceneComponent)._scene,entity.getComponent(CameraComponent)._camera);
		});
	}
}

RenderSystem.queries = {
  rendering: {
    components: [RenderComponent,SceneComponent,CameraComponent]
  }
}

export default RenderSystem;